# 프리랜서 포트폴리오 설계

## 개정 이력

- 2026-09-30. Next.js 포트폴리오 MVP와 API Rescue Lab의 최초 설계를 확정했다.
- 2026-10-01. 네 개 경로, 전체 재직 이력, 반응형 내비게이션, Lab의 설명 순서를 반영했다.
- 2026-10-01. 현재 UI와 동작을 기준으로 공개 설계를 정리했다.
- 2026-10-02. 영어·일본어·한국어의 정적 언어 경로, 언어 선택 저장, 메타데이터와 Lab 번역 계약을 확정했다(ADR-0005).

이 문서는 포트폴리오의 의도한 동작을 정하는 단일 공개 설계 기준이다. 구현과 검증은 이 기준을 따른다. 시각 참고 이미지는 레이아웃과 스타일의 참고자료이며, 경력 사실이나 기능 요구사항의 출처가 아니다.

## 목표와 방문자

영어를 기본으로 영어·일본어·한국어를 지원하는 개인 소개 사이트다. 실제 경력과 담당 가능한 업무를 전달하고, 인터랙티브 데모 하나로 frontend 문제 해결 방식을 보여준다. 모든 언어의 회사, 역할, 기간, 책임, 기술과 사실 범위는 동일하다. 자연스러운 번역은 허용하지만 새로운 경력 주장은 추가하지 않는다.

주요 방문자는 Upwork 클라이언트, 일본 프리랜서 에이전시, SaaS·Web·IoT 관련 회사, LinkedIn을 통해 방문하는 채용 담당자와 개발자다. 링크 하나로 소개, 경력, 데모, 연락 방법을 확인할 수 있어야 한다.

## 공개 이름과 개인정보 기준

- 화면과 공개 메타데이터에는 `J. Ha`를 사용한다.
- 이메일과 LinkedIn 연락 링크는 `content/portfolio.ts`에서 관리한다.
- 재직 회사명은 텍스트로 표시한다. 프로젝트 설명에는 공개 가능한 시스템 종류와 직접 수행한 작업만 사용한다.
- 회사 로고, 주소, 전화번호, 위치, 업무 가능 여부 배지는 표시하지 않는다.
- 공개 경력 문구의 앱 출처는 `content/portfolio.ts`다.

## 포지셔닝과 경력 표현

주 역할은 Frontend Engineer다. React와 TypeScript, API integration, 기존 앱 유지보수, debugging과 production issue analysis를 중심에 둔다. AWS와 serverless 경험은 실제 담당 범위를 설명하는 보조 근거로 사용한다.

Hero 권장 문구는 다음과 같다.

> Frontend Engineer focused on reliable web applications

보조 문구는 다음과 같다.

> I build, maintain, and debug frontend applications, with experience in React, TypeScript, API integration, AWS/serverless systems, and existing production codebases.

핵심 메시지는 기존 웹앱을 이해하고 문제를 재현하며 필요한 수정을 구현하고 검증할 수 있다는 점이다. 새 기능 구현도 가능한 frontend 엔지니어라는 인상을 유지한다.

경력 문구에는 다음 기준을 적용한다.

- 약 9년은 frontend 중심 전체 경력이다. React나 TypeScript를 각각 9년 사용했다는 표현으로 바꾸지 않는다.
- 업무 시스템, SaaS, 데이터 플랫폼, 모니터링 시스템 경험은 확인된 사실만 표시한다.
- 각 사례는 시스템의 상황, 직접 맡은 일, 확인 가능한 결과를 짧게 설명한다.
- 재직 기간과 개별 프로젝트 기간을 별도 정보로 표시한다. 문서에 없는 프로젝트 기간은 추정하지 않는다. Strike System의 재직 종료일을 마지막 프로젝트의 작업 종료일로 표현하지 않는다.
- 확인되지 않은 성과 수치, 시스템 규모, 리더십 책임은 만들지 않는다.
- AWS, Lambda, Python은 직접 구현하거나 연동하거나 유지보수한 범위를 명시한다.
- 핵심 소개는 frontend engineering에 둔다. 확인되지 않은 도구, 성과, 책임 범위, 수치를 추가하지 않는다.

## 기술 구조

Next.js App Router와 TypeScript를 사용한다. 소개, 경력, 프로젝트 설명과 공통 레이아웃은 Server Component다. API Rescue Lab, 모바일 메뉴와 언어 선택만 필요한 Client Component 경계를 가진다.

