import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Mail,
  FileText,
  Globe,
} from 'lucide-react';
import {
  INITIATIVES,
  Initiative,
  COMMUNITY_PROFILES,
  ContributorProfile,
  ARTICLES,
  GET_INVOLVED_TRACKS,
  IMAGES,
  NavSection,
} from '../data/velluneData';
import { EditorialImage } from './EditorialImage';
import { useAuth } from '../contexts/AuthContext';
import { BLUEPRINT_LIMITS } from '../lib/validation';

interface InitiativesViewProps {
  selectedInitiativeId: string | null;
  onSelectInitiative: (id: string | null) => void;
  onApplyForInitiative: (trackId: string) => void;
}

export const InitiativesView: React.FC<InitiativesViewProps> = ({
  selectedInitiativeId,
  onSelectInitiative,
  onApplyForInitiative,
}) => {
  const activeInitiative: Initiative | undefined = selectedInitiativeId
    ? INITIATIVES.find((i) => i.id === selectedInitiativeId)
    : undefined;

  if (activeInitiative) {
    return (
      <div className="max-w-[1140px] mx-auto px-6 py-12 md:py-16">
        <button
          onClick={() => onSelectInitiative(null)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#493A32] hover:text-[#292725] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to All 12 Initiatives</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <div className="text-xs font-mono-num uppercase tracking-widest text-[#702F3B] mb-2">
              Initiative {activeInitiative.number} · {activeInitiative.category}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl text-[#292725] leading-tight mb-4">
              {activeInitiative.title}
            </h1>
            <p className="font-prose text-lg text-[#493A32] leading-relaxed mb-8 pb-8 border-b border-[#B8B3AA]">
              {activeInitiative.summary}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-2xl text-[#292725] mb-3">
                  Programme Objectives
                </h2>
                <ul className="space-y-2.5 text-sm text-[#292725]">
                  {activeInitiative.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-mono-num text-xs text-[#702F3B] mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pt-6 border-t border-[#F5F0E6]">
                <h2 className="font-display text-2xl text-[#292725] mb-3">
                  Core Activities & Structure
                </h2>
                <ul className="space-y-2.5 text-sm text-[#292725]">
                  {activeInitiative.activities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-mono-num text-xs text-[#702F3B] mt-0.5">
                        —
                      </span>
                      <span className="leading-relaxed">{act}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-7 bg-[#F5F0E6] border border-[#B8B3AA]">
              <div className="text-xs uppercase tracking-widest text-[#702F3B] mb-3">
                Eligibility & Participation
              </div>
              <dl className="space-y-4 text-xs">
                <div>
                  <dt className="uppercase tracking-wider text-[#514052] mb-1">
                    Current Status
                  </dt>
                  <dd className="text-[#292725] font-medium">
                    {activeInitiative.statusText}
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#B8B3AA]">
                  <dt className="uppercase tracking-wider text-[#514052] mb-1">
                    Eligibility Criteria
                  </dt>
                  <dd className="text-[#493A32] leading-relaxed">
                    {activeInitiative.eligibility}
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#B8B3AA]">
                  <dt className="uppercase tracking-wider text-[#514052] mb-1">
                    Annual Schedule
                  </dt>
                  <dd className="text-[#493A32] leading-relaxed">
                    {activeInitiative.participationTimeline}
                  </dd>
                </div>
              </dl>

              <button
                onClick={() => onApplyForInitiative('apply-young-critics')}
                className="mt-6 w-full py-2.5 px-4 text-xs uppercase tracking-widest bg-[#292725] text-[#FFFCF7] hover:bg-[#702F3B] transition-colors cursor-pointer"
              >
                Apply or Participate →
              </button>
            </div>

            <EditorialImage
              src={IMAGES.anthologyEdition}
              alt="Vellune Annual Anthology Print Edition"
              caption="Archival linen edition of the Vellune Annual Anthology."
              aspectClass="aspect-[3/4]"
            />
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <header className="bg-[#702F3B] text-[#F8F6F1] px-6 sm:px-12 py-14 md:py-18 border-b-4 border-double border-[#292725] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8">
          <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#F5F0E6] mb-2">
            ✦ Folio 06 · Programmes, Fellowships, Prizes & Outreach
          </div>
          <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-4">
            <span className="font-display font-bold">Vellune </span>
            <span className="font-editorial italic text-5xl sm:text-7xl text-[#F5F0E6]">
              Initiatives
            </span>{' '}
            <span className="font-avant font-bold uppercase text-2xl sm:text-4xl tracking-wider text-[#E9DCD8]">
              & Long-Term Projects
            </span>
          </h1>
          <p className="font-prose text-base sm:text-lg text-[#E9DCD8] leading-relaxed">
            Beyond our digital journal, Vellune operates twelve long-term programmes designed to mentor young critics, distribute classic books, connect international school chapters, and publish annual print anthologies.
          </p>
        </div>
        <div className="lg:col-span-4">
          <EditorialImage
            src={IMAGES.anthologyEdition}
            alt="Vellune Annual Anthology"
            caption="Volume IV of the Vellune Annual Anthology."
            aspectClass="aspect-[4/3]"
          />
        </div>
      </header>

      <div className="px-6 sm:px-12 py-12 md:py-16 bg-[#F8F6F1]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {INITIATIVES.map((init) => (
            <div
              key={init.id}
              onClick={() => onSelectInitiative(init.id)}
              className="pb-6 border-b-2 border-[#292725] hover:border-[#702F3B] transition-colors cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 bg-[#514052] text-[#F8F6F1] font-mono-num text-[10px] uppercase tracking-wider">
                    Programme {init.number}
                  </span>
                  <span className="font-editorial italic text-lg text-[#702F3B]">
                    {init.category}
                  </span>
                </div>
                <h2 className="font-display font-bold text-2xl text-[#292725] group-hover:text-[#702F3B] transition-colors leading-snug mb-2.5">
                  {init.title}
                </h2>
                <p className="font-prose text-xs text-[#493A32] leading-relaxed mb-5">
                  {init.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#292725]/20 flex items-center justify-between text-xs">
                <span className="font-mono-num text-[#493A32]">{init.statusText}</span>
                <span className="inline-flex items-center gap-1 font-avant font-bold uppercase tracking-wider text-[#702F3B]">
                  <span>Read Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CommunityViewProps {
  selectedProfileId: string | null;
  onSelectProfile: (id: string | null) => void;
  onSelectArticle: (articleId: string) => void;
  onNavigate: (section: NavSection) => void;
}

const COMMUNITY_GROUPS = [
  'All Community',
  'Editorial Team',
  'Writers & Contributors',
  'Young Critics',
  'School Chapters',
  'International Contributors',
  'Guest Contributors',
  'Academic Collaborators',
] as const;

export const CommunityView: React.FC<CommunityViewProps> = ({
  selectedProfileId,
  onSelectProfile,
  onSelectArticle,
  onNavigate,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All Community');

  const activeProfile: ContributorProfile | undefined = selectedProfileId
    ? COMMUNITY_PROFILES.find((p) => p.id === selectedProfileId)
    : undefined;

  const filteredProfiles = COMMUNITY_PROFILES.filter(
    (p) => selectedGroup === 'All Community' || p.group === selectedGroup
  );

  if (activeProfile) {
    const publishedEssays = ARTICLES.filter((a) =>
      activeProfile.publishedArticleIds.includes(a.id)
    );

    return (
      <div className="max-w-[1040px] mx-auto px-6 py-12 md:py-16">
        <button
          onClick={() => onSelectProfile(null)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#493A32] hover:text-[#292725] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Community & Masthead</span>
        </button>

        <div className="p-8 md:p-10 bg-[#F5F0E6] border border-[#B8B3AA] mb-12">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#514052] mb-2">
            <span className="uppercase tracking-widest text-[#702F3B] font-medium">
              {activeProfile.group}
            </span>
            <span aria-hidden="true">·</span>
            <span>{activeProfile.location}</span>
            <span aria-hidden="true">·</span>
            <span>{activeProfile.institutionOrChapter}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-[#292725] mb-2">
            {activeProfile.name}
          </h1>
          <div className="text-sm text-[#493A32] font-medium mb-6">
            {activeProfile.role}
          </div>

          <p className="font-prose text-base text-[#292725] leading-[1.8] max-w-3xl mb-6">
            {activeProfile.fullBio}
          </p>

          <div className="pt-4 border-t border-[#B8B3AA] text-xs text-[#493A32]">
            <strong className="text-[#292725] uppercase tracking-wider mr-2">
              Critical Specialties:
            </strong>
            {activeProfile.specialties.join(' · ')}
          </div>
        </div>

        {/* Published Contributions in The Journal */}
        <section>
          <h2 className="font-display text-3xl text-[#292725] mb-6 pb-3 border-b border-[#B8B3AA]">
            Published Contributions in The Journal ({publishedEssays.length})
          </h2>

          {publishedEssays.length === 0 ? (
            <p className="text-sm text-[#493A32]">
              Contributions include seminar leadership, chapter curation, and advisory review.
            </p>
          ) : (
            <div className="divide-y divide-[#B8B3AA]">
              {publishedEssays.map((essay) => (
                <div
                  key={essay.id}
                  onClick={() => onSelectArticle(essay.id)}
                  className="py-6 first:pt-0 group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#514052] mb-1">
                      <span className="text-[#702F3B]">{essay.seriesTitle}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-num">{essay.issueVolume}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-num">{essay.readingTime}</span>
                    </div>
                    <h3 className="font-display text-2xl text-[#292725] group-hover:text-[#702F3B] transition-colors">
                      {essay.title}
                    </h3>
                    <p className="text-xs text-[#493A32] mt-1">{essay.subtitle}</p>
                  </div>
                  <FileText className="w-4 h-4 text-[#702F3B] shrink-0" />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      <header className="bg-[#493A32] text-[#F8F6F1] px-6 sm:px-12 py-14 md:py-18 border-b-4 border-double border-[#292725]">
        <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#F5F0E6] mb-2">
          ✦ Folio 07 · Masthead, Contributors & Chapter Network
        </div>
        <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-4">
          <span className="font-display font-bold">The Vellune </span>
          <span className="font-editorial italic text-5xl sm:text-7xl text-[#F5F0E6]">
            Community
          </span>{' '}
          <span className="font-avant font-bold uppercase text-2xl sm:text-4xl tracking-wider text-[#C9A5A0]">
            & Directory
          </span>
        </h1>
        <p className="font-prose text-base sm:text-lg text-[#E9DCD8] max-w-3xl leading-relaxed mb-8">
          Bringing together our editorial board, regular writers, Young Critics fellows, general members, chartered school chapters, international hubs, guest translators, and academic collaborators.
        </p>

        <div className="flex flex-wrap gap-2">
          {COMMUNITY_GROUPS.map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3.5 py-1.5 text-xs font-avant font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                selectedGroup === grp
                  ? 'bg-[#F5F0E6] text-[#292725] border-[#292725]'
                  : 'bg-transparent text-[#F8F6F1] border-[#F8F6F1]/40 hover:border-[#F5F0E6]'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>
      </header>

      <div className="px-6 sm:px-12 py-12 md:py-16 bg-[#F8F6F1]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mb-16">
          {filteredProfiles.map((person) => (
            <div
              key={person.id}
              onClick={() => onSelectProfile(person.id)}
              className="pb-6 border-b-2 border-[#292725] hover:border-[#702F3B] transition-colors cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-avant font-bold uppercase tracking-wider text-[#702F3B]">
                    {person.group}
                  </span>
                  <span className="font-mono-num text-[#514052]">{person.location}</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-[#292725] group-hover:text-[#702F3B] transition-colors mb-0.5">
                  {person.name}
                </h2>
                <div className="font-editorial italic text-xl text-[#493A32] mb-3">
                  {person.role}
                </div>
                <p className="font-prose text-xs text-[#493A32] leading-relaxed mb-4">
                  {person.shortBio}
                </p>
              </div>

              <div className="pt-3 border-t border-[#292725]/20 flex items-center justify-between gap-4 text-xs">
                <span className="font-mono-num text-[11px] text-[#493A32]">
                  {person.specialties.join(' · ')}
                </span>
                <span className="font-avant font-bold uppercase tracking-wider text-[#702F3B] shrink-0">
                  Dossier →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Chapters & Membership Banner */}
        <div className="p-8 bg-[#F5F0E6] border-y-4 border-double border-[#292725] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono-num text-xs uppercase tracking-widest text-[#702F3B] font-bold mb-1">
              34 School Chapters · 12 International City Hubs · 420+ Active Members
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#292725] mb-1">
              Join the Vellune Community or Charter a Chapter in Your City
            </h2>
            <p className="font-prose text-sm text-[#493A32]">
              Every contributor, Young Critics fellow, and chapter member receives full access to seminar folios and editorial mentorship.
            </p>
          </div>
          <button
            onClick={() => onNavigate('get-involved')}
            className="px-6 py-3 text-xs font-avant font-bold uppercase tracking-widest bg-[#702F3B] text-[#F8F6F1] border-2 border-[#292725] shadow-[3px_3px_0px_#292725] hover:bg-[#493A32] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Apply to Join →
          </button>
        </div>
      </div>
    </div>
  );
};

interface GetInvolvedViewProps {
  initialTrackId?: string;
}

export const GetInvolvedView: React.FC<GetInvolvedViewProps> = ({
  initialTrackId,
}) => {
  const { user, memberProfile, createCloudSubmission, openAuthModal } = useAuth();
  const [selectedTrackId, setSelectedTrackId] = useState<string>(
    initialTrackId || GET_INVOLVED_TRACKS[0].id
  );
  const [applicantName, setApplicantName] = useState(memberProfile?.displayName || '');
  const [applicantEmail, setApplicantEmail] = useState(user?.email || '');
  const [applicantInstitution, setApplicantInstitution] = useState(
    memberProfile?.chapterOrInstitution || ''
  );
  const [applicantStatement, setApplicantStatement] = useState('');
  const [submittedTracks, setSubmittedTracks] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const activeTrack =
    GET_INVOLVED_TRACKS.find((t) => t.id === selectedTrackId) ||
    GET_INVOLVED_TRACKS[0];

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!applicantName.trim() || !applicantEmail.trim() || !applicantStatement.trim()) {
      return;
    }
    if (applicantStatement.trim().length < BLUEPRINT_LIMITS.pitchMin) {
      setSubmitError(
        `Please provide at least ${BLUEPRINT_LIMITS.pitchMin} characters for your pitch or statement.`
      );
      return;
    }

    setSubmitting(true);
    try {
      if (user && user.emailVerified) {
        await createCloudSubmission({
          trackId: activeTrack.id,
          trackTitle: activeTrack.title,
          applicantName: applicantName.trim(),
          institution: applicantInstitution.trim(),
          pitchText: applicantStatement.trim(),
        });
      }
      setSubmittedTracks((prev) => [...prev, activeTrack.id]);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unable to submit dossier.');
    } finally {
      setSubmitting(false);
    }
  };

  const isSubmitted = submittedTracks.includes(activeTrack.id);

  return (
    <div className="w-full">
      <header className="bg-[#E9DCD8] text-[#292725] px-6 sm:px-12 py-14 md:py-18 border-b-4 border-double border-[#292725]">
        <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#702F3B] font-bold mb-2">
          ✦ Folio 09 · Submissions, Fellowships, Chapters & Volunteering
        </div>
        <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-4">
          <span className="font-display font-bold">Get Involved: </span>
          <span className="font-editorial italic text-5xl sm:text-7xl text-[#702F3B]">
            Participate
          </span>{' '}
          <span className="font-avant font-bold uppercase text-2xl sm:text-4xl tracking-wider text-[#514052]">
            in Vellune
          </span>
        </h1>
        <p className="font-prose text-base sm:text-lg text-[#493A32] max-w-3xl leading-relaxed">
          Vellune is built by emerging critics, editors, chapter leaders, and readers worldwide. Select any of the nine participation pathways below to review guidelines and submit your application or manuscript pitch.
        </p>
      </header>

      <div className="px-6 sm:px-12 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: All 9 Opportunities Selector */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs uppercase tracking-widest text-[#514052] mb-3">
            Select Participation Pathway (01 – 09)
          </div>
          {GET_INVOLVED_TRACKS.map((track) => {
            const active = track.id === activeTrack.id;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrackId(track.id)}
                className={`w-full text-left p-4 border transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                  active
                    ? 'bg-[#292725] text-[#FFFCF7] border-[#292725]'
                    : 'bg-[#FFFCF7] text-[#292725] border-[#B8B3AA] hover:border-[#292725]'
                }`}
              >
                <div>
                  <div className="font-mono-num text-[11px] opacity-75">
                    {track.number}. {track.category}
                  </div>
                  <div className="font-display text-xl leading-snug">
                    {track.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 mt-1 opacity-75" />
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Track Dossier & Submission Form */}
        <div className="lg:col-span-7 p-7 md:p-10 bg-[#F5F0E6] border border-[#B8B3AA]">
          <div className="pb-6 mb-6 border-b border-[#B8B3AA]">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#514052] mb-2">
              <span className="font-mono-num text-[#702F3B] font-medium">
                Pathway {activeTrack.number}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeTrack.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeTrack.commitment}</span>
            </div>

            <h2 className="font-display text-3xl text-[#292725] mb-3">
              {activeTrack.title}
            </h2>
            <p className="font-prose text-sm text-[#493A32] leading-relaxed mb-5">
              {activeTrack.summary}
            </p>

            <div className="p-4 bg-[#FFFCF7] border border-[#B8B3AA]">
              <div className="text-xs uppercase tracking-widest text-[#702F3B] mb-2">
                Submission & Eligibility Guidelines
              </div>
              <ul className="space-y-1.5 text-xs text-[#292725]">
                {activeTrack.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono-num text-[#702F3B]">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-[#FFFCF7] border border-[#493A32]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#493A32] font-medium mb-2">
                <Check className="w-4 h-4" />
                <span>Dossier Received by the Editorial Desk</span>
              </div>
              <p className="text-sm text-[#292725] leading-relaxed mb-3">
                Thank you, <strong>{applicantName}</strong>. Your submission for{' '}
                <em>{activeTrack.title}</em> has been logged and assigned to the appropriate section editor.
              </p>
              <p className="text-xs text-[#493A32] mb-4">
                Editorial responses and pitch evaluations are dispatched within 10–14 calendar days to <strong>{applicantEmail}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmittedTracks((prev) =>
                    prev.filter((id) => id !== activeTrack.id)
                  );
                  setApplicantStatement('');
                }}
                className="px-4 py-2 text-xs border border-[#292725] text-[#292725] hover:bg-[#292725] hover:text-[#FFFCF7] transition-colors cursor-pointer"
              >
                Submit Another Pitch or Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              {!user && (
                <div className="p-3.5 bg-[#F8F6F1] border border-[#B8B3AA] text-xs text-[#493A32]">
                  <button
                    type="button"
                    onClick={openAuthModal}
                    className="underline text-[#702F3B] font-medium cursor-pointer"
                  >
                    Sign in to your Vellune Member Account
                  </button>{' '}
                  to track submission review status in your cloud Member Desk.
                </div>
              )}
              {submitError && (
                <div className="p-3 bg-[#702F3B]/10 border border-[#702F3B] text-xs text-[#702F3B]">
                  {submitError}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g., Clara Vance"
                    className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                    Electronic Mail Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="writer@domain.org"
                    className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                  School, University, City or Affiliation
                </label>
                <input
                  type="text"
                  value={applicantInstitution}
                  onChange={(e) => setApplicantInstitution(e.target.value)}
                  placeholder="e.g., University of Edinburgh / Independent Critic, Dublin"
                  className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                  {activeTrack.formPromptLabel} *
                </label>
                <textarea
                  rows={6}
                  required
                  value={applicantStatement}
                  onChange={(e) => setApplicantStatement(e.target.value)}
                  placeholder={activeTrack.formPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFFCF7] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#292725] text-[#F8F6F1] hover:bg-[#702F3B] transition-colors cursor-pointer disabled:opacity-60"
              >
                {submitting ? 'Transmitting Dossier...' : 'Transmit Application / Pitch'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const [enquiryType, setEnquiryType] = useState<string>('General Enquiries');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [refCode, setRefCode] = useState<string>('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const ENQUIRY_DESKS = [
    {
      title: 'General Enquiries',
      email: 'chancery@vellune.org',
      desc: 'Questions regarding readership, print anthology orders, and general correspondence.',
    },
    {
      title: 'Editorial Enquiries',
      email: 'editorial@vellune.org',
      desc: 'Letters to the Editor, rejoinders for Series 16 (Letters to Vellune), and masthead matters.',
    },
    {
      title: 'Submission Enquiries',
      email: 'submissions@vellune.org',
      desc: 'Manuscript status queries, essay pitches, and book review copies for The Second Reading.',
    },
    {
      title: 'Partnership Enquiries',
      email: 'partnerships@vellune.org',
      desc: 'School libraries, university departments, independent presses, and Pages for All book grants.',
    },
    {
      title: 'Collaboration Proposals',
      email: 'symposia@vellune.org',
      desc: 'Joint literary debates, translation workshops, festival panels, and Guest Speaker invitations.',
    },
  ];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;
    setSending(true);
    try {
      const res = await fetch('/api/correspondence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiryType,
          senderName: senderName.trim(),
          senderEmail: senderEmail.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setContactError(data.error || 'Could not dispatch letter.');
      } else {
        setRefCode(data.referenceId || '');
        setSent(true);
      }
    } catch {
      setContactError('Network error while dispatching letter.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full">
      <header className="bg-[#E9DCD8] text-[#292725] px-6 sm:px-12 py-14 md:py-18 border-b-4 border-double border-[#292725]">
        <div className="font-mono-num text-xs uppercase tracking-[0.22em] text-[#514052] font-bold mb-2">
          ✦ Folio 10 · Editorial Chancery & Correspondence
        </div>
        <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-4">
          <span className="font-display font-bold">Contact the </span>
          <span className="font-editorial italic text-5xl sm:text-7xl text-[#514052]">
            Vellune Chancery
          </span>
        </h1>
        <p className="font-prose text-base sm:text-lg text-[#493A32] max-w-3xl leading-relaxed">
          We welcome correspondence from readers, emerging writers, secondary school teachers, university departments, and literary presses. Direct your letter to the appropriate editorial desk below.
        </p>
      </header>

      <div className="px-6 sm:px-12 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Five Enquiry Desks & Official Email Directory */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#514052] mb-2">
            Official Editorial Desks
          </div>
          {ENQUIRY_DESKS.map((desk) => (
            <div
              key={desk.title}
              onClick={() => setEnquiryType(desk.title)}
              className={`p-5 border transition-colors cursor-pointer ${
                enquiryType === desk.title
                  ? 'bg-[#F5F0E6] border-[#292725]'
                  : 'bg-[#FFFCF7] border-[#B8B3AA] hover:border-[#292725]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <h2 className="font-display text-xl text-[#292725]">
                  {desk.title}
                </h2>
                <span className="font-mono-num text-xs text-[#702F3B]">
                  {desk.email}
                </span>
              </div>
              <p className="text-xs text-[#493A32] leading-relaxed">
                {desk.desc}
              </p>
            </div>
          ))}

          {/* Official Address & Social Links */}
          <div className="p-6 bg-[#F5F0E6] border border-[#B8B3AA] mt-6 space-y-3 text-xs">
            <div className="uppercase tracking-widest text-[#702F3B]">
              Official Electronic Mail & Social Channels
            </div>
            <div className="flex items-center gap-2 text-[#292725]">
              <Mail className="w-3.5 h-3.5 text-[#702F3B]" />
              <span className="font-mono-num">letters@vellune.org</span>
            </div>
            <div className="flex items-center gap-2 text-[#292725]">
              <Globe className="w-3.5 h-3.5 text-[#702F3B]" />
              <span>
                Dispatches on Literary Commons · Instagram (@vellune.journal) · Substack Archive · Podcast Feed
              </span>
            </div>
          </div>
        </div>

        {/* Right: Direct Correspondence Form */}
        <div className="lg:col-span-7 p-8 md:p-10 bg-[#F5F0E6] border border-[#B8B3AA]">
          <div className="text-xs uppercase tracking-widest text-[#702F3B] mb-1">
            Direct Dispatch
          </div>
          <h2 className="font-display text-3xl text-[#292725] mb-6">
            Send a Letter to the Vellune Secretariat
          </h2>

          {sent ? (
            <div className="p-6 bg-[#FFFCF7] border border-[#493A32]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#493A32] font-medium mb-2">
                <Check className="w-4 h-4" />
                <span>Correspondence Logged</span>
              </div>
              <p className="text-sm text-[#292725] leading-relaxed mb-4">
                Thank you, <strong>{senderName}</strong>. Your message regarding{' '}
                <strong>{enquiryType}</strong>
                {refCode ? ` (Reference ${refCode})` : ''} has been routed to our editors. We respond to all correspondence within five working days.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setSubject('');
                  setMessage('');
                }}
                className="px-4 py-2 text-xs border border-[#292725] text-[#292725] hover:bg-[#292725] hover:text-[#FFFCF7] transition-colors cursor-pointer"
              >
                Write Another Letter
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                  Enquiry Category
                </label>
                <select
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                >
                  {ENQUIRY_DESKS.map((d) => (
                    <option key={d.title} value={d.title}>
                      {d.title} ({d.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g., Arthur Pendelton"
                    className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                    Electronic Mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="reader@domain.org"
                    className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Review copy / School Chapter enquiry / Letter to the Editor"
                  className="w-full px-3.5 py-2 text-sm bg-[#FFFCF7] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                  Message *
                </label>
                <textarea
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your letter or proposal here..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFFCF7] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725] leading-relaxed"
                />
              </div>

              {contactError && (
                <div className="p-3 bg-[#702F3B]/10 border border-[#702F3B] text-xs text-[#702F3B]">
                  {contactError}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[#292725] text-[#F8F6F1] hover:bg-[#702F3B] transition-colors cursor-pointer disabled:opacity-60"
              >
                {sending ? 'Dispatching Letter...' : 'Dispatch Letter'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
