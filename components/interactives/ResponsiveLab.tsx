"use client";

import { useState } from "react";

/**
 * 响应式实验室：拖动「视口宽度」滑块，观察同一个页面如何在断点处切换布局。
 * 右侧代码面板实时高亮当前生效的媒体查询。
 */

const DEVICES = [
  { name: "📱 手机", w: 375 },
  { name: "📱→💻 平板", w: 768 },
  { name: "💻 笔记本", w: 1280 },
];

export default function ResponsiveLab() {
  const [w, setW] = useState(375);

  const cols = w >= 1024 ? "repeat(3, 1fr)" : w >= 640 ? "repeat(2, 1fr)" : "1fr";
  const zone = w < 640 ? 0 : w < 1024 ? 1 : 2;
  const navVisible = w >= 768;

  const RULES: { code: string; active: boolean; note: string }[] = [
    { code: ".cards { grid-template-columns: 1fr; }", active: zone === 0, note: "基础：手机单列" },
    { code: "@media (min-width: 640px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}", active: zone === 1, note: "≥640px：平板两列" },
    { code: "@media (min-width: 1024px) {\n  .cards { grid-template-columns: repeat(3, 1fr); }\n}", active: zone === 2, note: "≥1024px：桌面三列" },
    { code: `.nav-links { display: ${navVisible ? "flex" : "none"}; }`, active: true, note: navVisible ? "≥768px：显示完整导航" : "<768px：收起为汉堡菜单" },
  ];

  return (
    <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {/* 控制条 */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold text-slate-400">视口宽度</span>
        <input
          type="range"
          min={320}
          max={1280}
          value={w}
          onChange={(e) => setW(Number(e.target.value))}
          className="h-1.5 min-w-[180px] flex-1 cursor-pointer accent-indigo-400"
        />
        <span className="w-16 text-right font-mono text-sm text-indigo-300">{w}px</span>
        <div className="flex gap-1.5">
          {DEVICES.map((d) => (
            <button
              key={d.name}
              onClick={() => setW(d.w)}
              className={`rounded-lg border px-2.5 py-1 text-[11px] transition ${
                w === d.w
                  ? "border-indigo-400 bg-indigo-500/15 text-white"
                  : "border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左：迷你网页 */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] transition ${
                  zone === i
                    ? ["bg-sky-500/20 text-sky-300 ring-1 ring-sky-400", "bg-violet-500/20 text-violet-300 ring-1 ring-violet-400", "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400"][i]
                    : "text-slate-600"
                }`}
              >
                {["📱 手机 <640", "📲 平板 ≥640", "🖥️ 桌面 ≥1024"][i]}
              </span>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-700 bg-white" style={{ width: Math.min(w, 620), maxWidth: "100%", transition: "width .15s ease", margin: "0 auto" }}>
            {/* 导航 */}
            <div className="flex items-center justify-between bg-indigo-600 px-3 py-2 text-white">
              <span className="text-xs font-bold">☕ 咖啡小站</span>
              {navVisible ? (
                <div className="anim-fade-up flex gap-3 text-[11px]">
                  <span>首页</span><span>菜单</span><span>故事</span><span>联系</span>
                </div>
              ) : (
                <span className="anim-pop text-sm leading-none">☰</span>
              )}
            </div>
            {/* Hero */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 px-4 py-3">
              <div className={`font-extrabold text-indigo-900 transition-all ${zone === 0 ? "text-base" : zone === 1 ? "text-lg" : "text-xl"}`}>
                今天，来杯手冲 ☁️
              </div>
              <div className="mt-1 h-1.5 w-3/4 rounded bg-indigo-200/80" />
            </div>
            {/* 卡片栅格 */}
            <div className="grid gap-2 p-3" style={{ gridTemplateColumns: cols, transition: "grid-template-columns .15s ease" }}>
              {["云南日晒", "耶加雪菲", "曼特宁"].map((n) => (
                <div key={n} className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                  <div className="h-10 bg-gradient-to-br from-amber-200 to-orange-300" />
                  <div className="p-1.5">
                    <div className="text-[10px] font-bold text-slate-700">{n}</div>
                    <div className="mt-0.5 h-1 w-2/3 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-500">👆 拖动滑块，看布局在断点处「咔哒」变形</p>
        </div>

        {/* 右：当前生效的 CSS */}
        <div>
          <div className="mb-2 text-xs font-semibold text-slate-500">此刻生效的规则（高亮中）</div>
          <div className="space-y-2">
            {RULES.map((r, i) => (
              <div
                key={i}
                className={`rounded-xl border px-3 py-2 transition ${
                  r.active
                    ? "border-emerald-400/70 bg-emerald-500/10 shadow-[0_0_18px_-6px] shadow-emerald-500/40"
                    : "border-slate-800 bg-slate-950/60 opacity-50"
                }`}
              >
                <pre className="whitespace-pre-wrap font-mono text-[11.5px] leading-5 text-emerald-200">{r.code}</pre>
                <div className="mt-1 text-[10px] text-slate-400">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
