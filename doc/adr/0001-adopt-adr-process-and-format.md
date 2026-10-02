# ADR-0001: Adopt ADR process and format

## Status

Accepted

## Date

2026-10-02

## Context

This small public portfolio has a current design specification, release checklist, code, and GitHub issues. Those sources show what to build and verify, but the reasons behind a lasting engineering choice can disappear as the implementation changes. A record for every task would add more upkeep than value.

## Decision

Keep numbered Architecture Decision Records in `doc/adr/`, named `NNNN-descriptive-title.md`. Use the status, date, and sections in [TEMPLATE.md](TEMPLATE.md). Dates use ISO `YYYY-MM-DD`. List records and their current status in the [ADR index](README.md).

Create an ADR when a durable architectural or repository-wide decision has a meaningful trade-off, constrains later work, or protects an important security, privacy, or reliability boundary. The reason must be hard to recover from code alone, and accidental reversal must matter. Prefer one record for a decision that affects several features or future tasks.

Do not create an ADR for routine implementation, ordinary bug fixes, minor UI work, temporary debugging, trivial dependency updates, low-impact naming, issue progress, or a choice already explained well by an existing ADR. A change to the current design specification does not by itself require an ADR.

Use these status meanings:

- **Proposed:** The choice is unresolved. Implementation must not treat it as settled without an explicit decision.
- **Accepted:** The current architectural decision.
- **Superseded:** A later ADR replaced this decision. Keep the old record and name the replacement ADR in its status.
- **Deprecated:** The decision no longer applies or is no longer recommended, with no direct replacement.

Accepted ADRs preserve the reasoning at the time of decision. Correct a typo or fact, repair a link, add a reference, or clarify wording without changing the choice. For a material change, write a new ADR, explain the new context, mark the old one Superseded, and link both directions. Do not rewrite the old rationale to match new code.

Before architectural or repository-wide work, read the current specification, the index, and relevant ADRs. During work, check whether a new durable decision emerged or an Accepted ADR conflicts with the implementation. Resolve a conflict by conforming the work to the ADR or by superseding the decision. Record a settled new decision as Accepted when it meets the ADR threshold. Record an unresolved choice as Proposed only when its alternatives are useful to preserve. After work, check for new decisions, changed assumptions, and needed supersession. When none apply, leave the ADRs alone. ADR maintenance is event-driven, not a gate on every issue or commit.

Keep each source responsible for one kind of information:

| Source | Responsibility |
| --- | --- |
| GitHub issue | Specific outcome, scope, Definition of Done, dependencies, and closure evidence. |
| Commit or PR | Exact change and review history. |
| `DESIGN.md` | Current intended behavior and information architecture. |
| `PRODUCTION_CHECKLIST.md` | Reusable production verification procedure. |
| ADR | Lasting choice, rationale, trade-offs, alternatives, and historical context. |
| `README.md` | Public overview, setup, and links to deeper documentation. |
| `AGENTS.md` | Short operational instructions and pointers for agents. |

Update `DESIGN.md` when intended current behavior changes. Add or supersede an ADR when the underlying architectural decision changes. A local implementation change may need neither document updated.

## Consequences

Future maintainers and agents can find the reasoning behind important constraints without reconstructing it from commits. The index and agent guidance add a small maintenance obligation. An Accepted record may become stale if a later change ignores the impact check, so changes must address a real conflict rather than silently leaving contradictory records.

## Alternatives considered

- Keep all rationale in `DESIGN.md`. This would mix historical choices with the current specification and make supersession unclear.
- Require an ADR for every issue or design edit. Most changes do not introduce a durable decision, so this would create noise.
- Rely on code and Git history alone. They show the outcome but often leave rejected alternatives and trade-offs unclear.

## References

- [ADR index](README.md)
- [ADR template](TEMPLATE.md)
- [Current design specification](../DESIGN.md)
- [Production verification checklist](../PRODUCTION_CHECKLIST.md)
- [Repository overview](../../README.md)
