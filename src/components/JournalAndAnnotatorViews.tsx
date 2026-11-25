import React, { useState } from 'react';
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Bookmark,
} from 'lucide-react';
import {
  ARTICLES,
  EDITORIAL_SERIES,
  ANNOTATOR_CHAPTERS,
  IMAGES,
} from '../data/velluneData';
import { EditorialImage } from './EditorialImage';
import { useAuth } from '../contexts/AuthContext';

interface JournalViewProps {
  selectedSeriesId: string;
  onSelectSeries: (seriesId: string) => void;
  onSelectArticle: (articleId: string) => void;
}

const SERIES_PALETTE = [
  '#702F3B',
  '#514052',
  '#493A32',
  '#493A32',
  '#514052',
  '#702F3B',
];

export const JournalView: React.FC<JournalViewProps> = ({
  selectedSeriesId,
  onSelectSeries,
  onSelectArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSeriesDirectory, setShowAllSeriesDirectory] = useState(false);

  const activeSeriesInfo = EDITORIAL_SERIES.find(
    (s) => s.id === selectedSeriesId
  );

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesSeries =
      selectedSeriesId === 'all' || article.seriesId === selectedSeriesId;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.subtitle.toLowerCase().includes(q) ||
      article.authorName.toLowerCase().includes(q) ||
      article.seriesTitle.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q);
    return matchesSeries && matchesQuery;
  });

  return (
    <div className="w-full">
      {/* Dramatic Cobalt & Saffron Journal Masthead */}
      <header className="bg-[#514052] text-[#F8F6F1] px-6 sm:px-12 py-14 md:py-18 border-b-4 border-double border-[#292725]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#F5F0E6]">
            ✦ Folio 02 · Searchable Literary Criticism Archive
          </div>
          <button
            onClick={() => setShowAllSeriesDirectory(!showAllSeriesDirectory)}
            className="px-4 py-1.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#F5F0E6] text-[#292725] border-2 border-[#292725] hover:bg-[#702F3B] hover:text-[#F8F6F1] transition-colors cursor-pointer"
          >
            {showAllSeriesDirectory
              ? 'Close 18 Series Index ×'
              : 'Browse All 18 Series ⊞'}
          </button>
        </div>

        <h1 className="text-4xl sm:text-6xl leading-[1.04] mb-5">
          <span className="font-display font-bold">The Vellune </span>
          <span className="font-editorial italic text-[#F5F0E6] text-5xl sm:text-7xl">
            Journal
          </span>{' '}
          <span className="font-avant font-bold uppercase text-2xl sm:text-4xl tracking-wider text-[#C9A5A0]">
            of Criticism
          </span>
        </h1>
        <p className="font-prose text-base sm:text-lg text-[#E9DCD8] max-w-3xl leading-relaxed">
          Housing long-form literary criticism, close readings, book reviews, comparative essays, author conversations, and prosodic studies across eighteen permanent editorial series.
        </p>

        {/* Search & Series Filter Ribbon */}
        <div className="mt-8 pt-6 border-t-2 border-[#F8F6F1]/25 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onSelectSeries('all')}
              className={`px-3.5 py-1.5 text-xs font-avant font-bold uppercase tracking-wider transition-colors cursor-pointer border-2 ${
                selectedSeriesId === 'all'
                  ? 'bg-[#702F3B] text-[#F8F6F1] border-[#F8F6F1]'
                  : 'bg-transparent text-[#F8F6F1] border-[#F8F6F1]/40 hover:border-[#F5F0E6]'
              }`}
            >
              All 18 Series ({ARTICLES.length})
            </button>
            {EDITORIAL_SERIES.slice(0, 6).map((series) => (
              <button
                key={series.id}
                onClick={() => onSelectSeries(series.id)}
                className={`px-3 py-1.5 text-xs transition-colors cursor-pointer border ${
                  selectedSeriesId === series.id
                    ? 'bg-[#F5F0E6] text-[#292725] border-[#292725] font-bold'
                    : 'bg-transparent text-[#E9DCD8] border-[#F8F6F1]/30 hover:border-[#F5F0E6]'
                }`}
              >
                <span className="font-mono-num mr-1">{series.number}.</span>
                <span className="font-editorial italic text-base">
                  {series.title}
                </span>
              </button>
            ))}
            <select
              aria-label="Select from all 18 editorial series"
              value={selectedSeriesId}
              onChange={(e) => onSelectSeries(e.target.value)}
              className="px-3 py-2 text-xs font-mono-num bg-[#F5F0E6] border-2 border-[#292725] text-[#292725] focus:outline-none cursor-pointer"
            >
              <option value="all">Jump to Any of 18 Series...</option>
              {EDITORIAL_SERIES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.number}. {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#292725] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essays, authors, texts..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8F6F1] border-2 border-[#292725] text-[#292725] focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Expandable 18-Series Directory on Saffron */}
      {showAllSeriesDirectory && (
        <section className="bg-[#F5F0E6] text-[#292725] px-6 sm:px-12 py-10 border-b-4 border-double border-[#292725]">
          <div className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#702F3B] mb-6">
            Complete Directory of the 18 Editorial Series (Click Any Series to Filter)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            {EDITORIAL_SERIES.map((series) => (
              <button
                key={series.id}
                onClick={() => {
                  onSelectSeries(series.id);
                  setShowAllSeriesDirectory(false);
                }}
                className={`text-left pb-4 border-b-2 transition-colors cursor-pointer ${
                  selectedSeriesId === series.id
                    ? 'border-[#702F3B] text-[#702F3B]'
                    : 'border-[#292725]/30 text-[#292725] hover:border-[#292725]'
                }`}
              >
                <div className="font-mono-num text-xs text-[#514052] mb-0.5">
                  SERIES {series.number}
                </div>
                <div className="font-display font-bold text-xl">
                  {series.title}
                </div>
                <p className="font-prose text-xs text-[#493A32] mt-1 leading-relaxed">
                  {series.description}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Active Series Banner if Filtered */}
      {activeSeriesInfo && (
        <div className="bg-[#E9DCD8] px-6 sm:px-12 py-6 border-b-2 border-[#292725] flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B] mb-1">
              Editorial Series {activeSeriesInfo.number}
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#292725]">
              {activeSeriesInfo.title}
            </h2>
            <p className="font-editorial italic text-xl text-[#493A32] mt-0.5">
              {activeSeriesInfo.description}
            </p>
          </div>
          <button
            onClick={() => onSelectSeries('all')}
            className="px-4 py-2 text-xs font-avant font-bold uppercase tracking-wider bg-[#292725] text-[#F8F6F1] hover:bg-[#702F3B] transition-colors cursor-pointer"
          >
            Show All Series
          </button>
        </div>
      )}

      {/* Articles Archive List — Flowing Architectural Spreads */}
      <div className="px-6 sm:px-12 py-12 md:py-16 bg-[#F8F6F1]">
        {filteredArticles.length === 0 ? (
          <div className="py-16 border-y-2 border-[#292725] text-center">
            <h3 className="font-display font-bold text-3xl text-[#292725] mb-2">
              No Published Essays Match This Filter Yet
            </h3>
            <p className="font-prose text-sm text-[#493A32] max-w-md mx-auto mb-6">
              New commissions for this series are currently in editorial preparation for the Winter issue. Explore the full archive or submit a pitch.
            </p>
            <button
              onClick={() => {
                onSelectSeries('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#702F3B] text-[#F8F6F1] border-2 border-[#292725] cursor-pointer"
            >
              Show All Published Essays
            </button>
          </div>
        ) : (
          <div className="divide-y-2 divide-[#292725]">
            {filteredArticles.map((article, idx) => {
              const color = SERIES_PALETTE[idx % SERIES_PALETTE.length];
              return (
                <article
                  key={article.id}
                  onClick={() => onSelectArticle(article.id)}
                  className="py-12 first:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start group cursor-pointer"
                >
                  <div className="lg:col-span-4">
                    <EditorialImage
                      src={article.image}
                      alt={article.title}
                      aspectClass="aspect-[4/3]"
                      accentColor={color}
                    />
                  </div>
                  <div className="lg:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                        <span
                          className="px-2.5 py-0.5 text-[#F8F6F1] font-avant font-bold uppercase tracking-widest text-[10px]"
                          style={{ backgroundColor: color }}
                        >
                          {article.seriesTitle}
                        </span>
                        <span className="font-mono-num text-[#493A32]">
                          {article.issueVolume} · {article.publicationDate} ·{' '}
                          {article.readingTime}
                        </span>
                      </div>

                      <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#292725] group-hover:text-[#702F3B] transition-colors leading-tight mb-2">
                        {article.title}
                      </h2>

                      <p className="font-editorial italic text-2xl text-[#514052] mb-4">
                        {article.subtitle}
                      </p>

                      <p className="font-prose text-sm text-[#493A32] leading-[1.8] mb-6">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#292725]/30 text-xs">
                      <div className="font-mono-num text-[#292725]">
                        BY <strong>{article.authorName}</strong> ·{' '}
                        {article.authorRole}
                      </div>
                      <span className="inline-flex items-center gap-1.5 font-avant font-bold uppercase tracking-wider text-[#702F3B] group-hover:underline">
                        <span>Read Essay & Marginalia</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

interface AnnotatorGuideViewProps {
  selectedChapterId: string;
  onSelectChapter: (chapterId: string) => void;
}

export const AnnotatorGuideView: React.FC<AnnotatorGuideViewProps> = ({
  selectedChapterId,
  onSelectChapter,
}) => {
  const { savedFolios, toggleSaveFolio } = useAuth();
  const [activeAnnotationIdx, setActiveAnnotationIdx] = useState<number>(0);

  const currentIndex = Math.max(
    0,
    ANNOTATOR_CHAPTERS.findIndex((c) => c.id === selectedChapterId)
  );
  const chapter = ANNOTATOR_CHAPTERS[currentIndex] || ANNOTATOR_CHAPTERS[0];
  const isChapterSaved = savedFolios.some((f) => f.itemId === chapter.id);

  const prevChapter =
    currentIndex > 0 ? ANNOTATOR_CHAPTERS[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < ANNOTATOR_CHAPTERS.length - 1
      ? ANNOTATOR_CHAPTERS[currentIndex + 1]
      : null;

  const handleDownloadWorksheet = () => {
    const content = [
      `VELLUNE — THE ANNOTATOR'S GUIDE`,
      `${chapter.chapterNumber}: ${chapter.title}`,
      `${chapter.subtitle}`,
      `====================================================================`,
      ``,
      `SUMMARY:`,
      chapter.summary,
      ``,
      ...chapter.subsections.flatMap((sub) => [
        `${sub.code} ${sub.heading}`,
        `--------------------------------------------------------------------`,
        sub.explanation,
        ``,
        `Close-Reading Checklist:`,
        ...sub.keyChecklist.map((item, i) => `  ${i + 1}. ${item}`),
        ``,
      ]),
      `LITERARY SPECIMEN FOR ANNOTATION:`,
      `${chapter.literarySpecimen.workTitle} — ${chapter.literarySpecimen.author} (${chapter.literarySpecimen.year})`,
      `"${chapter.literarySpecimen.passage}"`,
      ``,
      `MODEL MARGINALIA:`,
      ...chapter.literarySpecimen.annotations.map(
        (a) => `- [${a.tag}] "${a.phrase}": ${a.analysis}`
      ),
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = chapter.downloadableFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      {/* Deep Forest & Gold Curriculum Banner */}
      <header className="bg-[#493A32] text-[#F8F6F1] px-6 sm:px-12 py-14 md:py-18 border-b-4 border-double border-[#292725]">
        <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#C9A5A0] mb-2">
          ✦ Folio 03 · Vellune Critical Apparatus & Curriculum
        </div>
        <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-4">
          <span className="font-editorial italic text-5xl sm:text-7xl text-[#C9A5A0]">
            The Annotator’s Guide:
          </span>{' '}
          <span className="font-display font-bold">
            A Handbook of Close Reading
          </span>
        </h1>
        <p className="font-prose text-base sm:text-lg text-[#E9DCD8] max-w-3xl leading-relaxed">
          Our structured multi-chapter manual for analyzing syntax, focalization, prosody, and intertextuality—complete with annotated literary specimens and downloadable seminar worksheets.
        </p>
      </header>

      <div className="px-6 sm:px-12 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Sidebar: Architectural Table of Contents */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28 lg:border-r-2 lg:border-[#292725] lg:pr-10">
          <div>
            <div className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#702F3B] pb-3 mb-4 border-b-2 border-[#292725]">
              Curriculum Table of Contents
            </div>
            <nav className="divide-y divide-[#292725]/25">
              {ANNOTATOR_CHAPTERS.map((ch) => {
                const isActive = ch.id === chapter.id;
                return (
                  <div key={ch.id} className="py-3">
                    <button
                      onClick={() => {
                        onSelectChapter(ch.id);
                        setActiveAnnotationIdx(0);
                      }}
                      className={`w-full text-left p-3 transition-colors cursor-pointer border-l-4 ${
                        isActive
                          ? 'bg-[#F5F0E6] border-[#702F3B] text-[#292725]'
                          : 'border-transparent hover:bg-[#E9DCD8]/50 text-[#292725]'
                      }`}
                    >
                      <div className="font-mono-num text-[11px] text-[#702F3B]">
                        {ch.chapterNumber}
                      </div>
                      <div className="font-display font-bold text-lg leading-snug">
                        {ch.title}
                      </div>
                    </button>

                    {isActive && (
                      <div className="mt-2 pl-5 space-y-1.5 border-l border-[#292725]/30 py-1">
                        {ch.subsections.map((sub) => (
                          <div
                            key={sub.code}
                            className="text-xs text-[#514052] font-mono-num"
                          >
                            {sub.code} — {sub.heading}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <EditorialImage
            src={IMAGES.marginalia}
            alt="Archival Marginalia Specimen"
            caption="Plate I — Three-tier pencil annotation method taught in Vellune seminars."
            aspectClass="aspect-[4/3]"
          />
        </aside>

        {/* Main Chapter Content Area */}
        <div className="lg:col-span-8">
          <div className="pb-8 mb-10 border-b-4 border-double border-[#292725]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 bg-[#493A32] text-[#C9A5A0] font-mono-num text-xs uppercase tracking-widest">
                {chapter.chapterNumber} of IV
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    toggleSaveFolio({
                      itemId: chapter.id,
                      itemType: 'chapter',
                      title: `${chapter.chapterNumber}: ${chapter.title}`,
                      seriesTitle: "The Annotator's Guide",
                    })
                  }
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] transition-colors cursor-pointer ${
                    isChapterSaved
                      ? 'bg-[#493A32] text-[#F8F6F1]'
                      : 'bg-[#F5F0E6] text-[#292725] hover:bg-[#702F3B] hover:text-[#F8F6F1]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isChapterSaved ? 'Saved' : 'Save Chapter'}</span>
                </button>
                <button
                  onClick={handleDownloadWorksheet}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-avant font-bold uppercase tracking-wider bg-[#702F3B] text-[#F8F6F1] border-2 border-[#292725] shadow-[3px_3px_0px_#292725] hover:bg-[#514052] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Worksheet (.txt)</span>
                </button>
              </div>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#292725] leading-tight mb-3">
              {chapter.title}
            </h2>
            <p className="font-editorial italic text-2xl text-[#514052] mb-5">
              {chapter.subtitle}
            </p>
            <p className="font-prose text-base text-[#292725] leading-[1.85]">
              {chapter.summary}
            </p>
          </div>

          {/* Subsections */}
          <div className="space-y-12 mb-14">
            {chapter.subsections.map((sub) => (
              <section
                key={sub.code}
                className="pb-10 border-b-2 border-[#292725]/25 last:border-b-0"
              >
                <div className="font-mono-num text-xs text-[#702F3B] font-bold mb-1">
                  SUBSECTION {sub.code}
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#292725] mb-3">
                  {sub.heading}
                </h3>
                <p className="font-prose text-base text-[#292725] leading-[1.85] mb-6 max-w-[68ch]">
                  {sub.explanation}
                </p>

                <div className="border-l-4 border-[#493A32] bg-[#F5F0E6]/60 pl-6 py-4 pr-4">
                  <div className="font-avant font-bold text-xs uppercase tracking-widest text-[#493A32] mb-3">
                    Practitioner’s Close-Reading Checklist
                  </div>
                  <ul className="space-y-2 text-sm text-[#292725]">
                    {sub.keyChecklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono-num text-xs text-[#702F3B] font-bold mt-0.5">
                          0{i + 1}.
                        </span>
                        <span className="font-prose leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          {/* Interactive Literary Specimen */}
          <section className="p-8 bg-[#E9DCD8] border-2 border-[#292725] mb-12">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b-2 border-[#292725]">
              <div>
                <div className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B]">
                  Interactive Close-Reading Specimen
                </div>
                <h3 className="font-display font-bold text-2xl text-[#292725]">
                  {chapter.literarySpecimen.workTitle} —{' '}
                  <span className="font-editorial italic font-normal text-3xl text-[#514052]">
                    {chapter.literarySpecimen.author}
                  </span>{' '}
                  (
                  <span className="font-mono-num text-sm">
                    {chapter.literarySpecimen.year}
                  </span>
                  )
                </h3>
              </div>
              <BookOpen className="w-6 h-6 text-[#702F3B]" />
            </div>

            <blockquote className="p-6 bg-[#F8F6F1] border-l-4 border-[#702F3B] font-prose text-lg text-[#292725] leading-[1.9] mb-6">
              “{chapter.literarySpecimen.passage}”
            </blockquote>

            <div className="font-avant font-bold text-xs uppercase tracking-widest text-[#292725] mb-3">
              Select an Annotation Layer to Inspect Marginalia:
            </div>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {chapter.literarySpecimen.annotations.map((ann, idx) => (
                <button
                  key={ann.tag}
                  onClick={() => setActiveAnnotationIdx(idx)}
                  className={`px-4 py-2 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] transition-colors cursor-pointer ${
                    activeAnnotationIdx === idx
                      ? 'bg-[#493A32] text-[#F8F6F1]'
                      : 'bg-[#F8F6F1] text-[#292725] hover:bg-[#F5F0E6]'
                  }`}
                >
                  <span className="font-mono-num mr-1.5">[{idx + 1}]</span>
                  {ann.tag}
                </button>
              ))}
            </div>

            {chapter.literarySpecimen.annotations[activeAnnotationIdx] && (
              <div className="p-6 bg-[#F8F6F1] border-2 border-[#292725]">
                <div className="font-mono-num text-xs text-[#702F3B] font-bold mb-2">
                  TARGET PHRASE: “
                  {
                    chapter.literarySpecimen.annotations[activeAnnotationIdx]
                      .phrase
                  }
                  ”
                </div>
                <p className="font-prose text-sm text-[#292725] leading-relaxed">
                  {
                    chapter.literarySpecimen.annotations[activeAnnotationIdx]
                      .analysis
                  }
                </p>
              </div>
            )}
          </section>

          {/* Chapter Navigation Footer */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t-2 border-[#292725]">
            {prevChapter ? (
              <button
                onClick={() => {
                  onSelectChapter(prevChapter.id);
                  setActiveAnnotationIdx(0);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] bg-[#F8F6F1] text-[#292725] hover:bg-[#F5F0E6] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>
                  {prevChapter.chapterNumber}: {prevChapter.title.split(':')[0]}
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextChapter && (
              <button
                onClick={() => {
                  onSelectChapter(nextChapter.id);
                  setActiveAnnotationIdx(0);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#493A32] text-[#F8F6F1] border-2 border-[#292725] hover:bg-[#702F3B] transition-colors cursor-pointer"
              >
                <span>
                  Next: {nextChapter.chapterNumber} —{' '}
                  {nextChapter.title.split(':')[0]}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
