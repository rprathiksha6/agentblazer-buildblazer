import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import { 
  ShieldCheck, MessageSquare, Trophy, Bell, Download, Search, CheckCircle2, 
  Clock, AlertTriangle, ExternalLink, Send, ArrowLeft, Filter, Sparkles, UserCheck 
} from 'lucide-react';

export const AdminPortal = () => {
  const { 
    doubts, replyDoubt, updateDoubtStatus,
    submissions, updateSubmissionStatus,
    notifications, addNotification,
    setPortalView 
  } = useClub();

  const [activeTab, setActiveTab] = useState('doubts'); // 'doubts' | 'submissions' | 'broadcast' | 'export'
  
  // Doubts filter & reply modal state
  const [doubtSearch, setDoubtSearch] = useState('');
  const [doubtFilter, setDoubtFilter] = useState('all'); // all, pending, answered
  const [activeDoubtReply, setActiveDoubtReply] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [repliedBy, setRepliedBy] = useState('Stevin Dsouza (Tech Lead)');

  // Submissions filter & scoring state
  const [subSearch, setSubSearch] = useState('');
  const [subFilter, setSubFilter] = useState('all');
  const [activeScoringSub, setActiveScoringSub] = useState(null);
  const [scoreInput, setScoreInput] = useState('');
  const [statusInput, setStatusInput] = useState('approved');
  const [feedbackInput, setFeedbackInput] = useState('');

  // New notification state
  const [notifForm, setNotifForm] = useState({
    title: '',
    message: '',
    urgency: 'high',
    audience: 'all'
  });
  const [notifSuccess, setNotifSuccess] = useState(false);

  // Filtered Doubts
  const filteredDoubts = doubts.filter(d => {
    const matchSearch = d.studentName.toLowerCase().includes(doubtSearch.toLowerCase()) ||
                        d.usn.toLowerCase().includes(doubtSearch.toLowerCase()) ||
                        d.query.toLowerCase().includes(doubtSearch.toLowerCase()) ||
                        d.id.toLowerCase().includes(doubtSearch.toLowerCase());
    if (doubtFilter === 'pending') return matchSearch && d.status === 'pending';
    if (doubtFilter === 'answered') return matchSearch && d.status === 'answered';
    return matchSearch;
  });

  // Filtered Submissions
  const filteredSubmissions = submissions.filter(s => {
    const matchSearch = s.teamName.toLowerCase().includes(subSearch.toLowerCase()) ||
                        s.teamLead.toLowerCase().includes(subSearch.toLowerCase()) ||
                        s.leadUsn.toLowerCase().includes(subSearch.toLowerCase());
    if (subFilter !== 'all') return matchSearch && s.status === subFilter;
    return matchSearch;
  });

  // Handle Reply to Doubt
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeDoubtReply) return;
    replyDoubt(activeDoubtReply.id, replyText.trim(), repliedBy);
    setActiveDoubtReply(null);
    setReplyText('');
  };

  // Handle Update Submission Score & Status
  const handleSaveScore = (e) => {
    e.preventDefault();
    if (!activeScoringSub) return;
    updateSubmissionStatus(
      activeScoringSub.id, 
      statusInput, 
      scoreInput ? Number(scoreInput) : activeScoringSub.score, 
      feedbackInput
    );
    setActiveScoringSub(null);
  };

  // Handle Post Notification
  const handlePostNotification = (e) => {
    e.preventDefault();
    if (!notifForm.title || !notifForm.message) return;
    addNotification({
      title: notifForm.title,
      message: notifForm.message,
      urgency: notifForm.urgency,
      audience: notifForm.audience
    });
    setNotifSuccess(true);
    setNotifForm({ title: '', message: '', urgency: 'high', audience: 'all' });
    setTimeout(() => setNotifSuccess(false), 3000);
  };

  // Export Data JSON
  const handleExportData = (type) => {
    let dataStr = "";
    let filename = "";
    if (type === 'submissions') {
      dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions, null, 2));
      filename = "agentblazer_buildblazer_submissions.json";
    } else {
      dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(doubts, null, 2));
      filename = "agentblazer_student_doubts.json";
    }
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 glass-panel rounded-3xl border border-purple-500/40">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono border border-purple-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>ORGANIZER COMMAND CONSOLE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            AgentBlazer <span className="text-cyan-400">Admin Portal</span>
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Authenticated Session • Faculty Advisory & Student Core Team
          </p>
        </div>

        <button
          onClick={() => setPortalView('student')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-mono transition-all self-end sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Student View</span>
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Total Doubts</span>
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-display font-bold text-white">
            {doubts.length}
          </div>
          <div className="text-[11px] font-mono text-amber-400">
            {doubts.filter(d => d.status === 'pending').length} Pending Replies
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Build Blazer Teams</span>
            <Trophy className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-display font-bold text-white">
            {submissions.length}
          </div>
          <div className="text-[11px] font-mono text-emerald-400">
            {submissions.filter(s => s.status === 'approved').length} Approved Designs
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Broadcast Alerts</span>
            <Bell className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-3xl font-display font-bold text-white">
            {notifications.length}
          </div>
          <div className="text-[11px] font-mono text-cyan-400">
            Live in Student Notification Center
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Lead Evaluator</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm font-display font-bold text-white pt-1">
            Mr. Keith Fernandes
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Faculty Coordinator • CSE
          </div>
        </div>

      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveTab('doubts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'doubts'
              ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50 shadow-neon-violet'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Student Doubts Desk ({doubts.filter(d => d.status === 'pending').length} new)</span>
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'submissions'
              ? 'bg-cyan-600/40 text-cyan-200 border border-cyan-500/50 shadow-neon-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Build Blazer Submissions ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'broadcast'
              ? 'bg-pink-600/40 text-pink-200 border border-pink-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Broadcast Alerts</span>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'export'
              ? 'bg-emerald-600/40 text-emerald-200 border border-emerald-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* 1. STUDENT DOUBTS TAB */}
      {activeTab === 'doubts' && (
        <div className="space-y-4">
          
          {/* Controls: Search & Status Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student, USN, doubt..."
                value={doubtSearch}
                onChange={(e) => setDoubtSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono">
              <button
                onClick={() => setDoubtFilter('all')}
                className={`px-3 py-1.5 rounded-lg ${doubtFilter === 'all' ? 'bg-white/15 text-white' : 'text-slate-400'}`}
              >
                All ({doubts.length})
              </button>
              <button
                onClick={() => setDoubtFilter('pending')}
                className={`px-3 py-1.5 rounded-lg ${doubtFilter === 'pending' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setDoubtFilter('answered')}
                className={`px-3 py-1.5 rounded-lg ${doubtFilter === 'answered' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400'}`}
              >
                Answered
              </button>
            </div>
          </div>

          {/* Doubts List */}
          <div className="space-y-3">
            {filteredDoubts.map((d) => (
              <div
                key={d.id}
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-bold text-cyan-400">{d.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-white font-semibold">{d.studentName}</span>
                    <span className="text-purple-300">({d.usn})</span>
                    <span className="text-slate-400 hidden md:inline">• {d.dept}, {d.year}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                      d.status === 'answered' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      d.status === 'pending' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {d.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{d.submittedAt}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-cyan-300 font-medium">{d.category}: {d.subject}</div>
                  <p className="text-xs text-slate-200 mt-1 font-sans leading-relaxed">
                    "{d.query}"
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    Student Email: <a href={`mailto:${d.email}`} className="text-cyan-400 underline">{d.email}</a>
                  </div>
                </div>

                {/* Reply section or button */}
                {d.adminReply ? (
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs font-mono space-y-1">
                    <div className="text-cyan-300 font-semibold flex items-center justify-between">
                      <span>Replied by: {d.repliedBy}</span>
                      <span className="text-slate-500">{d.repliedAt}</span>
                    </div>
                    <p className="text-slate-300 font-sans">{d.adminReply}</p>
                    <button
                      onClick={() => {
                        setActiveDoubtReply(d);
                        setReplyText(d.adminReply);
                      }}
                      className="text-[11px] text-cyan-400 hover:underline pt-1"
                    >
                      Update Reply
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setActiveDoubtReply(d);
                        setReplyText('');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/50 text-white font-mono text-xs flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" /> Answer Doubt
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. BUILD BLAZER SUBMISSIONS TAB */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search team or lead USN..."
                value={subSearch}
                onChange={(e) => setSubSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono">
              <button
                onClick={() => setSubFilter('all')}
                className={`px-3 py-1.5 rounded-lg ${subFilter === 'all' ? 'bg-white/15 text-white' : 'text-slate-400'}`}
              >
                All ({submissions.length})
              </button>
              <button
                onClick={() => setSubFilter('approved')}
                className={`px-3 py-1.5 rounded-lg ${subFilter === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400'}`}
              >
                Approved
              </button>
              <button
                onClick={() => setSubFilter('under_review')}
                className={`px-3 py-1.5 rounded-lg ${subFilter === 'under_review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'}`}
              >
                Under Review
              </button>
              <button
                onClick={() => setSubFilter('needs_revision')}
                className={`px-3 py-1.5 rounded-lg ${subFilter === 'needs_revision' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400'}`}
              >
                Needs Revision
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-display font-bold text-white">{sub.teamName}</h3>
                      <span className="text-xs font-mono text-slate-400">({sub.id})</span>
                    </div>
                    <p className="text-xs font-mono text-purple-300 mt-0.5">
                      Team Lead: {sub.teamLead} • {sub.leadUsn} ({sub.leadEmail})
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {sub.score !== null && (
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-slate-400 block">Jury Score</span>
                        <span className="text-base font-display font-extrabold text-cyan-300">{sub.score} / 100</span>
                      </div>
                    )}
                    <span className={`px-2.5 py-1 rounded text-xs uppercase font-mono ${
                      sub.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      sub.status === 'under_review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {sub.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1.5">
                    <span className="text-slate-400 block">Team Members:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {sub.members.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="text-slate-400 block">Submission Links:</span>
                    <div className="flex flex-col gap-1.5">
                      <a 
                        href={sub.githubRepoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-purple-400 hover:underline flex items-center gap-1.5"
                      >
                        GitHub Fork Repository <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a 
                        href={sub.deployedUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-1.5"
                      >
                        Live Deployed Site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      {sub.figmaUrl && (
                        <a 
                          href={sub.figmaUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-pink-400 hover:underline flex items-center gap-1.5"
                        >
                          Phase 1 Figma Design Reference <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Feedback Note & Grade Button */}
                <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="text-slate-400">
                    <strong className="text-slate-300">Feedback:</strong> {sub.feedback || "No feedback recorded yet."}
                  </div>
                  <button
                    onClick={() => {
                      setActiveScoringSub(sub);
                      setScoreInput(sub.score ? String(sub.score) : '90');
                      setStatusInput(sub.status);
                      setFeedbackInput(sub.feedback || '');
                    }}
                    className="px-4 py-1.5 rounded-xl bg-cyan-600/40 hover:bg-cyan-600/60 border border-cyan-500/50 text-cyan-200 self-end sm:self-auto"
                  >
                    Grade & Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 3. BROADCAST ALERTS TAB */}
      {activeTab === 'broadcast' && (
        <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/30 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400 font-bold">
              REAL-TIME BROADCAST
            </span>
            <h3 className="text-xl font-display font-bold text-white">
              Publish Student Notification
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Notices broadcast instantly to all students and light up the notification bell.
            </p>
          </div>

          {notifSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Broadcast alert dispatched to student portal!</span>
            </div>
          )}

          <form onSubmit={handlePostNotification} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-300 mb-1">Notification Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Build Blazer Phase 2 Code Freeze in 2 Hours!"
                value={notifForm.title}
                onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-pink-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1">Urgency Level</label>
                <select
                  value={notifForm.urgency}
                  onChange={(e) => setNotifForm({ ...notifForm, urgency: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-pink-400 focus:outline-none"
                >
                  <option value="high">High (Red Alert)</option>
                  <option value="normal">Normal (Amber)</option>
                  <option value="info">Informational (Cyan)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Target Audience</label>
                <select
                  value={notifForm.audience}
                  onChange={(e) => setNotifForm({ ...notifForm, audience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-pink-400 focus:outline-none"
                >
                  <option value="all">All Students & Faculty</option>
                  <option value="third_years">Third-Year Teams Only</option>
                  <option value="leads">Team Leads Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Notification Body *</label>
              <textarea
                required
                rows={4}
                placeholder="Write the broadcast message here..."
                value={notifForm.message}
                onChange={(e) => setNotifForm({ ...notifForm, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-pink-400 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span>Broadcast Alert to Students</span>
            </button>
          </form>
        </div>
      )}

      {/* 4. EXPORT DATA TAB */}
      {activeTab === 'export' && (
        <div className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl border border-emerald-500/30 space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              DATA REPOSITORY
            </span>
            <h3 className="text-2xl font-display font-bold text-white">
              Export Club Records
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Download submissions, student doubt logs, and evaluation metrics for accreditation and reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <Trophy className="w-8 h-8 text-cyan-400 mx-auto" />
              <h4 className="text-base font-display font-bold text-white">Build Blazer Submissions</h4>
              <p className="text-xs text-slate-400 font-mono">
                {submissions.length} teams with GitHub links, live deployments, and scores.
              </p>
              <button
                onClick={() => handleExportData('submissions')}
                className="w-full py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-200 text-xs font-mono"
              >
                Download Submissions JSON
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <MessageSquare className="w-8 h-8 text-purple-400 mx-auto" />
              <h4 className="text-base font-display font-bold text-white">Student Doubts Ledger</h4>
              <p className="text-xs text-slate-400 font-mono">
                {doubts.length} student inquiries, USNs, and coordinator responses.
              </p>
              <button
                onClick={() => handleExportData('doubts')}
                className="w-full py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-mono"
              >
                Download Doubts JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {activeDoubtReply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full glass-panel p-6 rounded-3xl border border-purple-500/50 bg-black/95 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                REPLY TO STUDENT INQUIRY
              </span>
              <h3 className="text-lg font-display font-bold text-white mt-1">
                {activeDoubtReply.studentName} ({activeDoubtReply.usn})
              </h3>
              <p className="text-xs text-slate-300 font-sans mt-1 p-2 rounded bg-white/5 border border-white/10">
                "{activeDoubtReply.query}"
              </p>
            </div>

            <form onSubmit={handleSendReply} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Responding Officer / Faculty</label>
                <select
                  value={repliedBy}
                  onChange={(e) => setRepliedBy(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option>Stevin Dsouza (Tech Lead)</option>
                  <option>Ruben Saldanha (President)</option>
                  <option>Mr. Keith Fernandes (Faculty Coordinator)</option>
                  <option>Ms. Nisha Roche (Faculty Coordinator)</option>
                  <option>Frenny Saldanha (Resource Head)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Official Response *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type clear resolution for the student..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-400 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveDoubtReply(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold shadow-neon-violet"
                >
                  Publish Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scoring Modal */}
      {activeScoringSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full glass-panel p-6 rounded-3xl border border-cyan-500/50 bg-black/95 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                JURY EVALUATION & SCORING
              </span>
              <h3 className="text-xl font-display font-bold text-white mt-1">
                Team {activeScoringSub.teamName}
              </h3>
              <p className="text-xs font-mono text-purple-300">
                Lead: {activeScoringSub.teamLead} • {activeScoringSub.leadUsn}
              </p>
            </div>

            <form onSubmit={handleSaveScore} className="space-y-3.5 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Score (out of 100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Review Status</label>
                  <select
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="approved">Approved</option>
                    <option value="under_review">Under Review</option>
                    <option value="needs_revision">Needs Revision</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Evaluator Feedback Notes</label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveScoringSub(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-neon-cyan"
                >
                  Save Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
