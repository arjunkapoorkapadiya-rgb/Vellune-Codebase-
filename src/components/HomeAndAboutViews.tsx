import React, { useState } from 'react';
import { ArrowRight, Check, Bookmark, Sparkles, Compass } from 'lucide-react';
import {
  ARTICLES,
  ANNOTATOR_CHAPTERS,
  CONVERSATION_EVENTS,
  INITIATIVES,
  COMMUNITY_PROFILES,
  EDITORIAL_SERIES,
  NavSection,
} from '../data/velluneData';
import { EditorialImage } from './EditorialImage';
import { useAuth } from '../contexts/AuthContext';

interface HomeViewProps {
  onNavigate: (section: NavSection) => void;
  onSelectArticle: (articleId: string) => void;
  onSelectSeries: (seriesId: string) => void;
  onSelectChapter: (chapterId: string) => void;
  onSelectEvent: (eventId: string) => void;
  onSelectInitiative: (initiativeId: string) => void;
  onSelectProfile: (profileId: string) => void;
}

const SERIES_ACCENT_COLORS = [
  '#702F3B', // Deep burgundy
  '#514052', // Deep plum
  '#493A32', // Espresso brown
  '#9AA58B', // Muted sage
  '#B49AA8', // Muted mauve
  '#C9A5A0', // Dusty rose
];

