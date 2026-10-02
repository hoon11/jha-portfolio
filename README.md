# J. Ha portfolio

A frontend engineering portfolio with a complete professional employment history and API Rescue Lab, an interactive frontend reliability demonstration.

Built with Next.js, React, TypeScript, and plain CSS. The pages and shared layout are Server Components. Navigation and the lab have separate, small Client Components. The site uses a local decorative SVG and no external fonts.

| Route | Content |
| --- | --- |
| `/{locale}` | Introduction, two featured experiences, Lab preview, About, and Contact |
| `/{locale}/work` | Four employers with role and employment dates, plus selected work under each |
| `/{locale}/lab` | Real personal projects |
| `/{locale}/lab/api-rescue-lab` | Project explanation and interactive local simulation |

Locales are English (`en`, the default), Japanese (`ja`), and Korean (`ko`). Existing unprefixed links redirect to the saved language or English. Explicit locale URLs take precedence over the preference cookie. Switching language keeps the page and Home anchors and restarts the local Lab. No additional localization dependency or backend is used.

The [design specification](doc/DESIGN.md) is the canonical public reference for this portfolio. The [UI reference](doc/ui/README.md) records its visual rules, and the [production checklist](doc/PRODUCTION_CHECKLIST.md) covers release verification.

The [architecture decisions](doc/adr/README.md) explain durable engineering choices and their trade-offs.

## Run locally

Use Node.js 22 or later.

```sh
npm install
npm run setup:hooks
npm run dev
```

Open http://127.0.0.1:3000. For verification and a production build:

```sh
npm run test
npm run typecheck
npm run build
npm run start
```

## Local Git checks

Run `npm run setup:hooks` after cloning to enable the repository hooks. The pre-commit hook checks staged files for private or generated paths, whitespace errors, and recognizable credentials. The pre-push hook runs the tests, TypeScript check, and production build. Keep private notes and local review captures outside commits.

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

Review shared facts in `content/portfolio.ts`, translations in `content/locales/`, contact links, and metadata before publishing. Keep private career notes and review captures out of the repository and deployment inputs.

An operator can import the repository into Vercel, select the Next.js preset, use Node.js 22 or later, and deploy the project root. No environment variables are needed. Verify desktop and mobile layouts and all four lab scenarios on the preview before promoting it to production.