콘텐츠는 정적이다. 데모는 브라우저 내부에서 실행되며 Route Handler, Server Action, 인증, 데이터베이스, 실제 HTTP API를 사용하지 않는다.

스타일은 `app/globals.css`와 시스템 글꼴로 구성한다. 별도 스타일링 프레임워크나 외부 글꼴 의존성은 없다.

## 경로와 정보 구조

| 경로 | 내용 |
| --- | --- |
| `/{locale}` | Hero, Selected Experience 미리보기, Featured Lab 미리보기, About & Skills, Contact 순서로 구성한다. |
| `/{locale}/work` | Professional Experience. 전체 재직 이력을 회사별로 표시하고 확인된 프로젝트와 업무를 해당 회사 아래에 배치한다. |
| `/{locale}/lab` | 실제 개인 프로젝트만 표시한다. 현재는 API Rescue Lab 한 건이다. |
| `/{locale}/lab/api-rescue-lab` | 프로젝트 설명과 기존 인터랙티브 데모를 표시한다. |

`locale`은 `en`, `ja`, `ko`다. 영어도 `/en`을 사용한다. 기존 네 개 비언어 경로는 동일 페이지의 저장된 언어 또는 영어로 임시 리다이렉트한다. 명시적인 언어 URL은 저장된 선택보다 우선하며, 브라우저 언어로 자동 선택하지 않는다. 알 수 없는 언어 경로는 404다. 언어 선택은 언어 코드만 담은 1년 유효 first-party `portfolio-locale` cookie에 저장한다(Path=/, SameSite=Lax, HTTPS에서 Secure). 저장이 차단되어도 언어 URL로 이동할 수 있다. 선호 언어에 따른 리다이렉트는 공유 캐시에 저장하지 않는다.

언어 변경은 현재 페이지, query와 Home의 `#about` 또는 `#contact`를 유지하는 문서 이동이다. Lab은 진행 중 요청을 취소하고 초기 상태로 다시 시작한다. 이 동작을 데모 옆에서 설명한다. Lab 상태는 언어 cookie에 저장하지 않는다.

각 언어 페이지는 서버에서 정확한 `<html lang>`, title, description, Open Graph 문구와 URL을 생성한다. canonical은 해당 언어의 페이지이며 alternate는 en/ja/ko와 영어 x-default를 포함한다. canonical에 query나 fragment를 포함하지 않는다. 언어만 지원하므로 지역별 Open Graph locale은 임의로 지정하지 않는다.

About과 Contact는 Home의 `#about`, `#contact` 구역이다. 별도 경로를 만들지 않는다. Home에는 API Rescue Lab 소개와 상세 페이지 링크만 두고, 조작 가능한 데모는 상세 페이지 한 곳에 둔다.

Home의 Selected Experience는 `Data Analytics Platform`과 `HVAC Monitoring & Management System` 두 건으로 확정한다. 두 사례를 명시적으로 선택하고 순서를 고정한다. Work의 정렬이나 항목 추가로 Home의 선정 사례가 바뀌지 않아야 한다. 승인된 제목, 역할, 기간, 설명을 유지한다.

### Work의 정보 계층

`/work`의 h1은 `Professional Experience`다. Strike System, Creative Heroes, KSK Analytics, Kissco Japan의 네 재직 이력을 최신순으로 표시한다. 회사명을 h2로 쓰고 직책과 `Employment`로 구분한 재직 기간을 먼저 보여준다. 그다음 h3 `Selected Work` 아래에 해당 회사의 확인된 프로젝트와 주요 업무를 h4 항목으로 배치한다. 문서에 기간이 있는 프로젝트만 `Project` 기간을 표시한다. 재직 기간을 프로젝트 기간으로 복사하지 않는다.

Strike System 아래에는 Business Web Application Redevelopment, HVAC Monitoring & Management System, Existing Business Web Application을 각각 실제 프로젝트 기간과 함께 최신순으로 둔다. 세 번째 사례는 결함을 조사하고 수정한 소프트웨어 엔지니어링 작업으로 설명한다. 약 150은 검증한 화면 수이며 수정한 결함 수나 성과 수치가 아니다. Creative Heroes와 Kissco Japan은 확인된 업무를 간결하게 설명하고, 임의의 프로젝트 이름이나 기간을 만들지 않는다. KSK Analytics에서는 Data Analytics Platform 설명과 플랫폼 유지보수 업무를 보여준다. 확인되지 않은 결과를 추가하지 않는다. 공개 영문 문구는 `content/portfolio.ts`를 따른다.

