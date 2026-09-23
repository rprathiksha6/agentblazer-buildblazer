import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import { HelpCircle, Send, CheckCircle2, ShieldCheck, Mail, Sparkles, MessageCircle, Lock, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AskDoubtSection = () => {
  const { doubts, addDoubt } = useClub();

  const [form, setForm] = useState({
    studentName: '',
    usn: '',
    email: '',
    dept: 'Computer Science & Engg',
    year: '3rd Year',
    category: 'Autonomous Agents & LLMs',
    subject: '',
    query: ''
  });

  const [activeTab, setActiveTab] = useState('ask'); // 'ask' | 'faq'
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Filter only curated FAQs for the public tracker
  const faqDoubts = doubts.filter(d => d.isFeaturedFAQ);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.query.trim() || !form.email.trim()) return;

    const submissionData = {
      ...form,
      studentName: form.studentName.trim() || 'Student',
      usn: form.usn.trim() || 'CONFIDENTIAL',
      email: form.email.trim(),
      isFeaturedFAQ: false // Private by default; delivered to student's Gmail
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
      category: 'Autonomous Agents & LLMs',
      subject: '',
      query: ''
    });
  };

  return (
    <section id="ask-doubt-section" className="py-20 relative border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>STUDENT INQUIRY & DOUBT DESK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Ask a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 dark:from-purple-400 dark:via-pink-300 dark:to-cyan-400">Doubt</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Got a doubt about workshops, labs, or autonomous AI systems? Submit your question below and our mentors will reply directly to your Gmail. Frequently asked questions appear on our curated FAQ board.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-black/60 border border-slate-300 dark:border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('ask')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${
                activeTab === 'ask'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Doubt (Direct to Gmail)</span>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${
                activeTab === 'faq'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions ({faqDoubts.length})</span>
            </button>
          </div>
        </div>

        {activeTab === 'ask' ? (
          /* Doubt Submission Form */
          <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-purple-200 dark:border-purple-500/30 shadow-2xl relative bg-white/90 dark:bg-[#0c101c]/90">
            
            {submittedTicket ? (
              <div className="p-8 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/50 space-y-4 text-center animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                  Doubt Routed to Mentors!
                </h3>
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-mono text-xs border border-cyan-300 dark:border-cyan-500/40">
                  Ticket #{submittedTicket.id}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans max-w-lg mx-auto leading-relaxed">
                  Your question regarding <strong className="text-purple-600 dark:text-cyan-300">"{submittedTicket.subject || submittedTicket.category}"</strong> has been logged.
                  <br />
                  <span className="text-emerald-700 dark:text-emerald-300 font-mono text-xs inline-flex items-center justify-center gap-1.5 mt-3 bg-emerald-100 dark:bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                    <Mail className="w-3.5 h-3.5" /> Direct Delivery: Answer will be sent to <strong>{submittedTicket.email}</strong>.
                  </span>
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab('faq')}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-sm"
                  >
                    Browse Community FAQs
                  </button>
                  <button
                    onClick={() => setSubmittedTicket(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-all"
                  >
                    Ask Another Question
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Privacy & Direct Gmail Delivery Policy Banner */}
                <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 flex items-start gap-3 text-xs font-mono">
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 text-slate-700 dark:text-slate-300">
                    <p className="font-semibold text-cyan-800 dark:text-cyan-300">
                      Direct Gmail Delivery & Private Resolution
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
                      All individual student inquiries are handled confidentially and answered directly to your registered Gmail address. Only select general FAQs appear on the public tracker.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                      Student Name <span className="text-slate-500 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Shetty"
                      value={form.studentName}
                      onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                      College USN <span className="text-slate-500 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="4SO23CS142"
                      value={form.usn}
                      onChange={(e) => setForm({ ...form, usn: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-500 focus:outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Email (Required for Gmail answer delivery) */}
                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                    Your Gmail / College Email * <span className="text-purple-600 dark:text-cyan-400 font-normal">(Response will be delivered directly here)</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student.23cs@sjec.ac.in or your.gmail@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={form.dept}
                      onChange={(e) => setForm({ ...form, dept: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
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
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                      Current Year
                    </label>
                    <select
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
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
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                      Query Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
                    >
                      <option>Autonomous Agents & LLMs</option>
                      <option>Workshops & Certifications</option>
                      <option>Salesforce Trailblazer & Agentforce</option>
                      <option>Club Membership & Governance</option>
                      <option>General Tech & Bug Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                      Subject / Brief Topic *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Multi-agent state orchestration question"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    Your Doubt / In-depth Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your question in detail. Mention any error logs, code snippets, or workshop concepts..."
                    value={form.query}
                    onChange={(e) => setForm({ ...form, query: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:border-purple-500 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-lg hover:shadow-neon-violet flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Doubt & Receive Answer in Gmail</span>
                </button>
              </form>
            )}

          </div>
        ) : (
          /* Curated Frequently Asked Questions (FAQ) */
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 px-2 gap-2">
              <span className="flex items-center gap-1.5 text-purple-700 dark:text-cyan-400 font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions & Key Discussions</span>
              </span>
              <span className="text-slate-500">
                {faqDoubts.length} Curated Technical Answers
              </span>
            </div>

            {faqDoubts.length === 0 ? (
              <div className="glass-panel p-10 rounded-2xl text-center space-y-3 border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#0c101c]">
                <Mail className="w-10 h-10 text-purple-500 mx-auto opacity-70" />
                <h4 className="text-base font-display font-bold text-slate-900 dark:text-white">
                  All Doubts Answered via Gmail
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-md mx-auto">
                  Student doubts are currently handled privately via Gmail delivery. General FAQs curated by our faculty council will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {faqDoubts.map((d) => (
                  <div
                    key={d.id}
                    className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-purple-400/50 dark:hover:border-cyan-500/40 transition-all space-y-3 bg-white/80 dark:bg-[#0c101c]/80 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-purple-600 dark:text-purple-300">
                          #{d.id}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 dark:bg-white/5 dark:text-slate-300 border border-purple-200 dark:border-white/10">
                          {d.category}
                        </span>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                        {d.status === 'answered' ? 'Answered FAQ' : d.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-display font-bold text-slate-900 dark:text-white">
                        {d.subject || "Frequently Asked Question"}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-sans">
                        "{d.query}"
                      </p>
                    </div>

                    {/* Official Coordinator Response */}
                    {d.adminReply && (
                      <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-cyan-950/30 border border-purple-200 dark:border-cyan-500/30 space-y-1.5 mt-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-purple-700 dark:text-cyan-400 font-semibold">
                          <span className="flex items-center gap-1.5">
                            <MessageCircle className="w-3.5 h-3.5" /> Coordinator Resolution:
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 font-normal">
                            {d.repliedBy} • {d.repliedAt}
                          </span>
                        </div>
                        <p className="text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
                          {d.adminReply}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
