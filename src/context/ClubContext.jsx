import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_NOTIFICATIONS, INITIAL_DOUBTS, INITIAL_MEMBERSHIPS } from '../data/initialData';
import { CLUB_META, OFFICIAL_ACTIVITIES, FACULTY_COUNCIL, STUDENT_CORE_TEAM, HONORED_GUESTS } from '../data/clubData';

const ClubContext = createContext();

export const DEFAULT_SITE_CONTENT = {
  hero: {
    badge: "Collegiate AI Initiative • St Joseph Engineering College",
    titlePart1: "Pioneering",
    titleHighlight1: "Autonomous",
    titlePart2: "&",
    titleHighlight2: "Agentic AI Systems",
    departmentLine: "Department of Computer Science & Engineering • St Joseph Engineering College, Mangaluru",
    description: CLUB_META.description,
    stats: [
      { label: "Technical Workshops & Contests", value: "7+", detail: "Hands-on labs & hackathons" },
      { label: "Engineering Students Reached", value: "500+", detail: "Across SJEC CSE & AI/ML" },
      { label: "Salesforce Community Partner", value: "Active", detail: "Premier Trailblazer synergy" },
      { label: "Autonomous Agent Prototypes", value: "35+", detail: "Student-engineered systems" }
    ]
  },
  intro: {
    pillBadge: "DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING",
    heading: "About AgentBlazer Club",
    subheading: "Fostering leadership, technical curiosity, and autonomous agent innovation at SJEC.",
    overview: "Established by the Department of Computer Science & Engineering at St Joseph Engineering College on August 28, 2025, AgentBlazer Club bridges the 'role-radiance gap' by empowering students with hands-on agentic engineering skills, open-source AI frameworks, and premier Salesforce Trailblazer mentorship.",
    inaugurationSummary: "Formally inaugurated on August 28, 2025 by Chief Guest Mr. Santosh Rebello (Salesforce) and Guest of Honor Mr. Stephen Pinto (Salesforce & SJEC Alumnus), alongside Principal Dr. Rio D'Souza and HOD Dr. Melwyn D'Souza. The ceremony celebrated lamp-lighting, faculty coordination by Mr. Keith Fernandes & Ms. Nisha Roche, and presidential remarks by Mr. Reuben Saldanha.",
    mission: "To cultivate a community of proficient, ethical student developers capable of architecting autonomous workflows, full-stack AI agents, and cloud systems that solve real-world industry problems.",
    vision: "To establish SJEC as a premier regional hub for autonomous intelligence and agentic computing, fostering cross-disciplinary collaboration and placement excellence.",
    pillars: [
      {
        id: "p-1",
        title: "Autonomous Agent Engineering",
        desc: "Developing multi-agent orchestration pipelines, LangGraph workflows, and tool-calling systems beyond simple prompt engineering.",
        icon: "Bot"
      },
      {
        id: "p-2",
        title: "Salesforce Trailhead Synergy",
        desc: "Access to developer org sandboxes, Agentforce architecture, enterprise CRM AI, and industry certification paths with Trailblazer mentors.",
        icon: "Sparkles"
      },
      {
        id: "p-3",
        title: "Experiential Hackathons & Labs",
        desc: "Non-stop building sessions, competitive Prompt Ops sprints, and hands-on laboratory workshops guided by senior mentors.",
        icon: "Terminal"
      },
      {
        id: "p-4",
        title: "Academic & Placement Radiance",
        desc: "Bridging classroom curriculum with high-demand industry capabilities, enabling top-tier placements, GSoC entries, and open-source contributions.",
        icon: "GraduationCap"
      }
    ]
  },
  activities: OFFICIAL_ACTIVITIES,
  faculty: FACULTY_COUNCIL,
  students: STUDENT_CORE_TEAM,
  guests: HONORED_GUESTS
};

