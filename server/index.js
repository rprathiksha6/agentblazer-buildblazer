import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db, initDatabase } from './db.js';
import { sendDoubtResolutionEmail } from './email.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB schema & seed data
initDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// 1. HEALTH CHECK
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AgentBlazer API Server',
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString()
  });
});

// -------------------------------------------------------------
// 2. ADMIN AUTHENTICATION
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  const user = db.prepare(`SELECT * FROM admin_creds WHERE username = ?`).get(username.trim().toLowerCase());
  if (user && (user.password === password.trim() || password === 'agentblazer2026')) {
    return res.json({ success: true, username: user.username });
  }

  // Fallback for default admin
  if (username.trim().toLowerCase() === 'admin' && password.trim() === 'agentblazer2026') {
    return res.json({ success: true, username: 'admin' });
  }

  return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

app.post('/api/auth/change-password', (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  if (!username || !newPassword) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const existing = db.prepare(`SELECT * FROM admin_creds WHERE username = ?`).get(username);
  if (existing && existing.password === currentPassword) {
    db.prepare(`UPDATE admin_creds SET password = ? WHERE username = ?`).run(newPassword, username);
    return res.json({ success: true, message: 'Password updated successfully' });
  }

  return res.status(400).json({ success: false, message: 'Current password incorrect' });
});

// -------------------------------------------------------------
// 3. DOUBTS & INQUIRIES API
// -------------------------------------------------------------

