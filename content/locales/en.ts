import type { Messages } from "../messages";

const messages = {
  technologyLabels: { dataVisualization: "Data visualization" },
  shell: { skip: "Skip to content", backToTop: "Back to top", footer: "J. Ha · Frontend Engineer", portfolio: "Portfolio" },
  roles: { "Frontend Engineer": "Frontend Engineer", "Full-Stack Engineer": "Full-Stack Engineer", "Software Engineer": "Software Engineer" },
  metadata: {
    home: { title: "J. Ha | Frontend Engineer", description: "Frontend engineer focused on reliable web applications. React, TypeScript, API integration, and existing application maintenance." },
    work: { title: "Professional Experience | J. Ha", description: "Professional employment history in frontend engineering, application development, maintenance, and debugging." },
    lab: { title: "Lab | J. Ha", description: "Personal frontend projects by J. Ha." },
    detail: { title: "API Rescue Lab | J. Ha", description: "A local sample-task simulation showing how a frontend stays useful when responses are slow, fail, or contain invalid data." },
  },
  home: {
    greeting: "Hello, I'm J. Ha · Frontend Engineer",
    headline: "Frontend Engineer focused on reliable web applications.",
    introduction: "I build, maintain, and debug frontend applications, with experience in React, TypeScript, API integration, AWS/serverless systems, and existing production codebases.",
    viewWork: "View my work", exploreLab: "Explore my Lab", workEyebrow: "01 / Professional work", experienceTitle: "Selected Experience", allWork: "View all work",
    labEyebrow: "02 / Personal project", labTitle: "Featured Lab", viewLab: "View Lab", aboutEyebrow: "03 / About", aboutTitle: "Frontend focus. Existing-system experience.",
    about: "I am a frontend-centered software engineer with around nine years of professional experience, primarily in Japan. My work includes data-heavy interfaces, monitoring applications, upgrades, and production debugging.",
    portfolioStack: "This portfolio is built with Next.js, React, and TypeScript.",
    skills: { frontend: "Frontend", integration: "Integration experience", practice: "Engineering practice", practiceItems: "Existing application maintenance, debugging, unit testing, integration support, Git" },
    workflowTitle: "How I work",
    workflow: [
      { title: "Understand", text: "Read the code and trace the existing behavior." },
      { title: "Reproduce", text: "Find the conditions that make the problem happen." },
      { title: "Fix", text: "Make a focused change at the source of the issue." },
      { title: "Verify", text: "Check the intended behavior and nearby failure cases." },
    ],
    contactEyebrow: "04 / Contact", contactTitle: "Have an application that needs attention?", contactText: "Get in touch about frontend development, maintenance, or a problem in an existing codebase.", email: "Email J. Ha",
  },
  work: {
    eyebrow: "Professional work", title: "Professional Experience", introduction: "Frontend development, application maintenance, and defect investigation across established systems.", employment: "Employment", selectedWork: "Selected Work", project: "Project",
    items: {
      dataAnalytics: { title: "Data Analytics Platform", description: "Developed and maintained React and TypeScript interfaces for a data analytics platform, including time-series visualization components and BI solution customization." },
      hvac: { title: "HVAC Monitoring & Management System", description: "Developed and maintained an Angular-based HVAC monitoring and management system connected to Python and AWS Lambda services. Upgraded the Angular frontend, added monitoring functionality, and resolved communication-protocol issues between devices and the management system." },
      existingBusiness: { title: "Existing Business Web Application", description: "Validated approximately 150 screens during environment and browser-related work, investigated defects by tracing JavaScript, PL/SQL, HTML, and CSS code, and implemented fixes for identified issues." },
      redevelopment: { title: "Business Web Application Redevelopment", description: "Participated in redevelopment of an existing business web application, implemented custom frontend and backend application logic, performed unit testing, and supported integration testing." },
      webDevelopment: { title: "Web application development", description: "Developed a web application using AWS Amplify and Serverless Framework, including authentication-related, user management, and multimedia features. Collaborated through code review." },
      platformMaintenance: { title: "Internal platform maintenance", description: "Maintained an internal data-mining platform." },
      systemMaintenance: { title: "Existing system maintenance and migration", description: "Maintained a Windows tablet system used for insurance sales and an existing business application, supported Windows 10 migration, and created unit-test documentation." },
    },
  },
  lab: {
    eyebrow: "Personal projects", title: "Lab", introduction: "Explore a working frontend simulation that handles slow, failed, and invalid responses while keeping its task view understandable.", projects: "Projects", cardOverline: "Personal project · Local simulation / sample data",
    homeSummary: "See how a frontend can stay useful when an API is slow, fails, or returns bad data.", indexSummary: "Try four response conditions in a local simulation with sample task data. See how the interface validates results, handles failure, and keeps previously loaded tasks visible when available.", openProject: "Open project",
  },
  detail: {
    back: "Back to Lab", eyebrow: "Personal project · Local simulation / sample data", introduction: "When a response is slow, fails, or contains bad data, users still need a clear status and any valid tasks they already loaded.", instruction: "Run Normal, try a failure, then run Normal again.", simulation: "Interactive simulation", simulator: "Interactive simulator", demonstrates: "What this demonstrates",
    demonstrations: ["Reject malformed task responses through response/schema validation before display.", "Preserve previously loaded valid tasks during failures. If none have loaded, show an empty state.", "Prevent stale request completions from overwriting newer state.", "Explain timeouts and failures, then provide a predictable way to retry or recover."],
    stepsTitle: "Try it in four steps", steps: ["Run Normal to load validated sample tasks.", "Run Invalid data or Server error. Notice the status and retained tasks.", "Run Slow response. Its 4-second response reaches a 2-second timeout.", "Select Normal and run again to recover."], retry: "Retry repeats the selected failure condition.",
  },
} satisfies Messages;

export default messages;