모바일에서도 회사명, 직책, 재직 기간과 작업 설명을 모두 표시한다. `Selected Work` 아래 항목의 들여쓰기를 줄여 읽을 폭을 확보한다. Work에 별도의 선정 사례 구역, 필터, 펼침 상태를 추가하지 않는다.

Skills는 핵심 frontend 기술과 실제 연동 경험을 구분한다. Next.js는 이 포트폴리오의 사용 기술로 설명하며 장기 실무 경력으로 표현하지 않는다. Playwright, FastAPI, AI API integration은 MVP 기술 목록에 넣지 않는다. 숙련도 퍼센트와 별점도 사용하지 않는다.

How I Work의 Understand, Reproduce, Fix, Verify 설명은 Home의 About 안에 둔다. 모바일에서는 네 단계의 제목과 설명을 모두 유지하되 큰 카드 대신 간결한 번호 행으로 표시한다. 매우 좁은 화면(예: 320px)에서는 Selected Experience 카드의 장식 번호를 숨겨 경력 문구의 너비를 확보한다. 실제 경력 내용은 줄이지 않는다. About & Skills와 Contact의 내용과 구조는 유지한다. 데모를 조작하지 않은 방문자도 역할, 실제 경력, 연락 방법을 알 수 있어야 한다.

## 내비게이션

Desktop에서는 왼쪽 sidebar에 Home, Work, Lab, About, Contact를 둔다. 내부 링크는 현재 언어의 `/{locale}/work`, `/{locale}/lab`, `/{locale}#about`, `/{locale}#contact`로 연결한다. Lab 상세의 돌아가기 링크도 현재 언어의 Lab으로 연결한다. 비언어 경로는 외부의 기존 링크를 위한 진입 별칭이다.

Desktop sidebar의 Approach는 `Understand · Reproduce · Fix · Verify`만 보조적으로 표시한다. Home의 단계별 설명을 sidebar에 중복하지 않는다.

경로에 따라 활성 항목을 표시한다. 언어 접두사를 제외한 페이지 경로가 Home, Work 또는 Lab인지 판단한다. Home에서 About이나 Contact 링크를 선택하면 해당 항목을 현재 위치로 표시한다. Home을 스크롤하는 동안 활성 구역을 계속 추적하는 기능은 선택적 다듬기 항목이며 필수 조건이 아니다.

Tablet에서는 상단 전체 메뉴만 사용한다. 전체 메뉴와 햄버거를 동시에 표시하지 않는다. Mobile에서는 작은 헤더와 메뉴 버튼을 사용한다. 메뉴 버튼에는 접근 가능한 이름, `aria-expanded`, `aria-controls`를 제공한다. Enter와 Space로 열고 닫으며, Escape로 닫을 때 버튼으로 포커스를 돌린다. 링크를 선택하면 메뉴를 닫고 이동한다. 닫힌 메뉴의 링크는 키보드 탐색에서 빠진다. 중요한 정보와 액션은 hover 없이 보인다.

언어 선택은 보이는 label이 있는 native select로 제공한다. 옵션은 English, 日本語, 한국어이며 선택 값 자체로 현재 언어를 표시한다. Desktop에서는 sidebar 메뉴 아래, Tablet에서는 브랜드와 같은 첫 행에 두고 전체 메뉴를 둘째 행에 둔다. Mobile에서는 브랜드/메뉴 버튼 행 아래에 두며 메뉴가 닫혀도 보인다. 키보드·포커스·터치 동작을 유지한다.

## 시각 방향과 반응형 규칙

시각 참고 이미지는 레이아웃·타이포그래피·간격·색·패널의 참고자료다. 픽셀 단위 명세나 콘텐츠 출처가 아니다. 크림색 배경, 절제된 파스텔 색, 얇은 테두리, 창 형태 패널, 미세한 격자, 소수의 고양이 일러스트를 사용한다. 역할·경력·작동하는 데모가 장식보다 먼저 읽혀야 한다.

색상은 페이지별 임의 값 대신 background, surface, border, primary text, secondary text, primary action, focus, success, warning, error, disabled 역할로 관리한다. 파스텔은 주로 배경과 강조 영역에 적용한다. 실제 글자와 배경 조합의 대비를 측정하고 현재 사이트의 읽기 쉬운 대비를 유지하거나 개선한다. 성공과 오류는 색상뿐 아니라 텍스트로도 구분한다.

