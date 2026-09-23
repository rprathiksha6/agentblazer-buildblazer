import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import { Sparkles, Bot, Terminal, GraduationCap, Award, Compass, Target, Landmark, Shield, ChevronRight, UserCheck } from 'lucide-react';

export const ClubIntroSection = () => {
  const { siteContent } = useClub();
  const intro = siteContent.intro;
  const guests = siteContent.guests || [];

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'pillars' | 'council'

  const pillarIconMap = {
    Bot: <Bot className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    Sparkles: <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    Terminal: <Terminal className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
  };

  return (
    <section id="about-club" className="py-24 relative overflow-hidden border-t border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-black/40">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-purple-600/10 dark:bg-purple-600/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>{intro.pillBadge || "COLLEGIATE CLUB CHARTER • SJEC CSE"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 dark:from-purple-400 dark:via-pink-300 dark:to-cyan-400">AgentBlazer Club</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            {intro.subheading || "Fostering leadership, technical curiosity, and autonomous agent innovation at SJEC."}
          </p>

          {/* Interactive Navigation Pills */}
          <div className="flex items-center justify-center pt-2">
            <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 dark:bg-black/60 border border-slate-300 dark:border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-5 py-2 rounded-xl transition-all ${
                  activeTab === 'overview'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Club Overview & Mission
              </button>
              <button
                onClick={() => setActiveTab('pillars')}
                className={`px-5 py-2 rounded-xl transition-all ${
                  activeTab === 'pillars'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Core Pillars ({intro.pillars?.length || 4})
              </button>
              <button
                onClick={() => setActiveTab('council')}
                className={`px-5 py-2 rounded-xl transition-all ${
                  activeTab === 'council'
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Inauguration & Mentors
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Overview & Mission / Vision Cards */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Primary Story Card */}
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-white/10 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 font-mono text-xs border border-purple-200 dark:border-purple-500/30">
                    Official Department Initiative
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                    Bridging Theory with <span className="text-cyan-600 dark:text-cyan-400">Autonomous Engineering</span>
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {intro.overview}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-mono leading-relaxed">
                    {intro.inaugurationSummary}
                  </p>
                </div>

                <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-purple-700 dark:text-cyan-400 font-bold">
                    Official Club Birthdate
                  </div>
                  <div className="text-xl font-display font-bold text-slate-900 dark:text-white">
                    August 28, 2025
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Department of CSE • St Joseph Engineering College
                  </div>
                </div>
              </div>
            </div>

            {/* Mission & Vision Dual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 hover:border-purple-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                  Our Mission
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {intro.mission}
                </p>
              </div>

              {/* Vision Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 hover:border-cyan-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                  Our Vision
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {intro.vision}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Core Pillars Grid */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {intro.pillars?.map((pillar, idx) => (
              <div
                key={pillar.id || idx}
                className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pillarIconMap[pillar.icon] || <Sparkles className="w-6 h-6 text-purple-400" />}
                  </div>
                  <h4 className="text-base font-display font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
                <div className="text-[11px] font-mono text-purple-600 dark:text-cyan-400 flex items-center gap-1 font-semibold">
                  <span>Pillar 0{idx + 1}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Honored Guests & Mentors Council */}
        {activeTab === 'council' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guests.map((guest) => (
                <div
                  key={guest.name}
                  className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/40 flex items-center justify-center font-display font-bold text-base text-purple-700 dark:text-purple-300">
                      {guest.initials}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40">
                      {guest.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-display font-bold text-slate-900 dark:text-white">
                      {guest.name}
                    </h4>
                    <p className="text-xs font-mono text-purple-600 dark:text-purple-300">
                      {guest.role}
                    </p>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {guest.organization}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200 dark:border-white/5 pt-2">
                    {guest.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
