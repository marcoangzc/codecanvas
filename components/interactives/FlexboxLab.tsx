"use client";

import { useState } from "react";

/**
 * Flexbox 实验室：像游戏机台一样调每一个属性，
 * 看元素如何排队，并同步生成真实 CSS。
 */

type Dir = "row" | "row-reverse" | "column" | "column-reverse";
type Justify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
type Align = "stretch" | "flex-start" | "center" | "flex-end";

const DIRS: { v: Dir; l: string }[] = [
  { v: "row", l: "row →" },
  { v: "row-reverse", l: "← row-reverse" },
  { v: "column", l: "column ↓" },
  { v: "column-reverse", l: "↑ column-reverse" },
];
const JUSTIFIES: { v: Justify; l: string }[] = [
  { v: "flex-start", l: "start" },
  { v: "center", l: "center" },
  { v: "flex-end", l: "end" },
  { v: "space-between", l: "between" },
  { v: "space-around", l: "around" },
  { v: "space-evenly", l: "evenly" },
];
const ALIGNS: { v: Align; l: string }[] = [
  { v: "stretch", l: "stretch" },
  { v: "flex-start", l: "start" },
  { v: "center", l: "center" },
  { v: "flex-end", l: "end" },
];

const ITEM_COLORS = ["from-indigo-500 to-violet-500", "from-sky-500 to-cyan-500", "from-emerald-500 to-teal-500", "from-amber-500 to-orange-500", "from-pink-500 to-rose-500", "from-fuchsia-500 to-purple-500"];

function Seg<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { v: T; l: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={`rounded-lg border px-2.5 py-1 font-mono text-[11px] transition ${
            value === o.v
              ? "border-indigo-400 bg-indigo-500/15 text-white"
              : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

export default function FlexboxLab() {
  const [dir, setDir] = useState<Dir>("row");
  const [justify, setJustify] = useState<Justify>("flex-start");
  const [align, setAlign] = useState<Align>("stretch");
  const [gap, setGap] = useState(10);
  const [wrap, setWrap] = useState<"nowrap" | "wrap">("nowrap");
  const [count, setCount] = useState(4);

  const isColumn = dir.startsWith("column");

  const presets: { name: string; apply: () => void }[] = [
    { name: "🎯 水平垂直居中", apply: () => { setDir("row"); setJustify("center"); setAlign("center"); } },
    { name: "🧭 导航两端对齐", apply: () => { setDir("row"); setJustify("space-between"); setAlign("center"); } },
    { name: "🃏 卡片自动换行", apply: () => { setDir("row"); setJustify("space-evenly"); setAlign("stretch"); setWrap("wrap"); } },
  ];

  const code = `.container {
  display: flex;
  flex-direction: ${dir};
  justify-content: ${justify};
  align-items: ${align};
  gap: ${gap}px;
  flex-wrap: ${wrap};
}`;

  return (
    <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {/* 预设 */}
      <div className="mb-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button key={p.name} onClick={p.apply} className="btn-ghost px-3 py-1.5 text-xs">
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_290px]">
        {/* 舞台 */}
        <div>
          <div className="mb-1.5 flex items-center gap-3 text-xs text-slate-500">
            <span>主轴 main axis：</span>
            <span className="font-mono text-amber-300">{isColumn ? "↓ 垂直（column）" : "→ 水平（row）"}</span>
            <span className="text-slate-600">｜</span>
            <span>交叉轴 cross axis：</span>
            <span className="font-mono text-violet-300">{isColumn ? "→ 水平" : "↓ 垂直"}</span>
          </div>
          <div
            className="flex min-h-[240px] items-stretch rounded-xl border border-dashed border-indigo-400/40 bg-slate-950/60 p-3 transition-all duration-200"
            style={{ flexDirection: dir, justifyContent: justify, alignItems: align, gap, flexWrap: wrap }}
          >
            {Array.from({ length: count }, (_, i) => (
              <div
                key={i}
                className={`anim-pop flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-mono text-sm font-bold text-white shadow-md ${ITEM_COLORS[i % ITEM_COLORS.length]} ${
                  i === 0 ? (isColumn ? "w-full" : "") : ""
                }`}
                style={
                  isColumn
                    ? { height: i === 0 ? 72 : 52, width: i === 0 ? undefined : "72%", minHeight: align === "stretch" && i !== 0 ? 40 : undefined }
                    : { width: i === 0 ? 96 : 76, height: i === 0 ? 84 : 64 }
                }
              >
                {i + 1}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">
            提示：第 1 个盒子故意做得更高，方便观察 align-items 的效果；把 direction 改成 column 再看看「主轴」发生了什么。
          </p>
        </div>

        {/* 控制台 */}
        <div className="space-y-4">
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div>
              <div className="mb-1.5 text-xs font-semibold text-slate-400">flex-direction 方向</div>
              <Seg options={DIRS} value={dir} onChange={setDir} />
            </div>
            <div>
              <div className="mb-1.5 text-xs font-semibold text-slate-400">justify-content 主轴对齐</div>
              <Seg options={JUSTIFIES} value={justify} onChange={setJustify} />
            </div>
            <div>
              <div className="mb-1.5 text-xs font-semibold text-slate-400">align-items 交叉轴对齐</div>
              <Seg options={ALIGNS} value={align} onChange={setAlign} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="mb-1.5 text-xs font-semibold text-slate-400">gap {gap}px</div>
                <input type="range" min={0} max={32} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full cursor-pointer accent-indigo-400" />
              </div>
              <div>
                <div className="mb-1.5 text-xs font-semibold text-slate-400">盒子数量 {count}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCount((c) => Math.max(2, c - 1))} className="h-6 w-6 rounded border border-slate-700 text-slate-300 hover:border-indigo-400">−</button>
                  <button onClick={() => setCount((c) => Math.min(6, c + 1))} className="h-6 w-6 rounded border border-slate-700 text-slate-300 hover:border-indigo-400">＋</button>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-xs font-semibold text-slate-400">flex-wrap 换行</div>
              <Seg
                options={[
                  { v: "nowrap" as const, l: "nowrap 不换行" },
                  { v: "wrap" as const, l: "wrap 自动换行" },
                ]}
                value={wrap}
                onChange={setWrap}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 同步代码 */}
      <div className="mt-5">
        <div className="mb-2 text-xs text-slate-500">👇 你刚才「拨出来」的 CSS（复制就能用）</div>
        <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[13px] leading-6 text-emerald-200">
          {code}
        </pre>
      </div>
    </div>
  );
}
