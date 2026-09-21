import React, { useState } from 'react';
import { useClub } from '../context/ClubContext';
import { CLUB_META } from '../data/clubData';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { Bell, ShieldCheck, Sparkles, Terminal, Menu, X, ArrowRight, Flame, Snowflake, Zap } from 'lucide-react';

export const Navbar = ({ onOpenNotifs, onOpenAdminLogin }) => {
  const { theme, setTheme, portalView, setPortalView, unreadNotifCount } = useClub();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about-section' },
    { label: 'Leadership', href: '#members-section' },
    { label: 'Events & Workshops', href: '#activities-section' },
    { label: 'Build Blazer', href: '#buildblazer-section' },
    { label: 'Ask Doubt', href: '#ask-doubt-section' },
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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Info */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 flex items-center justify-center p-1 rounded-xl bg-purple-950/40 border border-purple-500/30 group-hover:border-purple-400 group-hover:shadow-neon-violet transition-all duration-300">
              <img 
                src={agentblazerLogo} 
                alt="AgentBlazer Club Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  AgentBlazer
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Collective
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Dept of Computer Science & Engineering • SJEC
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-medium font-mono text-slate-300 hover:text-cyan-300 hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Tools: Themes, Notifications, Admin Portal Switch */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Selector (Violet, Inferno, Frost) */}
            <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setTheme('violet')}
                title="Violet Theme"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  theme === 'violet' 
                    ? 'bg-purple-600/40 text-purple-300 border border-purple-500/50 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden xl:inline text-[11px] font-mono">Violet</span>
              </button>

              <button
                onClick={() => setTheme('inferno')}
                title="Inferno Theme"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  theme === 'inferno' 
                    ? 'bg-amber-600/40 text-amber-300 border border-amber-500/50 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden xl:inline text-[11px] font-mono">Inferno</span>
              </button>

              <button
                onClick={() => setTheme('frost')}
                title="Frost Theme"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  theme === 'frost' 
                    ? 'bg-cyan-600/40 text-cyan-300 border border-cyan-500/50 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden xl:inline text-[11px] font-mono">Frost</span>
              </button>
            </div>

            {/* Notifications Button */}
            <button
              onClick={onOpenNotifs}
              className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/40 border border-purple-500/40 text-purple-200 text-xs font-mono hover:bg-purple-800/40 transition-all shadow-neon-violet"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Student View</span>
              </button>
            ) : (
              <button
                id="nav-admin-btn"
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs font-mono transition-all"
                title="Organizer Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Admin Portal</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-black/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-2.5 rounded-xl text-sm font-mono text-slate-200 hover:bg-white/10 hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-mono">Current Theme: {theme.toUpperCase()}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="text-xs font-mono text-cyan-400 flex items-center gap-1"
            >
              Organizer Access <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
