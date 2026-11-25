import React, { useState } from 'react';
import {
  Search,
  Download,
  Calendar,
  MapPin,
  Clock,
  Check,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import {
  READING_ROOM_RESOURCES,
  ReadingRoomResource,
  CONVERSATION_EVENTS,
  VelluneEvent,
  IMAGES,
} from '../data/velluneData';
import { EditorialImage } from './EditorialImage';
import { useAuth } from '../contexts/AuthContext';

const RESOURCE_CATEGORIES = [
  'All Resources',
  'Curated Reading Lists',
  'Literary Terminology',
  'Literary Movements',
  'Literary Genres',
  'Reading Challenges',
  'Discussion Questions',
  'Downloadable Materials',
] as const;

export const ReadingRoomView: React.FC = () => {
  const { completedChallenges, toggleCloudChallenge } = useAuth();
  const [selectedCategory, setSelectedCategory] =
    useState<string>('All Resources');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = READING_ROOM_RESOURCES.filter((res) => {
    const matchesCat =
      selectedCategory === 'All Resources' || res.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      res.title.toLowerCase().includes(q) ||
      res.subtitle.toLowerCase().includes(q) ||
      res.summary.toLowerCase().includes(q) ||
      res.items.some(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.detail.toLowerCase().includes(q)
      );
    return matchesCat && matchesSearch;
  });

  const toggleChallengeStep = (label: string) => {
    void toggleCloudChallenge(label);
  };

  const handleDownloadResource = (res: ReadingRoomResource) => {
    const text = [
      `VELLUNE READING ROOM — EDUCATIONAL RESOURCE PACKET`,
      `Category: ${res.category}`,
      `Title: ${res.title}`,
      `${res.subtitle}`,
      `==================================================================`,
      ``,
      res.summary,
      ``,
      ...res.items.flatMap((it) => [`• ${it.label}`, `  ${it.detail}`, ``]),
      ...(res.discussionPrompts
        ? [
            `SEMINAR DISCUSSION QUESTIONS:`,
            ...res.discussionPrompts.map((p, i) => `  ${i + 1}. ${p}`),
          ]
        : []),
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.id}-vellune-reading-room.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      {/* Warm Ochre & Ultramarine Masthead */}
      <header className="bg-[#F5F0E6] text-[#292725] px-6 sm:px-12 py-14 md:py-18 border-b-4 border-double border-[#292725]">
        <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#493A32] font-bold mb-2">
          ✦ Folio 04 · Reference Archive & Study Commons
        </div>
        <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-4">
          <span className="font-display font-bold">The Reading Room: </span>
          <span className="font-editorial italic text-5xl sm:text-7xl text-[#514052]">
            Critical Library
          </span>{' '}
          <span className="font-avant font-bold uppercase text-2xl sm:text-4xl tracking-wider text-[#702F3B]">
            & Syllabi
          </span>
        </h1>
        <p className="font-prose text-base sm:text-lg text-[#493A32] max-w-3xl leading-relaxed">
          Curated reading lists, literary terminology lexicons, guides to literary movements and genres, recommended editions, deep-reading challenges, seminar discussion prompts, and downloadable educational materials.
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-8 pt-6 border-t-2 border-[#292725] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-avant font-bold uppercase tracking-wider border-2 transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#292725] text-[#F5F0E6] border-[#292725]'
                    : 'bg-[#F8F6F1] text-[#292725] border-[#292725] hover:bg-[#702F3B] hover:text-[#F8F6F1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#292725] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search terms, authors, movements..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8F6F1] border-2 border-[#292725] text-[#292725] focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Flowing Open Monographs */}
      <div className="divide-y-4 divide-double divide-[#292725]">
        {filteredResources.map((res, rIdx) => {
          const sectionBg =
            rIdx % 3 === 0
              ? 'bg-[#F8F6F1]'
              : rIdx % 3 === 1
              ? 'bg-[#E9DCD8]'
              : 'bg-[#E9DCD8]';
          return (
            <section
              key={res.id}
              className={`${sectionBg} px-6 sm:px-12 py-12 md:py-16`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 mb-8 border-b-2 border-[#292725]">
                <div>
                  <div className="flex items-center gap-2 text-xs mb-1.5">
                    <span className="px-2.5 py-0.5 bg-[#702F3B] text-[#F8F6F1] font-avant font-bold text-[10px] uppercase tracking-widest">
                      {res.category}
                    </span>
                    <span className="font-mono-num text-[#493A32]">
                      · {res.metadata}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#292725]">
                    {res.title}
                  </h2>
                  <p className="font-editorial italic text-2xl text-[#514052] mt-1">
                    {res.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => handleDownloadResource(res)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-avant font-bold uppercase tracking-wider bg-[#292725] text-[#F8F6F1] border-2 border-[#292725] hover:bg-[#702F3B] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Study Folio (.txt)</span>
                </button>
              </div>

              <p className="font-prose text-base text-[#292725] leading-relaxed mb-8 max-w-3xl">
                {res.summary}
              </p>

              {/* Open Architectural Two-Column Ledger (Zero Cramped Boxes) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {res.items.map((item, idx) => {
                  const isChallenge = res.category === 'Reading Challenges';
                  const isChecked = completedChallenges.includes(item.label);
                  return (
                    <div
                      key={item.label}
                      onClick={
                        isChallenge
                          ? () => toggleChallengeStep(item.label)
                          : undefined
                      }
                      className={`pb-5 border-b border-[#292725]/30 transition-colors ${
                        isChallenge
                          ? 'cursor-pointer hover:border-[#702F3B]'
                          : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="font-display font-bold text-xl text-[#292725] leading-snug">
                          <span className="font-editorial italic text-2xl text-[#702F3B] mr-2">
                            0{idx + 1}.
                          </span>
                          {item.label}
                        </h3>
                        {isChallenge && (
                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono-num uppercase shrink-0 border border-[#292725] ${
                              isChecked
                                ? 'bg-[#493A32] text-[#F8F6F1]'
                                : 'bg-[#F5F0E6] text-[#292725]'
                            }`}
                          >
                            {isChecked ? 'Completed ✓' : 'Mark Read'}
                          </span>
                        )}
                      </div>
                      <p className="font-prose text-xs text-[#493A32] leading-relaxed pl-7">
                        {item.detail}
                      </p>
                    </div>
                  );
                })}
              </div>

              {res.discussionPrompts && res.discussionPrompts.length > 0 && (
                <div className="mt-8 pt-6 border-t-2 border-[#292725]">
                  <div className="font-avant font-bold text-xs uppercase tracking-[0.2em] text-[#702F3B] mb-3">
                    Companion Seminar Questions
                  </div>
                  <ul className="space-y-2 text-base font-editorial italic text-[#514052]">
                    {res.discussionPrompts.map((q, i) => (
                      <li key={i}>
                        0{i + 1}. “{q}”
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

interface ConversationsViewProps {
  selectedEventId: string | null;
  onSelectEvent: (eventId: string | null) => void;
}

const EVENT_FORMATS = [
  'The Reading Circle',
  'Critical Writing Workshops',
  'Literary Debates',
  'Author Encounters',
  'Vellune Lecture Series',
  'Open Pages',
  'Online Reading Sessions',
  'Literary Symposiums',
  'Guest Speaker Sessions',
];

export const ConversationsView: React.FC<ConversationsViewProps> = ({
  selectedEventId,
  onSelectEvent,
}) => {
  const {
    user,
    memberProfile,
    eventRegistrations,
    registerCloudEvent,
    openAuthModal,
  } = useAuth();
  const [statusFilter, setStatusFilter] = useState<
    'Upcoming' | 'Past Archive' | 'All'
  >('Upcoming');
  const [formatFilter, setFormatFilter] = useState<string>('All Formats');
  const [regName, setRegName] = useState(memberProfile?.displayName || '');
  const [regEmail, setRegEmail] = useState(user?.email || '');
  const [regAffiliation, setRegAffiliation] = useState('');
  const [regMode, setRegMode] = useState<
    'Online Seminar Livestream' | 'In-Person Salon Seat'
  >('Online Seminar Livestream');
  const [regQuestions, setRegQuestions] = useState('');
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [regError, setRegError] = useState<string | null>(null);

  const activeEvent: VelluneEvent | undefined = selectedEventId
    ? CONVERSATION_EVENTS.find((e) => e.id === selectedEventId)
    : undefined;

  const filteredEvents = CONVERSATION_EVENTS.filter((evt) => {
    const matchesStatus =
      statusFilter === 'All' || evt.status === statusFilter;
    const matchesFormat =
      formatFilter === 'All Formats' || evt.format === formatFilter;
    return matchesStatus && matchesFormat;
  });

  const handleRegisterSubmit = async (
    e: React.FormEvent,
    event: VelluneEvent
  ) => {
    e.preventDefault();
    setRegError(null);
    const effectiveName = regName.trim() || memberProfile?.displayName || '';
    const effectiveEmail = regEmail.trim() || user?.email || '';
    if (!effectiveName || !effectiveEmail) return;

    if (user && user.emailVerified) {
      try {
        await registerCloudEvent({
          eventId: event.id,
          eventTitle: event.title,
          attendeeName: effectiveName,
          attendanceMode: regMode,
          questionNote: regQuestions,
        });
        setRegisteredEventIds((prev) => [...prev, event.id]);
      } catch (err) {
        setRegError(
          err instanceof Error ? err.message : 'Unable to save registration.'
        );
      }
    } else {
      setRegisteredEventIds((prev) => [...prev, event.id]);
    }
  };

  if (activeEvent) {
    const isRegistered =
      registeredEventIds.includes(activeEvent.id) ||
      eventRegistrations.some((r) => r.eventId === activeEvent.id);
    return (
      <div className="px-6 sm:px-12 py-12 md:py-16 bg-[#F8F6F1]">
        <button
          onClick={() => onSelectEvent(null)}
          className="inline-flex items-center gap-2 text-xs font-avant font-bold uppercase tracking-widest text-[#702F3B] hover:underline mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Conversations Calendar</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 lg:border-r-2 lg:border-[#292725] lg:pr-12">
            <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
              <span className="px-2.5 py-0.5 bg-[#514052] text-[#F8F6F1] font-avant font-bold uppercase tracking-widest text-[10px]">
                {activeEvent.format}
              </span>
              <span className="font-mono-num text-[#292725]">
                · {activeEvent.status} · {activeEvent.mode}
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#292725] leading-tight mb-3">
              {activeEvent.title}
            </h1>
            <p className="font-editorial italic text-2xl text-[#514052] mb-6">
              {activeEvent.subtitle}
            </p>

            <div className="border-y-2 border-[#292725] py-5 space-y-2.5 text-xs mb-8 bg-[#F5F0E6]/60 px-4">
              <div className="flex items-center gap-2.5 text-[#292725]">
                <Calendar className="w-4 h-4 text-[#702F3B] shrink-0" />
                <span className="font-mono-num">{activeEvent.date}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#292725]">
                <Clock className="w-4 h-4 text-[#702F3B] shrink-0" />
                <span className="font-mono-num">{activeEvent.time}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#292725]">
                <MapPin className="w-4 h-4 text-[#702F3B] shrink-0" />
                <span>{activeEvent.location}</span>
              </div>
              <div className="pt-2 border-t border-[#292725]/25 text-[#292725]">
                Session Chair: <strong>{activeEvent.chairSpeaker}</strong>
              </div>
            </div>

            <h2 className="font-display font-bold text-2xl text-[#292725] mb-2">
              Seminar Description
            </h2>
            <p className="font-prose text-base text-[#292725] leading-[1.85] mb-8">
              {activeEvent.description}
            </p>

            <div className="border-l-4 border-[#514052] pl-5 py-2 mb-8">
              <div className="font-avant font-bold text-xs uppercase tracking-widest text-[#514052] mb-1">
                Preparatory Reading & Folio Extract
              </div>
              <p className="font-prose text-sm text-[#292725]">
                {activeEvent.preparatoryReading}
              </p>
            </div>

            <h3 className="font-display font-bold text-2xl text-[#292725] mb-3">
              Order of Proceedings
            </h3>
            <ul className="space-y-2 text-sm text-[#292725] mb-8 border-y-2 border-[#292725] py-4">
              {activeEvent.agenda.map((step, i) => (
                <li key={i} className="font-mono-num text-xs">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5 p-8 bg-[#E9DCD8] border-2 border-[#292725]">
            <div className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B] mb-1">
              {activeEvent.status === 'Upcoming'
                ? 'Seminar Registration'
                : 'Archive Access Request'}
            </div>
            <h2 className="font-display font-bold text-2xl text-[#292725] mb-2">
              {activeEvent.status === 'Upcoming'
                ? 'Reserve Your Place & Receive Extract Folio'
                : 'Request Archived Transcript & Folio'}
            </h2>
            {activeEvent.seatsRemaining && (
              <p className="text-xs font-mono-num text-[#514052] mb-5">
                {activeEvent.seatsRemaining} seminar places remaining
              </p>
            )}

            {isRegistered ? (
              <div className="p-6 bg-[#493A32] text-[#F8F6F1] border-2 border-[#292725]">
                <div className="flex items-center gap-2 text-xs font-avant font-bold uppercase tracking-widest text-[#C9A5A0] mb-2">
                  <Check className="w-4 h-4" />
                  <span>Registration Confirmed</span>
                </div>
                <p className="text-sm leading-relaxed mb-3">
                  We have registered <strong>{regName}</strong> ({regEmail}) for{' '}
                  <em>{activeEvent.title}</em> ({regMode}).
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => handleRegisterSubmit(e, activeEvent)}
                className="space-y-4"
              >
                {!user && (
                  <div className="p-3 bg-[#F8F6F1] border border-[#292725] text-xs text-[#292725]">
                    <button
                      type="button"
                      onClick={openAuthModal}
                      className="underline text-[#702F3B] font-bold cursor-pointer"
                    >
                      Sign in
                    </button>{' '}
                    to save this seminar pass to your cloud Member Desk, or register below.
                  </div>
                )}
                {regError && (
                  <p className="text-xs text-[#702F3B]">{regError}</p>
                )}
                <div>
                  <label className="block font-mono-num text-xs uppercase tracking-wider text-[#292725] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g., Julian Vance"
                    className="w-full px-3.5 py-2 text-sm bg-[#F8F6F1] border-2 border-[#292725] text-[#292725] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono-num text-xs uppercase tracking-wider text-[#292725] mb-1">
                    Electronic Mail Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="reader@university.ac.uk"
                    className="w-full px-3.5 py-2 text-sm bg-[#F8F6F1] border-2 border-[#292725] text-[#292725] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono-num text-xs uppercase tracking-wider text-[#292725] mb-1">
                    School, University or Chapter (Optional)
                  </label>
                  <input
                    type="text"
                    value={regAffiliation}
                    onChange={(e) => setRegAffiliation(e.target.value)}
                    placeholder="e.g., Edinburgh Chapter"
                    className="w-full px-3.5 py-2 text-sm bg-[#F8F6F1] border-2 border-[#292725] text-[#292725] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono-num text-xs uppercase tracking-wider text-[#292725] mb-1">
                    Attendance Mode
                  </label>
                  <select
                    value={regMode}
                    onChange={(e) => setRegMode(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-sm bg-[#F8F6F1] border-2 border-[#292725] text-[#292725] focus:outline-none"
                  >
                    <option value="Online Seminar Livestream">
                      Online Seminar Livestream (Global)
                    </option>
                    <option value="In-Person Salon Seat">
                      In-Person Salon Seat (Where Applicable)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono-num text-xs uppercase tracking-wider text-[#292725] mb-1">
                    Preliminary Question or Passage Note
                  </label>
                  <textarea
                    rows={3}
                    value={regQuestions}
                    onChange={(e) => setRegQuestions(e.target.value)}
                    placeholder="Share a question or passage..."
                    className="w-full px-3.5 py-2 text-sm bg-[#F8F6F1] border-2 border-[#292725] text-[#292725] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-avant font-bold uppercase tracking-widest bg-[#702F3B] text-[#F8F6F1] border-2 border-[#292725] shadow-[3px_3px_0px_#292725] hover:bg-[#493A32] transition-colors cursor-pointer"
                >
                  Confirm Seminar Registration
                </button>
              </form>
            )}
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Royal Plum & Lavender Header */}
      <header className="bg-[#514052] text-[#F8F6F1] px-6 sm:px-12 py-14 md:py-18 border-b-4 border-double border-[#292725] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#F5F0E6] mb-2">
            ✦ Folio 05 · Colloquia, Salons & Disputatio
          </div>
          <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-4">
            <span className="font-display font-bold">Conversations: </span>
            <span className="font-editorial italic text-5xl sm:text-7xl text-[#F5F0E6]">
              Literary Salons
            </span>{' '}
            <span className="font-avant font-bold uppercase text-2xl sm:text-4xl tracking-wider text-[#C9A5A0]">
              & Seminars
            </span>
          </h1>
          <p className="font-prose text-base sm:text-lg text-[#E9DCD8] leading-relaxed mb-6">
            Literature lives in dialogue. Vellune convenes nine distinct formats of intellectual exchange—from intimate close-reading circles and craft workshops to international symposia and structured literary debates.
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFormatFilter('All Formats')}
              className={`px-3 py-1.5 text-xs font-avant font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                formatFilter === 'All Formats'
                  ? 'bg-[#F5F0E6] text-[#292725] border-[#F5F0E6]'
                  : 'bg-transparent text-[#F8F6F1] border-[#F8F6F1]/40 hover:border-[#F5F0E6]'
              }`}
            >
              All 9 Formats
            </button>
            {EVENT_FORMATS.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormatFilter(fmt)}
                className={`px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                  formatFilter === fmt
                    ? 'bg-[#C9A5A0] text-[#292725] border-[#F8F6F1] font-bold'
                    : 'bg-transparent text-[#E9DCD8] border-[#F8F6F1]/30 hover:border-[#F5F0E6]'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <EditorialImage
            src={IMAGES.readingCircle}
            alt="The Vellune Reading Circle Seminar"
            caption="The Vellune Reading Circle in session: collaborative close reading around the seminar table."
            aspectClass="aspect-[16/9]"
          />
        </div>
      </header>

      <div className="px-6 sm:px-12 py-12 md:py-16 bg-[#F8F6F1]">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b-2 border-[#292725]">
          <div className="flex items-center gap-2">
            {(['Upcoming', 'Past Archive', 'All'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-4 py-2 text-xs font-avant font-bold uppercase tracking-widest border-2 border-[#292725] transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#702F3B] text-[#F8F6F1]'
                    : 'bg-[#F5F0E6] text-[#292725] hover:bg-[#514052] hover:text-[#F8F6F1]'
                }`}
              >
                {st === 'Upcoming'
                  ? 'Upcoming Calendar'
                  : st === 'Past Archive'
                  ? 'Past Archive'
                  : 'Complete Schedule'}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#292725] font-mono-num">
            SHOWING {filteredEvents.length} SESSIONS
          </div>
        </div>

        {/* Open Architectural Two-Column Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt.id)}
              className="pb-8 border-b-2 border-[#292725] hover:border-[#702F3B] transition-colors cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 mb-4 border-b border-[#292725]/25">
                  <span className="px-2.5 py-0.5 bg-[#514052] text-[#F5F0E6] font-avant font-bold uppercase tracking-widest text-[10px]">
                    {evt.format}
                  </span>
                  <span className="font-mono-num text-[#702F3B] font-bold">
                    {evt.date}
                  </span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#292725] group-hover:text-[#702F3B] transition-colors leading-snug mb-2">
                  {evt.title}
                </h2>
                <p className="font-editorial italic text-xl text-[#514052] mb-4">
                  {evt.subtitle}
                </p>
                <p className="font-prose text-sm text-[#493A32] leading-relaxed mb-5">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="font-mono-num text-[#493A32]">
                  {evt.time} · {evt.location}
                </div>
                <span className="inline-flex items-center gap-1.5 font-avant font-bold uppercase tracking-wider text-[#702F3B]">
                  <span>
                    {evt.status === 'Upcoming'
                      ? 'Reserve Place →'
                      : 'View Archive Folio →'}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
