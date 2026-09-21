import keithPhoto from '../assets/keith-fernandes.png';
import rubenPhoto from '../assets/ruben-saldanha.png';

export const CLUB_META = {
  name: "AgentBlazer Club",
  shortName: "AgentBlazer",
  tagline: "Pioneering Autonomous & Agentic AI Systems",
  department: "Department of Computer Science & Engineering",
  institution: "St Joseph Engineering College, Mangaluru (SJEC)",
  established: "August 25, 2025",
  academicYear: "2025–2026",
  email: "agentblazer@sjec.ac.in",
  portalPasscode: "agentblazer2026",
  stats: [
    { label: "Workshops & Challenges", value: "8+", detail: "Hands-on labs & hackathons" },
    { label: "Engineering Students Reached", value: "500+", detail: "Across SJEC tech branches" },
    { label: "Salesforce Community Partner", value: "Active", detail: "Premier Trailblazer synergy" },
    { label: "Agentic AI Deployments", value: "35+", detail: "Autonomous prototypes built" }
  ],
  description: "A dedicated student-led laboratory shaping tomorrow's software engineers through autonomous agent architectures, open-source AI tooling, collaborative workshops, and premier Salesforce Trailblazer community synergy."
};

export const HONORED_GUESTS = [
  {
    name: "Mr. Santosh Rebello",
    role: "Guest of Honor & Keynote Speaker",
    organization: "Salesforce",
    badge: "Keynote Speaker",
    initials: "SR",
    bio: "Industry leader in enterprise cloud and agentic automation, sharing insights on Salesforce Agentforce and the evolving AI developer ecosystem."
  },
  {
    name: "Mr. Stephen Pinto",
    role: "Technical Mentor & Alumni Guide",
    organization: "Salesforce & SJEC Alumnus",
    badge: "Alumni Guide",
    initials: "SP",
    bio: "SJEC alumnus championing student open-source contributions, distributed software design, and real-world agent orchestration."
  },
  {
    name: "Dr. Rio D'Souza",
    role: "Presidential Address & Patron",
    organization: "Principal, SJEC",
    badge: "Patron",
    initials: "RD",
    bio: "Visionary academic leader driving innovation labs, interdisciplinary research, and experiential learning across engineering disciplines at SJEC."
  },
  {
    name: "Dr. Melwyn D'Souza",
    role: "Program Chair & Department Head",
    organization: "HOD, Computer Science & Engg",
    badge: "Department Head",
    initials: "MD",
    bio: "Leading CSE curriculum modernization, AI/ML specialization tracks, and university-industry co-designed centers of excellence."
  }
];

export const FACULTY_COUNCIL = [
  {
    name: "Mr. Keith Fernandes",
    designation: "Assistant Professor, CSE Dept",
    role: "Faculty Coordinator",
    badge: "Leadership",
    photo: keithPhoto,
    bio: "Mentoring autonomous AI projects, cloud infrastructure labs, and coordinating hackathons and industrial tie-ups for students.",
    focus: "Cloud Computing • Agentic AI • Student Research"
  },
  {
    name: "Ms. Nisha Roche",
    designation: "Assistant Professor, CSE Dept",
    role: "Faculty Coordinator",
    badge: "Faculty Advisor",
    photo: null,
    initials: "NR",
    bio: "Guiding club governance, curriculum synchronization, competitive coding mentorship, and student development programs.",
    focus: "Algorithms • Machine Learning • Academic Liaison"
  }
];

export const STUDENT_CORE_TEAM = [
  {
    name: "Ruben Saldanha",
    title: "Executive President",
    role: "President",
    badge: "Executive President",
    photo: rubenPhoto,
    desc: "Guiding club vision, university collaborations, and strategic workshop series across bleeding-edge AI disciplines.",
    year: "4th Year CSE",
    github: "https://github.com/rubensaldanha",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Ajay Preenal Dsouza",
    title: "Executive Vice President",
    role: "Vice President",
    badge: "Vice President",
    photo: null,
    initials: "AD",
    desc: "Coordinating student mentorship, event operations, cross-departmental outreach, and community growth.",
    year: "4th Year CSE",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Stevin Dsouza",
    title: "Technical Direction",
    role: "Tech Lead",
    badge: "Tech Lead",
    photo: null,
    initials: "SD",
    desc: "Technical architectures, hands-on lab environments, Build Blazer repository supervision, and code review.",
    year: "3rd Year CSE",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Frenny Chrystal Saldanha",
    title: "Operations & Logistics",
    role: "Resource Head",
    badge: "Resource Head",
    photo: null,
    initials: "FS",
    desc: "Managing cloud compute budgets, venue infrastructure, workshop hardware, and participant toolkits.",
    year: "3rd Year CSE",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Chinthan N V",
    title: "Creative Outreach",
    role: "Media Head",
    badge: "Media Head",
    photo: null,
    initials: "CN",
    desc: "Brand storytelling, photo documentation, visual design systems, UI/UX curation, and social publications.",
    year: "3rd Year CSE",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Secretariat & Documentation",
    title: "Administration",
    role: "Secretary",
    badge: "Secretary",
    photo: null,
    initials: "SC",
    desc: "Documentation, accreditation reporting, meeting minutes, participant certification, and member onboarding.",
    year: "3rd Year CSE",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  }
];

