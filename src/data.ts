/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NPC, GameItem, ExcelRow } from "./types";
import schoolSquareImg from "./assets/images/school_square_1779794285350.png";
import classroomImg from "./assets/images/classroom_1779794303119.png";
import xiaoxiaoPortraitImg from "./assets/images/xiaoxiao_portrait_1779797457470.png";
import zhangPortraitImg from "./assets/images/zhang_portrait_1779798055409.png";
import wangPortraitImg from "./assets/images/wang_portrait_1779798202742.png";
import gameStartBgImg from "./assets/images/game_start_bg_1779800560471.png";

export { schoolSquareImg, classroomImg, xiaoxiaoPortraitImg, zhangPortraitImg, wangPortraitImg, gameStartBgImg };

export const GAME_NPCS: NPC[] = [
  {
    id: "xiaoxiao",
    name: "班长筱筱 (Xiaoxiao)",
    avatar: "🎒",
    role: "热心的班长",
    description: "活泼开朗。今天在帮老师分发资料，随身带了许多校园表单。",
    image: xiaoxiaoPortraitImg,
    dialogue: [
      "嗨！你也在找那张丢失的‘学生校园卡’吗？",
      "我刚才在广场的主樱花树下登记名册，似乎听到‘叮咚’一声脆响……",
      "唔，你可以去广场中央的树下、或者连椅和花坛缝隙里仔细瞧瞧，说不定卡就掉在那儿了！",
    ],
    solvedDialogue: [
      "太好啦！你已经找到校园卡了！快去教学楼教室，把卡刷在储物柜上，再输入四位密码就能拿到时光胶囊啦！",
      "祝你好运，有事随时来找我哦！",
    ],
    excelNote: "引导NPC：负责发放主线查找卡片任务，提供方位线索（广场花坛区域）。",
  },
  {
    id: "zhang",
    name: "学长张弛 (Senior Zhang)",
    avatar: "🚲",
    role: "酷酷的学长",
    description: "高年级学长，戴着耳机在车棚旁看书，对学校的各种传说非常了解。",
    image: zhangPortraitImg,
    dialogue: [
      "哟，学弟/学妹，这么急匆匆是在找什么？",
      "你是要在解开教室里那个‘老旧储物柜’的密码？哈哈，那个柜子可有历史了。",
      "提示你一下吧：密码是学校创立节日的日期（月和日）。我记得教室讲台上的黄色便签本上，就记着创立年和今天的日期，去看看吧！",
    ],
    solvedDialogue: [
      "厉害啊，连今天（5月26日）是创校周年纪念日都推算出来了。快打开柜子看看里面藏了什么宝贝吧！",
    ],
    excelNote: "解谜暗示NPC：给玩家指明密码来源（教室讲台便签 + 今天的周年日期 05-26）。",
  },
  {
    id: "wang",
    name: "宿管王阿姨 (Auntie Wang)",
    avatar: "🔑",
    role: "和蔼的王阿姨",
    description: "负责整栋教学楼和生活区的起居，手里总拿着一串钥匙，很疼爱学生。",
    image: wangPortraitImg,
    dialogue: [
      "孩子，今天风大，找东西时可得小心脚下啊。",
      "刚才好像是有个蓝色的卡片夹在连椅下的落叶堆里，不知是不是你要找的卡？",
      "教学大楼的教室门我已经帮你敞开了，拿到卡后就进去吧！注意走廊里别乱跑呀。",
    ],
    solvedDialogue: [
      "这就对啦，丢了的东西找回来最踏实。去教室看看吧，注意别把密码忘在脑后哦！",
    ],
    excelNote: "背景辅助NPC：强化查找卡片线索，并解锁教室场景限制（剧情合理化）。",
  },
];

export const GAME_ITEMS: GameItem[] = [
  {
    id: "campus_card",
    name: "学生校园卡 (Campus Card)",
    icon: "💳",
    description: "带有芯片的蓝色卡片。上面写着你的名字。打开储物柜刷卡机必需品。",
    excelNote: "关键道具：在广场花坛灌木丛找到，教室储物柜交互时作为前置解锁条件。",
  },
  {
    id: "passcode_memo",
    name: "讲台便签 (Memo Note)",
    icon: "📝",
    description: "课桌上泛黄的便签，写着：‘校庆纪念日在5月。今天是2026年5月26日——创校纪念日。储物柜密码正是这个好日子：[月][日]，共四位数字。’",
    excelNote: "解密线索：放在教室课桌上，可重复查看，暗示最终数字是 0526。",
  },
  {
    id: "graduation_capsule",
    name: "毕业时光胶囊 (Time Capsule)",
    icon: "💎",
    description: "斑驳的金属盒子，里面装着一封满载青春寄语的信和一些泛黄的卡牌。",
    excelNote: "关卡奖励：储物柜正确输入 0526 后弹出。通关硬指标。",
  },
];

export const EXCEL_BLUEPRINT_ROWS: ExcelRow[] = [
  {
    group: "游戏美术资产 (Assets)",
    field: "校园主广场背景图 (Square BG)",
    type: "图片链接 / CDN",
    value: "school_square.png",
    description: "2D 像素卡通风格学校中庭，明亮治愈、带樱花树",
    formula: '=IMAGE("{APP_URL}school_square.png")',
  },
  {
    group: "游戏美术资产 (Assets)",
    field: "教室内部背景图 (Classroom BG)",
    type: "图片链接 / CDN",
    value: "classroom.png",
    description: "斜射阳光，整洁桌椅、带储物柜柜体",
    formula: '=IMAGE("{APP_URL}classroom.png")',
  },
  {
    group: "游戏剧情机制 (Narrative)",
    field: "筱筱 (NPC1) 基础对话",
    type: "对话文本段",
    value: "嗨！听到叮咚一声，也许掉在樱花树下了...",
    description: "班长筱筱，在广场中心给玩家指点迷津",
    formula: "A1 & \" 筱筱提示我：\" & B12",
  },
  {
    group: "游戏剧情机制 (Narrative)",
    field: "学长 (NPC2) 密码线索",
    type: "线索对话",
    value: "密码格式是校庆日：月+日。今天是个好日子。",
    description: "学长提示，触发教室解谜灵感",
    formula: "A2 & \" 学长提示：\" & B13",
  },
  {
    group: "游戏剧情机制 (Narrative)",
    field: "阿姨 (NPC3) 辅助提示",
    type: "线索对话",
    value: "有个蓝卡夹在长椅落叶里，去瞧瞧吧。",
    description: "宿管阿姨，加强广场搜寻的确定性",
    formula: "A3 & \" 阿姨提示：\" & B14",
  },
  {
    group: "游戏关卡谜题 (Puzzle)",
    field: "校园卡触发开关 (Card Trigger)",
    type: "道具布尔值",
    value: "hasFoundCard === true",
    description: "判断玩家背包是否持有 'campus_card'，决定能否点击触刷卡板",
    formula: '=IF(COUNTIF(Backpack, "校园卡")>0, "解锁刷卡", "需要校园卡")',
  },
  {
    group: "游戏关卡谜题 (Puzzle)",
    field: "储物柜箱密码 (Passcode)",
    type: "数值代码",
    value: "0526",
    description: "通关密码，取自5月26日。输入正确弹出时光胶囊",
    formula: '=IF(A21="0526", "通关成功！", "密码错误")',
  },
];
