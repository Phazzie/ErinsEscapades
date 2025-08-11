# Erin's Escapades

Refactored from a single-file prototype into a modular React + Vite + Firebase app.

## Stack
- React 18 + Vite
- TailwindCSS
- Firebase (Auth + Firestore)

## Getting Started
1. Copy `.env.example` to `.env` and fill in Firebase credentials:
```
cp .env.example .env
```
2. Install dependencies:
```
npm install
```
3. Run dev server:
```
npm run dev
```
4. Open the printed local URL.

## Project Structure
```
src/
  App.jsx                # Root component orchestrating state & composition
  main.jsx               # Entry point
  lib/firebase.js        # Firebase init (env-based)
  hooks/useSession.js    # Firestore realtime session hook
  components/            # UI components (AuthControls, DayToggle, etc.)
  styles/index.css       # Tailwind entry + global styles
monolith/RAW_MONOLITH.txt # Original source reference
```

## Environment Variables
All Firebase config values must be prefixed with `VITE_` for exposure to the client build.

## Pending / Next Steps
- Implement AI vibe generation logic inside `handleGenerateVibe` (currently placeholder alert)
- Add unit tests (e.g., Vitest + React Testing Library)
- Add ESLint config (basic script present)
- Optional: Add Dockerfile & deployment workflow

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build locally
 - `npm run deploy:firebase` – build then deploy hosting + Firestore rules

## Deploying to Firebase Hosting
1. Install the Firebase CLI (if not already): `npm i -g firebase-tools`
2. Login: `firebase login`
3. (First time) Initialize hosting (select existing project or create new): `firebase init hosting`
  - Public directory: `dist`
  - SPA rewrite: Yes
  - Don’t overwrite existing config unless you intend to
4. Ensure `.env` contains your `VITE_FIREBASE_*` values.
5. Deploy (build + hosting + rules): `npm run deploy:firebase`
6. To deploy only hosting later (if rules unchanged): `firebase deploy --only hosting`

Firestore rules are currently OPEN for rapid collaboration (see `firestore.rules`). Tighten before production.

## Original Monolith
Preserved at `monolith/RAW_MONOLITH.txt` for reference during incremental feature parity verification.

---
Feel free to request additional refactors, tests, or deployment setup.