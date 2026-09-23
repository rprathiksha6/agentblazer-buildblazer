import React from 'react';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { CLUB_META } from '../data/clubData';
import { useClub } from '../context/ClubContext';
import { Mail, MapPin, Shield, Play, Sparkles, Terminal, ChevronRight } from 'lucide-react';

export const Footer = () => {
  const { triggerReplayIntro } = useClub();

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-900 text-slate-400 py-16 relative overflow-hidden transition-colors">
      
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-purple-600/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/30 p-1 flex items-center justify-center">
                <img src={agentblazerLogo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-wider">
                AgentBlazer <span className="text-cyan-400 font-normal text-sm font-mono">CLUB</span>
              </span>
            </div>

            <p className="text-xs font-sans text-slate-300 leading-relaxed max-w-sm">
              {CLUB_META.description}
            </p>

            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span>{CLUB_META.institution}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>{CLUB_META.email}</span>
              </div>
            </div>

            {/* Replay Intro Animation Button */}
            <div className="pt-2">
              <button
                onClick={triggerReplayIntro}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 hover:text-white transition-all text-xs font-mono group"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Replay Soaring Intro Animation</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation & Tracks */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Club Navigation & Initiatives
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about-club" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-purple-400" />
                  About AgentBlazer & 4 Pillars
                </a>
              </li>
              <li>
                <a href="#activities-section" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-400" />
                  Workshops & Technical Masterclasses
                </a>
              </li>
              <li>
                <a href="#members-section" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-purple-400" />
                  Faculty Council & Student Officers
                </a>
              </li>
              <li>
                <a href="#ask-doubt-section" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-400" />
                  Anonymous Doubts & Support Desk
                </a>
              </li>
              <li>
                <a href="#join-connect-section" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-purple-400" />
                  Apply for Club Membership
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Institutional Charter */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Academic Affiliation
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Department of Computer Science & Engineering<br />
              St Joseph Engineering College, Vamanjoor, Mangaluru - 575028
            </p>
            <div className="pt-1 text-[11px] text-slate-400">
              Autonomous Institution affiliated to VTU • Approved by AICTE • Accredited by NAAC & NBA
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} AgentBlazer Club • Dept of CSE, SJEC. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Pioneering Autonomous AI</span>
            <span className="text-purple-400">•</span>
            <span className="text-cyan-400">Mangaluru, Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
