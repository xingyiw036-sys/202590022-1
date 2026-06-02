/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GameState, NPC, GameItem, SceneId } from "../types";
import { GAME_NPCS, GAME_ITEMS, schoolSquareImg, classroomImg, xiaoxiaoPortraitImg, zhangPortraitImg, wangPortraitImg } from "../data";
import { Language, TRANSLATIONS } from "../translations";
import { 
  Compass, 
  MapPin, 
  User, 
  CreditCard,
  BookOpen, 
  Sparkle, 
  Lock, 
  Unlock, 
  RotateCcw, 
  ArrowLeftRight, 
  HelpCircle,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";

interface GameWorldProps {
  onGameSuccess: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function GameWorld({ onGameSuccess, lang, onLanguageChange }: GameWorldProps) {
  const t = TRANSLATIONS[lang];

  // Map the static NPCs to localized variants dynamically
  const localizedNpcs: NPC[] = GAME_NPCS.map((raw) => {
    if (raw.id === "xiaoxiao") {
      return {
        ...raw,
        name: t.npcXiaoxiaoName,
        role: t.npcXiaoxiaoRole,
        description: t.npcXiaoxiaoDesc,
        dialogue: t.npcXiaoxiaoDialogue,
        solvedDialogue: t.npcXiaoxiaoSolved,
        excelNote: t.npcXiaoxiaoNote,
      };
    }
    if (raw.id === "zhang") {
      return {
        ...raw,
        name: t.npcZhangName,
        role: t.npcZhangRole,
        description: t.npcZhangDesc,
        dialogue: t.npcZhangDialogue,
        solvedDialogue: t.npcZhangSolved,
        excelNote: t.npcZhangNote,
      };
    }
    if (raw.id === "wang") {
      return {
        ...raw,
        name: t.npcWangName,
        role: t.npcWangRole,
        description: t.npcWangDesc,
        dialogue: t.npcWangDialogue,
        solvedDialogue: t.npcWangSolved,
        excelNote: t.npcWangNote,
      };
    }
    return raw;
  });

  // Map the static items to localized variants dynamically
  const localizedItems: GameItem[] = GAME_ITEMS.map((raw) => {
    if (raw.id === "campus_card") {
      return {
        ...raw,
        name: t.itemCardName,
        description: t.itemCardDesc,
        excelNote: t.itemCardNote,
      };
    }
    if (raw.id === "passcode_memo") {
      return {
        ...raw,
        name: t.itemMemoName,
        description: t.itemMemoDesc,
        excelNote: t.itemMemoNote,
      };
    }
    if (raw.id === "graduation_capsule") {
      return {
        ...raw,
        name: t.itemCapsuleName,
        description: t.itemCapsuleDesc,
        excelNote: t.itemCapsuleNote,
      };
    }
    return raw;
  });

  // Initialize game state locally
  const [gameState, setGameState] = useState<GameState>({
    currentScene: "square",
    inventory: [],
    hasFoundCard: false,
    hasSolvedLocker: false,
    npcDialogueProgress: { xiaoxiao: 0, zhang: 0, wang: 0 },
    activeNPCDialogue: null,
    examinedDesk: false,
    gameStatus: "playing",
  });

  // Dialog box state
  const [activeNPC, setActiveNPC] = useState<NPC | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // Locker lockpad state
  const [isLockerOpen, setIsLockerOpen] = useState(false);
  const [passcode, setPasscode] = useState<string[]>(["0", "0", "0", "0"]);
  const [isCardSwiped, setIsCardSwiped] = useState(false);
  const [lockpadFeedback, setLockpadFeedback] = useState<"idle" | "success" | "error" | "swiped">("idle");

  // Track who was spoken to
  const [spokenTo, setSpokenTo] = useState<Record<string, boolean>>({
    xiaoxiao: false,
    zhang: false,
    wang: false,
  });

  // Track item description modal
  const [selectedItemInfo, setSelectedItemInfo] = useState<GameItem | null>(null);
  const [examinedDeskNote, setExaminedDeskNote] = useState(false);

  // Toggleable HUD Modal state hooks
  const [isBackpackOpen, setIsBackpackOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);

  // Side Quest State Hooks
  const [foundSecretNotes, setFoundSecretNotes] = useState<string[]>([]);
  const [activeSecretNote, setActiveSecretNote] = useState<string | null>(null);
  const [sideQuestVictoryShown, setSideQuestVictoryShown] = useState(false);

  // Special Side Quest dialogue scripts for Xiaoxiao
  const xiaoxiaoSideDialogue = lang === "ko" ? [
    "와! 정말로 그 보관함을 열고 졸업 타임캡슐을 획득하셨군요! 너무 대단해요! 🎉",
    "아, 마침 제가 방금 캠퍼스 중앙에서 분리수거를 하다가 벚꽃 잎 틈바구니에서 낙서 종이 한 장을 주웠어요. 분홍색 하트 스티커와 함께 'AI 비밀 노트 #4'라고 예쁘게 적혀있네요...",
    "이건 아마 이 게임 세상을 함께 빚은 AI 디자이너가 남겨둔 마법의 일기 조각 같아요! 자 여기 줄게요, 어서 열어보세요!"
  ] : [
    "哇！你真的打破了储物柜密码、拿到最珍贵的时光胶囊啦！太厉害了！🎉",
    "对了，我刚才在打扫校园广场落叶做分类时，在中央樱花大树下的缝隙里捡到了这张泛黄的精致信纸。上面贴着亮闪闪的猫咪贴纸，写着‘AI 秘密笔记 #4’……",
    "这一定是协助制作本游戏世界的 AI 开发者留下的小日志彩蛋！给你，快抱去读读看，说不定拼成一整套可以触发奇迹发现哦！"
  ];

  // Helper to obtain current active dialogue list for NPCs
  const getNPCDialogueList = (npc: NPC) => {
    if (gameState.hasSolvedLocker && npc.id === "xiaoxiao") {
      return xiaoxiaoSideDialogue;
    }
    return gameState.hasFoundCard ? npc.solvedDialogue : npc.dialogue;
  };

  // Active missions helper
  const talkCount = Object.values(spokenTo).filter(Boolean).length;
  const isMissionComplete = gameState.hasSolvedLocker;

  // Handle NPC dialog launch
  const handleTalkToNPC = (npcId: string) => {
    const npc = localizedNpcs.find((n) => n.id === npcId);
    if (!npc) return;

    setActiveNPC(npc);
    setDialogueIndex(0);
    setSpokenTo((prev) => ({ ...prev, [npcId]: true }));
    setGameState((prev) => ({
      ...prev,
      activeNPCDialogue: npcId,
    }));
  };

  // Continue dialogue interaction
  const handleNextDialogue = () => {
    if (!activeNPC) return;
    const dialogueList = getNPCDialogueList(activeNPC);
    
    if (dialogueIndex + 1 < dialogueList.length) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      // If it is the Side Quest dialogue from Xiaoxiao, grant Note #4
      if (gameState.hasSolvedLocker && activeNPC.id === "xiaoxiao") {
        if (!foundSecretNotes.includes("npc_note")) {
          setFoundSecretNotes((prev) => {
            const next = [...prev, "npc_note"];
            setActiveSecretNote("npc_note");
            return next;
          });
        }
      }
      // Close dialogue
      setActiveNPC(null);
      setDialogueIndex(0);
      setGameState((prev) => ({
        ...prev,
        activeNPCDialogue: null,
      }));
    }
  };

  // Find campus card function
  const handleFindCampusCard = () => {
    if (gameState.hasFoundCard) return;
    
    const cardItem = localizedItems.find((item) => item.id === "campus_card");
    if (!cardItem) return;

    setGameState((prev) => ({
      ...prev,
      hasFoundCard: true,
      inventory: [...prev.inventory, "campus_card"],
    }));
    
    // Popup details
    setSelectedItemInfo(cardItem);
  };

  const handleExamineDesk = () => {
    setExaminedDeskNote(true);
    const memoItem = localizedItems.find((item) => item.id === "passcode_memo");
    if (memoItem && !gameState.inventory.includes("passcode_memo")) {
      setGameState((prev) => ({
        ...prev,
        examinedDesk: true,
        inventory: [...prev.inventory, "passcode_memo"],
      }));
    }
  };

  // Keypad click actions
  const changeDigit = (index: number, direction: "up" | "down") => {
    if (!isCardSwiped) {
      // Prompt user to swipe card first
      setLockpadFeedback("idle");
      return;
    }
    const currentVal = parseInt(passcode[index]);
    let nextVal = direction === "up" ? currentVal + 1 : currentVal - 1;
    if (nextVal > 9) nextVal = 0;
    if (nextVal < 0) nextVal = 9;
    
    const nextArr = [...passcode];
    nextArr[index] = nextVal.toString();
    setPasscode(nextArr);
  };

  // Swipe Card logic
  const handleSwipeCard = () => {
    if (!gameState.hasFoundCard) {
      setLockpadFeedback("idle");
      return;
    }
    setIsCardSwiped(true);
    setLockpadFeedback("swiped");
  };

  // Locker unlock try
  const handleTryUnlock = () => {
    if (!isCardSwiped) return;
    const finalCode = passcode.join("");
    if (finalCode === "0526") {
      setLockpadFeedback("success");
      setGameState((prev) => ({
        ...prev,
        hasSolvedLocker: true,
        inventory: [...prev.inventory, "graduation_capsule"],
      }));
      setTimeout(() => {
        setIsLockerOpen(false);
        onGameSuccess(); // Call app celebration
      }, 1500);
    } else {
      setLockpadFeedback("error");
      setTimeout(() => setLockpadFeedback("swiped"), 1200);
    }
  };

  const resetGame = () => {
    setGameState({
      currentScene: "square",
      inventory: [],
      hasFoundCard: false,
      hasSolvedLocker: false,
      npcDialogueProgress: { xiaoxiao: 0, zhang: 0, wang: 0 },
      activeNPCDialogue: null,
      examinedDesk: false,
      gameStatus: "playing",
    });
    setSpokenTo({ xiaoxiao: false, zhang: false, wang: false });
    setIsCardSwiped(false);
    setPasscode(["0", "0", "0", "0"]);
    setLockpadFeedback("idle");
    setExaminedDeskNote(false);
    setIsBackpackOpen(false);
    setIsProgressOpen(false);
    setFoundSecretNotes([]);
    setActiveSecretNote(null);
    setSideQuestVictoryShown(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full z-40 bg-slate-950 font-sans select-none overflow-hidden" id="game-world-container">
      {/* 2D Immersive Arena Wrapper */}
      <div className="absolute inset-0 w-full h-full bg-slate-950" id="game-viewport-card">
        
        {/* Header toolbar overlaid on top */}
        <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between bg-black/45 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl shadow-2xl gap-2 transition duration-300" id="play-header-toolbar">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-white/10 text-emerald-400 rounded-xl border border-white/10 animate-pulse">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xs font-black text-white flex items-center gap-1.5 leading-none">
                {gameState.currentScene === "square" ? t.sceneSquareName : t.sceneClassroomName}
                <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {gameState.currentScene === "square" ? t.sceneSquareSub : t.sceneClassroomSub}
                </span>
              </h2>
              <p className="text-[10px] text-white/50 font-medium mt-1">{t.sceneInstruction}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {gameState.hasSolvedLocker && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setIsProgressOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500/30 to-purple-500/30 hover:from-pink-500/45 hover:to-purple-500/45 backdrop-blur-md text-pink-200 border border-pink-400/40 font-black text-xs py-2 px-3.5 rounded-xl shadow-lg transition cursor-pointer active:scale-95 animate-pulse"
              >
                <span>🌟</span>
                <span>{t.sideQuestName}</span>
                <span className="font-mono bg-pink-500/40 text-white px-1.5 py-0.2 rounded-md text-[9px] font-bold">
                  {foundSecretNotes.length} / 4
                </span>
              </motion.button>
            )}

            {/* Exploration Progress inside Header */}
            <button
              onClick={() => setIsProgressOpen(true)}
              className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-md text-emerald-300 border border-emerald-500/35 font-extrabold text-xs py-2 px-3.5 rounded-xl shadow-lg transition cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{lang === "ko" ? "탐색 진행도" : "探索进度"}</span>
              <span className="font-mono bg-white/20 text-white px-1.5 py-0.2 rounded-md text-[9px] font-bold">
                {talkCount + (gameState.hasFoundCard ? 1 : 0) + (gameState.examinedDesk ? 1 : 0) + (gameState.hasSolvedLocker ? 1 : 0)} / 6
              </span>
            </button>

            {/* Backpack/Inventory inside Header */}
            <button
              onClick={() => setIsBackpackOpen(true)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/15 font-extrabold text-xs py-2 px-3.5 rounded-xl shadow-lg transition cursor-pointer active:scale-95"
            >
              <span>🎒</span>
              <span>{lang === "ko" ? "가방" : "我的背包"}</span>
              {gameState.inventory.length > 0 && (
                <span className="bg-rose-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold animate-bounce font-mono">
                  {gameState.inventory.length}
                </span>
              )}
            </button>

            {/* Language Selection Button */}
            <button
              onClick={() => onLanguageChange(lang === "zh" ? "ko" : "zh")}
              className="flex items-center gap-1.5 bg-white/5 border border-white/15 hover:bg-white/10 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-lg"
              title={lang === "zh" ? "한국어로 변경" : "切换为中文"}
            >
              <span>{lang === "zh" ? "🇰🇷" : "🇨🇳"}</span>
              <span className="text-[11px]">{lang === "zh" ? "한국어" : "中文"}</span>
            </button>

            {/* Travel Scene toggle */}
            <button
              onClick={() => {
                setGameState((prev) => ({
                  ...prev,
                  currentScene: prev.currentScene === "square" ? "classroom" : "square",
                }));
                // Auto-close open dialogs on scene change
                setActiveNPC(null);
              }}
              id="scene-travel-btn"
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-xl cursor-pointer border border-white/20"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              {t.sceneSwitchBtn} {gameState.currentScene === "square" ? t.sceneClassroomTag : t.sceneSquareTag}
            </button>

            {/* Reset Retry */}
            <button
              onClick={resetGame}
              id="reset-game-btn"
              className="p-2 border border-white/15 text-white/80 hover:text-white hover:bg-white/10 bg-white/5 rounded-xl transition cursor-pointer shadow-lg"
              title={t.retryTooltip}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* The Graphic Screen container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900 group" id="game-stage">
          {/* Background Images */}
          {gameState.currentScene === "square" ? (
            <img
              src={schoolSquareImg}
              alt="School Campus Square"
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-1000 scale-103 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
          ) : (
            <img
              src={classroomImg}
              alt="Classroom Interior"
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-1000 scale-103 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Environmental Overlay filter */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

          {/* ACTIVE GAME SCENE: SQUARE */}
          {gameState.currentScene === "square" && (
            <div className="absolute inset-0" id="square-interactive-overlay">
              {/* Sparkle Campus Card hidden on the center-bottom-left near the flowerbeds / bench */}
              {!gameState.hasFoundCard && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.7 }}
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  onClick={handleFindCampusCard}
                  id="campus-card-click-sparkle"
                  style={{ top: "68%", left: "42%" }}
                  className="absolute cursor-pointer p-4 bg-yellow-400/30 hover:bg-yellow-400/60 rounded-full border border-yellow-200 shadow-lg shadow-yellow-200/50 flex items-center justify-center group/card"
                >
                  <Sparkle className="w-6 h-6 text-yellow-300 drop-shadow-md animate-pulse" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover/card:block bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded-md">
                    {t.sparkleHoverText}
                  </span>
                </motion.div>
              )}

              {/* Event Post-Main Side Quest: Note #1 Envelope */}
              {gameState.hasSolvedLocker && !foundSecretNotes.includes("square_note") && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.8, 1, 0.8], rotate: [-3, 3, -3] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  onClick={() => {
                    setFoundSecretNotes((prev) => [...prev, "square_note"]);
                    setActiveSecretNote("square_note");
                  }}
                  id="side-quest-envelope-square"
                  style={{ top: "35%", left: "50%" }}
                  className="absolute cursor-pointer p-3 bg-pink-400/40 hover:bg-pink-400/70 rounded-full border border-pink-200 shadow-xl shadow-pink-200/50 flex flex-col items-center justify-center group/sqnote z-10"
                >
                  <span className="text-2xl animate-bounce select-none">💌</span>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-pink-900 border border-pink-400 text-white text-[9px] px-2 py-0.5 rounded-md font-bold uppercase shadow-md pointer-events-none tracking-wider scale-0 group-hover/sqnote:scale-100 duration-150">
                    {lang === "ko" ? "AI 비밀 일기 #1" : "AI秘密笔记 #1"}
                  </span>
                </motion.div>
              )}

              {/* NPC 1: Xiaoxiao (🎒 Left-middle area in front of the trees) */}
              <div 
                style={{ top: "52%", left: "18%" }}
                className="absolute text-center group/npc max-w-[12%] cursor-pointer"
                onClick={() => handleTalkToNPC("xiaoxiao")}
                id="npc-xiaoxiao-click"
              >
                <div className="relative inline-block animate-bounce-slow">
                  {/* Status Indicator bubble */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 border border-emerald-200 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                    {spokenTo.xiaoxiao ? (lang === "ko" ? "💬 대화 완료" : "💬 已对话") : (lang === "ko" ? "💬 반장" : "💬 班长")}
                  </div>
                  {/* Avatar Character Circle */}
                  <div className="w-14 h-14 bg-emerald-50 border-3 border-emerald-400 rounded-full shadow-lg flex items-center justify-center overflow-hidden group-hover/npc:scale-110 duration-200 active:scale-95">
                    <img 
                      src={xiaoxiaoPortraitImg} 
                      alt="筱筱" 
                      className="w-full h-full object-cover scale-110 origin-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="mt-1 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full inline-block font-medium">
                  {lang === "ko" ? "샤오샤오" : "筱筱"}
                </div>
              </div>

              {/* NPC 2: Senior Zhang (🚲 On the center-right near the bench) */}
              <div 
                style={{ top: "60%", left: "62%" }}
                className="absolute text-center group/npc max-w-[12%] cursor-pointer"
                onClick={() => handleTalkToNPC("zhang")}
                id="npc-zhang-click"
              >
                <div className="relative inline-block" style={{ animationDelay: "0.4s" }}>
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 border border-sky-200 text-sky-800 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                    {spokenTo.zhang ? (lang === "ko" ? "💬 대화 완료" : "💬 已对话") : (lang === "ko" ? "💬 힌트 선배" : "💡 线索学长")}
                  </div>
                  <div className="w-14 h-14 bg-sky-50 border-3 border-sky-400 rounded-full shadow-lg flex items-center justify-center overflow-hidden group-hover/npc:scale-110 duration-200 active:scale-95">
                    <img 
                      src={zhangPortraitImg} 
                      alt="张弛" 
                      className="w-full h-full object-cover scale-110 origin-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="mt-1 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full inline-block font-medium">
                  {lang === "ko" ? "선배 장치" : "学长张弛"}
                </div>
              </div>

              {/* NPC 3: Auntie Wang (🔑 Far Right) */}
              <div 
                style={{ top: "48%", left: "82%" }}
                className="absolute text-center group/npc max-w-[12%] cursor-pointer"
                onClick={() => handleTalkToNPC("wang")}
                id="npc-wang-click"
              >
                <div className="relative inline-block" style={{ animationDelay: "0.8s" }}>
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 border border-amber-200 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                    {spokenTo.wang ? (lang === "ko" ? "💬 대화 완료" : "💬 已对话") : (lang === "ko" ? "💬 사감 이모" : "📋 宿管阿姨")}
                  </div>
                  <div className="w-14 h-14 bg-amber-50 border-3 border-amber-400 rounded-full shadow-lg flex items-center justify-center overflow-hidden group-hover/npc:scale-110 duration-200 active:scale-95">
                    <img 
                      src={wangPortraitImg} 
                      alt="王阿姨" 
                      className="w-full h-full object-cover scale-110 origin-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="mt-1 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full inline-block font-medium">
                  {lang === "ko" ? "왕 이모" : "王阿姨"}
                </div>
              </div>

              {/* Scene Transition Indicator */}
              <div 
                onClick={() => setGameState((prev) => ({ ...prev, currentScene: "classroom" }))}
                style={{ bottom: "8%", right: "8%" }}
                className="absolute bg-emerald-500/90 hover:bg-emerald-600 min-w-[20%] text-center text-white px-4 py-2.5 rounded-xl border border-emerald-400 cursor-pointer shadow-lg hover:scale-105 duration-200 select-none animate-pulse-slow"
                id="hud-enter-building"
              >
                <div className="text-xs font-bold flex items-center justify-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {t.hudEnterLabel}
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE GAME SCENE: CLASSROOM */}
          {gameState.currentScene === "classroom" && (
            <div className="absolute inset-0" id="classroom-interactive-overlay">
              {/* Teacher's Desk: click for note */}
              <div 
                style={{ top: "54%", left: "30%" }}
                className="absolute group/desk cursor-pointer text-center"
                onClick={handleExamineDesk}
                id="classroom-desk-click"
              >
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="bg-amber-100/40 hover:bg-amber-200/60 p-3 rounded-full border border-amber-300 shadow-md flex items-center justify-center text-2xl group-hover/desk:scale-110 duration-200"
                >
                  📝
                </motion.div>
                <div className="mt-1.5 text-[8px] sm:text-[10px] bg-amber-950/80 text-white font-medium px-2 py-0.5 rounded-full inline-block">
                  {t.itemMemoName}
                </div>
              </div>

              {/* Event Post-Main Side Quest: Note #2 Note */}
              {gameState.hasSolvedLocker && !foundSecretNotes.includes("classroom_note") && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.8, 1, 0.8], y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  onClick={() => {
                    setFoundSecretNotes((prev) => [...prev, "classroom_note"]);
                    setActiveSecretNote("classroom_note");
                  }}
                  id="side-quest-sticker-classroom"
                  style={{ top: "25%", left: "55%" }}
                  className="absolute cursor-pointer p-3 bg-pink-400/40 hover:bg-pink-400/70 rounded-full border border-pink-200 shadow-xl shadow-pink-200/50 flex flex-col items-center justify-center group/classnote z-10"
                >
                  <span className="text-2xl animate-pulse select-none">🌟</span>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-pink-900 border border-pink-400 text-white text-[9px] px-2 py-0.5 rounded-md font-bold uppercase shadow-md pointer-events-none tracking-wider scale-0 group-hover/classnote:scale-100 duration-150">
                    {lang === "ko" ? "AI 비밀 일기 #2" : "AI秘密笔记 #2"}
                  </span>
                </motion.div>
              )}

              {/* Storage Locker block (Right Wall area) */}
              <div 
                style={{ top: "42%", left: "75%" }}
                className="absolute group/locker cursor-pointer text-center"
                onClick={() => setIsLockerOpen(true)}
                id="classroom-locker-click"
              >
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className={`p-3.5 rounded-full ${gameState.hasSolvedLocker ? "bg-green-100/50 border-green-400" : "bg-indigo-100/50 border-indigo-400"} border-2 shadow-lg flex items-center justify-center text-3xl group-hover/locker:scale-110 duration-200`}
                >
                  {gameState.hasSolvedLocker ? "💎" : "🔒"}
                </motion.div>
                <div className="mt-1.5 text-[8px] sm:text-[10px] bg-slate-900/90 text-white font-bold px-2.5 py-0.5 rounded-full inline-block">
                  {gameState.hasSolvedLocker ? (lang === "ko" ? "【타임캡슐 열림】" : "【时光胶囊已解锁】") : (lang === "ko" ? "비밀번호 보관함" : "解密码储物柜")}
                </div>
              </div>

              {/* Scene Transition: Return back outside to Plaza */}
              <div 
                onClick={() => setGameState((prev) => ({ ...prev, currentScene: "square" }))}
                style={{ bottom: "8%", left: "8%" }}
                className="absolute bg-slate-100/95 hover:bg-white text-slate-800 px-4 py-2.5 rounded-xl border border-slate-300 cursor-pointer shadow-lg hover:scale-105 duration-200 select-none"
                id="hud-exit-building"
              >
                <div className="text-xs font-bold flex items-center gap-1.5">
                  {t.hudExitLabel}
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE DIALOGUE OVERLAY */}
          <AnimatePresence>
            {activeNPC && activeNPC.image && (
              <motion.div
                key={`portrait-${activeNPC.id}`}
                initial={{ y: 80, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 80, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="absolute bottom-[115px] sm:bottom-[120px] left-8 sm:left-12 w-[24%] md:w-[19%] max-w-[130px] z-25 pointer-events-none select-none"
                id="active-npc-standing-portrait"
              >
                <img
                  src={activeNPC.image}
                  alt={activeNPC.name}
                  className="w-full h-auto object-contain rounded-2xl border-4 border-white/95 shadow-2xl drop-shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {activeNPC && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                id="active-dialogue-panel"
                className="absolute bottom-4 left-4 right-4 bg-white/95 border border-slate-200 hover:border-emerald-300 duration-200 rounded-xl p-4 flex gap-3 shadow-2xl z-20"
              >
                {/* NPC Character Profile */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1 select-none">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-3xl shadow-sm overflow-hidden">
                    {activeNPC.image ? (
                      <img
                        src={activeNPC.image}
                        alt={activeNPC.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      activeNPC.avatar
                    )}
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md max-w-[70px] truncate text-center font-bold">
                    {activeNPC.role}
                  </span>
                </div>

                {/* Dialog Content */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      {activeNPC.name}
                      <span className="text-[9px] font-normal text-slate-400 bg-slate-100 px-1.5 rounded-sm">
                        {t.dialogueNarrativeTag}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1" id="dialogue-lines-paragraph">
                      {getNPCDialogueList(activeNPC)[dialogueIndex]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 mt-2 pt-2">
                    <span className="text-[9px] text-slate-400 font-mono">
                      {t.dialoguePageLabel} {dialogueIndex + 1} / {
                        getNPCDialogueList(activeNPC).length
                      }
                    </span>
                    <button
                      onClick={handleNextDialogue}
                      id="dialog-next-button"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      {dialogueIndex + 1 < getNPCDialogueList(activeNPC).length
                        ? t.dialogueNextBtn
                        : t.dialogueEndBtn}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* HUD MODAL 1: INVENTORY / BACKPACK */}
      <AnimatePresence>
        {isBackpackOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="hud-backpack-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 max-w-sm w-full relative flex flex-col gap-4 text-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎒</span>
                  {t.backpackTitle}
                </span>
                <button 
                  onClick={() => setIsBackpackOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 hover:bg-slate-100 rounded cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {gameState.inventory.length === 0 ? (
                <div className="p-8 border border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-xs my-2">
                  {t.backpackEmpty}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 my-2" id="inventory-grid">
                  {gameState.inventory.map((itemId) => {
                    const item = localizedItems.find((it) => it.id === itemId);
                    if (!item) return null;
                    return (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={item.id}
                        onClick={() => {
                          setSelectedItemInfo(item);
                        }}
                        className="flex flex-col items-center justify-center border border-slate-200 hover:border-emerald-400 p-3 rounded-xl bg-slate-50 cursor-pointer text-center duration-150 shadow-sm"
                        title={item.name}
                      >
                        <span className="text-2xl mb-1 select-none">{item.icon}</span>
                        <span className="text-[9px] text-slate-600 font-bold truncate w-full text-center">
                          {item.id === "campus_card" ? t.backpackItemTagCard : item.id === "passcode_memo" ? t.backpackItemTagMemo : t.backpackItemTagCapsule}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setIsBackpackOpen(false)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  {lang === "ko" ? "닫기" : "关闭"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HUD MODAL 2: MISSION TRACKER / EXPLORE PROGRESS */}
      <AnimatePresence>
        {isProgressOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="hud-progress-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 max-w-sm w-full relative flex flex-col gap-4 text-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {t.missionTitle}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isMissionComplete ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`} id="mission-progress-label">
                  {isMissionComplete ? t.missionProgressFinished : t.missionProgressActive}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-xs text-slate-600 my-2">
                {/* Step 1: Speak to NPCs */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    {t.missionNpcStep}
                  </span>
                  <span className="font-mono text-xs font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-lg text-slate-700">
                    {talkCount} / 3
                  </span>
                </div>

                {/* Step 2: Grab Campus Card */}
                <div className={`flex items-center justify-between p-2 rounded-xl border ${gameState.hasFoundCard ? "bg-green-50/40 border-green-200 text-green-800" : "bg-slate-50/40 border-slate-100 text-slate-600"}`}>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CreditCard className="w-3.5 h-3.5" />
                    {t.missionCardStep}
                  </span>
                  <span className="font-bold text-xs">
                    {gameState.hasFoundCard ? t.missionCardStepTrue : t.missionCardStepFalse}
                  </span>
                </div>

                {/* Step 3: Explore Classroom Notepad */}
                <div className={`flex items-center justify-between p-2 rounded-xl border ${gameState.examinedDesk ? "bg-green-50/40 border-green-200 text-green-800" : "bg-slate-50/40 border-slate-100 text-slate-600"}`}>
                  <span className="flex items-center gap-1.5 font-medium">
                    <BookOpen className="w-3.5 h-3.5" />
                    {t.missionMemoStep}
                  </span>
                  <span className="font-bold text-xs">
                    {gameState.examinedDesk ? t.missionMemoStepTrue : t.missionMemoStepFalse}
                  </span>
                </div>

                {/* Step 4: Break Locker Passcode */}
                <div className={`flex items-center justify-between p-2 rounded-xl border ${gameState.hasSolvedLocker ? "bg-green-50 border-green-200 text-green-800" : "bg-slate-50 border-slate-100 text-slate-600"}`}>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Lock className="w-3.5 h-3.5" />
                    {t.missionLockerStep}
                  </span>
                  <span className="font-bold text-xs">
                    {gameState.hasSolvedLocker ? t.missionLockerStepTrue : t.missionLockerStepFalse}
                  </span>
                </div>
              </div>

              {gameState.hasSolvedLocker && (
                <div className="border-t border-dashed border-slate-200 pt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-black text-pink-600 flex items-center gap-1 uppercase tracking-wider">
                      <span>🌟</span>
                      {t.sideQuestName}
                    </h4>
                    <span className="text-[10px] bg-pink-100 text-pink-700 font-extrabold px-2 py-0.5 rounded-full font-mono">
                      {foundSecretNotes.length} / 4
                    </span>
                  </div>
                  
                  <div className="text-[10px] text-slate-500 bg-pink-50/50 p-2 border border-pink-100 rounded-lg leading-normal flex flex-col gap-1.5 text-left">
                    <div>
                      <strong className="text-slate-700 block text-[9px]">💡 {lang === "ko" ? "트리거 조건:" : "触发条件:"}</strong>
                      {t.sideQuestTriggerCond}
                    </div>
                    <div>
                      <strong className="text-slate-700 block text-[9px]">📋 {lang === "ko" ? "미션 흐름:" : "任务流程:"}</strong>
                      {t.sideQuestFlow}
                    </div>
                  </div>

                  {/* Individual Notes Progress Checklist */}
                  <div className="grid grid-cols-2 gap-1.5 mt-1 text-[10px]">
                    <div 
                      onClick={() => foundSecretNotes.includes("square_note") && setActiveSecretNote("square_note")}
                      className={`p-1.5 rounded-lg border flex flex-col justify-between text-left duration-150 ${foundSecretNotes.includes("square_note") ? "bg-pink-50 border-pink-200 text-pink-800 cursor-pointer hover:bg-pink-100" : "bg-slate-50 border-slate-100 text-slate-400"}`}
                    >
                      <span className="font-bold flex items-center gap-1 text-[9px]">
                        {foundSecretNotes.includes("square_note") ? "🌸" : "🔒"} #1 {lang === "ko" ? "광장 노트" : "广场笔记"}
                      </span>
                      <span className="text-[8px] mt-0.5 opacity-80 leading-tight">
                        {t.noteLocationSquare.split("：")[1] || t.noteLocationSquare.split(":")[1]}
                      </span>
                    </div>

                    <div 
                      onClick={() => foundSecretNotes.includes("classroom_note") && setActiveSecretNote("classroom_note")}
                      className={`p-1.5 rounded-lg border flex flex-col justify-between text-left duration-150 ${foundSecretNotes.includes("classroom_note") ? "bg-pink-50 border-pink-200 text-pink-800 cursor-pointer hover:bg-pink-100" : "bg-slate-50 border-slate-100 text-slate-400"}`}
                    >
                      <span className="font-bold flex items-center gap-1 text-[9px]">
                        {foundSecretNotes.includes("classroom_note") ? "📝" : "🔒"} #2 {lang === "ko" ? "교실 노트" : "教室笔记"}
                      </span>
                      <span className="text-[8px] mt-0.5 opacity-80 leading-tight">
                        {t.noteLocationClassroom.split("：")[1] || t.noteLocationClassroom.split(":")[1]}
                      </span>
                    </div>

                    <div 
                      onClick={() => foundSecretNotes.includes("locker_note") && setActiveSecretNote("locker_note")}
                      className={`p-1.5 rounded-lg border flex flex-col justify-between text-left duration-150 ${foundSecretNotes.includes("locker_note") ? "bg-pink-50 border-pink-200 text-pink-800 cursor-pointer hover:bg-pink-100" : "bg-slate-50 border-slate-100 text-slate-400"}`}
                    >
                      <span className="font-bold flex items-center gap-1 text-[9px]">
                        {foundSecretNotes.includes("locker_note") ? "🔑" : "🔒"} #3 {lang === "ko" ? "보관함 노트" : "柜子笔记"}
                      </span>
                      <span className="text-[8px] mt-0.5 opacity-80 leading-tight">
                        {t.noteLocationLocker.split("：")[1] || t.noteLocationLocker.split(":")[1]}
                      </span>
                    </div>

                    <div 
                      onClick={() => foundSecretNotes.includes("npc_note") && setActiveSecretNote("npc_note")}
                      className={`p-1.5 rounded-lg border flex flex-col justify-between text-left duration-150 ${foundSecretNotes.includes("npc_note") ? "bg-pink-50 border-pink-200 text-pink-800 cursor-pointer hover:bg-pink-100" : "bg-slate-50 border-slate-100 text-slate-400"}`}
                    >
                      <span className="font-bold flex items-center gap-1 text-[9px]">
                        {foundSecretNotes.includes("npc_note") ? "🐱" : "🔒"} #4 {lang === "ko" ? "반장 노트" : "班长笔记"}
                      </span>
                      <span className="text-[8px] mt-0.5 opacity-80 leading-tight">
                        {t.noteLocationNPC.split("：")[1] || t.noteLocationNPC.split(":")[1]}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setIsProgressOpen(false)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  {lang === "ko" ? "닫기" : "关闭"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL WINDOW 1: LOCKER PADLOCK INTERACTIVE CRACK */}
      <AnimatePresence>
        {isLockerOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="locker-lock-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border text-center border-slate-200 shadow-2xl rounded-2xl p-5 max-w-sm w-full relative flex flex-col gap-4 text-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-4 h-4 text-indigo-500" />
                  {t.lockerModalTitle}
                </span>
                <button 
                  onClick={() => setIsLockerOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 hover:bg-slate-55 rounded cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* CARD READER PORT STAGE */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center gap-2">
                <div className="text-xs text-slate-500 font-medium">{t.lockerModalCheckSub}</div>
                
                {isCardSwiped ? (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-xl text-green-700 text-xs font-bold">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                    {t.lockerModalCardSuccess}
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-2 items-center">
                    <div className="text-[9px] text-slate-400 leading-normal">{t.lockerModalCardHint}</div>
                    {gameState.hasFoundCard ? (
                      <button
                        onClick={handleSwipeCard}
                        id="modal-swipe-card-btn"
                        className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 text-xs py-2 px-4 rounded-xl transition cursor-pointer"
                      >
                        {t.lockerModalSwipeBtn}
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 font-medium">
                        {t.lockerModalCardMissing}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CODE PADLOCK 4 DIALS */}
              <div className={`p-4 rounded-xl border flex flex-col items-center gap-3 ${isCardSwiped ? "bg-indigo-50/10 border-indigo-200" : "bg-slate-100 opacity-60 pointer-events-none"}`}>
                <div className="text-xs font-bold text-slate-700">{t.lockerModalLockerSub}</div>
                
                <div className="flex items-center justify-center gap-3">
                  {passcode.map((num, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <button
                        onClick={() => changeDigit(i, "up")}
                        className="p-1 hover:bg-indigo-100/55 rounded-md text-indigo-600 transition font-bold"
                      >
                        ▲
                      </button>
                      <div className="w-10 h-11 bg-white border-2 border-indigo-300 font-mono text-xl font-bold flex items-center justify-center rounded-lg shadow-sm">
                        {num}
                      </div>
                      <button
                        onClick={() => changeDigit(i, "down")}
                        className="p-1 hover:bg-indigo-100/55 rounded-md text-indigo-600 transition font-bold"
                      >
                        ▼
                      </button>
                    </div>
                  ))}
                </div>

                {/* Feedbacks Display */}
                {lockpadFeedback === "error" && (
                  <div className="text-[10px] font-bold text-red-600 bg-red-50 py-1 px-3 rounded-md">
                    🚨 {t.lockerModalErrorFeedback}
                  </div>
                )}
                {lockpadFeedback === "success" && (
                  <div className="text-[10px] font-bold text-green-700 bg-green-50 py-1 px-3 rounded-md">
                    🎉 {t.lockerModalSuccessFeedback}
                  </div>
                )}
                {lockpadFeedback === "swiped" && (
                  <div className="text-[10px] text-indigo-500 font-mono font-bold">
                    {t.lockerModalReadyFeedback}
                  </div>
                )}

                {gameState.hasSolvedLocker && !foundSecretNotes.includes("locker_note") && (
                  <motion.button
                    initial={{ scale: 0.9, y: 5 }}
                    animate={{ scale: [1, 1.05, 1], y: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    onClick={() => {
                      setFoundSecretNotes((prev) => [...prev, "locker_note"]);
                      setActiveSecretNote("locker_note");
                    }}
                    className="mt-3 w-full animate-pulse bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 border border-pink-300 shadow-md text-white font-extrabold text-xs py-2 px-3 rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>💝</span>
                    <span>{lang === "ko" ? "비밀 수납칸: AI 비밀 일기 #3 줍기!" : "隐藏夹层：获得 AI 秘密笔记 #3！"}</span>
                  </motion.button>
                )}
              </div>

              {/* Bottom control handles */}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  onClick={() => setIsLockerOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium cursor-pointer"
                >
                  {t.lockerModalCancel}
                </button>
                <button
                  onClick={handleTryUnlock}
                  disabled={!isCardSwiped || lockpadFeedback === "success"}
                  id="modal-unlock-submit-btn"
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer ${isCardSwiped && lockpadFeedback !== "success" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-slate-300 text-slate-500 cursor-not-allowed"}`}
                >
                  {t.lockerModalSubmit}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL WINDOW 2: ITEM INFORMATION DISPLAY AND PROTO NOTES */}
      <AnimatePresence>
        {selectedItemInfo && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="item-info-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 max-w-sm w-full relative flex flex-col gap-3 text-slate-800"
            >
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="text-3xl select-none">{selectedItemInfo.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{selectedItemInfo.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono uppercase">{t.itemInfoTag}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 text-xs leading-relaxed text-slate-600 flex flex-col gap-2">
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">🎮 {t.itemInfoDescTitle}</span>
                  {selectedItemInfo.description}
                </div>
                <div className="border-t border-slate-200/60 pt-2 text-emerald-800">
                  <span className="font-bold block mb-0.5">📋 {t.itemInfoExcelTitle}</span>
                  {selectedItemInfo.excelNote}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedItemInfo(null)}
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  {t.itemInfoClose}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CLUE VIEWER: CLASSROOM DESK MEMO NOTE */}
      <AnimatePresence>
        {examinedDeskNote && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-40 animate-fade-in" id="desk-clue-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-amber-50 border-2 border-amber-300 shadow-2xl rounded-2xl p-5 max-w-sm w-full relative flex flex-col gap-4 text-slate-800"
            >
              <div className="flex items-center justify-between border-b border-amber-200 pb-1.5">
                <span className="text-xs font-bold text-amber-800 uppercase flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {t.deskMemoTitle}
                </span>
                <button 
                  onClick={() => setExaminedDeskNote(false)}
                  className="text-amber-600 hover:text-amber-800 text-sm font-bold p-1 hover:bg-amber-100 rounded cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Cute yellow desk memo look and feel */}
              <div className="bg-yellow-50/70 border border-yellow-200 rounded-xl p-4 font-sans relative shadow-inner flex flex-col gap-2">
                <div className="absolute top-2 right-2 text-xs text-yellow-300 pointer-events-none select-none">✏️</div>
                <h5 className="text-xs font-extrabold text-amber-900 underline flex items-center gap-1">
                  {t.deskMemoSectionTitle}
                </h5>
                <ul className="text-xs text-amber-800 space-y-1.5 list-disc list-inside">
                  {t.deskMemoList.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
                <div className="border-t border-dashed border-amber-200 mt-2 pt-2 text-[10px] text-amber-700 font-mono text-right">
                  {t.deskMemoSign}
                </div>
              </div>

              <div className="flex justify-between items-center bg-amber-100/50 p-2 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                <span className="font-semibold">{t.deskMemoTipLabel}</span>
                <span>{t.deskMemoTipValue}</span>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setExaminedDeskNote(false)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  {t.deskMemoClose}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIDE QUEST NOTE READER POPUP */}
      <AnimatePresence>
        {activeSecretNote && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="side-quest-note-modal">
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="bg-pink-50 border-2 border-pink-300 shadow-2xl rounded-2xl p-6 max-w-sm w-full relative flex flex-col gap-4 text-slate-800"
            >
              <div className="flex items-center justify-between border-b border-pink-200 pb-2">
                <span className="text-xs font-black text-pink-700 uppercase tracking-widest flex items-center gap-1.5">
                  <span>💌</span>
                  {activeSecretNote === "square_note" && (lang === "ko" ? "AI 비밀 일기 #1" : "AI 秘密笔记 #1")}
                  {activeSecretNote === "classroom_note" && (lang === "ko" ? "AI 비밀 일기 #2" : "AI 秘密笔记 #2")}
                  {activeSecretNote === "locker_note" && (lang === "ko" ? "AI 비밀 일기 #3" : "AI 秘密笔记 #3")}
                  {activeSecretNote === "npc_note" && (lang === "ko" ? "AI 비밀 일기 #4" : "AI 秘密笔记 #4")}
                </span>
                <button 
                  onClick={() => {
                    setActiveSecretNote(null);
                    if (foundSecretNotes.length === 4 && !sideQuestVictoryShown) {
                      setSideQuestVictoryShown(true);
                    }
                  }}
                  className="text-pink-600 hover:text-pink-800 text-sm font-bold p-1 bg-pink-100 rounded cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="bg-white/90 border border-pink-100 p-4 rounded-xl shadow-inner font-sans relative flex flex-col gap-2 leading-relaxed text-xs text-rose-950 font-medium text-left">
                <div className="absolute top-2 right-2 text-rose-300 font-bold select-none text-base">✏️</div>
                <div className="italic border-l-2 border-pink-400 pl-3">
                  {activeSecretNote === "square_note" && t.noteContentSquare}
                  {activeSecretNote === "classroom_note" && t.noteContentClassroom}
                  {activeSecretNote === "locker_note" && t.noteContentLocker}
                  {activeSecretNote === "npc_note" && t.noteContentNPC}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setActiveSecretNote(null);
                    if (foundSecretNotes.length === 4 && !sideQuestVictoryShown) {
                      setSideQuestVictoryShown(true);
                    }
                  }}
                  className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  {lang === "ko" ? "확인 및 덮기" : "阅读完毕"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIDE QUEST COMPLETE VICTORY MODAL */}
      <AnimatePresence>
        {sideQuestVictoryShown && foundSecretNotes.length === 4 && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 z-[60] animate-fade-in" id="side-quest-victory-modal">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-rose-50 to-white border-3 border-pink-300 shadow-2xl rounded-3xl p-6 md:p-8 max-w-lg w-full relative flex flex-col gap-5 text-center text-slate-800"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300" />
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-4xl animate-bounce shadow-md">
                  🌸
                </div>
                <h3 className="text-xl font-black text-rose-900 leading-snug">
                  {t.sideQuestSuccessTitle}
                </h3>
                <span className="text-[10px] bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-bold border border-rose-200">
                  {lang === "ko" ? "★ 올 클리어 기념 ★" : "★ 支线大满贯完结纪念 ★"}
                </span>
              </div>

              {/* Side Quest Diary Completion Scroll */}
              <div className="bg-white/80 border border-pink-200 rounded-2xl p-4 text-left shadow-inner flex flex-col gap-3 max-h-[220px] overflow-y-auto custom-scrollbar">
                <p className="text-xs text-slate-700 leading-relaxed text-center font-bold px-1 select-text">
                  {t.sideQuestSuccessDesc}
                </p>
                
                <div className="border-t border-dashed border-pink-200 pt-2 flex flex-col gap-2">
                  <span className="text-[10px] text-pink-700 font-extrabold flex items-center gap-1">📖 {lang === "ko" ? "4장의 수집 일기 전문:" : "4本AI秘密笔记记录："}</span>
                  
                  <div className="text-[10px] text-slate-600 bg-rose-50/20 p-2.5 rounded-xl border border-rose-100/40">
                    <span className="font-extrabold text-pink-700 block mb-1">#1 {lang === "ko" ? "AI 드로잉 일지" : "AI 描绘世界的画笔"}</span>
                    {t.noteContentSquare}
                  </div>

                  <div className="text-[10px] text-slate-600 bg-rose-50/20 p-2.5 rounded-xl border border-rose-100/40">
                    <span className="font-extrabold text-pink-700 block mb-1">#2 {lang === "ko" ? "AI 수식 시뮬레이션" : "AI 与 Excel 的逻辑魔法"}</span>
                    {t.noteContentClassroom}
                  </div>

                  <div className="text-[10px] text-slate-600 bg-rose-50/20 p-2.5 rounded-xl border border-rose-100/40">
                    <span className="font-extrabold text-pink-700 block mb-1">#3 {lang === "ko" ? "AI 청춘의 문장들" : "AI 与人类共谱的青春情书"}</span>
                    {t.noteContentLocker}
                  </div>

                  <div className="text-[10px] text-slate-600 bg-rose-50/20 p-2.5 rounded-xl border border-rose-100/40">
                    <span className="font-extrabold text-pink-700 block mb-1">#4 {lang === "ko" ? "AI 캔버스 개발 일지" : "AI 是创意的放大器"}</span>
                    {t.noteContentNPC}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => setSideQuestVictoryShown(false)}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 font-extrabold text-white text-sm py-3.5 rounded-xl transition cursor-pointer shadow-lg shadow-pink-100/50"
                >
                  {lang === "ko" ? "게임으로 돌아가기 (놀이터 모드)" : "保留纪念并返回校园"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
