# J. H. portfolio

A frontend engineering portfolio with selected professional work and API Rescue Lab, an interactive frontend reliability demonstration. Employer names, exact months, and direct personal contact or repository links are omitted under ADR-0006.

Built with Next.js, React, TypeScript, and plain CSS. The pages and shared layout are Server Components. Navigation and the lab have separate, small Client Components. The site uses a local decorative SVG and no external fonts.

| Route | Content |
| --- | --- |
| `/{locale}` | Introduction, two featured experiences, Lab preview, About, and Contact |
| `/{locale}/work` | Four work contexts with roles, employment year spans, and selected work |
| `/{locale}/lab` | Personal projects with clearly marked sample-data boundaries |
| `/{locale}/lab/api-rescue-lab` | Project explanation and interactive local simulation |
| `/{locale}/lab/data-operations-demo` | Sample order filtering, editing, aggregation and Recharts visualization, with requirements, design and test design tabs |
| `/{locale}/lab/hvac-monitoring` | HVAC concept landing, interactive building preview and project document tabs |
| `/{locale}/lab/hvac-monitoring/demo` | Sample monitoring with synchronized building, unit list, details and temperature history |

Locales are English (`en`, the default), Japanese (`ja`), and Korean (`ko`). Existing unprefixed links redirect to the saved language or English. Explicit locale URLs take precedence over the preference cookie. Switching language keeps the page and Home anchors and restarts the local Lab. No additional localization dependency or backend is used.

The [documentation index](doc/README.md) links to the design specification, architecture decisions, and release verification checklist.

## Run locally

Use Node.js 24.x.

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

Review shared facts in `content/portfolio.ts`, translations in `content/locales/`, outbound links, and metadata before publishing. Keep private career notes and review captures out of the repository and deployment inputs. Exact career records remain private; the Contact section directs readers to the channel where the portfolio was shared. These omissions reduce direct identity links and do not erase existing public history.

An operator can import the repository into Vercel, select the Next.js preset, use Node.js 24.x, and deploy the project root. The package engine keeps builds and functions on this major while Vercel manages minor and patch updates. No environment variables are needed. Verify desktop and mobile layouts and all four lab scenarios on the preview before promoting it to production.
