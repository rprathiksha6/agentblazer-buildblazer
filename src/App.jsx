import React, { useState } from 'react';
import { ClubProvider, useClub } from './context/ClubContext';
import { IntroSplash } from './components/IntroSplash';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClubIntroSection } from './components/ClubIntroSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { MembersSection } from './components/MembersSection';
import { AskDoubtSection } from './components/AskDoubtSection';
import { JoinConnectSection } from './components/JoinConnectSection';
import { NotificationModal } from './components/NotificationModal';
import { Chatbot } from './components/Chatbot';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';

const MainLayout = () => {
  const { portalView, setPortalView, showIntro } = useClub();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="min-h-screen cyber-grid-bg text-slate-900 dark:text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white relative transition-colors duration-300">
      
      {/* Cinematic Word-by-Word Intro Splash with Soaring Falcon */}
      {showIntro && <IntroSplash />}

      {/* Top Navbar */}
      <Navbar 
        onOpenNotifs={() => setNotifOpen(true)}
        onOpenAdminLogin={() => setPortalView('admin')}
      />

      {/* Main View: Student Portal vs Admin Portal */}
      <main className="flex-1">
        {portalView === 'admin' ? (
          <AdminPortal />
        ) : (
          <>
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Club Intro Section (Placed directly after Hero) */}
            <ClubIntroSection />

            {/* 3. Workshops & Activities Section */}
            <ActivitiesSection />

            {/* 4. Leadership & Mentors Council Section */}
            <MembersSection />

            {/* 5. Student Anonymous Doubts Desk */}
            <AskDoubtSection />

            {/* 6. Join Club & Community Connect */}
            <JoinConnectSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenAdminLogin={() => setPortalView('admin')} />

      {/* Interactive Side Chatbot */}
      <Chatbot />

      {/* Notification Drawer Modal */}
      <NotificationModal 
        isOpen={notifOpen} 
        onClose={() => setNotifOpen(false)} 
      />

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
