import keithPhoto from '../assets/keith-fernandes.png';
import rubenPhoto from '../assets/ruben-saldanha.png';
import promptOpsPoster from '../assets/prompt-ops-poster.png';
import campusPhoto from '../assets/campus-activity.jpg';

export const CLUB_META = {
  name: "AgentBlazer Club",
  shortName: "AgentBlazer",
  tagline: "Pioneering Autonomous & Agentic AI Systems",
  department: "Department of Computer Science & Engineering",
  institution: "St Joseph Engineering College, Mangaluru (SJEC)",
  address: "St Joseph Engineering College, Vamanjoor, Mangaluru, Karnataka - 575028, India",
  inaugurationDate: "August 28, 2025",
  academicYear: "2025–2026",
  email: "agentblazer@sjec.ac.in",
  portalPasscode: "agentblazer2026",
  stats: [
    { label: "Technical Workshops & Contests", value: "7+", detail: "Hands-on labs & hackathons" },
    { label: "Engineering Students Reached", value: "500+", detail: "Across SJEC CSE & AI/ML" },
    { label: "Salesforce Community Partner", value: "Active", detail: "Premier Trailblazer synergy" },
    { label: "Autonomous Agent Prototypes", value: "35+", detail: "Student-engineered systems" }
  ],
  description: "A dedicated student-led laboratory shaping tomorrow's software engineers through autonomous agent architectures, open-source AI tooling, collaborative workshops, and premier Salesforce Trailblazer community synergy."
};

export const HONORED_GUESTS = [
  {
    name: "Mr. Santosh Rebello",
    role: "Chief Guest & Keynote Speaker",
    organization: "Salesforce",
    badge: "Keynote Speaker",
    initials: "SR",
    bio: "Chief Guest at the club inauguration on August 28, 2025. Emphasized bridging the 'role–radiance gap' and exploring agentic automation within the Salesforce ecosystem."
  },
  {
    name: "Mr. Stephen Pinto",
    role: "Guest of Honor & Technical Mentor",
    organization: "Salesforce & SJEC Alumnus",
    badge: "Alumni Guide",
    initials: "SP",
    bio: "SJEC alumnus encouraging continuous learning, open agent orchestration, and Salesforce Data Cloud solutions for enterprise-grade autonomous workflows."
  },
  {
    name: "Dr. Rio D'Souza",
    role: "Patron & Presidential Address",
    organization: "Principal, SJEC",
    badge: "Patron",
    initials: "RD",
    bio: "Principal of SJEC. Called on students at the club launch to seize autonomous AI growth opportunities, interdisciplinary research, and experiential engineering."
  },
  {
    name: "Dr. Melwyn D'Souza",
    role: "Program Chair & Department Head",
    organization: "HOD, Computer Science & Engg",
    badge: "Department Head",
    initials: "MD",
    bio: "Delivered the welcome address at the inauguration and actively supports curriculum modernization, competitive AI contests, and industry collaborations."
  }
];

export const FACULTY_COUNCIL = [
  {
    name: "Mr. Keith Fernandes",
    designation: "Assistant Professor, CSE Dept",
    role: "Faculty Coordinator",
    badge: "Faculty Leadership",
    photo: keithPhoto,
    bio: "Coordinated the official club launch, cloud labs, and hands-on developer sprints bridging autonomous AI theory with student engineering practices.",
    focus: "Cloud Computing • Autonomous Agent Architectures • Industry Alliances"
  },
  {
    name: "Ms. Nisha Roche",
    designation: "Assistant Professor, CSE Dept",
    role: "Faculty Coordinator",
    badge: "Faculty Coordinator",
    photo: null,
    initials: "NR",
    bio: "Faculty Coordinator guiding Prompt Ops-2K26, Generative Models workshops, and GSoC preparation. Presented token of appreciation to HackerRank mentors.",
    focus: "AI Governance • Competitive Programming • Academic Mentorship"
  },
  {
    name: "Ms. Jaishma K",
    designation: "Assistant Professor, CSE Dept",
    role: "Faculty Guide",
    badge: "Faculty Guide",
    photo: null,
    initials: "JK",
    bio: "Faculty Guide for Prompt Ops-2K26, coordinating first and second-year competition tracks, prompt verification, and student evaluation.",
    focus: "Software Engineering • AI Testing • Educational Technology"
  }
];

