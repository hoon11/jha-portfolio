# J. Ha portfolio

A frontend engineering portfolio with a complete professional employment history and API Rescue Lab, an interactive frontend reliability demonstration.

Built with Next.js, React, TypeScript, and plain CSS. The pages and shared layout are Server Components. Navigation and the lab have separate, small Client Components. The site uses a local decorative SVG and no external fonts.

| Route | Content |
| --- | --- |
| `/` | Introduction, two featured experiences, Lab preview, About, and Contact |
| `/work` | Four employers with role and employment dates, plus selected work under each |
| `/lab` | Real personal projects |
| `/lab/api-rescue-lab` | Project explanation and interactive local simulation |

`doc/DESIGN.md` is the current implementation specification. The PNGs in `doc/ui/` are visual references.

## Run locally

Use Node.js 22 or later.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. For verification and a production build:

```sh
npm run test
npm run typecheck
npm run build
npm run start
```

## Lab behavior

| Scenario | Outcome |
| --- | --- |
| Normal | Valid sample tasks after approximately 600 ms |
| Slow response | Nominal 4-second response cancelled at the 2-second timeout |
| Server error | Simulated failure after approximately 600 ms |
| Invalid data | Malformed payload rejected by the normal response validator after approximately 600 ms |

Failures remain failures on retry. Select Normal and run again to recover. No data appears before the first successful request. Loading and failed requests preserve the most recent successful data and label it accordingly.

The lab owns one reducer state for selection, request lifecycle, retained tasks, and the latest six events. Request IDs reject stale completion actions. The simulation clears both timers and its abort listener when it completes, times out, or is cancelled. Unmounting aborts the active request. Normal and malformed responses pass through the same validator before any data reaches the reducer.

Tests exercise the component with the actual simulator and fake timers, plus out-of-order reducer completions. The simulation uses no HTTP requests, backend, or persistence. It demonstrates frontend behavior, not deployed network infrastructure.

## Publishing

Review the career copy in `content/portfolio.ts`, contact links, and metadata before publishing. Keep private career and planning documents gitignored and out of deployment inputs.

An operator can import the repository into Vercel, select the Next.js preset, use Node.js 22 or later, and deploy the project root. No environment variables are needed. Verify desktop and mobile layouts and all four lab scenarios on the preview before promoting it to production.
