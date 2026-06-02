/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = "zh" | "ko";

export interface TranslationSet {
  // Brand & Nav
  brandTitle: string;
  brandSub: string;
  brandFooter: string;
  excelTitle: string;
  excelFormulaBadge: string;
  navIntro: string;
  navPlay: string;
  navExcel: string;
  navSupport: string;

  // Intro Screen
  introTag: string;
  introTitle: string;
  introDesc: string;
  introPlayHeader: string;
  introPlaySub: string;
  introPlayDesc: string;
  introPlayBtn: string;
  introExcelHeader: string;
  introExcelSub: string;
  introExcelDesc: string;
  introExcelBtn: string;
  introSpecType: string;
  introSpecScene: string;
  introSpecTasks: string;

  // Scene Info & Toolbar
  sceneLabel: string;
  sceneSquareName: string;
  sceneClassroomName: string;
  sceneSquareSub: string;
  sceneClassroomSub: string;
  sceneSquareTag: string;
  sceneClassroomTag: string;
  sceneInstruction: string;
  sceneSwitchBtn: string;
  retryTooltip: string;

  // Mission Sidebar
  missionTitle: string;
  missionProgressActive: string;
  missionProgressFinished: string;
  missionNpcStep: string;
  missionCardStep: string;
  missionCardStepTrue: string;
  missionCardStepFalse: string;
  missionMemoStep: string;
  missionMemoStepTrue: string;
  missionMemoStepFalse: string;
  missionLockerStep: string;
  missionLockerStepTrue: string;
  missionLockerStepFalse: string;
  backpackTitle: string;
  backpackSub: string;
  backpackEmpty: string;
  backpackItemTagCard: string;
  backpackItemTagMemo: string;
  backpackItemTagCapsule: string;
  excelCenterBtn: string;

  // Dialogue Overlay
  dialogueNarrativeTag: string;
  dialoguePageLabel: string;
  dialogueNextBtn: string;
  dialogueEndBtn: string;

  // Locker padlock modal
  lockerModalTitle: string;
  lockerModalCheckSub: string;
  lockerModalCardSuccess: string;
  lockerModalCardHint: string;
  lockerModalCardMissing: string;
  lockerModalSwipeBtn: string;
  lockerModalLockerSub: string;
  lockerModalErrorFeedback: string;
  lockerModalSuccessFeedback: string;
  lockerModalReadyFeedback: string;
  lockerModalCancel: string;
  lockerModalSubmit: string;

  // Item info modal
  itemInfoTag: string;
  itemInfoDescTitle: string;
  itemInfoExcelTitle: string;
  itemInfoClose: string;

  // Desk memo modal
  deskMemoTitle: string;
  deskMemoSectionTitle: string;
  deskMemoTipLabel: string;
  deskMemoTipValue: string;
  deskMemoClose: string;
  deskMemoSign: string;
  deskMemoList: string[];

  // Victory screen
  victoryTitle: string;
  victoryStatus: string;
  victoryEnvelopeTitle: string;
  victoryEnvelopeDate: string;
  victoryEnvelopeBody: string;
  victoryStatItems: string;
  victoryStatNpcs: string;
  victoryStatPasscode: string;
  victoryStayBtn: string;
  victoryExcelBtn: string;

  // Excel Hub Sheet Screen
  excelBannerTag: string;
  excelBannerTitle: string;
  excelBannerDesc: string;
  excelBannerFormatLabel: string;
  excelBannerFormatValue: string;
  excelSection1Title: string;
  excelSection1Desc: string;
  excelSquareBgLabel: string;
  excelClassroomBgLabel: string;
  excelCopyFormulaBtn: string;
  excelCopiedStatus: string;
  excelPicDetailsLabel: string;
  excelPreviewBtnText: string;
  excelSection2Title: string;
  excelSection2Desc: string;
  excelSection2NpcBtn: string;
  excelSection2ItemBtn: string;
  excelSection2PreviewTitle: string;
  excelSection2AlertNpc: string;
  excelSection2AlertItem: string;

  // Interactive Live Formula Simulator
  simTitle: string;
  simSub: string;
  simDesc: string;
  simColAHeader: string;
  simColBHeader: string;
  simColCHeader: string;
  simLabelA1: string;
  simLabelB1: string;
  simOptionTrue: string;
  simOptionFalse: string;
  simMsgMissingCard: string;
  simMsgUnlockSuccess: string;
  simMsgLockerLocked: string;
  simFormulaLabel: string;

  // Game static texts (NPCs)
  npcXiaoxiaoName: string;
  npcXiaoxiaoRole: string;
  npcXiaoxiaoDesc: string;
  npcXiaoxiaoDialogue: string[];
  npcXiaoxiaoSolved: string[];
  npcXiaoxiaoNote: string;

  npcZhangName: string;
  npcZhangRole: string;
  npcZhangDesc: string;
  npcZhangDialogue: string[];
  npcZhangSolved: string[];
  npcZhangNote: string;

  npcWangName: string;
  npcWangRole: string;
  npcWangDesc: string;
  npcWangDialogue: string[];
  npcWangSolved: string[];
  npcWangNote: string;

  // Game static texts (Items)
  itemCardName: string;
  itemCardDesc: string;
  itemCardNote: string;

  itemMemoName: string;
  itemMemoDesc: string;
  itemMemoNote: string;

  itemCapsuleName: string;
  itemCapsuleDesc: string;
  itemCapsuleNote: string;

  // Prompt indicators & hover states
  hudEnterLabel: string;
  hudExitLabel: string;
  sparkleHoverText: string;

