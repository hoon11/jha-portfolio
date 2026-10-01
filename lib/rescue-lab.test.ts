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
  expect(state.events[0]).toContain("Request 5");
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
