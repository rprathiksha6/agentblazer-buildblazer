export const PRESET_QUESTIONS = [
  {
    id: "q-1",
    question: "How do I become an AgentBlazer Club member?",
    shortLabel: "How to join the club?",
    category: "Membership",
    answer: "You can apply directly through our official Join portal on this website! Submit your details (Name, USN, College Email, Branch, and Interests). Our executive leads review applications on a rolling basis, and new member orientation kits are distributed at the start of each semester.",
    action: { label: "Apply for Membership", targetId: "join-connect-section" }
  },
  {
    id: "q-2",
    question: "Do I need prior coding or AI experience to join?",
    shortLabel: "Do I need prior AI/coding experience?",
    category: "Prerequisites",
    answer: "Not at all! AgentBlazer is founded on inclusive learning. We kick off every cohort with ground-zero workshops—covering Python, Git fundamentals, and guided Salesforce Trailhead quests before advancing into Autonomous Agents and LLM architectures. All you need is curiosity and consistency.",
    action: { label: "Explore Learning Pillars", targetId: "about-club" }
  },
  {
    id: "q-3",
    question: "What kind of workshops and hackathons does the club conduct?",
    shortLabel: "What workshops are conducted?",
    category: "Activities",
    answer: "We organize practical, industry-aligned sessions including hands-on Agentforce developer labs, Autonomous Agent architectural bootcamps, prompt engineering masterclasses, and our annual 24-hour campus Agentic Hackathon. Check our live Activities calendar below for upcoming dates!",
    action: { label: "View Club Activities", targetId: "activities-section" }
  },
  {
    id: "q-4",
    question: "What is Salesforce Agentforce & how does it help campus placements?",
    shortLabel: "How does Agentforce help placements?",
    category: "Career & Tech",
    answer: "Agentforce is Salesforce's breakthrough enterprise AI platform that powers autonomous task execution. By building on Agentforce and earning verified Trailhead superbadges, you establish demonstrable, high-demand skills that differentiate your resume with top recruiters and tech companies visiting SJEC.",
    action: { label: "Read About Agentforce", targetId: "about-club" }
  },
  {
    id: "q-5",
    question: "Are events open to all engineering branches and years?",
    shortLabel: "Are non-CSE branches eligible?",
    category: "Eligibility",
    answer: "Yes! While housed in the Department of Computer Science & Engineering, AgentBlazer warmly welcomes passionate students from AI&ML, ISE, ECE, Mech, and Civil across 1st to 4th years. AI impacts every discipline, and we actively champion cross-departmental teams.",
    action: { label: "Join Our Community", targetId: "join-connect-section" }
  },
  {
    id: "q-6",
    question: "Can I get certificates and attendance / duty leave for club events?",
    shortLabel: "Do we get certificates & duty leave?",
    category: "Academics",
    answer: "Yes. Every verified participant in our bootcamps and hackathons receives official SJEC Department of CSE certificates. Official Duty Leave (DL) / attendance endorsement is coordinated directly with the CSE HOD and respective department mentors for all recognized club events.",
    action: { label: "Contact Faculty Leads", targetId: "members-section" }
  },
  {
    id: "q-7",
    question: "How do I ask a doubt or get help on a project?",
    shortLabel: "How to ask questions anonymously?",
    category: "Doubts Desk",
    answer: "Head to our 'Student Doubts Desk' below! You can submit queries regarding AI concepts, debugging, project roadmaps, or event queries. To ensure psychological safety, student identity is kept strictly confidential on the public ledger while mentors answer promptly.",
    action: { label: "Ask a Doubt Now", targetId: "ask-doubt-section" }
  },
  {
    id: "q-8",
    question: "Who are the core student leads and where can I meet them on campus?",
    shortLabel: "Where to meet the team on campus?",
    category: "Leadership",
    answer: "The student executive team is spearheaded by Reuben Saldanha (President), Ajay Preenal Dsouza (VP), Stevin Dsouza (Tech Lead), Frenny Chrystal Saldanha (Resource Head), and Chinthan N V (Media Head). You can meet us in the CSE Department Labs (Academic Block III) or connect over our official Discord server!",
    action: { label: "View Team Roster", targetId: "members-section" }
  }
];

export const BOT_KEYWORDS_MAP = [
  { keywords: ["join", "apply", "member", "membership", "register", "registration", "recruit", "induction", "admission", "enroll"], questionId: "q-1" },
  { keywords: ["beginner", "experience", "prerequisite", "prerequisites", "coding", "prior", "first year", "no experience", "easy", "python"], questionId: "q-2" },
  { keywords: ["workshop", "workshops", "bootcamp", "hackathon", "events", "activities", "dates", "schedule", "agenda", "calendar"], questionId: "q-3" },
  { keywords: ["agentforce", "salesforce", "placement", "placements", "career", "job", "jobs", "internship", "trailhead", "resume", "hiring"], questionId: "q-4" },
  { keywords: ["branch", "branches", "ise", "ece", "aiml", "mech", "civil", "year", "eligibility", "eligible", "allowed", "who can"], questionId: "q-5" },
  { keywords: ["certificate", "certificates", "attendance", "duty leave", "od", "leave", "credits", "official", "dl"], questionId: "q-6" },
  { keywords: ["doubt", "doubts", "ask", "question", "help", "query", "anonymous", "problem", "solve", "confidential"], questionId: "q-7" },
  { keywords: ["lead", "leads", "president", "team", "meet", "campus", "location", "reuben", "keith", "stevin", "contact", "office", "where"], questionId: "q-8" }
];
