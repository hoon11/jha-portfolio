type WorkItem = {
  title: string;
  description: string;
  projectDates?: string;
  technologies?: string;
};

type FeaturedExperience = WorkItem & {
  company: string;
  role: string;
  dates: string;
  technologies: string;
};

type Employment = {
  company: string;
  role: string;
  dates: string;
  selectedWork: WorkItem[];
};

const dataAnalytics: FeaturedExperience = {
  company: "KSK Analytics",
  role: "Frontend Engineer",
  dates: "Jan 2019 – Dec 2021",
  title: "Data Analytics Platform",
  description: "Developed and maintained React and TypeScript interfaces for a data analytics platform, including time-series visualization components and BI solution customization.",
  technologies: "React / TypeScript / Data visualization",
};

const hvac: FeaturedExperience = {
  company: "Strike System",
  role: "Full-Stack Engineer",
  dates: "Apr 2023 – Oct 2024",
  projectDates: "Apr 2023 – Oct 2024",
  title: "HVAC Monitoring & Management System",
  description: "Developed and maintained an Angular-based HVAC monitoring and management system connected to Python and AWS Lambda services. Upgraded the Angular frontend, added monitoring functionality, and resolved communication-protocol issues between devices and the management system.",
  technologies: "Angular / Python / AWS Lambda",
};

const existingBusiness: WorkItem = {
  projectDates: "Jan 2023 – Mar 2023",
  title: "Existing Business Web Application",
  description: "Validated approximately 150 screens during environment and browser-related work, investigated defects by tracing JavaScript, PL/SQL, HTML, and CSS code, and implemented fixes for identified issues.",
  technologies: "JavaScript / HTML / CSS / PL/SQL",
};

const employment: Employment[] = [
  {
    company: "Strike System",
    role: "Full-Stack Engineer",
    dates: "Jan 2023 – Apr 2026",
    selectedWork: [
      {
        projectDates: "Dec 2024 – Oct 2025",
        title: "Business Web Application Redevelopment",
        description: "Participated in redevelopment of an existing business web application, implemented custom frontend and backend application logic, performed unit testing, and supported integration testing.",
      },
      hvac,
      existingBusiness,
    ],
  },
  {
    company: "Creative Heroes",
    role: "Full-Stack Engineer",
    dates: "Jan 2022 – Dec 2022",
    selectedWork: [
      {
        title: "Web application development",
        description: "Developed a web application using AWS Amplify and Serverless Framework, including authentication-related, user management, and multimedia features. Collaborated through code review.",
        technologies: "AWS Amplify / Serverless Framework",
      },
    ],
  },
  {
    company: "KSK Analytics",
    role: "Frontend Engineer",
    dates: "Jan 2019 – Dec 2021",
    selectedWork: [
      dataAnalytics,
      {
        title: "Internal platform maintenance",
        description: "Maintained an internal data-mining platform.",
      },
    ],
  },
  {
    company: "Kissco Japan",
    role: "Software Engineer",
    dates: "Mar 2017 – Dec 2018",
    selectedWork: [
      {
        title: "Existing system maintenance and migration",
        description: "Maintained a Windows tablet system used for insurance sales and an existing business application, supported Windows 10 migration, and created unit-test documentation.",
      },
    ],
  },
];

export const portfolio = {
  name: "J. Ha",
  email: "jhoonen@gmail.com",
  linkedIn: "https://www.linkedin.com/in/jaehoon-ha-1a69b1142/",
  headline: "Frontend Engineer focused on reliable web applications.",
  introduction: "I build, maintain, and debug frontend applications, with experience in React, TypeScript, API integration, AWS/serverless systems, and existing production codebases.",
  experience: [dataAnalytics, hvac],
  employment,
  labProject: {
    title: "API Rescue Lab",
    href: "/lab/api-rescue-lab",
    homeSummary: "See how a frontend can stay useful when an API is slow, fails, or returns bad data.",
    indexSummary: "Try four response conditions in a local simulation with sample task data. See how the interface validates results, handles failure, and keeps previously loaded tasks visible when available.",
    technologies: "React / TypeScript",
  },
  skills: [
    { title: "Frontend", items: "React, TypeScript, JavaScript, Angular, HTML, CSS" },
    { title: "Integration experience", items: "REST APIs, AWS Lambda, AWS Amplify, Serverless Framework, Python" },
    { title: "Engineering practice", items: "Existing application maintenance, debugging, unit testing, integration support, Git" },
  ],
  workflow: [
    { title: "Understand", text: "Read the code and trace the existing behavior." },
    { title: "Reproduce", text: "Find the conditions that make the problem happen." },
    { title: "Fix", text: "Make a focused change at the source of the issue." },
    { title: "Verify", text: "Check the intended behavior and nearby failure cases." },
  ],
};
