# ADR-0006: Reduce identity links in the public portfolio

## Status

Accepted

## Date

2026-10-14

## Context

Employer names, exact employment months, direct personal contact links, and links to a personal source repository can connect an initials-only portfolio to a named profile. The portfolio needs to explain the work an engineer can do while sharing fewer identity links. Detailed career records remain available through the channel where the portfolio was shared.

## Decision

Limit the current public fact source to role, broad year span, work relationships, and approved technical experience. Use stable employment IDs and translated work-context labels instead of employer names. Do not retain private employer names or exact months in a public object merely to hide them when rendering.

Keep concrete frontend implementation examples and qualitative results. Omit the named low-code platform and unnecessary project-scale details. Keep employment and project year spans distinct and do not invent dates or impact figures.

Remove personal email, named-profile links, and personal repository links from rendered pages and their current public data. Keep the Contact anchor with an instruction to use the channel where the portfolio was shared. The Lab remains an interactive local simulation, with its behavior and test scope explained without outbound personal repository links.

This narrows the approved public content under ADR-0004. ADR-0005 continues to own static locale routes and shared public facts. Exact private records remain local. LinkedIn and Upwork are separate account outputs and are not changed by this decision.

Do not describe this as anonymity. Existing public history, the site address, and profiles that already link to the portfolio can still associate the site with its owner. This decision does not rewrite Git history or change account visibility, access, or deployment domains.

## Consequences

Visitors can inspect relevant work examples without direct personal contact links or named employers. Broad year spans provide less chronology detail, and readers must request detailed records or contact through their existing communication channel. Public source links no longer provide a direct route to inspect Lab code.

The public data types and rendered-output checks must prevent the removed fields and links from returning accidentally. Release checks still review source, generated output, and publication scope.

## Alternatives considered

- Keep exact records and conceal identity fields in the UI. Public source and serialized data would still carry the fields.
- Keep personal profile or repository links with generic labels. The destination URL would still reveal the account.
- Remove all professional examples. This would reduce the portfolio's usefulness without erasing prior disclosures.

## References

- [ADR-0004](0004-separate-public-artifacts-from-private-working-material.md)
- [ADR-0005](0005-use-static-locale-routes-and-shared-public-facts.md)
- [Current design specification](../DESIGN.md)
- [Production verification checklist](../PRODUCTION_CHECKLIST.md)
