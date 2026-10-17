import type { Locale } from "../lib/i18n";

export const dataOperationsUi = {
  en: {
    title: "Sample order workspace", intro: "Fictional orders. Changes stay in this page's memory and reset on reload.",
    query: "Search orders or products", start: "Start date", end: "End date", status: "Status", category: "Category", all: "All", apply: "Apply filters", resetFilters: "Reset filters", resetSample: "Reset sample (discards edits)",
    filterError: "Check the dates: use valid dates with the start on or before the end. Previous results are still shown.",
    sort: "Sort orders", dateAsc: "Date: oldest first", dateDesc: "Date: newest first", amountAsc: "Amount: low to high", amountDesc: "Amount: high to low",
    results: "Order results", total: "Orders", completed: "Completed orders", revenue: "Revenue (JPY)", daily: "Daily revenue", byCategory: "Revenue by category", values: "View chart values", date: "Date", id: "Order ID", product: "Product", amount: "Amount (JPY)", action: "Details", edit: "Edit", editor: "Order details", save: "Save changes", cancel: "Cancel editing",
    editHint: "Only saved changes affect results. Applying or resetting filters discards the open draft.", amountError: "Enter a whole number from 0 to 1,000,000, without separators.", noResults: "No orders match these filters.", noCompleted: "Matching orders exist, but none are completed. Revenue is zero.", zeroRevenue: "Completed orders exist, with total revenue of zero.", saved: "Changes saved.", excluded: "Changes saved. This order no longer matches the current filters.", cancelled: "Edits discarded.", filtered: "Filters applied. Any open edit was discarded.", filterReset: "Filters reset. Saved edits are kept; any open edit was discarded.", sampleReset: "Original sample restored. Filters, sort and edits were reset.",
    statuses: { pending: "Pending", completed: "Completed", cancelled: "Cancelled" }, categories: { stationery: "Stationery", home: "Home", accessories: "Accessories" },
  },
  ja: {
    title: "サンプル注文の管理", intro: "架空の注文データです。変更はこの画面内だけで保持し、再読み込みで元に戻ります。",
    query: "注文ID・商品名で検索", start: "開始日", end: "終了日", status: "状態", category: "カテゴリー", all: "すべて", apply: "絞り込みを適用", resetFilters: "絞り込みを解除", resetSample: "サンプルを初期化（編集を破棄）",
    filterError: "日付を確認してください。開始日は終了日以前にしてください。直前の正常な結果を表示しています。",
    sort: "注文の並び順", dateAsc: "日付：古い順", dateDesc: "日付：新しい順", amountAsc: "金額：低い順", amountDesc: "金額：高い順",
    results: "注文一覧", total: "注文数", completed: "完了注文数", revenue: "売上（円）", daily: "日別売上", byCategory: "カテゴリー別売上", values: "集計値を見る", date: "注文日", id: "注文ID", product: "商品名", amount: "金額（円）", action: "詳細", edit: "編集", editor: "注文の詳細", save: "変更を保存", cancel: "編集を取り消す",
    editHint: "保存した変更だけが集計に反映されます。絞り込みの適用・解除で編集中の内容は破棄されます。", amountError: "0〜1,000,000の整数を、区切り文字なしで入力してください。", noResults: "条件に一致する注文はありません。", noCompleted: "一致する注文はありますが、完了注文がないため売上は0円です。", zeroRevenue: "完了注文はありますが、売上合計は0円です。", saved: "変更を保存しました。", excluded: "変更を保存しました。この注文は現在の条件から外れました。", cancelled: "編集内容を破棄しました。", filtered: "絞り込みを適用しました。編集中の内容は破棄しました。", filterReset: "絞り込みを解除しました。保存済みの変更は保持し、編集中の内容は破棄しました。", sampleReset: "元のサンプルに戻しました。絞り込み・並び順・編集を初期化しました。",
    statuses: { pending: "保留", completed: "完了", cancelled: "キャンセル" }, categories: { stationery: "文房具", home: "生活用品", accessories: "アクセサリー" },
  },
  ko: {
    title: "샘플 주문 관리", intro: "가상의 주문 데이터입니다. 변경은 현재 화면 메모리에만 유지되며 새로고침하면 원본으로 돌아갑니다.",
    query: "주문 ID·상품명 검색", start: "시작일", end: "종료일", status: "상태", category: "카테고리", all: "전체", apply: "필터 적용", resetFilters: "필터 초기화", resetSample: "샘플 초기화 (편집 내용 삭제)",
    filterError: "날짜를 확인하세요. 시작일은 종료일과 같거나 이전이어야 합니다. 마지막 정상 결과를 표시하고 있습니다.",
    sort: "주문 정렬", dateAsc: "날짜: 오래된 순", dateDesc: "날짜: 최신 순", amountAsc: "금액: 낮은 순", amountDesc: "금액: 높은 순",
    results: "주문 결과", total: "전체 주문 수", completed: "완료 주문 수", revenue: "매출 (엔)", daily: "날짜별 매출", byCategory: "카테고리별 매출", values: "집계 값 보기", date: "주문일", id: "주문 ID", product: "상품명", amount: "금액 (엔)", action: "상세", edit: "편집", editor: "주문 상세", save: "변경 저장", cancel: "편집 취소",
    editHint: "저장한 변경만 집계에 반영됩니다. 필터 적용·초기화 시 편집 중인 내용은 삭제됩니다.", amountError: "0~1,000,000의 정수를 구분 기호 없이 입력하세요.", noResults: "필터에 맞는 주문이 없습니다.", noCompleted: "조건에 맞는 주문은 있지만 완료 주문이 없어 매출은 0엔입니다.", zeroRevenue: "완료 주문은 있지만 매출 합계는 0엔입니다.", saved: "변경을 저장했습니다.", excluded: "변경을 저장했습니다. 이 주문은 현재 필터 조건에서 제외되었습니다.", cancelled: "편집 내용을 취소했습니다.", filtered: "필터를 적용했습니다. 편집 중인 내용은 삭제되었습니다.", filterReset: "필터를 초기화했습니다. 저장한 변경은 유지하고 편집 중인 내용은 삭제했습니다.", sampleReset: "원본 샘플로 복원했습니다. 필터·정렬·편집 상태를 초기화했습니다.",
    statuses: { pending: "대기", completed: "완료", cancelled: "취소" }, categories: { stationery: "문구", home: "생활용품", accessories: "액세서리" },
  },
} satisfies Record<Locale, unknown>;
