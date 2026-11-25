/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, X, ArrowUpRight, UserCheck } from 'lucide-react';
import {
  ARTICLES,
  ANNOTATOR_CHAPTERS,
  EDITORIAL_SERIES,
  NavSection,
} from './data/velluneData';
import { ArticleReaderView } from './components/ArticleReaderView';
import { HomeView, AboutView } from './components/HomeAndAboutViews';
import {
  JournalView,
  AnnotatorGuideView,
} from './components/JournalAndAnnotatorViews';
import {
  ReadingRoomView,
  ConversationsView,
} from './components/ReadingRoomAndConversationsViews';
import {
  InitiativesView,
  CommunityView,
  GetInvolvedView,
  ContactView,
} from './components/InitiativesCommunityInvolvedViews';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import {
  AuthAndMemberModal,
  MemberDeskPageView,
} from './components/AuthAndMemberModal';

const NAV_CHAPTERS: {
  id: NavSection;
  label: string;
  shortLabel: string;
  roman: string;
  accentBg: string;
  accentText: string;
  subtitle: string;
}[] = [
  {
    id: 'home',
    label: 'Frontispiece',
    shortLabel: 'Home',
    roman: '01',
    accentBg: '#702F3B',
    accentText: '#F8F6F1',
    subtitle: 'Quarterly Issue & Dispatches',
  },
  {
    id: 'journal',
    label: 'The Journal',
    shortLabel: 'The Journal',
    roman: '02',
    accentBg: '#514052',
    accentText: '#F8F6F1',
    subtitle: '18 Editorial Series & Criticism',
  },
  {
    id: 'annotator',
    label: "The Annotator's Guide",
    shortLabel: "Annotator's Guide",
    roman: '03',
    accentBg: '#493A32',
    accentText: '#F8F6F1',
    subtitle: 'Handbook of Close Reading',
  },
  {
    id: 'reading-room',
    label: 'Reading Room',
    shortLabel: 'Reading Room',
    roman: '04',
    accentBg: '#493A32',
    accentText: '#FFFCF7',
    subtitle: 'Syllabi, Lexicons & Challenges',
  },
  {
    id: 'conversations',
    label: 'Conversations',
    shortLabel: 'Conversations',
    roman: '05',
    accentBg: '#514052',
    accentText: '#FFFCF7',
    subtitle: 'Salons, Dialogues & Seminars',
  },
  {
    id: 'initiatives',
    label: 'Initiatives',
    shortLabel: 'Initiatives',
    roman: '06',
    accentBg: '#702F3B',
    accentText: '#FFFCF7',
    subtitle: '12 Fellowships, Prizes & Chapters',
  },
  {
    id: 'community',
    label: 'Community',
    shortLabel: 'Community',
    roman: '07',
    accentBg: '#493A32',
    accentText: '#FFFCF7',
    subtitle: 'Critics, Editors & Global Hubs',
  },
  {
    id: 'about',
    label: 'About Vellune',
    shortLabel: 'About',
    roman: '08',
    accentBg: '#514052',
    accentText: '#F8F6F1',
    subtitle: 'Manifesto, History & Tenets',
  },
  {
    id: 'get-involved',
    label: 'Get Involved',
    shortLabel: 'Submit & Join',
    roman: '09',
    accentBg: '#702F3B',
    accentText: '#F8F6F1',
    subtitle: 'Pitch Essays & Join Editorial',
  },
  {
    id: 'contact',
    label: 'Chancery & Contact',
    shortLabel: 'Contact',
    roman: '10',
    accentBg: '#514052',
    accentText: '#F8F6F1',
    subtitle: 'Letters, Press & Inquiries',
  },
  {
    id: 'member-desk',
    label: 'Member Desk',
    shortLabel: 'Member Desk',
    roman: '11',
    accentBg: '#292725',
    accentText: '#F5F0E6',
    subtitle: 'Cloud Commonplace & Notes',
  },
];