| 너비 | 배치와 내비게이션 |
| --- | --- |
| 1200px 이상 | 왼쪽 sidebar를 유지한다. 콘텐츠 폭이 충분한 곳에서만 여러 열을 사용한다. |
| 768px부터 1199px | 상단 전체 메뉴를 사용한다. 큰 영역과 Lab의 조작부·결과를 필요에 따라 세로로 배치하고 장식을 줄인다. |
| 767px 이하 | 작은 헤더와 메뉴 버튼을 사용한다. 모든 주요 콘텐츠와 Lab을 한 열로 배치한다. |

1280px, 1024px, 768px, 390px, 320px에서 실제 영어·일본어·한국어 경력 문구와 Lab 상태를 넣고 확인한다. 화면 폭이 줄면 장식과 여백부터 줄인다. 역할, 기간, 경력 설명, 데이터, 상태 메시지를 삭제하거나 placeholder 막대로 바꾸지 않는다. 긴 제목과 링크는 줄바꿈하며 페이지 가로 스크롤을 만들지 않는다. 보조 설명과 이벤트 로그를 지나치게 작게 줄이지 않는다. 중요한 모바일 액션의 터치 영역은 약 44px를 목표로 한다.

UI 텍스트와 컨트롤은 HTML로 구현한다. 목업 PNG를 자르거나 통째로 넣어 화면을 구성하지 않는다. 별도 일러스트 자산이 있으면 장식으로만 사용하고 적절한 빈 대체 텍스트를 준다. 자산이 없다면 레이아웃, 글자, 색, 간격, 패널 스타일을 먼저 구현한다. 태블릿과 모바일에서는 반복되는 고양이와 장식을 줄인다.

창 형태 패널의 신호등 점과 테두리는 장식이다. 실제 동작이 없는 닫기 버튼이나 툴바 버튼을 표시하지 않는다. 페이지 이동과 실행은 알아볼 수 있는 링크와 버튼으로 제공한다.

## API Rescue Lab의 범위

API 장애 상황에서도 frontend가 상태를 설명하고 마지막 정상 데이터를 유지하는 방법을 보여준다. 프로젝트는 sample task 데이터를 사용하는 브라우저 내부 시뮬레이션이다. 실제 고객 데이터나 실제 backend를 사용하지 않는다.

기술 세부사항보다 목적을 먼저 설명한다. Home Featured Lab은 API가 느리거나 실패하거나 잘못된 데이터를 보낼 때도 frontend가 사용자에게 유용한 화면을 유지하는 모습을 볼 수 있다고 짧게 소개한다. `/lab`은 같은 프로젝트의 로컬 시뮬레이션과 네 가지 조건을 설명한다. 상세 페이지의 실제 HTML 순서는 프로젝트 제목과 짧은 문제 설명, `Run Normal, try a failure, then run Normal again.`, 기존 인터랙티브 데모, `What this demonstrates`, 상세한 네 단계 체험 안내다. CSS로 보이는 순서만 바꾸지 않는다. 데모 뒤의 `What this demonstrates`는 다음을 간결하게 설명한다.

Home 소개의 기준 문구는 `See how a frontend can stay useful when an API is slow, fails, or returns bad data.`다. `/lab`에는 `Local simulation / sample data`와 네 가지 응답 조건을 붙인다. 상세 페이지에서는 문제와 사용자에게 보이는 결과를 먼저 말하고, 구현 원리는 그 아래에 둔다.

- 잘못된 응답을 response/schema validation으로 화면 표시 전에 거부한다.
- 실패나 timeout에도 이전에 정상적으로 불러온 데이터가 있으면 유지한다. 첫 요청부터 실패했다면 없는 데이터를 꾸며 보여주지 않는다.
- 오래된 요청의 완료 결과가 새로운 상태를 덮어쓰지 못하게 한다.
- 명확한 상태 메시지와 수동 실행을 통해 예측 가능하게 재시도하고 복구한다.

데모 뒤에는 상세한 네 단계 체험 순서를 제공한다. `Normal → Invalid data 또는 Server error → Slow → Normal recovery` 순서로 실행하고, 오류·timeout 상태와 마지막 정상 데이터의 유지 여부를 확인하게 한다. `Slow`는 4초 응답과 2초 timeout이다. 같은 실패 조건의 `Retry`는 다시 실패하며, `Normal`을 선택해 실행해야 복구된다. 오래된 요청 결과 차단은 별도 화면 조작으로 눈에 보이는 기능인 것처럼 설명하지 않는다.

