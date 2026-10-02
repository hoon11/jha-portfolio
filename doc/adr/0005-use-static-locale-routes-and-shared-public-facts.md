# ADR-0005: Use static locale routes and shared public facts

## Status

Accepted

## Date

2026-10-02

## Context

Issue #3 adds English, Japanese, and Korean. Visitors need shareable language URLs, correct server-rendered document language and metadata, and predictable navigation. The existing English URLs must remain usable. Career facts must stay equivalent across translations. ADR-0003 keeps the Lab transient and browser-local; ADR-0004 limits translation inputs to approved public content.

## Decision

Use one statically generated `app/[locale]` route tree for `en`, `ja`, and `ko`. All four pages use a locale prefix. English is the default; browser language does not select a locale automatically. Unsupported locale segments return 404.

The four existing unprefixed paths remain entry aliases. A narrowly matched Next.js Proxy sends a temporary redirect to the same page under a valid saved language or English. Explicit locale URLs always win. Preference redirects are private and not cacheable. A first-party `portfolio-locale` cookie stores only a user-selected locale for one year, with Path=/, SameSite=Lax, and Secure on HTTPS. No preference is needed to render a localized page.

Keep approved companies, roles, periods, technology names, contact links, and work relationships in one shared public fact source. Typed locale resources own prose and display labels. Server Components load the selected resource; navigation and Lab receive only their own copy. Do not add an i18n library or backend.

Switching languages performs document navigation to the same page, preserving its query and recognized Home anchor. The language control is a labeled native select, with language names in their own language. It remains visible outside the collapsed mobile menu. Desktop places it below navigation; tablet places brand and selector above the full navigation; mobile places it below the compact brand/menu row.

Each localized page emits its language, title, description, Open Graph copy and URL on the server. Its canonical points to itself. Alternate links cover all three languages and x-default English using the verified public production origin. Fragments and query strings do not change the canonical.

The Lab keeps one reducer and its existing simulator, validation and timeout contract. Store bounded locale-neutral event data and translate at rendering time. Translate known sample task titles and status labels for display without changing validated protocol data. A language change restarts the local simulation; do not transfer or persist Lab state. Explain this beside the demo.

## Consequences

Twelve localized pages share one implementation and remain static. Explicit links are stable even when a stored preference differs. Central facts and typed resources reduce accidental translation drift, though editorial comparison is still required.

Old links incur one redirect. Language switching resets Lab state in exchange for a correct document language and no persistent Lab store. Preference storage is limited to a language code and cannot track Lab activity.

## Alternatives considered

- Keep English unprefixed and prefix Japanese/Korean. This preserves English canonical URLs but splits the root layout/routing rules and makes `/` ambiguous between English and a preference entry point.
- Translate only on the client or use cookies on unchanged URLs. This weakens shareability and correct initial language/metadata, or makes page rendering depend on each request.
- Persist Lab state between locale roots. This adds state transfer or storage to a deliberately transient demonstration.

## References

- [Issue #3](https://github.com/hoon11/jha-portfolio/issues/3)
- [Verified production baseline](https://github.com/hoon11/jha-portfolio/issues/2#issuecomment-5948168773)
- [ADR-0003](0003-keep-api-rescue-lab-browser-local-and-deterministic.md)
- [ADR-0004](0004-separate-public-artifacts-from-private-working-material.md)
- [Design specification](../DESIGN.md)
