import type { Messages } from "../messages";

const messages = {
  technologyLabels: { dataVisualization: "Data visualization" },
  shell: { skip: "Skip to content", backToTop: "Back to top", footer: "J. H. · Frontend Engineer", portfolio: "Portfolio" },
  roles: { "Frontend Engineer": "Frontend Engineer", "Full-Stack Engineer": "Full-Stack Engineer", "Software Engineer": "Software Engineer" },
  metadata: {
    home: { title: "J. H. | Frontend Engineer", description: "Frontend engineer focused on reliable web applications. React, TypeScript, API integration, and existing application maintenance." },
    work: { title: "Professional Experience | J. H.", description: "Professional employment history in frontend engineering, application development, maintenance, and debugging." },
    lab: { title: "Lab | J. H.", description: "Personal frontend projects by J. H." },
    detail: { title: "API Rescue Lab | J. H.", description: "A local sample-task simulation showing how a frontend stays useful when responses are slow, fail, or contain invalid data." },
  },
  home: {
    greeting: "Hello, I'm J. H. · Frontend Engineer",
    headline: "Frontend Engineer focused on reliable web applications.",
    introduction: "I build and maintain web applications with React, TypeScript, and Angular. I trace problems through existing specifications, code, and databases, and work on APIs, backend services, and AWS when the solution requires it.",
    viewWork: "View my work", exploreLab: "Explore my Lab", workEyebrow: "01 / Professional work", experienceTitle: "Selected Experience", allWork: "View all work",
    labEyebrow: "02 / Personal project", labTitle: "Featured Lab", viewLab: "View Lab", aboutEyebrow: "03 / About", aboutTitle: "Frontend focus. Existing-system experience.",
    about: "I am a frontend-centered software engineer with around nine years of professional experience, primarily in Japan. I check specifications against existing code and databases and resolve unclear requirements before implementation. I replaced complex card-layout calculations with CSS Grid and Flexbox, and proposed gradual TypeScript adoption after proving it could coexist with JavaScript through Webpack. I also share debugging and investigation methods with colleagues to help them work independently.",
    portfolioStack: "This portfolio is built with Next.js, React, and TypeScript.",
    skills: { frontend: "Frontend", integration: "Integration experience", practice: "Engineering practice", practiceItems: "Existing application maintenance, debugging, unit testing, integration testing support, Git", certification: "Certification" },
    workflowTitle: "How I work",
    workflow: [
      { title: "Understand", text: "Compare specifications, code, and database constraints; clarify inconsistencies." },
      { title: "Reproduce", text: "Find the conditions that make the problem happen." },
      { title: "Fix", text: "Make a focused change at the source of the issue." },
      { title: "Verify", text: "Check the intended behavior and nearby failure cases." },
    ],
    contactEyebrow: "04 / Contact", contactTitle: "Have an application that needs attention?", contactText: "For work enquiries or detailed career information, use the channel where this portfolio was shared with you.",
  },
  work: {
    eyebrow: "Professional work", title: "Professional Experience", introduction: "Frontend development, application maintenance, and defect investigation, grouped by work context. Dates are shown by year; employer names and exact months are omitted.", employment: "Employment", selectedWork: "Selected Work", project: "Project",
    contexts: { experience1: "Business application development", experience2: "Serverless web development", experience3: "Data analysis interfaces", experience4: "Business application maintenance" },
    currentActivity: {
      title: "Career break and return preparation",
      careerBreak: "Took time off for health reasons after my last professional project ended. My employment continued until the following year.",
      preparation: "Preparing to return to work through technical study and personal development, including this React/TypeScript portfolio and API Rescue Lab. Earned the AWS certification listed below.",
    },
    items: {
      businessMaintenance: { title: "Business Application Updates", description: "Modified an existing business system using Java and Spring and implemented budget-management screens with jQuery." },
      biReporting: { title: "BI Reporting and Maintenance", description: "Implemented business report screens in PHP, improved data search and display speed, and maintained the Jedox BI solution." },
      assetApi: { title: "IT Asset Management API", description: "Created database table definitions, ER diagrams, Swagger API specifications, and PlantUML sequence diagrams. Refined the design with colleagues' advice and used the documents as a basis for implementation and review. Implemented APIs with TypeScript and Node.js and wrote Jest unit tests." },
      dataAnalytics: { title: "Data Analytics Platform", description: "Developed and maintained React time-series visualizations, including interactive graphs for internal data scientists' preprocessing work. Proposed adopting TypeScript in new features and verified coexistence with existing JavaScript by changing the Webpack configuration. The team adopted the approach, helping catch implementation errors through type checking. Investigated and configured HTTPS through an AWS Application Load Balancer, including certificates and routing, while limiting changes to existing EC2 instances. Also investigated and modified Python backend processing where a visualization required it." },
      hvac: { title: "HVAC Monitoring & Management System", description: "Developed and maintained an Angular-based HVAC monitoring and management system connected to Python and AWS Lambda services. Upgraded Angular, added monitoring functionality, and investigated and fixed device communication-protocol defects. Also handled backend changes using Python and AWS Lambda and changes involving service integration." },
      existingBusiness: { title: "Existing Business Web Application", description: "Checked screens during an Internet Explorer to Edge migration. Traced existing specifications and JavaScript, PL/SQL, HTML, and CSS code to locate defects, implement fixes, and verify them through integration testing." },
      redevelopment: { title: "Business Web Application Redevelopment", description: "Implemented custom frontend and backend logic, unit tests, and integration testing support in a low-code environment. Compared similar screens, design documents, existing code, and database constraints; resolved inconsistent formulas and text-length requirements with the designers and updated the documents. Replaced complex JavaScript card-layout calculations with CSS Grid and Flexbox to support desktop, tablet, and mobile through shared code. This separated layout from business logic and made design changes and maintenance easier; colleagues reused the approach. Shared debugging and investigation methods with a new graduate to help them implement assigned screens independently." },
      webDevelopment: { title: "Medical Application Administration Site", description: "Implemented Vue.js and Nuxt screens for clinic permissions, patient information, and examination information, following requirements prepared by a senior colleague. Built Cognito authentication and user management, GraphQL and REST APIs using Lambda, video and audio playback, and pagination for DynamoDB. Also participated in code review and used Serverless Framework in web application development." },
      platformMaintenance: { title: "Internal platform maintenance", description: "Maintained an internal data-mining platform." },
      systemMaintenance: { title: "Existing system maintenance and migration", description: "Supported maintenance, operations, and Windows 10 migration for an insurance sales system used on Windows tablets. Tested against design documents, wrote operation manuals and unit-test documents, and investigated browser, Windows, and registry settings." },
    },
  },
  lab: {
    eyebrow: "Personal projects", title: "Lab", introduction: "Explore frontend projects covering API error handling, data workflows, and an HVAC service concept.", projects: "Projects", cardOverline: "Personal project · Local simulation / sample data",
    homeSummary: "See how a frontend can stay useful when an API is slow, fails, or returns bad data.", indexSummary: "Try four response conditions in a local simulation with sample task data. See how the interface validates results, handles failure, and keeps previously loaded tasks visible when available.", openProject: "Open project",
  },
  detail: {
    back: "Back to Lab", eyebrow: "Personal project · Local simulation / sample data", introduction: "When a response is slow, fails, or contains bad data, users still need a clear status and any valid tasks they already loaded.", instruction: "Run Normal, try a failure, then run Normal again.", simulation: "Interactive simulation", simulator: "Interactive simulator", demonstrates: "What this demonstrates",
    demonstrations: ["Reject malformed task responses through response/schema validation before display.", "Preserve previously loaded valid tasks during failures. If none have loaded, show an empty state.", "Prevent stale request completions from overwriting newer state, verified by reducer tests.", "Explain timeouts and failures, then provide a predictable way to retry or recover."],
    stepsTitle: "Try it in four steps", steps: ["Run Normal to load validated sample tasks.", "Run Invalid data or Server error. Notice the status and retained tasks.", "Run Slow response. The response is set to arrive after 4 seconds, but the request times out after 2 seconds.", "Select Normal and run again to recover."], retry: "Retry repeats the selected failure condition.",
    evidence: {
      title: "Implementation checks",
      observable: "Try loading, timeout, server error, invalid data, retained tasks, retry, and Normal recovery in the demo.",
      tested: "Reducer tests verify that request IDs reject stale or out-of-order completions. This guarantee is tested in code, rather than through an overlapping-request demo scenario.",
    },
  },
} satisfies Messages;

export default messages;
