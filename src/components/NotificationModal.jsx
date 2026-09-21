import React from 'react';
import { useClub } from '../context/ClubContext';
import { Bell, X, CheckCheck, AlertCircle, Info, Sparkles } from 'lucide-react';

export const NotificationModal = ({ isOpen, onClose }) => {
  const { notifications, markNotificationsAsRead } = useClub();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md glass-panel rounded-3xl border border-white/15 bg-black/95 shadow-2xl p-6 space-y-4 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white">
                Notifications & Broadcasts
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Official AgentBlazer announcements
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>{notifications.length} alerts</span>
          <button
            onClick={markNotificationsAsRead}
            className="flex items-center gap-1 text-cyan-400 hover:underline text-[11px]"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {notifications.map((n) => {
            const isHigh = n.urgency === 'high';
            return (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all space-y-1.5 ${
                  !n.read 
                    ? 'bg-purple-950/30 border-purple-500/40 shadow-sm' 
                    : 'bg-white/5 border-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    isHigh 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {n.urgency} Priority
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{n.date}</span>
                </div>

                <h4 className="text-sm font-display font-bold text-white">
                  {n.title}
                </h4>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {n.message}
                </p>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-mono"
          >
            Close Notifications
          </button>
        </div>

      </div>
    </div>
  );
};