export const STUDENT_CORE_TEAM = [
  {
    name: "Ruben Saldanha",
    title: "Executive President",
    role: "Student President",
    badge: "Student President",
    photo: rubenPhoto,
    desc: "Delivered the Vote of Thanks at the August 28, 2025 inauguration. Spearheading club vision, university workshops, autonomous agent research, and collaborative industry sessions.",
    year: "4th Year CSE",
    phone: "+91 98765 43210",
    email: "ruben.22cs@sjec.ac.in"
  },
  {
    name: "Ajay Preenal Dsouza",
    title: "Executive Vice President",
    role: "Vice President",
    badge: "Vice President",
    photo: null,
    initials: "AD",
    desc: "Opened the GSoC & LLMs Workshop with the official welcome address. Coordinating operational logistics, community growth, and peer hackathons.",
    year: "4th Year CSE",
    email: "ajay.22cs@sjec.ac.in"
  },
  {
    name: "Stevin Dsouza",
    title: "Technical Direction",
    role: "Tech Lead",
    badge: "Tech Lead",
    photo: null,
    initials: "SD",
    desc: "Technical architectures, autonomous agent lab supervision, hands-on developer environments, code review, and project mentoring.",
    year: "3rd Year CSE",
    email: "stevin.23cs@sjec.ac.in"
  },
  {
    name: "Frenny Chrystal Saldanha",
    title: "Operations & Logistics",
    role: "Resource Head",
    badge: "Resource Head",
    photo: null,
    initials: "FS",
    desc: "Managing compute infrastructure, lab software environments, venue equipment, and participant toolkits across all club workshops.",
    year: "3rd Year CSE",
    email: "frenny.23cs@sjec.ac.in"
  },
  {
    name: "Chinthan N V",
    title: "Creative Outreach",
    role: "Media Head",
    badge: "Media Head",
    photo: null,
    initials: "CN",
    desc: "Visual branding, event posters, media documentation, photography, social publications, and frontend design curation.",
    year: "3rd Year CSE",
    email: "chinthan.23cs@sjec.ac.in"
  },
  {
    name: "Secretariat & Documentation",
    title: "Administration",
    role: "Secretary",
    badge: "Secretary",
    photo: null,
    initials: "SC",
    desc: "Official documentation, event reporting, PO mapping accreditation, attendance ledgers, and participant e-certification.",
    year: "3rd Year CSE",
    email: "agentblazer@sjec.ac.in"
  }
];

