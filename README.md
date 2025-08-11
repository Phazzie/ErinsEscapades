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
3. (Only if you haven't already set up): `firebase login`
4. We already include `firebase.json` with SPA rewrite + Firestore rules mapping and `.firebaserc` now points at your project id (`erinsescapades-2590c`). If you run `firebase init hosting`, choose NO when asked to overwrite existing config.
  - Public directory: `dist`
  - Configure as SPA (rewrite all to /index.html): Yes
  - Skip if config already present
5. Ensure `.env` contains your `VITE_FIREBASE_*` values.
6. Deploy (build + hosting + rules): `npm run deploy:firebase`
7. To deploy only hosting later (if rules unchanged): `firebase deploy --only hosting`

### Headless / Token Deployment
If interactive `firebase login` fails in this container:
1. On your local machine run: `firebase login:ci` and copy the printed token.
2. Back here, export it for this shell:
```
export FIREBASE_TOKEN=YOUR_TOKEN_VALUE
```
3. One-off deploy:
```
FIREBASE_TOKEN=$FIREBASE_TOKEN npm run deploy:firebase
```
Or use the helper script:
```
chmod +x scripts/deploy-with-token.sh
./scripts/deploy-with-token.sh
```
Add to shell startup (optional):
```
echo 'export FIREBASE_TOKEN=YOUR_TOKEN_VALUE' >> ~/.bashrc
```
Never commit the token.

Collaboration model: Any authenticated user with the session link can edit tasks (owner field is immutable; only owner can delete the session). See `firestore.rules`.

## Original Monolith
Preserved at `monolith/RAW_MONOLITH.txt` for reference during incremental feature parity verification.

---
Feel free to request additional refactors, tests, or deployment setup.