import React, { useState, useEffect } from 'react';
import { useClub } from '../context/ClubContext';
import agentblazerLogo from '../assets/agentblazer-logo.png';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export const IntroSplash = () => {
  const { finishIntro } = useClub();
  const [lettersVisible, setLettersVisible] = useState(0);
  const [birdPosition, setBirdPosition] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const titleWords = ["A", "G", "E", "N", "T", "B", "L", "A", "Z", "E", "R"];

  useEffect(() => {
    // Animate bird moving across
    const birdInterval = setInterval(() => {
      setBirdPosition((prev) => {
        if (prev >= 110) {
          clearInterval(birdInterval);
          return 110;
        }
        return prev + 2.5;
      });
    }, 45);

    // Reveal letters word-by-word / letter-by-letter
    const letterTimers = titleWords.map((_, index) => {
      return setTimeout(() => {
        setLettersVisible((prev) => Math.max(prev, index + 1));
      }, 300 + index * 140);
    });

    // Auto fadeout transition after 2.8s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2800);

    const finishTimer = setTimeout(() => {
      finishIntro();
    }, 3400);

    return () => {
      clearInterval(birdInterval);
      letterTimers.forEach(clearTimeout);
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

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070d] text-white overflow-hidden transition-all duration-700 ${
      isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      
      {/* Background Starfield & Cyber Grid Depth */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30"></div>
      
      {/* Atmospheric Radial Nebulas */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/10 to-cyan-400/20 blur-[130px] pointer-events-none animate-pulse"></div>

      {/* Top Bar with Skip Intro */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-slate-300 hover:text-white transition-all backdrop-blur-md active:scale-95"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Soaring Cyber Bird / Falcon SVG Glide Path */}
      <div 
        className="absolute top-[32%] pointer-events-none transition-all duration-75 ease-out z-30"
        style={{
          left: `${birdPosition}%`,
          transform: `translate(-50%, -50%) rotate(${Math.sin(birdPosition * 0.1) * 8}deg)`
        }}
      >
        <div className="relative">
          {/* Luminous Particle Trail */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-28 h-2 rounded-full bg-gradient-to-r from-transparent via-cyan-400/80 to-purple-400/90 blur-[2px]"></div>
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-16 h-4 rounded-full bg-purple-500/40 blur-md"></div>

          {/* Stylized Soaring Eagle / Falcon Crest SVG */}
          <svg className="w-14 h-14 sm:w-16 sm:h-16 text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.9)]" viewBox="0 0 64 64" fill="currentColor">
            {/* Aerodynamic Soaring Falcon Wings */}
            <path d="M32 6 L35 22 L48 10 L44 26 L58 20 L48 34 L62 38 L42 42 L48 54 L36 46 L32 58 L28 46 L16 54 L22 42 L2 38 L16 34 L6 20 L20 26 L16 10 L29 22 Z" opacity="0.9" />
            <circle cx="32" cy="22" r="3" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* Central Brand Reveal Container */}
      <div className="relative z-10 text-center space-y-6 max-w-4xl px-4">
        
        {/* Emblem floating reveal */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto p-2 rounded-2xl bg-black/60 border border-purple-500/40 shadow-neon-violet flex items-center justify-center animate-bounce-slow">
          <img src={agentblazerLogo} alt="Emblem" className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
        </div>

        {/* Word-by-Word Kinetic Letters Reveal */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap">
          {titleWords.map((letter, idx) => (
            <span
              key={idx}
              className={`font-display font-extrabold text-3xl sm:text-6xl md:text-7xl tracking-wider transition-all duration-500 transform ${
                idx < lettersVisible
                  ? 'opacity-100 translate-y-0 scale-100 text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]'
                  : 'opacity-0 translate-y-8 scale-75'
              }`}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Subtitle Pill and Department Line */}
        <div className={`space-y-2 transition-all duration-700 delay-500 ${lettersVisible >= 8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>COLLEGIATE AUTONOMOUS AI COLLECTIVE</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400">
            Department of Computer Science & Engineering • St Joseph Engineering College
          </p>
        </div>

        {/* Progress Bar Loading Track */}
        <div className="w-64 sm:w-80 h-1 bg-white/10 rounded-full mx-auto overflow-hidden mt-6">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-75"
            style={{ width: `${Math.min(100, (birdPosition / 100) * 100)}%` }}
          ></div>
        </div>

      </div>

    </div>
  );
};
