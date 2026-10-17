import type { Locale } from "../lib/i18n";

export type ProjectSection = {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

export type ProjectDocument = {
  title: string;
  sections: readonly ProjectSection[];
};

export type DataOperationsCopy = {
  title: string;
  summary: string;
  status: string;
  back: string;
  tabsLabel: string;
  demoLabel: string;
  requirementsLabel: string;
  designLabel: string;
  testDesignLabel: string;
  requirements: ProjectDocument;
  design: ProjectDocument;
  testDesign: ProjectDocument;
};

export const dataOperationsMessages = {
  "en": {
    "title": "Data Operations Demo",
    "summary": "Explore synthetic orders, edit saved values and compare filtered summary metrics with sales charts. Requirements, design and test design explain the implementation.",
    "status": "Interactive sample · browser memory only",
    "back": "Back to projects",
    "tabsLabel": "Project demo and documents",
    "requirementsLabel": "Requirements",
    "designLabel": "Design",
    "testDesignLabel": "Test design",
    "requirements": {
      "title": "Requirements",
      "sections": [
        {
          "title": "Purpose and scope",
          "paragraphs": [
            "This personal frontend demo connects synthetic order search and editing with the same saved data in the table, summary and charts. It is not a customer case study.",
            "The first version uses browser memory only. It has no backend, authentication, database, external API or persistent storage. Reloading restores the original sample."
          ]
        },
        {
          "title": "Feature IDs",
          "items": [
            "F01 fixed synthetic sample; F02 combined filters; F03 table, detail and sorting; F04 edit and cancel; F05 validation.",
            "F06 summary; F07 daily line chart; F08 category bar chart; F09 saved changes reflected everywhere; F10 sample reset."
          ]
        },
        {
          "title": "Main flow",
          "items": [
            "Load a fixed synthetic sample covering multiple dates, categories and statuses, including multiple orders on the same date.",
            "Combine search, date range, status and category filters; sort the result by date or amount.",
            "Open an order, edit its amount or status, validate and save, then inspect the updated table, summary and two charts.",
            "Cancel an edit to retain the saved values. Reset the sample to restore orders, default filters, default sorting and a closed detail panel."
          ]
        },
        {
          "title": "Order contract",
          "items": [
            "Each row is one order for one product. Order ID, calendar date (YYYY-MM-DD), product name and category are read-only. IDs are unique; product names are non-empty; categories come from a fixed list.",
            "Amount is an integer in Japanese yen from 0 through 1,000,000. Reject empty, negative, fractional and non-numeric input.",
            "Status is exactly pending, completed or cancelled. Only amount and status can be edited. Validate both before saving; display actionable errors beside their fields.",
            "Revenue means the sum of completed sample-order amounts. It does not represent accounting revenue recognition or verified payments."
          ]
        },
        {
          "title": "Filtering and sorting",
          "items": [
            "Search order IDs and product names by substring, ignoring surrounding whitespace and English letter case. Combine all filters with AND.",
            "Date bounds are inclusive; an empty bound is unrestricted. If the start is later than the end, explain the error and retain the last valid applied result.",
            "Apply the same status and category conditions to rows and aggregates. Filter reset restores all sample rows without undoing saved edits.",
            "Support ascending and descending date and amount sorting. Break ties by order ID. Sorting changes row order, never aggregate values.",
            "Filter inputs are drafts. Apply validates and applies them; pressing Apply discards the open order draft even when the date input is invalid. Invalid dates retain the last valid applied result. Typing alone does not discard editing."
          ]
        },
        {
          "title": "Summary and charts",
          "items": [
            "Show filtered order count, completed order count and completed-order revenue. Pending and cancelled orders never contribute to revenue, even if their amounts are non-zero.",
            "Show a daily revenue line chart and a category revenue bar chart. Both use the same filtered orders as the summary.",
            "For the daily series, intersect the applied date range with the full sample date extent; use sample bounds for open ends. Include every calendar day in that interval, with zero where no completed orders exist.",
            "Show every category allowed by the category filter, including zero-revenue categories. If no orders match, show zero metrics and an explicit no-results state. Distinguish this from matching orders with no completed orders and from completed orders whose revenue is zero.",
            "Provide chart titles, JPY units, dates or categories and values, plus equivalent data tables. Meaning and exact values must not depend on color or hovering."
          ]
        },
        {
          "title": "Editing, reset and feedback",
          "items": [
            "Unsaved edits never affect rows or aggregates. Save updates one order, closes its detail and announces completion; cancel discards the draft.",
            "If saving makes an order stop matching the active filters, remove it from the results and explain that it was saved but is now outside the current conditions.",
            "Apply filters, reset filters or reset the sample to close detail and discard its draft. Typing a filter alone does not close editing. Sample reset also discards saved changes.",
            "Restore focus to the order’s detail button when closing. If that row is gone, focus the results message or table heading instead."
          ]
        },
        {
          "title": "Accessibility and responsive layout",
          "items": [
            "Label all inputs. Support keyboard use for filters, sorting, detail, save, cancel and reset, with visible focus and understandable error and status messages.",
            "Stack filters, summary and charts on small screens. Put a wide order table in its own horizontal scrolling area; avoid page-wide overflow.",
            "State clearly that this is synthetic data, changes last only on this screen, and reload restores the sample. Do not write to local storage or an external service.",
            "Document tab switches preserve the workspace. Reloading and language navigation reset the sample, filters, sort and draft; no local storage or external writes are used."
          ]
        },
        {
          "title": "Acceptance criteria",
          "items": [
            "Completed orders of ¥1,000 and ¥2,000 plus a cancelled ¥9,000 order yield 3 orders, 2 completed orders and ¥3,000 revenue. Each chart’s values also total ¥3,000.",
            "Save the cancelled order as completed: revenue becomes ¥12,000. Then save that same order’s amount as ¥4,000: revenue becomes ¥7,000.",
            "In the original example, filtering to cancelled shows 1 order, 0 completed orders and ¥0 revenue.",
            "Combined filters agree across table, summary and charts; sorting alone preserves totals. Invalid amounts, invalid dates and cancelled edits preserve valid saved data.",
            "Verify saving out of a filter, no results, no completed orders, zero-value completed orders, missing dates, reset and reload. Complete the main flow with a keyboard and on mobile; compare every chart with its data table. These criteria are separate from actual execution results."
          ]
        },
        {
          "title": "Outside the first version",
          "paragraphs": [
            "CSV import/export, adding or deleting orders, live updates, login, external commerce integration, payments and multiple currencies are excluded. Supabase is a possible later step after defining per-user isolation, authorization, reset, save failures and conflict handling; adoption is not yet decided."
          ]
        }
      ]
    },
    "design": {
      "title": "Design",
      "sections": [
        {
          "title": "Implementation boundary",
          "paragraphs": [
            "The project has four tabs: Demo, Requirements, Design and Test design. Demo is selected initially. All panels stay mounted; switching tabs preserves orders, filters and editing drafts.",
            "The existing API Rescue Lab remains independent. Static documents are rendered on the server; the interactive workspace is a separate client component. Reloading or navigating to another language reconstructs the initial state and selects Demo."
          ]
        },
        {
          "title": "Domain model",
          "items": [
            "Define an immutable Order with id, orderDate, productName, category, amountYen and status. OrderStatus is the literal union pending | completed | cancelled; category is derived from the fixed sample categories.",
            "Treat dates as validated calendar-date strings, not instants. Validate date shape and actual calendar validity; compare normalized YYYY-MM-DD values and enumerate days without timezone conversion.",
            "The baked-in sample is a typed constant. Parse editing input before creating a valid saved order; keep display labels and JPY formatting separate from domain values."
          ]
        },
        {
          "title": "State and transitions",
          "items": [
            "A local reducer owns saved orders, draft filter input, last valid applied filters, sort selection, edit state and feedback. No global store is needed for one workspace.",
            "Represent edit state as a discriminated union: closed, or editing with an order ID, string amount input, status draft and field errors. Keeping amount as text allows empty and temporarily invalid input without corrupting numeric saved values.",
            "Filter inputs are drafts. Apply validates and applies them; pressing Apply discards the open order draft even when the date input is invalid. Invalid dates retain the last valid applied result. Typing alone does not discard editing.",
            "Save parses the amount, checks the allowed status and replaces only the matching order. Failed validation preserves saved orders. Cancel closes editing; filter reset preserves saved edits; sample reset reconstructs the initial state."
          ]
        },
        {
          "title": "One derivation pipeline",
          "items": [
            "The pure deriveView function filters saved orders once and derives sorted rows, summary, daily revenue and category revenue from the same matching set.",
            "Sort only the table projection with an order-ID tie-breaker. Derive completed orders from the filtered set; sum integer yen without floating-point rounding.",
            "Build the daily axis from the applied range intersected with sample bounds, filling missing days with zero. Build the category axis from permitted categories, filling missing categories with zero.",
            "Do not store aggregate copies in reducer state or synchronize charts using effects. React rendering derives the view from saved orders and applied filters; editing drafts are deliberately excluded."
          ]
        },
        {
          "title": "Workspace structure and focus",
          "items": [
            "Compose labeled filter controls, summary metrics, an order table, an inline detail form and two chart sections. Keep each component responsible for a visible part of the flow rather than introducing a generic dashboard framework.",
            "Use a semantic table with caption and column headers. Sorting uses a labeled select and aria-sort on the sorted header. Open editing with an explicit row button; render a headed inline detail section instead of a modal or clickable-only row.",
            "Associate validation messages with inputs, announce save feedback politely and keep feedback outside any row that may disappear. On close, restore focus to the opener or the result heading when that order no longer matches."
          ]
        },
        {
          "title": "Chart library choice",
          "items": [
            "Use Recharts declarative React line and bar components for axes, tooltips and chart layout. It fits the existing React component model without manual drawing or an imperative chart-instance lifecycle.",
            "Chart.js is a viable canvas alternative, but requires a canvas integration or React wrapper. Hand-drawn SVG would add axis, tooltip and layout work. Recharts internally uses SVG; the choice is to use a chart library rather than draw charts ourselves.",
            "Send the same derived series to Recharts and semantic HTML data tables. Keep a zero baseline, label JPY units and distinguish no matches, no completed orders and valid zero revenue. Exact values remain available without hovering. No chart development tools are included."
          ]
        },
        {
          "title": "Responsive behavior and localization",
          "items": [
            "Use a single-column layout on narrow screens and a readable chart layout on wider screens. Constrain horizontal scrolling to the table container; keep chart labels legible and controls reachable.",
            "Keep English, Japanese and Korean document meaning equivalent. UI messages use locale resources; domain statuses and calendar dates remain language-neutral. Format JPY for display only.",
            "Verify keyboard order, focus visibility, input associations, status announcements and equivalent chart tables. Do not rely on color, pointer hover or motion to communicate data."
          ]
        },
        {
          "title": "Verification plan",
          "items": [
            "Unit-test pure filtering, inclusive dates, combined conditions, deterministic sorting and aggregation with the ¥3,000 → ¥12,000 → ¥7,000 example. Assert chart series totals equal the summary.",
            "Test reducer behavior for invalid amount, invalid date drafts, cancel, applying filters during editing, saving outside a status filter and resetting. Cover no results, no completed orders, zero amounts and dates without orders.",
            "Exercise the implemented workspace in a real browser on desktop and mobile, including keyboard-only editing and focus restoration. Compare chart values against data tables and confirm reload restores the sample without storage or network writes.",
            "Verify all four tabs, retained demo state across tab switches and reset on reload or language navigation. Typecheck and build complement behavioral tests and browser checks; this document does not claim a completed browser or mobile check."
          ]
        },
        {
          "title": "Later persistence boundary",
          "paragraphs": [
            "Only design a Supabase read/write boundary after deciding identity, row ownership, authorization, safe shared-demo reset and error/conflict handling. Keep domain derivation pure so a future persistence choice does not change revenue or filtering rules. No database schema, credentials, dependency or storage promise is part of this version."
          ]
        }
      ]
    },
    "testDesign": {
      "title": "Test design",
      "sections": [
        {
          "title": "Test layers and evidence",
          "paragraphs": [
            "This is a test design, not an execution report. Domain tests live in lib/data-operations.test.ts (D IDs), workspace tests in components/data-operations-demo.test.tsx (U IDs), and tab tests in components/project-documents.test.tsx (T IDs). F01–F10 and A01–A09 connect features to acceptance criteria. Record actual execution results separately."
          ]
        },
        {
          "title": "Document tabs — executable now",
          "items": [
            "T01: Click each tab. The matching heading and document are visible, exactly one tab is selected, and other panels are hidden.",
            "T02: With a tab focused, use Left/Right and Home/End. Focus and selection move to the expected tab, including wrapping at either end.",
            "T03: Follow project-list and back links; confirm their destinations. Check tab-to-panel labels, visible focus, a single tab stop in the tab list and no focusable content inside hidden panels.",
            "T04: Check document copy across English, Japanese and Korean. T05: Existing locale-route and metadata checks cover the new project URLs. T06: Keep an unfinished demo edit while visiting all three document tabs. Record execution results separately from this plan."
          ]
        },
        {
          "title": "Domain and reducer cases",
          "items": [
            "F01, F06–F08 / A01: Given completed ¥1,000 and ¥2,000 orders plus cancelled ¥9,000, expect 3 orders, 2 completed and ¥3,000 revenue; both chart series total ¥3,000.",
            "F04, F05, F09 / A02: Save the ¥9,000 order as completed, expecting ¥12,000. Save that order as ¥4,000, expecting ¥7,000 across table, summary and charts.",
            "F02, F03, F06–F08 / A03–A04: Filter the original fixture to cancelled: expect 1 row, 0 completed and ¥0. Combine search, category and inclusive dates; compare matching IDs and all aggregates. Reverse sorting; totals stay unchanged and ID ties are stable.",
            "F02, F04, F05 / A05: Try blank, negative, fractional, non-numeric and above-limit amounts. Save must fail without changing data. Cancel an edit with the same outcome. Enter a reversed date range; retain the last valid applied results and show an error.",
            "F01, F06–F08 / A07: Cover no matching rows, matching rows without completed orders, a completed ¥0 order and a day without orders. Check distinct messages, zero metrics, zero-filled series and no invalid chart coordinates."
          ]
        },
        {
          "title": "Interaction and browser checks",
          "items": [
            "F04, F09 / A06: Under a status filter, save an order into another status. Its row disappears; the save message explains why and focus reaches the results heading.",
            "F02, F04, F10 / A05, A08: Change filter inputs while editing: the draft remains until Apply. Apply, even with invalid dates, discards editing. Filter reset preserves saved changes; sample reset restores all defaults. Reload and language navigation restore the fixture without external writes or local storage.",
            "F03–F10 / A09: Complete filtering, sorting, editing, save, cancel and reset by keyboard. Verify input errors and focus restoration. At desktop and narrow mobile widths, compare chart values with data tables, check readable labels and ensure only the order table scrolls horizontally."
          ]
        }
      ]
    },
    "demoLabel": "Demo"
  },
  "ja": {
    "title": "データ操作デモ",
    "summary": "架空の注文を検索・編集し、同じ条件の集計と売上グラフを確認できます。要件・設計・テスト設計も合わせて読めます。",
    "status": "操作できるサンプル · ブラウザメモリのみ",
    "back": "プロジェクト一覧へ",
    "tabsLabel": "プロジェクトのデモと資料",
    "requirementsLabel": "要件",
    "designLabel": "設計",
    "testDesignLabel": "テスト設計",
    "requirements": {
      "title": "要件",
      "sections": [
        {
          "title": "目的と範囲",
          "paragraphs": [
            "架空の注文を検索・編集し、保存した同じデータを表・集計・グラフに反映する個人のフロントエンドデモです。顧客向けの実績ではありません。",
            "初版はブラウザのメモリだけを使用します。バックエンド、認証、DB、外部API、永続保存はありません。再読み込みで元のサンプルに戻ります。"
          ]
        },
        {
          "title": "機能ID",
          "items": [
            "F01 固定の架空データ、F02 複合フィルタ、F03 表・詳細・並べ替え、F04 編集・キャンセル、F05 入力検証。",
            "F06 集計、F07 日別折れ線グラフ、F08 カテゴリ別棒グラフ、F09 保存内容の同時反映、F10 サンプル初期化。"
          ]
        },
        {
          "title": "基本の流れ",
          "items": [
            "複数の日付・カテゴリ・状態と、同じ日付の複数注文を含む固定の架空データを表示します。",
            "検索・期間・状態・カテゴリを組み合わせ、日付または金額で並べ替えます。",
            "注文の詳細を開き、金額か状態を編集・検証して保存し、表・集計・2つのグラフの変化を確認します。",
            "編集のキャンセルは保存済みの値を維持します。サンプル初期化は注文・フィルタ・並び順・閉じた詳細状態を元に戻します。"
          ]
        },
        {
          "title": "注文データの規則",
          "items": [
            "1行は1商品の注文1件です。注文ID、注文日（YYYY-MM-DD）、商品名、カテゴリは読み取り専用です。IDは一意、商品名は空文字不可、カテゴリは固定リストの値とします。",
            "金額は0～1,000,000円の整数です。空欄・負数・小数・数値以外は保存できません。",
            "状態は保留・完了・キャンセルのいずれかです。金額と状態だけを編集でき、保存前に両方を検証して入力欄の近くに修正方法を示します。",
            "売上はサンプル内の完了注文の金額合計です。会計上の売上認識や実際の決済確認を意味しません。"
          ]
        },
        {
          "title": "検索と並べ替え",
          "items": [
            "注文ID・商品名を部分一致で検索し、前後の空白と英字の大文字・小文字を無視します。すべてのフィルタをANDで組み合わせます。",
            "期間は開始日と終了日を含み、空欄の境界は制限しません。開始日が終了日より後ならエラーを示し、最後に適用した有効な結果を維持します。",
            "状態・カテゴリを表と集計に共通で適用します。フィルタの初期化では保存した変更を取り消しません。",
            "日付・金額を昇順と降順で並べ替え、同値なら注文ID順にします。並べ替えで集計値は変わりません。",
            "フィルタ入力は下書きです。適用ボタンで検証し、有効なら反映します。日付が不正でも適用ボタンは編集案を破棄し、直前の有効な結果を維持します。入力だけでは編集を閉じません。"
          ]
        },
        {
          "title": "集計とグラフ",
          "items": [
            "対象の全注文数・完了注文数・完了注文の売上合計を表示します。保留・キャンセルは金額があっても売上に含めません。",
            "日別売上の折れ線グラフとカテゴリ別売上の棒グラフを表示します。表・集計と同じフィルタ結果を使用します。",
            "日別の軸は適用した期間とサンプル全体の日付範囲の重なりとし、空欄の境界にはサンプルの最初・最後の日を使います。範囲内の各日を表示し、完了注文のない日は0円とします。",
            "カテゴリの軸はフィルタで許可したカテゴリすべてとし、売上がないものは0円にします。該当注文0件、該当注文はあるが完了0件、完了注文の金額が0円の場合を区別します。",
            "タイトル・円の単位・日付やカテゴリ・値を示し、同じ集計の表も用意します。色やマウス操作だけに情報を頼りません。"
          ]
        },
        {
          "title": "編集・初期化・通知",
          "items": [
            "未保存の編集は表や集計に反映しません。保存で注文を更新し、詳細を閉じて完了を通知します。キャンセルでは編集案を破棄します。",
            "保存後に現在のフィルタから外れた注文は結果から除き、保存済みだが現在の条件には該当しないことを伝えます。",
            "フィルタ適用・フィルタ初期化・サンプル初期化は詳細を閉じて編集案を破棄します。入力だけでは閉じません。サンプル初期化は保存した変更も元に戻します。",
            "詳細を閉じたら元の行のボタンにフォーカスを戻します。行がなくなった場合は結果の案内か表の見出しに移します。"
          ]
        },
        {
          "title": "操作性と画面幅",
          "items": [
            "入力欄にラベルを付け、フィルタ・並べ替え・詳細・保存・キャンセル・初期化をキーボードで操作できるようにします。フォーカス、エラー、状態の案内を明確にします。",
            "狭い画面ではフィルタ・集計・グラフを縦に配置します。表だけに横スクロールを設け、ページ全体の横はみ出しを防ぎます。",
            "架空データであり、変更は現在の画面でのみ有効と表示します。ローカルストレージや外部サービスへの保存は行いません。",
            "資料タブへの切り替えでは操作状態を維持します。再読み込みと言語変更ではサンプル・フィルタ・並び順・編集案を初期化し、ローカル保存や外部書き込みはしません。"
          ]
        },
        {
          "title": "完了条件",
          "items": [
            "完了1,000円・完了2,000円・キャンセル9,000円の3件では、全3件・完了2件・売上3,000円です。各グラフの合計も3,000円になります。",
            "キャンセル注文を完了として保存すると12,000円、その注文の金額を4,000円で保存すると7,000円になります。",
            "元の3件でキャンセルだけに絞ると、表は1件・完了0件・売上0円です。",
            "複合フィルタが表・集計・グラフで一致し、並べ替えで合計が変わらないことを確認します。不正な金額・日付や編集キャンセルで正常な保存データを壊しません。",
            "保存による対象外、結果0件、完了0件、完了0円、注文のない日、初期化・再読み込みを確認します。モバイルとキーボードで基本操作を完了し、グラフと集計表を照合します。これは確認基準であり、現在のテスト結果ではありません。"
          ]
        },
        {
          "title": "初版に含めない機能",
          "paragraphs": [
            "CSV入出力、注文の追加・削除、リアルタイム更新、ログイン、外部EC連携、決済、複数通貨は含めません。Supabaseは、利用者ごとのデータ分離・権限・初期化・保存失敗・競合処理を決めた後の候補であり、採用は未確定です。"
          ]
        }
      ]
    },
    "design": {
      "title": "設計",
      "sections": [
        {
          "title": "実装の境界",
          "paragraphs": [
            "デモ・要件・設計・テスト設計の4タブを提供し、最初はデモを表示します。すべてのパネルをマウントしたままにし、タブの切り替えで注文・フィルタ・編集中の内容を保ちます。",
            "既存のAPI Rescue Labとは独立させます。静的な資料はサーバーで描画し、操作画面を別のClient Componentにします。再読み込みや言語の切り替えでは初期状態を作り直し、デモタブを表示します。"
          ]
        },
        {
          "title": "データモデル",
          "items": [
            "変更不能なOrderにid・orderDate・productName・category・amountYen・statusを定義します。OrderStatusはpending | completed | cancelledのリテラル共用体とし、カテゴリは固定サンプルから導きます。",
            "日付は時刻ではなく検証済みの暦日として扱います。形式と実在日を検証し、正規化したYYYY-MM-DDを比較します。日の列挙でも時差変換を行いません。",
            "固定サンプルは型付きの定数です。編集入力を変換・検証してから保存可能な注文を作り、表示ラベル・円表記はデータ値と分離します。"
          ]
        },
        {
          "title": "状態と更新",
          "items": [
            "ローカルのreducerで保存済み注文、入力中のフィルタ、最後に適用した有効なフィルタ、並び順、編集状態、通知を管理します。1画面のためにグローバルストアを追加しません。",
            "編集状態はclosed、または注文ID・文字列の金額入力・状態の編集案・入力エラーを持つeditingという判別可能な共用体にします。金額を文字列で持つことで、入力途中の空欄や不正値を保存済み数値と分離します。",
            "フィルタ入力は下書きです。適用ボタンで検証し、有効なら反映します。日付が不正でも適用ボタンは編集案を破棄し、直前の有効な結果を維持します。入力だけでは編集を閉じません。",
            "保存は金額と状態を検証し、該当注文だけを置き換えます。検証失敗では保存データを維持します。キャンセルは編集を閉じ、フィルタ初期化は保存済みの変更を維持し、サンプル初期化は初期状態を作り直します。"
          ]
        },
        {
          "title": "共通の集計経路",
          "items": [
            "純粋関数deriveViewが保存済みの注文を一度絞り込み、同じ結果から並べ替えた行・集計・日別売上・カテゴリ別売上を計算します。",
            "並べ替えは表だけに適用し、同値は注文ID順にします。絞り込み結果の完了注文を整数円で加算します。",
            "日別は適用期間とサンプル範囲の重なりに0円の日を補います。カテゴリ別は許可カテゴリを軸にして0円のカテゴリを補います。",
            "集計のコピーをreducer状態に持たず、effectによるグラフ同期も行いません。保存済み注文と適用済みフィルタから描画時に導出し、編集案を除外します。"
          ]
        },
        {
          "title": "画面構成とフォーカス",
          "items": [
            "ラベル付きフィルタ、集計、注文表、インライン詳細フォーム、2つのグラフ領域で構成します。汎用ダッシュボード基盤を作らず、見える役割ごとに分けます。",
            "表にはcaptionと列見出しを付け、ラベルのある並べ替え選択欄とaria-sortを使います。行の専用ボタンで見出し付きの詳細を開き、モーダルや行クリックだけの操作にしません。",
            "エラーを入力欄と関連付け、保存通知は消える可能性のある行の外に置いて穏やかに読み上げます。閉じた後は開いたボタン、行が消えた場合は結果見出しにフォーカスを移します。"
          ]
        },
        {
          "title": "グラフライブラリの選択",
          "items": [
            "Rechartsの宣言的なReactコンポーネントで折れ線・棒グラフ、軸、ツールチップ、レイアウトを構成します。手描きや命令的なインスタンス管理を増やさず、既存のReact構造に合わせられます。",
            "Chart.jsも有効なcanvas方式ですが、canvasとの接続かReact用ラッパーが必要です。SVGを手描きすると軸・ツールチップ・配置の作業が増えます。Recharts内部ではSVGを使いますが、ここではライブラリに描画を任せます。",
            "同じ計算結果をRechartsとHTMLの集計表に渡します。0基準・円単位を示し、結果なし・完了なし・有効な売上0を区別します。正確な値はホバーなしで確認できます。チャート開発ツールは追加しません。"
          ]
        },
        {
          "title": "画面幅と多言語",
          "items": [
            "狭い画面は1列、広い画面は読みやすいグラフ配置とします。横スクロールを表に限定し、ラベルと操作部を読める状態に保ちます。",
            "英語・日本語・韓国語で資料の意味を揃えます。画面文言は言語リソースで管理し、状態値と日付は言語から独立させ、円表記だけを表示時に整えます。",
            "キーボード順序、見えるフォーカス、入力の関連付け、状態通知、グラフと同値の表を確認します。色・マウス・動きだけに頼りません。"
          ]
        },
        {
          "title": "検証計画",
          "items": [
            "純粋関数で検索・日付の両端・複合条件・安定した並べ替え・集計をテストします。3,000円→12,000円→7,000円の例と、グラフ合計と集計の一致を確認します。",
            "不正な金額、日付の入力途中、キャンセル、編集中のフィルタ適用、状態フィルタ対象外への保存、初期化をreducerで確認します。結果0件・完了0件・0円・注文のない日も対象です。",
            "実装後は実ブラウザのデスクトップ・モバイルで、キーボード編集とフォーカス復帰を確認します。グラフと表を比較し、再読み込みで原本に戻ること、保存通信やストレージ書き込みがないことを確認します。",
            "4タブの操作、切り替え時の状態維持、再読み込み・言語変更での初期化を確認します。型検査とビルドは操作テストとブラウザ確認を補います。この資料はブラウザやモバイルの確認完了を主張しません。"
          ]
        },
        {
          "title": "将来の保存境界",
          "paragraphs": [
            "Supabaseへの接続設計は、本人識別・行の所有者・権限・共有デモの安全な初期化・失敗と競合の処理を決めてから行います。保存方法が変わっても売上・検索規則を保てるよう集計を純粋に保ちます。初版にDBスキーマ・認証情報・依存パッケージ・永続保存の約束は含めません。"
          ]
        }
      ]
    },
    "testDesign": {
      "title": "テスト設計",
      "sections": [
        {
          "title": "テストの範囲と証拠",
          "paragraphs": [
            "これはテスト設計であり、実行結果ではありません。ドメインはlib/data-operations.test.tsのD ID、操作画面はcomponents/data-operations-demo.test.tsxのU ID、タブはcomponents/project-documents.test.tsxのT IDで確認します。F01～F10とA01～A09を機能と完了条件に対応させ、実行結果は別に記録します。"
          ]
        },
        {
          "title": "資料タブ — 現在実行する確認",
          "items": [
            "T01: 各タブをクリックし、対応する見出しと資料だけが表示され、選択状態が1つであることを確認します。",
            "T02: 左右矢印・Home・Endでフォーカスと選択が移り、端では循環することを確認します。",
            "T03: 一覧・戻るリンクの遷移先、タブとパネルの関連付け、見えるフォーカス、タブ一覧の1つのTab停止位置、非表示パネル内にフォーカスが入らないことを確認します。",
            "T04: 英語・日本語・韓国語の資料文言を確認します。T05: 言語別URL・メタデータ確認に新ページを含めます。T06: 編集案を残して3つの資料タブを往復し、保持されることを確認します。実行結果はこの計画とは分けて記録します。"
          ]
        },
        {
          "title": "集計とreducerのケース",
          "items": [
            "F01・F06～F08 / A01: 完了1,000円・完了2,000円・キャンセル9,000円を入力し、全3件・完了2件・売上3,000円と各グラフ合計3,000円を確認します。",
            "F04・F05・F09 / A02: 9,000円の注文を完了として保存し12,000円、続けてその金額を4,000円で保存し7,000円になることを確認します。",
            "F02・F03・F06～F08 / A03～A04: 元の例をキャンセルで絞り、1件・完了0件・0円を確認します。検索・カテゴリ・両端を含む期間を組み合わせ、表と集計を照合します。並べ替えで合計は変わらず、同値はID順です。",
            "F02・F04・F05 / A05: 空欄・負数・小数・文字列・上限超過を保存できないこと、キャンセルで値が変わらないことを確認します。逆転した期間はエラーとなり、直前の正常結果を保ちます。",
            "F01・F06～F08 / A07: 結果0件・完了0件・完了0円・注文のない日で案内と0の系列を確認し、不正なグラフ座標が出ないことを確認します。"
          ]
        },
        {
          "title": "操作とブラウザの確認",
          "items": [
            "F04・F09 / A06: 状態フィルタ中に別の状態へ保存し、行が消えても保存案内と結果へのフォーカスが残ることを確認します。",
            "F02, F04, F10 / A05, A08: 編集中にフィルタを入力しただけなら編集案を維持します。適用ボタンは不正な日付でも編集案を破棄します。フィルタ初期化は保存を維持し、サンプル初期化・再読み込み・言語変更は原本を復元します。外部書き込みやローカル保存はしません。",
            "F03～F10 / A09: キーボードだけで基本操作を完了し、エラーとフォーカス復帰を確認します。デスクトップ・狭いモバイル画面でグラフと表の値を比較し、表だけが横スクロールすることを確認します。"
          ]
        }
      ]
    },
    "demoLabel": "デモ"
  },
  "ko": {
    "title": "데이터 운영 데모",
    "summary": "합성 주문을 검색·수정하고 같은 조건의 요약·매출 그래프를 확인하는 데모입니다. 요구사항·설계·테스트 설계를 함께 볼 수 있습니다.",
    "status": "조작 가능한 샘플 · 브라우저 메모리만 사용",
    "back": "프로젝트 목록으로",
    "tabsLabel": "프로젝트 데모와 문서",
    "requirementsLabel": "요구사항",
    "designLabel": "설계",
    "testDesignLabel": "테스트 설계",
    "requirements": {
      "title": "요구사항",
      "sections": [
        {
          "title": "목적과 범위",
          "paragraphs": [
            "가상의 주문을 탐색하고 수정하면 같은 저장 데이터가 표·요약·그래프에 반영되는 개인 프론트엔드 데모다. 실제 고객 업무 성과를 뜻하지 않는다.",
            "첫 버전은 브라우저 메모리만 사용한다. 백엔드·인증·DB·외부 API·영구 저장은 없다. 새로고침하면 원본 샘플로 돌아간다."
          ]
        },
        {
          "title": "기능 ID",
          "items": [
            "F01 고정 합성 샘플, F02 복합 필터, F03 표·상세·정렬, F04 편집·취소, F05 입력 검증.",
            "F06 요약, F07 날짜별 선 그래프, F08 카테고리별 막대 그래프, F09 저장 내용 동시 반영, F10 샘플 초기화."
          ]
        },
        {
          "title": "핵심 흐름",
          "items": [
            "여러 날짜·카테고리·상태와 같은 날짜의 복수 주문이 있는 고정 합성 샘플을 표시한다.",
            "검색·기간·상태·카테고리 필터를 조합하고 날짜 또는 금액으로 정렬한다.",
            "주문 상세를 열어 금액이나 상태를 수정하고 검증 후 저장해 표·요약·두 그래프의 변화를 확인한다.",
            "편집 취소는 저장된 값을 유지한다. 샘플 초기화는 주문·기본 필터·기본 정렬·닫힌 상세 상태를 복원한다."
          ]
        },
        {
          "title": "주문 데이터 계약",
          "items": [
            "한 행은 한 상품의 주문 한 건이다. 주문 ID·주문일(YYYY-MM-DD)·상품명·카테고리는 읽기 전용이다. ID는 유일하며 상품명은 비어 있지 않고 카테고리는 고정 목록의 값이다.",
            "금액은 0~1,000,000엔의 정수다. 빈 값·음수·소수·숫자가 아닌 입력은 저장하지 않는다.",
            "상태는 대기·완료·취소 중 하나다. 금액과 상태만 수정하며 저장 전에 둘 다 검증하고 필드 옆에 수정 가능한 오류를 표시한다.",
            "매출은 샘플의 완료 주문 금액 합계다. 회계상 매출 인식이나 실제 결제 검증을 뜻하지 않는다."
          ]
        },
        {
          "title": "검색과 정렬",
          "items": [
            "주문 ID와 상품명을 부분 일치로 검색하며 양끝 공백과 영문 대소문자를 무시한다. 모든 필터는 AND로 결합한다.",
            "날짜 양 끝을 포함하고 빈 경계는 제한하지 않는다. 시작일이 종료일보다 늦으면 오류를 설명하고 마지막으로 적용한 정상 결과를 유지한다.",
            "상태·카테고리 조건을 표와 집계에 똑같이 적용한다. 필터 초기화는 저장한 수정을 되돌리지 않는다.",
            "날짜와 금액의 오름차순·내림차순을 제공하고 동률은 주문 ID 순으로 고정한다. 정렬은 집계값에 영향을 주지 않는다.",
            "필터 입력은 초안이며 적용 버튼에서 검증·반영한다. 잘못된 날짜여도 적용 버튼은 열린 편집 초안을 폐기하고 마지막 정상 결과를 유지한다. 입력만 바꾸면 편집은 유지한다."
          ]
        },
        {
          "title": "요약과 그래프",
          "items": [
            "현재 조건의 전체 주문 수·완료 주문 수·완료 주문 매출을 표시한다. 대기·취소 주문은 금액이 있어도 매출에서 제외한다.",
            "날짜별 매출 선 그래프와 카테고리별 매출 막대 그래프를 제공한다. 표·요약과 같은 필터 결과를 사용한다.",
            "날짜 축은 적용한 기간과 전체 샘플 날짜 범위의 교집합이다. 열린 경계는 샘플 최초일·최종일을 사용한다. 범위의 모든 날짜를 표시하고 완료 주문이 없는 날은 0엔이다.",
            "카테고리 축은 필터가 허용한 모든 카테고리이며 매출이 없으면 0엔이다. 결과 0건·주문은 있지만 완료 0건·완료 주문 금액이 0인 경우를 구분한다.",
            "제목·엔 단위·날짜나 카테고리·값을 표시하고 같은 집계의 데이터 표도 제공한다. 색이나 포인터 올리기에만 정보를 의존하지 않는다."
          ]
        },
        {
          "title": "편집·초기화·안내",
          "items": [
            "편집 초안은 표·집계에 반영하지 않는다. 저장하면 한 주문을 갱신하고 상세를 닫아 완료를 알린다. 취소하면 초안만 폐기한다.",
            "저장한 주문이 현재 필터에서 빠지면 결과에서 제거하고 저장됐지만 현재 조건에서 제외됐음을 안내한다.",
            "필터 적용·필터 초기화·샘플 초기화는 상세를 닫고 편집 초안을 폐기한다. 필터를 입력하는 것만으로는 닫지 않는다. 샘플 초기화는 저장한 변경도 되돌린다.",
            "상세를 닫으면 열었던 행의 버튼으로 포커스를 돌린다. 행이 사라졌다면 결과 안내나 표 제목으로 이동한다."
          ]
        },
        {
          "title": "접근성과 반응형",
          "items": [
            "입력에 label을 제공한다. 키보드로 필터·정렬·상세·저장·취소·초기화를 조작하며 포커스와 오류·상태 안내를 명확하게 표시한다.",
            "좁은 화면에서는 필터·요약·그래프를 세로 배치한다. 표에만 별도의 가로 스크롤을 허용해 페이지 전체가 넘치지 않게 한다.",
            "합성 샘플이며 변경은 현재 화면에서만 유지된다고 안내한다. 로컬 저장소나 외부 서비스에 저장하지 않는다.",
            "문서 탭 전환은 운영 상태를 유지한다. 새로고침과 언어 이동은 샘플·필터·정렬·편집 초안을 초기화하며 로컬 저장소와 외부 서비스에는 쓰지 않는다."
          ]
        },
        {
          "title": "완료 기준",
          "items": [
            "완료 1,000엔·완료 2,000엔·취소 9,000엔은 전체 3건·완료 2건·매출 3,000엔이다. 각 그래프 합계도 3,000엔이다.",
            "취소 주문을 완료로 저장하면 매출은 12,000엔이다. 그 주문의 금액을 4,000엔으로 저장하면 7,000엔이다.",
            "원래 세 주문에서 취소 상태만 필터하면 표 1건·완료 0건·매출 0엔이다.",
            "복합 필터를 표·요약·그래프가 동일하게 반영하며 정렬만 바꾸면 합계가 유지된다. 잘못된 금액·날짜와 편집 취소는 저장된 정상 데이터를 훼손하지 않는다.",
            "필터 밖으로 저장, 결과 0건, 완료 0건, 완료 0엔, 주문 없는 날짜, 초기화·새로고침을 확인한다. 모바일과 키보드로 핵심 흐름을 완료하고 그래프와 데이터 표를 대조한다. 이는 완료 기준이며 실제 실행 결과와 구분한다."
          ]
        },
        {
          "title": "첫 버전 제외 범위",
          "paragraphs": [
            "CSV 가져오기·내보내기, 주문 추가·삭제, 실시간 갱신, 로그인, 외부 EC 연동, 결제, 다중 통화는 제외한다. Supabase는 사용자별 데이터 분리·권한·초기화·저장 실패·충돌 처리 방식을 정한 뒤 검토할 후속 후보이며 도입은 확정하지 않았다."
          ]
        }
      ]
    },
    "design": {
      "title": "설계",
      "sections": [
        {
          "title": "구현 경계",
          "paragraphs": [
            "데모·요구사항·설계·테스트 설계의 네 탭을 제공하고 처음에는 데모를 연다. 모든 패널을 마운트한 채 비선택 패널만 숨겨 탭 전환 시 주문·필터·편집 초안을 유지한다.",
            "기존 API Rescue Lab과 독립시킨다. 정적 문서는 서버에서 렌더링하고 운영 화면은 별도 Client Component로 둔다. 새로고침과 언어 이동은 초기 상태를 다시 구성하고 데모 탭으로 돌아간다."
          ]
        },
        {
          "title": "도메인 모델",
          "items": [
            "불변 Order에 id·orderDate·productName·category·amountYen·status를 정의한다. OrderStatus는 pending | completed | cancelled 리터럴 유니온이며 카테고리는 고정 샘플 목록에서 도출한다.",
            "날짜는 시각이 아닌 검증된 달력 날짜다. 형식과 실제 존재하는 날짜를 확인하고 정규화한 YYYY-MM-DD를 비교한다. 날짜 나열에도 시간대 변환을 사용하지 않는다.",
            "고정 샘플은 타입이 지정된 상수다. 편집 입력을 변환·검증한 뒤 저장 주문을 만들고 표시 라벨과 엔 형식은 도메인 값에서 분리한다."
          ]
        },
        {
          "title": "상태와 전이",
          "items": [
            "로컬 reducer가 저장된 주문·입력 중 필터·마지막 정상 적용 필터·정렬·편집 상태·안내를 소유한다. 한 화면을 위해 전역 저장소를 추가하지 않는다.",
            "편집 상태는 closed 또는 주문 ID·문자열 금액 입력·상태 초안·필드 오류를 가진 editing의 판별 유니온으로 표현한다. 금액을 문자열로 유지해 빈 값과 잘못된 입력 중에도 저장된 숫자를 훼손하지 않는다.",
            "필터 입력은 초안이며 적용 버튼에서 검증·반영한다. 잘못된 날짜여도 적용 버튼은 열린 편집 초안을 폐기하고 마지막 정상 결과를 유지한다. 입력만 바꾸면 편집은 유지한다.",
            "저장은 금액을 파싱하고 상태를 검사해 해당 주문만 교체한다. 검증 실패는 저장 데이터를 유지한다. 취소는 편집을 닫고 필터 초기화는 저장된 수정을 유지하며 샘플 초기화는 초기 상태를 새로 구성한다."
          ]
        },
        {
          "title": "하나의 계산 경로",
          "items": [
            "순수 함수 deriveView가 저장된 주문을 한 번 필터링해 같은 결과에서 정렬된 행·요약·날짜별 매출·카테고리별 매출을 계산한다.",
            "정렬은 표의 표시 순서에만 적용하고 동률은 주문 ID로 정한다. 필터 결과 중 완료 주문을 정수 엔 단위로 더한다.",
            "날짜 축은 적용 기간과 샘플 범위의 교집합에서 누락 날짜를 0으로 채운다. 카테고리 축은 허용 카테고리에서 누락 값을 0으로 채운다.",
            "집계 복사본을 reducer 상태로 저장하거나 effect로 그래프를 동기화하지 않는다. 저장된 주문과 적용 필터에서 렌더링 시 계산하고 편집 초안은 제외한다."
          ]
        },
        {
          "title": "화면 구성과 포커스",
          "items": [
            "라벨 있는 필터·요약·주문 표·인라인 상세 폼·두 그래프 영역으로 구성한다. 범용 대시보드 프레임워크 대신 화면에서 맡는 역할에 따라 나눈다.",
            "표에 caption과 열 제목을 제공하고 label이 있는 정렬 선택기와 aria-sort를 사용한다. 명시적인 행 버튼으로 제목 있는 상세 영역을 열며 모달이나 행 클릭만으로 조작하지 않는다.",
            "입력과 오류를 연결하고 사라질 수 있는 행 밖에 저장 안내를 두어 차분하게 알린다. 닫을 때 연 버튼으로 복귀하고 행이 제외됐으면 결과 제목으로 포커스를 옮긴다."
          ]
        },
        {
          "title": "그래프 라이브러리 선택",
          "items": [
            "Recharts의 선언적 React 컴포넌트로 선·막대 그래프, 축, 툴팁과 레이아웃을 구성한다. 직접 그리거나 명령형 차트 인스턴스 수명주기를 관리하지 않고 기존 React 구조에 맞춘다.",
            "Chart.js도 가능한 canvas 대안이지만 canvas 연결이나 React 래퍼가 필요하다. SVG 직접 구현은 축·툴팁·배치 작업이 늘어난다. Recharts 내부 출력은 SVG지만 그래프를 직접 그리는 대신 라이브러리에 맡기는 선택이다.",
            "동일한 계산 결과를 Recharts와 의미 있는 HTML 집계 표에 전달한다. 0 기준선·엔 단위를 유지하고 결과 없음·완료 없음·유효한 매출 0을 구분한다. 정확한 값은 툴팁 없이도 확인할 수 있다. 차트 개발 도구는 추가하지 않는다."
          ]
        },
        {
          "title": "반응형과 다국어",
          "items": [
            "좁은 화면은 한 열로, 넓은 화면은 읽기 좋은 그래프 배치로 구성한다. 가로 스크롤은 표 영역에 한정하고 라벨과 조작부를 읽을 수 있게 한다.",
            "영어·일본어·한국어 문서의 의미를 맞춘다. UI 문구는 언어 리소스로 관리하고 도메인 상태와 날짜는 언어와 독립시킨다. 엔 형식은 표시할 때만 적용한다.",
            "키보드 순서·보이는 포커스·입력 연결·상태 안내·그래프와 같은 값의 표를 확인한다. 색·포인터 올리기·움직임에만 의존하지 않는다."
          ]
        },
        {
          "title": "검증 계획",
          "items": [
            "순수 함수에서 검색·날짜 양 끝·복합 조건·결정적 정렬·집계를 테스트한다. 3,000엔→12,000엔→7,000엔 예시와 각 그래프 합계가 요약과 같은지 확인한다.",
            "잘못된 금액·날짜 초안·취소·편집 중 필터 적용·상태 필터 밖으로 저장·초기화의 reducer 동작을 확인한다. 결과 0건·완료 0건·0엔·주문 없는 날짜도 포함한다.",
            "구현 후 실제 브라우저의 데스크톱·모바일에서 키보드 편집과 포커스 복귀를 확인한다. 그래프와 표를 대조하고 새로고침 복원 및 외부 저장 통신·스토리지 쓰기가 없음을 확인한다.",
            "네 탭과 키보드 이동, 탭 전환 시 데모 상태 유지, 새로고침·언어 이동 시 초기화를 확인한다. 타입 검사와 빌드는 동작 테스트와 브라우저 확인을 보완한다. 이 문서 자체가 브라우저·모바일 확인 완료를 뜻하지 않는다."
          ]
        },
        {
          "title": "후속 저장 경계",
          "paragraphs": [
            "Supabase 조회·저장 경계는 사용자 식별·행 소유권·권한·공유 데모 초기화·실패와 충돌 처리 방식을 정한 뒤 설계한다. 저장 기술이 달라져도 매출·필터 규칙을 유지하도록 계산을 순수하게 둔다. 첫 버전에 DB 스키마·인증 정보·의존성·영구 저장 약속을 포함하지 않는다."
          ]
        }
      ]
    },
    "testDesign": {
      "title": "테스트 설계",
      "sections": [
        {
          "title": "테스트 계층과 근거",
          "paragraphs": [
            "이 문서는 테스트 설계이며 실행 결과가 아니다. 도메인은 lib/data-operations.test.ts의 D ID, 운영 화면은 components/data-operations-demo.test.tsx의 U ID, 탭은 components/project-documents.test.tsx의 T ID로 확인한다. F01~F10과 A01~A09를 기능·완료 기준에 연결하고 실제 실행 결과는 별도로 기록한다."
          ]
        },
        {
          "title": "문서 탭 — 현재 실행 대상",
          "items": [
            "T01: 각 탭을 클릭하면 해당 제목과 문서만 표시되고 선택된 탭은 하나이며 다른 패널은 숨겨진다.",
            "T02: 탭에 포커스를 두고 좌우 화살표·Home·End를 누르면 예상 탭으로 포커스와 선택이 이동하며 양 끝에서 순환한다.",
            "T03: 프로젝트 목록과 돌아가기 링크의 목적지, 탭·패널 연결, 보이는 포커스, 탭 목록 내 하나의 Tab 정지점, 숨긴 패널 내부의 포커스 제외를 확인한다.",
            "T04: 영어·일본어·한국어 문서 문구의 구성을 확인한다. T05: 다국어 경로·메타데이터 검사가 새 페이지를 포함한다. T06: 미저장 편집을 남긴 채 문서 세 탭을 왕복해 초안 유지를 확인한다. 실행 결과는 계획과 구분해 기록한다."
          ]
        },
        {
          "title": "도메인과 reducer 사례",
          "items": [
            "F01·F06~F08 / A01: 완료 1,000엔·완료 2,000엔·취소 9,000엔에서 전체 3건·완료 2건·매출 3,000엔과 각 그래프 합계 3,000엔을 확인한다.",
            "F04·F05·F09 / A02: 9,000엔 주문을 완료로 저장해 12,000엔, 이어 같은 주문 금액을 4,000엔으로 저장해 7,000엔이 표·요약·그래프에 반영되는지 확인한다.",
            "F02·F03·F06~F08 / A03~A04: 원본을 취소로 필터하면 1건·완료 0건·0엔이다. 검색·카테고리·양 끝 포함 기간을 조합해 주문 ID와 집계를 대조한다. 정렬을 뒤집어도 합계는 유지되고 동률은 ID 순이다.",
            "F02·F04·F05 / A05: 빈 값·음수·소수·문자·상한 초과 금액은 저장을 거부하며 원본을 유지한다. 편집 취소도 값을 바꾸지 않는다. 역전된 기간은 오류와 마지막 정상 적용 결과를 유지한다.",
            "F01·F06~F08 / A07: 결과 0건·완료 0건·완료 0엔·주문 없는 날짜의 안내와 0으로 채운 계열을 확인하고 잘못된 그래프 좌표가 없는지 확인한다."
          ]
        },
        {
          "title": "사용 흐름과 브라우저 확인",
          "items": [
            "F04·F09 / A06: 상태 필터에서 다른 상태로 저장한다. 행이 사라져도 저장 이유 안내와 결과 제목의 포커스가 남아야 한다.",
            "F02, F04, F10 / A05, A08: 편집 중 필터 입력만 바꾸면 초안을 유지한다. 적용 버튼은 날짜 오류가 있어도 편집을 폐기한다. 필터 초기화는 저장된 수정을 유지하고 샘플 초기화·새로고침·언어 이동은 원본을 복원한다. 외부 쓰기와 로컬 저장은 없다.",
            "F03~F10 / A09: 키보드로 필터·정렬·편집·저장·취소·초기화를 완료하고 입력 오류와 포커스 복귀를 확인한다. 데스크톱·좁은 모바일 화면에서 그래프와 표를 대조하고 표만 가로 스크롤되는지 확인한다."
          ]
        }
      ]
    },
    "demoLabel": "데모"
  }
} satisfies Record<Locale, DataOperationsCopy>;
