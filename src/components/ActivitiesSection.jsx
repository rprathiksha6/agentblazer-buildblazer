import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import { ACTIVITIES } from '../data/clubData';
import { Calendar, MapPin, Users, Sparkles, CheckCircle2, ArrowRight, Clock, Image as ImageIcon, X, ExternalLink, Award, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ActivitiesSection = () => {
  const { siteContent } = useClub();
  const allActivities = siteContent?.activities || ACTIVITIES;

  const [filter, setFilter] = useState('all'); // 'all', 'past', 'upcoming'
  const [selectedGalleryEvent, setSelectedGalleryEvent] = useState(null);
  const [rsvpModalEvent, setRsvpModalEvent] = useState(null);
  const [rsvpData, setRsvpData] = useState({ name: '', usn: '', email: '', year: '3rd Year' });
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const filteredActivities = allActivities.filter(act => {
    if (filter === 'upcoming') return act.type === 'upcoming';
    if (filter === 'past') return act.type === 'past';
    return true;
  });

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpData.name || !rsvpData.usn || !rsvpData.email) return;

    confetti({
      particleCount: 70,
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
        
        {/* Section Header (matching screenshot 2) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              <span>WORKSHOPS & LIVE SESSIONS • ACADEMIC YEAR 2025–2026</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
              Workshops, Contests & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-purple-600 dark:from-cyan-400 dark:via-sky-300 dark:to-purple-400 italic font-serif font-normal">Masterclasses</span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl font-sans">
              Hands-on technical deep dives, algorithmic challenges, and real-world system deployments with seasoned engineers.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-slate-200/80 dark:bg-black/60 p-1 rounded-2xl border border-slate-300 dark:border-white/10 self-start md:self-auto text-xs font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Events ({allActivities.length})
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'past'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Conducted ({allActivities.filter(a => a.type === 'past').length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'upcoming'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Upcoming ({allActivities.filter(a => a.type === 'upcoming').length})
            </button>
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => {
            const isUpcoming = act.type === 'upcoming';
            const hasPoster = Boolean(act.poster);

            return (
              <div
                key={act.id}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="space-y-4">
                  
                  {/* Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-purple-700 dark:text-purple-300 font-semibold">
                      {act.date}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                      isUpcoming 
                        ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 animate-pulse' 
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                    }`}>
                      {act.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                    {act.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {act.summary}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {act.highlights.map(h => (
                      <span key={h} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-black/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                        #{h}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Row with Gallery / Poster Inspection trigger */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedGalleryEvent(act)}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-purple-600 dark:hover:text-cyan-300 font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{hasPoster ? "Inspect Poster & Details" : "View Event Gallery"}</span>
                  </button>

                  {isUpcoming ? (
                    <button
                      onClick={() => setRsvpModalEvent(act)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <span>RSVP</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Done
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Activity & Poster Pop-up Modal (matching screenshot 2!) */}
      {selectedGalleryEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full glass-panel p-6 sm:p-7 rounded-3xl border border-cyan-500/50 shadow-2xl bg-white dark:bg-black/95 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedGalleryEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Gallery Header Badge */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                  {selectedGalleryEvent.title} GALLERY
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                1.0s Shuffle
              </span>
            </div>

            {/* Image / Poster Display */}
            {selectedGalleryEvent.poster ? (
              <div className="w-full rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-neon-cyan relative bg-black/90 p-2">
                <img 
                  src={selectedGalleryEvent.poster} 
                  alt={selectedGalleryEvent.title} 
                  className="w-full max-h-72 object-contain mx-auto rounded-xl"
                />
                <div className="absolute bottom-3 right-4 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-300 border border-white/10">
                  Official Flyer
                </div>
              </div>
            ) : (
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg relative bg-slate-900">
                <img 
                  src={selectedGalleryEvent.image} 
                  alt={selectedGalleryEvent.title} 
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-black/75 text-[10px] font-mono text-cyan-300">
                  SJEC CSE Campus Moments
                </div>
              </div>
            )}

            {/* Event Details */}
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                {selectedGalleryEvent.title}
              </h3>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>{selectedGalleryEvent.date}</span>
                <span>•</span>
                <span>{selectedGalleryEvent.venue}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
                {selectedGalleryEvent.details || selectedGalleryEvent.summary}
              </p>
            </div>

            {/* Program Outcomes & Highlights */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1.5 text-xs font-mono">
              <span className="text-purple-700 dark:text-purple-300 font-semibold block">Key Outcomes & Topics:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedGalleryEvent.highlights.map(h => (
                  <span key={h} className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-black/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedGalleryEvent(null)}
                className="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-mono font-semibold"
              >
                Close Gallery View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* RSVP Modal */}
      {rsvpModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-md w-full glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl bg-white dark:bg-black/90 space-y-4">
            
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                EVENT REGISTRATION
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-1">
                {rsvpModalEvent.title}
              </h3>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                {rsvpModalEvent.date} • {rsvpModalEvent.venue}
              </p>
            </div>

            {rsvpSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 dark:border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 dark:text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-display font-bold text-slate-900 dark:text-white">RSVP Confirmed!</h4>
                <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                  Your seat interest has been logged. Details sent to your college email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3.5 text-xs font-mono">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanjay Rao"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">College USN</label>
                    <input
                      type="text"
                      required
                      placeholder="4SO23CS..."
                      value={rsvpData.usn}
                      onChange={(e) => setRsvpData({ ...rsvpData, usn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Current Year</label>
                    <select
                      value={rsvpData.year}
                      onChange={(e) => setRsvpData({ ...rsvpData, year: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">College Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name.23cs@sjec.ac.in"
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRsvpModalEvent(null)}
                    className="px-4 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md"
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
