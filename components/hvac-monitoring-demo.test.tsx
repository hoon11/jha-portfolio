import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import HvacMonitoringDemo from "./hvac-monitoring-demo";
import { hvacMessages } from "../content/hvac-messages";
import { locales } from "../lib/i18n";

beforeEach(() => {
  // jsdom does not measure layout; real chart sizing is checked in the browser.
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("H-U01 synchronizes diagram, list and details without moving keyboard focus", () => {
  const copy = hvacMessages("en");
  render(<HvacMonitoringDemo locale="en" />);
  const diagram = screen.getByRole("group", { name: copy.building });
  const list = screen.getByRole("region", { name: copy.deviceList });
  const diagramButton = within(diagram).getByRole("button", { name: /AC-301/ });
  diagramButton.focus();
  fireEvent.click(diagramButton);
  expect(diagramButton).toHaveFocus();
  expect(diagramButton).toHaveAttribute("aria-pressed", "true");
  expect(within(list).getByRole("button", { name: /AC-301/ })).toHaveAttribute("aria-pressed", "true");
  const detail = screen.getByRole("region", { name: copy.details });
  expect(within(detail).getByRole("heading", { name: "AC-301" })).toBeInTheDocument();
  expect(detail).toHaveTextContent(copy.lastKnownTemperature);
  expect(detail).toHaveTextContent(copy.running);
  expect(detail).toHaveTextContent(copy.stale);
  expect(detail).toHaveTextContent(copy.lastKnownNotice);
  expect(screen.getByRole("status")).toHaveTextContent("AC-301");
  const listButton = within(list).getByRole("button", { name: /AC-201/ });
  listButton.focus();
  fireEvent.click(listButton);
  fireEvent.click(listButton);
  expect(listButton).toHaveFocus();
  expect(within(diagram).getByRole("button", { name: /AC-201/ })).toHaveAttribute("aria-pressed", "true");
  expect(within(detail).getByRole("heading", { name: "AC-201" })).toBeInTheDocument();
  expect(detail).toHaveTextContent(copy.stopped);
});

it("H-U02 exposes missing historical readings as missing values instead of zero", () => {
  const copy = hvacMessages("en");
  render(<HvacMonitoringDemo locale="en" />);
  fireEvent.click(within(screen.getByRole("group", { name: copy.building })).getByRole("button", { name: /AC-301/ }));
  fireEvent.click(screen.getByText(copy.values));
  const table = screen.getByRole("table", { name: `AC-301 · ${copy.trend}` });
  expect(within(table).getByRole("row", { name: /12:00/ })).toHaveTextContent(`— (${copy.missing})`);
  expect(within(table).getByRole("row", { name: /14:00/ })).toHaveTextContent(`— (${copy.missing})`);
  expect(within(table).getByRole("row", { name: /13:00/ })).toHaveTextContent("27.0 °C");
});

it.each(locales)("H-U03 labels the building and read-only detail in %s", (locale) => {
  const copy = hvacMessages(locale);
  render(<HvacMonitoringDemo locale={locale} />);
  expect(screen.getByRole("group", { name: copy.building })).toBeInTheDocument();
  const detail = screen.getByRole("region", { name: copy.details });
  expect(within(detail).getByRole("heading", { name: "AC-101" })).toBeInTheDocument();
  expect(detail).toHaveTextContent("24.5 °C");
  expect(screen.getByText(/2026-09-15 14:00 JST/)).toBeInTheDocument();
});
