import React, { useState, useEffect } from 'react';
import { useClub } from '../context/ClubContext';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { Sparkles } from 'lucide-react';

export const IntroSplash = () => {
  const { finishIntro } = useClub();
  const [lettersVisible, setLettersVisible] = useState(0);
  const [birdPosition, setBirdPosition] = useState(-8);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const titleLetters = ["A", "G", "E", "N", "T", "B", "L", "A", "Z", "E", "R"];

  useEffect(() => {
    // Clean flight of the falcon gliding across overhead
    const flightInterval = setInterval(() => {
      setBirdPosition((prev) => {
        if (prev >= 115) {
          clearInterval(flightInterval);
          return 115;
        }
        return prev + 2.5;
      });
    }, 35);

    // Letter-by-letter reveal synchronized with the falcon
    const letterTimers = titleLetters.map((_, index) => {
      return setTimeout(() => {
        setLettersVisible((prev) => Math.max(prev, index + 1));
      }, 250 + index * 120);
    });

    // Auto transition to live website after 2.3s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2300);

    const finishTimer = setTimeout(() => {
      finishIntro();
    }, 2800);

    return () => {
      clearInterval(flightInterval);
      letterTimers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04060b] text-white overflow-hidden transition-all duration-600 ${
      isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      
      {/* Background Starfield & Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30"></div>
      
      {/* Deep Atmospheric Nebulas */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-purple-700/20 via-pink-600/10 to-cyan-400/20 blur-[130px] pointer-events-none animate-pulse"></div>

      {/* ------------------------------------------------------------- */}
      {/* SOARING FALCON GLIDING CLEANLY ACROSS OVERHEAD */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="absolute top-[28%] pointer-events-none transition-all duration-75 ease-out z-30"
        style={{
          left: `${birdPosition}%`,
          transform: `translate(-50%, -50%) rotate(${Math.sin(birdPosition * 0.08) * 6}deg)`
        }}
      >
        <div className="relative">
          {/* Aerodynamic Falcon Crest SVG (Clean, no light trail streak) */}
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]" viewBox="0 0 64 64" fill="currentColor">
            <path d="M32 6 L35 22 L48 10 L44 26 L58 20 L48 34 L62 38 L42 42 L48 54 L36 46 L32 58 L28 46 L16 54 L22 42 L2 38 L16 34 L6 20 L20 26 L16 10 L29 22 Z" opacity="0.95" />
            <circle cx="32" cy="22" r="3" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CENTRAL BRAND REVEAL CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 text-center space-y-6 max-w-4xl px-4">
        
        {/* Emblem floating reveal */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto p-2 rounded-2xl bg-black/60 border border-purple-500/40 shadow-neon-violet flex items-center justify-center animate-bounce-slow">
          <img 
            src={agentblazerLogo} 
            alt="Emblem" 
            className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(168,85,247,0.8)]" 
          />
        </div>

        {/* Word-by-Word Kinetic Letters Reveal: A G E N T B L A Z E R */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap">
          {titleLetters.map((letter, idx) => (
            <span
              key={idx}
              className={`font-display font-extrabold text-3xl sm:text-6xl md:text-7xl tracking-wider transition-all duration-400 transform ${
                idx < lettersVisible
                  ? 'opacity-100 translate-y-0 scale-100 text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]'
                  : 'opacity-0 translate-y-6 scale-80'
              }`}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Subtitle Pill and Department Line */}
        <div className={`space-y-2 transition-all duration-700 delay-200 ${lettersVisible >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>PIONEERING AUTONOMOUS & AGENTIC AI</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400">
            Department of Computer Science & Engineering • St Joseph Engineering College
          </p>
        </div>

        {/* Progress Bar Loading Track */}
        <div className="w-64 sm:w-80 h-1.5 bg-white/10 rounded-full mx-auto overflow-hidden mt-6">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-75"
            style={{ width: `${Math.min(100, Math.max(0, (birdPosition / 100) * 100))}%` }}
          ></div>
        </div>

      </div>

    </div>
  );
};
