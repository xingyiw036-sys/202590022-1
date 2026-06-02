/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { gameStartBgImg } from "../data";
import { Language, TRANSLATIONS } from "../translations";
import { Play, Languages } from "lucide-react";

interface GameIntroProps {
  onStartGame: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function GameIntro({ onStartGame, lang, onLanguageChange }: GameIntroProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div 
      className="fixed inset-0 w-full h-full z-45 bg-slate-950 font-sans select-none overflow-hidden flex flex-col justify-between" 
      id="cinematic-game-intro-viewport"
    >
      {/* 1. Immersive Full-Bleed Watercolor Background Image with Soft Blur Intro */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src={gameStartBgImg} 
          alt="School Gateway Start Background" 
          className="w-full h-full object-cover brightness-[0.82] saturate-[1.08] contrast-[1.02]"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant gradient vignettes representing twilight sunrise/sunset shadows */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-slate-950/60 via-transparent to-transparent" />
      </div>

      {/* 2. Top-Right Minimal Cinematic Language Selection Capsule Toggle */}
      <div 
        className="absolute top-6 right-6 z-50 flex items-center gap-1 bg-black/35 backdrop-blur-md border border-white/15 p-1 rounded-full shadow-xl"
        id="intro-lang-capsule"
      >
        <span className="p-1 px-1.5 text-white/50" title="Switch Language">
          <Languages className="w-3.5 h-3.5" />
        </span>
        <button
          onClick={() => onLanguageChange("zh")}
          className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold transition-all duration-200 cursor-pointer ${
            lang === "zh"
              ? "bg-white text-rose-600 shadow-md font-black scale-102"
              : "text-white/70 hover:text-white"
          }`}
        >
          🇨🇳 中文
        </button>
        <button
          onClick={() => onLanguageChange("ko")}
          className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold transition-all duration-200 cursor-pointer ${
            lang === "ko"
              ? "bg-white text-rose-600 shadow-md font-black scale-102"
              : "text-white/70 hover:text-white"
          }`}
        >
          🇰🇷 한국어
        </button>
      </div>

      {/* 3. Pure Cinematic Falling Sakura Petals Simulation */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(12)].map((_, index) => {
          const delay = index * 1.5;
          const startX = 10 + (index * 9.5) % 80; // Spread across screen width
          return (
            <motion.div
              key={`petal-${index}`}
              initial={{ 
                y: -50, 
                x: `${startX}vw`, 
                rotate: 0, 
                opacity: 0,
                scale: 0.6 + (index % 5) * 0.1
              }}
              animate={{ 
                y: "105vh", 
                x: `${startX + (index % 2 === 0 ? 15 : -15)}vw`, 
                rotate: [0, 180, 360], 
                opacity: [0, 0.9, 0.9, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10 + (index % 4) * 3, 
                delay: delay,
                ease: "linear"
              }}
              className="absolute text-pink-300 text-lg filter drop-shadow-xs"
            >
              🌸
            </motion.div>
          );
        })}
      </div>

      {/* Spacing empty block to align branding content perfectly */}
      <div className="h-6" />

      {/* 4. CENTERED COMPACT ARTISTIC TITLE CARD & LOGO */}
      <div className="relative z-20 flex-grow flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto gap-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-3.5"
        >
          {/* Subtle light banner */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white font-extrabold text-[10px] tracking-widest uppercase border border-white/20 shadow-lg mb-1 animate-pulse">
            🌸 {lang === "ko" ? "시뮬레이션 극장" : "温馨冒险 • 治愈解谜"}
          </span>

          {/* Master high-contrast glow Title text with multiple shadow levels for visibility */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-widest leading-none drop-shadow-[0_4px_16px_rgba(244,63,94,0.4)] whitespace-nowrap">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              {t.introTitle}
            </span>
          </h1>

          {/* Mini elegant divider */}
          <div className="w-20 h-1 mt-1 bg-gradient-to-r from-pink-400 via-pink-300 to-rose-400 rounded-full shadow-xs" />
        </motion.div>

        {/* Nostalgic cinematic plot presentation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-slate-100 text-xs sm:text-sm max-w-xl leading-relaxed font-semibold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] bg-slate-950/40 backdrop-blur-md p-4 px-6 rounded-2xl border border-white/10 shadow-inner"
        >
          {t.introDesc}
        </motion.p>

        {/* 5. THE EXCLUSIVE MAIN "START GAME / 开始游戏" BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
          className="mt-2"
        >
          <button
            onClick={onStartGame}
            id="intro-btn-play-hero"
            className="group/startbtn relative flex items-center justify-center gap-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 hover:from-pink-400 hover:via-pink-500 hover:to-rose-500 text-white font-black text-base md:text-lg py-5 px-12 rounded-full transition-all duration-300 shadow-[0_8px_32px_rgba(244,63,94,0.45)] hover:shadow-[0_12px_48px_rgba(244,63,94,0.65)] hover:scale-106 active:scale-95 cursor-pointer border border-white/30 ring-8 ring-pink-500/10"
          >
            {/* Glowing ring effects */}
            <div className="absolute inset-0 rounded-full bg-pink-400/20 blur-xl opacity-0 group-hover/startbtn:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shadow-xs">
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            </div>

            <span className="tracking-widest font-black text-white text-sm md:text-base">
              {lang === "ko" ? "게임 시작" : "开始游戏 / START GAME"}
            </span>
          </button>
        </motion.div>
      </div>

      {/* 6. MINIMAL CLEAN METADATA (FOOTER WITH VERSION ONLY) */}
      <div 
        className="relative z-20 w-full px-8 py-6 text-center text-[10px] text-white/50 tracking-wider flex items-center justify-center font-mono select-none"
        id="cinematic-footer"
      >
        <span>ADVENTURE PROTOTYPE v2.0 • COPYRIGHT © SHENQI ROOM</span>
      </div>
    </div>
  );
}