상세 페이지와 데모에 `Local simulation / sample data`를 명확히 표시한다. 데모를 실제 production 시스템이나 실제 HTTP 통신을 검증하는 도구로 소개하지 않는다. Axios, MSW, 실제 HTTP API, 사용자 프로필, 가짜 JSON API 패널, 성공률·응답 성능 수치는 추가하지 않는다.

데이터는 작업 목록 세 개처럼 한 종류만 사용한다. 각 항목은 식별자, 제목, 상태 정도로 제한한다. 원시 응답의 필수 필드와 허용 값이 모두 유효할 때만 전체 응답을 정상 데이터로 채택한다.

화면에는 시나리오 선택, 실행 버튼, 요청 상태, 데이터, 최근 이벤트만 표시한다. 모바일에서는 이 순서대로 한 열에 배치한다. 로그보다 상태와 데이터를 더 눈에 띄게 보여준다.

### 사용자 흐름

1. 초기에는 Normal이 선택되어 있고 요청은 실행 전 상태다.
2. Normal을 실행하면 정상 데이터를 표시한다.
3. Server error를 실행하면 오류를 설명하고 이전 데이터를 유지한다.
4. Normal을 다시 실행하면 정상 상태로 복구한다.

처음부터 오류 시나리오를 선택할 수도 있다. 성공한 응답이 한 번도 없다면 가짜 fallback 데이터를 보여주지 않는다. 데이터 영역에 `No data loaded yet`를 표시한다.

### 네 가지 시나리오

시나리오는 무작위 확률 없이 결정적으로 동작한다. 다음 시간은 구현용 설계값이다.

- Normal은 약 600ms 후 유효한 데이터를 반환한다.
- Slow는 4초 후 응답하도록 설정하되, 요청 제한 시간 2초에 timeout으로 종료한다.
- Server error는 약 600ms 후 모의 서버 오류를 반환한다.
- Invalid data는 약 600ms 후 허용되지 않는 상태 값을 가진 응답을 반환하며 검증에서 거부된다.

브라우저 내부 타이머와 Promise를 사용하는 로컬 비동기 시뮬레이션으로 구현한다. 별도 mock 서버나 실제 HTTP endpoint는 필요하지 않다.

### 요청과 복구 규칙

- 실행 중에는 중복 요청과 시나리오 변경을 막는다.
- 요청을 시작해도 마지막 정상 데이터를 지우지 않는다.
- 검증을 통과한 응답만 마지막 정상 데이터를 교체한다.
- 실패 시 원인에 맞는 짧은 사용자 메시지를 표시한다.
- 실패 후 이전 데이터를 유지한다면 `Showing last successful response`를 표시한다.
- 실행 버튼 하나가 현재 선택한 시나리오를 실행한다. 실패 후 같은 조건을 선택했다면 Retry로, 다른 조건을 선택했다면 Run request로 표시한다. 같은 장애를 재시도해도 자동으로 성공하지 않는다.
- 복구를 보려면 Normal을 선택하고 새 요청을 실행한다.
- timeout과 컴포넌트 해제 시 진행 중인 타이머를 정리한다.
- 종료된 요청의 늦은 결과는 화면이나 후속 요청 결과를 갱신할 수 없다.
- 이벤트 로그는 요청 식별자와 메시지를 포함하며 최근 여섯 개만 유지한다.
- 로그 저장, 필터, 검색, 다운로드는 만들지 않는다.

이벤트는 시작·성공·실패와 요청 식별자, 시나리오/원인, 이전 데이터 보유 여부를 언어 중립 데이터로 기록한다. 표시할 때 현재 언어로 변환한다. sample task ID와 검증용 상태는 유지하고 알려진 작업 제목·상태를 화면에서 번역한다. 언어 전환 시 Lab은 초기화되며 별도 저장소를 만들지 않는다.

영어 이벤트 문구 예시는 `Request started`, `Response rejected`, `Previous data preserved`, `Request succeeded`다.

### 상태 모델과 책임

Scenario는 네 가지 응답 조건 중 하나다. RequestState는 idle, loading, success, failure 중 하나다. failure의 원인은 timeout, server, invalid response로 구분한다.

