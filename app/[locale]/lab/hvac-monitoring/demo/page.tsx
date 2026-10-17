import Link from "next/link";
import { notFound } from "next/navigation";
import HvacMonitoringDemo from "../../../../../components/hvac-monitoring-demo";
import { hvacMessages } from "../../../../../content/hvac-messages";
import { isLocale, localizedPath, pageMetadata } from "../../../../../lib/i18n";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = hvacMessages(locale);
  return pageMetadata(locale, "/lab/hvac-monitoring/demo", { title: `${copy.title} / Demo | J. Ha`, description: copy.sampleNotice });
}
export default async function HvacDemoPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = hvacMessages(locale);
  return <div className="inner-page lab-detail hvac-project"><Link className="back-link" href={localizedPath(locale, "/lab/hvac-monitoring")}>← {copy.backLanding}</Link><header className="page-intro detail-intro"><p className="eyebrow">SAMPLE DEMO</p><h1>{copy.title}</h1><p>{copy.sampleNotice}</p></header><HvacMonitoringDemo locale={locale} /></div>;
}
