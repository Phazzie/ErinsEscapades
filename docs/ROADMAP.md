# Project Roadmap: Erin's Escapades

This file contains two sections:
1. Detailed Comprehensive Checklist (deep breakdown)
2. KISS Version (minimal essentials to reach launch)

---
## 1. Detailed Comprehensive Checklist
Priority Legend: P0 (Critical), P1 (Important), P2 (Nice to have), P3 (Future)
[MVP] marks minimal launch scope.

### 1. Core Features
- P0 [MVP] Implement AI vibe generation (backend endpoint + client integration)
- P0 [MVP] Debounce Firestore writes
- P0 [MVP] Add `updatedAt` timestamp to session docs
- P1 Optional: Split session doc into subcollection per vibe
- P2 Duplicate / clone vibe feature
- P3 Session export/import JSON

### 2. Security & Integrity
- P0 [MVP] Firestore security rules (ownership, schema)
- P0 [MVP] Rules tests (emulator)
- P0 Sanitize input (length + strip control chars)
- P1 Rate limit AI generation
- P2 Basic content moderation filter
- P3 Audit log collection for changes

### 3. AI Service
- P0 [MVP] Choose platform (Firebase/Vercel Function)
- P0 Structured JSON prompt + schema validation
- P0 Reliable error handling (retry malformed JSON once)
- P1 Log model latency/errors
- P2 Cache repeated theme requests
- P3 Model fallback chain

### 4. Environment & Config
- P0 [MVP] Runtime env validation helper
- P1 Multiple env files (.env.development / .env.production.example)
- P2 Feature flags (e.g., AI_ENABLED)
- P3 Secret scanning in CI

### 5. UI / UX
- P0 [MVP] Toast system (replace alert)
- P0 [MVP] Loading indicator on AI button
- P0 Disable key interactions while initializing
- P1 Keyboard reordering alternative
- P1 Inline failure messages
- P2 Theme toggle (light/dark)
- P2 Mobile drag handle optimization
- P3 Extract inline animation styles to CSS

### 6. Accessibility
- P0 [MVP] Proper radio group semantics (fieldset+legend)
- P0 Ensure focus outlines visible
- P1 ARIA live region for toasts
- P1 Contrast adjustments if needed
- P2 Locale/i18n scaffolding
- P3 Screen reader reorder controls

### 7. Performance & Bundle
- P1 Lazy-load AI component (React.lazy)
- P1 Tree-shake Firebase imports
- P1 Debounce text input updates (avoid per-keystroke writes)
- P2 Manual chunk splitting (vendor separation)
- P2 Preload fonts
- P3 Offline support (service worker)

### 8. Error Handling & Resilience
- P0 [MVP] Global ErrorBoundary
- P0 Firestore listener error fallback UI
- P1 Central logger utility
- P1 Retry strategy for network/AI errors
- P2 Offline detection banner
- P3 Circuit breaker for AI endpoint

### 9. Testing
- P0 [MVP] Add Vitest + RTL
- P0 [MVP] Test useSession hook (initial load + subsequent write)
- P0 [MVP] Test vibe rename/delete flow
- P1 Test AI service parsing (mock)
- P1 Firestore rules tests (authorized vs unauthorized)
- P2 Accessibility axe tests
- P2 E2E test (Playwright/Cypress) core flow
- P3 Load test AI endpoint

### 10. Type Safety / Code Quality
- P1 Introduce TypeScript (incremental)
- P1 Types: Task, Session, VibeMap
- P1 ESLint + Prettier + pre-commit (husky + lint-staged)
- P2 Strict tsc in CI
- P3 ADR documents for key decisions

### 11. Deployment & CI/CD
- P0 [MVP] Decide hosting (Firebase Hosting or Vercel)
- P0 [MVP] GitHub Action: install → lint → test → build → deploy
- P0 Cache dependencies in CI
- P1 Preview deploy per PR
- P2 Tag-based release flow
- P3 Sentry integration

### 12. Observability & Analytics
- P1 Basic event logging (task_update, vibe_generated)
- P1 Error logging pipeline
- P2 Performance metrics collection
- P3 User funnel metrics

### 13. Documentation
- P0 [MVP] README: AI usage + security notes
- P1 CONTRIBUTING.md
- P1 SECURITY.md
- P1 Firestore rules rationale
- P2 Architecture diagram
- P3 OpenAPI doc for AI endpoint

### 14. Privacy & Compliance
- P1 Privacy note (data stored + retention)
- P2 Session deletion feature (owner)
- P2 Opt-out analytics toggle
- P3 Data export (download JSON)

### 15. Data Model Evolution
- P1 Add `version` field
- P2 Subcollections for vibes
- P2 Index creation if querying by owner/updatedAt
- P3 Archival strategy

### 16. Reliability & Scaling
- P1 Throttle reorder operations
- P2 Backoff for Firestore quota errors
- P2 Scheduled cleanup of stale sessions
- P3 Sharding / partitioning strategy (if growth demands)

### 17. Misc Enhancements
- P1 Slug utility normalization
- P2 Duplicate vibe button
- P2 Task templates
- P3 Real-time presence (who is online)

---
## 2. KISS Version (Minimal Essentials to Launch)
Focus: ship a functional, safe baseline with AI generation.

1. AI Generation
   - Backend function (generate vibe) + client integration
   - Loading state + toast on error
2. Security
   - Firestore rules (owner can read/write, others read)
   - Input sanitization (length checks)
3. Stability
   - Debounce writes (400ms)
   - Global ErrorBoundary
4. Basic Testing
   - useSession hook test
   - Vibe rename/delete test
   - AI service mock test
5. Deployment
   - CI workflow: lint + test + build + deploy
   - Hosting selection + one-click deploy step
6. Documentation
   - README updates (setup, AI, deploy)
   - ROADMAP (this file)
7. Accessibility Quick Wins
   - Fieldset/legend for radio groups
   - Visible focus outlines
8. Env Validation
   - Warn if any Firebase env var missing at startup

That’s the smallest slice that still feels professional and safe.

---
## Recommended Immediate Next Step
Implement Firestore rules + AI backend skeleton together, then hook the button (replacing the alert).

Let me know to proceed with: `Implement: rules + AI skeleton` (or specify another subset) and I’ll start coding.
