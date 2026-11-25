# Vellune Security Specification (Phase 0: Payload-First Security TDD)

## 1. Data Invariants
1. **Identity Integrity**: Every document in `users_public`, `users_private`, `saved_folios`, `submissions`, `event_registrations`, and `reading_progress` must carry a `uid` / `userId` strictly matching `request.auth.uid`, and write operations require `request.auth.token.email_verified == true`.
2. **PII Isolation**: Email addresses are stored exclusively in `/users_private/{userId}` where `allow list: if false` and `allow get: if isOwner(userId) || isAdmin()`.
3. **Role Protection**: Members cannot self-assign `role: 'admin'` or inject arbitrary role strings; `users_public.role` is restricted to `['reader', 'contributor', 'fellow']` and cannot be escalated on update without admin intervention.
4. **Temporal Integrity**: All `createdAt` and `updatedAt` fields must match `request.time` (server timestamp). Client-forged timestamps are rejected.
5. **Terminal State Locking**: Once a `SubmissionRecord` moves out of `'submitted'` to `'accepted'` or `'archived'`, non-admin users cannot alter it.
6. **Path & Size Hardening**: All document IDs are validated against `^[a-zA-Z0-9_\-]+$` (max 128 chars), and every string/array field has strict lower and upper bounds.

## 2. The "Dirty Dozen" Adversarial Payloads (Must Return PERMISSION_DENIED)
1. **Unauthenticated Write**: `POST /saved_folios/f1` with `request.auth == null`.
2. **Unverified Email Write**: `POST /saved_folios/f1` with `email_verified: false`.
3. **Identity Spoofing**: `POST /saved_folios/f1` with `userId: "other-user-uid"` while signed in as `"user-a"`.
4. **Shadow Field Injection**: `POST /users_public/user-a` including extra field `isAdmin: true` or `verifiedCritic: true`.
5. **Self-Assigned Admin Role**: `POST /users_public/user-a` with `role: "admin"`.
6. **PII Scraping List Query**: `LIST /users_private` by any non-admin authenticated user.
7. **Cross-User PII Read**: `GET /users_private/user-b` while signed in as `user-a`.
8. **Client-Forged Timestamp**: `POST /submissions/sub1` with `createdAt: "2020-01-01T00:00:00Z"` instead of `request.time`.
9. **ID Poisoning / Oversized Path**: `PUT /saved_folios/${"a".repeat(250)}` or invalid characters `../admin`.
10. **Denial-of-Wallet Oversized Pitch**: `POST /submissions/sub1` with `pitchText` exceeding 4,000 characters.
11. **Terminal State Bypass**: `UPDATE /submissions/sub1` changing `status` from `'archived'` back to `'submitted'` as a regular user.
12. **Unbounded Array Injection**: `PUT /reading_progress/user-a` with `completedChallenges` containing 25 items or non-string element `[12345]`.
