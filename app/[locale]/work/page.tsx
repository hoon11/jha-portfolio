import { notFound } from "next/navigation";
import { getMessages } from "../../../content/messages";
import { getPortfolio } from "../../../content/portfolio";
import { isLocale, pageMetadata } from "../../../lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getMessages(locale);
  return pageMetadata(locale, "/work", messages.metadata.work);
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getMessages(locale);
  const { employment } = getPortfolio(messages, locale);

  return <div className="inner-page work-page">
    <header className="page-intro">
      <p className="eyebrow">{messages.work.eyebrow}</p>
      <h1>{messages.work.title}</h1>
      <p>{messages.work.introduction}</p>
    </header>
    <div className="employment-list">
      {employment.map((job, index) => <section className="content-panel employment-panel" key={job.company} aria-labelledby={`employer-${index}`}>
        <div className="employment-heading">
          <div><h2 id={`employer-${index}`}>{job.company}</h2><p className="employment-role">{job.role}</p></div>
          <p className="employment-dates"><span>{messages.work.employment}</span>{job.dates}</p>
        </div>
        <div className="selected-work">
          <h3>{messages.work.selectedWork}</h3>
          <ul className="work-list">
            {job.selectedWork.map((work) => <li key={work.id}>
              <div className="work-item-heading"><h4>{work.title}</h4>{work.projectDates && <p className="work-dates"><span>{messages.work.project}</span>{work.projectDates}</p>}</div>
              <p className="work-description">{work.description}</p>
              {work.technologies && <p className="technology-list">{work.technologies}</p>}
            </li>)}
          </ul>
        </div>
      </section>)}
    </div>
  </div>;
}
