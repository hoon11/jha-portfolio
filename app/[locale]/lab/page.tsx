import { notFound } from "next/navigation";
import LabProjectCard from "../../../components/lab-project-card";
import { getMessages } from "../../../content/messages";
import { portfolio } from "../../../content/portfolio";
import { isLocale, localizedPath, pageMetadata } from "../../../lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getMessages(locale);
  return pageMetadata(locale, "/lab", messages.metadata.lab);
}

export default async function LabPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { lab } = await getMessages(locale);

  return <div className="inner-page">
    <header className="page-intro"><p className="eyebrow">{lab.eyebrow}</p><h1>{lab.title}</h1><p>{lab.introduction}</p></header>
    <section className="content-panel" aria-labelledby="projects-title"><h2 id="projects-title" className="sr-only">{lab.projects}</h2><LabProjectCard title={portfolio.labProject.title} technologies={portfolio.labProject.technologies} href={localizedPath(locale, "/lab/api-rescue-lab")} summary={lab.indexSummary} overline={lab.cardOverline} openProject={lab.openProject} /></section>
  </div>;
}
