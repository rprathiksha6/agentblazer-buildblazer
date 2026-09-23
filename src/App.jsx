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
  const { portalView, showIntro } = useClub();
  const [notifOpen, setNotifOpen] = useState(false);

  // If in Admin Portal mode (accessed via secret link /admin or /#admin), render standalone console
  if (portalView === 'admin') {
    return (
      <div className="min-h-screen cyber-grid-bg text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white relative bg-[#07090e]">
        <AdminPortal />
      </div>
    );
  }

  // Student Public Portal (Zero Admin Links visible)
  return (
    <div className="min-h-screen cyber-grid-bg text-slate-900 dark:text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white relative transition-colors duration-300">
      
      {/* Cinematic Intro Splash with Soaring Falcon & Word-by-Word Reveal */}
      {showIntro && <IntroSplash />}

      {/* Top Navbar */}
      <Navbar onOpenNotifs={() => setNotifOpen(true)} />

      {/* Main Student Portal Content */}
      <main className="flex-1">
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
      </main>

      {/* Footer */}
      <Footer />

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
