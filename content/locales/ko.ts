import type { Messages } from "../messages";

const messages = {
  technologyLabels: { dataVisualization: "데이터 시각화" },
  shell: { skip: "본문으로 이동", backToTop: "맨 위로", footer: "J. Ha · 프론트엔드 엔지니어", portfolio: "포트폴리오" },
  roles: { "Frontend Engineer": "프론트엔드 엔지니어", "Full-Stack Engineer": "풀스택 엔지니어", "Software Engineer": "소프트웨어 엔지니어" },
  metadata: {
    home: { title: "J. Ha | 프론트엔드 엔지니어", description: "안정적으로 사용할 수 있는 웹 애플리케이션을 만드는 프론트엔드 엔지니어. React, TypeScript, API 연동, 기존 애플리케이션 유지보수 경험을 소개합니다." },
    work: { title: "실무 경력 | J. Ha", description: "프론트엔드 개발, 애플리케이션 개발과 유지보수, 디버깅에 관한 재직 이력과 담당 업무." },
    lab: { title: "Lab | J. Ha", description: "J. Ha의 프론트엔드 개인 프로젝트." },
    detail: { title: "API Rescue Lab | J. Ha", description: "응답이 느리거나 실패하거나 잘못된 데이터를 포함할 때 프론트엔드가 유용한 화면을 유지하는 방법을 보여주는 샘플 작업 로컬 시뮬레이션." },
  },
  home: {
    greeting: "안녕하세요, J. Ha입니다 · 프론트엔드 엔지니어",
    headline: "안정적으로 사용할 수 있는 웹 애플리케이션을 만드는 프론트엔드 엔지니어.",
    introduction: "프론트엔드 애플리케이션을 개발하고 유지보수하며 문제를 해결합니다. React, TypeScript, API 연동, AWS·서버리스 환경과 운영 중인 기존 코드베이스에서 일한 경험이 있습니다.",
    viewWork: "실무 경력 보기", exploreLab: "Lab 둘러보기", workEyebrow: "01 / 실무 경력", experienceTitle: "주요 개발 경험", allWork: "전체 경력 보기",
    labEyebrow: "02 / 개인 프로젝트", labTitle: "주요 Lab", viewLab: "Lab 보기", aboutEyebrow: "03 / 소개", aboutTitle: "프론트엔드 중심 개발과 기존 시스템 경험.",
    about: "주로 일본에서 약 9년의 실무 경력을 쌓은 프론트엔드 중심 소프트웨어 엔지니어입니다. 데이터 중심 화면, 모니터링 애플리케이션, 업그레이드와 운영 환경 디버깅을 경험했습니다.",
    portfolioStack: "이 포트폴리오는 Next.js, React, TypeScript로 만들었습니다.",
    skills: { frontend: "프론트엔드", integration: "연동 경험", practice: "개발 실무", practiceItems: "기존 애플리케이션 유지보수, 디버깅, 단위 테스트, 통합 테스트 지원, Git" },
    workflowTitle: "일하는 방식",
    workflow: [
      { title: "이해", text: "코드를 읽고 기존 동작을 따라갑니다." },
      { title: "재현", text: "문제가 발생하는 조건을 찾습니다." },
      { title: "수정", text: "문제의 원인이 있는 곳에 필요한 변경을 적용합니다." },
      { title: "검증", text: "의도한 동작과 관련된 실패 상황을 확인합니다." },
    ],
    contactEyebrow: "04 / 연락", contactTitle: "개발하거나 개선할 애플리케이션이 있나요?", contactText: "프론트엔드 개발, 유지보수 또는 기존 코드베이스의 문제에 관해 연락해 주세요.", email: "J. Ha에게 이메일 보내기",
  },
  work: {
    eyebrow: "실무 경력", title: "실무 경력", introduction: "기존 시스템에서 수행한 프론트엔드 개발, 애플리케이션 유지보수와 결함 조사 경험입니다.", employment: "재직 기간", selectedWork: "주요 담당 업무", project: "프로젝트 기간",
    items: {
      dataAnalytics: { title: "데이터 분석 플랫폼", description: "데이터 분석 플랫폼의 React·TypeScript 화면을 개발하고 유지보수했습니다. 시계열 시각화 컴포넌트 개발과 BI 솔루션 커스터마이징을 담당했습니다." },
      hvac: { title: "공조 모니터링·관리 시스템", description: "Python·AWS Lambda 서비스와 연동하는 Angular 기반 공조 모니터링·관리 시스템을 개발하고 유지보수했습니다. Angular 프론트엔드를 업그레이드하고 모니터링 기능을 추가했으며, 장치와 관리 시스템 사이의 통신 프로토콜 문제를 해결했습니다." },
      existingBusiness: { title: "기존 업무 웹 애플리케이션", description: "환경·브라우저 관련 작업에서 약 150개 화면을 검증했습니다. JavaScript, PL/SQL, HTML, CSS 코드를 추적해 결함을 조사하고 확인한 문제를 수정했습니다." },
      redevelopment: { title: "업무 웹 애플리케이션 재개발", description: "기존 업무 웹 애플리케이션의 재개발에 참여했습니다. 프론트엔드와 백엔드의 사용자 정의 애플리케이션 로직을 구현하고 단위 테스트와 통합 테스트 지원을 수행했습니다." },
      webDevelopment: { title: "웹 애플리케이션 개발", description: "AWS Amplify·Serverless Framework로 웹 애플리케이션을 개발하고 인증 관련 기능, 사용자 관리와 멀티미디어 기능을 구현했습니다. 코드 리뷰를 통해 팀과 협업했습니다." },
      platformMaintenance: { title: "내부 플랫폼 유지보수", description: "내부 데이터 마이닝 플랫폼을 유지보수했습니다." },
      systemMaintenance: { title: "기존 시스템 유지보수·마이그레이션", description: "보험 영업용 Windows 태블릿 시스템과 기존 업무 애플리케이션을 유지보수했습니다. Windows 10 마이그레이션을 지원하고 단위 테스트 문서를 작성했습니다." },
    },
  },
  lab: {
    eyebrow: "개인 프로젝트", title: "Lab", introduction: "느린 응답, 실패와 잘못된 데이터에 대응하면서 작업 목록과 상태를 이해하기 쉽게 보여주는 프론트엔드 시뮬레이션입니다.", projects: "프로젝트", cardOverline: "개인 프로젝트 · 로컬 시뮬레이션 / 샘플 데이터",
    homeSummary: "API가 느리거나 실패하거나 잘못된 데이터를 반환할 때도 프론트엔드가 유용한 화면을 유지하는 모습을 확인하세요.", indexSummary: "샘플 작업 데이터를 사용하는 로컬 시뮬레이션에서 네 가지 응답 조건을 시험해 보세요. 응답을 검증하고 실패에 대응하며, 이전에 불러온 작업이 있으면 화면에 유지하는 동작을 확인할 수 있습니다.", openProject: "프로젝트 열기",
  },
  detail: {
    back: "Lab으로 돌아가기", eyebrow: "개인 프로젝트 · 로컬 시뮬레이션 / 샘플 데이터", introduction: "응답이 느리거나 실패하거나 잘못된 데이터를 포함해도 사용자에게는 명확한 상태와 이전에 불러온 유효한 작업이 필요합니다.", instruction: "'정상'을 실행하고 실패 조건을 시험한 뒤, 다시 '정상'을 실행하세요.", simulation: "인터랙티브 시뮬레이션", simulator: "인터랙티브 시뮬레이터", demonstrates: "이 데모에서 확인할 수 있는 동작",
    demonstrations: ["응답과 스키마를 검증해 잘못된 작업 응답을 화면에 표시하기 전에 거부합니다.", "실패해도 이전에 불러온 유효한 작업을 유지합니다. 불러온 작업이 없다면 빈 상태를 표시합니다.", "오래된 요청의 완료 결과가 새로운 상태를 덮어쓰지 못하는지 reducer 테스트로 검증합니다.", "타임아웃과 실패 원인을 설명하고, 예측 가능한 재시도와 복구 방법을 제공합니다."],
    stepsTitle: "네 단계로 체험하기", steps: ["'정상'을 실행해 검증된 샘플 작업을 불러옵니다.", "'잘못된 데이터' 또는 '서버 오류'를 실행하고 상태와 유지된 작업을 확인합니다.", "'느린 응답'을 실행합니다. 응답은 4초 후에 도착하도록 설정되어 있지만 2초에 타임아웃됩니다.", "'정상'을 선택하고 다시 실행해 복구합니다."], retry: "재시도는 선택한 실패 조건을 다시 실행합니다.",
    evidence: {
      title: "소스 코드와 테스트 근거",
      observable: "데모에서 로딩, 타임아웃, 서버 오류, 잘못된 데이터, 작업 유지, 재시도, '정상' 복구를 체험할 수 있습니다. 아래 GitHub 링크에서 구현과 테스트를 확인하세요.",
      tested: "요청 ID로 오래되거나 순서가 뒤바뀐 완료 결과를 거부하는지는 reducer 테스트로 검증합니다. 요청을 겹쳐 실행하는 데모 시나리오가 아니라 코드 테스트로 확인하는 보장입니다.",
      uiSource: "시뮬레이터 UI 소스", logicSource: "reducer·검증·시뮬레이션 소스", componentTests: "컴포넌트 동작 테스트", reducerTests: "완료 순서가 뒤바뀌는 경우의 테스트",
    },
  },
} satisfies Messages;

export default messages;
