import React from 'react';
import { HONORED_GUESTS } from '../data/clubData';
import { Award, Calendar, Landmark, Sparkles, Building2, UserCheck, Shield } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about-section" className="py-20 relative border-t border-white/5 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>FOUNDATIONS & LEADERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Inauguration & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Mentorship Council</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-sans">
            Fostering technical curiosity, genuine mentorship, and bridging classroom theory with autonomous AI engineering practices.
          </p>
        </div>

        {/* Inauguration Feature Banner Card (matching screenshot 3) */}
        <div className="mt-12 glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-block px-3 py-1 rounded-md bg-purple-500/20 text-purple-300 font-mono text-xs border border-purple-500/30">
                Official Launch & Keynote
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                AgentBlazer Club Launch & <span className="italic text-cyan-300">Agentforce Symposium</span>
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                The Department of Computer Science & Engineering founded the AgentBlazer Club to build an authentic student collective centered on autonomous intelligence, open agent frameworks, and industry partnership.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Landmark className="w-4 h-4" /> SJEC Campus
                </span>
                <span className="flex items-center gap-1.5 text-purple-400">
                  <Award className="w-4 h-4" /> Salesforce Trailblazer Backed
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Shield className="w-4 h-4" /> CSE Department Initiative
                </span>
              </div>
            </div>

            {/* Right Date Card */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-black/50 border border-white/10 text-center space-y-3">
              <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold">
                INAUGURATED ON
              </span>
              <div className="text-2xl sm:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-cyan-300">
                August 25, 2025
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Academic Year 2025–2026</span>
              </div>
              <div className="text-xs font-mono text-slate-400 pt-1">
                SJEC Campus • Mangaluru
              </div>
            </div>

          </div>
        </div>

        {/* Honored Guests & College Leadership */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">
              Honored Guests & College Leadership
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HONORED_GUESTS.map((guest, idx) => (
              <div 
                key={guest.name}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 font-display font-bold flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
                      {guest.initials}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">
                      {guest.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {guest.name}
                  </h4>
                  <div className="text-xs font-mono text-purple-300 mt-0.5 font-medium">
                    {guest.role}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    {guest.organization}
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed border-t border-white/5 pt-3">
                    {guest.bio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Distinguished Patron</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
