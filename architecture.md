# Architecture summary

The selected product is Angaan for Woodsville Phase 2, not the legacy Aaple Moshi civic demo. The intended production design is a React/Vite client served by an Express application, Clerk for identity, and PostgreSQL for durable membership and society records. The detailed target and current implementation boundary are maintained in [the engineering architecture](docs/engineering/ARCHITECTURE.md), [the API contract](docs/engineering/API.md), and [the launch scope](docs/product/SOCIETY_LAUNCH.md).

The active app is wired `src/main.jsx` → `src/entry/AppRouter.jsx` → `src/App.jsx`; the Express server runs Vite middleware in development and serves the built `dist` frontend in production, with the canonical Clerk proxy. This wiring and selected checks have passed according to the current [release evidence](docs/engineering/RELEASE_EVIDENCE.md), but resident release is not approved.

Legacy civic screens, simulated roles, browser storage, archived components, and old Supabase references are not the society service. The society app uses Clerk identity, server-side membership authorization, and PostgreSQL; no browser-selected role is trusted.

The society stores only a resident's name, block/tower, flat, Owner/Tenant choice, Clerk user ID, and text they submit (notices, complaints, discussion posts, and complaint timeline notes). There is no approved connection to Supabase and no resident demo seed data in the active launch database.
