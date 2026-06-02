/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import GameWorld from "./components/GameWorld";
import GameIntro from "./components/GameIntro";
import { Language, TRANSLATIONS } from "./translations";
import { 
  Sparkles
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"intro" | "game">("intro");
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [lang, setLang] = useState<Language>("zh");

  const t = TRANSLATIONS[lang];

  const handleStartGame = () => {
    setActiveTab("game");
  };

  const triggerVictoryCelebration = () => {
    setIsCelebrationOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col items-center justify-center antialiased" id="app-container">
      {/* Main Container Stage */}
      <main className="w-full pl-0 pr-0 py-0" id="app-main-viewports">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === "intro" && (
              <GameIntro onStartGame={handleStartGame} lang={lang} onLanguageChange={setLang} />
            )}
            {activeTab === "game" && (
              <GameWorld onGameSuccess={triggerVictoryCelebration} lang={lang} onLanguageChange={setLang} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FULL GRADUATION SUCCESS VICTORY MODAL CELEBRATION */}
      <AnimatePresence>
        {isCelebrationOpen && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="victory-full-modal">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-2 border-emerald-300 shadow-2xl rounded-3xl p-6 md:p-8 max-w-lg w-full relative flex flex-col gap-5 text-center text-slate-800 overflow-hidden"
            >
              {/* Animated sparkles backgrounds */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-yellow-400 to-indigo-500" />
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse" />
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-4xl animate-bounce shadow-md">
                  🏆
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-1">
                  {t.victoryTitle}
                </h3>
                <p className="text-xs text-emerald-600 font-bold tracking-wider flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-spin-slow" />
                  {t.victoryStatus}
                </p>
              </div>

              {/* Memory Diary Envelope visualization */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 text-left shadow-inner flex flex-col gap-2.5">
                <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wider flex justify-between items-center border-b border-amber-200/60 pb-1.5 font-mono">
                  <span>{t.victoryEnvelopeTitle}</span>
                  <span>{t.victoryEnvelopeDate}</span>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed italic border-l-2 border-amber-400 pl-3">
                  {t.victoryEnvelopeBody}
                </div>
              </div>

              {/* Game Score / Prototyping encouragement */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 text-[10px]">{t.victoryStatItems}</span>
                  <span className="font-bold text-slate-800">100% {lang === "ko" ? "완료" : "完整"}</span>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 text-[10px]">{t.victoryStatNpcs}</span>
                  <span className="font-bold text-slate-800">3 / 3 {lang === "ko" ? "대화 완료" : "全收集"}</span>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="flex flex-col items-center">
                  <span className="text-slate-400 text-[10px]">{t.victoryStatPasscode}</span>
                  <span className="font-bold text-slate-800">0526 ({lang === "ko" ? "크랙 성공" : "1次正确"})</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => setIsCelebrationOpen(false)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 font-extrabold text-white text-sm py-3.5 rounded-xl transition cursor-pointer shadow-md shadow-emerald-100"
                >
                  {t.victoryStayBtn}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
