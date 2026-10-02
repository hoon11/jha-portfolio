# ADR-0002: Adopt issue lifecycle and verification policy

## Status

Accepted

## Date

2026-10-02

## Context

GitHub issues for this small portfolio should preserve the work contract and enough evidence to explain closure. A commit can finish implementation while the visitor-facing result or production deployment remains unverified. One exhaustive checklist for every issue would obscure the checks that matter.

## Decision

Use one lifecycle: **Open → Work → Verify → Close**. Select verification according to the change.

**Open.** State the desired outcome, scope, a small set of observable Definition of Done criteria, meaningful dependencies, and whether production verification applies. Link reusable procedures instead of copying them into the issue.

**Work.** Comment when an architectural or design decision, finding, dependency, scope change, blocker, or important deviation changes the work contract. Keep the issue body aligned with the agreed scope. Skip routine progress comments, command-by-command logs, repeated checklists, screenshots without a specific finding, and private diagnostic information.

**Verify.** Identify the commit being checked. For documentation-only work, review accuracy and relevant links; no production deployment is needed. For maintenance and security work, assess the advisory or defect, run targeted regression checks, and run tests, typecheck, and build where applicable. For a user-facing feature, check its intended behavior and applicable automated checks, then verify production when live behavior is affected. For deployment or release work, observe the deployed site; a successful deployment status alone is insufficient. Use the [production checklist](../PRODUCTION_CHECKLIST.md) as the reusable procedure. Run its full applicable scope for the first public release and affected sections for later changes unless a full pass is justified.

Production evidence identifies the URL, deployed commit, date, relevant browsers or environments, and a concise result. Record why a checklist section does not apply when that might otherwise be unclear.

**Close.** Close as completed only after the in-scope Definition of Done and required verification pass with no unresolved blocker. Leave a short result and evidence comment that links the commit or PR, names the checked commit and checks, records production evidence when applicable, and links meaningful follow-ups. A comment can use `Result`, `Verified`, and `Follow-ups` as short prompts; omit fields that do not apply.

An unmet Definition of Done item, broken core behavior, security or privacy exposure, or release-blocking regression blocks closure. Create a linked follow-up only for a concrete, actionable finding outside scope that is worth tracking. Do not create issues for speculative possibilities. If work is cancelled or superseded, explain why, identify any work already landed, link a replacement when one exists, and close it as not planned or superseded as appropriate.

When production verification remains after implementation, use a plain reference such as `Refs #N` rather than `Closes #N` or `Fixes #N`. Avoid linking a PR through GitHub's automatic closing mechanism until all closure conditions are met. Close manually after the required evidence is recorded.

## Consequences

Issues have clearer completion criteria and a short, auditable result. Verification effort follows the effect of the change. Some issues remain open after implementation until production checks finish. The maintainer must keep comments concise and decide whether a finding is a blocker or a separate task.

## Alternatives considered

- No shared lifecycle. Closure would continue to depend on an unstated interpretation of "done."
- Apply the full release checklist to every issue. Documentation and small maintenance tasks would carry unrelated work.
- Maintain separate lifecycle rules for every issue type. Mixed work would need exceptions and duplicate the common steps.

## References

- [Current design specification](../DESIGN.md)
- [Production verification checklist](../PRODUCTION_CHECKLIST.md)
- [Issue #1: Next.js security patch](https://github.com/hoon11/jha-portfolio/issues/1)
- [Issue #2: Vercel production verification](https://github.com/hoon11/jha-portfolio/issues/2)
- [Issue #3: multilingual support](https://github.com/hoon11/jha-portfolio/issues/3)
- [GitHub PR and issue linking behavior](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)
