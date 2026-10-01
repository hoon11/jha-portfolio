import type { Metadata } from "next";
import { portfolio } from "../../content/portfolio";

export const metadata: Metadata = {
  title: "Professional Experience | J. Ha",
  description: "Professional employment history in frontend engineering, application development, maintenance, and debugging.",
};

export default function WorkPage() {
  return <div className="inner-page work-page">
    <header className="page-intro">
      <p className="eyebrow">Professional work</p>
      <h1>Professional Experience</h1>
      <p>Frontend development, application maintenance, and defect investigation across established systems.</p>
    </header>
    <div className="employment-list">
      {portfolio.employment.map((employment, index) => <section className="content-panel employment-panel" key={employment.company} aria-labelledby={`employer-${index}`}>
        <div className="employment-heading">
          <div>
            <h2 id={`employer-${index}`}>{employment.company}</h2>
            <p className="employment-role">{employment.role}</p>
          </div>
          <p className="employment-dates"><span>Employment</span>{employment.dates}</p>
        </div>
        <div className="selected-work">
          <h3>Selected Work</h3>
          <ul className="work-list">
            {employment.selectedWork.map((work) => <li key={work.title}>
              <div className="work-item-heading">
                <h4>{work.title}</h4>
                {work.projectDates && <p className="work-dates"><span>Project</span>{work.projectDates}</p>}
              </div>
              <p className="work-description">{work.description}</p>
              {work.technologies && <p className="technology-list">{work.technologies}</p>}
            </li>)}
          </ul>
        </div>
      </section>)}
    </div>
  </div>;
}