export const ACTIVITIES = [
  {
    id: "act-1",
    type: "past",
    title: "AgentBlazer Club Launch & Agentforce Symposium",
    date: "August 25, 2025",
    venue: "SJEC Campus Auditorium",
    category: "Inauguration",
    tag: "Milestone",
    attendees: "350+ Students & Faculty",
    summary: "The official launch of AgentBlazer Club by the Department of Computer Science & Engineering, featuring keynote address by Salesforce leaders and live Agentforce demonstrations.",
    highlights: ["Inauguration Keynote", "Live Agentforce Demonstration", "Student AI Charter Release"]
  },
  {
    id: "act-2",
    type: "past",
    title: "Hands-on Autonomous Agent Architectures",
    date: "October 14, 2025",
    venue: "CSE Advanced Computing Lab",
    category: "Technical Workshop",
    tag: "Deep Dive",
    attendees: "120 Attendees",
    summary: "Intensive build-along workshop implementing multi-agent workflows using LangGraph, CrewAI, and Gemini tool calling.",
    highlights: ["LangGraph Workflows", "Function Calling Labs", "Docker Containerization"]
  },
  {
    id: "act-3",
    type: "past",
    title: "Salesforce Trailblazer Synergy & AI Dev Sprint",
    date: "December 05, 2025",
    venue: "Seminar Hall 2, SJEC",
    category: "Industry Workshop",
    tag: "Industry Partner",
    attendees: "180 Attendees",
    summary: "Industry session with Salesforce engineering mentors exploring enterprise AI integrations, data cloud, and career pathways.",
    highlights: ["Alumni Mentorship", "Enterprise AI Architecture", "Live Q&A with Salesforce Engineers"]
  },
  {
    id: "act-4",
    type: "upcoming",
    title: "Build Blazer — Phase 2: Design to Live Deployment",
    date: "Ongoing • Submissions Open",
    venue: "Online & GitHub / SJEC CSE Labs",
    category: "Hackathon / Live Build",
    tag: "Featured Challenge",
    attendees: "Third-Year Teams",
    summary: "Turn winning Phase 1 Figma designs into high-performance, deployed web applications. Fork the official repo, build, commit cleanly, and deploy to Vercel/Netlify.",
    highlights: ["Fork & Build Workflow", "Figma Design Fidelity", "Automated Submission Verification", "Live Judging"]
  },
  {
    id: "act-5",
    type: "upcoming",
    title: "Agentforce Dev Summit & Autonomous Agents Expo 2026",
    date: "November 18, 2026",
    venue: "Prerana Hall, SJEC",
    category: "Flagship Summit",
    tag: "Upcoming Flagship",
    attendees: "Open Registration",
    summary: "Annual flagship summit bringing national AI practitioners, tech keynotes, live agent demonstrations, and student project showcases.",
    highlights: ["Keynote Presentations", "Autonomous Robotics & AI Demos", "Project Exhibition & Awards"]
  },
  {
    id: "act-6",
    type: "upcoming",
    title: "Campus Agentic AI 24h Hackfest",
    date: "December 12–13, 2026",
    venue: "SJEC Incubation Center",
    category: "24-Hour Hackathon",
    tag: "Competitive",
    attendees: "Limited to 30 Teams",
    summary: "Build autonomous agent solutions solving real problems in smart agriculture, campus logistics, code review, and assistive accessibility.",
    highlights: ["24-Hour Non-stop Hacking", "Industry Mentors on-site", "Cash Prizes & Incubation Support"]
  }
];

export const BUILD_BLAZER_INFO = {
  phase: "Phase 2: Live Build & Deployment",
  repoUrl: "https://github.com/AgentBlazer/agentblazer-buildblazer.git",
  steps: [
    { step: 1, title: "Fork Repository", desc: "Fork the official agentblazer-buildblazer repo to your GitHub account." },
    { step: 2, title: "Clone & Implement", desc: "Clone locally, set up modern stack (React/Vite/Tailwind), and match assigned Figma design." },
    { step: 3, title: "Commit Regularly", desc: "Commit small, meaningful commits demonstrating team collaboration and git hygiene." },
    { step: 4, title: "Deploy Live", desc: "Deploy your project to Vercel, Netlify, or Cloudflare Pages with SSL." },
    { step: 5, title: "Submit Details", desc: "Submit your team lead, member USNs, GitHub fork link, and live URL via the portal." }
  ],
  rubric: [
    { title: "Design Fidelity", weight: "30%", desc: "Precision matching assigned Figma design, typography, spacing, and brand identity." },
    { title: "Code Quality & Git Hygiene", weight: "25%", desc: "Modular architecture, clean React components, semantic commits, and zero build warnings." },
    { title: "Responsiveness & UX", weight: "25%", desc: "Flawless mobile, tablet, and widescreen layouts with snappy transitions." },
    { title: "Deployment & Functionality", weight: "20%", desc: "Fast LCP, active live domain, interactive features, and accessible UI." }
  ]
};
