import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure db directory exists
const dbPath = path.join(__dirname, 'agentblazer.db');
export const db = new DatabaseSync(dbPath);

// Initialize schema
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_content (
      section TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS doubts (
      id TEXT PRIMARY KEY,
      studentName TEXT,
      usn TEXT,
      email TEXT NOT NULL,
      dept TEXT,
      year TEXT,
      category TEXT,
      subject TEXT,
      query TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      adminReply TEXT,
      repliedAt TEXT,
      repliedBy TEXT,
      isFeaturedFAQ INTEGER DEFAULT 0,
      submittedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS memberships (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      usn TEXT NOT NULL,
      email TEXT NOT NULL,
      dept TEXT,
      year TEXT,
      interests TEXT,
      status TEXT DEFAULT 'pending',
      appliedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      urgency TEXT DEFAULT 'normal',
      audience TEXT DEFAULT 'all',
      date TEXT NOT NULL,
      read INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS admin_creds (
      username TEXT PRIMARY KEY,
      password TEXT NOT NULL
    );
  `);

  // Seed default admin credentials if missing
  const adminCheck = db.prepare(`SELECT * FROM admin_creds WHERE username = ?`).get('admin');
  if (!adminCheck) {
    db.prepare(`INSERT INTO admin_creds (username, password) VALUES (?, ?)`).run('admin', 'agentblazer2026');
  }

  // Seed default announcements if empty
  const notifCount = db.prepare(`SELECT COUNT(*) as count FROM announcements`).get().count;
  if (notifCount === 0) {
    const seedNotifs = [
      {
        id: "notif-1",
        title: "AgentBlazer Club Membership Intake Open!",
        message: "Students across all engineering departments can apply to become official club members.",
        urgency: "high",
        audience: "all",
        date: "Sep 23, 2026"
      },
      {
        id: "notif-2",
        title: "Agentforce Technical Masterclass Announced",
        message: "Salesforce industry mentors will conduct an exclusive session on enterprise agent workflows in Prerana Hall.",
        urgency: "normal",
        audience: "students",
        date: "Sep 22, 2026"
      },
      {
        id: "notif-3",
        title: "Prompt Ops-2K26 Certificates Dispatched",
        message: "Participation and winner certificates have been issued through the CSE Department.",
        urgency: "info",
        audience: "all",
        date: "Sep 20, 2026"
      }
    ];

    const insertNotif = db.prepare(`
      INSERT INTO announcements (id, title, message, urgency, audience, date, read)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `);
    for (const n of seedNotifs) {
      insertNotif.run(n.id, n.title, n.message, n.urgency, n.audience, n.date);
    }
  }

  // Seed default doubts if empty
  const doubtsCount = db.prepare(`SELECT COUNT(*) as count FROM doubts`).get().count;
  if (doubtsCount === 0) {
    const seedDoubts = [
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
        status: "answered",
        adminReply: "No advanced prerequisites are required! A foundational knowledge of Python and APIs is sufficient. Our mentors will guide you from scratch.",
        submittedAt: "2026-09-22 14:30",
        repliedAt: "2026-09-22 16:15",
        repliedBy: "Stevin Dsouza (Tech Lead)",
        isFeaturedFAQ: 1
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
        repliedBy: null,
        isFeaturedFAQ: 0
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
        repliedBy: "Frenny Saldanha (Resource Head)",
        isFeaturedFAQ: 1
      }
    ];

    const insertDoubt = db.prepare(`
      INSERT INTO doubts (id, studentName, usn, email, dept, year, category, subject, query, status, adminReply, repliedAt, repliedBy, isFeaturedFAQ, submittedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const d of seedDoubts) {
      insertDoubt.run(
        d.id, d.studentName, d.usn, d.email, d.dept, d.year, d.category,
        d.subject, d.query, d.status, d.adminReply, d.repliedAt, d.repliedBy,
        d.isFeaturedFAQ, d.submittedAt
      );
    }
  }

  // Seed default memberships if empty
  const memCount = db.prepare(`SELECT COUNT(*) as count FROM memberships`).get().count;
  if (memCount === 0) {
    const seedMembers = [
      {
        id: "MEM-201",
        name: "Prajwal Royston",
        usn: "4SO23CS124",
        email: "prajwal.23cs@sjec.ac.in",
        year: "3rd Year",
        dept: "Computer Science & Engg",
        interests: "Autonomous Agents, LLM Fine-tuning",
        status: "approved",
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
      }
    ];

    const insertMem = db.prepare(`
      INSERT INTO memberships (id, name, usn, email, dept, year, interests, status, appliedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const m of seedMembers) {
      insertMem.run(m.id, m.name, m.usn, m.email, m.dept, m.year, m.interests, m.status, m.appliedAt);
    }
  }

  console.log('✅ AgentBlazer SQLite database initialized and ready at:', dbPath);
}
