import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { 
  ShieldCheck, Lock, LogOut, ArrowLeft, Globe, MessageSquare, 
  Users, Bell, Settings, Plus, Trash2, Edit3, CheckCircle2, 
  Clock, AlertCircle, Sparkles, RefreshCw, Save, ChevronRight,
  ExternalLink, Search, Filter, Shield, Eye
} from 'lucide-react';

export const AdminPortal = () => {
  const { 
    adminAuth, loginAdmin, logoutAdmin,
    siteContent, updateHeroContent, updateIntroContent,
    updateActivity, addActivity, deleteActivity,
    updateFaculty, updateStudentLead, addStudentLead, deleteStudentLead, resetToDefaultContent,
    doubts, replyToDoubt, updateDoubtStatus,
    memberships, updateMembershipStatus,
    notifications, addNotification,
    setPortalView
  } = useClub();

  // Login Form Local State
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: '' });
  const [loginError, setLoginError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState('cms'); // 'cms' | 'doubts' | 'members' | 'broadcast' | 'settings'

  // CMS Sub-Tab
  const [cmsSection, setCmsSection] = useState('hero'); // 'hero' | 'intro' | 'activities' | 'leadership'
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
    replyToDoubt(activeDoubtReply.id, replyText.trim(), repliedBy);
    setActiveDoubtReply(null);
    setReplyText('');
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
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 animate-fadeIn">
        <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/40 shadow-2xl bg-white dark:bg-black/90 space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-400 dark:border-purple-500/40 p-2 mx-auto flex items-center justify-center shadow-neon-violet">
              <img src={agentblazerLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>

            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
              Admin Portal
            </h2>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Department of CSE • AgentBlazer Management Console
            </p>

            {/* Direct Separate Link Banner */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 text-[11px] font-mono text-purple-700 dark:text-purple-300">
              <div className="flex items-center gap-1.5 truncate">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                <span>Direct Link: <strong className="text-slate-900 dark:text-white">/admin</strong></span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/admin`);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold transition-all shadow-sm flex-shrink-0"
              >
                {copiedLink ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter password (agentblazer2026)"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none tracking-wider"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99]"
            >
              Sign In to Console
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2.5 text-center">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>One-Click Quick Admin Access (Demo)</span>
            </button>

            <button
              type="button"
              onClick={() => setPortalView('student')}
              className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 flex items-center justify-center gap-1 mt-1 transition-colors"
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
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Admin Navigation Header */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/90 dark:bg-black/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-400 dark:border-purple-500/40 p-1.5 flex items-center justify-center">
            <img src={agentblazerLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                AgentBlazer Admin Console
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                Live CMS Active
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Logged in as <strong className="text-purple-600 dark:text-purple-400">{adminAuth.username || 'admin'}</strong> • Real-time website management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/admin`);
              setCopiedLink(true);
              setTimeout(() => setCopiedLink(false), 2000);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-100 dark:bg-purple-950/50 hover:bg-purple-200 dark:hover:bg-purple-900/60 border border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 text-xs font-mono transition-all"
            title="Direct URL: /admin"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
            <span>{copiedLink ? "Copied /admin!" : "Copy Admin Link"}</span>
          </button>

          <button
            onClick={() => setPortalView('student')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-mono transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </button>
          
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs font-mono transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Tab Controls */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('cms')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'cms'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Website Live CMS</span>
        </button>

        <button
          onClick={() => setActiveTab('doubts')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'doubts'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Student Doubts Ledger</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
            {doubts.filter(d => d.status === 'pending').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'members'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Membership Applications</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
            {memberships.filter(m => m.status === 'pending').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-mono font-semibold transition-all ${
            activeTab === 'broadcast'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
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
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>System & Reset</span>
        </button>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* TAB 1: WEBSITE LIVE CMS */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'cms' && (
        <div className="space-y-6">
          
          {/* CMS Sub-Tabs & Notification Feedback */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-slate-200/80 dark:bg-black/60 p-1 rounded-2xl border border-slate-300 dark:border-white/10 text-xs font-mono">
              <button
                onClick={() => setCmsSection('hero')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  cmsSection === 'hero' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Hero Section
              </button>
              <button
                onClick={() => setCmsSection('intro')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  cmsSection === 'intro' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                About & Pillars
              </button>
              <button
                onClick={() => setCmsSection('activities')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  cmsSection === 'activities' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Activities Manager
              </button>
            </div>

            {cmsSaveSuccess && (
              <div className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400 text-emerald-700 dark:text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Changes published live to website!</span>
              </div>
            )}
          </div>

          {/* Sub-Tab 1: HERO SECTION CMS */}
          {cmsSection === 'hero' && (
            <form onSubmit={handleSaveHero} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-5 bg-white/80 dark:bg-black/70">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                    Edit Front Hero Section
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Modify the banner, headings, description, and metric counters shown at the top of the site.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Live</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Top Pill Badge Text</label>
                  <input
                    type="text"
                    value={heroForm.badge}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Department Sub-line</label>
                  <input
                    type="text"
                    value={heroForm.departmentLine}
                    onChange={(e) => setHeroForm({ ...heroForm, departmentLine: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Title Part 1 (Regular)</label>
                  <input
                    type="text"
                    value={heroForm.titlePart1}
                    onChange={(e) => setHeroForm({ ...heroForm, titlePart1: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Title Highlight 1 (Gradient)</label>
                  <input
                    type="text"
                    value={heroForm.titleHighlight1}
                    onChange={(e) => setHeroForm({ ...heroForm, titleHighlight1: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Title Part 2</label>
                  <input
                    type="text"
                    value={heroForm.titlePart2}
                    onChange={(e) => setHeroForm({ ...heroForm, titlePart2: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Title Highlight 2 (Gradient)</label>
                  <input
                    type="text"
                    value={heroForm.titleHighlight2}
                    onChange={(e) => setHeroForm({ ...heroForm, titleHighlight2: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                  Hero Main Paragraph Description
                </label>
                <textarea
                  rows={3}
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-sans focus:outline-none focus:border-purple-500 leading-relaxed"
                />
              </div>

              {/* Stats Metrics Editor */}
              <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Live Metric Cards (4 Highlights)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {heroForm.stats?.map((st, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1.5">
                      <label className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold block">
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
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-black/60 border border-slate-300 dark:border-white/15 text-xs font-bold text-slate-900 dark:text-white"
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
                        className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-black/60 border border-slate-300 dark:border-white/15 text-[11px] text-slate-700 dark:text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* Sub-Tab 2: INTRO & PILLARS CMS */}
          {cmsSection === 'intro' && (
            <form onSubmit={handleSaveIntro} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-5 bg-white/80 dark:bg-black/70">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                    Edit Club Intro, Mission & Vision
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Modify the text rendered directly after the Hero page.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Live</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Badge</label>
                  <input
                    type="text"
                    value={introForm.pillBadge}
                    onChange={(e) => setIntroForm({ ...introForm, pillBadge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Subheading</label>
                  <input
                    type="text"
                    value={introForm.subheading}
                    onChange={(e) => setIntroForm({ ...introForm, subheading: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                  Club Overview Text
                </label>
                <textarea
                  rows={3}
                  value={introForm.overview}
                  onChange={(e) => setIntroForm({ ...introForm, overview: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-sans leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    Mission Statement
                  </label>
                  <textarea
                    rows={3}
                    value={introForm.mission}
                    onChange={(e) => setIntroForm({ ...introForm, mission: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-sans leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1">
                    Vision Statement
                  </label>
                  <textarea
                    rows={3}
                    value={introForm.vision}
                    onChange={(e) => setIntroForm({ ...introForm, vision: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-sans leading-relaxed"
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
                  <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">
                    Live Activities & Workshops ({siteContent.activities?.length || 0})
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Add new workshops or edit/delete existing events.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddActivityModal(true)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md"
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
                    className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-3 bg-white/90 dark:bg-black/80"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">{act.date}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 uppercase text-[10px]">
                          {act.type || 'past'}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm mb-1">
                        {act.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-sans line-clamp-2">
                        {act.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => handleStartEditActivity(act)}
                        className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
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
                        className="text-xs font-mono text-rose-500 hover:underline flex items-center gap-1"
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
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search student doubt by text or ID..."
                value={doubtSearch}
                onChange={(e) => setDoubtSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => setDoubtFilter('all')}
                className={`px-3 py-1.5 rounded-xl ${doubtFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400'}`}
              >
                All ({doubts.length})
              </button>
              <button
                onClick={() => setDoubtFilter('pending')}
                className={`px-3 py-1.5 rounded-xl ${doubtFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-white/5 text-slate-400'}`}
              >
                Pending ({doubts.filter(d => d.status === 'pending').length})
              </button>
              <button
                onClick={() => setDoubtFilter('answered')}
                className={`px-3 py-1.5 rounded-xl ${doubtFilter === 'answered' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-400'}`}
              >
                Answered ({doubts.filter(d => d.status === 'answered').length})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredDoubts.map((d) => (
              <div key={d.id} className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3 bg-white/90 dark:bg-black/70">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-purple-600 dark:text-cyan-400">
                      {d.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                      d.status === 'answered' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-400/30 animate-pulse'
                    }`}>
                      {d.status}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500">
                      {d.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    {d.submittedAt}
                  </span>
                </div>

                <div>
                  <h4 className="font-mono font-bold text-slate-900 dark:text-white text-xs mb-1">
                    {d.subject || 'Student Query'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {d.query}
                  </p>
                </div>

                {d.adminReply ? (
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-purple-700 dark:text-purple-300 font-bold">
                      <span>Replied by: {d.repliedBy || 'Lead Coordinator'}</span>
                      <span>{d.repliedAt}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-sans">
                      {d.adminReply}
                    </p>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setActiveDoubtReply(d);
                        setReplyText('');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Write Public Answer</span>
                    </button>

                    <button
                      onClick={() => updateDoubtStatus(d.id, 'answered')}
                      className="text-xs font-mono text-slate-500 hover:text-emerald-500"
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
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search applicants by name, USN, or email..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-mono focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => setMemberFilter('all')}
                className={`px-3 py-1.5 rounded-xl ${memberFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400'}`}
              >
                All ({memberships.length})
              </button>
              <button
                onClick={() => setMemberFilter('pending')}
                className={`px-3 py-1.5 rounded-xl ${memberFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-white/5 text-slate-400'}`}
              >
                Pending ({memberships.filter(m => m.status === 'pending').length})
              </button>
              <button
                onClick={() => setMemberFilter('approved')}
                className={`px-3 py-1.5 rounded-xl ${memberFilter === 'approved' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-400'}`}
              >
                Approved ({memberships.filter(m => m.status === 'approved').length})
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredMemberships.map((m) => (
              <div key={m.id} className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 dark:bg-black/70">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-slate-900 dark:text-white">{m.name}</span>
                    <span className="text-xs font-mono text-purple-600 dark:text-cyan-400 font-semibold">({m.usn})</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                      m.status === 'approved' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    {m.dept} • {m.year} • {m.email}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-1">
                    "{m.interests || m.motivation || 'Interested in Autonomous Agents & AI Systems'}"
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {m.status === 'pending' && (
                    <button
                      onClick={() => updateMembershipStatus(m.id, 'approved')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1 shadow-sm"
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
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 bg-white/90 dark:bg-black/70">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">
              Broadcast Real-time Announcement
            </h3>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Posts an immediate notification banner that pops up on all visitor screens.
            </p>

            {notifSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400 text-emerald-700 dark:text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Announcement published to live notification feed!</span>
              </div>
            )}

            <form onSubmit={handlePostNotification} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Agentforce Dev Summit 2026 Registrations Open"
                  value={notifForm.title}
                  onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  Notification Message *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details regarding venue, schedule, or prerequisites..."
                  value={notifForm.message}
                  onChange={(e) => setNotifForm({ ...notifForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Urgency Level</label>
                  <select
                    value={notifForm.urgency}
                    onChange={(e) => setNotifForm({ ...notifForm, urgency: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                  >
                    <option value="high">High (Red Pulse)</option>
                    <option value="normal">Normal (Purple)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Target Audience</label>
                  <select
                    value={notifForm.audience}
                    onChange={(e) => setNotifForm({ ...notifForm, audience: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                  >
                    <option value="all">All Engineering Students</option>
                    <option value="club">AgentBlazer Members Only</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold transition-all shadow-md"
              >
                Broadcast Announcement
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 bg-white/90 dark:bg-black/70">
            <h4 className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Active Broadcast Stream ({notifications.length})
            </h4>
            <div className="space-y-2.5 max-h-[400px] overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-purple-600 dark:text-purple-400">{n.title}</span>
                    <span className="text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                    {n.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB 5: SETTINGS & DATABASE RESET */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 bg-white/90 dark:bg-black/70">
          <div>
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
              System Settings & Data Recovery
            </h3>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Manage database backups and reset site content to official defaults.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/40 text-xs font-mono text-amber-800 dark:text-amber-300 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>Reset to Official Defaults</span>
            </div>
            <p>
              If you ever make accidental edits or want to reload the official inaugurational charter and activities, you can reset the live CMS content with one click.
            </p>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all website content back to factory defaults?")) {
                  resetToDefaultContent();
                  alert("Website content successfully restored to defaults.");
                }
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all shadow-sm"
            >
              Reset All Content to Factory Defaults
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>AgentBlazer Platform v2.5 Enterprise</span>
            <span>SJEC CSE Dept</span>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MODAL: REPLY TO STUDENT DOUBT */}
      {/* ----------------------------------------------------------- */}
      {activeDoubtReply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-lg w-full glass-panel p-6 rounded-3xl border border-cyan-500/40 shadow-2xl bg-white dark:bg-black/95 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Answer Student Ticket: {activeDoubtReply.id}
            </h3>
            
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 text-xs font-mono text-slate-600 dark:text-slate-300">
              <strong className="block text-slate-900 dark:text-white mb-1">{activeDoubtReply.subject}</strong>
              <p className="font-sans">{activeDoubtReply.query}</p>
            </div>

            <form onSubmit={handleSendDoubtReply} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Answering Coordinator Signature</label>
                <select
                  value={repliedBy}
                  onChange={(e) => setRepliedBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                >
                  <option>Keith Fernandes (Faculty Lead)</option>
                  <option>Nisha Roche (Faculty Lead)</option>
                  <option>Ruben Saldanha (President)</option>
                  <option>Stevin Dsouza (Tech Lead)</option>
                  <option>Ajay Preenal Dsouza (Vice President)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Official Response *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type clear resolution or guidance here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveDoubtReply(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold"
                >
                  Send & Publish Answer
                </button>
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
          <div className="relative max-w-xl w-full glass-panel p-6 sm:p-7 rounded-3xl border border-cyan-500/40 shadow-2xl bg-white dark:bg-black/95 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              {editingActivity ? `Edit Activity: ${editingActivity.title}` : "Add New Event / Workshop"}
            </h3>

            <form onSubmit={handleSaveActivity} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Agents Bootcamp 2026"
                  value={activityForm.title}
                  onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="text"
                    placeholder="e.g. October 15, 2026"
                    value={activityForm.date}
                    onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. Advanced Computing Lab, SJEC"
                    value={activityForm.venue}
                    onChange={(e) => setActivityForm({ ...activityForm, venue: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Hands-on Workshop"
                    value={activityForm.category}
                    onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Flagship Bootcamp"
                    value={activityForm.tag}
                    onChange={(e) => setActivityForm({ ...activityForm, tag: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Summary Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summary of the event..."
                  value={activityForm.summary}
                  onChange={(e) => setActivityForm({ ...activityForm, summary: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Key Highlights (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. LangChain, Multi-Agent, Vector Search, Live Deployment"
                  value={activityForm.highlights}
                  onChange={(e) => setActivityForm({ ...activityForm, highlights: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddActivityModal(false);
                    setEditingActivity(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold shadow-md"
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
