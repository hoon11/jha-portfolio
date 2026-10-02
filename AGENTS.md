<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repository decisions

Before architectural or repository-wide changes, read the current [design specification](doc/DESIGN.md), the [ADR index](doc/adr/README.md), and relevant records. Treat Accepted ADRs as current constraints. If work introduces a durable decision, use Proposed while unresolved or Accepted when settled. If an Accepted decision changes, supersede it under [ADR-0001](doc/adr/0001-adopt-adr-process-and-format.md). Skip ADRs for routine implementation details.

## Autonomy

Do not ask again for an action the user's current request already authorizes. Complete reversible, in-scope work, including repository inspection, scoped edits and small fixes, documentation, tests, typecheck, lint, builds, safe verification, temporary fixtures and cleanup, and non-destructive Git checks. Follow Accepted ADRs. Choose the smallest reasonable reversible option consistent with `doc/DESIGN.md` and those ADRs, then report the choice.

Ask only when a material ambiguity cannot be resolved from the repository. Before destructive or hard-to-reverse work, substantial deletion, Git history rewrites or force pushes, visibility, credential or access changes, monetary costs, or external/public actions such as messages, publishing, and deployments, check explicit authorization and applicable approval gates. Stop if either is missing. Do not commit or push when the user forbids them.
