"use client";

import { useEffect, useState, type ReactNode } from "react";

/** 底部控制条：上一步/下一步 + 圆点指示器 + 可选自动播放 */
export function StepControls({
  count,
  current,
  onChange,
  autoPlay = false,
}: {
  count: number;
  current: number;
  onChange: (i: number) => void;
  autoPlay?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => onChange((current + 1) % count), 3000);
    return () => clearInterval(t);
  }, [playing, current, count, onChange]);

  const navCls = (disabled: boolean) =>
    `rounded-lg border px-3 py-1.5 text-xs transition ${
      disabled
        ? "cursor-not-allowed border-slate-800 text-slate-600"
        : "border-slate-700 text-slate-300 hover:border-indigo-400 hover:text-white"
    }`;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {autoPlay && (
        <button
          onClick={() => setPlaying((p) => !p)}
          className="rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-300 transition hover:border-indigo-400 hover:text-white"
        >
          {playing ? "⏸ 暂停" : "▶ 自动播放"}
        </button>
      )}
      <button className={navCls(current === 0)} disabled={current === 0} onClick={() => onChange(current - 1)}>
        ◀ 上一步
      </button>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            aria-label={`第 ${i + 1} 步`}
            onClick={() => onChange(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-indigo-400" : "w-2 bg-slate-600 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>
      <button
        className={navCls(current === count - 1)}
        disabled={current === count - 1}
        onClick={() => onChange(current + 1)}
      >
        下一步 ▶
      </button>
      <span className="ml-auto font-mono text-xs text-slate-500">
        {current + 1} / {count}
      </span>
    </div>
  );
}

/** 通用的分步讲解容器 */
export default function Stepper({
  steps,
  autoPlay = false,
}: {
  steps: { title: string; caption?: string; body: ReactNode }[];
  autoPlay?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];

  return (
    <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {step.body}
      <div className="mt-4 rounded-xl bg-slate-800/60 px-4 py-3">
        <div className="text-sm font-bold text-white">{step.title}</div>
        {step.caption && (
          <p className="mt-1 text-sm leading-6 text-slate-300">{step.caption}</p>
        )}
      </div>
      <StepControls count={steps.length} current={current} onChange={setCurrent} autoPlay={autoPlay} />
    </div>
  );
}