  // Side Quest
  sideQuestName: string;
  sideQuestTriggerCond: string;
  sideQuestFlow: string;
  sideQuestSuccessTitle: string;
  sideQuestSuccessDesc: string;
  noteLocationSquare: string;
  noteLocationClassroom: string;
  noteLocationLocker: string;
  noteLocationNPC: string;
  noteContentSquare: string;
  noteContentClassroom: string;
  noteContentLocker: string;
  noteContentNPC: string;
}

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  zh: {
    brandTitle: "校园冒险 & Excel 制表联合原型器",
    brandSub: "2D 休闲解密 + 轻度解密日常线索联动",
    brandFooter: "校园解谜企划组 🌸 | Google Sheets 完美兼容版",
    excelTitle: "游戏美术资产 (Assets)",
    excelFormulaBadge: "Google Sheets 电子表格公式",
    navIntro: "企划介绍",
    navPlay: "原型试玩 (Play)",
    navExcel: "Excel 策划资产 (GDD)",
    navSupport: "双语支持 / 한국어 지원",

    introTag: "明亮、治愈、校园日常解谜原型",
    introTitle: "《校园大冒险：消失的卡夹》",
    introDesc: "这是一款 2D 休闲解谜与互动叙事原型模拟系统。玩家需要在充满阳光与樱花瓣的校园主广场以及整洁的书香班级内，通过对话和寻找线索，开启神秘毕业胶囊。",
    introPlayHeader: "交互式 2D 体验跑通",
    introPlaySub: "在线试玩版",
    introPlayDesc: "体验完整的游戏性闭环。探索校园广场和教室、和晓筱班长对话、探索花坛拾取校园卡，并推算出今天的校庆校历密码（0526）以解锁毕业大铁柜！",
    introPlayBtn: "开始游戏模拟挑战（解密开仓）",
    introExcelHeader: "Excel 策划制表联动",
    introExcelSub: "一键复制配表",
    introExcelDesc: "游戏所有的2D唯美图片链接、NPC对话文本流、以及 Excel 可直接执行的逻辑嵌套 IF 公式，均已规范转换和打包。点击复制后可直接贴入您的 Google 电子表格中直接显示图片与算子。",
    introExcelBtn: "复制 Excel 绘图公式与剧情配表",
    introSpecType: "游戏类型：2D 休闲冒险 + 轻度解密",
    introSpecScene: "关卡场景：校园主广场 + 高一A班教室",
    introSpecTasks: "四大任务：拿学生证、3次NPC对话、查阅便签、解锁密码",

    sceneLabel: "场景",
    sceneSquareName: "场景 A：校园主广场",
    sceneClassroomName: "场景 B：高一A班教室",
    sceneSquareSub: "户外冒险",
    sceneClassroomSub: "室内解谜",
    sceneSquareTag: "校园主广场",
    sceneClassroomTag: "教室内部",
    sceneInstruction: "点击场景中的元素或NPC进行对话交互",
    sceneSwitchBtn: "切换到",
    retryTooltip: "重新游玩",

    missionTitle: "当前关卡进度",
    missionProgressActive: "正在进行",
    missionProgressFinished: "通关成功",
    missionNpcStep: "拜访校园 NPC",
    missionCardStep: "搜寻我的校园卡",
    missionCardStepTrue: "已收集",
    missionCardStepFalse: "未找到",
    missionMemoStep: "查阅讲台上的便签",
    missionMemoStepTrue: "已查看",
    missionMemoStepFalse: "未发现",
    missionLockerStep: "破译储物柜密码",
    missionLockerStepTrue: "已解开",
    missionLockerStepFalse: "未解开",
    backpackTitle: "玩家背包 (Inventory)",
    backpackSub: "点击道具看原型设计说明",
    backpackEmpty: "背包里空荡荡的，去探索吧！",
    backpackItemTagCard: "校园卡",
    backpackItemTagMemo: "便签",
    backpackItemTagCapsule: "时光胶囊",
    excelCenterBtn: "查看 & 复制 Google Excel 设计表",

    dialogueNarrativeTag: "剧情对话",
    dialoguePageLabel: "第",
    dialogueNextBtn: "继续对话",
    dialogueEndBtn: "结束并去寻宝",

    lockerModalTitle: "老旧储物柜密码锁",
    lockerModalCheckSub: "前置解锁：刷卡验证机",
    lockerModalCardSuccess: "校园卡刷卡验证成功 (激活键盘)",
    lockerModalCardHint: "目前锁闭状态，请从背包拖拽或点击下方按钮连接校园卡",
    lockerModalCardMissing: "你的专属校园卡好像还在主广场，快去寻找！",
    lockerModalSwipeBtn: "【点击刷校园卡💳】",
    lockerModalLockerSub: "请转动密码盘推导 4 位数校庆纪念日：",
    lockerModalErrorFeedback: "密码不正确，校庆可是 5 月底呀！",
    lockerModalSuccessFeedback: "咔嚓！锁开了！时光胶囊正在弹出！",
    lockerModalReadyFeedback: "READY: 输入级校庆代码",
    lockerModalCancel: "取消",
    lockerModalSubmit: "尝试解锁",

    itemInfoTag: "游戏内道具注册",
    itemInfoDescTitle: "道具描述：",
    itemInfoExcelTitle: "Excel 关卡原型映射规范：",
    itemInfoClose: "我知道了",

    deskMemoTitle: "仔细观察：讲台桌角的泛黄便签本",
    deskMemoSectionTitle: "校历备忘记事本：",
    deskMemoTipLabel: "密码提示：",
    deskMemoTipValue: "[2026年5月26日] 即 0526",
    deskMemoClose: "收起便签目击",
    deskMemoSign: "—— 班委会生活部 敬启",
    deskMemoList: [
      "校庆筹备工作正在热火天天地展开~",
      "今天（2026年5月26日）正是我们弘历高级中学创校纪念日。",
      "储物大铁柜为了配合活动，临时密码改为了【创校校庆日的4位数字(月和日)】。",
      "格式说明：比如 1月1日 就是 0101。"
    ],

    victoryTitle: "《校园大冒险》恭喜通关！",
    victoryStatus: "成功解密！老楼旧储物箱卡扣弹开了！",
    victoryEnvelopeTitle: "已取出：毕业时光胶囊 (Time Capsule)",
    victoryEnvelopeDate: "5月26日 留",
    victoryEnvelopeBody: "“致未来的自己：当你开启这个盒子时，说明你已经成功破解了 0526 校庆密码锁，找到了我的校园卡。青春总是在做一些冒失却快乐的事：在主广场为了找卡在灌木丛翻花坛、去宿管阿姨那套近乎拿到教室钥匙、在上课铃前抄班长筱筱写的备忘便签……希望你能永远记住这温馨美好的一天，带着明亮治愈的笑容，继续开启人生的精彩冒险吧！”",
    victoryStatItems: "探索道具",
    victoryStatNpcs: "拜访NPC",
    victoryStatPasscode: "密码破译",
    victoryStayBtn: "留在游戏内游览",
    victoryExcelBtn: "去获取 Excel 配表 & 单元格图片公式",

    excelBannerTag: "校园全流程策划原型辅助面板",
    excelBannerTitle: "Google AI 全要素资产 & Google Excel 数据联动中心",
    excelBannerDesc: "本工具专为策划原型设计。不仅可以体验精美的游戏跑通闭环，更可以直接将策划配置、剧情分支，以及实时画出的【明亮治愈系2D场景配图】直接嵌入您的 Google 电子表格里！",
    excelBannerFormatLabel: "表格联动格式",
    excelBannerFormatValue: "Google Sheets / Excel",
    excelSection1Title: "第一步：2D 校园场景实景图与 Google `=IMAGE` 单元格公式",
    excelSection1Desc: "根据您的需求，我们使用 Google AI 绘图引擎定制了完美适配《校园大冒险》的卡通风景。下方是高保真实时独立预览链接。您可以一键复制 Excel 独占的 `=IMAGE()` 公式，将其直接贴在 Google Excel 任何单元格内，Google Sheets 会自动在该行中直绘并渲染该高清游戏画质！",
    excelSquareBgLabel: "场景 A：主广场 (Courtyard)",
    excelClassroomBgLabel: "场景 B：老教室 (Classroom)",
    excelCopyFormulaBtn: "复制公式",
    excelCopiedStatus: "已复制!",
    excelPicDetailsLabel: "2D卡通治愈、含特色背景板",
    excelPreviewBtnText: "浏览器预览",
    excelSection2Title: "第二步：数字原型注册与剧情配表一键复制 (Excel Compatible)",
    excelSection2Desc: "为了将本游戏的数据结构无缝转移到您的 Excel 模拟方案中，我们提供了纯正的 GDD (游戏策划设计案) 数据模组。点击下方复制后，能保留整齐的格子与对齐结构粘贴进 Google Sheets 单元格中。",
    excelSection2NpcBtn: "复制【NPC对话台本配表】(TAB对齐格式)",
    excelSection2ItemBtn: "复制【游戏道具配置注册表】(TAB对齐格式)",
    excelSection2PreviewTitle: "📋 配表在 EXCEL / GOOGLE SHEETS 的对齐结构示意 (Preview)",
    excelSection2AlertNpc: "📢 NPC剧本配表已成功转为 Excel TAB/TSV格式 复制入剪贴板！ \n现在直接打开 Google Sheets 或 Excel 空白页，按下 Ctrl+V 即可得到完美对齐的数据表格！",
    excelSection2AlertItem: "📢 道具设计注册表已成功转为 Excel TAB/TSV格式 复制入剪贴板！ \n现在可以直接粘贴进你的 Excel 或 Google 表格里啦！",

    simTitle: "逻辑演算栏：",
    simSub: "Excel 实时模拟器",
    simDesc: "在利用 Excel 做解谜原型时，我们会用「IF函数逻辑」来跑模拟。这下面是一个实战 Google Excel 单元格互动框架，可以测试你对储物柜逻辑的运算：",
    simColAHeader: "A (键入数值)",
    simColBHeader: "B (校园卡就绪)",
    simColCHeader: "C (最终逻辑公式渲染)",
    simLabelA1: "A1: 更改四位密码",
    simLabelB1: "B1: 背包布尔值",
    simOptionTrue: "TRUE (持有)",
    simOptionFalse: "FALSE (未持)",
    simMsgMissingCard: "❌ 闪灯：缺校园卡刷卡",
    simMsgUnlockSuccess: "🎉 哇！成功解锁，开仓！",
    simMsgLockerLocked: "🔒 密码错误",
    simFormulaLabel: "单元格 C1 嵌套公式为：",

    npcXiaoxiaoName: "班长筱筱 (Xiaoxiao)",
    npcXiaoxiaoRole: "热心的班长",
    npcXiaoxiaoDesc: "活泼开朗。今天在帮老师分发资料，随身带了许多校园表单。",
    npcXiaoxiaoDialogue: [
      "嗨！你也在找那张丢失的‘学生校园卡’吗？",
      "我刚才在广场的主樱花树下登记名册，似乎听到‘叮咚’一声脆响……",
      "唔，你可以去广场中央的树下、或者连椅和花坛缝隙里仔细瞧瞧，说不定卡就掉在那儿了！"
    ],
    npcXiaoxiaoSolved: [
      "太好啦！你已经找到校园卡了！快去教学楼教室，把卡刷在储物柜上，再输入四位密码就能拿到时光胶囊啦！",
      "祝你好运，有事随时来找我哦！"
    ],
    npcXiaoxiaoNote: "引导NPC：负责发放主线查找卡片任务，提供方位线索（广场花坛区域）。",

    npcZhangName: "学长张弛 (Senior Zhang)",
    npcZhangRole: "酷酷的学长",
    npcZhangDesc: "高年级学长，戴着耳机在车棚旁看书，对学校的各种传说非常了解。",
    npcZhangDialogue: [
      "哟，学弟/学妹，这么急匆匆是在找什么？",
      "你是要在解开教室里那个‘老旧储物柜’的密码？哈哈，那个柜子可有历史了。",
      "提示你一下吧：密码是学校创立节日的日期（月和日）。我记得教室讲台上的黄色便签本上，就记着创立年和今天的日期，去看看吧！"
    ],
    npcZhangSolved: [
      "厉害啊，连今天（5月26日）是创校周年纪念日都推算出来了。快打开柜子看看里面藏了什么宝贝吧！"
    ],
    npcZhangNote: "解谜暗示NPC：给玩家指明密码来源（教室讲台便签 + 今天的周年日期 05-26）。",

    npcWangName: "宿管王阿姨 (Auntie Wang)",
    npcWangRole: "和蔼的王阿姨",
    npcWangDesc: "负责整栋教学楼和生活区的起居，手里总拿着一串钥匙，很疼爱学生。",
    npcWangDialogue: [
      "孩子，今天风大，找东西时可得小心脚下啊。",
      "刚才好像是有个蓝色的卡片夹在连椅下的落叶堆里，不知是不是你要找的卡？",
      "教学大楼的教室门我已经帮你敞开了，拿到卡后就进去吧！注意走廊里别乱跑呀。"
    ],
    npcWangSolved: [
      "这就对啦，丢了的东西找回来最踏实。去教室看看吧，注意别把密码忘在脑后哦！"
    ],
    npcWangNote: "背景辅助NPC：强化查找卡片线索，并解锁教室场景限制（剧情合理化）。",

    itemCardName: "学生校园卡",
    itemCardDesc: "带有芯片的蓝色卡片。上面写着你的名字。打开储物柜刷卡机必需品。",
    itemCardNote: "关键道具：在广场花坛灌木丛找到，教室储物柜交互时作为前置解锁条件。",

    itemMemoName: "讲台便签",
    itemMemoDesc: "课桌上泛黄的便签，写着：‘校庆纪念日在5月。今天是2026年5月26日——创校纪念日。储物柜密码正是这个好日子：[月][日]，共四位数字。’",
    itemMemoNote: "解密线索：放在教室课桌上，可重复查看，暗示最终数字是 0526。",

    itemCapsuleName: "毕业时光胶囊",
    itemCapsuleDesc: "斑驳的金属盒子，里面装着一封满载青春寄语的信和一些泛黄的卡牌。",
    itemCapsuleNote: "关卡奖励：储物柜正确输入 0526 后弹出。通关硬指标。",

    hudEnterLabel: "进入教学楼（教室内）",
    hudExitLabel: "回到校园广场",
    sparkleHoverText: "好像有蓝色东西闪烁？",

    // Side Quest
    sideQuestName: "AI 秘密日记搜寻记",
    sideQuestTriggerCond: "触发条件：主线关卡完全通关（获得时光胶囊）后开启",
    sideQuestFlow: "任务流程：在校园内搜寻 4 张散落的【AI 秘密笔记】，拼凑完整的特制开发日志。",
    sideQuestSuccessTitle: "🌸 支线完美达成：AI同行的温柔秘密！",
    sideQuestSuccessDesc: "恭喜你收集全了所有 4 张 AI 秘密笔记！你不仅破解了储物柜，更解开了本游戏原型借助 AI 独立设计、制作与双语对译的温情彩蛋！因为你的创意与 AI 的共舞，校园里才有了这颗独特的时光胶囊。未来我们更精彩的地方再见！",
    noteLocationSquare: "校园广场：广场中央大樱花树下的粉色信封",
    noteLocationClassroom: "教室内部：教室内黑板右侧角落悄悄发光的纸条",
    noteLocationLocker: "储物柜底：已经解开扣锁的铁皮柜第 2 格抽屉深处",
    noteLocationNPC: "随行班长：主线完成后，再次找到班长筱筱交谈获得",
    noteContentSquare: "「AI 生成日常：今天尝试用 AI 绘制了飘落的樱花花瓣，微风吹拂的质感竟然是由去噪强度和模糊算子决定的！技术让虚像具备了温度，真是太治愈、太温柔了~」",
    noteContentClassroom: "「AI 设计密码：班级的铁皮储物柜，居然被我们和策划用 Excel 嵌套 nested IF 函数跑通了逻辑判定！这感觉像极了复古时代工程师用逻辑门堆砌出的第一个电子玩具。用最微小的代码，实现最有趣的温情。」",
    noteContentLocker: "「AI 剧情秘密：其实时光胶囊里的那封信，是 AI 和故事设计者一起手拉手润色的青春寄语。AI 提供了沧桑岁月感的句段结构，人类倾注了真诚的、不会消退的高中回忆。这也是一种完美的跨次元协力吧！」",
    noteContentNPC: "「AI 开发者彩蛋：恭喜你拼凑出所有的日记！本游戏的所有美术背景、配表直接导出以及双语转换功能，都是在 AI 的实时协作下，在短短几小时内诞生的极速原型。有你在，有 AI 在，任何天马行空的灵感都能在这里变成活生生的乐园！」"
  },
  ko: {
    brandTitle: "캠퍼스 모험 & Excel 기획 연동 프로토타이퍼",
    brandSub: "2D 캐주얼 어드벤처 + 미니 퍼즐 데일리 퀘스트 시뮬레이션",
    brandFooter: "캠퍼스 퍼즐 기획 팀 🌸 | Google Sheets 완벽 호환 버전",
    excelTitle: "게임 그래픽 리소스 (Assets)",
    excelFormulaBadge: "Google Sheets 전용 스프레드시트 공식",
    navIntro: "기획 소개",
    navPlay: "프로토타입 플레이 (Play)",
    navExcel: "Excel 기획 자산 (GDD)",
    navSupport: "한국어 지원 / 双语支持",

    introTag: "밝고 따뜻한 힐링 캠퍼스 일상 퍼즐 프로토타입",
    introTitle: "《캠퍼스 대모험: 사라진 카드 홀더》",
    introDesc: "이 프로그램은 2D 캐주얼 모험과 인터랙티브 스토리 프로토타입 설계 및 시뮬레이터입니다. 플레이어는 벚꽃 잎이 휘날리는 아름다운 캠퍼스 광장과 교실을 탐험하고, NPC와 대화하고 단서를 수집하여 비밀스러운 졸업 타임캡슐을 열어야 합니다.",
    introPlayHeader: "인터랙티브 2D 플레이 테스트",
    introPlaySub: "체험판 온라인 플레이",
    introPlayDesc: "완전한 게임 플레이 루프를 경험해보세요. 캠퍼스 광장과 교실 탐색, 반장 샤오샤오와의 대화, 화단에서 학생증 카드 줍기, 그리고 오늘 개교 기념일 날짜(0526)를 유추하여 보관함의 비밀번호를 맞춰야 합니다!",
    introPlayBtn: "게임 시뮬레이션 시작하기 (보관함 잠금 해제)",
    introExcelHeader: "Excel 기획 데이터 연동",
    introExcelSub: "원클릭 기획 양식 복사",
    introExcelDesc: "게임에 사용된 2D 고화질 배경 일러스트 링크, NPC 대사 시나리오 데이터, 그리고 Google Sheets 셀에 직접 적용 가능한 중첩 IF 논리 수식이 표준화 포맷으로 빌드되었습니다. 클릭하여 쉽게 복사-붙여넣기할 수 있습니다.",
    introExcelBtn: "Excel 이미지 공식 및 퀘스트 시트 복사하기",
    introSpecType: "게임 장르: 2D 캐주얼 모험 + 미니 퍼즐",
    introSpecScene: "스테이지 배경: 캠퍼스 광장 + 고1 A반 교실",
    introSpecTasks: "4대 퀘스트: 학생증 획득, NPC 3인과 대화, 교탁 쪽지 확인, 암호 해독",

    sceneLabel: "스테이지",
    sceneSquareName: "스테이지 A: 캠퍼스 메인 광장",
    sceneClassroomName: "스테이지 B: 고1 A반 교실",
    sceneSquareSub: "야외 모험",
    sceneClassroomSub: "교실 추리",
    sceneSquareTag: "캠퍼스 메인 광장",
    sceneClassroomTag: "교실 내부",
    sceneInstruction: "화면의 요소나 캐릭터(NPC)를 클릭하면 대화 및 상호작용이 시작됩니다",
    sceneSwitchBtn: "이동하기:",
    retryTooltip: "처음부터 다시 하기",

    missionTitle: "스테이지 완료 진척도",
    missionProgressActive: "진행 중",
    missionProgressFinished: "클리어 완료! 🎉",
    missionNpcStep: "캠퍼스 NPC와 대화",
    missionCardStep: "사라진 캠퍼스 카드 찾기",
    missionCardStepTrue: "획득함",
    missionCardStepFalse: "찾지 못함",
    missionMemoStep: "교탁의 노란 쪽지 확인",
    missionMemoStepTrue: "확인함",
    missionMemoStepFalse: "바라보지 않음",
    missionLockerStep: "보관함 암호 입력",
    missionLockerStepTrue: "해제함",
    missionLockerStepFalse: "잠겨있음",
    backpackTitle: "인벤토리 (Inventory)",
    backpackSub: "아이템을 선택해 기획 매핑 규칙을 확인하세요",
    backpackEmpty: "가방이 텅 비어 있습니다. 탐색을 시작하세요!",
    backpackItemTagCard: "캠퍼스 카드",
    backpackItemTagMemo: "쪽지",
    backpackItemTagCapsule: "타임캡슐",
    excelCenterBtn: "Google Excel 기획 시트 확인 및 복사하기",

    dialogueNarrativeTag: "스토리 다이얼로그",
    dialoguePageLabel: "페이지",
    dialogueNextBtn: "다음 대사",
    dialogueEndBtn: "대화 종료하고 탐색하기",

    lockerModalTitle: "낡은 캐비닛 번호식 카드리더 락",
    lockerModalCheckSub: "사전 인증: RFID 카드 스와이프",
    lockerModalCardSuccess: "학생용 카드 리더 검증 성공! (키패드 활성화)",
    lockerModalCardHint: "카드가 스와이프되지 않았습니다. 학생증 카드를 클릭하여 탭하세요.",
    lockerModalCardMissing: "당신의 캠퍼스 카드가 아직 야외 광장에 떨어진 것 같습니다. 먼저 찾아오세요!",
    lockerModalSwipeBtn: "【학생용 카드 태깅하기 💳】",
    lockerModalLockerSub: "다이얼을 돌려 4자리 개교기념일 비밀번호를 입력하세요:",
    lockerModalErrorFeedback: "비밀번호가 올바르지 않습니다! 개교 기념일은 5월 말입니다.",
    lockerModalSuccessFeedback: "철컥! 보관함 잠금이 열리고 타임캡슐이 팝업되었습니다!",
    lockerModalReadyFeedback: "READY: 개교 기념일 코드 대기중",
    lockerModalCancel: "취소",
    lockerModalSubmit: "암호 입력하기",

    itemInfoTag: "게임 데이터 리소스 등록",
    itemInfoDescTitle: "아이템 상세:",
    itemInfoExcelTitle: "Excel 수식 및 논리 연동 규격:",
    itemInfoClose: "메모 닫기",

    deskMemoTitle: "교탁 위를 유심히 살핀다: 빛바랜 노란 쪽지 예보",
    deskMemoSectionTitle: "캠퍼스 요람 메모 수첩:",
    deskMemoTipLabel: "비밀번호 힌트:",
    deskMemoTipValue: "[2026년 5月 26日] 즉, 0526입니다",
    deskMemoClose: "쪽지 내려놓기",
    deskMemoSign: "—— 학급 자치회 생활체육부 올림",
    deskMemoList: [
      "학교 창립 축제 준비가 한창입니다~",
      "오늘 (2026년 5월 26일)은 바로 우리 학교 창립 기념일입니다.",
      "안전상의 조치로 교실 철제 보관함 임시 암호가 【개교기념일의 4자리 숫자(월과 일)】로 변경되었습니다.",
      "예시: 1월 1일인 경우 0101로 입력해주시면 됩니다."
    ],

    victoryTitle: "《캠퍼스 대모험》 스테이지 완료!",
    victoryStatus: "암호 매트릭스 해독 성공! 타임캡슐 박스가 열렸습니다!",
    victoryEnvelopeTitle: "핵심 보상: 졸업 타임캡슐 (Time Capsule)",
    victoryEnvelopeDate: "5월 26일 작성",
    victoryEnvelopeBody: "“미래의 나에게: 이 타임캡슐 상자를 열었다니, 0526 개교 기념일 비밀번호를 맞추고 내 학생증 카드를 무사히 찾았구나! 돌이켜보면 학창 시절은 영원히 덤벙대지만 가장 찬란했던 매일이었어. 광장 꽃밭을 뒤척이며 카드를 찾고, 친절한 왕 이모님께 말을 건네 교실을 열고, 수업 종이 치기 전 샤오샤오의 교탁 노트를 컨닝하고... 이 포근하고 눈부신 하루의 향기를 영원히 가슴 속에 품어줘. 늘 밝게 빛나는 힐링의 미소를 잃지 않기를!”",
    victoryStatItems: "아이템 탐색",
    victoryStatNpcs: "NPC 인터뷰",
    victoryStatPasscode: "암호 크랙",
    victoryStayBtn: "클리어 화면에 머무르기",
    victoryExcelBtn: "Excel 시나리오 시트 연동 센터로 이동하기",

    excelBannerTag: "게임 빌드 데이터 연동 어시스턴트",
    excelBannerTitle: "Google AI 리소스 패키지 & Google Excel 연동 컨트롤러",
    excelBannerDesc: "이 도구는 기획 프로토타입 작성 및 파라미터 매핑을 위해 준비되었습니다. 인게임 플레이 루프를 디버깅할 수 있을 뿐만 아니라 한글과 중국어로 번역된 아름다운 일러스트를 Google Sheets의 `=IMAGE()` 셀에 완벽하게 박아넣을 수 있습니다!",
    excelBannerFormatLabel: "지원 파일 포맷",
    excelBannerFormatValue: "Google Sheets / MS Excel 공용",
    excelSection1Title: "1단계: 2D 수채화풍 캠퍼스 일러스트와 Google `=IMAGE` 셀 수식 연결",
    excelSection1Desc: "Google AI 이미지 생성 모델 엔진을 활용해 제작된 '캠퍼스 모험' 전용 16:9 와이드 일러스트 공식입니다. 아래의 수식을 드래그 복사하여 실제 Google 스프레드시트 셀에 입력해보세요. 번역 완료된 한글 주소와 함께 실제 HD 해상도 이미지가 셀에 가득히 채워집니다!",
    excelSquareBgLabel: "배경 A: 학교 메인 광장 (Courtyard)",
    excelClassroomBgLabel: "배경 B: 낡은 교실 (Classroom Inside)",
    excelCopyFormulaBtn: "공식 복사",
    excelCopiedStatus: "클립보드 저장!",
    excelPicDetailsLabel: "2D 힐링 카툰 애니메이션 스케치",
    excelPreviewBtnText: "브라우저 원본 보기",
    excelSection2Title: "2단계: 인게임 상호작용 트리거 및 NPC 시나리오 테이블 복사 (Excel TAB 세그먼트)",
    excelSection2Desc: "기획 테이블이나 시나리오 대사를 수작업으로 입력하는 번거로움을 덜어드립니다. 아래 버튼을 클릭하면 표준 탭 구분 분할 데이터(TSV 포맷)로 대사가 복사되어, Excel 혹은 Google Sheets에 Ctrl+V로 붙여넣는 즉시 깔끔히 칼럼 정렬이 완료됩니다.",
    excelSection2NpcBtn: "NPC 시나리오 연동 텍스트 복사 (TAB 구분기호)",
    excelSection2ItemBtn: "등록 아이템 정의 테이블 복사 (TAB 구분기호)",
    excelSection2PreviewTitle: "📋 Excel / Google Sheets에 붙여넣기 시 예상 셀 배치 뷰 (미리보기)",
    excelSection2AlertNpc: "📢 NPC 대사 대본 데이터 테이블이 Excel TAB/TSV 형식으로 클립보드에 무사히 복사되었습니다! \n지금 즉시 Google 스프레드시트나 엑셀의 빈 칸에서 Ctrl+V를 눌러 칸 정돈 작업을 확인하세요!",
    excelSection2AlertItem: "📢 아이템 기획 바인딩 구성 표가 TSV 양식으로 클립보드에 복사되었습니다! \n그대로 스프레드시트에 붙여넣으실 수 있습니다.",

    simTitle: "셀 동작 테스트 베드:",
    simSub: "실시간 Excel 함수 논리 검사기",
    simDesc: "Excel을 활용해 게임 매커니즘을 테스트할 때, 주로 복합 `IF` 제어 수식을 사용합니다. 아래는 수식이 어떻게 물리 버튼 상태와 동조해 럭을 자동 개방하는지 검증할 수 있는 모의 테스트 베드입니다.",
    simColAHeader: "셀 A1 (플레이어 입력 코드)",
    simColBHeader: "셀 B1 (캠퍼스카드 소지여부)",
    simColCHeader: "셀 C1 (최종 함수 수식 판단 결과)",
    simLabelA1: "A1: 4자리 비밀번호 값 수정",
    simLabelB1: "B1: 인벤토리 소지 부울값",
    simOptionTrue: "TRUE (소지 중)",
    simOptionFalse: "FALSE (미보유)",
    simMsgMissingCard: "❌ 카드 대기: 리더기 태깅 확인불가",
    simMsgUnlockSuccess: "🎉 성공: 캐비닛 자석락 전원해제!",
    simMsgLockerLocked: "🔒 실패: 매칭되지 않는 비밀번호",
    simFormulaLabel: "실제 적용되는 Google Sheets 셀 C1 한글 논리 수식:",

    npcXiaoxiaoName: "반장 샤오샤오 (Xiaoxiao)",
    npcXiaoxiaoRole: "친절한 반장",
    npcXiaoxiaoDesc: "쾌활하고 명랑한 우리 반 반장. 오늘 하루 종일 교무실을 드나들며 학급 전용 설문지를 나눠주고 있다.",
    npcXiaoxiaoDialogue: [
      "안녕! 너도 혹시 분실된 '학생 전용 푸른색 카드'를 찾고 있니?",
      "내가 아까 벚꽃 가득한 나무 아래에서 기획 표를 적고 있는데 '칭-'하고 맑은 소리가 울렸어...",
      "운동장 연못 벤치나 광장 중앙 벚꽃 수풀 틈새를 자세히 찾아봐. 귀중한 학생증 카드가 거기 쏙 끼어있을지 몰라!"
    ],
    npcXiaoxiaoSolved: [
      "다행이다! 잃어버렸던 소중한 학생증 카드를 되찾았네! 얼른 교실로 들어가 보관함 리더기에 카드를 접촉하고 통과 전용 비밀번호 4자리를 맞추렴!",
      "좋은 결과가 있길 바랄게! 무슨 일이 생기면 연락해!"
    ],
    npcXiaoxiaoNote: "퀘스트 내비게이터: 핵심 퀘스트 카드의 수색 미션을 주며, 광장 벤치/벚꽃 근처라는 힌트를 흘립니다.",

    npcZhangName: "선배 장치 (Senior Zhang)",
    npcZhangRole: "쿨한 선배",
    npcZhangDesc: "헤드폰을 끼고 자전거 거치대 옆에서 가만히 독서를 즐기는 차분한 선배. 학교 내의 여러 미스터리에 대해 아는 것이 많다.",
    npcZhangDialogue: [
      "야, 너 꽤 다급한 얼굴인데? 뭘 그리 찾고 있어?",
      "교실 귀퉁이에 있는 낡은 철제 캐비닛 번호 잠그는 법이 알고 싶다고? 크하하, 그거 꾀나 유명한 보관함이지.",
      "선배가 한 가지만 가르쳐 줄게. 그 락의 코드는 우리 학교 설립 기념일이야: [월][일] 순서지. 힌트는 교실 안 교탁 위에 올려진 학급 메모 쪽지 날짜를 뒤져봐."
    ],
    npcZhangSolved: [
      "대단한걸, 오늘이 개교 주년 기념일(5월 26일)이라는 것을 단숨에 간파했군. 자, 어서 열어서 비밀 보따리를 낚아채봐!"
    ],
    npcZhangNote: "암호 힌트 NPC: 자물쇠의 패턴이 개교 기념일 연도 및 월/일자(0526)임을 독려하는 귀중한 정보를 제공합니다.",

    npcWangName: "사사님 왕 이모 (Auntie Wang)",
    npcWangRole: "상냥한 왕 이모님",
    npcWangDesc: "학교 교실동 건물 관리를 담당하시는 친절한 사감 이모. 인자하고 따스해 전교생이 잘 따른다.",
    npcWangDialogue: [
      "아가야, 오늘도 바람이 참 매서운데 고개를 푹 숙여서 조심조심 걸으렴.",
      "아까 파란색 카드가 구겨진 나뭇잎 더미 틈바구니에 끼어있는 것을 언뜻 본 것 같은데, 네가 찾던 그 학생증이니?",
      "내가 교실동 문은 이미 말끔하게 빗장을 풀고 열어두었으니 얼른 들어가보려무나. 복도에서 뛰어놀다 다치면 안 된다."
    ],
    npcWangSolved: [
      "그렇지, 한 번 잃은 물건은 늦지 않게 가져와야 보람차지. 공부방으로 올라가서 얼른 보관함 코드를 열어보렴."
    ],
    npcWangNote: "추가 정보제공 NPC: 장소 탐색 능력이 다소 더딘 플레이어를 위한 입체적인 복합 탐색 보조 장치 역할입니다.",

    itemCardName: "학생 캠퍼스 카드",
    itemCardDesc: "ic칩 내장 세련된 하늘색 플라스틱 학생 전용 카드. 철제 장 캐비닛 센서 접촉의 핵심 필수 장비.",
    itemCardNote: "마일스톤 트리거: 광장 수풀 밑에서 수집 가능하며, 락 센서를 구동하는 이중 잠금 해제 조건.",

    itemMemoName: "교탁 위 쪽지",
    itemMemoDesc: "노랗게 바랜 포스트잇: '건물 개교기념일은 5월. 오늘은 2026년 5월 26일 창립일입니다. 보관함 암호는 이 찬란한 날의 월과 일: [월][이] 네 자리 숫자.'",
    itemMemoNote: "힌트 뷰어: 교실 내 테이블에 놓여 있으며 연중 언제든지 훑어볼 수 있어 0526 이라는 암호를 증명합니다.",

    itemCapsuleName: "졸업 타임캡슐",
    itemCapsuleDesc: "녹슨 조그만 타임캡슐 철제 드럼 통. 학창 시절의 연하장, 폴라로이드 사진, 그리고 청춘 편지가 온전히 담겨있다.",
    itemCapsuleNote: "핵심 보상: 암호 0526을 온전히 매칭하여 반환하면 성공 상태 팝업과 함께 완벽한 해피엔딩을 맺게 됩니다.",

    hudEnterLabel: "교실 동 내부로 입장하기",
    hudExitLabel: "캠퍼스 광장으로 복귀",
    sparkleHoverText: "파란색 카드가 반짝이지 않나요?",

    // Side Quest
    sideQuestName: "AI 비밀 노트 수집 대작전 🌟",
    sideQuestTriggerCond: "트리거 조건: 메인 클래스 완료(타임캡슐 열림 상태) 후 발동",
    sideQuestFlow: "진행 흐름: 교정 구석구석 숨어있는 4장의 【AI 비밀 노트】 파편을 찾아서 마법같은 제작 뒷이야기를 복원하세요.",
    sideQuestSuccessTitle: "🌸 서브 퀘스트 완료: AI와 동행한 포근한 기적!",
    sideQuestSuccessDesc: "축하합니다! 4장의 AI 일기장을 모두 모았습니다! 보관함을 우뚝 연 것에 그치지 않고, 본 게임 프로토타입이 AI(Gemini 3.5)와의 깊은 상호작용 및 실시간 현지화를 통해 설계된 특별한 이스터 에그를 잠금 해제하셨네요! 상상력과 첨단 기술이 함께 춤을 추며 이 소중한 추억의 정원이 돋아날 수 있었습니다. 우리 다음 더 멋진 우주에서 또 만나요!",
    noteLocationSquare: "캠퍼스 광장: 중앙의 빛바랜 벚꽃나무 아래에서 반짝이는 분홍색 편지봉투",
    noteLocationClassroom: "교실 내부: 칠판 하단 모퉁이에 살며시 붙어 흔들리는 반딧불 스티커",
    noteLocationLocker: "보관함 내부: 이미 전원이 해제된 보관함의 두 번째 비밀 수납칸 안쪽",
    noteLocationNPC: "반장 샤오샤오: 메인 주선율이 끝난 후 다시 반장을 찾아가 고마움을 표시하기",
    noteContentSquare: "「AI 드로잉 일지: 오늘 AI 모델을 활용해 흩날리는 벚꽃을 그렸어요. 바람에 날리는 몽환적인 질감이 디노이즈 정도와 퍼즈 효과 수식으로 구현되다니! 차가운 코드가 감성적인 비주얼로 탄생하는 순간은 언제나 힐링 가득하네요~」",
    noteContentClassroom: "「AI 수식 비화: 교실 오동나무 캐비닛 매커니즘이 Google 스프레드시트의 다중 IF 논리 루프로 깔끔하게 동작하다니! 아주 복잡한 코딩 없이도 기획적 설계를 완벽하게 시뮬레이션할 수 있어요! 작지만 유쾌하고 가슴 시리도록 다정한 기획 도구랍니다.」",
    noteContentLocker: "「AI 시나리오 해설: 사실 타임캡슐 속의 편지는 인간 기획자가 던진 서정적 추억 위에 AI가 빈티지 감성과 구성을 가미하여 쓰였습니다. AI가 뼈대를 구성하고 사람이 세세함을 입힌, 다가올 미래의 완벽한 창작 파트너십입니다!」" ,
    noteContentNPC: "「AI 프로토타이퍼 쿠키: 모든 일기의 비밀 코드를 맞추셨군요! 이 게임의 2D 그래픽, 원클릭 데이터 테이블, 실시간 한중 현지화 구조는 AI 어시스턴트의 전방위적 도움으로 단 몇 시간 만에 빌드되었습니다. 상상이 기적이 되는 세상, AI가 당신의 꿈을 응원합니다!」"
  }
};
