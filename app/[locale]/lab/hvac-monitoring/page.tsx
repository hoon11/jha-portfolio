import Link from "next/link";
import { notFound } from "next/navigation";
import HvacLanding from "../../../../components/hvac-landing";
import ProjectDocuments from "../../../../components/project-documents";
import { hvacMessages } from "../../../../content/hvac-messages";
import { isLocale, localizedPath, pageMetadata } from "../../../../lib/i18n";

type Props = { params: Promise<{ locale: string }> };
type Document = ReturnType<typeof hvacMessages>["documents"]["requirements"];

function DocumentContent({ document }: { document: Document }) {
  return <><h2>{document.title}</h2>{document.sections.map((section) => <section className="project-document-section" key={section.title}><h3>{section.title}</h3>{section.paragraphs?.map((text) => <p key={text}>{text}</p>)}{section.items && <ul>{section.items.map((text) => <li key={text}>{text}</li>)}</ul>}</section>)}</>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = hvacMessages(locale);
  return pageMetadata(locale, "/lab/hvac-monitoring", { title: `${copy.title} | J. H.`, description: copy.summary });
}

export default async function HvacPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = hvacMessages(locale);
  return <div className="inner-page lab-detail hvac-project"><Link className="back-link" href={localizedPath(locale, "/lab")}>← Lab</Link><header className="page-intro detail-intro"><p className="eyebrow">CONCEPT PROJECT</p><h1>{copy.title}</h1><p>{copy.summary}</p></header><div className="content-panel"><ProjectDocuments label={copy.tabsLabel} tabs={[
    { id: "demo", label: copy.tabs.demo, content: <HvacLanding locale={locale} /> },
    { id: "requirements", label: copy.tabs.requirements, content: <DocumentContent document={copy.documents.requirements} /> },
    { id: "design", label: copy.tabs.design, content: <DocumentContent document={copy.documents.design} /> },
    { id: "test-design", label: copy.tabs.testDesign, content: <DocumentContent document={copy.documents.testDesign} /> },
  ]} /></div></div>;
}
