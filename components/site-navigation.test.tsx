import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import SiteNavigation from "./site-navigation";
import { navigationMessages } from "../content/navigation";
import type { Locale } from "../lib/i18n";

const route = vi.hoisted(() => ({ pathname: "/ja/work" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));

beforeEach(() => {
  window.location.hash = "";
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("identifies the current language and page independently of color", () => {
  render(<SiteNavigation locale="ja" messages={navigationMessages.ja} />);
  expect(screen.getByRole("combobox", { name: "表示言語" })).toHaveValue("ja");
  expect(screen.getByRole("option", { name: "日本語" })).toHaveAttribute("lang", "ja");
  expect(screen.getByRole("link", { name: "職務経歴" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("link", { name: "自己紹介" })).toHaveAttribute("href", "/ja#about");
});

it("closes the mobile menu on Escape and returns focus to its control", () => {
  render(<SiteNavigation locale="ko" messages={navigationMessages.ko} />);
  const button = screen.getByRole("button", { name: "메뉴 열기" });
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
  screen.getByRole("link", { name: "소개" }).focus();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(button).toHaveFocus();
  expect(screen.getByRole("combobox", { name: "표시 언어" })).toHaveValue("ko");
});

it.each<{ locale: Locale; label: string }>([
  { locale: "en", label: "Display language" },
  { locale: "ja", label: "表示言語" },
  { locale: "ko", label: "표시 언어" },
])("exposes one labeled global language control before navigation in $locale", ({ locale, label }) => {
  render(<SiteNavigation locale={locale} messages={navigationMessages[locale]} />);
  const selector = screen.getByRole("combobox", { name: label });
  const navigation = screen.getByRole("navigation");
  expect(screen.getAllByRole("combobox")).toHaveLength(1);
  expect(selector).toHaveValue(locale);
  expect(screen.getByRole("banner")).toContainElement(selector);
  expect(navigation).not.toContainElement(selector);
  expect(selector.compareDocumentPosition(navigation) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  expect(screen.getAllByRole("option").map((option) => [option.textContent, option.getAttribute("lang")])).toEqual([
    ["English", "en"], ["日本語", "ja"], ["한국어", "ko"],
  ]);
  expect(selector.closest("label")?.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  expect(selector.closest("label")?.querySelector("svg")).toHaveAttribute("focusable", "false");
  const menu = screen.getByRole("button");
  fireEvent.click(menu);
  fireEvent.click(menu);
  expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(selector).toBeEnabled();
});

it("keeps Home anchors in the current locale and closes after selection", () => {
  route.pathname = "/en";
  render(<SiteNavigation locale="en" messages={navigationMessages.en} />);
  const button = screen.getByRole("button", { name: "Open menu" });
  fireEvent.click(button);
  const contact = screen.getByRole("link", { name: "Contact" });
  contact.addEventListener("click", (event) => event.preventDefault(), { once: true });
  fireEvent.click(contact);
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/en#contact");
  expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("aria-current", "location");
  route.pathname = "/ja/work";
});
