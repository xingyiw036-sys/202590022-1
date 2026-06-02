/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SceneId = "square" | "classroom";

export interface NPC {
  id: string;
  name: string;
  avatar: string;
  role: string;
  description: string;
  dialogue: string[];
  solvedDialogue: string[];
  excelNote: string;
  image?: string;
}

export interface GameItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  excelNote: string;
}

export interface GameState {
  currentScene: SceneId;
  inventory: string[]; // item IDs
  hasFoundCard: boolean;
  hasSolvedLocker: boolean;
  npcDialogueProgress: Record<string, number>; // npcId -> dialog Index
  activeNPCDialogue: string | null; // NPC ID currently talking
  examinedDesk: boolean;
  gameStatus: "intro" | "playing" | "victory";
}

// Data structures for Google Sheets export
export interface ExcelRow {
  group: string;
  field: string;
  type: string;
  value: string;
  description: string;
  formula: string;
}
