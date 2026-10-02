import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import SiteNavigation from "./site-navigation";
import { navigationMessages } from "../content/navigation";

const route = vi.hoisted(() => ({ pathname: "/ja/work" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));

beforeEach(() => {
  window.location.hash = "";
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("identifies the current language and page independently of color", () => {
  render(<SiteNavigation locale="ja" messages={navigationMessages.ja} />);
  expect(screen.getByRole("combobox", { name: "言語" })).toHaveValue("ja");
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
  expect(screen.getByRole("combobox", { name: "언어" })).toHaveValue("ko");
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
