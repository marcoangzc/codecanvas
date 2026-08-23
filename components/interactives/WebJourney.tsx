"use client";

import { useEffect, useState } from "react";
import { StepControls } from "./Stepper";

/**
 * 「网页诞生之旅」动画：
 * 浏览器 → DNS → 服务器 的完整 HTTP 往返，用会动的场景分步演示。
 */

const STEPS = [
  {
    title: "① 输入网址 · You type a URL",
    text: "你在地址栏输入 https://example.com 并按下回车。URL 就像收件地址：协议（https）+ 域名（example.com）+ 路径。",
  },
  {
    title: "② 问路 DNS · Domain Lookup",
    text: "浏览器先去问 DNS 服务器：「example.com 住在哪？」DNS 像一本互联网电话簿，查到后回答一个 IP 地址，比如 93.184.216.34。",
  },
  {
    title: "③ 发送请求 · HTTP Request",
    text: "拿到地址后，浏览器向服务器发出 HTTP 请求：「请把这个页面给我」（GET /）。请求沿着网线和路由器一路前进。",
  },
  {
    title: "④ 返回响应 · HTTP Response",
    text: "服务器找到页面，回送响应：状态码 200 OK + HTML 文档。如果地址写错了，你会收到著名的 404 Not Found。",
  },
  {
    title: "⑤ 解析渲染 · Parse & Render",
    text: "浏览器逐行阅读 HTML，搭起页面的骨架（DOM），再应用 CSS 样式，把文字、图片一个个「画」到屏幕上。",
  },
  {
    title: "⑥ 大功告成 · Done!",
    text: "页面完整出现！这一切通常在几百毫秒内完成——但现在你已经知道背后每一步都发生了什么。",
  },
];

/* 场景里各元素的坐标（容器百分比） */
const POS = {
  browser: { left: "5%", top: "40%" },
  dns: { left: "44%", top: "8%" },
  server: { left: "78%", top: "38%" },
};

/** 每一步中「信使」的位置与外观 */
function courier(step: number): { visible: boolean; left: string; top: string; icon: string; cls: string } {
  switch (step) {
    case 1:
      return { visible: true, left: "27%", top: "26%", icon: "📡", cls: "" };
    case 2:
      return { visible: true, left: "60%", top: "48%", icon: "✉️", cls: "" };
    case 3:
      return { visible: true, left: "42%", top: "52%", icon: "📦", cls: "" };
    default:
      return { visible: false, left: "5%", top: "40%", icon: "", cls: "" };
  }
}

export default function WebJourney() {
  const [step, setStep] = useState(0);
  const [renderTick, setRenderTick] = useState(0);

  // 第⑤⑥步时让骨架一块块出现
  useEffect(() => {
    if (step < 4) return;
    setRenderTick(0);
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setRenderTick(n);
      if (n >= 4) clearInterval(t);
    }, 420);
    return () => clearInterval(t);
  }, [step]);

  const c = courier(step);

  return (
    <div>
      {/* ---------- 动画场景 ---------- */}
      <div className="relative h-[300px] overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/40">
        {/* 连线 */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="18" y1="55" x2="50" y2="24" stroke={step === 1 ? "#818cf8" : "#334155"} strokeWidth="0.4" className="flow-line" vectorEffect="non-scaling-stroke" />
          <line x1="22" y1="58" x2="80" y2="54" stroke={step === 2 ? "#fbbf24" : step === 3 ? "#34d399" : "#334155"} strokeWidth="0.4" className="flow-line" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* 信使 */}
        {c.visible && (
          <div
            key={`${step}`}
            className="anim-pop absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-600 bg-slate-800 p-1.5 text-xl shadow-lg"
            style={{ left: c.left, top: c.top }}
          >
            {c.icon}
          </div>
        )}

        {/* 浏览器 */}
        <Node style={POS.browser} label="你的浏览器 · Client">
          <BrowserMock step={step} tick={renderTick} />
        </Node>

        {/* DNS */}
        <Node style={POS.dns} label="DNS · 电话簿">
          <div className="w-[120px] rounded-lg bg-white p-2 text-center shadow-md">
            <div className="text-lg">📖</div>
            <div className={`mt-1 rounded bg-emerald-100 px-1 py-0.5 font-mono text-[10px] leading-tight text-emerald-700 transition ${step >= 1 && step <= 3 ? "opacity-100" : "opacity-30"}`}>
              example.com<br />→ 93.184.216.34
            </div>
          </div>
        </Node>

        {/* 服务器 */}
        <Node style={POS.server} label="网站服务器 · Server">
          <div className="flex w-[96px] flex-col gap-1 rounded-lg bg-white p-2 shadow-md">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between rounded bg-slate-100 px-1.5 py-1">
                <span className="font-mono text-[9px] text-slate-500">srv-{i + 1}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${step >= 3 || i > 0 ? "bg-emerald-400" : "bg-slate-300"}`} />
              </div>
            ))}
            <div className="mt-0.5 text-center font-mono text-[10px] font-bold text-indigo-600">example.com</div>
          </div>
        </Node>

        {/* 步骤徽标 */}
        <div className="absolute right-3 top-3 rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1 font-mono text-[11px] text-slate-400">
          STEP {step + 1}
        </div>
      </div>

      <StepControls count={STEPS.length} current={step} onChange={setStep} autoPlay />
    </div>
  );
}

function Node({
  style,
  label,
  children,
}: {
  style: React.CSSProperties;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute w-[150px] -translate-x-1/2 sm:w-auto" style={style}>
      {children}
      <div className="mt-1.5 text-center text-[11px] font-medium text-slate-400">{label}</div>
    </div>
  );
}

/** 浏览器窗口小模型：屏幕内容由步骤驱动 */
function BrowserMock({ step, tick }: { step: number; tick: number }) {
  return (
    <div className="w-[190px] overflow-hidden rounded-lg bg-white shadow-md">
      {/* 窗口栏 */}
      <div className="flex items-center gap-1 bg-slate-100 px-2 py-1.5">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="ml-1.5 flex-1 truncate rounded-full bg-white px-2 py-0.5 font-mono text-[9px] text-slate-500">
          {step >= 1 ? "https://example.com" : "输入网址…"}
        </span>
      </div>
      {/* 屏幕 */}
      <div className="relative h-[92px] bg-slate-50 p-2.5">
        {step < 3 ? (
          <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
            {step < 3 ? "…" : ""}
          </div>
        ) : (
          <div className="space-y-1.5">
            {/* 头像 */}
            {tick >= 1 && (
              <div className="anim-pop flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-indigo-200" />
                <div className="h-2 w-16 rounded bg-indigo-300" />
              </div>
            )}
            {/* 文本行 */}
            {tick >= 2 && (
              <div className="anim-pop space-y-1">
                <div className="h-1.5 w-full rounded bg-slate-200" />
                <div className="h-1.5 w-4/5 rounded bg-slate-200" />
              </div>
            )}
            {/* 内容块 */}
            {tick >= 3 && (
              <div className="anim-pop grid grid-cols-3 gap-1">
                <div className="h-5 rounded bg-violet-200" />
                <div className="h-5 rounded bg-pink-200" />
                <div className="h-5 rounded bg-amber-200" />
              </div>
            )}
            {/* 完成 */}
            {tick >= 4 && (
              <div className="absolute bottom-1.5 right-1.5 anim-pop rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white">
                渲染完成 ✓
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
