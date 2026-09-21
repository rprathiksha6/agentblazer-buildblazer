import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import { BUILD_BLAZER_INFO } from '../data/clubData';
import { GitFork, ExternalLink, Code2, CheckCircle2, Trophy, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BuildBlazerSection = () => {
  const { submissions, addSubmission } = useClub();

  const [formData, setFormData] = useState({
    teamName: '',
    teamLead: '',
    leadUsn: '',
    leadEmail: '',
    member2: '',
    member3: '',
    figmaUrl: '',
    githubRepoUrl: '',
    deployedUrl: '',
    techStack: 'React, Vite, Tailwind CSS'
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.teamName || !formData.githubRepoUrl || !formData.deployedUrl) return;

    const membersList = [
      `${formData.teamLead} (${formData.leadUsn})`,
      formData.member2 ? formData.member2 : null,
      formData.member3 ? formData.member3 : null,
    ].filter(Boolean);

    const techArray = formData.techStack.split(',').map(s => s.trim()).filter(Boolean);

    const created = addSubmission({
      teamName: formData.teamName,
      teamLead: formData.teamLead,
      leadUsn: formData.leadUsn,
      leadEmail: formData.leadEmail,
      members: membersList,
      figmaUrl: formData.figmaUrl,
      githubRepoUrl: formData.githubRepoUrl,
      deployedUrl: formData.deployedUrl,
      techStack: techArray
    });

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });

    setSubmittedTicket(created);
    setFormData({
      teamName: '',
      teamLead: '',
      leadUsn: '',
      leadEmail: '',
      member2: '',
      member3: '',
      figmaUrl: '',
      githubRepoUrl: '',
      deployedUrl: '',
      techStack: 'React, Vite, Tailwind CSS'
    });
  };

  return (
    <section id="buildblazer-section" className="py-20 relative border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>CHALLENGE TRACK • PHASE 2</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Build Blazer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">Sprint</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Turn your team's winning Figma design into a live, high-performance deployed web application.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {BUILD_BLAZER_INFO.steps.map((s) => (
            <div 
              key={s.step}
              className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-all"
            >
              <div className="text-3xl font-display font-extrabold text-white/20 group-hover:text-cyan-400 transition-colors mb-2">
                0{s.step}
              </div>
              <h4 className="text-sm font-display font-bold text-white mb-1">
                {s.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Evaluation Rubric Cards */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Evaluation Rubric & Weightage</span>
            </h3>
            <span className="text-xs font-mono text-purple-300">100 Points Total</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUILD_BLAZER_INFO.rubric.map((r) => (
              <div key={r.title} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300 font-semibold">{r.title}</span>
                  <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30">
                    {r.weight}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Submission Form & Submissions Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Submission Form */}
          <div id="buildblazer-submission-form" className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative">
            <div className="mb-6 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                OFFICIAL SUBMISSION DESK
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                Submit Phase 2 Project
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Official repository: <span className="text-cyan-300">AgentBlazer/agentblazer-buildblazer</span>
              </p>
            </div>

            {submittedTicket ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <div>
                    <h4 className="text-lg font-display font-bold text-white">Submission Logged!</h4>
                    <p className="text-xs font-mono text-emerald-300">Ticket ID: {submittedTicket.id}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Team <span className="text-white font-bold">{submittedTicket.teamName}</span> has successfully submitted their project. The entry has been automatically pushed to the AgentBlazer Admin Portal review queue.
                </p>
                <div className="p-3 rounded-xl bg-black/60 text-xs font-mono text-slate-300 space-y-1">
                  <div>Live URL: <a href={submittedTicket.deployedUrl} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{submittedTicket.deployedUrl}</a></div>
                  <div>GitHub Repo: <a href={submittedTicket.githubRepoUrl} target="_blank" rel="noreferrer" className="text-purple-400 underline">{submittedTicket.githubRepoUrl}</a></div>
                </div>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="w-full py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono border border-emerald-500/40"
                >
                  Submit Another Team Entry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Team Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NeuralBlazers"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Team Lead Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sanjay Rao"
                      value={formData.teamLead}
                      onChange={(e) => setFormData({ ...formData, teamLead: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Lead College USN</label>
                    <input
                      type="text"
                      required
                      placeholder="4SO23CS165"
                      value={formData.leadUsn}
                      onChange={(e) => setFormData({ ...formData, leadUsn: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Team Lead Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sanjay.23cs@sjec.ac.in"
                    value={formData.leadEmail}
                    onChange={(e) => setFormData({ ...formData, leadEmail: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Member 2 (Name & USN)</label>
                    <input
                      type="text"
                      placeholder="e.g. Deepa Bhat (4SO23CS045)"
                      value={formData.member2}
                      onChange={(e) => setFormData({ ...formData, member2: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Member 3 (Name & USN)</label>
                    <input
                      type="text"
                      placeholder="e.g. Nihal Crasta (4SO23CS112)"
                      value={formData.member3}
                      onChange={(e) => setFormData({ ...formData, member3: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Phase 1 Figma Design Link</label>
                  <input
                    type="url"
                    placeholder="https://www.figma.com/file/..."
                    value={formData.figmaUrl}
                    onChange={(e) => setFormData({ ...formData, figmaUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">GitHub Fork Repository URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/YourTeam/agentblazer-buildblazer"
                    value={formData.githubRepoUrl}
                    onChange={(e) => setFormData({ ...formData, githubRepoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Live Deployed Website URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://your-team.vercel.app"
                    value={formData.deployedUrl}
                    onChange={(e) => setFormData({ ...formData, deployedUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Tech Stack Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono text-xs font-bold transition-all shadow-lg hover:shadow-neon-cyan flex items-center justify-center gap-2"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Submit Project For Evaluation</span>
                </button>
              </form>
            )}
          </div>

          {/* Submissions Live Ledger */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <GitFork className="w-4 h-4 text-purple-400" />
                <span>Live Submission Ledger</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">{submissions.length} Teams Registered</span>
            </div>

            <div className="space-y-3">
              {submissions.map((sub) => {
                const isApproved = sub.status === 'approved';
                const isReview = sub.status === 'under_review';
                return (
                  <div 
                    key={sub.id}
                    className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all space-y-2.5 text-xs font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-white text-sm">{sub.teamName}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                        isApproved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        isReview ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {sub.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-slate-400 text-[11px]">
                      Lead: <span className="text-slate-200">{sub.teamLead}</span> • {sub.leadUsn}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {sub.techStack?.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                      <a 
                        href={sub.githubRepoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        GitHub Fork <ExternalLink className="w-3 h-3" />
                      </a>
                      <a 
                        href={sub.deployedUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        Live Website <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