function VelluneShell() {
  const { user, memberProfile, openAuthModal } = useAuth();
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    ANNOTATOR_CHAPTERS[0].id
  );
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<
    string | null
  >(null);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null
  );
  const [selectedInvolvedTrackId, setSelectedInvolvedTrackId] =
    useState<string>('submit-article');

  const navigateTo = (section: NavSection) => {
    setSelectedArticleId(null);
    setActiveSection(section);
    setIsDirectoryOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setIsDirectoryOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeArticle = selectedArticleId
    ? ARTICLES.find((a) => a.id === selectedArticleId) || null
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#292725]">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#292725] focus:text-[#F8F6F1] focus:text-xs"
      >
        Skip to main content
      </a>

      {/* Top Chromatic Edition Ribbon — Multi-typographic & Architectural */}
      <div className="bg-[#493A32] text-[#F8F6F1] border-b-2 border-[#292725]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2 py-0.5 bg-[#702F3B] text-[#F8F6F1] font-mono-num text-[10px] uppercase tracking-widest font-bold">
              Vol. IV · Issue 03
            </span>
            <span className="font-editorial italic text-base sm:text-lg tracking-wide text-[#F5F0E6]">
              “Where Close Reading Meets the Living Republic of Letters”
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono-num text-[11px] text-[#E9DCD8]">
            <span className="hidden md:inline">
              EDINBURGH · LONDON · DUBLIN · KYOTO
            </span>
            <span className="hidden md:inline text-[#C9A5A0]">✦</span>
            <button
              onClick={() => setIsDirectoryOpen(!isDirectoryOpen)}
              className="underline decoration-[#C9A5A0] underline-offset-4 hover:text-[#F5F0E6] cursor-pointer uppercase tracking-wider"
            >
              {isDirectoryOpen ? 'Close Full Index ×' : 'Explore All 11 Folios ⊞'}
            </button>
          </div>
        </div>
      </div>

      {/* Sculptural Multi-Typographic Header with Double-Rule Borders & Zero Cut-off */}
      <header className="sticky top-0 z-40 bg-[#F8F6F1]/95 backdrop-blur-md border-b-4 border-double border-[#292725]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          {/* Primary Masthead Row */}
          <div className="py-4 flex items-center justify-between gap-4 border-b border-[#292725]/20">
            {/* Brand Wordmark */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              className="group flex items-baseline gap-3 shrink-0"
            >
              <span className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#292725] group-hover:text-[#702F3B] transition-colors">
                Vellune
              </span>
              <span className="hidden sm:inline-block font-editorial italic text-xl text-[#702F3B] border-l border-[#292725]/30 pl-3">
                Revue Critique
              </span>
            </a>

            {/* Center Editorial Tagline Badge */}
            <div className="hidden xl:flex items-center gap-2 px-4 py-1.5 bg-[#F5F0E6] border border-[#292725] text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#702F3B]" />
              <span className="font-avant font-bold uppercase tracking-wider text-[10px] text-[#292725]">
                18 Editorial Series
              </span>
              <span className="text-[#292725]/40">|</span>
              <span className="font-editorial italic text-sm text-[#514052]">
                Youth-Led Literary Criticism & Cultural Publication
              </span>
            </div>

            {/* Right Actions: Directory Switcher & Cloud Member Account */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsDirectoryOpen(!isDirectoryOpen)}
                className="px-3.5 py-2 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] bg-[#E9DCD8] text-[#292725] hover:bg-[#F5F0E6] transition-colors cursor-pointer"
              >
                {isDirectoryOpen ? 'Close Index' : 'All Sections (11)'}
              </button>

              <button
                onClick={openAuthModal}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-avant font-bold uppercase tracking-wider border-2 border-[#292725] bg-[#702F3B] text-[#F8F6F1] hover:bg-[#493A32] transition-colors shadow-[3px_3px_0px_#292725] cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>
                  {user
                    ? memberProfile?.displayName?.split(' ')[0] || 'Member Desk'
                    : 'Sign In / Join'}
                </span>
              </button>
            </div>
          </div>

          {/* Wrapped Architectural Navigation Strip — ZERO Horizontal Scrollbar, ZERO Cut-off Text */}
          <nav
            aria-label="Primary Editorial Navigation"
            className="py-2.5 flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-2"
          >
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {NAV_CHAPTERS.map((tab) => {
                const isCurrent = !activeArticle && activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === 'conversations') setSelectedEventId(null);
                      if (tab.id === 'initiatives') setSelectedInitiativeId(null);
                      if (tab.id === 'community') setSelectedProfileId(null);
                      navigateTo(tab.id);
                    }}
                    style={
                      isCurrent
                        ? {
                            backgroundColor: tab.accentBg,
                            color: tab.accentText,
                            borderColor: '#292725',
                          }
                        : undefined
                    }
                    className={`px-2.5 py-1 text-xs transition-all cursor-pointer border ${
                      isCurrent
                        ? 'font-ui font-semibold shadow-[2px_2px_0px_#292725]'
                        : 'border-transparent hover:border-[#292725] hover:bg-[#F5F0E6]/60 text-[#2B2623]'
                    }`}
                  >
                    <span className="font-mono-num text-[10px] opacity-70 mr-1">
                      {tab.roman}.
                    </span>
                    <span className="font-ui">{tab.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Expandable Colorful Magazine Directory Curtain */}
        {isDirectoryOpen && (
          <div className="border-t-2 border-[#292725] bg-[#F8F6F1] shadow-2xl">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#292725]">
                <div>
                  <span className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B]">
                    Complete Architectural Index
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl text-[#292725]">
                    Navigate All Eleven Chambers of{' '}
                    <span className="font-editorial italic text-[#514052]">
                      Vellune
                    </span>
                  </h2>
                </div>
                <button
                  onClick={() => setIsDirectoryOpen(false)}
                  className="p-2 border-2 border-[#292725] bg-[#F5F0E6] hover:bg-[#702F3B] hover:text-[#F8F6F1] transition-colors cursor-pointer"
                  aria-label="Close directory"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#292725] border-2 border-[#292725]">
                {NAV_CHAPTERS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'conversations') setSelectedEventId(null);
                      if (item.id === 'initiatives')
                        setSelectedInitiativeId(null);
                      if (item.id === 'community') setSelectedProfileId(null);
                      navigateTo(item.id);
                    }}
                    className="p-5 bg-[#F8F6F1] hover:bg-[#F5F0E6] text-left transition-colors flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-2 py-0.5 font-mono-num text-xs font-bold border border-[#292725]"
                        style={{
                          backgroundColor: item.accentBg,
                          color: item.accentText,
                        }}
                      >
                        FOLIO {item.roman}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#292725] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-xl text-[#292725] mb-1">
                        {item.label}
                      </div>
                      <div className="font-editorial italic text-base text-[#493A32]">
                        {item.subtitle}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Container with Architectural Frame */}
      <main
        id="main-content"
        className="flex-1 max-w-[1400px] w-full mx-auto border-x-0 sm:border-x-2 border-[#292725] bg-[#F8F6F1]"
      >
        {activeArticle ? (
          <ArticleReaderView
            article={activeArticle}
            onBack={() => setSelectedArticleId(null)}
            onSelectArticle={(id) => openArticle(id)}
            onSelectAuthor={(authorId) => {
              setSelectedArticleId(null);
              setSelectedProfileId(authorId);
              setActiveSection('community');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSeries={(seriesId) => {
              setSelectedArticleId(null);
              setSelectedSeriesId(seriesId);
              setActiveSection('journal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {activeSection === 'home' && (
              <HomeView
                onNavigate={navigateTo}
                onSelectArticle={openArticle}
                onSelectSeries={(seriesId) => setSelectedSeriesId(seriesId)}
                onSelectChapter={(chapterId) => setSelectedChapterId(chapterId)}
                onSelectEvent={(eventId) => setSelectedEventId(eventId)}
                onSelectInitiative={(initId) => setSelectedInitiativeId(initId)}
                onSelectProfile={(profileId) => setSelectedProfileId(profileId)}
              />
            )}

            {activeSection === 'about' && (
              <AboutView
                onNavigate={navigateTo}
                onSelectProfile={(profileId) => setSelectedProfileId(profileId)}
              />
            )}

            {activeSection === 'journal' && (
              <JournalView
                selectedSeriesId={selectedSeriesId}
                onSelectSeries={(seriesId) => setSelectedSeriesId(seriesId)}
                onSelectArticle={openArticle}
              />
            )}

            {activeSection === 'annotator' && (
              <AnnotatorGuideView
                selectedChapterId={selectedChapterId}
                onSelectChapter={(chapterId) => setSelectedChapterId(chapterId)}
              />
            )}

            {activeSection === 'reading-room' && <ReadingRoomView />}

            {activeSection === 'conversations' && (
              <ConversationsView
                selectedEventId={selectedEventId}
                onSelectEvent={(eventId) => setSelectedEventId(eventId)}
              />
            )}

            {activeSection === 'initiatives' && (
              <InitiativesView
                selectedInitiativeId={selectedInitiativeId}
                onSelectInitiative={(initId) => setSelectedInitiativeId(initId)}
                onApplyForInitiative={(trackId) => {
                  setSelectedInvolvedTrackId(trackId);
                  navigateTo('get-involved');
                }}
              />
            )}

            {activeSection === 'community' && (
              <CommunityView
                selectedProfileId={selectedProfileId}
                onSelectProfile={(profileId) => setSelectedProfileId(profileId)}
                onSelectArticle={openArticle}
                onNavigate={navigateTo}
              />
            )}

            {activeSection === 'get-involved' && (
              <GetInvolvedView initialTrackId={selectedInvolvedTrackId} />
            )}

            {activeSection === 'contact' && <ContactView />}

            {activeSection === 'member-desk' && (
              <MemberDeskPageView
                onSelectArticle={(id) => openArticle(id)}
                onSelectChapter={(chId) => {
                  setSelectedChapterId(chId);
                  navigateTo('annotator');
                }}
                onBackHome={() => navigateTo('home')}
              />
            )}
          </>
        )}
      </main>

      {/* Rich Multi-Color Architectural Footer */}
      <footer className="bg-[#292725] text-[#F8F6F1] border-t-4 border-double border-[#F5F0E6]">
        {/* Top Colorful Marquee / Series Strip */}
        <div className="bg-[#702F3B] text-[#F8F6F1] border-b-2 border-[#292725] py-3 px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
            <span className="font-avant font-bold text-xs uppercase tracking-[0.2em]">
              ✦ The Eighteen Permanent Series of Vellune
            </span>
            <span className="font-editorial italic text-lg">
              Criticism · Philology · Poetic Prosody · World Literature · Translation
            </span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#F8F6F1]/20">
            {/* Brand & Colophon */}
            <div className="lg:col-span-4 lg:border-r lg:border-[#F8F6F1]/20 lg:pr-10">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display font-bold text-4xl text-[#F5F0E6]">
                  Vellune
                </span>
                <span className="font-editorial italic text-2xl text-[#C9A5A0]">
                  Revue Critique
                </span>
              </div>
              <p className="font-prose text-sm text-[#E5DEC9] leading-relaxed mb-6">
                A youth-led literary criticism organisation and digital publication dedicated to literature, critical thinking, literary analysis, intellectual exchange, and emerging writers worldwide.
              </p>
              <div className="text-xs text-[#C9A5A0] space-y-1.5 font-mono-num border-t border-[#F8F6F1]/15 pt-4">
                <div>CHANCERY: letters@vellune.org</div>
                <div>SUBMISSIONS: submissions@vellune.org</div>
                <div>ISSN 2978-410X · EDINBURGH · LONDON · KYOTO</div>
              </div>
            </div>

            {/* All Main Navigation Sections */}
            <div className="lg:col-span-3 lg:border-r lg:border-[#F8F6F1]/20 lg:pr-8">
              <div className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#F5F0E6] mb-4">
                I. Architectural Directory
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-[#E5DEC9]">
                {NAV_CHAPTERS.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => navigateTo(tab.id)}
                      className="hover:text-[#F5F0E6] hover:underline cursor-pointer text-left flex items-baseline gap-1.5"
                    >
                      <span className="font-mono-num text-[10px] text-[#C9A5A0]">
                        {tab.roman}
                      </span>
                      <span>{tab.shortLabel}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selected Editorial Series */}
            <div className="lg:col-span-3 lg:border-r lg:border-[#F8F6F1]/20 lg:pr-8">
              <div className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#F5F0E6] mb-4">
                II. Flagship Editorial Series
              </div>
              <ul className="space-y-2 text-xs text-[#E5DEC9]">
                {EDITORIAL_SERIES.slice(0, 7).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setSelectedSeriesId(s.id);
                        navigateTo('journal');
                      }}
                      className="hover:text-[#F5F0E6] hover:underline cursor-pointer text-left"
                    >
                      <span className="font-mono-num text-[#C9A5A0] mr-1.5">
                        {s.number}.
                      </span>
                      <span className="font-editorial italic text-base">
                        {s.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Participation & Cloud Account */}
            <div className="lg:col-span-2">
              <div className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#F5F0E6] mb-4">
                III. Reader’s Desk
              </div>
              <ul className="space-y-3 text-xs text-[#E5DEC9]">
                <li>
                  <button
                    onClick={() => navigateTo('member-desk')}
                    className="px-3.5 py-2 bg-[#F5F0E6] text-[#292725] font-avant font-bold uppercase tracking-wider hover:bg-[#702F3B] hover:text-[#F8F6F1] transition-colors cursor-pointer w-full text-left"
                  >
                    {user ? 'Open Member Desk →' : 'Sign In / Register →'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('get-involved')}
                    className="hover:text-[#F5F0E6] underline cursor-pointer"
                  >
                    Submit Critical Essay
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('initiatives')}
                    className="hover:text-[#F5F0E6] underline cursor-pointer"
                  >
                    Young Critics Fellowship
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('annotator')}
                    className="hover:text-[#F5F0E6] underline cursor-pointer"
                  >
                    Download Study Folios
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A89F91] font-mono-num">
            <div>
              © {new Date().getFullYear()} VELLUNE LITERARY CRITICISM ORGANISATION.
            </div>
            <div>
              TYPESET IN CORMORANT GARAMOND (HEADINGS) & EB GARAMOND (BODY)
            </div>
          </div>
        </div>
      </footer>

      <AuthAndMemberModal
        onSelectArticle={(id) => openArticle(id)}
        onSelectChapter={(chId) => {
          setSelectedChapterId(chId);
          navigateTo('annotator');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <VelluneShell />
      </AuthProvider>
    </ErrorBoundary>
  );
}
