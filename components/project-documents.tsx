"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type DocumentTab = { id: "demo" | "requirements" | "design" | "test-design"; label: string; content: ReactNode };
type Props = { label: string; tabs: readonly [DocumentTab, ...DocumentTab[]] };

export default function ProjectDocuments({ label, tabs }: Props) {
  const prefix = useId();
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % tabs.length; break;
      case "ArrowLeft": next = (index + tabs.length - 1) % tabs.length; break;
      case "Home": next = 0; break;
      case "End": next = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  }

  return <div className="project-documents">
    <div role="tablist" aria-label={label} className="project-tabs">
      {tabs.map((tab, index) => <button key={tab.id} type="button" role="tab"
        id={`${prefix}-${tab.id}-tab`} aria-controls={`${prefix}-${tab.id}-panel`}
        aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
        ref={(element) => { buttons.current[index] = element; }}
        onClick={() => setSelected(index)} onKeyDown={(event) => navigate(event, index)}>{tab.label}</button>)}
    </div>
    {tabs.map((tab, index) => <section key={tab.id} role="tabpanel" className="project-document"
      id={`${prefix}-${tab.id}-panel`} aria-labelledby={`${prefix}-${tab.id}-tab`}
      tabIndex={0} hidden={selected !== index}>{tab.content}</section>)}
  </div>;
}
