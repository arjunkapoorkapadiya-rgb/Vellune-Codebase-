import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import {
  auth,
  db,
  OperationType,
  handleFirestoreError,
} from '../lib/firebase';
import {
  BLUEPRINT_LIMITS,
  sanitizeString,
  toSafeDocumentId,
} from '../lib/validation';

export interface MemberPublicProfile {
  uid: string;
  displayName: string;
  role: 'reader' | 'contributor' | 'fellow';
  bio: string;
  chapterOrInstitution: string;
}

export interface SavedFolioRecord {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'article' | 'chapter' | 'resource';
  title: string;
  seriesTitle: string;
  note: string;
}

export interface SubmissionCloudRecord {
  id: string;
  userId: string;
  trackId: string;
  trackTitle: string;
  applicantName: string;
  institution: string;
  pitchText: string;
  status: 'submitted' | 'under_review' | 'accepted' | 'archived';
}

export interface EventRegistrationCloudRecord {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  attendeeName: string;
  attendanceMode: 'Online Seminar Livestream' | 'In-Person Salon Seat';
  questionNote: string;
}

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  memberProfile: MemberPublicProfile | null;
  savedFolios: SavedFolioRecord[];
  submissions: SubmissionCloudRecord[];
  eventRegistrations: EventRegistrationCloudRecord[];
  completedChallenges: string[];
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  resetUserPassword: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  signOutUser: () => Promise<void>;
  toggleSaveFolio: (item: {
    itemId: string;
    itemType: 'article' | 'chapter' | 'resource';
    title: string;
    seriesTitle: string;
  }) => Promise<boolean>;
  updateFolioNote: (folioDocId: string, note: string) => Promise<void>;
  createCloudSubmission: (payload: {
    trackId: string;
    trackTitle: string;
    applicantName: string;
    institution: string;
    pitchText: string;
  }) => Promise<void>;
  registerCloudEvent: (payload: {
    eventId: string;
    eventTitle: string;
    attendeeName: string;
    attendanceMode: 'Online Seminar Livestream' | 'In-Person Salon Seat';
    questionNote: string;
  }) => Promise<void>;
  toggleCloudChallenge: (challengeLabel: string) => Promise<void>;
  updateMemberProfile: (payload: {
    displayName: string;
    bio: string;
    chapterOrInstitution: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [memberProfile, setMemberProfile] =
    useState<MemberPublicProfile | null>(null);
  const [savedFolios, setSavedFolios] = useState<SavedFolioRecord[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionCloudRecord[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<
    EventRegistrationCloudRecord[]
  >([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([
    'Quarter I — The Twice-Read Book',
  ]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);

      if (!currentUser) {
        setMemberProfile(null);
        setSavedFolios([]);
        setSubmissions([]);
        setEventRegistrations([]);
        return;
      }

      // Bootstrap user documents only if email is verified
      if (currentUser.emailVerified) {
        try {
          const publicRef = doc(db, 'users_public', currentUser.uid);
          const publicSnap = await getDoc(publicRef);
          if (!publicSnap.exists()) {
            const safeName = sanitizeString(
              currentUser.displayName || 'Vellune Reader',
              BLUEPRINT_LIMITS.displayNameMax
            );
            await setDoc(publicRef, {
              uid: currentUser.uid,
              displayName:
                safeName.length >= BLUEPRINT_LIMITS.displayNameMin
                  ? safeName
                  : 'Vellune Reader',
              role: 'reader',
              bio: '',
              chapterOrInstitution: '',
              updatedAt: serverTimestamp(),
            });
          }

          const privateRef = doc(db, 'users_private', currentUser.uid);
          const privateSnap = await getDoc(privateRef);
          if (!privateSnap.exists() && currentUser.email) {
            await setDoc(privateRef, {
              uid: currentUser.uid,
              email: sanitizeString(
                currentUser.email,
                BLUEPRINT_LIMITS.emailMax
              ),
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }
        } catch (err) {
          handleFirestoreError(
            err,
            OperationType.WRITE,
            `users_public/${currentUser.uid}`
          );
        }
      }
    });

    return () => unsub();
  }, []);

  // Attach real-time Firestore listeners only when verified user is signed in
  useEffect(() => {
    if (!authReady || !user || !user.emailVerified) return;

    const uid = user.uid;

    const unsubProfile = onSnapshot(
      doc(db, 'users_public', uid),
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          setMemberProfile({
            uid: d.uid,
            displayName: d.displayName,
            role: d.role,
            bio: d.bio || '',
            chapterOrInstitution: d.chapterOrInstitution || '',
          });
        }
      },
      (err) =>
        handleFirestoreError(err, OperationType.GET, `users_public/${uid}`)
    );

    const foliosQuery = query(
      collection(db, 'saved_folios'),
      where('userId', '==', uid)
    );
    const unsubFolios = onSnapshot(
      foliosQuery,
      (snap) => {
        setSavedFolios(
          snap.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: docSnap.id,
              userId: d.userId,
              itemId: d.itemId,
              itemType: d.itemType,
              title: d.title,
              seriesTitle: d.seriesTitle,
              note: d.note || '',
            };
          })
        );
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'saved_folios')
    );

    const submissionsQuery = query(
      collection(db, 'submissions'),
      where('userId', '==', uid)
    );
    const unsubSubmissions = onSnapshot(
      submissionsQuery,
      (snap) => {
        setSubmissions(
          snap.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: docSnap.id,
              userId: d.userId,
              trackId: d.trackId,
              trackTitle: d.trackTitle,
              applicantName: d.applicantName,
              institution: d.institution || '',
              pitchText: d.pitchText,
              status: d.status,
            };
          })
        );
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'submissions')
    );

    const regQuery = query(
      collection(db, 'event_registrations'),
      where('userId', '==', uid)
    );
    const unsubEvents = onSnapshot(
      regQuery,
      (snap) => {
        setEventRegistrations(
          snap.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: docSnap.id,
              userId: d.userId,
              eventId: d.eventId,
              eventTitle: d.eventTitle,
              attendeeName: d.attendeeName,
              attendanceMode: d.attendanceMode,
              questionNote: d.questionNote || '',
            };
          })
        );
      },
      (err) =>
        handleFirestoreError(err, OperationType.LIST, 'event_registrations')
    );

    const unsubProgress = onSnapshot(
      doc(db, 'reading_progress', uid),
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          if (Array.isArray(d.completedChallenges)) {
            setCompletedChallenges(d.completedChallenges);
          }
        }
      },
      (err) =>
        handleFirestoreError(err, OperationType.GET, `reading_progress/${uid}`)
    );

    return () => {
      unsubProfile();
      unsubFolios();
      unsubSubmissions();
      unsubEvents();
      unsubProgress();
    };
  }, [authReady, user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
    const cleanName = sanitizeString(
      displayName,
      BLUEPRINT_LIMITS.displayNameMax
    );
    if (cleanName) {
      await updateProfile(cred.user, { displayName: cleanName });
    }
    await sendEmailVerification(cred.user);
  };

  const resendVerificationEmail = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const resetUserPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const toggleSaveFolio = async (item: {
    itemId: string;
    itemType: 'article' | 'chapter' | 'resource';
    title: string;
    seriesTitle: string;
  }): Promise<boolean> => {
    if (!user || !user.emailVerified) {
      setIsAuthModalOpen(true);
      return false;
    }

    const existingFolio = savedFolios.find((f) => f.itemId === item.itemId);
    if (existingFolio) {
      try {
        await deleteDoc(doc(db, 'saved_folios', existingFolio.id));
        return false;
      } catch (err) {
        handleFirestoreError(
          err,
          OperationType.DELETE,
          `saved_folios/${existingFolio.id}`
        );
      }
    }

    const folioId = toSafeDocumentId(`${user.uid}_${item.itemId}`);
    try {
      await setDoc(doc(db, 'saved_folios', folioId), {
        userId: user.uid,
        itemId: toSafeDocumentId(item.itemId),
        itemType: item.itemType,
        title: sanitizeString(item.title, BLUEPRINT_LIMITS.folioTitleMax),
        seriesTitle: sanitizeString(
          item.seriesTitle,
          BLUEPRINT_LIMITS.folioSeriesMax
        ),
        note: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (err) {
      handleFirestoreError(
        err,
        OperationType.CREATE,
        `saved_folios/${folioId}`
      );
    }
  };

  const updateFolioNote = async (folioDocId: string, note: string) => {
    if (!user || !user.emailVerified) return;
    try {
      await updateDoc(doc(db, 'saved_folios', folioDocId), {
        note: sanitizeString(note, BLUEPRINT_LIMITS.folioNoteMax),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(
        err,
        OperationType.UPDATE,
        `saved_folios/${folioDocId}`
      );
    }
  };

  const createCloudSubmission = async (payload: {
    trackId: string;
    trackTitle: string;
    applicantName: string;
    institution: string;
    pitchText: string;
  }) => {
    if (!user || !user.emailVerified) {
      setIsAuthModalOpen(true);
      throw new Error('Please sign in with a verified account to submit.');
    }

    const cleanPitch = sanitizeString(
      payload.pitchText,
      BLUEPRINT_LIMITS.pitchMax
    );
    if (cleanPitch.length < BLUEPRINT_LIMITS.pitchMin) {
      throw new Error(
        `Submission pitch must be at least ${BLUEPRINT_LIMITS.pitchMin} characters.`
      );
    }

    try {
      await addDoc(collection(db, 'submissions'), {
        userId: user.uid,
        trackId: toSafeDocumentId(payload.trackId).slice(0, 80),
        trackTitle: sanitizeString(payload.trackTitle, 140),
        applicantName: sanitizeString(
          payload.applicantName,
          BLUEPRINT_LIMITS.applicantNameMax
        ),
        institution: sanitizeString(
          payload.institution,
          BLUEPRINT_LIMITS.institutionMax
        ),
        pitchText: cleanPitch,
        status: 'submitted',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'submissions');
    }
  };

  const registerCloudEvent = async (payload: {
    eventId: string;
    eventTitle: string;
    attendeeName: string;
    attendanceMode: 'Online Seminar Livestream' | 'In-Person Salon Seat';
    questionNote: string;
  }) => {
    if (!user || !user.emailVerified) {
      setIsAuthModalOpen(true);
      throw new Error('Please sign in with a verified account to register.');
    }

    const regId = toSafeDocumentId(`${user.uid}_${payload.eventId}`);
    try {
      await setDoc(doc(db, 'event_registrations', regId), {
        userId: user.uid,
        eventId: toSafeDocumentId(payload.eventId).slice(0, 100),
        eventTitle: sanitizeString(
          payload.eventTitle,
          BLUEPRINT_LIMITS.eventTitleMax
        ),
        attendeeName: sanitizeString(
          payload.attendeeName,
          BLUEPRINT_LIMITS.applicantNameMax
        ),
        attendanceMode: payload.attendanceMode,
        questionNote: sanitizeString(
          payload.questionNote,
          BLUEPRINT_LIMITS.questionNoteMax
        ),
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(
        err,
        OperationType.CREATE,
        `event_registrations/${regId}`
      );
    }
  };

  const toggleCloudChallenge = async (challengeLabel: string) => {
    const cleanLabel = sanitizeString(challengeLabel, 160);
    const nextList = completedChallenges.includes(cleanLabel)
      ? completedChallenges.filter((c) => c !== cleanLabel)
      : [...completedChallenges, cleanLabel].slice(
          0,
          BLUEPRINT_LIMITS.challengesMaxCount
        );

    setCompletedChallenges(nextList);

    if (user && user.emailVerified) {
      try {
        await setDoc(doc(db, 'reading_progress', user.uid), {
          userId: user.uid,
          completedChallenges: nextList,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(
          err,
          OperationType.WRITE,
          `reading_progress/${user.uid}`
        );
      }
    }
  };

  const updateMemberProfile = async (payload: {
    displayName: string;
    bio: string;
    chapterOrInstitution: string;
  }) => {
    if (!user || !user.emailVerified) return;

    const cleanName = sanitizeString(
      payload.displayName,
      BLUEPRINT_LIMITS.displayNameMax
    );
    if (cleanName.length < BLUEPRINT_LIMITS.displayNameMin) {
      throw new Error('Display name must be at least 2 characters.');
    }

    try {
      await updateDoc(doc(db, 'users_public', user.uid), {
        displayName: cleanName,
        bio: sanitizeString(payload.bio, BLUEPRINT_LIMITS.bioMax),
        chapterOrInstitution: sanitizeString(
          payload.chapterOrInstitution,
          BLUEPRINT_LIMITS.chapterMax
        ),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(
        err,
        OperationType.UPDATE,
        `users_public/${user.uid}`
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        memberProfile,
        savedFolios,
        submissions,
        eventRegistrations,
        completedChallenges,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        resetUserPassword,
        resendVerificationEmail,
        signOutUser,
        toggleSaveFolio,
        updateFolioNote,
        createCloudSubmission,
        registerCloudEvent,
        toggleCloudChallenge,
        updateMemberProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
