import Link from "next/link";
type Props = {
  title: string;
  technologies: string;
  href: string;
  summary: string;
  overline: string;
  openProject: string;
};

export default function LabProjectCard({ title, technologies, href, summary, overline, openProject }: Props) {

  return <article className="project-card">
    <div className="project-icon" aria-hidden="true"><span className="flask">◈</span></div>
    <div className="project-content">
      <p className="card-overline">{overline}</p>
      <h3>{title}</h3>
      <p>{summary}</p>
      <p className="technology-list">{technologies}</p>
    </div>
    <Link className="button button-primary project-link" href={href}>{openProject} <span aria-hidden="true">↗</span></Link>
  </article>;
}
