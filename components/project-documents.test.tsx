import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import ProjectDocuments from "./project-documents";
import { dataOperationsMessages } from "../content/data-operations-messages";
import { locales } from "../lib/i18n";

afterEach(cleanup);

it("T06 preserves an unfinished demo edit while visiting all three document tabs", () => {
  render(<ProjectDocuments label="Demo and documents" tabs={[
    { id: "demo", label: "Demo", content: <label>Draft amount<input defaultValue="1000" /></label> },
    { id: "requirements", label: "Requirements", content: "Requirements text" },
    { id: "design", label: "Design", content: "Design text" },
    { id: "test-design", label: "Test design", content: "Test plan" },
  ]} />);
  fireEvent.change(screen.getByRole("textbox", { name: "Draft amount" }), { target: { value: "4000" } });
  for (const label of ["Requirements", "Design", "Test design"]) {
    fireEvent.click(screen.getByRole("tab", { name: label }));
    expect(screen.queryByRole("textbox", { name: "Draft amount" })).not.toBeInTheDocument();
  }
  fireEvent.click(screen.getByRole("tab", { name: "Demo" }));
  expect(screen.getByRole("textbox", { name: "Draft amount" })).toHaveValue("4000");
  expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(4);
});

function renderDocuments() {
  render(<ProjectDocuments label="Project documents" tabs={[
    { id: "requirements", label: "Requirements", content: <h2>Required behavior</h2> },
    { id: "design", label: "Design", content: <h2>Design decisions</h2> },
    { id: "test-design", label: "Test design", content: <h2>Verification plan</h2> },
  ]} />);
}

it("T01 switches documents without leaving the page or losing panel content", () => {
  renderDocuments();
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Required behavior");
  fireEvent.click(screen.getByRole("tab", { name: "Design" }));
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Design decisions");
  fireEvent.click(screen.getByRole("tab", { name: "Test design" }));
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Verification plan");
  expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(3);
  fireEvent.click(screen.getByRole("tab", { name: "Requirements" }));
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Required behavior");
});

it("T02 moves selection and focus with arrows, Home and End, wrapping at the ends", () => {
  renderDocuments();
  const tabs = screen.getAllByRole("tab");
  tabs[0].focus();
  for (const [key, index] of [["ArrowLeft", 2], ["ArrowRight", 0], ["End", 2], ["Home", 0], ["ArrowRight", 1]] as const) {
    fireEvent.keyDown(document.activeElement ?? tabs[0], { key });
    expect(tabs[index]).toHaveFocus();
    expect(tabs[index]).toHaveAttribute("aria-selected", "true");
    expect(tabs.filter((tab) => tab.tabIndex === 0)).toEqual([tabs[index]]);
  }
});

it("T03 connects each tab and panel with unique accessible IDs", () => {
  renderDocuments();
  const tabs = screen.getAllByRole("tab");
  const panels = screen.getAllByRole("tabpanel", { hidden: true });
  expect(new Set([...tabs, ...panels].map((element) => element.id)).size).toBe(6);
  tabs.forEach((tab, index) => {
    expect(tab).toHaveAttribute("aria-controls", panels[index].id);
    expect(panels[index]).toHaveAttribute("aria-labelledby", tab.id);
    expect(panels[index]).toHaveAttribute("tabindex", "0");
    expect(panels[index].hidden).toBe(index !== 0);
  });
});

it.each(locales)("T04 provides requirements, design and test design in %s", (locale) => {
  const copy = dataOperationsMessages[locale];
  render(<ProjectDocuments label={copy.tabsLabel} tabs={[
    { id: "requirements", label: copy.requirementsLabel, content: copy.requirements.title },
    { id: "design", label: copy.designLabel, content: copy.design.title },
    { id: "test-design", label: copy.testDesignLabel, content: copy.testDesign.title },
  ]} />);
  for (const label of [copy.requirementsLabel, copy.designLabel, copy.testDesignLabel]) {
    fireEvent.click(screen.getByRole("tab", { name: label }));
    expect(screen.getByRole("tabpanel")).not.toBeEmptyDOMElement();
  }
});
