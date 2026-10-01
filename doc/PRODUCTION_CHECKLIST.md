# Production verification checklist

Use this checklist after a Vercel production deployment and after changes to the UI or portfolio content. The deployed site is the source for browser checks. [DESIGN.md](DESIGN.md) defines the intended design and Lab behavior.

Record the production URL, deployed commit, date, browsers, and any failure evidence with the release. Mark a check complete only after observing the result. If a check does not apply to a smaller change, record why; run the full checklist before a public release. Keep screenshots and reports free of private information.

## 1. Deployment verification

- [ ] The Vercel deployment reports success, and its logs contain no deployment error.
- [ ] The production URL loads over HTTPS without a browser or server error.
- [ ] Each route in the table loads when entered directly, survives a browser refresh, and works through site navigation.
- [ ] Moving between routes and using browser Back does not produce an unexpected 404 or routing error.

| Route | Direct URL | Refresh | Navigation |
| --- | --- | --- | --- |
| `/` | [ ] | [ ] | [ ] |
| `/work` | [ ] | [ ] | [ ] |
| `/lab` | [ ] | [ ] | [ ] |
| `/lab/api-rescue-lab` | [ ] | [ ] | [ ] |

## 2. Core user experience review

Review the site as a visitor who has no background information.

### First impression

- [ ] The Home hero immediately identifies J. Ha as a Frontend Engineer.
- [ ] The hero message describes the work in plain language.
- [ ] The main next action and navigation paths are easy to find.

### Information hierarchy

- [ ] A visitor can find who the engineer is, professional experience, demonstrated technical strengths, and contact options.
- [ ] Professional experience remains more prominent than decoration or the personal Lab project.
- [ ] Home previews lead to the relevant Work and Lab pages.

### Content clarity

- [ ] Career descriptions are understandable without knowledge of an employer's internal systems.
- [ ] Claims, responsibilities, dates, and metrics match approved public career facts.
- [ ] Project explanations describe the behavior actually available in the deployed site.

## 3. Professional Experience review

### `/work`

- [ ] All approved professional employment history appears under the correct employer.
- [ ] Role and employment period are clear before each employer's Selected Work.
- [ ] Employment periods and individual project periods remain distinct. Missing project dates are not inferred.
- [ ] Responsibilities and technologies match approved public facts; approximately 150 refers to screens validated, not defects fixed.
- [ ] No private career detail, end-client name, or unsupported impact claim appears.

### Home

- [ ] Selected Experience contains Data Analytics Platform and HVAC Monitoring & Management System.
- [ ] Both previews retain their approved role, period, and description at desktop and mobile widths.
- [ ] The link to the full Work page works.

## 4. API Rescue Lab verification

### Explanation

- [ ] The problem statement explains why slow, failed, or malformed responses matter to the user before technical detail.
- [ ] The page clearly labels the demo **Local simulation / sample data** and does not imply a real API or customer data.
- [ ] The short instruction appears before the simulator; What this demonstrates and the detailed guide appear after it.
- [ ] The explanation covers response validation, retained valid data, timeout and failure handling, stale-result protection, and recovery without claiming unimplemented features.

### Interaction

Use the deployed simulator. Start with an empty state, then run Normal, a failure, Slow response, and Normal recovery.

| Action | Expected result |
| --- | --- |
| Run Normal | Validated sample tasks appear with a success status. |
| Run Server error after Normal | An error appears; the last successful tasks remain visible. |
| Run Invalid data after Normal | The malformed response is rejected; the last successful tasks remain visible. |
| On a fresh page load, run Server error before Normal | The UI says no data has loaded; it does not invent fallback tasks. |
| Run Slow response after Normal | The request times out after about 2 seconds, before its simulated 4-second response; valid tasks remain visible. |
| Retry a failed scenario | The same selected failure repeats rather than succeeding automatically. |
| Select and run Normal after failure | The UI returns to success and shows validated tasks. |