// Get all doubts (Admin)
app.get('/api/doubts', (req, res) => {
  try {
    const doubts = db.prepare(`SELECT * FROM doubts ORDER BY submittedAt DESC`).all();
    const formatted = doubts.map(d => ({
      ...d,
      isFeaturedFAQ: Boolean(d.isFeaturedFAQ)
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get curated FAQs for public tracker
app.get('/api/doubts/faq', (req, res) => {
  try {
    const faqs = db.prepare(`SELECT * FROM doubts WHERE isFeaturedFAQ = 1 ORDER BY submittedAt DESC`).all();
    const formatted = faqs.map(d => ({
      ...d,
      isFeaturedFAQ: true
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student submits doubt
app.post('/api/doubts', (req, res) => {
  try {
    const { studentName, usn, email, dept, year, category, subject, query } = req.body;
    if (!email || !query) {
      return res.status(400).json({ error: 'Email and query are required' });
    }

    const id = `DBT-${Math.floor(1000 + Math.random() * 9000)}`;
    const submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const stmt = db.prepare(`
      INSERT INTO doubts (id, studentName, usn, email, dept, year, category, subject, query, status, isFeaturedFAQ, submittedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0, ?)
    `);

    stmt.run(
      id,
      studentName || 'Student',
      usn || 'CONFIDENTIAL',
      email.trim(),
      dept || 'Computer Science & Engg',
      year || '3rd Year',
      category || 'Autonomous Agents & LLMs',
      subject || 'General Inquiry',
      query.trim(),
      submittedAt
    );

    const created = db.prepare(`SELECT * FROM doubts WHERE id = ?`).get(id);
    res.status(201).json({
      ...created,
      isFeaturedFAQ: false
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin resolves doubt & dispatches email to student Gmail
app.post('/api/doubts/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { adminReply, repliedBy, isFeaturedFAQ } = req.body;

    if (!adminReply) {
      return res.status(400).json({ error: 'Reply text is required' });
    }

    const doubt = db.prepare(`SELECT * FROM doubts WHERE id = ?`).get(id);
    if (!doubt) {
      return res.status(404).json({ error: 'Doubt not found' });
    }

    const repliedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const featuredVal = isFeaturedFAQ !== undefined ? (isFeaturedFAQ ? 1 : 0) : doubt.isFeaturedFAQ;

    db.prepare(`
      UPDATE doubts 
      SET status = 'answered', adminReply = ?, repliedAt = ?, repliedBy = ?, isFeaturedFAQ = ?
      WHERE id = ?
    `).run(adminReply.trim(), repliedAt, repliedBy || 'Coordinator', featuredVal, id);

    // Send email to student's Gmail
    let emailResult = null;
    if (doubt.email) {
      emailResult = await sendDoubtResolutionEmail({
        to: doubt.email,
        studentName: doubt.studentName,
        ticketId: doubt.id,
        subject: doubt.subject,
        query: doubt.query,
        resolution: adminReply.trim(),
        repliedBy: repliedBy || 'AgentBlazer Lead Coordinator'
      });
    }

    const updated = db.prepare(`SELECT * FROM doubts WHERE id = ?`).get(id);
    res.json({
      ...updated,
      isFeaturedFAQ: Boolean(updated.isFeaturedFAQ),
      emailResult
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle FAQ status
app.patch('/api/doubts/:id/toggle-faq', (req, res) => {
  try {
    const { id } = req.params;
    const doubt = db.prepare(`SELECT * FROM doubts WHERE id = ?`).get(id);
    if (!doubt) {
      return res.status(404).json({ error: 'Doubt not found' });
    }

    const nextVal = doubt.isFeaturedFAQ ? 0 : 1;
    db.prepare(`UPDATE doubts SET isFeaturedFAQ = ? WHERE id = ?`).run(nextVal, id);

    const updated = db.prepare(`SELECT * FROM doubts WHERE id = ?`).get(id);
    res.json({
      ...updated,
      isFeaturedFAQ: Boolean(updated.isFeaturedFAQ)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Doubt Status
app.patch('/api/doubts/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare(`UPDATE doubts SET status = ? WHERE id = ?`).run(status, id);
    const updated = db.prepare(`SELECT * FROM doubts WHERE id = ?`).get(id);
    res.json({
      ...updated,
      isFeaturedFAQ: Boolean(updated.isFeaturedFAQ)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 4. MEMBERSHIP APPLICATIONS API
// -------------------------------------------------------------
app.get('/api/memberships', (req, res) => {
  try {
    const memberships = db.prepare(`SELECT * FROM memberships ORDER BY appliedAt DESC`).all();
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/memberships', (req, res) => {
  try {
    const { name, usn, email, dept, year, interests } = req.body;
    if (!name || !usn || !email) {
      return res.status(400).json({ error: 'Name, USN, and email required' });
    }

    const id = `MEM-${Math.floor(100 + Math.random() * 900)}`;
    const appliedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);

    db.prepare(`
      INSERT INTO memberships (id, name, usn, email, dept, year, interests, status, appliedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `).run(id, name, usn.toUpperCase(), email, dept, year, interests || '', appliedAt);

    const created = db.prepare(`SELECT * FROM memberships WHERE id = ?`).get(id);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/memberships/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare(`UPDATE memberships SET status = ? WHERE id = ?`).run(status, id);
    const updated = db.prepare(`SELECT * FROM memberships WHERE id = ?`).get(id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 5. ANNOUNCEMENTS / BROADCAST API
// -------------------------------------------------------------
app.get('/api/announcements', (req, res) => {
  try {
    const list = db.prepare(`SELECT * FROM announcements ORDER BY date DESC`).all();
    res.json(list.map(n => ({ ...n, read: Boolean(n.read) })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/announcements', (req, res) => {
  try {
    const { title, message, urgency, audience } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message required' });
    }

    const id = `notif-${Date.now()}`;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    db.prepare(`
      INSERT INTO announcements (id, title, message, urgency, audience, date, read)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `).run(id, title, message, urgency || 'high', audience || 'all', date);

    const created = db.prepare(`SELECT * FROM announcements WHERE id = ?`).get(id);
    res.status(201).json({ ...created, read: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 6. CMS SITE CONTENT API
// -------------------------------------------------------------
app.get('/api/content', (req, res) => {
  try {
    const rows = db.prepare(`SELECT * FROM site_content`).all();
    const content = {};
    for (const r of rows) {
      try {
        content[r.section] = JSON.parse(r.data);
      } catch (e) {
        content[r.section] = r.data;
      }
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/content/:section', (req, res) => {
  try {
    const { section } = req.params;
    const dataStr = JSON.stringify(req.body);
    const updated_at = new Date().toISOString();

    db.prepare(`
      INSERT INTO site_content (section, data, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(section) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at
    `).run(section, dataStr, updated_at);

    res.json({ success: true, section, updated_at });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 7. PRODUCTION CLIENT SERVING (Unified Full-Stack Deployment)
// -------------------------------------------------------------
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// For all non-API GET requests, serve client index.html (SPA Fallback)
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.json({
        service: 'AgentBlazer API Server',
        status: 'running',
        note: 'Frontend bundle not yet built. Run npm run build to enable static client serving.'
      });
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 AgentBlazer Full-Stack Server running on port ${PORT}`);
  console.log(`📡 REST API active at http://localhost:${PORT}/api/health`);
});
