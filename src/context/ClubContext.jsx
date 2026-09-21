import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_NOTIFICATIONS, INITIAL_DOUBTS, INITIAL_SUBMISSIONS } from '../data/initialData';

const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  // Theme state: 'violet' | 'inferno' | 'frost'
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('agentblazer_theme') || 'violet';
  });

  // Portal view: 'student' | 'admin'
  const [portalView, setPortalViewState] = useState(() => {
    return localStorage.getItem('agentblazer_portal_view') || 'student';
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('agentblazer_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Doubts Desk
  const [doubts, setDoubts] = useState(() => {
    const saved = localStorage.getItem('agentblazer_doubts');
    return saved ? JSON.parse(saved) : INITIAL_DOUBTS;
  });

  // Build Blazer Submissions
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('agentblazer_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  // Active section for navigation highlighting
  const [activeSection, setActiveSection] = useState('home');

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('agentblazer_theme', theme);
  }, [theme]);

  // Sync storage
  useEffect(() => {
    localStorage.setItem('agentblazer_portal_view', portalView);
  }, [portalView]);

  useEffect(() => {
    localStorage.setItem('agentblazer_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('agentblazer_doubts', JSON.stringify(doubts));
  }, [doubts]);

  useEffect(() => {
    localStorage.setItem('agentblazer_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const setPortalView = (view) => {
    setPortalViewState(view);
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addDoubt = (doubtData) => {
    const newDoubt = {
      id: `DBT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      adminReply: null,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      repliedAt: null,
      repliedBy: null,
      ...doubtData
    };
    setDoubts(prev => [newDoubt, ...prev]);
    return newDoubt;
  };

  const replyDoubt = (id, replyText, repliedBy = "AgentBlazer Admin") => {
    setDoubts(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          adminReply: replyText,
          status: 'answered',
          repliedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
          repliedBy
        };
      }
      return d;
    }));
  };

  const updateDoubtStatus = (id, newStatus) => {
    setDoubts(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const addSubmission = (subData) => {
    const newSub = {
      id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      status: 'under_review',
      score: null,
      feedback: 'Awaiting evaluator grading from CSE Faculty & AgentBlazer Tech Leads.',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      ...subData
    };
    setSubmissions(prev => [newSub, ...prev]);
    return newSub;
  };

  const updateSubmissionStatus = (id, status, score = null, feedback = null) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status,
          ...(score !== null ? { score } : {}),
          ...(feedback !== null ? { feedback } : {})
        };
      }
      return s;
    }));
  };

  return (
    <ClubContext.Provider value={{
      theme,
      setTheme,
      portalView,
      setPortalView,
      notifications,
      unreadNotifCount,
      markNotificationsAsRead,
      addNotification,
      doubts,
      addDoubt,
      replyDoubt,
      updateDoubtStatus,
      submissions,
      addSubmission,
      updateSubmissionStatus,
      activeSection,
      setActiveSection
    }}>
      {children}
    </ClubContext.Provider>
  );
};

export const useClub = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
};
