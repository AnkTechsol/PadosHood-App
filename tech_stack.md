# Technology (selected design and current evidence)

## Selected target for Angaan

- Client: React 19 and Vite.
- HTTP application/API: Express.
- Identity: Clerk session authentication; authorization belongs to server-side membership records.
- Durable society data: PostgreSQL (`ang_*` tables, non-destructive create-if-not-exists migration).
- Validation: Zod in the route layer.
- Request protection: Helmet, same-origin JSON mutation checks, and rate limiting are present in the backend modules.
- Styling: existing CSS; icons: `lucide-react`.

## Current caveat

The active society client is wired through the main entry; `server/index.js` implements Express+Vite development and Express production serving of the built client, with the canonical Clerk proxy. The latest tested commands/checks and their scope are recorded in [release evidence](docs/engineering/RELEASE_EVIDENCE.md). This does not mean the app has been published or approved for residents.

There is no connected Supabase service for this launch, no approved analytics or external AI integration, and no production seed directory or resident demo records.
