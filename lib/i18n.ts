import type { Metadata } from "next";

export type Locale = "en" | "ja" | "ko";
export const locales: readonly Locale[] = ["en", "ja", "ko"];
export const localeCookieName = "portfolio-locale";
export const sitePaths = ["/", "/work", "/lab", "/lab/api-rescue-lab"] as const;
export type SitePath = (typeof sitePaths)[number];
export const productionOrigin = "https://jha-portfolio-eight.vercel.app";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ja" || value === "ko";
}

export function isSitePath(value: string): value is SitePath {
  return value === "/" || value === "/work" || value === "/lab" || value === "/lab/api-rescue-lab";
}

export function localizedPath(locale: Locale, path: SitePath = "/"): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function sitePathFromLocalized(pathname: string): SitePath | null {
  const [, locale, ...segments] = pathname.split("/");
  if (!isLocale(locale)) return null;
  const suffix = segments.join("/").replace(/\/$/, "");
  const path = suffix ? `/${suffix}` : "/";
  return isSitePath(path) ? path : null;
}

export function languageSwitchUrl({ pathname, search, hash, locale }: {
  pathname: string; search: string; hash: string; locale: Locale;
}): string {
  const path = sitePathFromLocalized(pathname) ?? "/";
  const anchor = path === "/" && (hash === "#about" || hash === "#contact") ? hash : "";
  return `${localizedPath(locale, path)}${search}${anchor}`;
}

export function legacyDestination(pathname: string, preference: unknown): string | null {
  if (!isSitePath(pathname)) return null;
  return localizedPath(isLocale(preference) ? preference : "en", pathname);
}

export function localePreferenceCookie(locale: Locale, secure: boolean): string {
  return `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export function pageMetadata(locale: Locale, path: SitePath, copy: { title: string; description: string }): Metadata {
  const canonical = `${productionOrigin}${localizedPath(locale, path)}`;
  return {
    metadataBase: new URL(productionOrigin),
    ...copy,
    alternates: {
      canonical,
      languages: {
        en: `${productionOrigin}${localizedPath("en", path)}`,
        ja: `${productionOrigin}${localizedPath("ja", path)}`,
        ko: `${productionOrigin}${localizedPath("ko", path)}`,
        "x-default": `${productionOrigin}${localizedPath("en", path)}`,
      },
    },
    openGraph: { ...copy, url: canonical, type: "website", siteName: "J. Ha" },
  };
}