const PINTEREST_COLOR_STORIES = [
  {
    name: '01. Porcelain & Deep Burgundy',
    inspiration: 'Porcelain #F8F6F1 · Deep Burgundy #702F3B · Ink Black #292725',
    swatches: ['#F8F6F1', '#702F3B', '#292725', '#FFFCF7'],
    fonts: 'Cormorant Garamond (Headings) + EB Garamond (Body)',
    note: 'Soft porcelain and soft white paper paired with rich deep burgundy and crisp ink black rules.',
  },
  {
    name: '02. Deep Plum & Muted Mauve',
    inspiration: 'Deep Plum #514052 · Muted Mauve #B49AA8 · Warm Grey #B8B3AA',
    swatches: ['#514052', '#B49AA8', '#B8B3AA', '#F8F6F1'],
    fonts: 'Cormorant Garamond Italic + EB Garamond Regular',
    note: 'Velvety deep plum grounded by muted mauve and warm grey archival borders.',
  },
  {
    name: '03. Pale Blush & Dusty Rose',
    inspiration: 'Pale Blush #E9DCD8 · Dusty Rose #C9A5A0 · Warm Parchment #F5F0E6',
    swatches: ['#E9DCD8', '#C9A5A0', '#F5F0E6', '#702F3B'],
    fonts: 'Cormorant Garamond Display + EB Garamond Prose',
    note: 'Delicate pale blush and dusty rose balanced against warm parchment.',
  },
  {
    name: '04. Espresso Brown & Muted Sage',
    inspiration: 'Espresso Brown #493A32 · Muted Sage #9AA58B · Soft White #FFFCF7',
    swatches: ['#493A32', '#9AA58B', '#FFFCF7', '#B8B3AA'],
    fonts: 'Cormorant Garamond Semibold + EB Garamond Oldstyle',
    note: 'Earthy espresso brown illuminated by botanical muted sage and soft white.',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectArticle,
  onSelectSeries,
  onSelectChapter,
  onSelectEvent,
  onSelectInitiative,
  onSelectProfile,
}) => {
  const { user, savedFolios, toggleSaveFolio, openAuthModal } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);

  const leadArticle = ARTICLES[0];
  const secondaryFeatured = [ARTICLES[1], ARTICLES[2]];
  const latestPublications = ARTICLES.slice(2, 7);
  const featuredReviews = ARTICLES.filter((a) => a.isReview);
  const upcomingEvents = CONVERSATION_EVENTS.filter(
    (e) => e.status === 'Upcoming'
  ).slice(0, 3);
  const featuredInitiatives = INITIATIVES.slice(0, 4);
  const featuredContributors = COMMUNITY_PROFILES.slice(0, 4);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError(null);
    if (!newsletterEmail.trim()) return;
    setSubmittingNewsletter(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail.trim(),
          readerName: newsletterName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNewsletterError(data.error || 'Could not record subscription.');
      } else {
        setSubscribed(true);
      }
    } catch {
      setNewsletterError('Network interruption. Please try again.');
    } finally {
      setSubmittingNewsletter(false);
    }
  };

  return (
    <div className="w-full">
      {/* =====================================================================
          CHAPTER I — ALABASTER & VERMILION FRONTISPIECE (ZERO BOXES, DOUBLE RULES)
         ===================================================================== */}
      <section className="bg-[#F8F6F1] text-[#292725] px-6 sm:px-12 py-12 md:py-16 border-b-4 border-double border-[#292725]">
        {/* Architectural Top Colophon Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-10 border-b-2 border-[#292725]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-avant font-bold text-[11px] uppercase tracking-[0.22em] text-[#702F3B]">
              ✦ Quarterly Literary Review
            </span>
            <span className="text-[#292725]/30">|</span>
            <span className="font-editorial italic text-lg text-[#514052]">
              Close Reading · Philology · Poetic Prosody · World Literature
            </span>
          </div>
          <div className="font-mono-num text-xs text-[#292725] bg-[#F5F0E6] px-3 py-0.5 border border-[#292725]">
            AUTUMN–WINTER FOLIO · ISSN 2978-410X
          </div>
        </div>

        {/* Expressive Multi-Typographic Hero Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-stretch">
          {/* Left 7 Columns: Mixed-Typography Headline & Lead Essay */}
          <div className="lg:col-span-7 lg:pr-12 lg:border-r-2 lg:border-[#292725] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-5 border-b-2 border-[#702F3B] pb-1">
                <span className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B] font-bold">
                  01 / FRONTISPIECE MANIFESTO
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] leading-[1.02] tracking-tight text-[#292725] mb-6">
                <span className="font-display font-bold">Where </span>
                <span className="font-editorial italic font-normal text-[#702F3B] text-5xl sm:text-7xl lg:text-[4.8rem]">
                  Close Reading
                </span>{' '}
                <span className="font-display font-bold">Meets the </span>
                <span className="font-editorial italic font-normal text-[#514052] underline decoration-[#C9A5A0] decoration-2 underline-offset-8">
                  Living Republic
                </span>{' '}
                <span className="font-avant font-extrabold uppercase text-3xl sm:text-5xl tracking-wider">
                  of Letters.
                </span>
              </h1>

              <p className="font-prose text-base sm:text-lg text-[#493A32] leading-[1.85] mb-10 max-w-[60ch]">
                Vellune is a youth-led literary criticism organisation and digital publication dedicated to the architecture of the sentence, comparative translation, poetic scansion, and emerging critics across forty-six international chapters.
              </p>
            </div>

            {/* Lead Monograph Feature — Open Architectural Hairlines (No Box!) */}
            <div className="pt-8 border-t-4 border-double border-[#292725]">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 bg-[#514052] text-[#F8F6F1] font-avant font-bold text-[10px] uppercase tracking-widest">
                  Cover Monograph
                </span>
                <span className="font-editorial italic text-xl text-[#702F3B]">
                  {leadArticle.seriesTitle}
                </span>
                <span className="font-mono-num text-xs text-[#5C5346]">
                  — {leadArticle.readingTime}
                </span>
              </div>

              <h2
                onClick={() => onSelectArticle(leadArticle.id)}
                className="font-display font-bold text-2xl sm:text-4xl text-[#292725] hover:text-[#702F3B] transition-colors leading-[1.15] mb-3 cursor-pointer"
              >
                {leadArticle.title}
              </h2>

              <p className="font-editorial italic text-xl text-[#493A32] mb-4">
                {leadArticle.subtitle}
              </p>

              <p className="font-prose text-sm text-[#493A32] leading-[1.8] mb-6">
                {leadArticle.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#292725]/30">
                <div className="font-mono-num text-xs text-[#292725]">
                  BY <strong className="underline">{leadArticle.authorName}</strong> ·{' '}
                  <span className="text-[#702F3B]">{leadArticle.publicationDate}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectArticle(leadArticle.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#702F3B] text-[#F8F6F1] border-2 border-[#292725] shadow-[3px_3px_0px_#292725] hover:bg-[#493A32] transition-colors cursor-pointer"
                  >
                    <span>Read Cover Essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('journal')}
                    className="px-4 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#F5F0E6] text-[#292725] border-2 border-[#292725] hover:bg-[#514052] hover:text-[#F8F6F1] transition-colors cursor-pointer"
                  >
                    Explore All 18 Series
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Framed Visual Plate & Issue Highlights */}
          <div className="lg:col-span-5 lg:pl-12 flex flex-col justify-between">
            <div
              onClick={() => onSelectArticle(leadArticle.id)}
              className="cursor-pointer mb-8"
            >
              <EditorialImage
                src={leadArticle.image}
                alt={leadArticle.title}
                caption={leadArticle.imageCaption}
                aspectClass="aspect-[4/3]"
                priority
              />
            </div>

            {/* Open Typographic Issue Ledger (No Boxed Cards) */}
            <div className="border-t-2 border-[#292725] pt-6">
              <div className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#514052] mb-4">
                ✦ Inside This Issue’s Folios
              </div>
              <div className="divide-y divide-[#292725]/25">
                {ARTICLES.slice(1, 4).map((art, i) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art.id)}
                    className="py-3.5 first:pt-0 last:pb-0 group cursor-pointer flex items-baseline gap-4"
                  >
                    <span className="font-editorial italic text-2xl text-[#702F3B] shrink-0">
                      0{i + 2}.
                    </span>
                    <div>
                      <div className="font-mono-num text-[10px] uppercase tracking-widest text-[#514052]">
                        {art.seriesTitle}
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#292725] group-hover:text-[#702F3B] transition-colors leading-snug">
                        {art.title}
                      </h3>
                      <div className="font-prose italic text-xs text-[#5C5346]">
                        By {art.authorName} · {art.readingTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER II — SUNLIT SAFFRON & ULTRAMARINE SPREAD (THE JOURNAL)
         ===================================================================== */}
      <section className="bg-[#F5F0E6] text-[#292725] px-6 sm:px-12 py-14 md:py-20 border-b-4 border-double border-[#292725]">
        {/* Section Header with Mixed Typography */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 mb-12 border-b-2 border-[#292725]">
          <div>
            <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#702F3B] font-bold mb-2">
              02 / THE VELLUNE JOURNAL OF CRITICISM
            </div>
            <h2 className="text-3xl sm:text-5xl text-[#292725] leading-none">
              <span className="font-display font-bold">Featured </span>
              <span className="font-editorial italic text-[#514052] text-4xl sm:text-6xl">
                Critical Essays
              </span>{' '}
              <span className="font-avant font-bold uppercase text-2xl sm:text-3xl tracking-wider text-[#702F3B]">
                & Dispatches
              </span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('journal')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#514052] text-[#F8F6F1] border-2 border-[#292725] shadow-[3px_3px_0px_#292725] hover:bg-[#702F3B] transition-colors cursor-pointer"
          >
            <span>Enter The Full Journal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Open Column Layout with Hairline Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Left 7 Columns: Two Dramatic Visual Essays */}
          <div className="lg:col-span-7 lg:pr-12 lg:border-r-2 lg:border-[#292725] grid grid-cols-1 md:grid-cols-2 gap-10">
            {secondaryFeatured.map((article, idx) => {
              const isSaved = savedFolios.some((f) => f.itemId === article.id);
              return (
                <article
                  key={article.id}
                  className={`flex flex-col justify-between ${
                    idx === 1 ? 'md:border-l md:border-[#292725]/30 md:pl-8' : ''
                  }`}
                >
                  <div
                    onClick={() => onSelectArticle(article.id)}
                    className="cursor-pointer group"
                  >
                    <EditorialImage
                      src={article.image}
                      alt={article.title}
                      aspectClass="aspect-[4/3]"
                      className="mb-5"
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-avant font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#702F3B] text-[#F8F6F1]">
                        {article.seriesTitle}
                      </span>
                      <span className="font-mono-num text-xs text-[#514052]">
                        {article.readingTime}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#292725] group-hover:text-[#702F3B] transition-colors leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="font-editorial italic text-lg text-[#514052] mb-3">
                      {article.subtitle}
                    </p>
                    <p className="font-prose text-sm text-[#493A32] leading-[1.75] mb-5">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#292725] flex items-center justify-between text-xs">
                    <span className="font-mono-num text-[#292725]">
                      BY <strong>{article.authorName}</strong>
                    </span>
                    <button
                      onClick={() =>
                        toggleSaveFolio({
                          itemId: article.id,
                          itemType: 'article',
                          title: article.title,
                          seriesTitle: article.seriesTitle,
                        })
                      }
                      className={`inline-flex items-center gap-1 font-avant font-bold uppercase tracking-wider cursor-pointer ${
                        isSaved
                          ? 'text-[#493A32]'
                          : 'text-[#702F3B] hover:text-[#292725]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{isSaved ? 'Saved' : 'Bookmark'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right 5 Columns: Chronicle of Latest Publications */}
          <div className="lg:col-span-5 lg:pl-12">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#292725]">
              <span className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#514052]">
                Chronicle of Recent Folios
              </span>
              <span className="font-editorial italic text-lg text-[#702F3B]">
                Vol. IV Archive
              </span>
            </div>

            <div className="divide-y divide-[#292725]/30">
              {latestPublications.map((pub, idx) => (
                <div
                  key={pub.id}
                  onClick={() => onSelectArticle(pub.id)}
                  className="py-4 first:pt-1 last:pb-0 group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span
                      className="font-avant font-bold uppercase tracking-wider text-[11px]"
                      style={{
                        color:
                          SERIES_ACCENT_COLORS[
                            idx % SERIES_ACCENT_COLORS.length
                          ],
                      }}
                    >
                      {pub.seriesTitle}
                    </span>
                    <span className="font-mono-num text-[11px] text-[#493A32]">
                      {pub.issueVolume} · {pub.readingTime}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-xl text-[#292725] group-hover:text-[#514052] transition-colors leading-snug mb-1">
                    {pub.title}
                  </h4>
                  <div className="font-editorial italic text-base text-[#493A32]">
                    By {pub.authorName} — {pub.authorRole}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER III — BOTANICAL BLUSH CLAY & ESPRESSO (LITERARY REVIEWS)
         ===================================================================== */}
      <section className="bg-[#E9DCD8] text-[#292725] px-6 sm:px-12 py-14 md:py-20 border-b-4 border-double border-[#292725]">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 mb-12 border-b-2 border-[#292725]">
          <div>
            <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#702F3B] font-bold mb-2">
              03 / THE SECOND READING & POETIC DISSECTIONS
            </div>
            <h2 className="text-3xl sm:text-5xl leading-none">
              <span className="font-editorial italic text-4xl sm:text-6xl text-[#702F3B]">
                Rigorous
              </span>{' '}
              <span className="font-display font-bold">Book Reviews </span>
              <span className="font-avant font-bold uppercase text-2xl sm:text-3xl tracking-wider">
                & Critical Notices
              </span>
            </h2>
          </div>
          <button
            onClick={() => {
              onSelectSeries('second-reading');
              onNavigate('journal');
            }}
            className="px-5 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#292725] text-[#F8F6F1] border-2 border-[#292725] hover:bg-[#702F3B] transition-colors cursor-pointer"
          >
            Read All Reviews →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:divide-x-2 lg:divide-[#292725]">
          {featuredReviews.map((rev, idx) => (
            <div
              key={rev.id}
              onClick={() => onSelectArticle(rev.id)}
              className={`grid grid-cols-1 sm:grid-cols-12 gap-8 items-start cursor-pointer group ${
                idx === 1 ? 'lg:pl-12' : ''
              }`}
            >
              <div className="sm:col-span-5">
                <EditorialImage
                  src={rev.image}
                  alt={rev.title}
                  aspectClass="aspect-[3/4]"
                />
              </div>
              <div className="sm:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-0.5 bg-[#702F3B] text-[#F8F6F1] font-mono-num text-[10px] uppercase tracking-widest mb-3">
                    {rev.seriesTitle} · {rev.readingTime}
                  </div>
                  {rev.reviewedWork && (
                    <div className="font-mono-num text-xs text-[#514052] border-l-2 border-[#702F3B] pl-3 mb-3">
                      <strong>{rev.reviewedWork.bookTitle}</strong>
                      <br />
                      {rev.reviewedWork.bookAuthor} ({rev.reviewedWork.publisher},{' '}
                      {rev.reviewedWork.year})
                    </div>
                  )}
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#292725] group-hover:text-[#702F3B] transition-colors leading-tight mb-4">
                    {rev.title}
                  </h3>
                  <blockquote className="font-editorial italic text-2xl text-[#292725] leading-snug mb-4">
                    “{rev.pullQuote}”
                  </blockquote>
                </div>
                <div className="pt-3 border-t border-[#292725]/30 font-avant font-bold text-xs uppercase tracking-wider text-[#702F3B]">
                  Reviewed by {rev.authorName} →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          CHAPTER IV — DEEP BOTANICAL FOREST & ANTIQUE GOLD (ANNOTATOR'S GUIDE)
         ===================================================================== */}
      <section className="bg-[#493A32] text-[#F8F6F1] px-6 sm:px-12 py-14 md:py-20 border-b-4 border-double border-[#292725]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Columns: Curriculum Introduction */}
          <div className="lg:col-span-5 lg:border-r lg:border-[#F8F6F1]/25 lg:pr-12">
            <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#C9A5A0] mb-3">
              04 / PEDAGOGICAL APPARATUS
            </div>
            <h2 className="text-4xl sm:text-5xl leading-[1.05] mb-5">
              <span className="font-editorial italic text-5xl sm:text-6xl text-[#C9A5A0]">
                The Annotator’s
              </span>
              <br />
              <span className="font-display font-bold text-[#F8F6F1]">
                Guide to Close Reading
              </span>
            </h2>
            <p className="font-prose text-base text-[#E9DCD8] leading-[1.85] mb-8">
              Our multi-chapter critical manual teaching the craft of reading with pencil in hand—from syntactic architecture and free indirect discourse to prosodic scansion and comparative intertextuality.
            </p>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-[#F8F6F1]/25">
              <button
                onClick={() => onNavigate('annotator')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#C9A5A0] text-[#292725] border-2 border-[#F8F6F1] hover:bg-[#F8F6F1] transition-colors cursor-pointer"
              >
                <span>Open Full Manual</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('reading-room')}
                className="px-5 py-2.5 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#C9A5A0] text-[#F5F0E6] hover:bg-[#C9A5A0] hover:text-[#292725] transition-colors cursor-pointer"
              >
                Enter The Reading Room →
              </button>
            </div>
          </div>

          {/* Right 7 Columns: Flowing Chapter Specimens (Zero Box Clutter) */}
          <div className="lg:col-span-7 divide-y divide-[#F8F6F1]/25 border-t border-b border-[#F8F6F1]/25">
            {ANNOTATOR_CHAPTERS.map((ch, i) => (
              <div
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  onNavigate('annotator');
                }}
                className="py-6 px-3 hover:bg-[#514052] transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-editorial italic text-4xl text-[#C9A5A0] shrink-0">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="font-mono-num text-xs text-[#C9A5A0] uppercase tracking-wider mb-1">
                      {ch.chapterNumber} · Specimen: {ch.literarySpecimen.author}{' '}
                      ({ch.literarySpecimen.year})
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#F8F6F1] group-hover:text-[#C9A5A0] transition-colors">
                      {ch.title}
                    </h3>
                    <p className="font-editorial italic text-lg text-[#E9DCD8] mt-0.5">
                      {ch.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#C9A5A0] group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER V — LAVENDER STONE TAPESTRY: ALL 18 SERIES & PINTEREST LOOKBOOK
         ===================================================================== */}
      <section className="bg-[#E9DCD8] text-[#292725] px-6 sm:px-12 py-14 md:py-20 border-b-4 border-double border-[#292725]">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 mb-12 border-b-2 border-[#292725]">
          <div>
            <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#514052] font-bold mb-2">
              05 / COMPLETE EDITORIAL ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-5xl leading-none">
              <span className="font-display font-bold">The Eighteen </span>
              <span className="font-editorial italic text-4xl sm:text-6xl text-[#514052]">
                Permanent Series
              </span>{' '}
              <span className="font-avant font-bold uppercase text-2xl sm:text-3xl tracking-wider text-[#702F3B]">
                of Vellune
              </span>
            </h2>
          </div>
          <span className="font-editorial italic text-xl text-[#514052]">
            Click any series to filter the Journal archive
          </span>
        </div>

        {/* Open 3-Column Typographic Tapestry with Hairline Rules (No Cramped Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 mb-16">
          {EDITORIAL_SERIES.map((series, idx) => {
            const badgeColor =
              SERIES_ACCENT_COLORS[idx % SERIES_ACCENT_COLORS.length];
            return (
              <button
                key={series.id}
                onClick={() => {
                  onSelectSeries(series.id);
                  onNavigate('journal');
                }}
                className="text-left pb-6 border-b-2 border-[#292725]/25 hover:border-[#292725] transition-all group cursor-pointer flex items-start gap-4"
              >
                <span
                  className="font-editorial italic text-3xl leading-none px-2.5 py-1 border border-[#292725] text-[#F8F6F1] shrink-0"
                  style={{ backgroundColor: badgeColor }}
                >
                  {series.number}
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#292725] group-hover:text-[#702F3B] transition-colors mb-1">
                    {series.title}
                  </h3>
                  <p className="font-prose text-xs text-[#3D384D] leading-relaxed">
                    {series.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Curated Pinterest Editorial Color & Typography Lookbook Strip */}
        <div className="pt-12 border-t-4 border-double border-[#292725]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#702F3B]" />
              <h3 className="font-avant font-bold text-sm uppercase tracking-[0.2em] text-[#292725]">
                Vellune Visual Identity · Pinterest Editorial Color & Typography Harmonies
              </h3>
            </div>
            <span className="font-editorial italic text-lg text-[#514052]">
              Curated Chromatic Chapters Across This Issue
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PINTEREST_COLOR_STORIES.map((story) => (
              <div
                key={story.name}
                className="border-t-2 border-[#292725] pt-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    {story.swatches.map((hex) => (
                      <span
                        key={hex}
                        title={hex}
                        className="w-7 h-7 border border-[#292725] inline-block"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <div className="font-avant font-bold text-xs uppercase tracking-wider text-[#514052] mb-1">
                    {story.name}
                  </div>
                  <div className="font-editorial italic text-lg text-[#292725] mb-1">
                    Inspired by {story.inspiration}
                  </div>
                  <p className="font-prose text-xs text-[#3D384D] leading-relaxed mb-3">
                    {story.note}
                  </p>
                </div>
                <div className="font-mono-num text-[10px] uppercase tracking-wider text-[#702F3B] border-t border-[#292725]/20 pt-2">
                  TYPE: {story.fonts}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER VI — MIDNIGHT OXFORD NAVY & CORAL (SALONS, INITIATIVES & COMMUNITY)
         ===================================================================== */}
      <section className="bg-[#514052] text-[#F8F6F1] px-6 sm:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b-2 border-[#F8F6F1]/25">
          {/* Left 6 Columns: Upcoming Conversations */}
          <div className="lg:col-span-6 lg:border-r lg:border-[#F8F6F1]/25 lg:pr-12">
            <div className="flex items-baseline justify-between pb-4 mb-8 border-b-2 border-[#C9A5A0]">
              <div>
                <div className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#C9A5A0] mb-1">
                  06 / SALONS & SEMINARS
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F8F6F1]">
                  Upcoming{' '}
                  <span className="font-editorial italic font-normal text-[#F5F0E6]">
                    Conversations
                  </span>
                </h2>
              </div>
              <button
                onClick={() => onNavigate('conversations')}
                className="font-avant font-bold text-xs uppercase tracking-wider text-[#F5F0E6] hover:text-[#C9A5A0] cursor-pointer"
              >
                Full Calendar →
              </button>
            </div>

            <div className="divide-y divide-[#F8F6F1]/20">
              {upcomingEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => {
                    onSelectEvent(evt.id);
                    onNavigate('conversations');
                  }}
                  className="py-5 first:pt-0 last:pb-0 group cursor-pointer"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-1.5">
                    <span className="px-2 py-0.5 bg-[#C9A5A0] text-[#292725] font-avant font-bold text-[10px] uppercase tracking-wider">
                      {evt.format}
                    </span>
                    <span className="font-mono-num text-[#F5F0E6]">
                      {evt.date} · {evt.time}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#F8F6F1] group-hover:text-[#C9A5A0] transition-colors leading-snug mb-1">
                    {evt.title}
                  </h3>
                  <div className="font-editorial italic text-lg text-[#E9DCD8]">
                    {evt.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 6 Columns: Flagship Initiatives */}
          <div className="lg:col-span-6">
            <div className="flex items-baseline justify-between pb-4 mb-8 border-b-2 border-[#F5F0E6]">
              <div>
                <div className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#F5F0E6] mb-1">
                  07 / FELLOWSHIPS & PRIZES
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F8F6F1]">
                  Flagship{' '}
                  <span className="font-editorial italic font-normal text-[#C9A5A0]">
                    Initiatives
                  </span>
                </h2>
              </div>
              <button
                onClick={() => onNavigate('initiatives')}
                className="font-avant font-bold text-xs uppercase tracking-wider text-[#F5F0E6] hover:text-[#C9A5A0] cursor-pointer"
              >
                All 12 Programmes →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {featuredInitiatives.map((init) => (
                <div
                  key={init.id}
                  onClick={() => {
                    onSelectInitiative(init.id);
                    onNavigate('initiatives');
                  }}
                  className="border-t border-[#F8F6F1]/30 pt-4 hover:border-[#C9A5A0] transition-colors cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono-num text-xs text-[#C9A5A0] mb-1">
                      {init.number} / {init.category}
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#F8F6F1] group-hover:text-[#F5F0E6] transition-colors leading-snug mb-2">
                      {init.title}
                    </h3>
                    <p className="font-prose text-xs text-[#E9DCD8] leading-relaxed mb-3">
                      {init.summary}
                    </p>
                  </div>
                  <div className="font-avant font-bold text-[11px] uppercase tracking-wider text-[#F5F0E6]">
                    {init.statusText} →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Contributors Open Masthead */}
        <div className="py-14 border-b-2 border-[#F8F6F1]/25">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
            <div>
              <div className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#C9A5A0] mb-1">
                08 / INTERNATIONAL MASTHEAD
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F8F6F1]">
                Voices of the{' '}
                <span className="font-editorial italic font-normal text-[#F5F0E6]">
                  Vellune Circle
                </span>
              </h2>
            </div>
            <button
              onClick={() => onNavigate('community')}
              className="font-avant font-bold text-xs uppercase tracking-wider text-[#F5F0E6] hover:text-[#C9A5A0] cursor-pointer"
            >
              Complete Directory →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredContributors.map((person) => (
              <div
                key={person.id}
                onClick={() => {
                  onSelectProfile(person.id);
                  onNavigate('community');
                }}
                className="border-t-2 border-[#C9A5A0] pt-4 cursor-pointer group"
              >
                <div className="font-mono-num text-[11px] text-[#F5F0E6] uppercase tracking-wider mb-1">
                  {person.group}
                </div>
                <h3 className="font-display font-bold text-2xl text-[#F8F6F1] group-hover:text-[#C9A5A0] transition-colors">
                  {person.name}
                </h3>
                <div className="font-editorial italic text-lg text-[#C9A5A0] mb-2">
                  {person.role} · {person.location}
                </div>
                <p className="font-prose text-xs text-[#E9DCD8] leading-relaxed">
                  {person.shortBio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Commonplace Desk & Fortnightly Letter */}
        <div className="pt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:border-r lg:border-[#F8F6F1]/25 lg:pr-12">
            <div className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#F5F0E6] mb-2">
              09 / CLOUD COMMONPLACE BOOK
            </div>
            <h2 className="font-display font-bold text-3xl text-[#F8F6F1] leading-snug mb-3">
              Your Private{' '}
              <span className="font-editorial italic font-normal text-[#C9A5A0] text-4xl">
                Literary Desk
              </span>{' '}
              in the Cloud.
            </h2>
            <p className="font-prose text-sm text-[#E9DCD8] leading-relaxed mb-6">
              Sign in with a verified account to bookmark essays across devices, record private marginalia, track your Deep Reading Challenges, and follow manuscript submissions.
            </p>
            <button
              onClick={openAuthModal}
              className="px-6 py-3 text-xs font-avant font-bold uppercase tracking-wider bg-[#F5F0E6] text-[#292725] border-2 border-[#F8F6F1] hover:bg-[#C9A5A0] hover:text-[#F8F6F1] transition-colors cursor-pointer"
            >
              {user ? 'Open Your Member Desk →' : 'Sign In / Create Account →'}
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#C9A5A0] mb-2">
              10 / THE VELLUNE FORTNIGHTLY LETTER
            </div>
            <h2 className="font-display font-bold text-3xl text-[#F8F6F1] mb-2">
              Receive New Essays, Annotated Specimens & Salon Invitations.
            </h2>
            <p className="font-prose text-sm text-[#E9DCD8] leading-relaxed mb-6">
              Dispatched every second Sunday with our latest criticism and one annotated literary passage from <em>The Annotator’s Guide</em>.
            </p>

            {subscribed ? (
              <div className="p-5 border-2 border-[#F5F0E6] bg-[#493A32] text-[#F8F6F1]">
                <div className="flex items-center gap-2 text-xs font-avant font-bold uppercase tracking-widest text-[#F5F0E6] mb-1">
                  <Check className="w-4 h-4" />
                  <span>Subscription Recorded in Chancery</span>
                </div>
                <p className="text-sm text-[#F8F6F1]">
                  Thank you{newsletterName ? `, ${newsletterName}` : ''}. The current Autumn–Winter folio has been registered for <strong>{newsletterEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-num text-xs uppercase tracking-wider text-[#F5F0E6] mb-1.5">
                      Reader Name (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={80}
                      value={newsletterName}
                      onChange={(e) => setNewsletterName(e.target.value)}
                      placeholder="e.g., Eleanor Vance"
                      className="w-full px-4 py-2.5 text-sm bg-[#F8F6F1] text-[#292725] border-2 border-[#F5F0E6] focus:outline-none focus:border-[#C9A5A0]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-num text-xs uppercase tracking-wider text-[#F5F0E6] mb-1.5">
                      Electronic Mail Address *
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={160}
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="reader@institution.edu"
                      className="w-full px-4 py-2.5 text-sm bg-[#F8F6F1] text-[#292725] border-2 border-[#F5F0E6] focus:outline-none focus:border-[#C9A5A0]"
                    />
                  </div>
                </div>
                {newsletterError && (
                  <p className="text-xs text-[#C9A5A0]">{newsletterError}</p>
                )}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono-num text-[11px] text-[#E9DCD8]">
                    NO COMMERCIAL DISPATCHES · UNSUBSCRIBE ANYTIME
                  </span>
                  <button
                    type="submit"
                    disabled={submittingNewsletter}
                    className="px-6 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#C9A5A0] text-[#292725] border-2 border-[#F8F6F1] hover:bg-[#F5F0E6] transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {submittingNewsletter
                      ? 'Recording...'
                      : 'Subscribe to Letter →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

interface AboutViewProps {
  onNavigate: (section: NavSection) => void;
  onSelectProfile: (profileId: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onSelectProfile,
}) => {
  const editorialTeam = COMMUNITY_PROFILES.filter(
    (p) =>
      p.group === 'Editorial Team' || p.group === 'International Contributors'
  );

  return (
    <div className="w-full">
      {/* Chapter Banner in Saffron & Ultramarine */}
      <header className="bg-[#F5F0E6] text-[#292725] px-6 sm:px-12 py-14 md:py-20 border-b-4 border-double border-[#292725]">
        <div className="flex items-center gap-2 font-mono-num text-xs uppercase tracking-[0.22em] text-[#702F3B] font-bold mb-3">
          <Compass className="w-4 h-4" />
          <span>Institutional Monograph · Est. 2023</span>
        </div>
        <h1 className="text-4xl sm:text-6xl text-[#292725] leading-[1.06] mb-6 max-w-4xl">
          <span className="font-display font-bold">About Vellune: An </span>
          <span className="font-editorial italic text-[#514052] text-5xl sm:text-7xl">
            Independent Institution
          </span>{' '}
          <span className="font-display font-bold">for Literary Criticism.</span>
        </h1>
        <p className="font-prose text-lg text-[#493A32] max-w-3xl leading-relaxed">
          Dedicated to literature, critical thinking, close textual analysis, intellectual exchange, and the cultivation of emerging literary critics worldwide.
        </p>
      </header>

      {/* Founding Story, Mission & Vision on Warm Alabaster */}
      <section className="bg-[#F8F6F1] px-6 sm:px-12 py-14 md:py-20 border-b-4 border-double border-[#292725]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 lg:border-r-2 lg:border-[#292725] lg:pr-12 space-y-8">
            <div>
              <div className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B] mb-2">
                01 / ABOUT VELLUNE
              </div>
              <h2 className="font-display font-bold text-3xl text-[#292725] mb-4">
                Restoring Seriousness to Youth Literary Culture
              </h2>
              <p className="font-prose text-base text-[#292725] leading-[1.85] editorial-dropcap">
                Vellune was conceived not as a conventional student club or casual book blog, but as a permanent digital and print literary institution modeled on the great independent cultural reviews. Too often, young writers are told that serious philological inquiry, translation criticism, and sustained essayism must wait until postgraduate study. Vellune rejects that postponement. We provide a rigorous, collegial forum where emerging critics read with pencil in hand and write for the common reader.
              </p>
            </div>

            <div className="pt-6 border-t-2 border-[#292725]">
              <div className="font-mono-num text-xs uppercase tracking-widest text-[#514052] mb-2">
                02 / OUR HISTORY & FOUNDING STORY
              </div>
              <h3 className="font-display font-bold text-2xl text-[#292725] mb-3">
                From an Edinburgh Seminar Table to an International Network
              </h3>
              <p className="font-prose text-sm text-[#493A32] leading-[1.85]">
                Founded in autumn 2023 around a seminar table in Edinburgh and London by a circle of six young readers annotating W. G. Sebald and Virginia Woolf, Vellune began as a mimeographed critical broadsheet. Within three years, that fortnightly marginalia exchange expanded into eighteen regular editorial series, four comprehensive chapters of <em>The Annotator’s Guide</em>, thirty-four chartered school chapters, and twelve international city hubs spanning Dublin, Kyoto, Stockholm, Toronto, and São Paulo.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="border-l-4 border-[#702F3B] pl-6 py-2">
              <div className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B] mb-2">
                03 / OUR MISSION
              </div>
              <h3 className="font-display font-bold text-2xl text-[#292725] mb-2">
                Close Reading as Civic & Intellectual Discipline
              </h3>
              <p className="font-prose text-sm text-[#493A32] leading-relaxed">
                To cultivate critical thinking, syntactic sensitivity, and intellectual generosity among young readers and emerging writers—equipping them to engage complex literary works across eras and languages without reductive jargon.
              </p>
            </div>

            <div className="border-l-4 border-[#514052] pl-6 py-2">
              <div className="font-mono-num text-xs uppercase tracking-widest text-[#514052] mb-2">
                04 / OUR VISION
              </div>
              <h3 className="font-display font-bold text-2xl text-[#292725] mb-2">
                A Borderless Republic of Emerging Critics
              </h3>
              <p className="font-prose text-sm text-[#493A32] leading-relaxed">
                To establish the definitive global journal and pedagogical commons for emerging literary critics, ensuring that careful, slow reading remains a vibrant public art across schools, universities, and independent reading rooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Philosophy on Deep Forest */}
      <section className="bg-[#493A32] text-[#F8F6F1] px-6 sm:px-12 py-14 md:py-20 border-b-4 border-double border-[#292725]">
        <div className="font-mono-num text-xs uppercase tracking-widest text-[#C9A5A0] mb-2">
          05 / OUR EDITORIAL PHILOSOPHY
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-10">
          Four Tenets of the{' '}
          <span className="font-editorial italic font-normal text-[#C9A5A0] text-4xl sm:text-5xl">
            Vellune Critical Method
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: 'I',
              title: 'Evidence Over Impression',
              body: 'Every critical claim must be anchored in the demonstrable mechanics of the sentence—syntax, rhythm, diction, focalization, and form—never in vague blurb adjectives.',
            },
            {
              num: 'II',
              title: 'Clarity Over Jargon',
              body: 'We write for the attentive general reader as well as the scholar. Theoretical concepts must illuminate the literary text rather than obscure it behind opaque terminology.',
            },
            {
              num: 'III',
              title: 'Comparative Horizon',
              body: 'No national literature is an island. We read canonical works alongside neglected voices, multiple translations, and global literary traditions.',
            },
            {
              num: 'IV',
              title: 'Collegial Disputatio',
              body: 'Disagreement is the lifeblood of criticism. We welcome competing interpretations conducted with intellectual charity and philological exactitude.',
            },
          ].map((tenet) => (
            <div key={tenet.num} className="pt-5 border-t-2 border-[#C9A5A0]">
              <div className="font-editorial italic text-3xl text-[#C9A5A0] mb-2">
                Tenet {tenet.num}
              </div>
              <h3 className="font-display font-bold text-xl text-[#F8F6F1] mb-2">
                {tenet.title}
              </h3>
              <p className="font-prose text-xs text-[#E9DCD8] leading-relaxed">
                {tenet.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Senior Editorial Masthead & Partnerships on Blush Clay */}
      <section className="bg-[#E9DCD8] text-[#292725] px-6 sm:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 lg:border-r-2 lg:border-[#292725] lg:pr-12">
            <div className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B] mb-2">
              06 / OUR TEAM
            </div>
            <h2 className="font-display font-bold text-3xl mb-6">
              Senior Editorial Masthead
            </h2>
            <div className="divide-y divide-[#292725]/30 border-y-2 border-[#292725]">
              {editorialTeam.map((member) => (
                <div
                  key={member.id}
                  onClick={() => {
                    onSelectProfile(member.id);
                    onNavigate('community');
                  }}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F5F0E6] px-3 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="font-display font-bold text-xl text-[#292725]">
                      {member.name}
                    </div>
                    <div className="font-editorial italic text-lg text-[#702F3B]">
                      {member.role}
                    </div>
                  </div>
                  <div className="font-mono-num text-xs text-[#514052]">
                    {member.location} · View Dossier →
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B] mb-2">
              07 / PARTNERSHIPS & COLLABORATIONS
            </div>
            <h2 className="font-display font-bold text-3xl mb-4">
              Institutional Partners
            </h2>
            <p className="font-prose text-sm text-[#292725] leading-relaxed mb-6">
              Vellune collaborates with independent literary presses, university comparative literature departments, secondary school libraries, and international translation centers to expand access to literary criticism.
            </p>
            <ul className="space-y-4 text-xs text-[#292725] border-t-2 border-[#292725] pt-5 mb-8">
              <li>
                <strong className="font-avant uppercase tracking-wider text-[#702F3B]">
                  Independent Presses:
                </strong>{' '}
                Review-copy and archival reprint partnerships for{' '}
                <em>The Second Reading</em> and <em>Pages for All</em>.
              </li>
              <li>
                <strong className="font-avant uppercase tracking-wider text-[#514052]">
                  Schools & Libraries:
                </strong>{' '}
                Free close-reading workshops and seminar kits through{' '}
                <em>The Critical Reading Project</em>.
              </li>
              <li>
                <strong className="font-avant uppercase tracking-wider text-[#493A32]">
                  Festivals & Cultural Institutes:
                </strong>{' '}
                Youth shadow-juries and joint translation symposia.
              </li>
            </ul>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 text-xs font-avant font-bold uppercase tracking-wider bg-[#292725] text-[#F8F6F1] border-2 border-[#292725] hover:bg-[#702F3B] transition-colors cursor-pointer"
            >
              Propose an Institutional Partnership →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
