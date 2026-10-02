"use client";

import { useEffect, useReducer, useRef, type FormEvent } from "react";
import type { LabMessages } from "../content/lab-messages";
import { initialState, rescueReducer, scenarios, simulateRequest, type LabEvent, type Task } from "../lib/rescue-lab";

function formatEvent(entry: LabEvent, messages: LabMessages): string {
  const id = String(entry.id);
  switch (entry.kind) {
    case "started": return messages.events.started.replace("{id}", id).replace("{scenario}", messages.scenarios[entry.scenario].label);
    case "succeeded": return messages.events.succeeded.replace("{id}", id);
    case "failed": return messages.events.failed.replace("{id}", id)
      .replace("{reason}", messages.events.reasons[entry.reason])
      .replace("{data}", entry.hadData ? messages.events.preserved : messages.events.noData);
    default: { const exhaustive: never = entry; return exhaustive; }
  }
}

export function displayTaskTitle(task: Task, messages: LabMessages): string {
  return task.id === "TASK-01" || task.id === "TASK-02" || task.id === "TASK-03"
    ? messages.taskTitles[task.id] : task.title;
}

export default function ApiRescueLab({ messages }: { messages: LabMessages }) {
  const [state, dispatch] = useReducer(rescueReducer, initialState);
  const active = useRef<AbortController | null>(null);
  const nextId = useRef(0);
  useEffect(() => () => { active.current?.abort(); }, []);

  async function runRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (active.current) return;
    const controller = new AbortController();
    active.current = controller;
    const id = ++nextId.current;
    dispatch({ type: "start", id, scenario: state.selected });
    const result = await simulateRequest({ scenario: state.selected, signal: controller.signal });
    if (active.current === controller) active.current = null;
    if (!controller.signal.aborted) dispatch({ type: "finish", id, result });
  }

  const loading = state.request.kind === "loading";
  const retry = state.request.kind === "failure" && state.request.scenario === state.selected;
  const status = state.request.kind === "failure" ? messages.failures[state.request.reason]
    : loading ? messages.status.loading
      : state.request.kind === "success" ? messages.status.success
        : messages.status.idle;

  return <div className="lab-shell">
    <div className="lab-toolbar"><span className="lab-label">{messages.toolbar.title}</span><span>{messages.toolbar.detail}</span></div>
    <div className="lab-body">
      <form onSubmit={runRequest} className="lab-controls">
        <fieldset disabled={loading}>
          <legend>{messages.chooseResponse}</legend>
          {scenarios.map((scenario) => <label className="scenario" key={scenario}>
            <input type="radio" name="scenario" value={scenario} checked={state.selected === scenario}
              onChange={() => dispatch({ type: "select", scenario })} />
            <span><strong>{messages.scenarios[scenario].label}</strong><small>{messages.scenarios[scenario].detail}</small></span>
          </label>)}
        </fieldset>
        <button className="button" type="submit" disabled={loading}>{loading ? messages.buttons.running : retry ? messages.buttons.retry : messages.buttons.run}<span aria-hidden="true">↗</span></button>
        <p className="control-note">{messages.recoveryNote}</p>
        <p className="control-note">{messages.languageResetNote}</p>
      </form>
      <div className="lab-results">
        <div className={`request-status ${state.request.kind}`} role="status" aria-live="polite" aria-atomic="true">
          <span className="status-dot" aria-hidden="true" /><p>{status}</p>
        </div>
        <div className="task-heading"><h3>{messages.taskHeading}</h3><span>{messages.sampleBadge}</span></div>
        {state.tasks ? <>
          <p className="data-caption">{state.request.kind === "success" ? messages.dataCaption.validated : messages.dataCaption.previous}</p>
          <ul className="task-list">{state.tasks.map((task) => <li key={task.id}>
            <div><span className="task-id">{task.id}</span><strong>{displayTaskTitle(task, messages)}</strong></div>
            <span className={`task-status ${task.status.toLowerCase()}`}>{messages.taskStatuses[task.status]}</span>
          </li>)}</ul>
        </> : <div className="empty-state"><span aria-hidden="true">[ — ]</span><strong>{messages.empty.title}</strong><p>{messages.empty.detail}</p></div>}
        <div className="event-log"><h3>{messages.events.heading} <span>{messages.events.latest}</span></h3>
          {state.events.length ? <ol>{state.events.map((entry) => <li key={`${entry.id}-${entry.kind}`}>{formatEvent(entry, messages)}</li>)}</ol> : <p>{messages.events.empty}</p>}
        </div>
      </div>
    </div>
  </div>;
}
