import { portfolio } from "../content/portfolio";

type Experience = (typeof portfolio.experience)[number];

export default function ExperienceCard({ experience, number }: { experience: Experience; number: number }) {
  return <article className="experience-card">
    <span className="card-number" aria-hidden="true">{String(number).padStart(2, "0")}</span>
    <div className="experience-content">
      <p className="card-overline">{experience.company}</p>
      <h3>{experience.title}</h3>
      <p className="experience-meta">{experience.role} <span aria-hidden="true">·</span> {experience.dates}</p>
      <p className="experience-description">{experience.description}</p>
      <p className="technology-list">{experience.technologies}</p>
    </div>
  </article>;
}
