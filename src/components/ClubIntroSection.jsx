import React from 'react';
import { useClub } from '../context/ClubContext';
import { Sparkles, Calendar, MapPin, Landmark, Award, ShieldCheck } from 'lucide-react';
import { HONORED_GUESTS } from '../data/clubData';

export const ClubIntroSection = () => {
  const { siteContent } = useClub();
  const guests = (siteContent?.guests && siteContent.guests.length > 0) 
    ? siteContent.guests 
    : HONORED_GUESTS;

  return (
    <section id="about-club" className="py-24 relative overflow-hidden border-t border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-black/40">
      
      {/* Background Soft Ambient Atmosphere */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 dark:bg-purple-600/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header: Pill, Two-tone Serif/Sans Title, Subtext */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/50 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              <span>• FOUNDATIONS & LEADERSHIP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Inauguration &{" "}
              <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-cyan-400">
                Mentorship Council
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              Fostering technical curiosity, genuine mentorship, and bridging classroom theory with autonomous AI engineering practices.
            </p>
          </div>
        </div>

        {/* Official Launch & Keynote Feature Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-200/80 dark:border-purple-500/30 relative overflow-hidden bg-gradient-to-br from-white/90 via-purple-50/40 to-slate-100/80 dark:from-purple-950/20 dark:via-black/50 dark:to-cyan-950/20 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono text-xs border border-purple-200 dark:border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-400" />
                <span className="font-semibold tracking-wider uppercase text-[11px]">Official Launch & Keynote</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                AgentBlazer Club Launch & Agentforce Symposium
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
                Unveiled before faculty, industry leaders, and students—ushering in an era of student-led agentic systems, collaborative AI labs, and high-impact engineering hackathons at SJEC.
              </p>
            </div>

            {/* Right Date Card */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-white/10 text-center space-y-3.5 shadow-md">
              <div className="text-[11px] font-mono uppercase tracking-widest text-purple-600 dark:text-cyan-400 font-bold">
                INAUGURATED ON
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                August 25, 2025
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                  Academic Year 2025–2026
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
                  SJEC Campus
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Honored Guests & College Leadership Subsection */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
              <span>HONORED GUESTS & COLLEGE LEADERSHIP</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">
              Distinguished dignitaries and department leaders who addressed and inspired the inaugural assembly.
            </p>
          </div>

          {/* 4 Dignitaries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guests.map((guest, idx) => (
              <div
                key={guest.name || idx}
                className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-cyan-500/40 transition-all duration-300 space-y-4 bg-white/70 dark:bg-[#0c101c]/80 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Top Bar: Monogram + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300/80 dark:border-purple-500/40 flex items-center justify-center font-display font-bold text-base text-purple-700 dark:text-purple-300 shadow-sm group-hover:scale-105 transition-transform">
                      {guest.initials || guest.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/40 font-bold uppercase tracking-wider">
                      {guest.badge}
                    </span>
                  </div>

                  {/* Name & Credentials */}
                  <div>
                    <h4 className="text-base font-display font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                      {guest.name}
                    </h4>
                    <p className="text-xs font-mono text-purple-700 dark:text-purple-300 font-medium">
                      {guest.role}
                    </p>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {guest.organization}
                    </p>
                  </div>

                  {/* Bio / Keynote Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200 dark:border-white/5 pt-3">
                    {guest.bio}
                  </p>
                </div>

                <div className="pt-2 text-[10px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-500 dark:text-cyan-400" />
                  <span>Inaugural Council • SJEC CSE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
