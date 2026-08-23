"use client";

import { useState } from "react";
import { StepControls } from "./Stepper";

/**
 * 变量赋值可视化：逐行「执行」一小段 JS，右边的内存盒子实时变化。
 * 直观感受 let / const 的区别，以及重新赋值时内存里到底发生了什么。
 */

type BoxKind = "let" | "const";
type BoxType = "number" | "string" | "boolean";

type Box = { name: string; value: string; type: BoxType; kind: BoxKind };

type Step = {
  /** 高亮的代码行下标 */
  line: number;
  boxes: Box[];
  /** 这一步刚被写入/改变的变量名（用于高亮动画） */
  changed?: string;
  note: string;
  error?: string;
};

const CODE_LINES = [
  "let score = 10;",
  'let level = "青铜";',
  "score = score + 5;   // let 可以重新赋值",
  'const name = "小码";',
  'name = "大王";       // const 敢试一下？',
];

const TYPE_COLOR: Record<BoxType, string> = {
  number: "text-amber-300",
  string: "text-emerald-300",
  boolean: "text-sky-300",
};

const STEPS: Step[] = [
  {
    line: 0,
    boxes: [],
    note: "程序还没开始，内存里空空如也。",
  },
  {
    line: 0,
    boxes: [{ name: "score", value: "10", type: "number", kind: "let" }],
    changed: "score",
    note: "let score = 10 —— 申请一个叫 score 的盒子，把数字 10 放进去。声明 + 赋值一步完成。",
  },
  {
    line: 1,
    boxes: [
      { name: "score", value: "10", type: "number", kind: "let" },
      { name: "level", value: '"青铜"', type: "string", kind: "let" },
    ],
    changed: "level",
    note: "又多了一个盒子。文字要穿上引号，浏览器才知道这是字符串而不是变量名。",
  },
  {
    line: 2,
    boxes: [
      { name: "score", value: "15", type: "number", kind: "let" },
      { name: "level", value: '"青铜"', type: "string", kind: "let" },
    ],
    changed: "score",
    note: "先算等号右边（10 + 5 = 15），再把结果放回 score 盒子——旧值 10 被覆盖。let 的盒子随时可以换内容。",
  },
  {
    line: 3,
    boxes: [
      { name: "score", value: "15", type: "number", kind: "let" },
      { name: "level", value: '"青铜"', type: "string", kind: "let" },
      { name: "name", value: '"小码"', type: "string", kind: "const" },
    ],
    changed: "name",
    note: "const 声明的盒子会上一把🔒：内容照样能读能用，但不许再整体换掉。",
  },
  {
    line: 4,
    boxes: [
      { name: "score", value: "15", type: "number", kind: "let" },
      { name: "level", value: '"青铜"', type: "string", kind: "let" },
      { name: "name", value: '"小码"', type: "string", kind: "const" },
    ],
    error: "Uncaught TypeError: Assignment to constant variable.",
    note: "果然报错了！给 const 变量重新赋值，浏览器直接拒绝执行——这正是它保护你的方式：重要常量不会被不小心改掉。",
  },
];

export default function VariableBox() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左：正在执行的代码 */}
        <div>
          <div className="mb-2 text-xs font-semibold text-slate-500">
            📜 正在逐行执行 <span className="ml-2 font-normal text-indigo-300">高亮行 = 当前这一步</span>
          </div>
          <pre className="min-h-[190px] rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[13px] leading-8">
            {CODE_LINES.map((l, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap transition ${
                  i === s.line && !s.error
                    ? "-mx-2 rounded-md bg-indigo-500/15 px-2 text-indigo-100 ring-1 ring-indigo-400/40"
                    : i === s.line
                      ? "-mx-2 rounded-md bg-rose-500/15 px-2 text-rose-200 ring-1 ring-rose-400/40"
                      : "text-slate-500"
                }`}
              >
                {l}
              </div>
            ))}
          </pre>
        </div>

        {/* 右：内存盒子 */}
        <div>
          <div className="mb-2 text-xs font-semibold text-slate-500">
            🧠 内存 <span className="ml-2 font-normal text-indigo-300">每个变量就是一个贴了标签的盒子</span>
          </div>
          <div className="flex min-h-[190px] flex-wrap content-start items-start gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
            {s.boxes.length === 0 && (
              <div className="self-center text-xs text-slate-600">（空的）</div>
            )}
            {s.boxes.map((b) => {
              const hot = b.name === s.changed;
              return (
                <div
                  key={`${b.name}-${hot ? step : "static"}`}
                  className={`anim-pop w-32 rounded-xl border p-3 ${
                    hot
                      ? "border-indigo-400 bg-indigo-500/10 ring-1 ring-indigo-400/60"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white">{b.name}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[9px] ${
                        b.kind === "const"
                          ? "bg-rose-500/15 text-rose-300"
                          : "bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {b.kind}{b.kind === "const" ? " 🔒" : ""}
                    </span>
                  </div>
                  <div className={`font-mono text-lg font-bold ${TYPE_COLOR[b.type]}`}>{b.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 说明 + 控制 */}
      {s.error && (
        <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 font-mono text-xs text-rose-300">
          ⛔ {s.error}
        </div>
      )}
      <div className="mt-3 rounded-xl bg-slate-800/60 px-4 py-3 text-sm leading-6 text-slate-300">
        第 {step + 1} 步：{s.note}
      </div>
      <StepControls count={STEPS.length} current={step} onChange={setStep} />
    </div>
  );
}
