/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { schoolSquareImg, classroomImg } from "../data";
import { Language, TRANSLATIONS } from "../translations";
import { 
  FileSpreadsheet, 
  Copy, 
  ExternalLink, 
  CheckCircle, 
  Layers, 
  Database,
  Grid,
  Sparkle
} from "lucide-react";

interface ExcelHubProps {
  lang: Language;
}

export default function ExcelHub({ lang }: ExcelHubProps) {
  const t = TRANSLATIONS[lang];
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [origin, setOrigin] = useState("https://ais-pre-eagu63a654bb6t4mjynjgk-202369735233.asia-northeast1.run.app");
  
  // Interactive mini spreadsheet mockup state
  const [mockInputCode, setMockInputCode] = useState("1234");
  const [mockItemCollected, setMockItemCollected] = useState<"TRUE" | "FALSE">("TRUE");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Compute live image addresses
  const liveSquareUrl = `${origin}${schoolSquareImg}`;
  const liveClassroomUrl = `${origin}${classroomImg}`;

  const handleCopyText = (text: string, index: number, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedType(null);
    }, 1500);
  };

  // Export full tables to TSV format for easy Copy-Paste to real Excel/Google Sheets
  const handleExportNPCsTSV = () => {
    const isKo = lang === "ko";
    const headers = isKo
      ? ["NPC_ID", "NPC_Name", "Role_Description", "Dialogue_Lines", "GDD_Note"]
      : ["NPC标识", "NPC名称", "校中职务", "关卡脚本/提示语", "原型设计角色与权重"];
    
    const rows = isKo ? [
      ["xiaoxiao", "반장 샤오샤오 (Xiaoxiao)", "친절한 반장", "안녕! 너도 분실된 학생용 푸른색 카드를 찾고 있니? 아까 주 벚꽃나무 아래에서...", "퀘스트 가이더: 카드 수색 미션을 주며 광장 벚꽃 쪽이라는 힌트를 흘립니다."],
      ["zhang", "선배 장치 (Senior Zhang)", "쿨한 선배", "철제 캐비닛 자물쇠의 코드는 우리 학교 설립 기념일이야: [월][일] 형태지. 교탁 쪽지를 뒤져봐.", "암호 힌트 제공자: 암호의 소스가 학교기념일(0526)임을 알려주는 역할입니다."],
      ["wang", "사사님 왕 이모 (Auntie Wang)", "상냥한 왕 이모님", "아까 파란색 카드가 구겨진 나뭇잎 틈바구니에 끼어있는 것을 언뜻 본 것 같구나...", "보조 가이더: 탐색이 다소 서툰 플레이어를 위한 장소 수렴 및 보조적 힌트 구체화."]
    ] : [
      ["xiaoxiao", "班长筱筱 (Xiaoxiao)", "热心的班长", "嗨！你也在找那张丢失的‘学生校园卡’吗？我刚才在广场的主樱花树下登记名册...", "引导NPC：负责发放主线查找卡片任务，提供方位线索（广场花坛区域）。"],
      ["zhang", "学长张弛 (Senior Zhang)", "酷酷的学长", "提示你一下吧：密码是学校创立节日的日期（月和日）。去看看教室讲台黄色便签...", "解谜暗示NPC：给玩家指明密码来源（教室讲台便签 + 今天的周年日期 05-26）。"],
      ["wang", "宿管王阿姨 (Auntie Wang)", "和蔼的王阿姨", "刚才好像是有个蓝色的卡片夹在连椅下的落叶堆里，不知是不是你要找的卡？", "背景辅助NPC：强化查找卡片线索，并解锁教室场景限制（剧情合理化）。"]
    ];
    
    const tsvContent = [headers.join("\t"), ...rows.map(row => row.join("\t"))].join("\n");
    navigator.clipboard.writeText(tsvContent);
    alert(t.excelSection2AlertNpc);
  };

  const handleExportItemsTSV = () => {
    const isKo = lang === "ko";
    const headers = isKo
      ? ["Item_ID", "Item_Name", "Icon", "Script_Description", "GDD_Excel_Formula_Mapping"]
      : ["道具ID", "道具名称", "图标", "剧情描述", "Excel数值原型绑定与机制关联"];
    
    const rows = isKo ? [
      ["campus_card", "학생 캠퍼스 카드", "💳", "ic칩 내장 플라스틱 카드. 캐비닛 센서 인증에 필요한 핵심 아이템.", "수식용 부울값: hasFoundCard. 광장 습득 후 TRUE로 반전되며, 보관함 상호작용의 사전 제약 조건 처리."],
      ["passcode_memo", "교탁 위 쪽지", "📝", "노란 쪽지: '개교기념일은 5월. 오늘은 2026년 5월 26일 개교일입니다.'", "힌트 소스. 개교기념일인 0526을 상시 볼 수 있도록 매핑 및 제공합니다."],
      ["graduation_capsule", "졸업 타임캡슐", "💎", "녹슨 쇠상자. 고등학교 추억과 한 장의 손편지가 들어있음.", "최종 보상. 게임 클리어 및 Victory 수렴 트리거."]
    ] : [
      ["campus_card", "学生校园卡", "💳", "带有芯片的蓝色卡片。上面写着你的名字。打开储物柜刷卡机必需品。", "关键道具：在广场花坛灌木丛找到，教室储物柜交互时作为前置解锁条件。"],
      ["passcode_memo", "讲台便签", "📝", "课桌上泛黄的便签，写着：‘校庆纪念日在5月。今天是2026年5月26日——创校纪念日。’", "解密线索：放在教室课桌上，可重复查看，暗示最终数字是 0526。"],
      ["graduation_capsule", "毕业时光胶囊", "💎", "斑驳的金属盒子，里面装着一封满载青春寄语的信和一些泛黄的卡牌。", "关卡奖励：储物柜正确输入 0526 后弹出。通关硬指标。"]
    ];
    
    const tsvContent = [headers.join("\t"), ...rows.map(row => row.join("\t"))].join("\n");
    navigator.clipboard.writeText(tsvContent);
    alert(t.excelSection2AlertItem);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col gap-8 font-sans" id="excel-hub-container">
      {/* Introduction Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6" id="gdd-intro-banner">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase px-3 py-1 rounded-full w-fit">
            <Sparkle className="w-3.5 h-3.5" />
            {t.excelBannerTag}
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 leading-tight">
            {t.excelBannerTitle}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.excelBannerDesc}
          </p>
        </div>

        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="bg-emerald-500 p-4 rounded-xl shadow-lg border border-emerald-400 text-3xl select-none">
            📈
          </div>
          <div>
            <div className="text-[10px] text-slate-400">{t.excelBannerFormatLabel}</div>
            <div className="text-xs font-mono font-bold text-slate-300">{t.excelBannerFormatValue}</div>
          </div>
        </div>
      </div>

      {/* Main Double Compartments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="gdd-tables-and-sim">
        {/* Core Sheet Exporters (2 columns wide) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* SECTION A: THE SCENERY IMAGE URL CENTER FOR GOOGLE EXCEL */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm" id="excel-image-card">
            <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-500" />
                {t.excelSection1Title}
              </span>
              <span className="text-[10px] text-slate-500 bg-emerald-50 border border-emerald-200 py-0.5 px-2.5 rounded-full font-medium">
                URL Support Online
              </span>
            </h3>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {t.excelSection1Desc}
            </p>

            {/* TWO SCENIC TILES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image A: School Square */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col gap-3 group">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 shadow-inner">
                  <img 
                    src={schoolSquareImg} 
                    alt="Current School Square" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white font-mono text-[9px] px-2 py-0.5 rounded">
                    {t.excelSquareBgLabel}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs">
                  <span className="font-bold text-slate-700">【{t.excelFormulaBadge}】</span>
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="text" 
                      readOnly
                      value={`=IMAGE("${liveSquareUrl}")`}
                      className="bg-white border border-slate-200 rounded px-2 py-1 flex-grow font-mono text-[10px] text-slate-600 truncate"
                    />
                    <button
                      onClick={() => handleCopyText(`=IMAGE("${liveSquareUrl}")`, 100, "formula")}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-1 rounded text-[11px] font-bold shrink-0 transition"
                      title={t.excelCopyFormulaBtn}
                    >
                      {copiedIndex === 100 ? t.excelCopiedStatus : t.excelCopyFormulaBtn}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 mt-1 border-t border-slate-200/60">
                    <span>{t.excelPicDetailsLabel}</span>
                    <a 
                      href={liveSquareUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-indigo-500 hover:underline flex items-center gap-0.5"
                    >
                      {t.excelPreviewBtnText} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Image B: Classroom Interior */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex flex-col gap-3 group">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 shadow-inner">
                  <img 
                    src={classroomImg} 
                    alt="Current Classroom" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white font-mono text-[9px] px-2 py-0.5 rounded">
                    {t.excelClassroomBgLabel}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs">
                  <span className="font-bold text-slate-700">【{t.excelFormulaBadge}】</span>
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="text" 
                      readOnly
                      value={`=IMAGE("${liveClassroomUrl}")`}
                      className="bg-white border border-slate-200 rounded px-2 py-1 flex-grow font-mono text-[10px] text-slate-600 truncate"
                    />
                    <button
                      onClick={() => handleCopyText(`=IMAGE("${liveClassroomUrl}")`, 200, "formula")}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-1 rounded text-[11px] font-bold shrink-0 transition"
                      title={t.excelCopyFormulaBtn}
                    >
                      {copiedIndex === 200 ? t.excelCopiedStatus : t.excelCopyFormulaBtn}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 mt-1 border-t border-slate-200/60">
                    <span>{t.excelPicDetailsLabel}</span>
                    <a 
                      href={liveClassroomUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-indigo-500 hover:underline flex items-center gap-0.5"
                    >
                      {t.excelPreviewBtnText} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: GAME DESIGN DOCUMENT SCRIPT SHEET (TSV/EXCEL COPIERS) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm" id="game-design-tables-card">
            <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-500" />
                {t.excelSection2Title}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                TSV Standard (TABs)
              </span>
            </h3>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {t.excelSection2Desc}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-4">
              <button
                onClick={handleExportNPCsTSV}
                className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 text-xs py-2 px-3.5 rounded-xl transition cursor-pointer"
                id="export-npcs-tsv"
              >
                <Copy className="w-3.5 h-3.5" />
                {t.excelSection2NpcBtn}
              </button>
              <button
                onClick={handleExportItemsTSV}
                className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 text-xs py-2 px-3.5 rounded-xl transition cursor-pointer"
                id="export-items-tsv"
              >
                <Copy className="w-3.5 h-3.5" />
                {t.excelSection2ItemBtn}
              </button>
            </div>

            {/* A small visualization of what gets copied */}
            <div className="border border-slate-100 rounded-xl overflow-hidden shadow-inner text-xs">
              <div className="bg-slate-50 p-2 border-b border-slate-200 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                <span>{t.excelSection2PreviewTitle}</span>
                <span className="text-emerald-600 font-bold">TAB standard match ready</span>
              </div>
              <div className="p-3 bg-white space-y-2 text-slate-600 font-mono text-[10px] overflow-x-auto whitespace-pre">
                {lang === "ko" ? (
                  <>
                    <div className="text-slate-800 font-bold border-b border-slate-100 pb-1">
                      NPC_ID  |  NPC_Name  |  Role_Description  |  Dialogue_Line  |  GDD_Note
                    </div>
                    <div>xiaoxiao  |  반장 샤오샤오  |  친절한 반장  |  안녕! 카드 수색...  |  안내 역할, 벚꽃 힌트 제공</div>
                    <div>zhang     |  선배 장치      |  쿨한 선배    |  철제 보관함 암호는 개교일... |  암호 패턴(0526) 유도</div>
                  </>
                ) : (
                  <>
                    <div className="text-slate-800 font-bold border-b border-slate-100 pb-1">
                      NPC标识  |  NPC名称  |  校中职务  |  关卡提示剧本  |  策划说明备注
                    </div>
                    <div>xiaoxiao  |  班长筱筱  |  热心向导  |  嗨！你在找闪烁的校园卡吗...  |  提供卡片在花坛的关键搜索方位</div>
                    <div>zhang     |  学长张弛  |  耳机青年  |  老旧大铁柜的密码是校庆的日期...  |  逻辑线索，将日期数字设计为解锁密码</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOCK SPREADSHEET FORMULA RUNNER - SENSATIONAL INTERACTION (1 column) */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm" id="excel-interactive-clon-grid">
            <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2 mb-4">
              <Grid className="w-5 h-5 text-emerald-600" />
              {t.simTitle}
              <span className="text-xs font-normal text-slate-400">{t.simSub}</span>
            </h3>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {t.simDesc}
            </p>

            {/* Mock Spreadsheet Interface */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 font-mono shadow-sm" id="mock-sheets-grid">
              {/* Sheets Ribbon bar */}
              <div className="bg-emerald-700 text-white px-3 py-2 flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1">
                  <FileSpreadsheet className="w-4 h-4" />
                  Google Sheets Core Module
                </span>
                <span className="bg-emerald-800 px-1.5 py-0.2 rounded text-[9px]">
                  BILINGUAL
                </span>
              </div>

              {/* Grid Column Headers */}
              <div className="grid grid-cols-12 bg-slate-200 text-[9px] text-slate-500 font-semibold border-b border-slate-300 text-center select-none py-1.5">
                <div className="col-span-1 border-r border-slate-300" />
                <div className="col-span-4 border-r border-slate-300 truncate px-1">{t.simColAHeader}</div>
                <div className="col-span-3 border-r border-slate-300 truncate px-1">{t.simColBHeader}</div>
                <div className="col-span-4 truncate px-1">{t.simColCHeader}</div>
              </div>

              {/* Grid Row 1: Code test input */}
              <div className="grid grid-cols-12 text-[11px] bg-white border-b border-slate-200 items-center min-h-[44px]">
                {/* Row Header column */}
                <div className="col-span-1 bg-slate-100 text-slate-500 text-center font-bold h-full flex items-center justify-center border-r border-slate-200 border-b border-slate-200 select-none">
                  1
                </div>
                
                {/* Value col A: Enter Passcode */}
                <div className="col-span-4 p-1">
                  <input
                    type="text"
                    value={mockInputCode}
                    maxLength={4}
                    onChange={(e) => setMockInputCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center px-1 border border-indigo-200 hover:border-indigo-400 font-bold bg-indigo-50/50 rounded py-0.5 focus:outline-none text-xs"
                    placeholder="code"
                  />
                  <div className="text-[7.5px] text-indigo-500 scale-90 text-center whitespace-nowrap mt-0.5">{t.simLabelA1}</div>
                </div>

                {/* Value col B: Campus Card state selects */}
                <div className="col-span-3 p-1">
                  <select
                    value={mockItemCollected}
                    onChange={(e) => setMockItemCollected(e.target.value as "TRUE" | "FALSE")}
                    className="w-full text-center text-[9px] border border-amber-200 font-bold bg-amber-50 rounded py-0.5"
                  >
                    <option value="TRUE">{t.simOptionTrue}</option>
                    <option value="FALSE">{t.simOptionFalse}</option>
                  </select>
                  <div className="text-[7.5px] text-amber-600 scale-90 text-center whitespace-nowrap mt-0.5">{t.simLabelB1}</div>
                </div>

                {/* Col C output formula representation */}
                <div className="col-span-4 p-1 bg-emerald-50/30 text-slate-700 h-full flex flex-col justify-center">
                  <div className={`p-1 rounded text-center text-[9px] font-bold ${
                    mockInputCode === "0526" && mockItemCollected === "TRUE" 
                      ? "bg-green-100 text-green-800" 
                      : (mockItemCollected === "FALSE" ? "bg-amber-100 text-amber-800" : "bg-red-50 text-red-700")
                  }`}>
                    {mockItemCollected === "FALSE" ? (
                      t.simMsgMissingCard
                    ) : mockInputCode === "0526" ? (
                      t.simMsgUnlockSuccess
                    ) : (
                      t.simMsgLockerLocked
                    )}
                  </div>
                </div>
              </div>

              {/* Grid Column Formula Display */}
              <div className="bg-slate-100 p-2.5 border-t border-slate-300 text-slate-600 text-[10px] flex flex-col gap-1">
                <span className="font-bold text-slate-700">{t.simFormulaLabel}</span>
                {lang === "ko" ? (
                  <code className="bg-white border border-slate-200 p-1 rounded text-[9.5px] leading-tight block select-all text-indigo-700">
                    =IF(B1=FALSE, "❌ 학생증 대기", IF(A1="0526", "🎉 타임캡슐 개봉!", "🔒 암호 오류"))
                  </code>
                ) : (
                  <code className="bg-white border border-slate-200 p-1 rounded text-[9.5px] leading-tight block select-all text-indigo-700">
                    =IF(B1=FALSE, "❌ 缺卡", IF(A1="0526", "🎉时光胶囊开仓！", "🔒 密码错误"))
                  </code>
                )}
              </div>
            </div>

            {/* Quick GDD Summary checklist box suitable for sheet linking */}
            <div className="mt-5 p-3.5 border border-indigo-100 bg-indigo-50/40 rounded-xl text-slate-600" id="gdd-summary-checklist">
              <h4 className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                {lang === "ko" ? "기획 검증 체크리스트" : "关卡设定策划校验表"}
              </h4>
              <ul className="text-[11px] space-y-1.5 leading-relaxed text-slate-500 list-decimal list-inside">
                {lang === "ko" ? (
                  <>
                    <li>메인 스테이지: <b>캠퍼스 메인 광장</b>에 3명의 NPC와 1개의 학생증 수집 장치 탑재.</li>
                    <li>서브 스테이지: <b>고1A반 교실</b>에 학급 쪽지 힌트와 사물함 자물쇠 배치.</li>
                    <li>고유 패스코드: <b>0526</b> (개교일 기념 상수와 완벽 연동).</li>
                  </>
                ) : (
                  <>
                    <li>主场景：<b>校园主广场</b> 挂载 3 个可点 NPC，附带 1 个卡片寻宝元素。</li>
                    <li>次场景：<b>教室教室</b> 挂载 1 个便签纸（提供解密线索）与 1 个储物柜锁盒。</li>
                    <li>唯一解密码：<b>0526</b>（与校 anniversary 时间常数完美契合）。</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
