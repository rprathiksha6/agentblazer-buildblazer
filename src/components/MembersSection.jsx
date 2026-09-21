import React, { useState } from 'react';
import { FACULTY_COUNCIL, STUDENT_CORE_TEAM } from '../data/clubData';
import { Users, User, ExternalLink, Sparkles, X, Eye } from 'lucide-react';

export const MembersSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="members-section" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Tag */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>CORE COUNCIL & LEADERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Club Mentors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">Student Officers</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Empowering students with industry guidance, cloud engineering architectures, and authentic peer mentorship.
          </p>
        </div>

        {/* 1. Faculty Advisory Council */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 border-l-2 border-cyan-400 pl-3">
            <h3 className="text-xl font-display font-bold text-white tracking-wide">
              Faculty Advisory Council
            </h3>
            <span className="text-xs font-mono text-slate-400">— Department of CSE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FACULTY_COUNCIL.map((faculty) => (
              <div 
                key={faculty.name}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start sm:items-center group"
              >
                {/* Photo or Initials */}
                <div className="relative flex-shrink-0">
                  {faculty.photo ? (
                    <div className="w-24 h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-neon-cyan relative group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={faculty.photo} 
                        alt={faculty.name} 
                        className="w-full h-full object-cover"
                      />
                      <button 
                        onClick={() => setSelectedMember(faculty)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                        title="View Full Portrait"
                      >
                        <Eye className="w-5 h-5 text-cyan-300" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-28 rounded-2xl bg-purple-950/60 border-2 border-purple-500/40 text-purple-300 font-display font-bold text-2xl flex items-center justify-center">
                      {faculty.initials}
                    </div>
                  )}
                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    SJEC CSE
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      {faculty.badge}
                    </span>
                    {faculty.photo && (
                      <button
                        onClick={() => setSelectedMember(faculty)}
                        className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all"
                      >
                        Portrait View
                      </button>
                    )}
                  </div>

                  <h4 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {faculty.name}
                  </h4>
                  <div className="text-xs font-mono text-purple-300">
                    {faculty.designation} • {faculty.role}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {faculty.bio}
                  </p>

                  <div className="pt-2 text-[11px] font-mono text-slate-400">
                    Focus: <span className="text-slate-200">{faculty.focus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Student Core Team & Officers */}
        <div>
          <div className="flex items-center justify-between mb-6 border-l-2 border-purple-400 pl-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-display font-bold text-white tracking-wide">
                Student Core Team & Officers
              </h3>
              <span className="text-xs font-mono text-slate-400">— Academic Year 2025–2026</span>
            </div>
            <span className="text-xs font-mono text-purple-400 hidden sm:inline">
              Third & Final Year Leadership
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDENT_CORE_TEAM.map((student) => (
              <div 
                key={student.name}
                className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {student.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {student.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    {student.photo ? (
                      <div 
                        onClick={() => setSelectedMember(student)}
                        className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-400/60 shadow-neon-violet flex-shrink-0 cursor-pointer group-hover:scale-105 transition-transform"
                      >
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-black/60 border border-white/15 text-cyan-300 font-display font-bold text-xl flex items-center justify-center flex-shrink-0">
                        {student.initials || student.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h4 className="text-lg font-display font-bold text-white group-hover:text-purple-300 transition-colors">
                        {student.name}
                      </h4>
                      <div className="text-xs font-mono text-cyan-300 mt-0.5">
                        {student.role}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-2 border-t border-white/5 pt-3">
                    {student.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-[11px] text-slate-400">SJEC CSE</span>
                  <div className="flex items-center gap-2">
                    {student.photo && (
                      <button
                        onClick={() => setSelectedMember(student)}
                        className="text-[11px] font-mono text-cyan-300 hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> View Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Member Portrait Modal Popup (Matching Screenshots 4 & 5!) */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-sm w-full glass-panel p-6 rounded-3xl border border-purple-500/50 shadow-2xl bg-black/90 space-y-4">
            
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                LEADERSHIP PORTRAIT
              </span>
              <h3 className="text-xl font-display font-bold text-white pt-1">
                {selectedMember.name}
              </h3>
              <p className="text-xs font-mono text-purple-300">
                {selectedMember.designation || selectedMember.role} • AgentBlazer Club
              </p>
            </div>

            {selectedMember.photo && (
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-neon-cyan relative">
                <img 
                  src={selectedMember.photo} 
                  alt={selectedMember.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-300 border border-white/10">
                  SJEC CSE
                </div>
              </div>
            )}

            <p className="text-xs text-slate-300 text-center leading-relaxed">
              {selectedMember.bio || selectedMember.desc}
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-5 py-2 rounded-xl bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/50 text-white text-xs font-mono"
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