- [ ] Each run gives readable status and event feedback; preserved data is labeled as the last successful response.
- [ ] Controls prevent a second run or scenario change while a request is loading.
- [ ] The event log stays limited to the latest six entries.
- [ ] Run `npm run test` and confirm the existing reducer and component tests cover malformed response rejection, timeout cleanup, out-of-order completion, and late-response protection. The UI prevents overlapping runs, so stale completion is verified by these tests rather than by a manual overlap attempt.

## 5. Responsive verification

Check the live content and Lab states at every width below. Resize the viewport rather than scaling a desktop screenshot.

| Width | Expected navigation and layout |
| --- | --- |
| 1280px | Left sidebar; multiple columns only where content fits. |
| 1024px | One top navigation; content reflows without a sidebar. |
| 768px | One top navigation; cards and Lab panels reflow as needed. |
| 390px | Compact header and menu button; single-column content. |
| 320px | Single-column content; Selected Experience drops its decorative number badge. |

- [ ] No route or Lab state causes horizontal page scrolling.
- [ ] Headings, supporting text, logs, and links remain readable without zooming.
- [ ] Cards and the Lab controls/results reflow instead of shrinking desktop columns.
- [ ] Navigation remains usable and reflects the active route or selected Home anchor.
- [ ] Important mobile actions have comfortable touch targets, approximately 44px where practical.
- [ ] Mobile retains career descriptions, all four compact How I work rows and descriptions, Lab data, and status messages.
- [ ] Essential content and actions do not depend on hover.

## 6. Accessibility verification

- [ ] Skip to content is visually hidden on normal load, appears on keyboard focus, and moves focus to the main content on every route.
- [ ] Keyboard users can reach navigation, links, buttons, and Lab controls in a logical order.
- [ ] Focus remains visible against every background used by an interactive control.
- [ ] Each page has one main region and a clear heading hierarchy.
- [ ] The Lab scenario fieldset has a legend; each radio input has a visible label and works with the keyboard.
- [ ] Lab status changes are available as text and are announced without repeatedly reading the full event log.
- [ ] The mobile menu button has an accessible name, `aria-expanded`, and `aria-controls`; Enter and Space toggle it, Escape closes it and returns focus to the button, and closed links leave keyboard navigation.
- [ ] Decorative illustrations and window details are excluded from assistive technology and do not look like working controls.
- [ ] Information is not conveyed by color alone; text contrast and touch targets remain usable.
- [ ] With reduced motion enabled, any animation remains nonessential and does not obstruct navigation.

## 7. Browser verification

Test Chrome on desktop and a mobile browser simulation. Record the browser version and viewport in the release evidence.

- [ ] Pages render with the intended fonts, colors, panels, backgrounds, and illustrations.
- [ ] Route links, Home anchors, mobile navigation, contact links, and Lab controls respond as expected.
- [ ] The browser console has no unexplained errors or warnings during navigation and Lab interactions.
- [ ] Network requests show no missing page assets or unexpected external service dependency.

## 8. Performance and production quality

- [ ] `npm run test`, `npm run typecheck`, and `npm run build` pass for the deployed commit.
- [ ] Production pages load without a prolonged blank screen or visibly broken layout.
- [ ] Images and icons load, and no asset URL is broken.
- [ ] The production console has no unnecessary error output.

Lighthouse and Core Web Vitals can be recorded for future comparisons. Do not invent a pass threshold without a measured baseline and a stated target.

## 9. Security and privacy verification

- [ ] Review the deployed commit and deployment inputs for secrets, credentials, and unintended environment files.
- [ ] Review current dependency advisories and record any unresolved security update.
- [ ] No server-only value is exposed through client code, page HTML, network responses, or public assets.
- [ ] Private documents, local review captures, and build artifacts are absent from the public repository and deployment output.
- [ ] Visible copy, metadata, screenshots, and links disclose no personal information beyond approved public content.
- [ ] The Lab uses sample task data and makes no real API or customer-data request.

## 10. Final release checklist

- [ ] Production build passed.
- [ ] Production URL verified.
- [ ] Routes checked.
- [ ] Responsive checked.
- [ ] Accessibility checked.
- [ ] Lab behavior checked.
- [ ] Privacy checked.
- [ ] Security checked.
- [ ] Git status reviewed.
