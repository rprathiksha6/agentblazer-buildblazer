import React, { useState } from 'react';
import { CLUB_META } from '../data/clubData';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { Sparkles, Building2, Mail, MapPin, CheckCircle2, UserPlus, ArrowRight, X, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const JoinConnectSection = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: '',
    usn: '',
    email: '',
    year: '2nd Year',
    interests: 'Autonomous Agents, Full-Stack AI',
    statement: ''
  });
  const [membershipSuccess, setMembershipSuccess] = useState(false);

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.usn || !memberForm.email) return;

    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 }
    });

    setMembershipSuccess(true);
    setTimeout(() => {
      setMembershipSuccess(false);
      setMembershipModalOpen(false);
      setMemberForm({
        name: '',
        usn: '',
        email: '',
        year: '2nd Year',
        interests: 'Autonomous Agents, Full-Stack AI',
        statement: ''
      });
    }, 2200);
  };

  return (
    <section id="join-connect-section" className="py-24 relative overflow-hidden border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/40">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-purple-500/15 via-cyan-500/15 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Top Logo Emblem */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto p-2 rounded-2xl bg-white dark:bg-purple-950/60 border border-slate-200 dark:border-purple-500/40 shadow-xl flex items-center justify-center animate-float">
          <img src={agentblazerLogo} alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Membership Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-xs font-mono shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
          <span>Membership Intake • Academic Year 2025–2026</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
          Ready to Build with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-purple-600 dark:from-cyan-400 dark:via-sky-300 dark:to-purple-400 italic">Autonomous Intelligence?</span>
        </h2>

        {/* Narrative Paragraph */}
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          Join the AgentBlazer Club at SJEC CSE. Collaborate with peers, gain hands-on access to Salesforce Trailhead developer orgs, and shape real AI agent projects.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setMembershipModalOpen(true)}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-mono text-xs font-bold transition-all shadow-lg hover:shadow-neon-cyan active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Become a Member</span>
          </button>

          <a
            href={`mailto:${CLUB_META.email}`}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 font-mono text-xs transition-all"
          >
            <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Contact CSE Department</span>
          </a>
        </div>

        {/* Official Address & Inquiry Card */}
        <div className="max-w-xl mx-auto mt-12 glass-panel p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-white/10 text-left flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 flex-shrink-0">
            <Building2 className="w-6 h-6" />
          </div>

          <div className="space-y-1 font-mono text-xs">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Department of Computer Science & Engineering
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              St Joseph Engineering College, Vamanjoor
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Mangaluru, Karnataka – 575028, India
            </p>
            <div className="pt-2 text-cyan-600 dark:text-cyan-400 font-semibold">
              Direct Inquiries: <a href={`mailto:${CLUB_META.email}`} className="underline">{CLUB_META.email}</a>
            </div>
          </div>
        </div>

      </div>

      {/* Become a Member Interactive Modal */}
      {membershipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-md w-full glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/50 shadow-2xl bg-white dark:bg-black/95 space-y-4">
            
            <button
              onClick={() => setMembershipModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                STUDENT ENROLLMENT
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-1">
                Apply for Club Membership
              </h3>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                AgentBlazer Club • Academic Year 2025–2026
              </p>
            </div>

            {membershipSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 dark:border-emerald-500/50 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 dark:text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-display font-bold text-slate-900 dark:text-white">Application Received!</h4>
                <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                  Welcome to the Trailblazer community! Coordinator verification details sent to your college email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMemberSubmit} className="space-y-3.5 text-xs font-mono">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prajwal Royston"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">College USN *</label>
                    <input
                      type="text"
                      required
                      placeholder="4SO23CS..."
                      value={memberForm.usn}
                      onChange={(e) => setMemberForm({ ...memberForm, usn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Current Year</label>
                    <select
                      value={memberForm.year}
                      onChange={(e) => setMemberForm({ ...memberForm, year: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">College Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name.23cs@sjec.ac.in"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Primary Interest Tracks</label>
                  <input
                    type="text"
                    placeholder="e.g. Agentic AI, Salesforce, Full Stack"
                    value={memberForm.interests}
                    onChange={(e) => setMemberForm({ ...memberForm, interests: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setMembershipModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold transition-all shadow-md"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
