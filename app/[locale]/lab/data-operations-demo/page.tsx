import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectDocuments from "../../../../components/project-documents";
import DataOperationsDemo from "../../../../components/data-operations-demo";
import { dataOperationsMessages, type ProjectDocument } from "../../../../content/data-operations-messages";
import { isLocale, localizedPath, pageMetadata } from "../../../../lib/i18n";

type Props = { params: Promise<{ locale: string }> };

function Document({ document }: { document: ProjectDocument }) {
  return <><h2>{document.title}</h2>{document.sections.map((section) => <section className="project-document-section" key={section.title}>
    <h3>{section.title}</h3>
    {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
    {section.items && <ul>{section.items.map((text) => <li key={text}>{text}</li>)}</ul>}
  </section>)}</>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = dataOperationsMessages[locale];
  return pageMetadata(locale, "/lab/data-operations-demo", { title: `${copy.title} | J. Ha`, description: copy.summary });
}

export default async function DataOperationsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = dataOperationsMessages[locale];
  return <div className="inner-page lab-detail">
    <Link className="back-link" href={localizedPath(locale, "/lab")}>← {copy.back}</Link>
    <header className="page-intro detail-intro"><p className="eyebrow">{copy.status}</p><h1>{copy.title}</h1><p>{copy.summary}</p></header>
    <div className="content-panel"><ProjectDocuments label={copy.tabsLabel} tabs={[
      { id: "demo", label: copy.demoLabel, content: <DataOperationsDemo locale={locale} /> },
      { id: "requirements", label: copy.requirementsLabel, content: <Document document={copy.requirements} /> },
      { id: "design", label: copy.designLabel, content: <Document document={copy.design} /> },
      { id: "test-design", label: copy.testDesignLabel, content: <Document document={copy.testDesign} /> },
    ]} /></div>
  </div>;
}
