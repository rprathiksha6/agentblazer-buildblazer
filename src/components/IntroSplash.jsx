import React, { useState, useEffect } from 'react';
import { useClub } from '../context/ClubContext';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { Sparkles, ArrowRight, Zap, Play } from 'lucide-react';

export const IntroSplash = () => {
  const { finishIntro } = useClub();
  
  // Animation Phase: 
  // 1 = Bird dragging "AGENT"
  // 2 = "AGENT" locked, Bird dragging "BLAZER"
  // 3 = "AGENTBLAZER" fully locked & Bird soaring to sky
  const [phase, setPhase] = useState(1);
  const [birdProgress, setBirdProgress] = useState(0); // 0 to 100% within each phase
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Phase 1: Bird enters from left dragging "AGENT" (0ms - 1400ms)
    const birdPhase1 = setInterval(() => {
      setBirdProgress((prev) => {
        if (prev >= 100) {
          clearInterval(birdPhase1);
          return 100;
        }
        return prev + 3.2;
      });
    }, 40);

    const timerPhase2 = setTimeout(() => {
      setPhase(2);
      setBirdProgress(0);

      // Phase 2: Bird enters again dragging "BLAZER" (1400ms - 2800ms)
      const birdPhase2 = setInterval(() => {
        setBirdProgress((prev) => {
          if (prev >= 100) {
            clearInterval(birdPhase2);
            return 100;
          }
          return prev + 3.2;
        });
      }, 40);
    }, 1400);

    // Phase 3: Both words locked, Bird soars upward (2800ms)
    const timerPhase3 = setTimeout(() => {
      setPhase(3);
    }, 2800);

    // Fade out and enter site (3600ms)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3600);

    const finishTimer = setTimeout(() => {
      finishIntro();
    }, 4200);

    return () => {
      clearInterval(birdPhase1);
      clearTimeout(timerPhase2);
      clearTimeout(timerPhase3);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      finishIntro();
    }, 300);
  };

  // Compute bird coordinates based on current phase and progress
  // Phase 1: starts at -15% left, flies to 48% left (dragging AGENT)
  // Phase 2: starts at -15% left, flies to 78% left (dragging BLAZER)
  // Phase 3: soars from center upwards into the stars
  let birdLeftPercent = 0;
  let birdTopPercent = 48;
  let birdAngle = 4;

  if (phase === 1) {
    birdLeftPercent = -10 + (birdProgress / 100) * 58; // from -10% to 48%
    birdTopPercent = 46 + Math.sin(birdProgress * 0.1) * 3;
    birdAngle = 6 - (birdProgress / 100) * 4;
  } else if (phase === 2) {
    birdLeftPercent = -10 + (birdProgress / 100) * 88; // from -10% to 78%
    birdTopPercent = 46 + Math.sin(birdProgress * 0.1) * 3;
    birdAngle = 6 - (birdProgress / 100) * 4;
  } else {
    birdLeftPercent = 50;
    birdTopPercent = 18;
    birdAngle = -15; // climbing up
  }

  // Position of the dragged word behind the bird (tethered by ~18% offset)
  const tetherLength = 16;
  const draggedLeftPercent = Math.max(0, birdLeftPercent - tetherLength);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04060c] text-white overflow-hidden transition-all duration-700 ${
      isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      
      {/* Inline styles for realistic flapping wings and pulsing laser tow-cable */}
      <style>{`
        @keyframes flapWingTop {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-30deg) translateY(-5px); }
        }
        @keyframes flapWingBottom {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(26deg) translateY(4px); }
        }
        @keyframes cableFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -30; }
        }
        @keyframes windParticle {
          0% { opacity: 0.9; transform: translateX(0) scale(1); }
          100% { opacity: 0; transform: translateX(-90px) scale(0.3); }
        }
        .animate-wing-top {
          animation: flapWingTop 0.28s ease-in-out infinite;
          transform-origin: 32px 28px;
        }
        .animate-wing-bottom {
          animation: flapWingBottom 0.28s ease-in-out infinite;
          transform-origin: 32px 34px;
        }
        .animate-cable {
          animation: cableFlow 0.6s linear infinite;
        }
      `}</style>

      {/* Cyber Space Starfield Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-35"></div>
      
      {/* Atmospheric Luminous Nebulas */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-purple-700/20 via-cyan-500/15 to-pink-500/10 blur-[140px] pointer-events-none animate-pulse"></div>

      {/* Top Controls: Status pill & Skip button */}
      <div className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>
            {phase === 1 && "Falcon Dragging Step 1: [AGENT]"}
            {phase === 2 && "Falcon Dragging Step 2: [BLAZER]"}
            {phase === 3 && "AgentBlazer Club Unified • Launching"}
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-slate-200 hover:text-white transition-all backdrop-blur-md active:scale-95 shadow-md"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ACTIVE FLIGHT SCENE: THE FLAPPING BIRD & GLOWING TETHER */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-30">
        
        {/* Dynamic Glowing Energy Tow-Line (Cable connecting Bird to dragged Word) */}
        {phase < 3 && birdLeftPercent > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="towLaser" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
              </linearGradient>
              <filter id="laserGlow">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Tow Beam */}
            <line
              x1={`${draggedLeftPercent + 8}%`}
              y1={`${birdTopPercent + 2}%`}
              x2={`${birdLeftPercent - 2}%`}
              y2={`${birdTopPercent}%`}
              stroke="url(#towLaser)"
              strokeWidth="4"
              strokeDasharray="8 4"
              filter="url(#laserGlow)"
              className="animate-cable"
            />
            {/* Core bright spark line */}
            <line
              x1={`${draggedLeftPercent + 8}%`}
              y1={`${birdTopPercent + 2}%`}
              x2={`${birdLeftPercent - 2}%`}
              y2={`${birdTopPercent}%`}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </svg>
        )}

        {/* The Flapping Bird (Falcon / Eagle Crest) */}
        <div
          className="absolute transition-all duration-75 ease-out"
          style={{
            left: `${birdLeftPercent}%`,
            top: `${birdTopPercent}%`,
            transform: `translate(-50%, -50%) rotate(${birdAngle}deg) ${phase === 3 ? 'scale(1.2)' : 'scale(1)'}`
          }}
        >
          <div className="relative">
            {/* Luminous Propulsion Jet & Energy Aura */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-20 h-3 rounded-full bg-gradient-to-r from-transparent via-cyan-400/80 to-purple-500/90 blur-[3px]"></div>
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-12 h-6 rounded-full bg-purple-500/40 blur-lg"></div>

            {/* Flapping Falcon SVG (Aerodynamic wings with flapping animation) */}
            <svg 
              className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-300 drop-shadow-[0_0_16px_rgba(6,182,212,0.95)]" 
              viewBox="0 0 80 60" 
              fill="currentColor"
            >
              {/* Upper Wing (Flaps up/down) */}
              <g className="animate-wing-top">
                <path d="M30 24 L52 4 L44 18 L64 10 L50 24 L68 22 L46 30 Z" fill="#38bdf8" />
                <path d="M34 22 L50 8 L44 20 L58 14 L48 24 Z" fill="#e0f2fe" opacity="0.8" />
              </g>

              {/* Bird Aerodynamic Fuselage & Head */}
              <path 
                d="M16 32 C22 28, 38 28, 52 30 C56 31, 64 30, 68 28 C64 33, 58 35, 50 36 C38 38, 26 38, 16 34 Z" 
                fill="#0284c7" 
              />
              {/* Sharp Beak with Golden Amber Spark */}
              <path d="M68 28 L76 30 L67 33 Z" fill="#fbbf24" />
              <circle cx="62" cy="29" r="2" fill="#ffffff" />

              {/* Lower Wing / Underwing */}
              <g className="animate-wing-bottom">
                <path d="M28 34 L48 48 L40 38 L58 46 L46 36 L62 40 L42 34 Z" fill="#0369a1" />
              </g>

              {/* Talons with Tow-Harness Ring */}
              <circle cx="36" cy="38" r="3.5" fill="#f43f5e" className="animate-ping" opacity="0.8" />
              <circle cx="36" cy="38" r="2.5" fill="#fb7185" />
            </svg>

            {/* Kinetic Sparks flying off the bird */}
            <div className="absolute -left-6 top-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping"></div>
            <div className="absolute -left-12 top-1/3 w-1 h-1 rounded-full bg-purple-300 animate-ping delay-100"></div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DRAGGED WORD FLYING IN TOW BEHIND THE BIRD */}
        {/* ------------------------------------------------------------- */}
        
        {/* Step 1: Word "AGENT" being dragged across */}
        {phase === 1 && (
          <div
            className="absolute transition-all duration-75 ease-out"
            style={{
              left: `${draggedLeftPercent}%`,
              top: `${birdTopPercent + 3}%`,
              transform: `translate(-50%, -50%) rotate(-4deg)`
            }}
          >
            <div className="relative px-4 py-2 rounded-2xl bg-black/60 border border-purple-500/60 shadow-neon-violet backdrop-blur-md flex items-center gap-1.5">
              <span className="font-display font-extrabold text-2xl sm:text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-300 drop-shadow-[0_0_15px_rgba(192,132,252,0.9)]">
                AGENT
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </div>
          </div>
        )}

        {/* Step 2: Word "BLAZER" being dragged across */}
        {phase === 2 && (
          <div
            className="absolute transition-all duration-75 ease-out"
            style={{
              left: `${draggedLeftPercent}%`,
              top: `${birdTopPercent + 3}%`,
              transform: `translate(-50%, -50%) rotate(-4deg)`
            }}
          >
            <div className="relative px-4 py-2 rounded-2xl bg-black/60 border border-cyan-400/70 shadow-neon-cyan backdrop-blur-md flex items-center gap-1.5">
              <span className="font-display font-extrabold text-2xl sm:text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-200 to-purple-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]">
                BLAZER
              </span>
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            </div>
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* FINAL LANDING BOARD: WORDS LOCKING INTO POSITION */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 text-center space-y-6 max-w-4xl px-4 mt-8">
        
        {/* Emblem floating reveal */}
        <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto p-2 rounded-2xl bg-black/70 border border-purple-500/50 shadow-neon-violet flex items-center justify-center transition-all duration-700 ${
          phase === 3 ? 'scale-110 ring-4 ring-cyan-400/40' : 'scale-95 opacity-80'
        }`}>
          <img 
            src={agentblazerLogo} 
            alt="Emblem" 
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.9)]" 
          />
        </div>

        {/* Assembled Two-Word Lock-in Arena */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
          
          {/* WORD 1: "AGENT" */}
          <div className={`transition-all duration-500 transform ${
            phase >= 2 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-25 translate-y-4 scale-95 border-dashed border border-white/20 px-6 py-2 rounded-2xl'
          }`}>
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-200 to-purple-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]">
              AGENT
            </span>
          </div>

          {/* WORD 2: "BLAZER" */}
          <div className={`transition-all duration-500 transform ${
            phase >= 3 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-25 translate-y-4 scale-95 border-dashed border border-white/20 px-6 py-2 rounded-2xl'
          }`}>
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.8)]">
              BLAZER
            </span>
          </div>

        </div>

        {/* Department & Collegiate Charter Subtitle */}
        <div className={`space-y-2 transition-all duration-700 ${
          phase === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 font-mono text-xs shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING • SJEC</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400">
            Autonomous Agents & AI Systems Laboratory
          </p>
        </div>

        {/* Kinetic Step Progress Bar */}
        <div className="w-64 sm:w-80 h-1.5 bg-white/10 rounded-full mx-auto overflow-hidden mt-6 relative">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-100"
            style={{ 
              width: `${phase === 1 ? (birdProgress * 0.45) : phase === 2 ? (45 + birdProgress * 0.45) : 100}%` 
            }}
          ></div>
        </div>

      </div>

    </div>
  );
};
