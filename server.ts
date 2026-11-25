import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD =
  process.env.NODE_ENV === 'production' ||
  Boolean(process.env.K_SERVICE) ||
  Boolean(process.env.CLOUD_RUN_JOB);

// ---------------------------------------------------------------------------
// Bounded Sliding-Window Rate Limiters (Protects /api/* against Abuse)
// ---------------------------------------------------------------------------
interface RateBucket {
  count: number;
  resetAt: number;
}

const MAX_TRACKED_IPS = 50_000;

function createRateLimiter(windowMs: number, maxRequests: number) {
  const buckets = new Map<string, RateBucket>();

  setInterval(() => {
    const now = Date.now();
    for (const [ip, bucket] of buckets.entries()) {
      if (now > bucket.resetAt) {
        buckets.delete(ip);
      }
    }
  }, windowMs).unref();

  return (req: Request, res: Response, next: NextFunction): void => {
    const clientIp =
      (req.headers['x-forwarded-for'] as string | undefined)
        ?.split(',')[0]
        ?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
    const now = Date.now();
    const existing = buckets.get(clientIp);

    if (!existing || now > existing.resetAt) {
      if (buckets.size >= MAX_TRACKED_IPS) {
        const oldestKey = buckets.keys().next().value;
        if (oldestKey) buckets.delete(oldestKey);
      }
      buckets.set(clientIp, { count: 1, resetAt: now + windowMs });
      res.setHeader('X-RateLimit-Limit', String(maxRequests));
      res.setHeader('X-RateLimit-Remaining', String(maxRequests - 1));
      next();
      return;
    }

    if (existing.count >= maxRequests) {
      const retryAfterSec = Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000)
      );
      res.setHeader('Retry-After', String(retryAfterSec));
      res.setHeader('X-RateLimit-Limit', String(maxRequests));
      res.setHeader('X-RateLimit-Remaining', '0');
      res.status(429).json({
        error: 'Rate limit exceeded. Please wait before sending further requests.',
        retryAfterSeconds: retryAfterSec,
      });
      return;
    }

    existing.count += 1;
    res.setHeader('X-RateLimit-Limit', String(maxRequests));
    res.setHeader(
      'X-RateLimit-Remaining',
      String(Math.max(0, maxRequests - existing.count))
    );
    next();
  };
}

const readApiLimiter = createRateLimiter(60_000, 240);
const writeMutationLimiter = createRateLimiter(60_000, 30);

function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u001F\u007F<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Block direct probing of private server/rules/env files (while allowing Vite client modules)
const BLOCKED_PATH_PATTERNS = [
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/firestore\.rules/i,
  /^\/DRAFT_firestore\.rules/i,
  /^\/firebase-blueprint\.json/i,
  /^\/security_spec\.md/i,
  /^\/server\.ts/i,
];

const CATALOGUE_SUMMARY_PAYLOAD = JSON.stringify({
  publication: 'Vellune — Literary Criticism & Digital Publication',
  issn: '2978-410X',
  currentIssue: 'Vol. IV, No. 3 (Autumn–Winter 2026)',
  editorialSeriesCount: 18,
  annotatorChaptersCount: 4,
  initiativesCount: 12,
  conversationFormatsCount: 9,
  cacheStrategy: 'edge-stale-while-revalidate',
});
const CATALOGUE_ETAG = `"${crypto
  .createHash('sha256')
  .update(CATALOGUE_SUMMARY_PAYLOAD)
  .digest('hex')
  .slice(0, 24)}"`;

async function startServer(): Promise<void> {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // Security headers compatible with AI Studio cross-origin preview iframe
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    const reqPath = req.path || '/';
    if (BLOCKED_PATH_PATTERNS.some((rx) => rx.test(reqPath))) {
      res.status(403).json({
        error: 'Access to internal configuration or server files is forbidden.',
      });
      return;
    }

    next();
  });

  app.use(express.json({ limit: '16kb' }));

  app.get('/api/health', readApiLimiter, (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      status: 'ok',
      service: 'vellune-platform',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/catalogue', readApiLimiter, (req: Request, res: Response) => {
    res.setHeader(
      'Cache-Control',
      'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
    );
    res.setHeader('ETag', CATALOGUE_ETAG);

    if (req.headers['if-none-match'] === CATALOGUE_ETAG) {
      res.status(304).end();
      return;
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(CATALOGUE_SUMMARY_PAYLOAD);
  });

  app.post('/api/newsletter', writeMutationLimiter, (req: Request, res: Response) => {
    if (req.body?.websiteUrl) {
      res.status(200).json({ ok: true });
      return;
    }

    const email = sanitizeText(req.body?.email, 160).toLowerCase();
    const readerName = sanitizeText(req.body?.readerName, 80);

    if (!email || !EMAIL_PATTERN.test(email)) {
      res.status(400).json({
        error: 'Please provide a valid electronic mail address.',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      email,
      readerName,
      recordedAt: new Date().toISOString(),
    });
  });

  app.post(
    '/api/correspondence',
    writeMutationLimiter,
    (req: Request, res: Response) => {
      if (req.body?.websiteUrl) {
        res.status(200).json({ ok: true });
        return;
      }

      const senderName = sanitizeText(req.body?.senderName, 100);
      const senderEmail = sanitizeText(req.body?.senderEmail, 160).toLowerCase();
      const enquiryType = sanitizeText(req.body?.enquiryType, 80);
      const subject = sanitizeText(req.body?.subject, 160);
      const message = sanitizeText(req.body?.message, 4000);

      if (!senderName || senderName.length < 2) {
        res.status(400).json({ error: 'Please provide your full name.' });
        return;
      }
      if (!senderEmail || !EMAIL_PATTERN.test(senderEmail)) {
        res.status(400).json({
          error: 'Please provide a valid return email address.',
        });
        return;
      }
      if (!message || message.length < 10) {
        res.status(400).json({
          error: 'Please include a message of at least 10 characters.',
        });
        return;
      }

      res.status(200).json({
        ok: true,
        referenceId: `VL-${Date.now().toString(36).toUpperCase()}`,
        enquiryType,
        subject,
        receivedAt: new Date().toISOString(),
      });
    }
  );

  const serveBuiltDist = () => {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(
      '/assets',
      express.static(path.join(distDir, 'assets'), {
        maxAge: '365d',
        immutable: true,
        etag: true,
      })
    );
    app.use(
      express.static(distDir, {
        maxAge: '1h',
        etag: true,
      })
    );
    app.get('*', (_req: Request, res: Response) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  };

  if (!IS_PROD) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch {
      serveBuiltDist();
    }
  } else {
    serveBuiltDist();
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vellune server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Vellune server:', err);
  process.exit(1);
});
