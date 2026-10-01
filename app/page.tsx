import Link from "next/link";
import ExperienceCard from "../components/experience-card";
import LabProjectCard from "../components/lab-project-card";
import { portfolio } from "../content/portfolio";

export default function Home() {
  return <>
    <section className="hero-panel" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Hello, I’m J. Ha · Frontend Engineer</p>
        <h1 id="hero-title">{portfolio.headline}</h1>
        <p className="hero-introduction">{portfolio.introduction}</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/work">View my work <span aria-hidden="true">↗</span></Link>
          <Link className="button button-outline" href="/lab">Explore my Lab <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true"><img src="/hero-studio.svg" alt="" width="720" height="520" /></div>
    </section>

    <section className="content-panel" aria-labelledby="experience-title">
      <div className="section-heading"><div><p className="eyebrow">01 / Professional work</p><h2 id="experience-title">Selected Experience</h2></div><Link className="section-link" href="/work">View all work <span aria-hidden="true">↗</span></Link></div>
      <div className="experience-grid">{portfolio.experience.map((experience, index) => <ExperienceCard key={experience.title} experience={experience} number={index + 1} />)}</div>
    </section>

    <section className="content-panel" aria-labelledby="featured-lab-title">
      <div className="section-heading"><div><p className="eyebrow">02 / Personal project</p><h2 id="featured-lab-title">Featured Lab</h2></div><Link className="section-link" href="/lab">View Lab <span aria-hidden="true">↗</span></Link></div>
      <LabProjectCard location="home" />
    </section>

    <section id="about" className="content-panel about-panel" aria-labelledby="about-title">
      <div className="section-heading"><div><p className="eyebrow">03 / About</p><h2 id="about-title">Frontend focus. Existing-system experience.</h2></div></div>
      <div className="about-grid"><div className="about-copy">
        <p>I am a frontend-centered software engineer with around nine years of professional experience, primarily in Japan. My work includes data-heavy interfaces, monitoring applications, upgrades, and production debugging.</p>
        <p>This portfolio is built with Next.js, React, and TypeScript.</p>
      </div><dl className="skills">{portfolio.skills.map((skill) => <div key={skill.title}><dt>{skill.title}</dt><dd>{skill.items}</dd></div>)}</dl></div>
      <div className="workflow-block"><h3>How I work</h3><ol className="workflow">{portfolio.workflow.map((step, index) => <li key={step.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h4>{step.title}</h4><p>{step.text}</p></li>)}</ol></div>
    </section>

    <section id="contact" className="contact-panel" aria-labelledby="contact-title">
      <div><p className="eyebrow">04 / Contact</p><h2 id="contact-title">Have an application that needs attention?</h2><p>Get in touch about frontend development, maintenance, or a problem in an existing codebase.</p></div>
      <div className="contact-links"><a className="button button-primary" href={"mailto:" + portfolio.email}>Email J. Ha <span aria-hidden="true">↗</span></a><a className="button button-outline" href={portfolio.linkedIn}>LinkedIn <span aria-hidden="true">↗</span></a></div>
    </section>
  </>;
}
