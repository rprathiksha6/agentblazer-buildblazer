import React, { useState, useEffect } from 'react';
import { CLUB_META } from '../data/clubData';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { Sparkles, ArrowRight, Code2, Bot, Clock, CheckCircle2 } from 'lucide-react';

export const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-12 pb-20 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/15 dark:bg-purple-600/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-400/15 dark:bg-cyan-500/15 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Collegiate Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-xs font-mono backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
              <span>Collegiate AI Initiative • St Joseph Engineering College</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400">Autonomous</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400">Agentic AI Systems</span>
            </h1>

            {/* Department Tagline */}
            <p className="text-sm sm:text-base font-mono text-purple-700 dark:text-purple-300/90 font-semibold">
              Department of Computer Science & Engineering • St Joseph Engineering College, Mangaluru
            </p>

            {/* Mission Paragraph */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              {CLUB_META.description}
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo('activities-section')}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium text-sm transition-all shadow-lg hover:shadow-neon-cyan active:scale-95"
              >
                <span>Explore Workshops & Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('buildblazer-section')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 text-sm font-mono transition-all"
              >
                <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Build Blazer Phase 2</span>
              </button>

              <button
                onClick={() => scrollTo('ask-doubt-section')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-sm font-mono transition-all"
              >
                <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Ask Doubt Desk</span>
              </button>
            </div>

            {/* Live Phase 2 Build Blazer Notice */}
            <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-black/40 border border-purple-300/60 dark:border-purple-500/30 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600 dark:text-cyan-400 animate-spin" />
                <span className="text-slate-800 dark:text-slate-300 font-semibold">Phase 2 Sprint Deadline:</span>
                <span className="text-slate-500 dark:text-slate-400">Fork & Deploy</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-purple-700 dark:text-cyan-300">
                <span className="px-2 py-1 bg-white dark:bg-white/5 rounded border border-slate-300 dark:border-white/10">{timeLeft.days}d</span>:
                <span className="px-2 py-1 bg-white dark:bg-white/5 rounded border border-slate-300 dark:border-white/10">{timeLeft.hours}h</span>:
                <span className="px-2 py-1 bg-white dark:bg-white/5 rounded border border-slate-300 dark:border-white/10">{timeLeft.minutes}m</span>:
                <span className="px-2 py-1 bg-white dark:bg-white/5 rounded border border-slate-300 dark:border-white/10">{timeLeft.seconds}s</span>
              </div>
            </div>

          </div>

          {/* Right Column: Free-Standing Realistic 3D Holographic Emblem */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative realistic-emblem-container">
            
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              
              {/* Rotating SVG Cyber Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-purple-400/20 dark:border-purple-500/30 animate-[spin_30s_linear_infinite] pointer-events-none"></div>
              <div className="absolute inset-4 rounded-full border border-cyan-400/20 dark:border-cyan-500/20 animate-[spin_45s_linear_infinite_reverse] pointer-events-none"></div>
              
              {/* Soft Ambient Radial Halo */}
              <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-cyan-400/25 blur-2xl animate-pulse-slow"></div>

              {/* Realistic Ground Shadow / Pedestal Glow */}
              <div className="absolute bottom-2 w-40 h-6 rounded-full bg-purple-900/40 dark:bg-purple-950/80 blur-lg"></div>

              {/* REALISTIC 3D FREE-FLOATING EMBLEM (compact scale) */}
              <div className="relative z-20 w-44 sm:w-52 flex flex-col items-center justify-center animate-float">
                <img 
                  src={agentblazerLogo} 
                  alt="AgentBlazer Club Official 3D Emblem" 
                  className="w-full h-auto object-contain realistic-emblem select-none cursor-pointer"
                />
              </div>

              {/* Floating Orbiting Chip: Salesforce Synergy */}
              <div className="absolute -top-3 right-0 px-2.5 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-cyan-400/50 dark:border-cyan-500/50 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-[11px] font-mono text-cyan-700 dark:text-cyan-300 animate-float">
                <Sparkles className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                <span>Salesforce Trailblazer</span>
              </div>

              {/* Floating Orbiting Chip: Autonomous Agents */}
              <div className="absolute -bottom-3 left-0 px-2.5 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-purple-400/50 dark:border-purple-500/50 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-[11px] font-mono text-purple-700 dark:text-purple-300 animate-float" style={{ animationDelay: '3s' }}>
                <Bot className="w-3 h-3 text-purple-500 dark:text-purple-400" />
                <span>Agentforce & LangGraph</span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Glass Stat Cards Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-purple-500/40 transition-all group">
            <div className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300">
              8+
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-white mt-1">Workshops & Challenges</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">Hands-on labs & coding sprints</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all group">
            <div className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-400 dark:to-blue-300">
              500+
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-white mt-1">Students Reached</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">Across engineering departments</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-amber-500/40 transition-all group">
            <div className="text-lg font-display font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <span>Salesforce</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30">Partner</span>
            </div>
            <div className="text-sm font-semibold text-amber-600 dark:text-amber-300 mt-1">Community Synergy</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">Active Trailblazer Mentorship</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 transition-all group">
            <div className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-cyan-300">
              35+
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-white mt-1">Autonomous Prototypes</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">Built by student teams at SJEC</div>
          </div>

        </div>

      </div>
    </section>
  );
};
