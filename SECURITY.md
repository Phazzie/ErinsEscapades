# Security Notes

## Removed / Legacy Secrets
The original monolith file (`monolith/RAW_MONOLITH.txt`) contained hardcoded Firebase credentials (now replaced by environment variables). These keys are not treated as true backend secrets (client-side Firebase config) but should still not be committed if rotated.

If any previously exposed API keys remain:
1. Go to Google Cloud Console -> Credentials.
2. Rotate (create new key) and restrict usage to required APIs & referrer restrictions.
3. Update `.env` with new values and redeploy.

## Current Firestore Rules
`firestore.rules` currently allow open read/write for rapid MVP iteration. Before production tighten to at least:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sessions/{sessionId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == (resource.data.owner ?? request.resource.data.owner);
    }
  }
}
```
Deploy tightened rules with:
```
firebase deploy --only firestore:rules
```

## Next Hardening Steps
- Add rate limiting / write batching in client.
- Store per-change audit entries (who edited last) if needed.
- Consider a write token for invited collaborators.
- Add Cloud Functions for validation if logic grows complex.

## Reporting
Open a GitHub issue with `[SECURITY]` in the title for any concerns; avoid posting sensitive data in tickets.
