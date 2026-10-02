# ADR-0004: Separate public artifacts from private working material

## Status

Accepted

## Date

2026-10-02

## Context

This portfolio repository is public. Preparing accurate career copy and reviewing the site can involve private source notes and local captures. Once private material enters public Git history or a deployment, removing it from the current files may not undo the disclosure. Ignore rules and hooks help, but they do not make publication safe by themselves.

## Decision

Track only approved public portfolio content and public-safe documentation. Keep private career context, review captures, credentials, and local working artifacts out of Git history and deployment inputs. Review public copy and release artifacts before publication. The current path exclusions and staged-file checks live in [`.gitignore`](../../.gitignore), [`.vercelignore`](../../.vercelignore), and the [staged-content checker](../../scripts/check-staged.mjs); this ADR does not duplicate their patterns.

Future agents must use private context only to check public accuracy. They must not copy private notes into ADRs, issues, commits, screenshots, or deployed content. A proposed change to this boundary requires explicit review because disclosure may be irreversible.

## Consequences

The public repository can show the portfolio's design and implementation without publishing private working material. The checks reduce accidental staging and deployment exposure. Some context remains local and is less portable to another machine or agent. Maintainers still need to inspect staged content and deployment output because ignore rules and pattern scans are incomplete safeguards.

## Alternatives considered

- Track private notes and exclude them only from deployment. Public Git history would still expose them.
- Keep all design and review documentation outside the repository. This would also hide public-safe engineering context that future maintainers need.
- Rely only on ignore rules or secret patterns. They cannot detect every sensitive claim or prevent disclosure from an already tracked file.

## References

- [ADR-0001: ADR process](0001-adopt-adr-process-and-format.md)
- [Current design specification](../DESIGN.md)
- [Repository publishing guidance](../../README.md)
- [Production privacy checks](../PRODUCTION_CHECKLIST.md)
- [Git exclusions](../../.gitignore)
- [Deployment exclusions](../../.vercelignore)
