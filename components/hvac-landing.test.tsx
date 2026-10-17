import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import HvacLanding from "./hvac-landing";
import ProjectDocuments from "./project-documents";
import { hvacMessages } from "../content/hvac-messages";

afterEach(cleanup);

it("T05 preserves the preview selection while reading project documents", () => {
  const copy = hvacMessages("en");
  render(<ProjectDocuments label={copy.tabsLabel} tabs={[
    { id: "demo", label: copy.tabs.demo, content: <HvacLanding locale="en" /> },
    { id: "requirements", label: copy.tabs.requirements, content: <p>Requirements</p> },
  ]} />);
  fireEvent.click(screen.getByRole("button", { name: /AC-301/ }));
  expect(screen.getByRole("status")).toHaveTextContent("27.0°C");
  expect(screen.getByText(copy.lastKnownNotice)).toBeVisible();
  fireEvent.click(screen.getByRole("tab", { name: copy.tabs.requirements }));
  fireEvent.click(screen.getByRole("tab", { name: copy.tabs.demo }));
  expect(screen.getByRole("button", { name: /AC-301/ })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("status")).toHaveTextContent(copy.rooms.office);
  expect(screen.queryByRole("heading", { name: copy.deviceList })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: copy.trend })).not.toBeInTheDocument();
  for (const link of screen.getAllByRole("link", { name: new RegExp(copy.openDemo) })) {
    expect(link).toHaveAttribute("href", "/en/lab/hvac-monitoring/demo");
  }
});
