import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Check,
  BookMarked,
  User,
  FileText,
  Bookmark,
  Type,
} from 'lucide-react';
import { Article, ARTICLES, COMMUNITY_PROFILES } from '../data/velluneData';
import { EditorialImage } from './EditorialImage';
import { useAuth } from '../contexts/AuthContext';

interface ArticleReaderViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
  onSelectAuthor: (authorId: string) => void;
  onSelectSeries: (seriesId: string) => void;
}

export const ArticleReaderView: React.FC<ArticleReaderViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  onSelectAuthor,
  onSelectSeries,
}) => {
  const { savedFolios, toggleSaveFolio } = useAuth();
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showMarginalia, setShowMarginalia] = useState(true);
  const [largeType, setLargeType] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadProgress(100);
        return;
      }
      setReadProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  const isSaved = savedFolios.some((f) => f.itemId === article.id);

  const authorProfile = COMMUNITY_PROFILES.find(
    (p) => p.id === article.authorId
  );
  const relatedArticles = ARTICLES.filter((a) =>
    article.relatedArticleIds.includes(a.id)
  );

  const handleCopyCitation = () => {
    const citation = `${article.authorName}, "${article.title}," Vellune (${article.seriesTitle}), ${article.issueVolume}, ${article.publicationDate}.`;
    navigator.clipboard?.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <article className="w-full relative bg-[#F8F6F1]">
      {/* Top Chromatic Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[4px] z-50 bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#702F3B] transition-transform duration-100 origin-left"
          style={{ transform: `scaleX(${readProgress / 100})` }}
        />
      </div>

      {/* Dramatic Color-Blocked Monograph Header */}
      <header className="bg-[#F5F0E6] text-[#292725] px-6 sm:px-12 py-12 md:py-16 border-b-4 border-double border-[#292725]">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-[#292725]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-avant font-bold uppercase tracking-widest text-[#292725] hover:text-[#702F3B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to The Journal</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => onSelectSeries(article.seriesId)}
              className="px-3 py-1 bg-[#702F3B] text-[#F8F6F1] font-avant font-bold uppercase tracking-widest text-[10px] cursor-pointer"
            >
              Series: {article.seriesTitle}
            </button>
            <span className="font-mono-num text-[#514052] font-bold">
              {article.issueVolume} · {article.readingTime}
            </span>
          </div>
        </div>

        <div className="max-w-4xl">
          <div className="font-mono-num text-xs uppercase tracking-[0.2em] text-[#702F3B] mb-3">
            PUBLISHED {article.publicationDate.toUpperCase()} · VELLUNE MONOGRAPH
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#292725] leading-[1.06] tracking-tight mb-5">
            {article.title}
          </h1>

          <p className="font-editorial italic text-2xl sm:text-3xl text-[#514052] leading-snug mb-8">
            {article.subtitle}
          </p>

          {article.reviewedWork && (
            <div className="border-l-4 border-[#702F3B] bg-[#F8F6F1] px-6 py-4 mb-8">
              <div className="font-avant font-bold text-[10px] uppercase tracking-widest text-[#702F3B] mb-1">
                Reviewed Under The Second Reading
              </div>
              <div className="font-display font-bold text-2xl text-[#292725]">
                <span className="font-editorial italic font-normal text-3xl text-[#514052]">
                  {article.reviewedWork.bookTitle}
                </span>{' '}
                — by {article.reviewedWork.bookAuthor}
              </div>
              <div className="text-xs text-[#493A32] mt-1 font-mono-num">
                {article.reviewedWork.publisher} · {article.reviewedWork.year}
              </div>
            </div>
          )}

          {/* Author Byline & Utility Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t-2 border-[#292725]">
            <div>
              <div className="font-display font-bold text-xl text-[#292725]">
                By{' '}
                <button
                  onClick={() => onSelectAuthor(article.authorId)}
                  className="underline decoration-[#702F3B] decoration-2 underline-offset-4 hover:text-[#702F3B] transition-colors cursor-pointer"
                >
                  {article.authorName}
                </button>
              </div>
              <div className="font-editorial italic text-lg text-[#493A32]">
                {article.authorRole}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setLargeType(!largeType)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] transition-colors cursor-pointer ${
                  largeType
                    ? 'bg-[#292725] text-[#F8F6F1]'
                    : 'bg-[#F8F6F1] text-[#292725] hover:bg-[#514052] hover:text-[#F8F6F1]'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>{largeType ? 'Standard Type' : 'Large Type'}</span>
              </button>
              <button
                onClick={() =>
                  toggleSaveFolio({
                    itemId: article.id,
                    itemType: 'article',
                    title: article.title,
                    seriesTitle: article.seriesTitle,
                  })
                }
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-[#493A32] text-[#F8F6F1]'
                    : 'bg-[#F8F6F1] text-[#292725] hover:bg-[#702F3B] hover:text-[#F8F6F1]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Saved' : 'Save Folio'}</span>
              </button>
              {article.marginalia.length > 0 && (
                <button
                  onClick={() => setShowMarginalia(!showMarginalia)}
                  className={`px-3.5 py-2 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] transition-colors cursor-pointer ${
                    showMarginalia
                      ? 'bg-[#514052] text-[#F8F6F1]'
                      : 'bg-[#F8F6F1] text-[#292725]'
                  }`}
                >
                  {showMarginalia ? 'Hide Marginalia' : 'Show Marginalia'}
                </button>
              )}
              <button
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] bg-[#F8F6F1] text-[#292725] hover:bg-[#E9DCD8] transition-colors cursor-pointer"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#493A32]" />
                    <span>Cited</span>
                  </>
                ) : (
                  <>
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Cite</span>
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] bg-[#F8F6F1] text-[#292725] hover:bg-[#E9DCD8] transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#493A32]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 sm:px-12 py-12 md:py-16">
        {/* Primary Visual Plate */}
        <div className="mb-14 max-w-5xl">
          <EditorialImage
            src={article.image}
            alt={article.title}
            caption={article.imageCaption}
            aspectClass="aspect-[16/9]"
          />
        </div>

        {/* Asymmetric Reading Canvas (8 Columns Prose / 4 Columns Open Marginalia Rail) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 lg:border-r-2 lg:border-[#292725] lg:pr-12">
            {article.paragraphs.map((para, idx) => {
              const marginNote = article.marginalia.find(
                (m) => m.paragraphIndex === idx
              );
              return (
                <div key={idx} className="mb-8 max-w-[66ch]">
                  <p
                    className={`font-prose ${
                      largeType
                        ? 'text-[19px] md:text-[20px] leading-[1.92]'
                        : 'text-[16.5px] md:text-[17.5px] leading-[1.86]'
                    } text-[#292725] ${idx === 0 ? 'editorial-dropcap' : ''}`}
                  >
                    {para}
                    {marginNote && (
                      <sup className="ml-1.5 px-1.5 py-0.5 bg-[#702F3B] text-[#F8F6F1] font-mono-num text-[10px] font-bold">
                        {marginNote.refNumber}
                      </sup>
                    )}
                  </p>

                  {idx === 1 && (
                    <blockquote className="my-12 py-8 px-6 bg-[#E9DCD8] border-y-4 border-double border-[#292725]">
                      <p className="font-editorial italic text-3xl sm:text-4xl text-[#292725] leading-[1.2]">
                        “{article.pullQuote}”
                      </p>
                      <footer className="mt-4 font-avant font-bold text-xs uppercase tracking-widest text-[#702F3B]">
                        — {article.authorName} · {article.seriesTitle}
                      </footer>
                    </blockquote>
                  )}

                  {showMarginalia && marginNote && (
                    <div className="lg:hidden mt-4 border-l-4 border-[#702F3B] pl-4 py-2 text-xs text-[#493A32]">
                      <div className="font-mono-num text-[#702F3B] font-bold mb-1">
                        Margin Note [{marginNote.refNumber}] — “
                        {marginNote.anchorPhrase}”
                      </div>
                      <p>{marginNote.commentary}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Open Contributor Colophon */}
            <div className="mt-14 pt-8 border-t-4 border-double border-[#292725] flex flex-col sm:flex-row items-start justify-between gap-6">
              <div>
                <div className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B] mb-1">
                  Contributor Monograph
                </div>
                <h3 className="font-display font-bold text-3xl text-[#292725]">
                  {article.authorName}
                </h3>
                <p className="font-editorial italic text-xl text-[#514052] mb-3">
                  {article.authorRole}
                </p>
                <p className="font-prose text-sm text-[#493A32] leading-relaxed max-w-xl">
                  {authorProfile
                    ? authorProfile.fullBio
                    : 'Contributor to Vellune’s quarterly literary criticism and close-reading seminars.'}
                </p>
              </div>
              {authorProfile && (
                <button
                  onClick={() => onSelectAuthor(authorProfile.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#292725] text-[#F8F6F1] hover:bg-[#702F3B] transition-colors shrink-0 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Full Dossier →</span>
                </button>
              )}
            </div>
          </div>

          {/* Right 4 Columns: Open Marginalia & Apparatus */}
          <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-28">
            {showMarginalia && article.marginalia.length > 0 && (
              <div>
                <div className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#702F3B] mb-4 pb-2 border-b-2 border-[#292725]">
                  ✦ Editorial Marginalia
                </div>
                <div className="divide-y divide-[#292725]/25">
                  {article.marginalia.map((note) => (
                    <div key={note.refNumber} className="py-4 first:pt-0">
                      <div className="font-mono-num text-xs text-[#514052] font-bold mb-1">
                        [{note.refNumber}] “{note.anchorPhrase}”
                      </div>
                      <p className="font-prose text-xs text-[#493A32] leading-relaxed">
                        {note.commentary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t-2 border-[#292725] pt-6">
              <div className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#493A32] mb-4">
                Folio Colophon
              </div>
              <dl className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-[#292725]/20">
                  <dt className="font-mono-num text-[#493A32]">SERIES</dt>
                  <dd className="font-display font-bold text-sm text-[#292725]">
                    {article.seriesTitle}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[#292725]/20">
                  <dt className="font-mono-num text-[#493A32]">VOLUME</dt>
                  <dd className="font-mono-num text-[#702F3B] font-bold">
                    {article.issueVolume}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b border-[#292725]/20">
                  <dt className="font-mono-num text-[#493A32]">DATE</dt>
                  <dd className="font-prose italic text-[#292725]">
                    {article.publicationDate}
                  </dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="font-mono-num text-[#493A32]">LENGTH</dt>
                  <dd className="font-mono-num text-[#292725]">
                    {article.readingTime}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t-4 border-double border-[#292725]">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-display font-bold text-3xl text-[#292725]">
                Further Reading in{' '}
                <span className="font-editorial italic font-normal text-4xl text-[#702F3B]">
                  The Journal
                </span>
              </h2>
              <button
                onClick={onBack}
                className="font-avant font-bold text-xs uppercase tracking-widest text-[#514052] hover:underline cursor-pointer"
              >
                Full Archive →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.id)}
                  className="group cursor-pointer border-t-2 border-[#292725] pt-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className="font-avant font-bold uppercase text-[#702F3B]">
                        {rel.seriesTitle}
                      </span>
                      <span className="font-mono-num text-[#493A32]">
                        · {rel.readingTime}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#292725] group-hover:text-[#702F3B] transition-colors leading-snug mb-2">
                      {rel.title}
                    </h3>
                    <p className="font-prose text-xs text-[#493A32] leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#292725]/20 text-xs font-mono-num text-[#292725] flex items-center justify-between">
                    <span>BY {rel.authorName.toUpperCase()}</span>
                    <FileText className="w-3.5 h-3.5 text-[#702F3B]" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
