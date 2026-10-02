import { describe, expect, it } from "vitest";
import { isLocale, languageSwitchUrl, legacyDestination, localizedPath, localePreferenceCookie, pageMetadata, sitePathFromLocalized, locales, sitePaths } from "./i18n";

describe("locale URLs and preference boundaries", () => {
  it("maps all twelve routes without changing page identity", () => {
    for (const locale of locales) for (const path of sitePaths) {
      expect(sitePathFromLocalized(localizedPath(locale, path))).toBe(path);
      expect(languageSwitchUrl({ pathname: localizedPath(locale, path), search: "?source=share", hash: "", locale: "ko" })).toBe(localizedPath("ko", path) + "?source=share");
    }
  });
  it("retains recognized Home anchors only", () => {
    for (const hash of ["#about", "#contact"]) expect(languageSwitchUrl({ pathname: "/en", search: "", hash, locale: "ja" })).toBe(`/ja${hash}`);
    expect(languageSwitchUrl({ pathname: "/en/work", search: "", hash: "#contact", locale: "ja" })).toBe("/ja/work");
  });
  it("uses preferences only for four legacy routes, with safe English fallback", () => {
    expect(legacyDestination("/work", "ko")).toBe("/ko/work");
    for (const value of [undefined, "fr", "../../private", "JA"]) expect(legacyDestination("/lab", value)).toBe("/en/lab");
    for (const path of ["/en", "/ja/work", "/icon.svg", "/lab/unknown", "/_next/static/foo"]) expect(legacyDestination(path, "ko")).toBeNull();
    expect(isLocale("en")).toBe(true);
    expect(isLocale("en-US")).toBe(false);
    expect(sitePathFromLocalized("/fr/work")).toBeNull();
  });
  it("persists only a validated language with scoped security attributes", () => {
    expect(localePreferenceCookie("ja", true)).toBe("portfolio-locale=ja; Path=/; Max-Age=31536000; SameSite=Lax; Secure");
    expect(localePreferenceCookie("ko", false)).not.toContain("Secure");
  });
});

it("creates self canonicals and all language alternates for every page", () => {
  for (const locale of locales) for (const path of sitePaths) {
    const metadata = pageMetadata(locale, path, { title: "Localized title", description: "Localized description" });
    const origin = "https://jha-portfolio-eight.vercel.app";
    expect(metadata.alternates?.canonical).toBe(origin + localizedPath(locale, path));
    expect(metadata.alternates?.languages).toEqual({ en: origin + localizedPath("en", path), ja: origin + localizedPath("ja", path), ko: origin + localizedPath("ko", path), "x-default": origin + localizedPath("en", path) });
    expect(metadata.openGraph).toMatchObject({ title: "Localized title", description: "Localized description", url: origin + localizedPath(locale, path) });
  }
});
