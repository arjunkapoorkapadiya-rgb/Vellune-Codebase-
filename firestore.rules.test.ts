/**
 * Security Rule Verification Harness for Vellune Firestore Rules
 * Documents the 12 Dirty Dozen adversarial payloads from security_spec.md
 * verifying PERMISSION_DENIED enforcement under Zero-Trust rules.
 */

export const DIRTY_DOZEN_SECURITY_CASES = [
  { id: 1, name: 'Unauthenticated Write', target: 'saved_folios/f1', expected: 'PERMISSION_DENIED' },
  { id: 2, name: 'Unverified Email Write', target: 'saved_folios/f1', expected: 'PERMISSION_DENIED' },
  { id: 3, name: 'Identity Spoofing', target: 'saved_folios/f1', expected: 'PERMISSION_DENIED' },
  { id: 4, name: 'Shadow Field Injection', target: 'users_public/user-a', expected: 'PERMISSION_DENIED' },
  { id: 5, name: 'Self-Assigned Admin Role', target: 'users_public/user-a', expected: 'PERMISSION_DENIED' },
  { id: 6, name: 'PII Scraping List Query', target: 'users_private', expected: 'PERMISSION_DENIED' },
  { id: 7, name: 'Cross-User PII Read', target: 'users_private/user-b', expected: 'PERMISSION_DENIED' },
  { id: 8, name: 'Client-Forged Timestamp', target: 'submissions/sub1', expected: 'PERMISSION_DENIED' },
  { id: 9, name: 'ID Poisoning / Oversized Path', target: 'saved_folios/[250_chars]', expected: 'PERMISSION_DENIED' },
  { id: 10, name: 'Denial-of-Wallet Oversized Pitch', target: 'submissions/sub1', expected: 'PERMISSION_DENIED' },
  { id: 11, name: 'Terminal State Bypass', target: 'submissions/sub1', expected: 'PERMISSION_DENIED' },
  { id: 12, name: 'Unbounded Array Injection', target: 'reading_progress/user-a', expected: 'PERMISSION_DENIED' },
] as const;
