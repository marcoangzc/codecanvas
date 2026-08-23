"use client";

import { useState } from "react";

/**
 * 盒模型实验室：拖滑块调 padding / border / margin，
 * 直观看清 content-box 与 border-box 的区别，并同步生成真实 CSS 代码。
 */

function Slider({
  label,
  value,
  onChange,
  max = 48,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max?: number;
}) {
  return (
    <label className="flex items-center gap-3 text-xs">
      <span className="w-24 shrink-0 font-medium text-slate-300">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 flex-1 cursor-pointer accent-indigo-400"
      />
      <span className="w-12 shrink-0 text-right font-mono text-indigo-300">{value}px</span>
    </label>
  );
}

export default function BoxModelLab() {
  const [width, setWidth] = useState(180);
  const [pad, setPad] = useState(14);
  const [border, setBorder] = useState(6);
  const [margin, setMargin] = useState(18);
  const [sizing, setSizing] = useState<"content-box" | "border-box">("content-box");

  const padTotal = pad * 2;
  const borderTotal = border * 2;
  const contentW =
    sizing === "content-box" ? width : Math.max(0, width - borderTotal - padTotal);
  const totalW = sizing === "content-box" ? width + padTotal + borderTotal : width;

  const code = `.card {
  width: ${width}px;
  padding: ${pad}px;
  border: ${border}px solid #6366f1;
  margin: ${margin}px;
  box-sizing: ${sizing};
}`;

  return (
    <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* 左：可视化 */}
        <div className="flex min-h-[340px] flex-col items-center justify-center overflow-auto rounded-xl bg-[repeating-conic-gradient(#0f172a_0%_25%,#131c31_0%_50%)] bg-[length:20px_20px] p-4">
          {/* margin 层 */}
          <div
            className="relative rounded-lg border border-dashed border-amber-500/70 transition-all duration-200"
            style={{ padding: `${margin * 0.6}px` }}
          >
            <Tag pos="tl" color="text-amber-400">margin {margin}</Tag>
            {/* border 层 */}
            <div
              className="rounded-md transition-all duration-200"
              style={{
                borderStyle: "solid",
                borderWidth: `${border * 0.7}px`,
                borderColor: "#6366f1",
                background: "rgba(99,102,241,0.15)",
                padding: `${pad * 0.8}px`,
              }}
            >
              <Tag pos="tl" color="text-indigo-300">border {border}</Tag>
              {/* padding 层 */}
              <div
                className="rounded transition-all duration-200"
                style={{ padding: `${pad}px`, background: "rgba(52,211,153,0.14)" }}
              >
                <Tag pos="tl" color="text-emerald-300">padding {pad}</Tag>
                {/* 内容层 */}
                <div
                  className="flex h-[88px] items-center justify-center rounded bg-sky-500/25 ring-1 ring-inset ring-sky-400/60 transition-all duration-200"
                  style={{ width: contentW }}
                >
                  <div className="text-center">
                    <div className="font-mono text-xs font-bold text-sky-300">content</div>
                    <div className="font-mono text-[11px] text-sky-200/80">宽 {contentW}px</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 总宽读数 */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="chip !border-slate-600">盒子总宽 = <b className="ml-1 text-white">{totalW}px</b></span>
            {sizing === "content-box" ? (
              <span className="font-mono text-slate-400">
                {width} + ({pad}×2) + ({border}×2) = {totalW}
              </span>
            ) : (
              <span className="font-mono text-slate-400">border-box：总宽恒等于 width = {totalW}</span>
            )}
          </div>
        </div>

        {/* 右：控制面板 */}
        <div className="space-y-4">
          <div className="space-y-2.5 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <Slider label="width 宽度" value={width} onChange={setWidth} max={260} />
            <Slider label="padding 内边距" value={pad} onChange={setPad} />
            <Slider label="border 边框" value={border} onChange={setBorder} max={20} />
            <Slider label="margin 外边距" value={margin} onChange={setMargin} />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="mb-2 text-xs font-semibold text-slate-400">box-sizing 模式</div>
            <div className="grid grid-cols-2 gap-2">
              {(["content-box", "border-box"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSizing(s)}
                  className={`rounded-lg border px-2 py-2 font-mono text-xs transition ${
                    sizing === s
                      ? s === "content-box"
                        ? "border-sky-400 bg-sky-500/15 text-sky-200"
                        : "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                      : "border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-2.5 text-[11px] leading-5 text-slate-500">
              {sizing === "content-box"
                ? "默认值。width 只管内容区，padding 和 border 会把盒子越撑越大。"
                : "更符合直觉！width 直接就是盒子的总宽，padding 往里挤。实际项目几乎都用它。"}
            </p>
          </div>
        </div>
      </div>

      {/* 同步代码 */}
      <div className="mt-5">
        <div className="mb-2 text-xs text-slate-500">👇 你的设置对应的真实 CSS（会跟着滑块变）</div>
        <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[13px] leading-6 text-emerald-200">
          {code}
        </pre>
      </div>
    </div>
  );
}

function Tag({ pos, color, children }: { pos: "tl"; color: string; children: React.ReactNode }) {
  return (
    <span
      className={`pointer-events-none absolute -top-0.5 left-1 z-10 select-none font-mono text-[10px] leading-4 ${color}`}
    >
      {children}
    </span>
  );
}
