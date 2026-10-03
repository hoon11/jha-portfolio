import Link from "next/link";
import { notFound } from "next/navigation";
import ApiRescueLab from "../../../../components/api-rescue-lab";
import { labMessages } from "../../../../content/lab-messages";
import { getMessages } from "../../../../content/messages";
import { portfolio } from "../../../../content/portfolio";
import { isLocale, localizedPath, pageMetadata } from "../../../../lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getMessages(locale);
  return pageMetadata(locale, "/lab/api-rescue-lab", messages.metadata.detail);
}

export default async function ApiRescueLabPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { detail } = await getMessages(locale);
  const evidenceLinks = [
    { label: detail.evidence.uiSource, path: "components/api-rescue-lab.tsx" },
    { label: detail.evidence.logicSource, path: "lib/rescue-lab.ts" },
    { label: detail.evidence.componentTests, path: "components/api-rescue-lab.test.tsx" },
    { label: detail.evidence.reducerTests, path: "lib/rescue-lab.test.ts" },
  ];

  return <div className="inner-page lab-detail">
    <Link className="back-link" href={localizedPath(locale, "/lab")}><span aria-hidden="true">←</span> {detail.back}</Link>
    <header className="page-intro detail-intro"><p className="eyebrow">{detail.eyebrow}</p><h1>{portfolio.labProject.title}</h1><p>{detail.introduction}</p><p className="detail-instruction">{detail.instruction}</p></header>
    <section className="content-panel lab-detail-panel" aria-label={detail.simulation}>
      <h2 className="sr-only">{detail.simulator}</h2>
      <ApiRescueLab messages={labMessages[locale]} />
      <div className="detail-explanation">
        <div><h2>{detail.demonstrates}</h2><ul className="demonstration-list">{detail.demonstrations.map((text) => <li key={text}>{text}</li>)}</ul></div>
        <div className="detail-aside"><h2>{detail.stepsTitle}</h2><ol>{detail.steps.map((text) => <li key={text}>{text}</li>)}</ol><p>{detail.retry}</p></div>
      </div>
      <section className="implementation-evidence" aria-labelledby="implementation-evidence-title">
        <h2 id="implementation-evidence-title">{detail.evidence.title}</h2>
        <p>{detail.evidence.observable}</p><p>{detail.evidence.tested}</p>
        <ul>{evidenceLinks.map(({ label, path }) => <li key={path}>
          <a href={`https://github.com/hoon11/jha-portfolio/blob/main/${path}`}>{label}<code>{path}</code></a>
        </li>)}</ul>
      </section>
    </section>
  </div>;
}
