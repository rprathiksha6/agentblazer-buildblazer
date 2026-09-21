export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Phase 2 Build Blazer Kickoff!",
    message: "Third-year teams can now fork the official repository and submit their live deployment links before the countdown ends.",
    date: "Sep 21, 2026",
    urgency: "high", // high, normal, info
    read: false,
    audience: "all"
  },
  {
    id: "notif-2",
    title: "Mentor Office Hours with Stevin Dsouza",
    message: "Tech Lead Stevin Dsouza is holding open review sessions for git fork troubleshooting today in CSE Lab 3.",
    date: "Sep 20, 2026",
    urgency: "normal",
    read: false,
    audience: "students"
  },
  {
    id: "notif-3",
    title: "Agentforce Dev Summit Pre-Registrations Open",
    message: "Early bird access for the upcoming Agentforce Summit on November 18, 2026 is now live in the Activities tab.",
    date: "Sep 18, 2026",
    urgency: "info",
    read: true,
    audience: "all"
  }
];

export const INITIAL_DOUBTS = [
  {
    id: "DBT-1041",
    studentName: "Rahul Shetty",
    usn: "4SO23CS142",
    email: "rahul.23cs@sjec.ac.in",
    dept: "Computer Science & Engg",
    year: "3rd Year",
    category: "Build Blazer Phase 2",
    subject: "Can we use Next.js App Router for deployment?",
    query: "Our team wants to use Next.js 15 with Tailwind and deploy on Vercel. Is App Router allowed or do we need purely static HTML/client-side React?",
    status: "answered", // pending, in-review, answered
    adminReply: "Yes, absolutely! Next.js App Router deployed on Vercel is completely acceptable as long as it adheres strictly to the Figma design.",
    submittedAt: "2026-09-21 14:30",
    repliedAt: "2026-09-21 16:15",
    repliedBy: "Stevin Dsouza (Tech Lead)"
  },
  {
    id: "DBT-1042",
    studentName: "Ananya Pai",
    usn: "4SO23CS019",
    email: "ananya.23cs@sjec.ac.in",
    dept: "Computer Science & Engg",
    year: "3rd Year",
    category: "Workshops & Certifications",
    subject: "Certificate distribution for Agentforce Symposium",
    query: "Hello coordinators, when will the participation e-certificates for the August 25 Agentforce Symposium be dispatched?",
    status: "pending",
    adminReply: null,
    submittedAt: "2026-09-21 18:45",
    repliedAt: null,
    repliedBy: null
  },
  {
    id: "DBT-1043",
    studentName: "Karthik Nayak",
    usn: "4SO22CS088",
    email: "karthik.22cs@sjec.ac.in",
    dept: "Computer Science & Engg",
    year: "4th Year",
    category: "Autonomous Agents",
    subject: "Hardware requirements for Agentic AI Hackfest",
    query: "Are local GPU workstations provided during the 24h Hackfest, or will cloud credits (like Google Cloud/AWS) be provided to participants?",
    status: "in-review",
    adminReply: "We are coordinating with Salesforce and SJEC cloud lab to provide cloud sandbox credits to all approved teams.",
    submittedAt: "2026-09-20 20:10",
    repliedAt: "2026-09-21 09:20",
    repliedBy: "Frenny Saldanha (Resource Head)"
  }
];

export const INITIAL_SUBMISSIONS = [
  {
    id: "SUB-801",
    teamName: "NeuralBlazers",
    teamLead: "Sanjay Rao",
    leadUsn: "4SO23CS165",
    leadEmail: "sanjay.23cs@sjec.ac.in",
    members: ["Sanjay Rao (4SO23CS165)", "Deepa Bhat (4SO23CS045)", "Nihal Crasta (4SO23CS112)"],
    figmaUrl: "https://www.figma.com/file/sample-agentblazer-track-a",
    githubRepoUrl: "https://github.com/NeuralBlazers/agentblazer-buildblazer-p2",
    deployedUrl: "https://neural-blazer-sjec.vercel.app",
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    status: "approved", // pending, under_review, approved, needs_revision
    score: 92,
    feedback: "Exceptional design fidelity and smooth responsive navigation. Great commit history.",
    submittedAt: "2026-09-21 11:20"
  },
  {
    id: "SUB-802",
    teamName: "CodeSentinels",
    teamLead: "Prateeksha Kamath",
    leadUsn: "4SO23CS134",
    leadEmail: "prateeksha.23cs@sjec.ac.in",
    members: ["Prateeksha Kamath (4SO23CS134)", "Varun Shenoy (4SO23CS198)"],
    figmaUrl: "https://www.figma.com/file/sample-agentblazer-track-b",
    githubRepoUrl: "https://github.com/CodeSentinels/agentblazer-buildblazer",
    deployedUrl: "https://codesentinels-agentblazer.netlify.app",
    techStack: ["Next.js", "Tailwind CSS", "Lucide React"],
    status: "under_review",
    score: null,
    feedback: "Reviewing responsiveness on mobile viewports.",
    submittedAt: "2026-09-21 16:45"
  },
  {
    id: "SUB-803",
    teamName: "Agentic Forge",
    teamLead: "Melvin Noronha",
    leadUsn: "4SO23CS101",
    leadEmail: "melvin.23cs@sjec.ac.in",
    members: ["Melvin Noronha (4SO23CS101)", "Adithya Poojary (4SO23CS008)", "Bhavana Rai (4SO23CS033)"],
    figmaUrl: "https://www.figma.com/file/sample-agentblazer-track-c",
    githubRepoUrl: "https://github.com/AgenticForge/buildblazer-fork",
    deployedUrl: "https://agenticforge-sjec.pages.dev",
    techStack: ["React", "CSS Modules", "Vite"],
    status: "needs_revision",
    score: 74,
    feedback: "Footer alignment is breaking on smaller displays, and README is missing member roles. Please update your fork and redeploy.",
    submittedAt: "2026-09-20 22:15"
  }
];
