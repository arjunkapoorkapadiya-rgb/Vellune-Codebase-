/**
 * Validation & sanitization synchronized verbatim with firebase-blueprint.json
 * and firestore.rules constraints.
 */

export const BLUEPRINT_LIMITS = {
  idPattern: /^[a-zA-Z0-9_\-]+$/,
  idMaxLength: 128,
  displayNameMin: 2,
  displayNameMax: 80,
  bioMax: 500,
  chapterMax: 120,
  emailMin: 3,
  emailMax: 160,
  folioTitleMax: 200,
  folioSeriesMax: 120,
  folioNoteMax: 1500,
  applicantNameMin: 2,
  applicantNameMax: 100,
  institutionMax: 140,
  pitchMin: 20,
  pitchMax: 4000,
  eventTitleMax: 200,
  questionNoteMax: 1000,
  challengesMaxCount: 12,
} as const;

export function sanitizeString(value: string, maxLength: number): string {
  return value.replace(/[<>]/g, '').trim().slice(0, maxLength);
}

export function isValidDocumentId(id: string): boolean {
  return (
    typeof id === 'string' &&
    id.length >= 1 &&
    id.length <= BLUEPRINT_LIMITS.idMaxLength &&
    BLUEPRINT_LIMITS.idPattern.test(id)
  );
}

export function toSafeDocumentId(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, BLUEPRINT_LIMITS.idMaxLength);
  return cleaned.length > 0 ? cleaned : 'doc_item';
}
