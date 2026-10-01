import type { Metadata } from "next";
import Link from "next/link";
import ApiRescueLab from "../../../components/api-rescue-lab";

export const metadata: Metadata = { title: "API Rescue Lab | J. Ha", description: "A local sample-task simulation showing how a frontend stays useful when responses are slow, fail, or contain invalid data." };

export default function ApiRescueLabPage() {
  return <div className="inner-page lab-detail">
    <Link className="back-link" href="/lab"><span aria-hidden="true">←</span> Back to Lab</Link>
    <header className="page-intro detail-intro"><p className="eyebrow">Personal project · Local simulation / sample data</p><h1>API Rescue Lab</h1><p>When a response is slow, fails, or contains bad data, users still need a clear status and any valid tasks they already loaded. Explore how this local simulation keeps the task view understandable.</p></header>
    <section className="content-panel lab-detail-panel" aria-label="Interactive simulation">
      <div className="detail-explanation">
        <div>
          <h2>What this demonstrates</h2>
          <ul className="demonstration-list">
            <li>Reject malformed task responses through response/schema validation before display.</li>
            <li>Preserve previously loaded valid tasks during failures. If none have loaded, show an empty state.</li>
            <li>Prevent stale request completions from overwriting newer state.</li>
            <li>Explain timeouts and failures, then provide a predictable way to retry or recover.</li>
          </ul>
        </div>
        <div className="detail-aside">
          <h2>Try it in four steps</h2>
          <ol>
            <li>Run Normal to load validated sample tasks.</li>
            <li>Run Invalid data or Server error. Notice the status and retained tasks.</li>
            <li>Run Slow. Its 4-second response reaches a 2-second timeout.</li>
            <li>Select Normal and run again to recover.</li>
          </ol>
          <p>Retry repeats the selected failure condition.</p>
        </div>
      </div>
      <ApiRescueLab />
    </section>
  </div>;
}
