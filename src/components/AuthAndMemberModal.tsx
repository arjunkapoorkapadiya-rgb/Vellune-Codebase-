import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  BookMarked,
  FileText,
  Calendar,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  KeyRound,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { BLUEPRINT_LIMITS } from '../lib/validation';

interface MemberDeskProps {
  onSelectArticle: (articleId: string) => void;
  onSelectChapter: (chapterId: string) => void;
  isFullPage?: boolean;
  onClose?: () => void;
}

export function evaluatePasswordPolicy(pw: string) {
  const minLen = pw.length >= 8;
  const hasCase = /[a-z]/.test(pw) && /[A-Z]/.test(pw);
  const hasNumOrSym = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw);
  return {
    minLen,
    hasCase,
    hasNumOrSym,
    isValid: minLen && hasCase && hasNumOrSym,
  };
}

export const MemberDeskWorkspace: React.FC<MemberDeskProps> = ({
  onSelectArticle,
  onSelectChapter,
  isFullPage = false,
  onClose,
}) => {
  const {
    user,
    memberProfile,
    savedFolios,
    submissions,
    eventRegistrations,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resetUserPassword,
    resendVerificationEmail,
    signOutUser,
    updateFolioNote,
    updateMemberProfile,
  } = useAuth();

  const [authTab, setAuthTab] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [deskTab, setDeskTab] = useState<
    'commonplace' | 'submissions' | 'seminars' | 'profile'
  >('commonplace');

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const [profileName, setProfileName] = useState('');
  const [profileChapter, setProfileChapter] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (memberProfile) {
      setProfileName(memberProfile.displayName);
      setProfileChapter(memberProfile.chapterOrInstitution);
      setProfileBio(memberProfile.bio);
    }
  }, [memberProfile]);

  const pwCheck = evaluatePasswordPolicy(password);

  const formatAuthError = (err: unknown): string => {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('auth/operation-not-allowed')) {
      return 'Email/Password sign-in is not yet enabled in your Firebase Console (Authentication → Sign-in method). Please use "Continue with Google" below for immediate cloud access, or enable Email/Password in Firebase Console.';
    }
    if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password')) {
      return 'Incorrect email or password. Please verify your credentials or use Forgot Password.';
    }
    if (msg.includes('auth/user-not-found')) {
      return 'No account found with this electronic mail address.';
    }
    if (msg.includes('auth/email-already-in-use')) {
      return 'An account with this email already exists. Please switch to Sign In.';
    }
    if (msg.includes('auth/too-many-requests')) {
      return 'Too many failed authentication attempts. Please wait a few minutes or reset your password.';
    }
    if (msg.includes('auth/popup-closed-by-user')) {
      return 'Sign-in window was closed before completing authentication.';
    }
    return msg;
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setAuthNotice(null);
    setBusy(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setAuthError(formatAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthNotice(null);

    if (authTab === 'reset') {
      if (!email.trim()) {
        setAuthError('Please enter your registered electronic mail address.');
        return;
      }
      setBusy(true);
      try {
        await resetUserPassword(email);
        setAuthNotice(
          `Password recovery instructions have been dispatched to ${email.trim()}.`
        );
      } catch (err) {
        setAuthError(formatAuthError(err));
      } finally {
        setBusy(false);
      }
      return;
    }

    if (authTab === 'signup') {
      if (displayName.trim().length < 2) {
        setAuthError('Please enter a display name (at least 2 characters).');
        return;
      }
      if (!pwCheck.isValid) {
        setAuthError(
          'Password must be at least 8 characters and include uppercase, lowercase, and a number or symbol.'
        );
        return;
      }
    }

    setBusy(true);
    try {
      if (authTab === 'signin') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, displayName);
        setAuthNotice(
          'Account created. A verification link has been sent to your email address—please verify before saving cloud folios.'
        );
      }
    } catch (err) {
      setAuthError(formatAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(false);
    await updateMemberProfile({
      displayName: profileName,
      bio: profileBio,
      chapterOrInstitution: profileChapter,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  return (
    <div className="p-6 sm:p-8">
      {!user ? (
        <div className="max-w-lg mx-auto">
          <p className="font-prose text-sm text-[#493A32] leading-relaxed mb-6">
            Sign in to synchronize your personal Commonplace Book, private marginalia notes, Deep Reading Challenge progress, seminar passes, and Get Involved submissions across devices.
          </p>

          {/* Primary Google Cloud Sign-In */}
          <button
            type="button"
            disabled={busy}
            onClick={handleGoogleSignIn}
            className="w-full py-3 px-5 text-xs uppercase tracking-widest bg-[#292725] text-[#F8F6F1] hover:bg-[#702F3B] transition-colors cursor-pointer mb-6 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Continue with Google (Verified Cloud Account)</span>
          </button>

          <div className="flex items-center gap-4 mb-6 text-[11px] uppercase tracking-widest text-[#514052]">
            <div className="flex-1 h-px bg-[#B8B3AA]" />
            <span>Or Use Electronic Mail</span>
            <div className="flex-1 h-px bg-[#B8B3AA]" />
          </div>

          {/* Sign In / Sign Up / Reset Switch */}
          <div className="grid grid-cols-3 border border-[#B8B3AA] mb-5">
            <button
              type="button"
              onClick={() => {
                setAuthTab('signin');
                setAuthError(null);
                setAuthNotice(null);
              }}
              className={`py-2 text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                authTab === 'signin'
                  ? 'bg-[#292725] text-[#F8F6F1]'
                  : 'bg-[#F5F0E6] text-[#493A32] hover:text-[#292725]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthTab('signup');
                setAuthError(null);
                setAuthNotice(null);
              }}
              className={`py-2 text-xs uppercase tracking-widest transition-colors cursor-pointer border-x border-[#B8B3AA] ${
                authTab === 'signup'
                  ? 'bg-[#292725] text-[#F8F6F1]'
                  : 'bg-[#F5F0E6] text-[#493A32] hover:text-[#292725]'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthTab('reset');
                setAuthError(null);
                setAuthNotice(null);
              }}
              className={`py-2 text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                authTab === 'reset'
                  ? 'bg-[#292725] text-[#F8F6F1]'
                  : 'bg-[#F5F0E6] text-[#493A32] hover:text-[#292725]'
              }`}
            >
              Reset Password
            </button>
          </div>

          {authError && (
            <div className="p-4 mb-4 bg-[#702F3B]/10 border border-[#702F3B] text-xs text-[#702F3B] leading-relaxed">
              {authError}
            </div>
          )}

          {authNotice && (
            <div className="p-4 mb-4 bg-[#493A32]/10 border border-[#493A32] text-xs text-[#493A32] leading-relaxed">
              {authNotice}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {authTab === 'signup' && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                  Full Name / Pen Name
                </label>
                <input
                  type="text"
                  required
                  maxLength={BLUEPRINT_LIMITS.displayNameMax}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g., Clara Vance"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8F6F1] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                Electronic Mail Address
              </label>
              <input
                type="email"
                required
                maxLength={BLUEPRINT_LIMITS.emailMax}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@institution.edu"
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8F6F1] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
              />
            </div>

            {authTab !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs uppercase tracking-wider text-[#493A32]">
                    Password
                  </label>
                  {authTab === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthTab('reset');
                        setAuthError(null);
                      }}
                      className="text-[11px] text-[#702F3B] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  minLength={authTab === 'signup' ? 8 : 6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    authTab === 'signup'
                      ? 'Min. 8 chars, upper/lower & number'
                      : 'Enter your password'
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8F6F1] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                />

                {/* Strong Password Policy Checklist on Sign Up */}
                {authTab === 'signup' && (
                  <div className="mt-2.5 p-3 bg-[#F5F0E6] border border-[#B8B3AA] text-[11px] space-y-1">
                    <div className="uppercase tracking-wider text-[#493A32] mb-1">
                      Security Policy Requirements:
                    </div>
                    <div
                      className={
                        pwCheck.minLen ? 'text-[#493A32] font-medium' : 'text-[#493A32]'
                      }
                    >
                      {pwCheck.minLen ? '✓' : '·'} Minimum 8 characters
                    </div>
                    <div
                      className={
                        pwCheck.hasCase ? 'text-[#493A32] font-medium' : 'text-[#493A32]'
                      }
                    >
                      {pwCheck.hasCase ? '✓' : '·'} Uppercase and lowercase letters
                    </div>
                    <div
                      className={
                        pwCheck.hasNumOrSym
                          ? 'text-[#493A32] font-medium'
                          : 'text-[#493A32]'
                      }
                    >
                      {pwCheck.hasNumOrSym ? '✓' : '·'} At least one number or symbol
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full py-2.5 px-4 text-xs uppercase tracking-widest border border-[#292725] text-[#292725] hover:bg-[#292725] hover:text-[#F8F6F1] transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {authTab === 'reset' && <KeyRound className="w-3.5 h-3.5" />}
              <span>
                {authTab === 'signin'
                  ? 'Sign In with Email'
                  : authTab === 'signup'
                  ? 'Register & Send Verification'
                  : 'Send Password Recovery Link'}
              </span>
            </button>
          </form>
        </div>
      ) : !user.emailVerified ? (
        <div className="max-w-lg mx-auto py-4">
          <div className="p-6 bg-[#F5F0E6] border border-[#B8B3AA] mb-6">
            <div className="text-xs uppercase tracking-widest text-[#702F3B] mb-2">
              Email Verification Required
            </div>
            <h3 className="font-display text-2xl text-[#292725] mb-2">
              Verify Your Account to Unlock Cloud Sync
            </h3>
            <p className="text-sm text-[#493A32] leading-relaxed mb-4">
              For security, Vellune enforces verified email credentials before writing to your Commonplace Book or submission archive. Please click the verification link sent to <strong>{user.email}</strong>, then reload or sign back in.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={async () => {
                  await resendVerificationEmail();
                  setAuthNotice('Verification email dispatched.');
                }}
                className="px-4 py-2 text-xs uppercase tracking-widest bg-[#292725] text-[#F8F6F1] hover:bg-[#702F3B] transition-colors cursor-pointer"
              >
                Resend Verification Email
              </button>
              <button
                onClick={signOutUser}
                className="px-4 py-2 text-xs border border-[#B8B3AA] text-[#493A32] hover:border-[#292725] cursor-pointer"
              >
                Sign Out
              </button>
            </div>
            {authNotice && (
              <p className="text-xs text-[#493A32] mt-3">{authNotice}</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Member Identity Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#B8B3AA]">
            <div>
              <div className="text-xs font-mono-num text-[#493A32] mb-0.5">
                Verified Cloud Member · Role: {memberProfile?.role || 'reader'}
              </div>
              <div className="font-display text-2xl text-[#292725]">
                {memberProfile?.displayName || user.displayName || 'Vellune Reader'}
              </div>
              <div className="text-xs text-[#493A32]">{user.email}</div>
            </div>
            <button
              onClick={signOutUser}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs border border-[#B8B3AA] text-[#493A32] hover:border-[#292725] hover:text-[#292725] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Member Desk Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 mb-6 border-b border-[#B8B3AA]">
            {[
              {
                id: 'commonplace',
                label: `Commonplace Book (${savedFolios.length})`,
                icon: BookMarked,
              },
              {
                id: 'submissions',
                label: `Submissions (${submissions.length})`,
                icon: FileText,
              },
              {
                id: 'seminars',
                label: `Seminar Passes (${eventRegistrations.length})`,
                icon: Calendar,
              },
              {
                id: 'profile',
                label: 'Member Profile',
                icon: UserIcon,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = deskTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setDeskTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#292725] text-[#F8F6F1] border-[#292725]'
                      : 'bg-[#F5F0E6] text-[#493A32] border-[#B8B3AA] hover:border-[#292725]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Commonplace Book */}
          {deskTab === 'commonplace' && (
            <div>
              {savedFolios.length === 0 ? (
                <div className="p-8 bg-[#F5F0E6] border border-[#B8B3AA] text-center">
                  <h3 className="font-display text-2xl text-[#292725] mb-2">
                    Your Commonplace Book Is Empty
                  </h3>
                  <p className="text-xs text-[#493A32] max-w-md mx-auto">
                    While reading any essay in The Journal or chapter in The Annotator’s Guide, click “Save to Commonplace” to archive it here with your personal margin notes.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedFolios.map((folio) => (
                    <div
                      key={folio.id}
                      className="p-5 bg-[#F5F0E6] border border-[#B8B3AA]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="text-xs text-[#702F3B] mb-0.5">
                            {folio.seriesTitle} · {folio.itemType}
                          </div>
                          <button
                            onClick={() => {
                              if (folio.itemType === 'article') {
                                onSelectArticle(folio.itemId);
                                onClose?.();
                              } else if (folio.itemType === 'chapter') {
                                onSelectChapter(folio.itemId);
                                onClose?.();
                              }
                            }}
                            className="font-display text-xl text-[#292725] hover:text-[#702F3B] text-left cursor-pointer"
                          >
                            {folio.title}
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setEditingNoteId(
                              editingNoteId === folio.id ? null : folio.id
                            );
                            setNoteDraft(folio.note);
                          }}
                          className="text-xs underline underline-offset-4 text-[#493A32] hover:text-[#292725] cursor-pointer"
                        >
                          {editingNoteId === folio.id
                            ? 'Cancel Edit'
                            : folio.note
                            ? 'Edit Margin Note'
                            : 'Add Margin Note'}
                        </button>
                      </div>

                      {editingNoteId === folio.id ? (
                        <div className="mt-3 space-y-2">
                          <textarea
                            rows={3}
                            maxLength={BLUEPRINT_LIMITS.folioNoteMax}
                            value={noteDraft}
                            onChange={(e) => setNoteDraft(e.target.value)}
                            placeholder="Record a syntactic observation, cross-reference, or quotation..."
                            className="w-full p-3 text-xs bg-[#F8F6F1] border border-[#292725] text-[#292725] focus:outline-none"
                          />
                          <button
                            onClick={async () => {
                              await updateFolioNote(folio.id, noteDraft);
                              setEditingNoteId(null);
                            }}
                            className="px-4 py-1.5 text-xs bg-[#292725] text-[#F8F6F1] hover:bg-[#702F3B] cursor-pointer"
                          >
                            Save Note to Cloud
                          </button>
                        </div>
                      ) : (
                        folio.note && (
                          <p className="mt-2 pt-2 border-t border-[#B8B3AA] font-prose italic text-xs text-[#493A32] leading-relaxed">
                            Margin Note: “{folio.note}”
                          </p>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Submissions */}
          {deskTab === 'submissions' && (
            <div>
              {submissions.length === 0 ? (
                <div className="p-8 bg-[#F5F0E6] border border-[#B8B3AA] text-center">
                  <h3 className="font-display text-2xl text-[#292725] mb-2">
                    No Editorial Submissions Recorded
                  </h3>
                  <p className="text-xs text-[#493A32] max-w-md mx-auto">
                    Submissions made through the Get Involved pathways while signed in appear here with live editorial status tracking.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-5 bg-[#F5F0E6] border border-[#B8B3AA]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1">
                        <span className="text-[#702F3B] font-medium">
                          {sub.trackTitle}
                        </span>
                        <span className="font-mono-num uppercase text-[#493A32]">
                          Status: {sub.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#493A32] mb-2">
                        {sub.applicantName}
                        {sub.institution ? ` · ${sub.institution}` : ''}
                      </div>
                      <p className="text-xs text-[#292725] leading-relaxed">
                        {sub.pitchText}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Seminar Passes */}
          {deskTab === 'seminars' && (
            <div>
              {eventRegistrations.length === 0 ? (
                <div className="p-8 bg-[#F5F0E6] border border-[#B8B3AA] text-center">
                  <h3 className="font-display text-2xl text-[#292725] mb-2">
                    No Upcoming Seminar Passes
                  </h3>
                  <p className="text-xs text-[#493A32] max-w-md mx-auto">
                    Register for any Reading Circle, Workshop, or Symposium in Conversations to store your pass and preparatory extract folio here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {eventRegistrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="p-5 bg-[#F5F0E6] border border-[#B8B3AA]"
                    >
                      <div className="text-xs font-mono-num text-[#493A32] mb-1">
                        Confirmed · {reg.attendanceMode}
                      </div>
                      <div className="font-display text-xl text-[#292725] mb-1">
                        {reg.eventTitle}
                      </div>
                      <div className="text-xs text-[#493A32]">
                        Registered Attendee: {reg.attendeeName}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Member Profile */}
          {deskTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  minLength={BLUEPRINT_LIMITS.displayNameMin}
                  maxLength={BLUEPRINT_LIMITS.displayNameMax}
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#F8F6F1] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                  Chapter, School or Institution
                </label>
                <input
                  type="text"
                  maxLength={BLUEPRINT_LIMITS.chapterMax}
                  value={profileChapter}
                  onChange={(e) => setProfileChapter(e.target.value)}
                  placeholder="e.g., Edinburgh Chapter / Independent Reader"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8F6F1] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#493A32] mb-1">
                  Critical Bio & Literary Interests
                </label>
                <textarea
                  rows={4}
                  maxLength={BLUEPRINT_LIMITS.bioMax}
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  placeholder="Describe the authors, literary traditions, or critical questions you study..."
                  className="w-full px-3.5 py-2 text-sm bg-[#F8F6F1] border border-[#B8B3AA] text-[#292725] focus:outline-none focus:border-[#292725]"
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs uppercase tracking-widest bg-[#292725] text-[#F8F6F1] hover:bg-[#702F3B] transition-colors cursor-pointer"
                >
                  Save Member Profile
                </button>
                {profileSaved && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#493A32]">
                    <Check className="w-4 h-4" />
                    <span>Saved to Cloud</span>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export const AuthAndMemberModal: React.FC<{
  onSelectArticle: (articleId: string) => void;
  onSelectChapter: (chapterId: string) => void;
}> = ({ onSelectArticle, onSelectChapter }) => {
  const { user, isAuthModalOpen, closeAuthModal } = useAuth();

  if (!isAuthModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#292725]/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Vellune Member Desk and Authentication"
    >
      <div className="w-full max-w-3xl bg-[#F8F6F1] border-4 border-double border-[#292725] text-[#292725] my-auto shadow-[8px_8px_0px_#292725]">
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-[#292725] bg-[#493A32] text-[#F8F6F1]">
          <div>
            <div className="text-[11px] font-mono-num uppercase tracking-widest text-[#C9A5A0]">
              ✦ Vellune Cloud Chancery
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8F6F1]">
              {user ? (
                <>
                  Member Desk &{' '}
                  <span className="font-editorial italic font-normal text-[#F5F0E6]">
                    Commonplace Book
                  </span>
                </>
              ) : (
                <>
                  Member Sign In,{' '}
                  <span className="font-editorial italic font-normal text-[#F5F0E6]">
                    Registration
                  </span>{' '}
                  & Recovery
                </>
              )}
            </h2>
          </div>
          <button
            onClick={closeAuthModal}
            aria-label="Close Member Desk"
            className="p-2 border-2 border-[#F8F6F1] bg-[#702F3B] text-[#F8F6F1] hover:bg-[#F5F0E6] hover:text-[#292725] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[82vh] overflow-y-auto">
          <MemberDeskWorkspace
            onSelectArticle={onSelectArticle}
            onSelectChapter={onSelectChapter}
            onClose={closeAuthModal}
          />
        </div>
      </div>
    </div>
  );
};

export const MemberDeskPageView: React.FC<{
  onSelectArticle: (articleId: string) => void;
  onSelectChapter: (chapterId: string) => void;
  onBackHome: () => void;
}> = ({ onSelectArticle, onSelectChapter, onBackHome }) => {
  const { user } = useAuth();

  return (
    <div className="w-full">
      <header className="bg-[#493A32] text-[#F8F6F1] px-6 sm:px-12 py-14 md:py-18 border-b-4 border-double border-[#292725]">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#F8F6F1]/25">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs font-avant font-bold uppercase tracking-widest text-[#F5F0E6] hover:text-[#C9A5A0] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Frontispiece</span>
          </button>
          <div className="text-xs font-mono-num text-[#C9A5A0] uppercase tracking-widest">
            ✦ Folio 11 · Protected Cloud Member Portal
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-3">
          {user ? (
            <>
              <span className="font-display font-bold">Your Vellune </span>
              <span className="font-editorial italic text-5xl sm:text-7xl text-[#C9A5A0]">
                Member Desk
              </span>{' '}
              <span className="font-avant font-bold uppercase text-2xl sm:text-4xl tracking-wider text-[#F5F0E6]">
                & Commonplace
              </span>
            </>
          ) : (
            <>
              <span className="font-display font-bold">Member </span>
              <span className="font-editorial italic text-5xl sm:text-7xl text-[#C9A5A0]">
                Authentication
              </span>{' '}
              <span className="font-avant font-bold uppercase text-2xl sm:text-4xl tracking-wider text-[#F5F0E6]">
                & Cloud Desk
              </span>
            </>
          )}
        </h1>
        <p className="font-prose text-base text-[#E9DCD8] max-w-2xl leading-relaxed">
          Access your private commonplace archive, marginalia notes, Deep Reading Challenge ledger, seminar passes, and editorial submissions across devices.
        </p>
      </header>

      <div className="px-6 sm:px-12 py-12 bg-[#F8F6F1]">
        <div className="border-2 border-[#292725] bg-[#F8F6F1]">
          <MemberDeskWorkspace
            onSelectArticle={onSelectArticle}
            onSelectChapter={onSelectChapter}
            isFullPage
          />
        </div>
      </div>
    </div>
  );
};

