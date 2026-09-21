import React, { useState } from 'react';
import { ClubProvider, useClub } from './context/ClubContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MediaWall } from './components/MediaWall';
import { AboutSection } from './components/AboutSection';
import { MembersSection } from './components/MembersSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { BuildBlazerSection } from './components/BuildBlazerSection';
import { AskDoubtSection } from './components/AskDoubtSection';
import { NotificationModal } from './components/NotificationModal';
import { Chatbot } from './components/Chatbot';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { CLUB_META } from './data/clubData';
import { ShieldCheck, Lock, X, ArrowRight, AlertCircle } from 'lucide-react';

const MainLayout = () => {
  const { portalView, setPortalView } = useClub();
  const [notifOpen, setNotifOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (passcode.trim() === CLUB_META.portalPasscode || passcode.trim() === 'admin') {
      setPortalView('admin');
      setAdminLoginOpen(false);
      setPasscode('');
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleQuickOrganizerAccess = () => {
    setPortalView('admin');
    setAdminLoginOpen(false);
    setPasscode('');
    setPassError(false);
  };

  return (
    <div className="min-h-screen cyber-grid-bg text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white relative">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenNotifs={() => setNotifOpen(true)}
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
      />

      {/* Main View: Student Portal vs Admin Portal */}
      <main className="flex-1">
        {portalView === 'admin' ? (
          <AdminPortal />
        ) : (
          <>
            <Hero />
            <MediaWall />
            <AboutSection />
            <MembersSection />
            <ActivitiesSection />
            <BuildBlazerSection />
            <AskDoubtSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenAdminLogin={() => setAdminLoginOpen(true)} />

      {/* Interactive Side Chatbot */}
      <Chatbot />

      {/* Notification Drawer Modal */}
      <NotificationModal 
        isOpen={notifOpen} 
        onClose={() => setNotifOpen(false)} 
      />

      {/* Admin Login Modal */}
      {adminLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-sm w-full glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/50 shadow-2xl bg-black/95 space-y-4">
            
            <button
              onClick={() => {
                setAdminLoginOpen(false);
                setPassError(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto mb-2 shadow-neon-violet">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                Organizer Access
              </h3>
              <p className="text-xs font-mono text-slate-400">
                AgentBlazer Club Admin Console
              </p>
            </div>

            {passError && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Incorrect passcode. Default: agentblazer2026</span>
              </div>
            )}

            <form onSubmit={handleAdminAuth} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">
                  Organizer Passcode
                </label>
                <input
                  type="password"
                  placeholder="Enter passcode (e.g. agentblazer2026)"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPassError(false);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:border-cyan-400 focus:outline-none tracking-widest"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold transition-all shadow-md"
              >
                Authenticate & Enter
              </button>

              <div className="pt-2 border-t border-white/10 text-center">
                <button
                  type="button"
                  onClick={handleQuickOrganizerAccess}
                  className="text-[11px] text-cyan-400 hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>One-Click Organizer Demo Login</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <ClubProvider>
      <MainLayout />
    </ClubProvider>
  );
}
