import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { 
  ShieldCheck, Lock, LogOut, ArrowLeft, Globe, MessageSquare, 
  Users, Bell, Settings, Plus, Trash2, Edit3, CheckCircle2, 
  AlertCircle, Sparkles, Save, ExternalLink, Search, Mail, BookOpen
} from 'lucide-react';

export const AdminPortal = () => {
  const { 
    adminAuth, loginAdmin, logoutAdmin,
    siteContent, updateHeroContent, updateIntroContent,
    updateActivity, addActivity, deleteActivity,
    resetToDefaultContent,
    doubts, replyToDoubt, toggleDoubtFeatured, updateDoubtStatus,
    memberships, updateMembershipStatus,
    notifications, addNotification,
    setPortalView
  } = useClub();

  // Login Form Local State
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: '' });
  const [loginError, setLoginError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Main Active Tab — Defaults directly to 'cms' (Edit Section)
  const [activeTab, setActiveTab] = useState('cms'); // 'cms' | 'doubts' | 'members' | 'broadcast' | 'settings'

  // CMS Sub-Tab
  const [cmsSection, setCmsSection] = useState('hero'); // 'hero' | 'intro' | 'activities'
  const [cmsSaveSuccess, setCmsSaveSuccess] = useState(false);

  // Hero CMS Form State
  const [heroForm, setHeroForm] = useState(() => ({
    badge: siteContent.hero?.badge || '',
    titlePart1: siteContent.hero?.titlePart1 || '',
    titleHighlight1: siteContent.hero?.titleHighlight1 || '',
    titlePart2: siteContent.hero?.titlePart2 || '',
    titleHighlight2: siteContent.hero?.titleHighlight2 || '',
    departmentLine: siteContent.hero?.departmentLine || '',
    description: siteContent.hero?.description || '',
    stats: siteContent.hero?.stats ? [...siteContent.hero.stats] : []
  }));

  // Intro CMS Form State
  const [introForm, setIntroForm] = useState(() => ({
    pillBadge: siteContent.intro?.pillBadge || '',
    heading: siteContent.intro?.heading || '',
    subheading: siteContent.intro?.subheading || '',
    overview: siteContent.intro?.overview || '',
    inaugurationSummary: siteContent.intro?.inaugurationSummary || '',
    mission: siteContent.intro?.mission || '',
    vision: siteContent.intro?.vision || ''
  }));

  // Activity Add/Edit Modal State
  const [editingActivity, setEditingActivity] = useState(null);
  const [activityForm, setActivityForm] = useState({
    title: '',
    date: '',
    venue: '',
    category: '',
    tag: '',
    attendees: '',
    summary: '',
    highlights: ''
  });
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);

  // Doubts Filter State
  const [doubtSearch, setDoubtSearch] = useState('');
  const [doubtFilter, setDoubtFilter] = useState('all');
  const [activeDoubtReply, setActiveDoubtReply] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [repliedBy, setRepliedBy] = useState('Keith Fernandes (Faculty Lead)');
  const [isFeaturedFAQ, setIsFeaturedFAQ] = useState(false);

  // Membership Filter State
  const [memberSearch, setMemberSearch] = useState('');
  const [memberFilter, setMemberFilter] = useState('all');

  // Announcement Form State
  const [notifForm, setNotifForm] = useState({
    title: '',
    message: '',
    urgency: 'high',
    audience: 'all'
  });
  const [notifSuccess, setNotifSuccess] = useState(false);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(loginForm.username, loginForm.password);
    if (!success) {
      setLoginError('Invalid credentials. (Hint: username is "admin" & password is "agentblazer2026")');
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin('admin', 'agentblazer2026');
  };

  // Handle Hero Save
  const handleSaveHero = (e) => {
    e.preventDefault();
    updateHeroContent(heroForm);
    setCmsSaveSuccess(true);
    setTimeout(() => setCmsSaveSuccess(false), 2500);
  };

  // Handle Intro Save
  const handleSaveIntro = (e) => {
    e.preventDefault();
    updateIntroContent(introForm);
    setCmsSaveSuccess(true);
    setTimeout(() => setCmsSaveSuccess(false), 2500);
  };

  // Handle Activity Submit
  const handleSaveActivity = (e) => {
    e.preventDefault();
    const highlightsArr = activityForm.highlights
      ? activityForm.highlights.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    if (editingActivity) {
      updateActivity(editingActivity.id, {
        ...activityForm,
        highlights: highlightsArr
      });
      setEditingActivity(null);
    } else {
      addActivity({
        ...activityForm,
        highlights: highlightsArr,
        type: 'upcoming'
      });
      setShowAddActivityModal(false);
    }
    setActivityForm({
      title: '',
      date: '',
      venue: '',
      category: '',
      tag: '',
      attendees: '',
      summary: '',
      highlights: ''
    });
  };

  const handleStartEditActivity = (act) => {
    setEditingActivity(act);
    setActivityForm({
      title: act.title || '',
      date: act.date || '',
      venue: act.venue || '',
      category: act.category || '',
      tag: act.tag || '',
      attendees: act.attendees || '',
      summary: act.summary || '',
      highlights: act.highlights ? act.highlights.join(', ') : ''
    });
  };

  // Handle Doubt Reply
  const handleSendDoubtReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeDoubtReply) return;
    replyToDoubt(activeDoubtReply.id, replyText.trim(), repliedBy, isFeaturedFAQ);
    setActiveDoubtReply(null);
    setReplyText('');
    setIsFeaturedFAQ(false);
  };

  // Handle Announcement Submit
  const handlePostNotification = (e) => {
    e.preventDefault();
    if (!notifForm.title || !notifForm.message) return;
    addNotification({
      title: notifForm.title,
      message: notifForm.message,
      urgency: notifForm.urgency,
      audience: notifForm.audience
    });
    setNotifSuccess(true);
    setNotifForm({ title: '', message: '', urgency: 'high', audience: 'all' });
    setTimeout(() => setNotifSuccess(false), 2500);
  };

  // Filtered Doubts
  const filteredDoubts = doubts.filter(d => {
    const matchSearch = (d.studentName || '').toLowerCase().includes(doubtSearch.toLowerCase()) ||
                        (d.query || '').toLowerCase().includes(doubtSearch.toLowerCase()) ||
                        (d.subject || '').toLowerCase().includes(doubtSearch.toLowerCase()) ||
                        (d.id || '').toLowerCase().includes(doubtSearch.toLowerCase());
    if (doubtFilter === 'pending') return matchSearch && d.status === 'pending';
    if (doubtFilter === 'answered') return matchSearch && d.status === 'answered';
    return matchSearch;
  });

  // Filtered Memberships
  const filteredMemberships = memberships.filter(m => {
    const matchSearch = (m.name || '').toLowerCase().includes(memberSearch.toLowerCase()) ||
                        (m.usn || '').toLowerCase().includes(memberSearch.toLowerCase()) ||
                        (m.email || '').toLowerCase().includes(memberSearch.toLowerCase());
    if (memberFilter !== 'all') return matchSearch && m.status === memberFilter;
    return matchSearch;
  });

  // -------------------------------------------------------------
  // 1. STANDALONE LOGIN SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!adminAuth.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16 animate-fadeIn bg-[#07090e]">
        <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/30 shadow-2xl bg-[#0a0d16] space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/40 p-2 mx-auto flex items-center justify-center shadow-neon-violet">
              <img src={agentblazerLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>

            <h2 className="text-2xl font-display font-bold text-white">
              Admin Portal
            </h2>
            <p className="text-xs font-mono text-purple-300">
              Department of CSE • Management Console
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-purple-200 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-purple-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-300 mb-1.5 font-semibold">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1.5 font-semibold">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter password (agentblazer2026)"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500 focus:outline-none tracking-wider"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99]"
            >
              Sign In to Console
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5 text-center">
            <button
              type="button"
              onClick={() => setPortalView('student')}
              className="text-xs font-mono text-slate-400 hover:text-purple-300 flex items-center justify-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD (Unified Single Purple Theme)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn bg-[#07090e]">
      
      {/* Top Admin Navigation Header */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0d16]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/40 p-1.5 flex items-center justify-center">
            <img src={agentblazerLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-display font-bold text-white">
                AgentBlazer Admin Console
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-950/60 text-purple-300 border border-purple-500/30">
                Live CMS Active
              </span>
            </div>
            <p className="text-xs font-mono text-purple-300/80">
              Logged in as <strong className="text-white">{adminAuth.username || 'admin'}</strong> • Real-time website management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setPortalView('student')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-mono transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </button>
          
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 text-xs font-mono transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Tab Controls — Unified in Primary Purple */}
      <div className="flex items-center gap-2 border-b border-purple-500/20 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('cms')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'cms'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-purple-950/30 hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Edit Website Content</span>
        </button>

        <button
          onClick={() => setActiveTab('doubts')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'doubts'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-purple-950/30 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Student Doubts</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
            {doubts.filter(d => d.status === 'pending').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'members'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-purple-950/30 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Memberships</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
            {memberships.filter(m => m.status === 'pending').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'broadcast'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-purple-950/30 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Announcements</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-purple-950/30 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* TAB 1: WEBSITE EDIT SECTION (CMS) */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'cms' && (
        <div className="space-y-6">
          
          {/* Edit Sub-Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-black/60 p-1 rounded-2xl border border-purple-500/30 text-xs font-mono">
              <button
                onClick={() => setCmsSection('hero')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  cmsSection === 'hero' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Hero Section
              </button>
              <button
                onClick={() => setCmsSection('intro')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  cmsSection === 'intro' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                About & Pillars
              </button>
              <button
                onClick={() => setCmsSection('activities')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  cmsSection === 'activities' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Activities Manager
              </button>
            </div>

            {cmsSaveSuccess && (
              <div className="px-4 py-2 rounded-xl bg-purple-950/70 border border-purple-500/50 text-purple-200 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Changes published live to website!</span>
              </div>
            )}
          </div>

          {/* Sub-Tab 1: HERO SECTION CMS */}
          {cmsSection === 'hero' && (
            <form onSubmit={handleSaveHero} className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-5 bg-[#0a0d16]">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Edit Front Hero Section
                  </h3>
                  <p className="text-xs font-mono text-purple-300/80">
                    Modify the banner, headings, description, and metric counters shown at the top of the site.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Live</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1">Top Pill Badge Text</label>
                  <input
                    type="text"
                    value={heroForm.badge}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Department Sub-line</label>
                  <input
                    type="text"
                    value={heroForm.departmentLine}
                    onChange={(e) => setHeroForm({ ...heroForm, departmentLine: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Title Part 1 (Regular)</label>
                  <input
                    type="text"
                    value={heroForm.titlePart1}
                    onChange={(e) => setHeroForm({ ...heroForm, titlePart1: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Title Highlight 1 (Gradient)</label>
                  <input
                    type="text"
                    value={heroForm.titleHighlight1}
                    onChange={(e) => setHeroForm({ ...heroForm, titleHighlight1: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Title Part 2</label>
                  <input
                    type="text"
                    value={heroForm.titlePart2}
                    onChange={(e) => setHeroForm({ ...heroForm, titlePart2: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Title Highlight 2 (Gradient)</label>
                  <input
                    type="text"
                    value={heroForm.titleHighlight2}
                    onChange={(e) => setHeroForm({ ...heroForm, titleHighlight2: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Hero Main Paragraph Description
                </label>
                <textarea
                  rows={3}
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-sans focus:outline-none focus:border-purple-500 leading-relaxed"
                />
              </div>

              {/* Stats Metrics Editor */}
              <div className="pt-2 border-t border-purple-500/20 space-y-3">
                <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                  Live Metric Cards (4 Highlights)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {heroForm.stats?.map((st, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1.5">
                      <label className="text-[10px] font-mono text-purple-300 font-bold block">
                        Metric {idx + 1}
                      </label>
                      <input
                        type="text"
                        placeholder="Value (e.g. 7+)"
                        value={st.value}
                        onChange={(e) => {
                          const updated = [...heroForm.stats];
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          setHeroForm({ ...heroForm, stats: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs font-bold text-white focus:border-purple-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...heroForm.stats];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setHeroForm({ ...heroForm, stats: updated });
                        }}
                        className="w-full px-2.5 py-1 rounded-lg bg-black/60 border border-white/15 text-[11px] text-slate-300 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* Sub-Tab 2: INTRO & PILLARS CMS */}
          {cmsSection === 'intro' && (
            <form onSubmit={handleSaveIntro} className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-5 bg-[#0a0d16]">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Edit Club Intro, Mission & Vision
                  </h3>
                  <p className="text-xs font-mono text-purple-300/80">
                    Modify the text rendered directly after the Hero page.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Live</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1">Badge</label>
                  <input
                    type="text"
                    value={introForm.pillBadge}
                    onChange={(e) => setIntroForm({ ...introForm, pillBadge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Subheading</label>
                  <input
                    type="text"
                    value={introForm.subheading}
                    onChange={(e) => setIntroForm({ ...introForm, subheading: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Club Overview Text
                </label>
                <textarea
                  rows={3}
                  value={introForm.overview}
                  onChange={(e) => setIntroForm({ ...introForm, overview: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-sans leading-relaxed focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Mission Statement
                  </label>
                  <textarea
                    rows={3}
                    value={introForm.mission}
                    onChange={(e) => setIntroForm({ ...introForm, mission: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-sans leading-relaxed focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Vision Statement
                  </label>
                  <textarea
                    rows={3}
                    value={introForm.vision}
                    onChange={(e) => setIntroForm({ ...introForm, vision: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-sans leading-relaxed focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </form>
          )}

          {/* Sub-Tab 3: ACTIVITIES MANAGER CMS */}
          {cmsSection === 'activities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-display font-bold text-white">
                    Live Activities & Workshops ({siteContent.activities?.length || 0})
                  </h3>
                  <p className="text-xs font-mono text-purple-300/80">
                    Add new workshops or edit/delete existing events.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddActivityModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Event</span>
                </button>
              </div>

              {/* Activity Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {siteContent.activities?.map((act) => (
                  <div 
                    key={act.id} 
                    className="glass-panel p-5 rounded-2xl border border-purple-500/30 flex flex-col justify-between space-y-3 bg-[#0a0d16]"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                        <span className="text-purple-400 font-semibold">{act.date}</span>
                        <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 uppercase text-[10px] text-purple-300">
                          {act.type || 'past'}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-white text-sm mb-1">
                        {act.title}
                      </h4>
                      <p className="text-xs text-slate-300 font-sans line-clamp-2">
                        {act.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between">
                      <button
                        onClick={() => handleStartEditActivity(act)}
                        className="text-xs font-mono text-purple-300 hover:text-white flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete activity "${act.title}"?`)) {
                            deleteActivity(act.id);
                          }
                        }}
                        className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB 2: DOUBTS DESK LEDGER */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'doubts' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search student doubt by text or ID..."
                value={doubtSearch}
                onChange={(e) => setDoubtSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/60 border border-purple-500/30 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => setDoubtFilter('all')}
                className={`px-3 py-1.5 rounded-xl ${doubtFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-purple-950/30 text-purple-300'}`}
              >
                All ({doubts.length})
              </button>
              <button
                onClick={() => setDoubtFilter('pending')}
                className={`px-3 py-1.5 rounded-xl ${doubtFilter === 'pending' ? 'bg-purple-600 text-white' : 'bg-purple-950/30 text-purple-300'}`}
              >
                Pending ({doubts.filter(d => d.status === 'pending').length})
              </button>
              <button
                onClick={() => setDoubtFilter('answered')}
                className={`px-3 py-1.5 rounded-xl ${doubtFilter === 'answered' ? 'bg-purple-600 text-white' : 'bg-purple-950/30 text-purple-300'}`}
              >
                Answered ({doubts.filter(d => d.status === 'answered').length})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredDoubts.map((d) => (
              <div key={d.id} className="glass-panel p-5 rounded-2xl border border-purple-500/30 space-y-3 bg-[#0a0d16]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-xs text-purple-300">
                      {d.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-purple-950/60 text-purple-300 border border-purple-500/30">
                      {d.status}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-slate-400">
                      {d.category}
                    </span>
                    {d.isFeaturedFAQ ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 font-semibold flex items-center gap-1">
                        <BookOpen className="w-2.5 h-2.5" /> Public FAQ
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 text-slate-400 border border-white/10 flex items-center gap-1">
                        <Mail className="w-2.5 h-2.5 text-purple-400" /> Private (Gmail)
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    {d.submittedAt}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                    <span className="text-white font-semibold">{d.studentName || 'Student'}</span>
                    {d.usn && <span>({d.usn})</span>}
                    <span>•</span>
                    <a 
                      href={`mailto:${d.email}`} 
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                      title="Send email directly"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{d.email || 'No email registered'}</span>
                    </a>
                  </div>
                  <h4 className="font-mono font-bold text-white text-xs mb-1">
                    {d.subject || 'Student Query'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {d.query}
                  </p>
                </div>

                {d.adminReply ? (
                  <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-purple-300 font-bold">
                      <span>Replied by: {d.repliedBy || 'Lead Coordinator'}</span>
                      <span>{d.repliedAt}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-sans">
                      {d.adminReply}
                    </p>
                    <div className="pt-2 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => toggleDoubtFeatured(d.id)}
                        className="text-[11px] font-mono text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <BookOpen className="w-3 h-3 text-cyan-400" />
                        <span>{d.isFeaturedFAQ ? "Remove from Public FAQ" : "Promote to Public FAQ"}</span>
                      </button>

                      {d.email && (
                        <a
                          href={`mailto:${d.email}?subject=${encodeURIComponent(`[AgentBlazer Club] Answer to Doubt #${d.id}: ${d.subject || 'Inquiry'}`)}&body=${encodeURIComponent(`Dear Student,\n\nHere is the official resolution to your inquiry:\n"${d.query}"\n\n-----------------------------\nCoordinator Resolution:\n${d.adminReply}\n-----------------------------\n\nBest regards,\nAgentBlazer Club Leadership\nDept. of Computer Science & Engineering\nSt Joseph Engineering College`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Dispatch to Student Gmail</span>
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveDoubtReply(d);
                          setReplyText('');
                          setIsFeaturedFAQ(Boolean(d.isFeaturedFAQ));
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Resolve Doubt</span>
                      </button>

                      <button
                        onClick={() => toggleDoubtFeatured(d.id)}
                        className="px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-mono transition-colors"
                      >
                        {d.isFeaturedFAQ ? "Remove FAQ" : "Mark as FAQ"}
                      </button>
                    </div>

                    <button
                      onClick={() => updateDoubtStatus(d.id, 'answered')}
                      className="text-xs font-mono text-purple-400 hover:text-white"
                    >
                      Mark as Resolved
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB 3: MEMBERSHIP APPLICATIONS */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search applicants by name, USN, or email..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/60 border border-purple-500/30 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => setMemberFilter('all')}
                className={`px-3 py-1.5 rounded-xl ${memberFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-purple-950/30 text-purple-300'}`}
              >
                All ({memberships.length})
              </button>
              <button
                onClick={() => setMemberFilter('pending')}
                className={`px-3 py-1.5 rounded-xl ${memberFilter === 'pending' ? 'bg-purple-600 text-white' : 'bg-purple-950/30 text-purple-300'}`}
              >
                Pending ({memberships.filter(m => m.status === 'pending').length})
              </button>
              <button
                onClick={() => setMemberFilter('approved')}
                className={`px-3 py-1.5 rounded-xl ${memberFilter === 'approved' ? 'bg-purple-600 text-white' : 'bg-purple-950/30 text-purple-300'}`}
              >
                Approved ({memberships.filter(m => m.status === 'approved').length})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredMemberships.map((m) => (
              <div key={m.id} className="glass-panel p-5 rounded-2xl border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0d16]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-white">{m.name}</span>
                    <span className="text-xs font-mono text-purple-300 font-semibold">({m.usn})</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-purple-950/60 text-purple-300 border border-purple-500/30">
                      {m.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {m.dept} • {m.year} • {m.email}
                  </div>
                  <p className="text-xs text-slate-300 italic pt-1">
                    "{m.interests || m.motivation || 'Interested in Autonomous Agents & AI Systems'}"
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {m.status === 'pending' && (
                    <button
                      onClick={() => updateMembershipStatus(m.id, 'approved')}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-1 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  <a
                    href={`mailto:${m.email}?subject=AgentBlazer%20Club%20Induction`}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300"
                  >
                    Email Student
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB 4: BROADCAST ANNOUNCEMENTS */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-4 bg-[#0a0d16]">
            <h3 className="text-base font-display font-bold text-white">
              Broadcast Real-time Announcement
            </h3>
            <p className="text-xs font-mono text-purple-300/80">
              Posts an immediate notification banner that pops up on all visitor screens.
            </p>

            {notifSuccess && (
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Announcement published to live notification feed!</span>
              </div>
            )}

            <form onSubmit={handlePostNotification} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Agentforce Dev Summit 2026 Registrations Open"
                  value={notifForm.title}
                  onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">
                  Notification Message *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details regarding venue, schedule, or prerequisites..."
                  value={notifForm.message}
                  onChange={(e) => setNotifForm({ ...notifForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Urgency Level</label>
                  <select
                    value={notifForm.urgency}
                    onChange={(e) => setNotifForm({ ...notifForm, urgency: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500"
                  >
                    <option value="high">High Priority</option>
                    <option value="normal">Standard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Target Audience</label>
                  <select
                    value={notifForm.audience}
                    onChange={(e) => setNotifForm({ ...notifForm, audience: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500"
                  >
                    <option value="all">All Engineering Students</option>
                    <option value="club">AgentBlazer Members Only</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md"
              >
                Broadcast Announcement
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-3 bg-[#0a0d16]">
            <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
              Active Broadcast Stream ({notifications.length})
            </h4>
            <div className="space-y-2.5 max-h-[400px] overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-purple-300">{n.title}</span>
                    <span className="text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    {n.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB 5: RESET DEFAULTS */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-6 bg-[#0a0d16]">
          <div>
            <h3 className="text-lg font-display font-bold text-white">
              System Settings & Factory Reset
            </h3>
            <p className="text-xs font-mono text-purple-300/80">
              Restore default site content whenever needed.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-white">
              <AlertCircle className="w-4 h-4 text-purple-400" />
              <span>Reset Website Content to Factory Defaults</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              If you want to reset all titles, descriptions, and activities back to the official inaugurated charter, click below.
            </p>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all website content back to factory defaults?")) {
                  resetToDefaultContent();
                  alert("Website content successfully restored to defaults.");
                }
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-sm"
            >
              Reset All Content to Factory Defaults
            </button>
          </div>

          <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>AgentBlazer Platform v2.5</span>
            <span>SJEC CSE Dept</span>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MODAL: REPLY TO STUDENT DOUBT */}
      {/* ----------------------------------------------------------- */}
      {activeDoubtReply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full glass-panel p-6 sm:p-7 rounded-3xl border border-purple-500/40 shadow-2xl bg-[#0a0d16] space-y-4">
            <h3 className="font-display font-bold text-base text-white">
              Resolve Student Inquiry: #{activeDoubtReply.id}
            </h3>
            
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-mono text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between text-purple-300">
                <span>Student: <strong className="text-white">{activeDoubtReply.studentName || 'Student'}</strong></span>
                <span className="flex items-center gap-1 text-cyan-400 font-mono">
                  <Mail className="w-3 h-3" />
                  <span>{activeDoubtReply.email}</span>
                </span>
              </div>
              <strong className="block text-white pt-1">{activeDoubtReply.subject}</strong>
              <p className="font-sans text-slate-300 leading-relaxed">{activeDoubtReply.query}</p>
            </div>

            <form onSubmit={handleSendDoubtReply} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Answering Coordinator Signature</label>
                <select
                  value={repliedBy}
                  onChange={(e) => setRepliedBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500"
                >
                  <option>Keith Fernandes (Faculty Lead)</option>
                  <option>Nisha Roche (Faculty Lead)</option>
                  <option>Ruben Saldanha (President)</option>
                  <option>Stevin Dsouza (Tech Lead)</option>
                  <option>Ajay Preenal Dsouza (Vice President)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Official Resolution *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type clear resolution, steps, or code guidance here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
                />
              </div>

              {/* Public FAQ Board Toggle vs Private Direct Delivery */}
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-white">
                  <input
                    type="checkbox"
                    checked={isFeaturedFAQ}
                    onChange={(e) => setIsFeaturedFAQ(e.target.checked)}
                    className="rounded accent-purple-600 w-4 h-4 cursor-pointer"
                  />
                  <span className="font-semibold">Feature on Public FAQ Board</span>
                </label>
                <span className="text-[10px] text-slate-400">
                  {isFeaturedFAQ ? "Visible on public FAQ tracker" : "Private (sent directly to Gmail)"}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                {activeDoubtReply.email && (
                  <a
                    href={`mailto:${activeDoubtReply.email}?subject=${encodeURIComponent(`[AgentBlazer Club] Answer to Doubt #${activeDoubtReply.id}: ${activeDoubtReply.subject || 'Student Query'}`)}&body=${encodeURIComponent(`Dear Student,\n\nRegarding your doubt:\n"${activeDoubtReply.query}"\n\n-----------------------------\nCoordinator Resolution (${repliedBy}):\n${replyText}\n-----------------------------\n\nBest regards,\nAgentBlazer Club Leadership\nDept. of Computer Science & Engineering\nSt Joseph Engineering College`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Open in Gmail Client</span>
                  </a>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setActiveDoubtReply(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md transition-all"
                  >
                    Save & Resolve
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT ACTIVITY */}
      {/* ----------------------------------------------------------- */}
      {(showAddActivityModal || editingActivity) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-xl w-full glass-panel p-6 sm:p-7 rounded-3xl border border-purple-500/40 shadow-2xl bg-[#0a0d16] space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-display font-bold text-base text-white">
              {editingActivity ? `Edit Activity: ${editingActivity.title}` : "Add New Event / Workshop"}
            </h3>

            <form onSubmit={handleSaveActivity} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Agents Bootcamp 2026"
                  value={activityForm.title}
                  onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Date</label>
                  <input
                    type="text"
                    placeholder="e.g. October 15, 2026"
                    value={activityForm.date}
                    onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. Advanced Computing Lab, SJEC"
                    value={activityForm.venue}
                    onChange={(e) => setActivityForm({ ...activityForm, venue: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Hands-on Workshop"
                    value={activityForm.category}
                    onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Flagship Bootcamp"
                    value={activityForm.tag}
                    onChange={(e) => setActivityForm({ ...activityForm, tag: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Summary Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summary of the event..."
                  value={activityForm.summary}
                  onChange={(e) => setActivityForm({ ...activityForm, summary: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white font-sans focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Key Highlights (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. LangChain, Multi-Agent, Vector Search, Live Deployment"
                  value={activityForm.highlights}
                  onChange={(e) => setActivityForm({ ...activityForm, highlights: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddActivityModal(false);
                    setEditingActivity(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md"
                >
                  {editingActivity ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
