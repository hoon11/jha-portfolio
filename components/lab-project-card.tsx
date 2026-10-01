import Link from "next/link";
import { portfolio } from "../content/portfolio";

export default function LabProjectCard({ location }: { location: "home" | "index" }) {
  const project = portfolio.labProject;
  const summary = location === "home" ? project.homeSummary : project.indexSummary;

  return <article className="project-card">
    <div className="project-icon" aria-hidden="true"><span className="flask">◈</span></div>
    <div className="project-content">
      <p className="card-overline">Personal project · Local simulation / sample data</p>
      <h3>{project.title}</h3>
      <p>{summary}</p>
      <p className="technology-list">{project.technologies}</p>
    </div>
    <Link className="button button-primary project-link" href={project.href}>Open project <span aria-hidden="true">↗</span></Link>
  </article>;
}