마지막 정상 데이터는 아직 없을 수 있다. 요청 상태와 데이터 보유 여부를 분리한다. 요청이 실패했어도 기존 데이터는 남아 있을 수 있기 때문이다. loading, error, success를 독립된 boolean 여러 개로 관리하지 않는다.

데모 컴포넌트의 단일 reducer 상태가 유일한 화면 상태다. lab 모듈은 별도 store 없이 시뮬레이션, 응답 검증, timeout 처리와 순수 상태 전이 함수를 제공한다. 현재 요청 식별자와 일치하지 않는 결과는 무시한다. 컴포넌트 해제 시 진행 중인 요청을 취소하고 타이머를 정리한다. 원시 응답은 검증 경계 밖의 UI에 전달하지 않는다. Normal과 Invalid data는 동일한 런타임 검증 경계를 통과한다.

별도 상태 관리 라이브러리, Context, 범용 API client, repository 계층, 범용 custom hook은 도입하지 않는다.

## 파일 경계와 상태 소유권

현재 파일별 책임은 다음과 같다.

- `app/[locale]/layout.tsx`는 공통 문서 구조, skip link, 내비게이션, 본문, footer와 기본 메타데이터를 담당한다. 레이아웃은 Server Component로 유지한다.
- `app/[locale]/page.tsx`는 Home의 정적 구역을 구성한다.
- `app/[locale]/work/page.tsx`는 회사별 전체 재직 이력과 그 아래의 `Selected Work`를 표시한다.
- `app/[locale]/lab/page.tsx`는 실제 개인 프로젝트 목록을 표시한다.
- `app/[locale]/lab/api-rescue-lab/page.tsx`는 짧은 문제 소개와 실행 안내, 기존 Lab 컴포넌트, 그 뒤의 `What this demonstrates`와 상세한 체험 순서를 HTML 순서대로 구성한다.
- 작은 내비게이션 Client Component는 경로 활성 상태, 모바일 메뉴, 언어 선택 저장과 문서 이동을 담당한다. Lab 상태에 접근하지 않는다.
- 경력 카드와 프로젝트 카드는 실제로 반복되는 표현만 공유한다. Work의 회사별 정보 계층은 별도로 구성하되 단순 전달용 컴포넌트를 쌓지 않는다.
- `content/portfolio.ts`는 회사, 역할, 기간, 선정 사례 관계, 기술, 연락 링크의 공통 사실 출처다. `content/locales/`의 typed 언어 자료는 공개 문구와 표시 label을 관리한다. Server Component가 선택 언어를 읽고 필요한 내비게이션·Lab 문구만 Client Component로 전달한다. Home 선정 사례는 Work 정렬과 독립적이며 같은 프로젝트의 번역은 한 번만 관리한다.
- `components/api-rescue-lab.tsx`는 기존 데모의 유일한 화면 상태와 요청 생명주기를 담당한다.
- `lib/rescue-lab.ts`는 기존 시뮬레이션, 검증, 상태 전이를 담당한다.
- `app/globals.css`는 색상 역할, 패널, 반응형 스타일을 담당한다.

공용 Button, Card, Section 라이브러리는 미리 만들지 않는다. 내비게이션 상태를 전역 상태로 옮기지 않는다. Lab을 상세 페이지 한 곳에 배치하며 다른 페이지에 중복 실행 인스턴스를 두지 않는다.

## 접근성

각 페이지에 하나의 주 제목과 하나의 main 영역을 둔다. skip link는 모든 경로에서 본문으로 이동하며 평소에는 시각적으로 숨기고 키보드 포커스가 있을 때만 표시한다. PDF 캡처에서 나타나는 것은 인쇄 렌더링 현상이며 현재 화면 동작을 변경할 이유가 아니다. 제목 순서와 명확한 링크·버튼 문구를 유지한다. 고정된 헤더가 앵커 도착 지점을 가리지 않게 한다.

시나리오 선택은 기존 fieldset, legend, radio와 label을 유지한다. 키보드로 선택·실행할 수 있어야 한다. 현재의 보이는 focus와 텍스트 요청 상태, `role="status"` 안내를 유지한다. 이벤트 로그 전체를 매번 읽어주지 않는다. 장식용 점과 일러스트는 접근성 트리에서 제외하고 조작 대상으로 보이지 않게 한다.

