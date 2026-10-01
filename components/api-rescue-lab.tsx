"use client";

import { useEffect, useReducer, useRef, type FormEvent } from "react";
import { failureMessages, initialState, rescueReducer, scenarioOptions, simulateRequest } from "../lib/rescue-lab";

export default function ApiRescueLab() {
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
  const status = state.request.kind === "failure" ? failureMessages[state.request.reason]
    : loading ? "Request in progress. Waiting for a simulated response."
      : state.request.kind === "success" ? "Request succeeded. All 3 tasks passed response validation."
        : "Ready to run. Choose a scenario and send a simulated request.";

  return <div className="lab-shell">
    <div className="lab-toolbar"><span className="lab-label">REQUEST SIMULATOR</span><span>Local simulation · Sample data</span></div>
    <div className="lab-body">
      <form onSubmit={runRequest} className="lab-controls">
        <fieldset disabled={loading}>
          <legend>Choose a response</legend>
          {scenarioOptions.map((option) => <label className="scenario" key={option.value}>
            <input type="radio" name="scenario" value={option.value} checked={state.selected === option.value}
              onChange={() => dispatch({ type: "select", scenario: option.value })} />
            <span><strong>{option.label}</strong><small>{option.detail}</small></span>
          </label>)}
        </fieldset>
        <button className="button" type="submit" disabled={loading}>{loading ? "Running request…" : retry ? "Retry" : "Run request"}<span aria-hidden="true">↗</span></button>
        <p className="control-note">Failures repeat on retry. Select Normal and run again to recover.</p>
      </form>
      <div className="lab-results">
        <div className={`request-status ${state.request.kind}`} role="status" aria-live="polite" aria-atomic="true">
          <span className="status-dot" aria-hidden="true" /><p>{status}</p>
        </div>
        <div className="task-heading"><h3>Task processing</h3><span>Read-only sample</span></div>
        {state.tasks ? <>
          <p className="data-caption">{state.request.kind === "success" ? "Showing validated response" : "Showing last successful response"}</p>
          <ul className="task-list">{state.tasks.map((task) => <li key={task.id}>
            <div><span className="task-id">{task.id}</span><strong>{task.title}</strong></div>
            <span className={`task-status ${task.status.toLowerCase()}`}>{task.status}</span>
          </li>)}</ul>
        </> : <div className="empty-state"><span aria-hidden="true">[ — ]</span><strong>No data loaded yet</strong><p>Run Normal to load the sample task list.</p></div>}
        <div className="event-log"><h3>Event log <span>Latest 6 events</span></h3>
          {state.events.length ? <ol>{state.events.map((entry, index) => <li key={`${index}-${entry}`}>{entry}</li>)}</ol> : <p>No requests have been made.</p>}
        </div>
      </div>
    </div>
  </div>;
}
