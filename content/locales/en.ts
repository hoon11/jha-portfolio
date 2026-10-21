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
    introduction: "I build, maintain, and debug frontend applications, with experience in React, TypeScript, API integration, AWS/serverless systems, and existing production codebases.",
    viewWork: "View my work", exploreLab: "Explore my Lab", workEyebrow: "01 / Professional work", experienceTitle: "Selected Experience", allWork: "View all work",
    labEyebrow: "02 / Personal project", labTitle: "Featured Lab", viewLab: "View Lab", aboutEyebrow: "03 / About", aboutTitle: "Frontend focus. Existing-system experience.",
    about: "I am a frontend-centered software engineer with around nine years of professional experience, primarily in Japan. I review existing code against the requirements and separate layout processing from business logic. My work includes replacing JavaScript layout calculations with CSS for desktop, mobile, and tablet screens, and introducing TypeScript across an entire JavaScript frontend to catch type errors at build time.",
    portfolioStack: "This portfolio is built with Next.js, React, and TypeScript.",
    skills: { frontend: "Frontend", integration: "Integration experience", practice: "Engineering practice", practiceItems: "Existing application maintenance, debugging, unit testing, integration testing support, Git", certification: "Certification" },
    workflowTitle: "How I work",
    workflow: [
      { title: "Understand", text: "Read the code and trace the existing behavior." },
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
      dataAnalytics: { title: "Data Analytics Platform", description: "Built interactive React graphs for internal data scientists doing data preprocessing. Customized the display to respond to user actions; an internal user said the data was easier to view. The platform was at an internal evaluation stage without actual customers. Introduced TypeScript across the entire JavaScript frontend to catch type errors at build time and make the code easier to understand. Also developed time-series visualization components and customized a BI solution." },
      hvac: { title: "HVAC Monitoring & Management System", description: "Developed and maintained an Angular-based HVAC monitoring and management system connected to Python and AWS Lambda services. Upgraded the Angular frontend, added monitoring functionality, and resolved communication-protocol issues between devices and the management system." },
      existingBusiness: { title: "Existing Business Web Application", description: "Checked screens during environment and browser-related work, investigated defects by tracing JavaScript, PL/SQL, HTML, and CSS code, and implemented fixes for identified issues." },
      redevelopment: { title: "Business Web Application Redevelopment", description: "Implemented custom frontend and backend logic in a low-code environment, with unit testing and integration testing support. Reviewed automatically generated HTML against the design documents and customized unnecessary or complex markup. A card UI used complex JavaScript layout calculations and conditional logic and could break on mobile screens. Replaced the layout processing with CSS so a shared implementation could support desktop, mobile, and tablet screens. This made business logic easier to read and frequent design changes easier to maintain. Another engineer praised the concise code and used it as a reference. The project stack was customer-selected; my decision concerned the implementation of the assigned UI." },
      webDevelopment: { title: "Web application development", description: "Developed a web application using AWS Amplify and Serverless Framework, including authentication-related, user management, and multimedia features. Collaborated through code review." },
      platformMaintenance: { title: "Internal platform maintenance", description: "Maintained an internal data-mining platform." },
      systemMaintenance: { title: "Existing system maintenance and migration", description: "Maintained a Windows tablet system used for insurance sales and an existing business application, supported Windows 10 migration, and created unit-test documentation." },
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
