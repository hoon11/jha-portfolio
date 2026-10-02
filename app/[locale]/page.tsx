import Link from "next/link";
import { notFound } from "next/navigation";
import ExperienceCard from "../../components/experience-card";
import LabProjectCard from "../../components/lab-project-card";
import { getMessages } from "../../content/messages";
import { getPortfolio, portfolio } from "../../content/portfolio";
import { isLocale, localizedPath, pageMetadata } from "../../lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getMessages(locale);
  return pageMetadata(locale, "/", messages.metadata.home);
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getMessages(locale);
  const home = messages.home;
  const { experience } = getPortfolio(messages, locale);
  const skills = [
    { title: home.skills.frontend, items: portfolio.frontendSkills },
    { title: home.skills.integration, items: portfolio.integrationSkills },
    { title: home.skills.practice, items: home.skills.practiceItems },
  ];

  return <>
    <section className="hero-panel" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{home.greeting}</p>
        <h1 id="hero-title">{home.headline}</h1>
        <p className="hero-introduction">{home.introduction}</p>
        <div className="hero-actions">
          <Link className="button button-primary" href={localizedPath(locale, "/work")}>{home.viewWork} <span aria-hidden="true">↗</span></Link>
          <Link className="button button-outline" href={localizedPath(locale, "/lab")}>{home.exploreLab} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true"><img src="/hero-studio.svg" alt="" width="720" height="520" /></div>
    </section>

    <section className="content-panel" aria-labelledby="experience-title">
      <div className="section-heading"><div><p className="eyebrow">{home.workEyebrow}</p><h2 id="experience-title">{home.experienceTitle}</h2></div><Link className="section-link" href={localizedPath(locale, "/work")}>{home.allWork} <span aria-hidden="true">↗</span></Link></div>
      <div className="experience-grid">{experience.map((item, index) => <ExperienceCard key={item.id} experience={item} number={index + 1} />)}</div>
    </section>

    <section className="content-panel" aria-labelledby="featured-lab-title">
      <div className="section-heading"><div><p className="eyebrow">{home.labEyebrow}</p><h2 id="featured-lab-title">{home.labTitle}</h2></div><Link className="section-link" href={localizedPath(locale, "/lab")}>{home.viewLab} <span aria-hidden="true">↗</span></Link></div>
      <LabProjectCard title={portfolio.labProject.title} technologies={portfolio.labProject.technologies} href={localizedPath(locale, "/lab/api-rescue-lab")} summary={messages.lab.homeSummary} overline={messages.lab.cardOverline} openProject={messages.lab.openProject} />
    </section>

    <section id="about" className="content-panel about-panel" aria-labelledby="about-title">
      <div className="section-heading"><div><p className="eyebrow">{home.aboutEyebrow}</p><h2 id="about-title">{home.aboutTitle}</h2></div></div>
      <div className="about-grid"><div className="about-copy"><p>{home.about}</p><p>{home.portfolioStack}</p></div><dl className="skills">{skills.map((skill) => <div key={skill.title}><dt>{skill.title}</dt><dd>{skill.items}</dd></div>)}</dl></div>
      <div className="workflow-block"><h3>{home.workflowTitle}</h3><ol className="workflow">{home.workflow.map((step, index) => <li key={step.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h4>{step.title}</h4><p>{step.text}</p></li>)}</ol></div>
    </section>

    <section id="contact" className="contact-panel" aria-labelledby="contact-title">
      <div><p className="eyebrow">{home.contactEyebrow}</p><h2 id="contact-title">{home.contactTitle}</h2><p>{home.contactText}</p></div>
      <div className="contact-links"><a className="button button-primary" href={"mailto:" + portfolio.email}>{home.email} <span aria-hidden="true">↗</span></a><a className="button button-outline" href={portfolio.linkedIn}>LinkedIn <span aria-hidden="true">↗</span></a></div>
    </section>
  </>;
}
