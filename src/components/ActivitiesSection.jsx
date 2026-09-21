import React, { useState } from 'react';
import { ACTIVITIES } from '../data/clubData';
import { Calendar, MapPin, Users, Sparkles, CheckCircle2, ArrowRight, Clock, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ActivitiesSection = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
  const [rsvpModalEvent, setRsvpModalEvent] = useState(null);
  const [rsvpData, setRsvpData] = useState({ name: '', usn: '', email: '', year: '3rd Year' });
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const filteredActivities = ACTIVITIES.filter(act => {
    if (filter === 'upcoming') return act.type === 'upcoming';
    if (filter === 'past') return act.type === 'past';
    return true;
  });

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpData.name || !rsvpData.usn || !rsvpData.email) return;

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpModalEvent(null);
      setRsvpData({ name: '', usn: '', email: '', year: '3rd Year' });
    }, 2000);
  };

  return (
    <section id="activities-section" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>ACTIVITIES & CALENDAR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              Workshops & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Events</span>
            </h2>
            <p className="text-slate-300 text-base max-w-xl">
              From inaugural symposiums with Salesforce pioneers to live build sprints and hackathons.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/10 self-start md:self-auto text-xs font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Activities ({ACTIVITIES.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'upcoming'
                  ? 'bg-cyan-600/40 text-cyan-200 border border-cyan-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Upcoming ({ACTIVITIES.filter(a => a.type === 'upcoming').length})
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'past'
                  ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Completed ({ACTIVITIES.filter(a => a.type === 'past').length})
            </button>
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => {
            const isUpcoming = act.type === 'upcoming';
            return (
              <div
                key={act.id}
                className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  
                  {/* Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider ${
                      isUpcoming 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse' 
                        : 'bg-white/5 text-slate-300 border border-white/10'
                    }`}>
                      {act.tag}
                    </span>
                    <span className="text-[11px] font-mono text-purple-300">
                      {act.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {act.title}
                  </h3>

                  {/* Date & Location */}
                  <div className="space-y-1.5 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{act.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <span>{act.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{act.attendees}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {act.summary}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {act.highlights.map(h => (
                      <span key={h} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-white/5">
                        #{h}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  {isUpcoming ? (
                    <button
                      onClick={() => setRsvpModalEvent(act)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-neon-cyan"
                    >
                      <span>RSVP / Register Interest</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Concluded Successfully
                      </span>
                      <span className="text-slate-500">Archived</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* RSVP Modal */}
      {rsvpModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-md w-full glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl bg-black/90 space-y-4">
            
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                EVENT REGISTRATION
              </span>
              <h3 className="text-xl font-display font-bold text-white mt-1">
                {rsvpModalEvent.title}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {rsvpModalEvent.date} • {rsvpModalEvent.venue}
              </p>
            </div>

            {rsvpSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-display font-bold text-white">RSVP Confirmed!</h4>
                <p className="text-xs font-mono text-emerald-300">
                  Your seat interest has been logged. Details sent to your college email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanjay Rao"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">College USN</label>
                    <input
                      type="text"
                      required
                      placeholder="4SO23CS..."
                      value={rsvpData.usn}
                      onChange={(e) => setRsvpData({ ...rsvpData, usn: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Current Year</label>
                    <select
                      value={rsvpData.year}
                      onChange={(e) => setRsvpData({ ...rsvpData, year: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">College Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name.23cs@sjec.ac.in"
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRsvpModalEvent(null)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-mono font-semibold shadow-neon-cyan"
                  >
                    Confirm RSVP
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
