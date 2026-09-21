export const PRESET_QUESTIONS = [
  {
    id: "q-1",
    question: "What is AgentBlazer?",
    shortLabel: "What is AgentBlazer?",
    category: "About Club",
    answer: "AgentBlazer Club is the premier student-led AI & autonomous agents laboratory established by the Department of Computer Science & Engineering at St Joseph Engineering College (SJEC), Mangaluru. Inaugurated on August 25, 2025, in partnership with Salesforce Trailblazer community, the club empowers students through autonomous agent architectures, open-source AI tooling, collaborative workshops, and competitive hackathons.",
    action: { label: "Explore About Us", targetId: "about-section" }
  },
  {
    id: "q-2",
    question: "Who are the club mentors, faculty & student leads?",
    shortLabel: "Who runs the club?",
    category: "Leadership",
    answer: "The club is guided by Faculty Coordinators Mr. Keith Fernandes and Ms. Nisha Roche (Assistant Professors, CSE Dept). Our honored mentors include Mr. Santosh Rebello (Salesforce Keynote Speaker) and Mr. Stephen Pinto (Salesforce & SJEC Alumnus). The Student Core Team is spearheaded by Ruben Saldanha (Executive President), Ajay Preenal Dsouza (Vice President), Stevin Dsouza (Tech Lead), Frenny Chrystal Saldanha (Resource Head), and Chinthan N V (Media Head).",
    action: { label: "View Team Profiles", targetId: "members-section" }
  },
  {
    id: "q-3",
    question: "What is Build Blazer Phase 2?",
    shortLabel: "What is Build Blazer?",
    category: "Challenges",
    answer: "Build Blazer is AgentBlazer Club's flagship design-to-code competition. In Phase 2, third-year engineering teams fork the official repository (github.com/AgentBlazer/agentblazer-buildblazer), implement the winning Phase 1 Figma design into a responsive, production-ready website, and deploy it live to Vercel/Netlify for evaluation.",
    action: { label: "Open Build Blazer Portal", targetId: "buildblazer-section" }
  },
  {
    id: "q-4",
    question: "How do I submit my team's project?",
    shortLabel: "How to submit project?",
    category: "Submission",
    answer: "Head over to the 'Build Blazer Phase 2' section on this website! Fill out the submission form with your Team Name, Team Lead USN, Member details, Figma Reference URL, GitHub Fork repository URL, and the Live Deployed website link (e.g. Vercel/Netlify). Your submission will be recorded directly into the club's evaluation ledger.",
    action: { label: "Go to Submission Form", targetId: "buildblazer-submission-form" }
  },
  {
    id: "q-5",
    question: "How do I ask a doubt or get help from coordinators?",
    shortLabel: "How to ask a doubt?",
    category: "Doubts Desk",
    answer: "Use our dedicated 'Ask a Doubt' portal section! Enter your student credentials (Name, USN, College Email, Dept, Year), choose your query category (Workshops, Build Blazer, Autonomous Agents, Membership), and submit your question. It will be routed directly to the Admin Portal where faculty coordinators and leads can reply to you.",
    action: { label: "Submit a Doubt", targetId: "ask-doubt-section" }
  },
  {
    id: "q-6",
    question: "What are the upcoming workshops and events?",
    shortLabel: "Upcoming activities?",
    category: "Events",
    answer: "Upcoming events include: 1) Build Blazer Phase 2 Live Build Sprint (Ongoing), 2) Agentforce Dev Summit & Autonomous Agents Expo 2026 (November 18, 2026 at Prerana Hall), and 3) Campus Agentic AI 24h Hackfest (December 12-13, 2026 at SJEC Incubation Center).",
    action: { label: "View All Activities", targetId: "activities-section" }
  },
  {
    id: "q-7",
    question: "What tech stack is recommended for Build Blazer?",
    shortLabel: "Allowed tech stack?",
    category: "Technical",
    answer: "Teams are encouraged to use modern frontend frameworks such as React (with Vite or Next.js), Vue, or Svelte, combined with Tailwind CSS for rapid responsive styling. The deployment can be on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.",
    action: { label: "Review Guidelines", targetId: "buildblazer-section" }
  },
  {
    id: "q-8",
    question: "How do I switch to the Admin Portal?",
    shortLabel: "How to access Admin?",
    category: "Admin",
    answer: "Club organizers can access the Admin Portal by clicking the 'Admin Portal' button in the top navigation bar. Enter the organizer passcode ('agentblazer2026') to manage student doubts, review Build Blazer team submissions, and publish real-time broadcast alerts.",
    action: { label: "Admin Login", targetId: "nav-admin-btn" }
  }
];

export const BOT_KEYWORDS_MAP = [
  { keywords: ["who", "member", "president", "ruben", "keith", "faculty", "coordinator", "team", "lead", "leadership"], questionId: "q-2" },
  { keywords: ["build blazer", "phase 2", "competition", "hackathon", "fork", "repo", "challenge"], questionId: "q-3" },
  { keywords: ["submit", "submission", "deadline", "link", "form", "deployed", "vercel"], questionId: "q-4" },
  { keywords: ["doubt", "ask", "question", "help", "query", "credential", "usn"], questionId: "q-5" },
  { keywords: ["upcoming", "event", "workshop", "symposium", "activities", "dates", "schedule"], questionId: "q-6" },
  { keywords: ["tech stack", "react", "tailwind", "next", "framework", "rules"], questionId: "q-7" },
  { keywords: ["admin", "portal", "passcode", "password", "login", "organizer"], questionId: "q-8" },
  { keywords: ["agentblazer", "what is", "about", "sjec", "cse", "salesforce", "club"], questionId: "q-1" }
];
