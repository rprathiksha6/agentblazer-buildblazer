export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "AgentBlazer Club Membership Intake Open!",
    message: "Students across all engineering departments (1st to 4th year) can apply to become official club members. Early applicants get priority access to hands-on cloud labs.",
    date: "Sep 23, 2026",
    urgency: "high", // high, normal, info
    read: false,
    audience: "all"
  },
  {
    id: "notif-2",
    title: "Agentforce Technical Masterclass Announced",
    message: "Salesforce industry mentors will conduct an exclusive session on enterprise agent workflows and Data Cloud integration in Prerana Hall.",
    date: "Sep 22, 2026",
    urgency: "normal",
    read: false,
    audience: "students"
  },
  {
    id: "notif-3",
    title: "Prompt Ops-2K26 Certificates Dispatched",
    message: "Participation and winner certificates for both Beginner and Pro tracks of Prompt Ops have been issued through the CSE Department.",
    date: "Sep 20, 2026",
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
    category: "Workshops & Hands-on Labs",
    subject: "Prerequisites for Autonomous Agents Workshop",
    query: "Do we need prior experience with LangChain or Python to attend the upcoming Autonomous Agents Hands-on Workshop?",
    status: "answered", // pending, in-review, answered
    adminReply: "No advanced prerequisites are required! A foundational knowledge of Python and APIs is sufficient. Our mentors will guide you from scratch.",
    submittedAt: "2026-09-22 14:30",
    repliedAt: "2026-09-22 16:15",
    repliedBy: "Stevin Dsouza (Tech Lead)"
  },
  {
    id: "DBT-1042",
    studentName: "Ananya Pai",
    usn: "4SO23CS019",
    email: "ananya.23cs@sjec.ac.in",
    dept: "Computer Science & Engg",
    year: "2nd Year",
    category: "Club Membership & Intake",
    subject: "How are member teams structured?",
    query: "Hello coordinators, after joining AgentBlazer Club, will we be grouped into project cohorts according to our interest tracks?",
    status: "pending",
    adminReply: null,
    submittedAt: "2026-09-22 18:45",
    repliedAt: null,
    repliedBy: null
  },
  {
    id: "DBT-1043",
    studentName: "Karthik Nayak",
    usn: "4SO22CS088",
    email: "karthik.22cs@sjec.ac.in",
    dept: "Artificial Intelligence & ML",
    year: "4th Year",
    category: "Salesforce Trailhead & Agentforce",
    subject: "Developer Sandbox Org Access",
    query: "Will club members get free access to Salesforce Trailhead developer orgs with Agentforce licenses enabled?",
    status: "in-review",
    adminReply: "Yes, active club members receive special Trailhead org credentials with Agentforce features enabled for experiential learning.",
    submittedAt: "2026-09-21 20:10",
    repliedAt: "2026-09-22 09:20",
    repliedBy: "Frenny Saldanha (Resource Head)"
  }
];

export const INITIAL_MEMBERSHIPS = [
  {
    id: "MEM-201",
    name: "Prajwal Royston",
    usn: "4SO23CS124",
    email: "prajwal.23cs@sjec.ac.in",
    year: "3rd Year",
    dept: "Computer Science & Engg",
    interests: "Autonomous Agents, LLM Fine-tuning",
    status: "approved", // pending, approved
    appliedAt: "2026-09-22 11:30"
  },
  {
    id: "MEM-202",
    name: "Sneha Rao",
    usn: "4SO24AI045",
    email: "sneha.24ai@sjec.ac.in",
    year: "2nd Year",
    dept: "Artificial Intelligence & ML",
    interests: "Salesforce Trailhead, Python Agents",
    status: "approved",
    appliedAt: "2026-09-22 15:40"
  },
  {
    id: "MEM-203",
    name: "Gautham Prabhu",
    usn: "4SO23IS038",
    email: "gautham.23is@sjec.ac.in",
    year: "3rd Year",
    dept: "Information Science",
    interests: "Full-Stack AI, LangGraph, DevOps",
    status: "pending",
    appliedAt: "2026-09-23 09:15"
  }
];
