# Documentation

| Document | Purpose |
| --- | --- |
| [Project README](../README.md) | Routes, local setup, Git checks, and publishing |
| [Design specification](DESIGN.md) | Current content, visual rules, responsive behavior, and Lab scope |
| [Architecture decisions](adr/README.md) | Durable decisions, their rationale, and status |
| [Production checklist](PRODUCTION_CHECKLIST.md) | Verification after UI changes and production deployments |
| [Data operations design](data-operations-demo/DESIGN.md) | Demo architecture, data flow and chart-library choices |
| [Data operations requirements](data-operations-demo/REQUIREMENTS.md) | Public requirement source and feature-to-test mapping |
| [Data operations test design](data-operations-demo/TEST-DESIGN.md) | Requirement-linked domain, interaction, tab and browser checks |
| [Data operations verification](data-operations-demo/VERIFICATION.md) | Dated test, build and browser observations with limits |
| [Contributor instructions](../AGENTS.md) | Repository workflow and privacy rules |

Update the design specification when intended behavior changes. Record durable decisions through the ADR process. Keep release observations separate from the specification.

## Local working material

Career facts, communication context, research, and review captures are local working material under [ADR-0004](adr/0004-separate-public-artifacts-from-private-working-material.md). They may be absent in another checkout. Read the local sources required by AGENTS.md before career work, and verify changing conditions against the current conversation.

Keep `doc/career-context.md`, everything under `doc/private/`, `doc/review/`, and visual captures under `doc/ui/` excluded from commits and deployment inputs. Current records and dated evidence have different purposes: retain evidence needed to verify or restore earlier changes, and date status reports so old observations are not mistaken for current facts.