// All 7 official events provided by the user!
export const ACTIVITIES = [
  {
    id: "act-inauguration",
    type: "past",
    title: "AgentBlazer Club Inauguration",
    date: "August 28, 2025",
    venue: "SJEC Campus Auditorium",
    category: "Club Launch",
    tag: "Milestone",
    attendees: "350+ Students & Faculty",
    image: campusPhoto,
    poster: null,
    summary: "The Department of Computer Science & Engineering formally inaugurated the AgentBlazer Club to foster leadership, innovation, and technical excellence among students.",
    details: "Chief Guest Mr. Santosh Rebello (Salesforce) emphasized bridging the 'role–radiance gap', while Guest of Honor Mr. Stephen Pinto (Salesforce & SJEC alumnus) encouraged continuous learning. Principal Dr. Rio D’Souza called on students to seize growth opportunities. Coordinated by Mr. Keith Fernandes and Ms. Nisha Roche, the ceremony included lamp-lighting, welcome address by HOD Dr. Melwyn D’Souza, and Vote of Thanks by Student President Mr. Reuben Saldanha.",
    highlights: ["Lamp Lighting Ceremony", "Role–Radiance Gap Keynote", "Student Charter Release", "Faculty & Leadership Felicitations"]
  },
  {
    id: "act-agentforce-session",
    type: "past",
    title: "Agentforce Technical Session",
    date: "August 28, 2025",
    venue: "Prerana Hall / CSE Seminar Hall",
    category: "Technical Keynote",
    tag: "Ref: CSE/AB/2025-26/02",
    attendees: "200+ Students",
    image: campusPhoto,
    poster: null,
    summary: "Salesforce executives Mr. Santhosh Rebello and Mr. Stephen Pinto delivered an expert session on Agentforce and AI career opportunities.",
    details: "The speakers traced AI evolution through Predictive AI, Copilot, and Agentic AI (autonomous systems using Salesforce Data Cloud). They highlighted key career pathways in Salesforce Administration, Analytics, and Solution Development, urging students to build adaptability within the Trailblazer ecosystem.",
    highlights: ["Predictive vs Agentic AI", "Salesforce Data Cloud", "Trailblazer Career Pathways", "Enterprise Architecture Q&A"]
  },
  {
    id: "act-gsoc-llm",
    type: "past",
    title: "Master the Future: Hands-on GSOC & LLMs Workshop",
    date: "February 14, 2026",
    venue: "CSE Advanced Computing Lab",
    category: "Hands-on Masterclass",
    tag: "Flagship Masterclass",
    attendees: "55 Shortlisted Students",
    image: campusPhoto,
    poster: null,
    summary: "Hands-on workshop conducted by Mr. Anas Khan (Software Development Engineer at HackerRank) on open-source GSoC workflows and LLM architectures.",
    details: "Provided practical GitHub workflow training (forking, cloning, pull requests), Google Summer of Code (GSOC) roadmaps, and LLM parameters (Temperature, Top-P, Max Tokens). Topics covered: prompt strategies, RAG (Retrieval Augmented Generation), function calling, Gemini AI, LangChain, LlamaIndex, CrewAI, Gradio, and Streamlit. Welcome by VP Ajay D'Souza, Vote of Thanks by President Ruben Saldanha, token of appreciation presented by Ms. Nisha J Roche.",
    highlights: ["GitHub Fork & PR Workflows", "GSoC Roadmap by HackerRank SDE", "RAG & Function Calling", "LangChain & CrewAI Demos"]
  },
  {
    id: "act-gen-models",
    type: "past",
    title: "Demystifying Generative Models",
    date: "March 18, 2026",
    venue: "CSE Systems Lab",
    category: "Peer-Learning Workshop",
    tag: "PO4, PO6, PO7, PO11",
    attendees: "6th-Semester CSE Students",
    image: campusPhoto,
    poster: null,
    summary: "Peer-led workshop on Generative AI, transformer mechanisms, and AI governance guided by Ms. Nisha J. Roche.",
    details: "6th-semester CSE students Prajwal Royston Corderio and Chacko P Abraham led this hands-on workshop. Covered AI governance frameworks (LLM Council), transformer mechanisms, prompt engineering, and comparative benchmark analysis of LLaMA, Groq, Mistral AI, ChatGPT, GitHub Copilot, and Perplexity. Featured an AI quiz, a 3-stage model evaluation challenge, and a feature-modification coding sprint.",
    highlights: ["Peer-Led by 6th-Sem Students", "LLM Council Governance", "Transformer Mechanisms", "Groq, LLaMA & Mistral Benchmarks"]
  },
  {
    id: "act-prompt-ops",
    type: "past",
    title: "PROMPT OPS-2K26 Competition",
    date: "March 25, 2026",
    venue: "CSE Department Labs",
    category: "Technical Competition",
    tag: "Live Contest",
    attendees: "1st & 2nd Year Engineers",
    image: campusPhoto,
    poster: promptOpsPoster,
    summary: "Flagship prompt engineering and AI tools competition organized under the guidance of Ms. Nisha J Roche, Ms. Jaishma K, and HOD Dr. Melwyn D’Souza.",
    details: "Mapped to PO4, PO5, PO8, PO11. Track 1 (1st Year) featured invitation generation, logo recreation, and image recreation rounds, won by Chinmayee, Chris Royston Monteiro, and Deeksha Ravi Moger. Track 2 (2nd Year) tested students in JSON conversion, Python debugging, and a Gemini AI security prompt extraction challenge, won by Harimurali KS, Venus Suhani D’Lima, and Venisha Snehal D’Souza.",
    highlights: ["Track 1: Logo & Image Recreation", "Track 2: Gemini Security Extraction", "Top Honors Awarded", "PO4, PO5, PO8, PO11 Mapped"]
  },
  {
    id: "act-cyber-sec",
    type: "past",
    title: "Cyber Security and Career Pathways",
    date: "April 01, 2026",
    venue: "CSE Seminar Hall",
    category: "Industry Workshop",
    tag: "PO6, PO7, PO9, PO11",
    attendees: "6th-Semester Students",
    image: campusPhoto,
    poster: null,
    summary: "Hands-on security session delivered by Mr. Suhas Nayak (Tech Lead – SecOps, Ingersoll Rand) with live penetration tool demos.",
    details: "Provided practical exposure to core security concepts, live tool demonstrations including Shodan, OSINT techniques, Google Dorking, CVE management, SQL Injection, and the Cyber Kill Chain model. Concluded with actionable guidance on careers as Security Analysts, SOC Analysts, Ethical Hackers, and Cloud Security Engineers.",
    highlights: ["Shodan & OSINT Live Demos", "SQL Injection & Cyber Kill Chain", "Ingersoll Rand SecOps Lead", "Security Analyst Pathways"]
  },
  {
    id: "act-agentforce-workshop",
    type: "past",
    title: "Agentforce Workshop",
    date: "May 22, 2026",
    venue: "Advanced Computing Lab & Salesforce Sandbox",
    category: "Hands-on Technical Lab",
    tag: "Salesforce Trailhead",
    attendees: "AgentBlazer Members",
    image: campusPhoto,
    poster: null,
    summary: "Collaborative hands-on workshop building AI agents and prompt automation inside Salesforce Trailhead environment.",
    details: "Coordinated by faculty coordinator Ms. Nisha Roche and student coordinator Mr. Ruben Saldanha. Students gained practical experience designing Sales Email Prompt Templates, Flex Prompt Templates, and configuring automated prompt flows to build reusable AI structures. Concluded with interactive discussion on enterprise applications and Salesforce career opportunities.",
    highlights: ["Sales Email Prompt Templates", "Flex Prompt Templates", "Automated Prompt Flows", "Salesforce Trailhead Dev Orgs"]
  },
  {
    id: "act-bootcamp-2026",
    type: "upcoming",
    title: "Autonomous Agents & LangGraph Bootcamp",
    date: "October 10, 2026",
    venue: "Advanced Computing Lab, SJEC",
    category: "Hands-on Bootcamp",
    tag: "Upcoming Sprints",
    attendees: "All Branches Welcome",
    image: campusPhoto,
    poster: null,
    summary: "Intensive multi-agent orchestration bootcamp covering LangChain, LangGraph state machines, vector databases, and multi-turn autonomous tool execution.",
    highlights: ["LangGraph State Workflows", "Vector Search & Retrieval", "Multi-Agent Collaboration", "Tool Calling Architecture"]
  },
  {
    id: "act-dev-summit-2026",
    type: "upcoming",
    title: "Agentforce Dev Summit & Autonomous Agents Expo 2026",
    date: "November 18, 2026",
    venue: "Prerana Hall, SJEC",
    category: "Flagship Summit",
    tag: "Upcoming Flagship",
    attendees: "Open Registration",
    image: campusPhoto,
    poster: null,
    summary: "Annual flagship summit bringing national AI practitioners, tech keynotes, live agent demonstrations, and student project showcases.",
    highlights: ["Keynote Presentations", "Autonomous Robotics & AI Demos", "Project Exhibition & Awards"]
  },
  {
    id: "act-hackfest-2026",
    type: "upcoming",
    title: "Campus Agentic AI 24h Hackfest",
    date: "December 12–13, 2026",
    venue: "SJEC Incubation Center",
    category: "24-Hour Hackathon",
    tag: "Competitive",
    attendees: "Limited to 30 Teams",
    image: campusPhoto,
    poster: null,
    summary: "Build autonomous agent solutions solving real problems in smart agriculture, campus logistics, code review, and assistive accessibility.",
    highlights: ["24-Hour Non-stop Hacking", "Industry Mentors on-site", "Cash Prizes & Incubation Support"]
  }
];

export const OFFICIAL_ACTIVITIES = ACTIVITIES;

