import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import SiteNavigation from "../../components/site-navigation";
import { getMessages } from "../../content/messages";
import { navigationMessages } from "../../content/navigation";
import { isLocale, locales } from "../../lib/i18n";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export default async function LocaleLayout({ children, params }: {
  children: ReactNode; params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { shell } = await getMessages(locale);
  return <html lang={locale}><body>
    <a className="skip-link" href="#main">{shell.skip}</a>
    <div className="site-frame">
      <div className="frame-chrome" aria-hidden="true"><span className="chrome-dots"><i /><i /><i /></span><span>{shell.portfolio}</span></div>
      <SiteNavigation locale={locale} messages={navigationMessages[locale]} />
      <div className="page-shell">
        <main id="main" tabIndex={-1}>{children}</main>
        <footer className="site-footer"><span>{shell.footer}</span><a href="#main">{shell.backToTop} ↑</a></footer>
      </div>
    </div>
  </body></html>;
}
