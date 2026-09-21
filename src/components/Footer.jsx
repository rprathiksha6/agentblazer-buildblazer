import React from 'react';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { CLUB_META } from '../data/clubData';
import { GitFork, Globe, Mail, MapPin, Heart, Shield, Terminal } from 'lucide-react';

export const Footer = ({ onOpenAdminLogin }) => {
  return (
    <footer className="border-t border-white/10 bg-[#04060a] text-slate-400 py-16 relative overflow-hidden">
      
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

            <p className="text-xs font-sans text-slate-400 leading-relaxed max-w-sm">
              {CLUB_META.description}
            </p>

            <div className="space-y-1 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{CLUB_META.institution}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{CLUB_META.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation & Initiatives */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Initiatives & Tracks
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#buildblazer-section" className="hover:text-cyan-300 transition-colors">
                  Build Blazer — Phase 2 Live Build
                </a>
              </li>
              <li>
                <a href="#activities-section" className="hover:text-cyan-300 transition-colors">
                  Autonomous Agent Workshops
                </a>
              </li>
              <li>
                <a href="#about-section" className="hover:text-cyan-300 transition-colors">
                  Salesforce Trailblazer Synergy
                </a>
              </li>
              <li>
                <a href="#ask-doubt-section" className="hover:text-cyan-300 transition-colors">
                  Student Doubt & Inquiry Desk
                </a>
              </li>
              <li>
                <a href="https://github.com/AgentBlazer/agentblazer-buildblazer.git" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5" /> Official Build Blazer Repo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Community Affiliations */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Governance & Portal
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Founded under the Department of Computer Science & Engineering, St Joseph Engineering College.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-300 transition-all text-xs"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Console Login</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} AgentBlazer Club • Dept of CSE, SJEC. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Pioneering Autonomous AI</span>
            <span className="text-purple-400">•</span>
            <span className="text-cyan-400">Mangaluru, Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
