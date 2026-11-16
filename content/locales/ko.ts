import type { Messages } from "../messages";

const messages = {
  technologyLabels: { dataVisualization: "데이터 시각화" },
  shell: { skip: "본문으로 이동", backToTop: "맨 위로", footer: "J. H. · 프론트엔드 엔지니어", portfolio: "포트폴리오" },
  roles: { "Frontend Engineer": "프론트엔드 엔지니어", "Full-Stack Engineer": "풀스택 엔지니어", "Software Engineer": "소프트웨어 엔지니어" },
  metadata: {
    home: { title: "J. H. | 프론트엔드 엔지니어", description: "안정적으로 사용할 수 있는 웹 애플리케이션을 만드는 프론트엔드 엔지니어. React, TypeScript, API 연동, 기존 애플리케이션 유지보수 경험을 소개합니다." },
    work: { title: "실무 경력 | J. H.", description: "프론트엔드 개발, 애플리케이션 개발과 유지보수, 디버깅에 관한 재직 이력과 담당 업무." },
    lab: { title: "Lab | J. H.", description: "J. H.의 프론트엔드 개인 프로젝트." },
    detail: { title: "API Rescue Lab | J. H.", description: "응답이 느리거나 실패하거나 잘못된 데이터를 포함할 때 프론트엔드가 유용한 화면을 유지하는 방법을 보여주는 샘플 작업 로컬 시뮬레이션." },
  },
  home: {
    greeting: "안녕하세요, J. H.입니다 · 프론트엔드 엔지니어",
    headline: "안정적으로 사용할 수 있는 웹 애플리케이션을 만드는 프론트엔드 엔지니어.",
    introduction: "React·TypeScript·Angular를 중심으로 웹 애플리케이션을 개발하고 유지보수합니다. 기존 사양·코드·DB에서 문제를 좁히고, 해결에 필요한 API·백엔드·AWS까지 조사해 구현합니다.",
    viewWork: "실무 경력 보기", exploreLab: "Lab 둘러보기", workEyebrow: "01 / 실무 경력", experienceTitle: "주요 개발 경험", allWork: "전체 경력 보기",
    labEyebrow: "02 / 개인 프로젝트", labTitle: "주요 Lab", viewLab: "Lab 보기", aboutEyebrow: "03 / 소개", aboutTitle: "프론트엔드 중심 개발과 기존 시스템 경험.",
    about: "주로 일본에서 약 9년의 실무 경험을 쌓은 프론트엔드 중심의 소프트웨어 엔지니어입니다. 사양·기존 코드·DB를 대조하고 불명확한 부분을 확인한 뒤 구현합니다. 복잡한 카드 UI 배치 계산을 CSS Grid·Flex로 개선하고, Webpack으로 기존 JavaScript와의 공존을 검증해 TypeScript의 단계적 도입을 제안했습니다. 동료에게 디버깅과 조사 방법을 공유하고, 스스로 개발을 진행할 수 있도록 지원합니다.",
    portfolioStack: "이 포트폴리오는 Next.js, React, TypeScript로 만들었습니다.",
    skills: { frontend: "프론트엔드", integration: "연동 경험", practice: "개발 실무", practiceItems: "기존 애플리케이션 유지보수, 디버깅, 단위 테스트, 통합 테스트 지원, Git", certification: "보유 자격" },
    workflowTitle: "일하는 방식",
    workflow: [
      { title: "이해", text: "사양·코드·DB 제약을 대조하고 불일치와 불명확한 부분을 확인합니다." },
      { title: "재현", text: "문제가 발생하는 조건을 찾습니다." },
      { title: "수정", text: "문제의 원인이 있는 곳에 필요한 변경을 적용합니다." },
      { title: "검증", text: "의도한 동작과 관련된 실패 상황을 확인합니다." },
    ],
    contactEyebrow: "04 / 연락", contactTitle: "개발하거나 개선할 애플리케이션이 있나요?", contactText: "업무 상담이나 자세한 경력 정보는 이 포트폴리오를 전달받은 채널로 문의해 주세요.",
  },
  work: {
    eyebrow: "실무 경력", title: "실무 경력", introduction: "프론트엔드 개발, 애플리케이션 유지보수와 결함 조사 경험을 업무 종류로 정리했습니다. 기간은 연도까지만 표시하고 회사명과 정확한 월은 공개하지 않습니다.", employment: "재직 기간", selectedWork: "주요 담당 업무", project: "프로젝트 기간",
    contexts: { experience1: "업무 웹 애플리케이션 개발", experience2: "서버리스 웹 개발", experience3: "데이터 분석 화면 개발", experience4: "업무 애플리케이션 유지보수" },
    currentActivity: {
      title: "휴양과 업무 복귀 준비",
      careerBreak: "마지막 실무 프로젝트가 끝난 후 건강상의 이유로 휴양했습니다. 회사에는 이듬해까지 재직했습니다.",
      preparation: "기술 학습과 개인 개발을 통해 업무 복귀를 준비하고 있습니다. React·TypeScript로 이 포트폴리오와 API Rescue Lab을 만들고, 아래 AWS 자격증을 취득했습니다.",
    },
    items: {
      businessMaintenance: { title: "기존 업무 시스템 수정", description: "Java·Spring으로 기존 업무 시스템을 수정하고 jQuery로 예산 관리 화면을 구현했습니다." },
      biReporting: { title: "BI 리포트 화면 개발·유지보수", description: "PHP로 업무용 리포트 화면을 구현하고, 데이터 검색·표시 속도 개선과 BI 솔루션 Jedox 유지보수를 담당했습니다." },
      assetApi: { title: "IT 자산 관리 시스템 API 개발", description: "DB 테이블 정의·ER 다이어그램, Swagger API 명세와 PlantUML 시퀀스 다이어그램을 작성했습니다. 동료의 조언을 받아 설계를 구체화하고, 문서를 구현·리뷰의 기준으로 사용했습니다. TypeScript·Node.js API 구현과 Jest 단위 테스트 코드 작성을 담당했습니다." },
      dataAnalytics: { title: "데이터 분석 플랫폼", description: "React 기반 시계열 시각화 기능을 개발·유지보수하고, 내부 데이터 과학자의 전처리를 위한 그래프 화면을 구현했습니다. 신규 기능부터 TypeScript를 단계적으로 도입하는 방안을 제안하고, Webpack 설정을 수정해 기존 JavaScript와의 공존을 검증했습니다. 팀에서 채택되어 타입 검사로 구현 오류를 조기에 발견하는 데 도움이 됐습니다. 기존 EC2의 변경을 줄이는 AWS ALB 구성을 조사하고 인증서·라우팅 설정을 포함한 HTTPS 적용도 담당했습니다. 시각화 기능에 필요한 Python 백엔드 처리도 확인·수정했습니다." },
      hvac: { title: "공조 모니터링·관리 시스템", description: "Python·AWS Lambda 서비스와 연동하는 Angular 기반 공조 모니터링·관리 시스템을 개발하고 유지보수했습니다. Angular 업그레이드, 모니터링 기능 추가, 장치와 관리 시스템 사이의 통신 프로토콜 결함 조사·수정을 담당했습니다. Python·AWS Lambda를 이용한 백엔드 작업과 서비스 연동을 포함한 수정에도 대응했습니다." },
      existingBusiness: { title: "기존 업무 웹 애플리케이션", description: "IE에서 Edge로 전환하는 과정에서 화면을 검증했습니다. 기존 사양과 JavaScript·PL/SQL·HTML·CSS 코드를 추적해 원인과 수정 지점을 찾고, 결함 수정·검증과 통합 테스트를 담당했습니다." },
      redevelopment: { title: "업무 웹 애플리케이션 재개발", description: "로우코드 환경에서 프론트엔드·백엔드의 사용자 정의 로직 구현, 단위 테스트와 통합 테스트 지원을 담당했습니다. 검증 처리와 화면 공통 로직을 공통 함수로 정리했습니다. 유사 화면·설계서·기존 코드·DB 제약을 대조하고, 계산식과 문자열 길이의 불일치를 설계 담당자와 확인·수정해 문서에도 반영했습니다. 복잡한 JavaScript 카드 배치 제어를 CSS Grid·Flex 중심으로 바꿔 PC·태블릿·스마트폰에 공통으로 대응했습니다. 화면 배치와 업무 로직을 분리해 설계 변경·유지보수를 쉽게 했으며 다른 개발자도 유사 화면에 응용했습니다. 신입 개발자에게 디버깅과 조사 방법을 공유해 담당 화면을 스스로 진행하도록 지원했습니다. 동료의 프론트엔드 기술 상담에 대응하고 구현 과정의 문제 해결을 지원했습니다." },
      webDevelopment: { title: "의료 앱 관리 사이트 개발", description: "선임자가 정리한 요구사항에 따라 Vue.js·Nuxt로 클리닉의 권한 설정, 환자·검사 정보 관리 화면을 구현했습니다. Cognito 회원 관리·인증, Lambda 기반 GraphQL·REST API, 동영상·음성 재생과 DynamoDB를 고려한 페이지네이션도 담당했습니다. 코드 리뷰에 참여하고 웹 앱 개발에서 Serverless Framework도 사용했습니다." },
      platformMaintenance: { title: "내부 플랫폼 유지보수", description: "내부 데이터 마이닝 플랫폼을 유지보수했습니다." },
      systemMaintenance: { title: "기존 시스템 유지보수·전환 지원", description: "보험 영업용 Windows 태블릿 시스템의 유지보수·운영과 Windows 10 전환을 지원했습니다. 설계서에 따른 테스트, 조작 매뉴얼·단위 테스트 문서 작성, 브라우저·Windows·레지스트리 설정 조사도 담당했습니다." },
    },
  },
  lab: {
    eyebrow: "개인 프로젝트", title: "Lab", introduction: "API 오류 대응, 데이터 처리, 공조 서비스 콘셉트를 체험할 수 있는 프론트엔드 개인 프로젝트를 소개합니다.", projects: "프로젝트", cardOverline: "개인 프로젝트 · 로컬 시뮬레이션 / 샘플 데이터",
    homeSummary: "API가 느리거나 실패하거나 잘못된 데이터를 반환할 때도 프론트엔드가 유용한 화면을 유지하는 모습을 확인하세요.", indexSummary: "샘플 작업 데이터를 사용하는 로컬 시뮬레이션에서 네 가지 응답 조건을 시험해 보세요. 응답을 검증하고 실패에 대응하며, 이전에 불러온 작업이 있으면 화면에 유지하는 동작을 확인할 수 있습니다.", openProject: "프로젝트 열기",
  },
  detail: {
    back: "Lab으로 돌아가기", eyebrow: "개인 프로젝트 · 로컬 시뮬레이션 / 샘플 데이터", introduction: "응답이 느리거나 실패하거나 잘못된 데이터를 포함해도 사용자에게는 명확한 상태와 이전에 불러온 유효한 작업이 필요합니다.", instruction: "'정상'을 실행하고 실패 조건을 시험한 뒤, 다시 '정상'을 실행하세요.", simulation: "인터랙티브 시뮬레이션", simulator: "인터랙티브 시뮬레이터", demonstrates: "이 데모에서 확인할 수 있는 동작",
    demonstrations: ["응답과 스키마를 검증해 잘못된 작업 응답을 화면에 표시하기 전에 거부합니다.", "실패해도 이전에 불러온 유효한 작업을 유지합니다. 불러온 작업이 없다면 빈 상태를 표시합니다.", "오래된 요청의 완료 결과가 새로운 상태를 덮어쓰지 못하는지 reducer 테스트로 검증합니다.", "타임아웃과 실패 원인을 설명하고, 예측 가능한 재시도와 복구 방법을 제공합니다."],
    stepsTitle: "네 단계로 체험하기", steps: ["'정상'을 실행해 검증된 샘플 작업을 불러옵니다.", "'잘못된 데이터' 또는 '서버 오류'를 실행하고 상태와 유지된 작업을 확인합니다.", "'느린 응답'을 실행합니다. 응답은 4초 후에 도착하도록 설정되어 있지만 2초에 타임아웃됩니다.", "'정상'을 선택하고 다시 실행해 복구합니다."], retry: "재시도는 선택한 실패 조건을 다시 실행합니다.",
    evidence: {
      title: "구현 확인",
      observable: "데모에서 로딩, 타임아웃, 서버 오류, 잘못된 데이터, 작업 유지, 재시도, '정상' 복구를 체험할 수 있습니다.",
      tested: "요청 ID로 오래되거나 순서가 뒤바뀐 완료 결과를 거부하는지는 reducer 테스트로 검증합니다. 요청을 겹쳐 실행하는 데모 시나리오가 아니라 코드 테스트로 확인하는 보장입니다.",
    },
  },
} satisfies Messages;

export default messages;
