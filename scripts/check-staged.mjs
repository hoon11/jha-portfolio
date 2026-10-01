import { execFileSync } from "node:child_process";

const prohibitedPaths = [
  [/^doc\/career-context\.md$/i, "private career context"],
  [/^doc\/private(?:\/|$)/i, "private document"],
  [/^doc\/review(?:\/|$)/i, "local review artifact"],
  [/^doc\/ui\/(?!README\.md$)/i, "local UI reference asset"],
  [/(?:^|\/)\.env(?:\..*)?$/i, "environment file"],
  [/(?:^|\/)node_modules(?:\/|$)/i, "installed dependency"],
  [/^\.next(?:\/|$)/i, "Next.js build output"],
  [/^out(?:\/|$)/i, "export output"],
  [/^coverage(?:\/|$)/i, "coverage output"],
  [/^\.work(?:\/|$)/i, "local work artifact"],
  [/^artifacts(?:\/|$)/i, "local artifact"],
  [/^\.vercel(?:\/|$)/i, "local deployment artifact"],
  [/\.tsbuildinfo$/i, "TypeScript build output"],
  [/(?:^|\/)\.DS_Store$/i, "local system file"],
];

const credentialPatterns = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/i, "private key"],
  [/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/, "cloud access key"],
  [/\b(?:gh[pousr]_[A-Za-z0-9]{24,}|github_pat_[A-Za-z0-9_]{40,})\b/, "GitHub token"],
  [/\b(?:sk|rk)_live_[A-Za-z0-9]{16,}\b|\bsk-[A-Za-z0-9_-]{24,}\b/, "API key"],
  [/\bBearer [A-Za-z0-9._~+/-]{20,}\b/i, "bearer token"],
];

const assignedCredential = /(?:^|[\s{,])["']?((?:[A-Z][A-Z0-9]*_)*(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password|secret)|apiKey|accessToken|authToken|clientSecret)["']?\s*[:=]\s*(["'`])([^\s"'`]{6,})\2/gi;
const placeholder = /^(?:example|sample|dummy|fake|placeholder|redacted|changeme|change-me|your[-_]|test[-_]|\$\{|<)/i;

function git(args, options = {}) {
  return execFileSync("git", args, {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

const failures = [];

try {
  git(["diff", "--cached", "--check"], { encoding: "utf8" });
} catch (error) {
  const locations = String(error.stdout || "")
    .split(/\r?\n/)
    .flatMap((line) => {
      const match = line.match(/^(.+?):(\d+):/);
      return match ? [`${JSON.stringify(match[1])}:${match[2]}`] : [];
    });
  failures.push(`whitespace check failed (git diff --cached --check): ${locations.length ? [...new Set(locations)].join(", ") : "inspect staged files"}`);
}

let stagedPaths;
try {
  stagedPaths = git(["diff", "--cached", "--name-only", "-z", "--no-renames", "--diff-filter=ACMRT"])
    .toString("utf8")
    .split("\0")
    .filter(Boolean);
} catch (error) {
  console.error("pre-commit: cannot list staged files:", error.message);
  process.exit(1);
}

for (const path of stagedPaths) {
  const prohibited = prohibitedPaths.find(([pattern]) => pattern.test(path));
  if (prohibited) {
    failures.push(`prohibited staged file (${prohibited[1]}): ${JSON.stringify(path)}`);
    continue;
  }

  let blob;
  try {
    blob = git(["show", `:${path}`]);
  } catch {
    failures.push(`cannot read staged content: ${JSON.stringify(path)}`);
    continue;
  }

  if (blob.includes(0)) continue;
  const content = blob.toString("utf8");
  if (!Buffer.from(content, "utf8").equals(blob)) continue;

  for (const [index, line] of content.split("\n").entries()) {
    for (const [pattern, label] of credentialPatterns) {
      if (pattern.test(line)) {
        failures.push(`credential scan (${label}): ${JSON.stringify(path)}:${index + 1}`);
      }
    }

    assignedCredential.lastIndex = 0;
    for (const match of line.matchAll(assignedCredential)) {
      if (!placeholder.test(match[3])) {
        failures.push(`credential scan (${match[1]} assignment): ${JSON.stringify(path)}:${index + 1}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error("pre-commit: commit blocked.\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("pre-commit: staged content checks passed.");
