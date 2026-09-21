import React, { useState } from 'react';
import { FACULTY_COUNCIL, STUDENT_CORE_TEAM } from '../data/clubData';
import { Users, User, ExternalLink, Sparkles, X, Eye, Mail, Phone, ShieldCheck, Award } from 'lucide-react';

export const MembersSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="members-section" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Tag */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono">
            <Users className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>CORE COUNCIL & LEADERSHIP</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Club Mentors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-purple-600 dark:from-cyan-400 dark:via-sky-300 dark:to-purple-400">Student Officers</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Empowering students with industry guidance, cloud engineering architectures, and authentic peer mentorship.
          </p>
        </div>

        {/* 1. Faculty Advisory Council */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 border-l-2 border-cyan-500 pl-3">
            <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white tracking-wide">
              Faculty Advisory Council
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">— Department of CSE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FACULTY_COUNCIL.map((faculty) => (
              <div 
                key={faculty.name}
                onClick={() => setSelectedMember(faculty)}
                className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30">
                      {faculty.badge}
                    </span>
                    <span className="text-[11px] font-mono text-purple-600 dark:text-purple-300 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> View Photo
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    {/* Photo or Initials */}
                    {faculty.photo ? (
                      <div className="w-16 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-neon-cyan relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={faculty.photo} 
                          alt={faculty.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-20 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border-2 border-purple-400/50 text-purple-700 dark:text-purple-300 font-display font-bold text-xl flex items-center justify-center flex-shrink-0">
                        {faculty.initials}
                      </div>
                    )}

                    <div>
                      <h4 className="text-base font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {faculty.name}
                      </h4>
                      <div className="text-xs font-mono text-purple-600 dark:text-purple-300 mt-0.5">
                        {faculty.role}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {faculty.designation}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-200 dark:border-white/5">
                    {faculty.bio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Focus: <span className="text-slate-800 dark:text-slate-200">{faculty.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Student Core Team & Officers */}
        <div>
          <div className="flex items-center justify-between mb-6 border-l-2 border-purple-500 pl-3">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white tracking-wide">
                Student Core Team & Officers
              </h3>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">— Academic Year 2025–2026</span>
            </div>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 hidden sm:inline">
              Third & Final Year Leadership
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDENT_CORE_TEAM.map((student) => (
              <div 
                key={student.name}
                onClick={() => setSelectedMember(student)}
                className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30">
                      {student.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {student.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    {student.photo ? (
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-neon-violet flex-shrink-0 group-hover:scale-105 transition-transform">
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-cyan-600 dark:text-cyan-300 font-display font-bold text-xl flex items-center justify-center flex-shrink-0">
                        {student.initials || student.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h4 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {student.name}
                      </h4>
                      <div className="text-xs font-mono text-cyan-600 dark:text-cyan-300 mt-0.5">
                        {student.role}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 border-t border-slate-200 dark:border-white/5 pt-3">
                    {student.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-[11px]">SJEC CSE</span>
                  <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-300 flex items-center gap-1 group-hover:underline">
                    <Eye className="w-3 h-3" /> View Profile & Photo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Member Portrait Modal Popup */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-sm w-full glass-panel p-6 sm:p-7 rounded-3xl border border-purple-500/50 shadow-2xl bg-white dark:bg-black/95 space-y-4">
            
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-bold">
                LEADERSHIP PROFILE
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white pt-1">
                {selectedMember.name}
              </h3>
              <p className="text-xs font-mono text-purple-600 dark:text-purple-300">
                {selectedMember.designation || selectedMember.role} • AgentBlazer Club
              </p>
            </div>

            {selectedMember.photo ? (
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-neon-cyan relative bg-black">
                <img 
                  src={selectedMember.photo} 
                  alt={selectedMember.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-300 border border-white/10">
                  SJEC CSE
                </div>
              </div>
            ) : (
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-purple-900 to-cyan-900 border border-purple-400/40 flex items-center justify-center text-white text-3xl font-display font-bold">
                {selectedMember.initials || selectedMember.name.slice(0, 2)}
              </div>
            )}

            <p className="text-xs text-slate-700 dark:text-slate-300 text-center leading-relaxed">
              {selectedMember.bio || selectedMember.desc}
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold"
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