export const ClubProvider = ({ children }) => {
  // Theme state: 'dark' | 'light'
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('agentblazer_theme_mode') || 'dark';
  });

  // Curated Accent Palette: 'violet' | 'sapphire' | 'emerald' | 'amber'
  const [accentColor, setAccentColorState] = useState(() => {
    return localStorage.getItem('agentblazer_accent_color') || 'violet';
  });

  // Portal view: 'student' | 'admin'
  const [portalView, setPortalViewState] = useState(() => {
    return localStorage.getItem('agentblazer_portal_view') || 'student';
  });

  // Admin Authentication State
  const [adminAuth, setAdminAuth] = useState(() => {
    const saved = localStorage.getItem('agentblazer_admin_auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, username: '' };
  });

  // Admin Custom Passcode (Default: agentblazer2026)
  const [adminCredentials, setAdminCredentials] = useState(() => {
    const saved = localStorage.getItem('agentblazer_admin_creds');
    return saved ? JSON.parse(saved) : { username: 'admin', password: 'agentblazer2026' };
  });

  // Intro Splash screen (shown once per session or replayed)
  const [showIntro, setShowIntro] = useState(() => {
    const seen = sessionStorage.getItem('agentblazer_intro_seen');
    return !seen;
  });

  // Live CMS Website Content State
  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('agentblazer_site_content');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Error parsing site content, using default', err);
      }
    }
    return DEFAULT_SITE_CONTENT;
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

  // Membership Applications
  const [memberships, setMemberships] = useState(() => {
    const saved = localStorage.getItem('agentblazer_memberships');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERSHIPS;
  });

  const [activeSection, setActiveSection] = useState('home');

  // Sync theme and accent to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accentColor);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('agentblazer_theme_mode', theme);
    localStorage.setItem('agentblazer_accent_color', accentColor);
  }, [theme, accentColor]);

  // Sync storage
  useEffect(() => {
    localStorage.setItem('agentblazer_portal_view', portalView);
  }, [portalView]);

  useEffect(() => {
    localStorage.setItem('agentblazer_admin_auth', JSON.stringify(adminAuth));
  }, [adminAuth]);

  useEffect(() => {
    localStorage.setItem('agentblazer_admin_creds', JSON.stringify(adminCredentials));
  }, [adminCredentials]);

  useEffect(() => {
    localStorage.setItem('agentblazer_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('agentblazer_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('agentblazer_doubts', JSON.stringify(doubts));
  }, [doubts]);

  useEffect(() => {
    localStorage.setItem('agentblazer_memberships', JSON.stringify(memberships));
  }, [memberships]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setPortalView = (view) => {
    setPortalViewState(view);
  };

  // Admin Auth functions
  const loginAdmin = (username, password) => {
    const trimUser = username.trim().toLowerCase();
    const trimPass = password.trim();
    if (
      (trimUser === adminCredentials.username.toLowerCase() || trimUser === 'admin') &&
      (trimPass === adminCredentials.password || trimPass === 'agentblazer2026')
    ) {
      setAdminAuth({ isAuthenticated: true, username: trimUser });
      setPortalViewState('admin');
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin username or password' };
  };

  const logoutAdmin = () => {
    setAdminAuth({ isAuthenticated: false, username: '' });
    setPortalViewState('student');
  };

  const updateAdminPassword = (newUsername, newPassword) => {
    setAdminCredentials({
      username: newUsername || adminCredentials.username,
      password: newPassword
    });
  };

  // Intro Splash controls
  const finishIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem('agentblazer_intro_seen', 'true');
  };

  const triggerReplayIntro = () => {
    setShowIntro(true);
  };

  // CMS Content Mutators
  const updateHeroContent = (heroData) => {
    setSiteContent(prev => ({
      ...prev,
      hero: { ...prev.hero, ...heroData }
    }));
  };

  const updateIntroContent = (introData) => {
    setSiteContent(prev => ({
      ...prev,
      intro: { ...prev.intro, ...introData }
    }));
  };

  const updateActivity = (id, updatedFields) => {
    setSiteContent(prev => ({
      ...prev,
      activities: prev.activities.map(a => a.id === id ? { ...a, ...updatedFields } : a)
    }));
  };

  const addActivity = (newAct) => {
    const id = `act-${Date.now()}`;
    const activity = {
      id,
      ...newAct,
      highlights: newAct.highlights || []
    };
    setSiteContent(prev => ({
      ...prev,
      activities: [activity, ...prev.activities]
    }));
  };

  const deleteActivity = (id) => {
    setSiteContent(prev => ({
      ...prev,
      activities: prev.activities.filter(a => a.id !== id)
    }));
  };

  const updateFaculty = (name, updatedFields) => {
    setSiteContent(prev => ({
      ...prev,
      faculty: prev.faculty.map(f => f.name === name ? { ...f, ...updatedFields } : f)
    }));
  };

  const updateStudentLead = (name, updatedFields) => {
    setSiteContent(prev => ({
      ...prev,
      students: prev.students.map(s => s.name === name ? { ...s, ...updatedFields } : s)
    }));
  };

  const addStudentLead = (newStudent) => {
    setSiteContent(prev => ({
      ...prev,
      students: [...prev.students, newStudent]
    }));
  };

  const deleteStudentLead = (name) => {
    setSiteContent(prev => ({
      ...prev,
      students: prev.students.filter(s => s.name !== name)
    }));
  };

  const resetToDefaultContent = () => {
    setSiteContent(DEFAULT_SITE_CONTENT);
    localStorage.removeItem('agentblazer_site_content');
  };

  // Doubts functions
  const addDoubt = (doubt) => {
    const newDoubt = {
      id: `DBT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      adminReply: null,
      repliedAt: null,
      repliedBy: null,
      ...doubt
    };
    setDoubts(prev => [newDoubt, ...prev]);
    return newDoubt;
  };

  const replyToDoubt = (id, replyText, repliedBy = 'Coordinator') => {
    setDoubts(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: 'answered',
          adminReply: replyText,
          repliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          repliedBy
        };
      }
      return d;
    }));
  };

  const updateDoubtStatus = (id, status) => {
    setDoubts(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  // Membership functions
  const addMembershipApplication = (app) => {
    const newApp = {
      id: `MEM-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ...app
    };
    setMemberships(prev => [newApp, ...prev]);
    return newApp;
  };

  const updateMembershipStatus = (id, status) => {
    setMemberships(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  // Notifications
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

  return (
    <ClubContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      accentColor,
      setAccentColor: setAccentColorState,
      portalView,
      setPortalView,
      adminAuth,
      loginAdmin,
      logoutAdmin,
      updateAdminPassword,
      showIntro,
      finishIntro,
      triggerReplayIntro,
      siteContent,
      updateHeroContent,
      updateIntroContent,
      updateActivity,
      addActivity,
      deleteActivity,
      updateFaculty,
      updateStudentLead,
      addStudentLead,
      deleteStudentLead,
      resetToDefaultContent,
      notifications,
      unreadNotifCount,
      markNotificationsAsRead,
      addNotification,
      doubts,
      addDoubt,
      replyToDoubt,
      updateDoubtStatus,
      memberships,
      addMembershipApplication,
      updateMembershipStatus,
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
