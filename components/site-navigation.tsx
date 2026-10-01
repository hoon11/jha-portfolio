"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "/", key: "home" },
  { label: "Work", href: "/work", key: "work" },
  { label: "Lab", href: "/lab", key: "lab" },
  { label: "About", href: "/#about", key: "about" },
  { label: "Contact", href: "/#contact", key: "contact" },
] as const;

type NavKey = (typeof links)[number]["key"];
type HomeSection = "home" | "about" | "contact";

export default function SiteNavigation() {
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

  const active: NavKey = pathname === "/work" ? "work" : pathname.startsWith("/lab") ? "lab" : homeSection;

  return <header className="site-header">
    <div className="brand-row">
      <Link className="wordmark" href="/" onClick={() => { setOpen(false); setHomeSection("home"); }}>J. Ha<span>Frontend Engineer</span></Link>
      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-controls="site-navigation-links"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      ><span aria-hidden="true" className="menu-icon"><i /><i /><i /></span></button>
    </div>
    <nav id="site-navigation-links" className="site-navigation" aria-label="Main navigation" data-open={open}>
      {links.map((link) => <Link
        key={link.key}
        href={link.href}
        aria-current={active === link.key ? (link.key === "about" || link.key === "contact" || pathname === "/lab/api-rescue-lab" ? "location" : "page") : undefined}
        onClick={() => {
          setOpen(false);
          if (link.key === "about" || link.key === "contact" || link.key === "home") setHomeSection(link.key);
        }}
      >{link.label}</Link>)}
    </nav>
    <div className="sidebar-note" aria-hidden="true">
      <span className="sidebar-note-title">Approach</span>
      <span>Understand · Reproduce · Fix · Verify</span>
    </div>
  </header>;
}
