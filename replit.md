# Running this imported project

- Stack: React 19, JavaScript/JSX, Vite, npm, vanilla CSS and vite-plugin-pwa.
- Run the **Start application** workflow (`npm run dev`). Vite listens on `0.0.0.0:5000` and accepts Replit preview hosts.
- Build: `npm run build`. Output: `dist/`.
- Lint: `npm run lint`. Existing warnings remain; this is not a clean production-quality gate.
- Entry: `src/main.jsx` loads `src/core/App.jsx`, the civic demo. The separate society screens under `src/pages/` are not the active application.

## Current safety and release status

This is an interactive prototype, not a production society service. Authentication is simulated, records are browser-local, authorization is not server-enforced, and `src/lib/supabase.js` is not a connected database client. Do not enter real resident details or documents.

The owner wants to prepare the project for their own society and publish on Replit. Confirm the target product and operational requirements before substantial changes. Preserve the existing stack and structure unless a change is explicitly approved.

## Verification performed

Dependency installation and `npm run build` succeeded. `npm run lint` completed with warnings. The Replit preview rendered the registration screen without browser errors. Signed-in screens and resident workflows have not been verified; there is no test script in the imported package manifest.

## Publishing

The current frontend can be built as static files in `dist`, but it is not ready for resident use. Replit publishing configuration must match the final architecture. A real backend, identity provider and shared persistence require implementation, not merely environment variables. Never use Vite's development server as a production server or put private credentials in frontend environment variables.