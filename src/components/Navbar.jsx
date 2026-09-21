import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { Bell, ShieldCheck, Terminal, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';

export const Navbar = ({ onOpenNotifs, onOpenAdminLogin }) => {
  const { theme, toggleTheme, portalView, setPortalView, unreadNotifCount } = useClub();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about-section' },
    { label: 'Events & Workshops', href: '#activities-section' },
    { label: 'Leadership', href: '#members-section' },
    { label: 'Build Blazer', href: '#buildblazer-section' },
    { label: 'Ask Doubt', href: '#ask-doubt-section' },
    { label: 'Join & Connect', href: '#join-connect-section' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (portalView === 'admin') {
      setPortalView('student');
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title (without "Collective") */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 flex items-center justify-center p-1 rounded-xl bg-purple-100 dark:bg-purple-950/50 border border-purple-300/60 dark:border-purple-500/30 group-hover:border-purple-500 transition-all duration-300">
              <img 
                src={agentblazerLogo} 
                alt="AgentBlazer Club Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-wider text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                  AgentBlazer
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30">
                  Club
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 hidden sm:block">
                Dept of Computer Science & Engineering • SJEC
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-black/40 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-medium font-mono text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-cyan-300 hover:bg-white/60 dark:hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Tools: Light/Dark Mode Switch, Notifications, Admin Switch */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Simple Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-mono transition-all"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-purple-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Notifications Button */}
            <button
              onClick={onOpenNotifs}
              className="relative p-2 rounded-xl bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] flex items-center justify-center animate-pulse">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Portal Switcher Button (Student vs Admin) */}
            {portalView === 'admin' ? (
              <button
                onClick={() => setPortalView('student')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 border border-purple-400 dark:border-purple-500/40 text-purple-700 dark:text-purple-200 text-xs font-mono hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-all shadow-sm"
              >
                <Terminal className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-400" />
                <span>Student View</span>
              </button>
            ) : (
              <button
                id="nav-admin-btn"
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-cyan-300 text-xs font-mono transition-all"
                title="Organizer Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span className="hidden sm:inline">Admin Portal</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-2.5 rounded-xl text-sm font-mono text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
            <span className="text-xs text-slate-500 font-mono">Mode: {theme.toUpperCase()}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="text-xs font-mono text-purple-600 dark:text-cyan-400 flex items-center gap-1"
            >
              Organizer Access <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
