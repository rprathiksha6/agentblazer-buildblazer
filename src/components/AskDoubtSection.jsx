import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import { HelpCircle, Send, CheckCircle2, ShieldCheck, Sparkles, Clock, MessageCircle, Lock, UserX } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AskDoubtSection = () => {
  const { doubts, addDoubt } = useClub();

  const [isAnonymous, setIsAnonymous] = useState(true);
  const [form, setForm] = useState({
    studentName: '',
    usn: '',
    email: '',
    dept: 'Computer Science & Engg',
    year: '3rd Year',
    category: 'Build Blazer Phase 2',
    subject: '',
    query: ''
  });

  const [activeTab, setActiveTab] = useState('ask'); // 'ask' | 'tracker'
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.query) return;

    const submissionData = {
      ...form,
      studentName: isAnonymous ? 'Anonymous Student' : (form.studentName.trim() || 'Anonymous Student'),
      usn: isAnonymous ? 'CONFIDENTIAL' : (form.usn.trim() || 'CONFIDENTIAL'),
      email: form.email.trim() || 'confidential@sjec.ac.in',
      isAnonymous
    };

    const created = addDoubt(submissionData);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSubmittedTicket(created);
    setForm({
      studentName: '',
      usn: '',
      email: '',
      dept: 'Computer Science & Engg',
      year: '3rd Year',
      category: 'Build Blazer Phase 2',
      subject: '',
      query: ''
    });
  };

  return (
    <section id="ask-doubt-section" className="py-20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>STUDENT INQUIRY & DOUBT DESK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Ask a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 dark:from-purple-400 dark:via-pink-300 dark:to-cyan-400">Doubt</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Have a question regarding Build Blazer Phase 2, workshop curricula, or autonomous AI labs? Doubts are published 100% anonymously on the public tracker to safeguard student privacy.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('ask')}
              className={`px-6 py-2.5 rounded-xl transition-all ${
                activeTab === 'ask'
                  ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50 shadow-neon-violet'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Submit New Doubt
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-6 py-2.5 rounded-xl transition-all ${
                activeTab === 'tracker'
                  ? 'bg-cyan-600/40 text-cyan-200 border border-cyan-500/50 shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Doubts Tracker ({doubts.length})
            </button>
          </div>
        </div>

        {activeTab === 'ask' ? (
          /* Doubt Submission Form */
          <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-purple-500/30 shadow-2xl relative">
            
            {submittedTicket ? (
              <div className="p-8 rounded-2xl bg-purple-950/40 border border-purple-500/50 space-y-4 text-center animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-display font-bold text-white">
                  Doubt Routed Successfully!
                </h3>
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-500/40">
                  Ticket #{submittedTicket.id}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-lg mx-auto leading-relaxed">
                  Your question regarding <span className="text-cyan-300">"{submittedTicket.subject || submittedTicket.category}"</span> has been transmitted to the coordinator desk.
                  <br />
                  <span className="text-emerald-400 font-mono text-xs inline-flex items-center justify-center gap-1.5 mt-3 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" /> Identity Protected: Posted anonymously on the public tracker.
                  </span>
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab('tracker')}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500/30 hover:bg-cyan-500/40 text-cyan-200 border border-cyan-500/50"
                  >
                    View in Doubts Tracker
                  </button>
                  <button
                    onClick={() => setSubmittedTicket(null)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200"
                  >
                    Ask Another Doubt
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Privacy Protection Banner */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span><strong>Privacy Protection:</strong> All inquiries are published anonymously on the doubts tracker.</span>
                  </div>
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="font-semibold text-[11px]">Submit Anonymously</span>
                  </label>
                </div>

                {isAnonymous ? (
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Anonymous mode enabled. No name or USN is recorded or displayed.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                        Student Full Name <span className="text-slate-500 text-[10px]">(Confidential — faculty only)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Shetty"
                        value={form.studentName}
                        onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                        College USN <span className="text-slate-500 text-[10px]">(Confidential — faculty only)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="4SO23CS142"
                        value={form.usn}
                        onChange={(e) => setForm({ ...form, usn: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-400 focus:outline-none uppercase"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                      College Email <span className="text-slate-500 text-[10px]">(Optional for reply alert)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="student.23cs@sjec.ac.in"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={form.dept}
                      onChange={(e) => setForm({ ...form, dept: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
                    >
                      <option>Computer Science & Engg</option>
                      <option>Artificial Intelligence & ML</option>
                      <option>Computer Science & Business</option>
                      <option>Information Science</option>
                      <option>Electronics & Comm.</option>
                      <option>Other Engineering Branch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Current Year
                    </label>
                    <select
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Query Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
                    >
                      <option>Build Blazer Phase 2</option>
                      <option>Workshops & Certifications</option>
                      <option>Autonomous Agents</option>
                      <option>Salesforce Trailblazer</option>
                      <option>Club Membership & Governance</option>
                      <option>General Tech Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Subject / Brief Topic *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Next.js deployment on Vercel"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Your Doubt / In-depth Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your doubt in detail. Mention any error codes, git branch names, or specific workshop topic..."
                    value={form.query}
                    onChange={(e) => setForm({ ...form, query: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-purple-400 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-lg hover:shadow-neon-violet flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Doubt to AgentBlazer Portal</span>
                </button>
              </form>
            )}

          </div>
        ) : (
          /* Live Doubts Tracker Table */
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Anonymous Board • Student identities protected</span>
              </span>
              <span className="text-cyan-400">{doubts.length} Doubts Logged</span>
            </div>

            <div className="space-y-4">
              {doubts.map((d) => {
                const isAnswered = d.status === 'answered';
                const isPending = d.status === 'pending';
                return (
                  <div
                    key={d.id}
                    className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-xs text-purple-300">
                          #{d.id}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                          {d.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                          isAnswered ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          isPending ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {d.status}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {d.submittedAt}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-display font-bold text-white">
                        {d.subject || "Student Inquiry"}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                        "{d.query}"
                      </p>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      <span className="text-slate-700 dark:text-slate-300 font-semibold">Anonymous Student</span>
                      <span>•</span>
                      <span className="text-slate-500">Identity Protected</span>
                      <span>•</span>
                      <span className="text-purple-600 dark:text-purple-300">{d.dept || 'Engineering'}</span>
                      <span>•</span>
                      <span className="text-slate-500">{d.year || 'Student'}</span>
                    </div>

                    {/* Admin Response if available */}
                    {d.adminReply && (
                      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5 mt-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 font-semibold">
                          <span className="flex items-center gap-1.5">
                            <MessageCircle className="w-3.5 h-3.5" /> Coordinator Response:
                          </span>
                          <span className="text-slate-400">{d.repliedBy} • {d.repliedAt}</span>
                        </div>
                        <p className="text-xs text-slate-200 font-sans leading-relaxed">
                          {d.adminReply}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
