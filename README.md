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

## Original Monolith
Preserved at `monolith/RAW_MONOLITH.txt` for reference during incremental feature parity verification.

---
Feel free to request additional refactors, tests, or deployment setup.