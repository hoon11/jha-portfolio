export type Scenario = "normal" | "slow" | "server" | "invalid";
export type Task = { id: string; title: string; status: "Queued" | "Processing" | "Complete" };
export type FailureReason = "timeout" | "server" | "invalid";
export type RequestState =
  | { kind: "idle" }
  | { kind: "loading"; id: number; scenario: Scenario }
  | { kind: "success"; id: number }
  | { kind: "failure"; id: number; scenario: Scenario; reason: FailureReason };
export type LabState = { selected: Scenario; request: RequestState; tasks: Task[] | null; events: string[] };
export type RequestResult =
  | { kind: "success"; tasks: Task[] }
  | { kind: "failure"; reason: FailureReason }
  | { kind: "cancelled" };
export type LabAction =
  | { type: "select"; scenario: Scenario }
  | { type: "start"; id: number; scenario: Scenario }
  | { type: "finish"; id: number; result: RequestResult };
export const scenarioOptions: { value: Scenario; label: string; detail: string }[] = [
  { value: "normal", label: "Normal", detail: "Valid response · 0.6s" },
  { value: "slow", label: "Slow response", detail: "4s response · 2s timeout" },
  { value: "server", label: "Server error", detail: "Simulated failure · 0.6s" },
  { value: "invalid", label: "Invalid data", detail: "Malformed response · 0.6s" },
];
export const failureMessages: Record<FailureReason, string> = {
  timeout: "The request took too long and stopped after 2 seconds.",
  server: "The simulated server could not complete the request.",
  invalid: "The response did not match the expected task format and was rejected.",
};
export const initialState: LabState = { selected: "normal", request: { kind: "idle" }, tasks: null, events: [] };

export function validateTasks(payload: unknown): Task[] | null {
  if (!Array.isArray(payload) || payload.length === 0) return null;
  const tasks: Task[] = [];
  const ids = new Set<string>();
  for (const item of payload) {
    if (typeof item !== "object" || item === null ||
      !("id" in item) || typeof item.id !== "string" || !item.id.trim() || ids.has(item.id) ||
      !("title" in item) || typeof item.title !== "string" || !item.title.trim() ||
      !("status" in item) ||
      (item.status !== "Queued" && item.status !== "Processing" && item.status !== "Complete")) return null;
    ids.add(item.id);
    tasks.push({ id: item.id, title: item.title, status: item.status });
  }
  return tasks;
}

export function rescueReducer(state: LabState, action: LabAction): LabState {
  switch (action.type) {
    case "select": return state.request.kind === "loading" ? state : { ...state, selected: action.scenario };
    case "start": return {
      ...state, request: { kind: "loading", id: action.id, scenario: action.scenario },
      events: [...state.events, `Request ${action.id} started (${action.scenario}).`].slice(-6),
    };
    case "finish": {
      if (state.request.kind !== "loading" || state.request.id !== action.id || action.result.kind === "cancelled") return state;
      if (action.result.kind === "success") return {
        ...state, request: { kind: "success", id: action.id }, tasks: action.result.tasks,
        events: [...state.events, `Request ${action.id} succeeded. Response validated.`].slice(-6),
      };
      return {
        ...state,
        request: { kind: "failure", id: action.id, scenario: state.request.scenario, reason: action.result.reason },
        events: [...state.events, `Request ${action.id} failed (${action.result.reason}). ${state.tasks ? "Previous data preserved." : "No data loaded."}`].slice(-6),
      };
    }
    default: { const exhaustive: never = action; return exhaustive; }
  }
}

export function simulateRequest({ scenario, signal }: { scenario: Scenario; signal: AbortSignal }): Promise<RequestResult> {
  return new Promise((resolve) => {
    if (signal.aborted) { resolve({ kind: "cancelled" }); return; }
    let settled = false;
    let responseTimer: ReturnType<typeof setTimeout>;
    let timeoutTimer: ReturnType<typeof setTimeout>;
    const finish = (result: RequestResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(responseTimer);
      clearTimeout(timeoutTimer);
      signal.removeEventListener("abort", abort);
      resolve(result);
    };
    const abort = () => finish({ kind: "cancelled" });
    signal.addEventListener("abort", abort, { once: true });
    timeoutTimer = setTimeout(() => finish({ kind: "failure", reason: "timeout" }), 2000);
    responseTimer = setTimeout(() => {
      if (scenario === "server") { finish({ kind: "failure", reason: "server" }); return; }
      const payload: unknown = scenario === "invalid"
        ? [{ id: "TASK-01", title: "Prepare activity report", status: 42 }]
        : [
          { id: "TASK-01", title: "Prepare activity report", status: "Complete" },
          { id: "TASK-02", title: "Process sample records", status: "Processing" },
          { id: "TASK-03", title: "Refresh dashboard summary", status: "Queued" },
        ];
      const tasks = validateTasks(payload);
      finish(tasks ? { kind: "success", tasks } : { kind: "failure", reason: "invalid" });
    }, scenario === "slow" ? 4000 : 600);
  });
}
