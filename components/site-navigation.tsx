"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavigationMessages } from "../content/navigation";
import { isLocale, languageSwitchUrl, localePreferenceCookie, localizedPath, sitePathFromLocalized, type Locale } from "../lib/i18n";

const links = [
  { path: "/", hash: "", key: "home" },
  { path: "/work", hash: "", key: "work" },
  { path: "/lab", hash: "", key: "lab" },
  { path: "/", hash: "#about", key: "about" },
  { path: "/", hash: "#contact", key: "contact" },
] as const;

type NavKey = (typeof links)[number]["key"];
type HomeSection = "home" | "about" | "contact";

export default function SiteNavigation({ locale, messages }: { locale: Locale; messages: NavigationMessages }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [homeSection, setHomeSection] = useState<HomeSection>("home");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateSection = () => {
      const hash = window.location.hash;
      setHomeSection(hash === "#about" ? "about" : hash === "#contact" ? "contact" : "home");
    };
    updateSection();
    window.addEventListener("hashchange", updateSection);
    return () => window.removeEventListener("hashchange", updateSection);
  }, [pathname]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeAtDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  const path = sitePathFromLocalized(pathname);
  const active: NavKey = path === "/work" ? "work" : path?.startsWith("/lab") ? "lab" : homeSection;

  function changeLanguage(value: string) {
    if (!isLocale(value) || value === locale) return;
    try { document.cookie = localePreferenceCookie(value, window.location.protocol === "https:"); } catch { /* Language URLs also work without preference storage. */ }
    window.location.assign(languageSwitchUrl({ pathname, search: window.location.search, hash: window.location.hash, locale: value }));
  }

  return <header className="site-header">
    <div className="brand-row">
      <Link className="wordmark" href={localizedPath(locale)} onClick={() => { setOpen(false); setHomeSection("home"); }}>J. Ha<span>{messages.profession}</span></Link>
      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        aria-label={open ? messages.close : messages.open}
        aria-controls="site-navigation-links"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      ><span aria-hidden="true" className="menu-icon"><i /><i /><i /></span></button>
    </div>
    <nav id="site-navigation-links" className="site-navigation" aria-label={messages.main} data-open={open}>
      {links.map((link) => <Link
        key={link.key}
        href={localizedPath(locale, link.path) + link.hash}
        aria-current={active === link.key ? (link.key === "about" || link.key === "contact" || path === "/lab/api-rescue-lab" ? "location" : "page") : undefined}
        onClick={() => {
          setOpen(false);
          if (link.key === "about" || link.key === "contact" || link.key === "home") setHomeSection(link.key);
        }}
      >{messages[link.key]}</Link>)}
    </nav>
    <label className="language-selector"><span>{messages.language}</span><select value={locale} onChange={(event) => changeLanguage(event.target.value)}>
      <option value="en" lang="en">English</option><option value="ja" lang="ja">日本語</option><option value="ko" lang="ko">한국어</option>
    </select></label>
    <div className="sidebar-note" aria-hidden="true">
      <span className="sidebar-note-title">{messages.approach}</span>
      <span>{messages.steps}</span>
    </div>
  </header>;
}
