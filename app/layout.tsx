import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteNavigation from "../components/site-navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "J. Ha | Frontend Engineer",
  description: "Frontend engineer focused on reliable web applications. React, TypeScript, API integration, and existing application maintenance.",
  openGraph: {
    title: "J. Ha | Frontend Engineer",
    description: "Selected frontend experience and API Rescue Lab, a local demonstration of response validation, timeout handling, and recovery.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="site-frame">
      <div className="frame-chrome" aria-hidden="true"><span className="chrome-dots"><i /><i /><i /></span><span>J. Ha / Portfolio</span></div>
      <SiteNavigation />
      <div className="page-shell">
        <main id="main" tabIndex={-1}>{children}</main>
        <footer className="site-footer"><span>J. Ha · Frontend Engineer</span><a href="#main">Back to top ↑</a></footer>
      </div>
    </div>
  </body></html>;
}
