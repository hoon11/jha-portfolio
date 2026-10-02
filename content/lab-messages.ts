import type { Locale } from "../lib/i18n";
import type { FailureReason, Scenario, Task } from "../lib/rescue-lab";

export type LabMessages = {
  toolbar: { title: string; detail: string };
  chooseResponse: string;
  scenarios: Record<Scenario, { label: string; detail: string }>;
  buttons: { run: string; running: string; retry: string };
  recoveryNote: string;
  languageResetNote: string;
  status: { idle: string; loading: string; success: string };
  failures: Record<FailureReason, string>;
  taskHeading: string;
  sampleBadge: string;
  dataCaption: { validated: string; previous: string };
  taskTitles: Record<"TASK-01" | "TASK-02" | "TASK-03", string>;
  taskStatuses: Record<Task["status"], string>;
  empty: { title: string; detail: string };
  events: {
    heading: string;
    latest: string;
    empty: string;
    started: string;
    succeeded: string;
    failed: string;
    reasons: Record<FailureReason, string>;
    preserved: string;
    noData: string;
  };
};

export const labMessages: Record<Locale, LabMessages> = {
  en: {
    toolbar: { title: "REQUEST SIMULATOR", detail: "Local simulation · Sample data" },
    chooseResponse: "Choose a response",
    scenarios: {
      normal: { label: "Normal", detail: "Valid response · 0.6s" },
      slow: { label: "Slow response", detail: "4s response · 2s timeout" },
      server: { label: "Server error", detail: "Simulated failure · 0.6s" },
      invalid: { label: "Invalid data", detail: "Malformed response · 0.6s" },
    },
    buttons: { run: "Run request", running: "Running request…", retry: "Retry" },
    recoveryNote: "Failures repeat on retry. Select Normal and run again to recover.",
    languageResetNote: "Changing language restarts the local simulation.",
    status: {
      idle: "Ready to run. Choose a scenario and send a simulated request.",
      loading: "Request in progress. Waiting for a simulated response.",
      success: "Request succeeded. All 3 tasks passed response validation.",
    },
    failures: {
      timeout: "The request took too long and stopped after 2 seconds.",
      server: "The simulated server could not complete the request.",
      invalid: "The response did not match the expected task format and was rejected.",
    },
    taskHeading: "Task processing",
    sampleBadge: "Read-only sample",
    dataCaption: { validated: "Showing validated response", previous: "Showing last successful response" },
    taskTitles: {
      "TASK-01": "Prepare activity report",
      "TASK-02": "Process sample records",
      "TASK-03": "Refresh dashboard summary",
    },
    taskStatuses: { Queued: "Queued", Processing: "Processing", Complete: "Complete" },
    empty: { title: "No data loaded yet", detail: "Run Normal to load the sample task list." },
    events: {
      heading: "Event log", latest: "Latest 6 events", empty: "No requests have been made.",
      started: "Request {id} started ({scenario}).",
      succeeded: "Request {id} succeeded. Response validated.",
      failed: "Request {id} failed ({reason}). {data}",
      reasons: { timeout: "timeout", server: "server error", invalid: "invalid data" },
      preserved: "Previous data preserved.", noData: "No data loaded.",
    },
  },
  ja: {
    toolbar: { title: "リクエストシミュレーター", detail: "ローカルシミュレーション · サンプルデータ" },
    chooseResponse: "応答を選択",
    scenarios: {
      normal: { label: "正常", detail: "有効な応答 · 0.6秒" },
      slow: { label: "遅い応答", detail: "4秒後に応答 · 2秒でタイムアウト" },
      server: { label: "サーバーエラー", detail: "エラーのシミュレーション · 0.6秒" },
      invalid: { label: "不正なデータ", detail: "形式が不正な応答 · 0.6秒" },
    },
    buttons: { run: "リクエストを実行", running: "リクエスト実行中…", retry: "再試行" },
    recoveryNote: "再試行しても同じエラーが発生します。「正常」を選んで実行すると復旧します。",
    languageResetNote: "言語を変更するとローカルシミュレーションが最初から始まります。",
    status: {
      idle: "実行できます。条件を選び、模擬リクエストを送信してください。",
      loading: "リクエスト実行中です。模擬応答を待っています。",
      success: "リクエストが成功しました。3件すべてのタスクが応答の検証を通過しました。",
    },
    failures: {
      timeout: "リクエストに時間がかかりすぎたため、2秒で停止しました。",
      server: "模擬サーバーがリクエストを完了できませんでした。",
      invalid: "応答が想定したタスクの形式と一致しないため、受け付けませんでした。",
    },
    taskHeading: "タスク処理",
    sampleBadge: "閲覧用サンプル",
    dataCaption: { validated: "検証済みの応答を表示しています", previous: "最後に成功した応答を表示しています" },
    taskTitles: {
      "TASK-01": "活動レポートを作成",
      "TASK-02": "サンプルレコードを処理",
      "TASK-03": "ダッシュボードの概要を更新",
    },
    taskStatuses: { Queued: "待機中", Processing: "処理中", Complete: "完了" },
    empty: { title: "データはまだ読み込まれていません", detail: "「正常」を実行するとサンプルタスク一覧を読み込みます。" },
    events: {
      heading: "イベントログ", latest: "直近6件", empty: "リクエストはまだ実行されていません。",
      started: "リクエスト{id}を開始しました（{scenario}）。",
      succeeded: "リクエスト{id}が成功しました。応答を検証しました。",
      failed: "リクエスト{id}が失敗しました（{reason}）。{data}",
      reasons: { timeout: "タイムアウト", server: "サーバーエラー", invalid: "不正なデータ" },
      preserved: "前のデータを保持しました。", noData: "データは読み込まれていません。",
    },
  },
  ko: {
    toolbar: { title: "요청 시뮬레이터", detail: "로컬 시뮬레이션 · 샘플 데이터" },
    chooseResponse: "응답 선택",
    scenarios: {
      normal: { label: "정상", detail: "유효한 응답 · 0.6초" },
      slow: { label: "느린 응답", detail: "4초 후 응답 · 2초에 시간 초과" },
      server: { label: "서버 오류", detail: "오류 시뮬레이션 · 0.6초" },
      invalid: { label: "잘못된 데이터", detail: "형식이 잘못된 응답 · 0.6초" },
    },
    buttons: { run: "요청 실행", running: "요청 실행 중…", retry: "재시도" },
    recoveryNote: "재시도해도 같은 오류가 발생합니다. 정상을 선택하고 다시 실행하면 복구됩니다.",
    languageResetNote: "언어를 변경하면 로컬 시뮬레이션이 처음부터 시작됩니다.",
    status: {
      idle: "실행할 준비가 되었습니다. 조건을 선택하고 모의 요청을 보내세요.",
      loading: "요청을 실행 중입니다. 모의 응답을 기다리고 있습니다.",
      success: "요청이 성공했습니다. 작업 3개 모두 응답 검증을 통과했습니다.",
    },
    failures: {
      timeout: "요청이 너무 오래 걸려 2초 후 중단했습니다.",
      server: "모의 서버가 요청을 완료하지 못했습니다.",
      invalid: "응답이 예상한 작업 형식과 일치하지 않아 거부했습니다.",
    },
    taskHeading: "작업 처리",
    sampleBadge: "읽기 전용 샘플",
    dataCaption: { validated: "검증된 응답을 표시하고 있습니다", previous: "마지막 성공 응답을 표시하고 있습니다" },
    taskTitles: {
      "TASK-01": "활동 보고서 작성",
      "TASK-02": "샘플 레코드 처리",
      "TASK-03": "대시보드 요약 갱신",
    },
    taskStatuses: { Queued: "대기 중", Processing: "처리 중", Complete: "완료" },
    empty: { title: "아직 불러온 데이터가 없습니다", detail: "정상을 실행하면 샘플 작업 목록을 불러옵니다." },
    events: {
      heading: "이벤트 로그", latest: "최근 이벤트 6개", empty: "아직 실행한 요청이 없습니다.",
      started: "요청 {id} 시작 ({scenario}).",
      succeeded: "요청 {id} 성공. 응답을 검증했습니다.",
      failed: "요청 {id} 실패 ({reason}). {data}",
      reasons: { timeout: "시간 초과", server: "서버 오류", invalid: "잘못된 데이터" },
      preserved: "이전 데이터를 유지했습니다.", noData: "불러온 데이터가 없습니다.",
    },
  },
};
