import type { Locale } from "../lib/i18n";

type Document = {
  title: string;
  sections: readonly { title: string; paragraphs?: readonly string[]; items?: readonly string[] }[];
};

type Copy = {
  title: string; summary: string; hero: string; heroBody: string; previewHint: string;
  time: string; lastKnownNotice: string; tabsLabel: string;
  openDemo: string; backLanding: string; building: string; selectedDevice: string;
  deviceList: string; details: string; trend: string; values: string; room: string;
  operation: string; temperature: string; lastKnownTemperature: string; setTemperature: string;
  lastReceived: string; freshness: string; current: string; stale: string; missing: string;
  running: string; stopped: string; selected: string; reference: string; sampleNotice: string;
  featuresTitle: string; features: readonly { title: string; body: string }[];
  flowTitle: string; flow: readonly string[]; ctaTitle: string; ctaBody: string;
  tabs: { demo: string; requirements: string; design: string; testDesign: string };
  documents: { requirements: Document; design: Document; testDesign: Document };
  rooms: { lounge: string; meeting: string; office: string };
};

const messages: Record<Locale, Copy> = {
  en: {
    time: "Time", lastKnownNotice: "The operating status and temperature are the last received values, not live readings.", tabsLabel: "Service overview and project documents",
    title: "HVAC Monitoring Concept",
    summary: "A service landing page and a separate monitoring demo with sample building and air-conditioning data.",
    hero: "See every room. Understand each unit.",
    heroBody: "Locate air-conditioning units in a building view, check their operating status and see when their readings were received.",
    previewHint: "Select a unit to preview its room, operating status and temperature. This is an illustrative building cutaway.",
    openDemo: "Open monitoring demo", backLanding: "Back to service overview",
    building: "Sample building", selectedDevice: "Selected unit", deviceList: "All units",
    details: "Unit details", trend: "Room temperature trend", values: "View temperature data",
    room: "Room", operation: "Operating status", temperature: "Room temperature",
    lastKnownTemperature: "Last received temperature", setTemperature: "Set temperature",
    lastReceived: "Last received", freshness: "Data freshness", current: "Received at reference time",
    stale: "Older data", missing: "No reading",
    running: "Running", stopped: "Stopped", selected: "Selected", reference: "Sample reference time",
    sampleNotice: "Personal concept with fixed sample data. No live connection or equipment controls. Reloading or changing language restores the initial selection.",
    featuresTitle: "From location to context",
    features: [
      { title: "Find the right unit", body: "Use the building cutaway to connect each unit with its floor and room." },
      { title: "Read status clearly", body: "Check operation and temperature together, with a separate indication of data freshness." },
      { title: "Look beyond one reading", body: "Open the demo to explore unit details and the temperature trend. Missing readings remain visible as gaps." },
    ],
    flowTitle: "A simple path to the details", flow: ["Find a room in the building", "Select its air-conditioning unit", "Review its readings in the demo"],
    ctaTitle: "Explore the monitoring view", ctaBody: "Select units from the building or list, then compare their details and temperature history.",
    tabs: { demo: "Service overview", requirements: "Requirements", design: "Design", testDesign: "Test design" },
    rooms: { lounge: "Lounge", meeting: "Meeting room", office: "Office" },
    documents: {
      requirements: { title: "Requirements", sections: [
        { title: "Purpose and scope", paragraphs: ["This personal concept separates a service landing page from a read-only monitoring demo. It uses one sample building, three floors and three units; it does not reproduce a real product or customer system."] },
        { title: "Landing page · L01–L03", items: ["Explain the purpose, provide a building preview and link to the separate monitoring demo.", "Selecting a preview unit shows its room, operating status and temperature. Explain when the displayed information is older.", "Describe three features and the building-to-unit-to-detail flow. Do not add application forms, customer claims or simulated controls."] },
        { title: "Monitoring demo · M01–M04", items: ["The cutaway and full list select the same unit. AC-101 is selected initially; selecting it again keeps it selected.", "Show room, operation, room temperature, set temperature, last received time and data freshness for the selected unit.", "Show the selected unit’s 06:00–14:00 temperature trend and an equivalent values table.", "Use a fixed reference of 2026-09-15 14:00 JST. AC-301 last received data at 13:00; its 12:00 and 14:00 trend readings are missing."] },
        { title: "Data and accessibility · Q01–Q04", items: ["Keep operation separate from data freshness. Older data does not imply equipment failure or stopped operation.", "Preserve missing readings as null, show no reading instead of 0°C, and do not connect chart lines across gaps.", "Use keyboard-operable buttons, visible focus, textual selection and status labels. Selecting a unit must not move focus unexpectedly.", "Support English, Japanese and Korean, and widths down to 320px. Reloading or changing language restores AC-101; document tabs preserve the mounted preview selection."] },
      ] },
      design: { title: "Design", sections: [
        { title: "Two pages, two levels of detail", paragraphs: ["The landing route /{locale}/lab/hvac-monitoring explains the service with a small interactive preview. The /demo route contains the full list, detail and chart. Requirements, design and test design remain available as landing-page tabs."] },
        { title: "Shared data, local selection", items: ["A typed, fixed fixture is the source for unit IDs, floors, room keys, operation, timestamps and nullable readings.", "Each page owns one selected unit ID. Its building view and information panels derive from that ID rather than keeping separate copies of selected data.", "The same building component supports both pages. Page navigation starts a new selection; tab changes keep the existing mounted preview."] },
        { title: "Temperature and time", items: ["Recharts renders the temperature line in °C. Missing points remain null and connectNulls is false; the values table uses the same readings.", "Freshness is evaluated against the fixed sample reference, never the visitor’s clock. Older readings are labelled as last received values.", "No networking, database, persistent storage, equipment controls or automatic fault assessment is included."] },
      ] },
      testDesign: { title: "Test design", sections: [
        { title: "Evidence boundary", paragraphs: ["These are test cases and expected outcomes, not a statement that every check has passed. Automated tests cover data rules and interactions; a browser review checks layout, navigation and the rendered chart."] },
        { title: "Automated cases", items: ["T01 / M01: Initial selection is AC-101; selecting from either building or list updates the same unit’s details.", "T02 / M01, Q03: Repeated selection stays selected, exposes its pressed state and leaves focus on the clicked button.", "T03 / M04, Q01: AC-301 remains running with older data, the 13:00 last received value and a clear freshness explanation.", "T04 / Q02: Null readings display no reading rather than 0°C. The fixed fixture has nine hourly points and AC-301 has gaps at 12:00 and 14:00.", "T05 / L02, Q04: Preview selection updates its small card; switching document tabs preserves that selection."] },
        { title: "Browser cases", items: ["T06 / L01–L03: Landing CTAs open the separate demo, and its return link opens the overview.", "T07 / M03, Q02: The temperature chart and table agree; missing points produce gaps without invented measurements.", "T08 / Q03–Q04: Check keyboard selection, visible focus, document tabs, three languages and layout at 1280, 1024, 768, 390 and 320px.", "T09 / Q04: Reload and language navigation restore AC-101. No overflow escapes the content area, apart from an explicitly scrollable data table."] },
      ] },
    },
  },
  ja: {
    time: "時刻", lastKnownNotice: "運転状態と温度は、最後に受信した値です。現在の状態を示すものではありません。", tabsLabel: "サービス紹介とプロジェクト文書",
    title: "空調モニタリング コンセプト",
    summary: "建物と空調機のサンプルデータを使った、サービス紹介ページとモニタリングデモです。",
    hero: "部屋の場所から、空調の状態まで。",
    heroBody: "建物の断面図から空調機を選び、運転状態と温度、データの受信時刻を確認できます。",
    previewHint: "空調機を選ぶと、部屋・運転状態・温度を表示します。断面図は説明用のイメージです。",
    openDemo: "モニタリングデモを開く", backLanding: "サービス紹介に戻る",
    building: "サンプルの建物", selectedDevice: "選択中の空調機", deviceList: "空調機一覧",
    details: "空調機の詳細", trend: "室温の推移", values: "温度データを見る",
    room: "部屋", operation: "運転状態", temperature: "室温", lastKnownTemperature: "最後に受信した室温",
    setTemperature: "設定温度", lastReceived: "最終受信時刻", freshness: "データの更新状態",
    current: "基準時刻に受信", stale: "以前のデータ", missing: "受信データなし",
    running: "運転中", stopped: "停止中", selected: "選択中", reference: "サンプルの基準時刻",
    sampleNotice: "個人制作のコンセプトです。固定のサンプルデータを使用し、実機との接続や操作は行いません。再読み込みや言語変更で、最初の選択に戻ります。",
    featuresTitle: "場所と状態を、つなげて確認",
    features: [
      { title: "空調機の場所がわかる", body: "断面図で、空調機が設置された階と部屋を確認できます。" },
      { title: "状態をわかりやすく表示", body: "運転状態と室温に加え、データがいつ受信されたかを分けて表示します。" },
      { title: "温度の変化も確認", body: "デモでは詳細と温度の推移を確認できます。受信していない時刻は、グラフの欠損として示します。" },
    ],
    flowTitle: "場所から詳細へ、3つのステップ", flow: ["建物から部屋を探す", "空調機を選ぶ", "デモで詳細と温度の推移を見る"],
    ctaTitle: "モニタリング画面を試す", ctaBody: "断面図や一覧から空調機を選び、詳細と温度の推移を確認できます。",
    tabs: { demo: "サービス紹介", requirements: "要件", design: "設計", testDesign: "テスト設計" },
    rooms: { lounge: "ラウンジ", meeting: "会議室", office: "オフィス" },
    documents: {
      requirements: { title: "要件", sections: [
        { title: "目的と範囲", paragraphs: ["サービス紹介と閲覧専用のモニタリングデモを分けた個人制作のコンセプトです。サンプルの建物1棟、3フロア、空調機3台を使用します。実在の製品や顧客システムの再現ではありません。"] },
        { title: "紹介ページ · L01–L03", items: ["サービスの目的、断面図のプレビュー、別ページのデモへのリンクを設けます。", "空調機を選ぶと部屋・運転状態・室温を表示します。古いデータである場合は、その旨を説明します。", "3つの特徴と、建物・空調機・詳細を確認する流れを示します。申込フォーム、顧客実績、動かない操作ボタンは設けません。"] },
        { title: "モニタリングデモ · M01–M04", items: ["断面図と一覧は同じ空調機を選択します。初期選択はAC-101で、再度選んでも選択は解除しません。", "部屋、運転状態、室温、設定温度、最終受信時刻、データの更新状態を表示します。", "選択中の空調機の06:00〜14:00の室温グラフと、同じ値の表を表示します。", "基準時刻は2026-09-15 14:00 JSTに固定します。AC-301の最終受信は13:00で、12:00と14:00の値は欠損です。"] },
        { title: "データと操作性 · Q01–Q04", items: ["運転状態と更新状態を分けます。古いデータから故障や停止を推測しません。", "欠損値はnullで保ち、0°Cに置き換えません。グラフも欠損をまたいで線をつなぎません。", "キーボードで操作できるボタン、見えるフォーカス、文字による状態表示を提供します。選択時にフォーカスを強制移動しません。", "英語・日本語・韓国語と320px幅まで対応します。再読み込みと言語変更は初期選択に戻り、文書タブの切り替えでは選択を保ちます。"] },
      ] },
      design: { title: "設計", sections: [
        { title: "説明と詳細を別ページに", paragraphs: ["/{locale}/lab/hvac-monitoringでは小さな操作体験でサービスを紹介し、/demoでは一覧・詳細・グラフを表示します。紹介ページのタブから要件・設計・テスト設計も読めます。"] },
        { title: "共通データと選択状態", items: ["型のある固定データに、ID・階・部屋・運転状態・受信時刻・欠損を含む温度データをまとめます。", "ページごとに選択中のIDを1つ持ち、断面図と情報欄は同じIDから表示内容を求めます。", "断面図は両ページで共通です。ページ移動では選択を初期化し、文書タブの切り替えでは保持します。"] },
        { title: "温度と時刻の扱い", items: ["Rechartsで°C単位の折れ線を表示します。欠損はnull、connectNullsはfalseとし、表も同じデータを使います。", "更新状態は固定の基準時刻で判断し、閲覧時の時計には依存しません。古い値は最後に受信した値として表示します。", "通信、DB、永続保存、実機操作、自動の故障判定は行いません。"] },
      ] },
      testDesign: { title: "テスト設計", sections: [
        { title: "確認方法", paragraphs: ["以下は確認項目と期待結果です。すべての確認が完了したことを示すものではありません。自動テストでデータと操作を、ブラウザで配置・移動・グラフの描画を確認します。"] },
        { title: "自動テスト", items: ["T01 / M01: 初期選択はAC-101。断面図と一覧のどちらから選んでも、同じ空調機の詳細に更新される。", "T02 / M01, Q03: 同じ空調機を再選択しても選択を保ち、押下状態を示す。フォーカスは操作したボタンに残る。", "T03 / M04, Q01: AC-301は運転中のまま、13:00の最終受信値と古いデータの説明を示す。", "T04 / Q02: 欠損を0°Cにしない。毎時9点のデータを持ち、AC-301の12:00と14:00は欠損となる。", "T05 / L02, Q04: 紹介ページの選択で小さな情報欄が更新され、文書タブを切り替えても選択を保つ。"] },
        { title: "ブラウザ確認", items: ["T06 / L01–L03: 紹介ページのリンクでデモを開き、戻るリンクで紹介ページを開く。", "T07 / M03, Q02: グラフと表の値が一致し、欠損部分を線でつながない。", "T08 / Q03–Q04: キーボード、フォーカス、文書タブ、3言語、1280・1024・768・390・320px幅を確認する。", "T09 / Q04: 再読み込みと言語変更でAC-101に戻る。明示的にスクロールできる表を除き、横にはみ出さない。"] },
      ] },
    },
  },
  ko: {
    time: "시각", lastKnownNotice: "운전 상태와 온도는 마지막으로 수신한 값이며 현재 상태를 나타내지 않습니다.", tabsLabel: "서비스 소개와 프로젝트 문서",
    title: "공조 모니터링 콘셉트", summary: "건물과 공조기 샘플 데이터로 구성한 서비스 소개 페이지와 별도의 모니터링 데모입니다.",
    hero: "공간의 위치부터, 공조기의 상태까지.",
    heroBody: "건물 단면도에서 공조기를 선택하고, 운전 상태와 온도, 데이터 수신 시점을 함께 확인하세요.",
    previewHint: "공조기를 선택하면 공간·운전 상태·온도를 보여줍니다. 단면도는 설명용 이미지입니다.",
    openDemo: "모니터링 데모 열기", backLanding: "서비스 소개로 돌아가기", building: "샘플 건물",
    selectedDevice: "선택한 공조기", deviceList: "공조기 목록", details: "공조기 상세", trend: "실내 온도 추이", values: "온도 데이터 보기",
    room: "공간", operation: "운전 상태", temperature: "실내 온도", lastKnownTemperature: "마지막 수신 온도", setTemperature: "설정 온도",
    lastReceived: "마지막 수신 시각", freshness: "데이터 갱신 상태", current: "기준 시점에 수신", stale: "이전 데이터",
    missing: "수신값 없음", running: "운전 중", stopped: "정지", selected: "선택됨", reference: "샘플 기준 시점",
    sampleNotice: "고정된 샘플 데이터를 사용한 개인 콘셉트 작품입니다. 실제 기기와 연결하거나 제어하지 않습니다. 새로고침하거나 언어를 변경하면 초기 선택으로 돌아갑니다.",
    featuresTitle: "위치와 상태를 연결해서 확인",
    features: [
      { title: "설치 위치를 한눈에", body: "건물 단면도에서 공조기가 설치된 층과 공간을 확인합니다." },
      { title: "상태를 명확하게", body: "운전 상태와 실내 온도를 함께 확인하고, 데이터 갱신 여부는 별도로 표시합니다." },
      { title: "한 번의 측정 너머로", body: "데모에서 상세 정보와 온도 변화를 확인합니다. 수신값이 없는 시점은 그래프의 빈 구간으로 남깁니다." },
    ],
    flowTitle: "공간에서 상세까지, 세 단계", flow: ["건물에서 공간 찾기", "공조기 선택하기", "데모에서 상세와 온도 추이 확인하기"],
    ctaTitle: "모니터링 화면을 살펴보세요", ctaBody: "단면도나 목록에서 공조기를 선택하고, 상세 정보와 온도 추이를 확인할 수 있습니다.",
    tabs: { demo: "서비스 소개", requirements: "요구사항", design: "설계", testDesign: "테스트 설계" },
    rooms: { lounge: "라운지", meeting: "회의실", office: "업무공간" },
    documents: {
      requirements: { title: "요구사항", sections: [
        { title: "목표와 범위", paragraphs: ["서비스 소개와 읽기 전용 모니터링 데모를 분리한 개인 콘셉트입니다. 샘플 건물 1개, 3개 층, 공조기 3대를 사용합니다. 실제 제품이나 고객 시스템을 재현하지 않습니다."] },
        { title: "랜딩 페이지 · L01–L03", items: ["서비스의 목적, 건물 미리보기, 별도 모니터링 데모로 이동하는 CTA를 제공합니다.", "공조기를 선택하면 공간·운전 상태·실내 온도만 간결하게 보여주고, 이전 데이터인 경우 이를 안내합니다.", "세 가지 특징과 건물→기기→상세 흐름을 설명합니다. 신청 양식, 고객 실적, 동작하지 않는 제어 버튼은 넣지 않습니다."] },
        { title: "모니터링 데모 · M01–M04", items: ["단면도와 목록은 같은 기기를 선택합니다. 초기 선택은 AC-101이며 다시 선택해도 해제하지 않습니다.", "선택한 기기의 공간·운전 상태·실내 온도·설정 온도·마지막 수신 시각·갱신 상태를 표시합니다.", "06:00~14:00 실내 온도 추이와 같은 값의 표를 제공합니다.", "기준 시점은 2026-09-15 14:00 JST입니다. AC-301의 마지막 수신은 13:00이며 12:00와 14:00 값은 없습니다."] },
        { title: "데이터와 접근성 · Q01–Q04", items: ["운전 상태와 갱신 상태를 구분합니다. 이전 데이터만으로 고장이나 정지를 추론하지 않습니다.", "미수신값은 null로 보존하고 0°C로 바꾸지 않습니다. 그래프도 빈 구간을 가로질러 연결하지 않습니다.", "키보드 버튼, 보이는 포커스, 글자로 된 선택·상태 안내를 제공합니다. 선택 시 포커스를 강제로 옮기지 않습니다.", "영어·일본어·한국어와 320px 이상 화면을 지원합니다. 새로고침·언어 변경은 초기 선택으로, 문서 탭 전환은 기존 선택을 유지합니다."] },
      ] },
      design: { title: "설계", sections: [
        { title: "설명과 상세를 나눈 두 페이지", paragraphs: ["/{locale}/lab/hvac-monitoring은 작은 체험으로 서비스를 소개하고, /demo는 전체 목록·상세·그래프를 제공합니다. 소개 페이지의 탭에서 요구사항·설계·테스트 설계도 읽을 수 있습니다."] },
        { title: "공유 데이터와 페이지별 선택", items: ["타입을 정의한 고정 데이터에 ID·층·공간 키·운전 상태·수신 시각·미수신을 포함한 온도값을 모읍니다.", "페이지마다 선택한 기기 ID 하나만 관리합니다. 단면도와 정보 영역은 같은 ID에서 표시 내용을 구합니다.", "단면도 컴포넌트는 두 페이지에서 공유합니다. 페이지 이동은 선택을 초기화하고 문서 탭 전환은 유지합니다."] },
        { title: "온도와 시간 표현", items: ["Recharts로 °C 단위 꺾은선 그래프를 표시합니다. null과 connectNulls=false로 빈 구간을 유지하며 표도 같은 값을 사용합니다.", "갱신 상태는 고정된 샘플 기준 시점으로 판단합니다. 방문자의 현재 시각에 의존하지 않으며 이전 값은 마지막 수신값이라고 안내합니다.", "통신·DB·영구 저장·실기기 제어·자동 고장 판정은 포함하지 않습니다."] },
      ] },
      testDesign: { title: "테스트 설계", sections: [
        { title: "검증 범위", paragraphs: ["아래는 테스트 항목과 기대 결과이며 전체 통과를 뜻하지 않습니다. 자동 테스트는 데이터 규칙과 상호작용을, 브라우저 검토는 배치·이동·실제 그래프 표시를 확인합니다."] },
        { title: "자동 테스트", items: ["T01 / M01: 초기 선택은 AC-101이며 단면도·목록 어느 쪽에서 선택해도 같은 기기의 상세로 갱신한다.", "T02 / M01, Q03: 같은 기기를 다시 선택해도 유지하고 눌림 상태를 표시한다. 포커스는 누른 버튼에 남는다.", "T03 / M04, Q01: AC-301은 운전 중을 유지하며 13:00 마지막 수신값과 이전 데이터 안내를 표시한다.", "T04 / Q02: 미수신값은 0°C가 되지 않는다. 매시 9개 지점이 있고 AC-301의 12:00와 14:00는 null이다.", "T05 / L02, Q04: 미리보기 선택에 따라 작은 정보 카드가 바뀌며 문서 탭 전환 뒤에도 선택을 유지한다."] },
        { title: "브라우저 확인", items: ["T06 / L01–L03: 랜딩 CTA는 별도 데모로, 데모의 돌아가기 링크는 소개 페이지로 이동한다.", "T07 / M03, Q02: 그래프와 표의 값이 같고 미수신 구간을 연결하거나 값을 만들지 않는다.", "T08 / Q03–Q04: 키보드·포커스·문서 탭·세 언어와 1280·1024·768·390·320px 배치를 확인한다.", "T09 / Q04: 새로고침·언어 변경은 AC-101로 돌아간다. 명시적으로 스크롤하는 표 외에 화면을 가로로 넘치지 않는다."] },
      ] },
    },
  },
};

export function hvacMessages(locale: Locale): Copy {
  return messages[locale];
}

export type HvacMessages = ReturnType<typeof hvacMessages>;
