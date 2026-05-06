# FogReport

![FogReport](public/fogreport.png)

AI-powered military intelligence briefing platform. Configure a conflict scenario between two countries, and FogReport produces a structured intelligence briefing grounded in real treaties, military bases, weapon systems, and historical analogues retrieved via RAG.

## Stack

- **Frontend** — Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend** — [Convex](https://convex.dev) (database, auth, server functions, vector search)
- **Auth** — `@convex-dev/auth` with the Password provider
- **AI** — OpenAI (called from Convex actions for analysis, briefing generation, and treaty embeddings)

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenAI](https://platform.openai.com) API key
- A [Convex](https://convex.dev) account (free tier is fine)

### Setup

```bash
git clone https://github.com/Jacksongio/FogReport.git
cd FogReport
npm install
```

Initialize Convex (this creates a deployment and writes `CONVEX_DEPLOYMENT` + `NEXT_PUBLIC_CONVEX_URL` into `.env.local`):

```bash
npx convex dev
```

Set the OpenAI key on the Convex deployment (it is consumed by Convex actions, not the Next.js app):

```bash
npx convex env set OPENAI_API_KEY sk-...
```

Seed the structured intelligence dataset (countries, treaties, bases, weapons, sub-state actors, etc.) — required for the RAG-grounded briefings to work end-to-end:

```bash
npx convex run seedActions:seedAll
```

Run the dev server:

```bash
npm run dev
```

Open <http://localhost:3000>, create an account on the auth screen, and start a simulation.

## Project Layout

```
app/
  page.tsx                    # Main simulation orchestrator
  layout.tsx                  # Root layout + Convex/Toaster providers
  briefings/page.tsx          # Past briefings index
  api/countries/              # Country lookup endpoints (world-countries)
components/
  political-advisor/          # Feature components for the main page
    setup-tab.tsx             # Country/scenario form
    briefing-tab.tsx          # Briefing results panel
    intelligence-sources-tab.tsx
    briefing-document.tsx     # Rendered briefing + print/copy
    briefing-progress.tsx     # 6-step progress indicator
    country-selector.tsx      # Mobile/desktop searchable dropdown
    example-scenarios-carousel.tsx
    header.tsx, types.ts
  auth-gate.tsx               # Convex Password sign-in/up gate
  convex-provider.tsx         # ConvexAuthNextjsProvider wrapper
  profile-menu.tsx            # Sign-out menu in the header
  StarryBackground.tsx        # Animated starfield background
  ui/                         # shadcn/ui primitives (only what's actually used)
convex/
  schema.ts                   # Tables: users, briefings, analyses, simulations,
                              #         treaties, bases, weapons, chokepoints, ...
  auth.ts, auth.config.ts     # Password-provider auth setup
  ai.ts                       # `analyze` and `generateBriefing` actions
  briefings.ts                # CRUD for saved briefings
  analyses.ts, simulations.ts
  treaties.ts                 # Treaty search by scenario
  seedActions.ts              # `seedAll` plus per-table seeders
  seedMutations.ts, seedData/
  http.ts, users.ts
hooks/
  use-briefing-generator.ts   # Orchestrates simulation + briefing actions
  use-toast.ts, use-mobile.tsx
lib/
  example-scenarios.ts        # 10 prebuilt example conflicts
  conflict-detection.ts       # Auto-detect conflict type from free text
  briefing-export.ts          # Print + copy-to-clipboard helpers
  briefing-fallbacks.ts       # Fallback simulation/briefing when AI unavailable
  utils.ts                    # cn() className helper
middleware.ts                 # Convex auth middleware
```

## Workflow

1. **Setup tab** — pick the country you're simulating as, the attacker and defender, fill in scenario details, severity, and timeframe. Conflict type (territorial, naval, nuclear, …) is auto-detected from the description. Example scenarios in the carousel auto-fill every field.
2. **Generate Briefing** — kicks off two parallel Convex actions:
   - `ai.analyze` saves analysis parameters and runs an OpenAI call producing diplomatic / military / economic / public-support / alliance scores plus recommendations.
   - `ai.generateBriefing` retrieves relevant treaties, bases, weapons, sub-state actors, chokepoints, intel agencies, SOF units, defense industries, and historical incidents, then synthesizes a classified-style intelligence briefing with citations and a QA critique.
3. **Intelligence Briefing tab** — renders the briefing with print and copy actions; persisted to Convex so it shows up in `/briefings`.
4. **Intelligence Sources tab** — shows every structured record the briefing was grounded against, grouped by category.

## Scripts

- `npm run dev` — Next.js dev server
- `npm run build` — production build
- `npm run start` — production server
- `npm run convex:dev` — Convex dev (functions + schema watch)
- `npm run convex:deploy` — push Convex functions to production

## Disclaimer

FogReport generates AI content for educational and simulation purposes only. Nothing produced here should be treated as actual intelligence, nor used as input to real-world military, diplomatic, or policy decisions. Scenarios, recommendations, and assessments are hypothetical.

## License

MIT — see [LICENSE](LICENSE).
