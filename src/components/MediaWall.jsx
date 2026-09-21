import React, { useState } from 'react';
import campusPhoto from '../assets/campus-activity.jpg';
import { Camera, Sparkles, Play, Award, Zap, Code, Shield } from 'lucide-react';

export const MediaWall = () => {
  const [activeItem, setActiveItem] = useState(null);

  const mediaItems = [
    {
      id: 1,
      title: "Agentforce Live Symposium",
      tag: "Keynote & Demo",
      description: "Salesforce industry mentors introducing autonomous workflows and enterprise agent architecture at SJEC.",
      stats: "350+ Attendees",
      accent: "from-purple-600/60 to-cyan-600/60",
      border: "border-purple-500/40"
    },
    {
      id: 2,
      title: "Autonomous Agents Hands-on Lab",
      tag: "Technical Workshop",
      description: "Students building multi-agent LangGraph pipelines and function calling scripts in CSE Advanced Computing Lab.",
      stats: "120 Developers",
      accent: "from-cyan-600/60 to-blue-600/60",
      border: "border-cyan-500/40"
    },
    {
      id: 3,
      title: "Build Blazer Phase 1 Figma Jury",
      tag: "Design Sprint",
      description: "Third-year design submissions evaluated on typography, usability, and modern cyber design systems.",
      stats: "45 Submissions",
      accent: "from-pink-600/60 to-purple-600/60",
      border: "border-pink-500/40"
    },
    {
      id: 4,
      title: "Salesforce Trailblazer Synergy",
      tag: "Alumni Connect",
      description: "Mr. Stephen Pinto & Mr. Santosh Rebello mentoring students on modern open-source agent tooling.",
      stats: "Industry Guide",
      accent: "from-amber-600/60 to-orange-600/60",
      border: "border-amber-500/40"
    },
    {
      id: 5,
      title: "Campus 24h AI Hackfest Arena",
      tag: "Hackathon",
      description: "Non-stop overnight building sessions with live mentor office hours, pizza, and prototype deployments.",
      stats: "30 Teams",
      accent: "from-emerald-600/60 to-teal-600/60",
      border: "border-emerald-500/40"
    },
    {
      id: 6,
      title: "SJEC Innovation Showcase",
      tag: "Excellence",
      description: "Demonstrating student-led agentic software to college leadership, faculty, and visiting dignitaries.",
      stats: "Exhibition",
      accent: "from-indigo-600/60 to-purple-600/60",
      border: "border-indigo-500/40"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-black/40 border-y border-white/5">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-purple-600/10 via-cyan-600/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Camera className="w-3.5 h-3.5 text-purple-400" />
              <span>COLLEGIATE MOMENTS & ACTIVITY WALL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">AgentBlazer Club</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Capturing energy from symposium keynotes, intense coding hackathons, and hands-on laboratory workshops.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-cyan-300">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Active Student Community • SJEC</span>
          </div>
        </div>

        {/* Media Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`glass-panel p-6 rounded-3xl border ${item.border} hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden group flex flex-col justify-between h-64`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-10 group-hover:opacity-20 transition-opacity`}></div>

              {/* Top Row: Tag & Stats */}
              <div className="flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/60 text-cyan-300 border border-white/10">
                  {item.tag}
                </span>
                <span className="text-[11px] font-mono text-purple-300">
                  {item.stats}
                </span>
              </div>

              {/* Middle: Cyber Visual Emblem or Icon */}
              <div className="z-10 py-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                  <Code className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="z-10 space-y-1">
                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-mono text-cyan-300 flex items-center gap-1 z-10">
                Explore <Sparkles className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Item Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full glass-panel p-8 rounded-3xl border border-cyan-500/50 shadow-2xl bg-black/90 space-y-5">
            
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {activeItem.tag}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {activeItem.stats}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-white">
                {activeItem.title}
              </h3>
              <p className="text-xs font-mono text-purple-300 mt-1">
                AgentBlazer Club • SJEC Campus Activity
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeItem.description}
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300">
                <Award className="w-4 h-4" />
                <span>Organized by AgentBlazer Club & CSE Dept</span>
              </div>
              <p className="text-[11px] text-slate-400">
                All workshop source code, slide decks, and participant certificates are hosted on the student portal repository.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveItem(null)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-mono"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
