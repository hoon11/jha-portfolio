import { expect, it } from "vitest";
import { initialState, rescueReducer, validateTasks, type Task } from "./rescue-lab";

it("ignores out-of-order completions and keeps the event log bounded", () => {
  const tasks: Task[] = [{ id: "sample", title: "Valid task", status: "Complete" }];
  let state = rescueReducer(initialState, { type: "start", id: 1, scenario: "slow" });
  state = rescueReducer(state, { type: "start", id: 2, scenario: "normal" });
  expect(rescueReducer(state, { type: "finish", id: 1, result: { kind: "success", tasks } })).toBe(state);
  state = rescueReducer(state, { type: "finish", id: 2, result: { kind: "success", tasks } });
  expect(rescueReducer(state, { type: "finish", id: 1, result: { kind: "failure", reason: "timeout" } })).toBe(state);
  for (let id = 3; id <= 10; id++) state = rescueReducer(state, { type: "start", id, scenario: "normal" });
  expect(state.events).toHaveLength(6);
  expect(state.events[0]).toEqual({ kind: "started", id: 5, scenario: "normal" });
  expect(state.tasks).toEqual(tasks);
});

it("rejects malformed tasks and duplicate IDs at the response boundary", () => {
  const task = { id: "sample", title: "Valid task", status: "Complete" };
  expect(validateTasks([task])).toEqual([task]);
  expect(validateTasks([{ ...task, status: 42 }])).toBeNull();
  expect(validateTasks([{ ...task, title: " " }])).toBeNull();
  expect(validateTasks([task, task])).toBeNull();
  expect(validateTasks(null)).toBeNull();
});

it("keeps protocol titles and statuses when validating an unknown task", () => {
  const task = { id: "CUSTOM-01", title: "A validated custom task", status: "Queued" };
  expect(validateTasks([task])).toEqual([task]);
});

it("ignores cancelled finishes and records failure context without display copy", () => {
  let state = rescueReducer(initialState, { type: "start", id: 1, scenario: "server" });
  expect(rescueReducer(state, { type: "select", scenario: "normal" })).toBe(state);
  expect(rescueReducer(state, { type: "finish", id: 1, result: { kind: "cancelled" } })).toBe(state);
  state = rescueReducer(state, { type: "finish", id: 1, result: { kind: "failure", reason: "server" } });
  expect(state.events).toEqual([
    { kind: "started", id: 1, scenario: "server" },
    { kind: "failed", id: 1, reason: "server", hadData: false },
  ]);
  const tasks: Task[] = [{ id: "sample", title: "Valid task", status: "Complete" }];
  state = rescueReducer(state, { type: "start", id: 2, scenario: "normal" });
  state = rescueReducer(state, { type: "finish", id: 2, result: { kind: "success", tasks } });
  state = rescueReducer(state, { type: "start", id: 3, scenario: "invalid" });
  state = rescueReducer(state, { type: "finish", id: 3, result: { kind: "failure", reason: "invalid" } });
  expect(state.events.at(-1)).toEqual({ kind: "failed", id: 3, reason: "invalid", hadData: true });
  expect(state.tasks).toBe(tasks);
});