필수 정보는 hover에 의존하지 않는다. 새 움직임을 넣는 경우에만 reduced-motion 설정을 반영한다. 각 너비에서 글자 크기, 대비, 터치 영역을 실제 UI로 확인한다. title, description, 기본 Open Graph 정보와 favicon은 공개 이름 규칙을 따른다.

## 검증 기준

영어·일본어·한국어의 모든 페이지에서 직접 접속, 새로고침, 뒤로 가기, 언어 전환, 저장된 선택보다 명시적 URL 우선, Home 앵커와 서버 메타데이터를 확인한다. 언어 변경으로 Lab이 초기화되며 유지된 컴포넌트 상태를 다른 언어로 렌더링할 때 이벤트 의미가 동일한지도 확인한다. 영어 제목과 label 예시는 다른 언어에서 의미가 같은 번역으로 표시한다.

Lab 테스트는 동작 보존의 기준이다. 변경 후 테스트, TypeScript typecheck, production build에서 다음 동작을 확인한다.

- 정상 응답만 표시 데이터를 교체한다.
- 잘못된 응답과 서버 오류는 마지막 정상 데이터를 지우지 않는다.
- 첫 요청 실패는 존재하지 않는 데이터를 표시하지 않는다.
- 4초 응답은 2초에 timeout으로 끝나며 늦은 결과가 후속 요청을 덮어쓰지 않는다.
- 같은 장애의 Retry는 다시 실패한다. Normal 실행은 복구한다.
- 중복 실행 방지, 시나리오 변경 제한, 컴포넌트 해제 시 취소와 타이머 정리를 유지한다.
- 이벤트는 최근 여섯 개로 제한한다.

브라우저에서 네 경로의 직접 접속, 링크 목적지, 뒤로 가기, 경로별 활성 메뉴, Home 앵커, 모바일 메뉴의 키보드 동작을 확인한다. 1280px, 1024px, 768px, 390px, 320px에서 실제 경력 문구와 Lab의 정상·실패·빈 상태를 확인한다. 가로 넘침, 포커스 가시성, 대비, 읽기 쉬운 보조 텍스트, 이메일과 LinkedIn 링크도 점검한다.

Work에서 네 회사의 재직 기간과 `Selected Work` 소제목, 확인된 프로젝트 기간을 점검한다. Home에는 두 선정 사례만 남아 있어야 한다. 모든 Lab 진입점에서 개인 프로젝트와 로컬 sample data의 성격이 분명해야 하며, 상세 설명은 기존 데모에서 실제로 보이거나 구현한 동작만 주장해야 한다.

공개 전에는 README의 실행·빌드·테스트 방법과 데모의 한계를 확인한다. 본문과 메타데이터의 이름은 `J. Ha`로 유지한다. 공개 파일에는 확인된 경력 문구만 포함한다.

## MVP에서 제외하는 기능

- 실제 backend, FastAPI, DB, 인증, 사용자 로그인, 관리자 페이지.
- Next.js Route Handler, Server Action, 실제 HTTP endpoint, Axios, MSW.
- AWS 배포와 실제 observability platform.
- AI agent, LLM API, AI integration demo, 자동 버그 재현, GitHub issue parser.
- CMS, 블로그, 문의 폼, 다크 모드.
- 빈 About·Contact 페이지, placeholder 프로젝트, 가짜 카드, 필터, 목적지 없는 상세 링크.
- 별도 Playwright regression demo와 광범위한 종단간 테스트 체계.
- 자동 재시도, 지수 백오프, 요청 설정 패널, 여러 endpoint, 응답 JSON 편집기.
- 범용 디자인 시스템 의존성, 과도한 애니메이션, 목업 PNG를 이용한 UI 이미지.
- Upwork 링크, 회사 로고, 공개 저장소가 확인되지 않은 GitHub 링크.

## 향후 확장 원칙

새 프로젝트를 실제로 공개할 준비가 되면 `/lab`에 항목과 필요한 상세 경로를 추가한다. 새로운 경력 사실이 검증되면 `/work`의 해당 회사 아래에 추가한다. 실제 API 기반 데모가 필요해질 때만 서버 경계를 설계한다. 빈 경로, 범용 API 추상화, CMS 스키마는 미리 만들지 않는다.

이 사이트는 Next.js와 TypeScript를 사용한 포트폴리오이며, Lab은 로컬 시뮬레이션이다. Lab을 실제 production 시스템의 구현 경험으로 소개하지 않는다.
