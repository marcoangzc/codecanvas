"use client";

import Link from "next/link";
import { BADGES, useProgress } from "@/lib/progress";
import { MODULES, TOTAL_LIVE_LESSONS } from "@/lib/curriculum";

const RING_R = 52;
const RING_C = 2 * Math.PI * RING_R;

export default function AchievementsPage() {
  const { xp, level, xpInLevel, completed, badges, resetAll, hydrated } = useProgress();
  const doneCount = MODULES.filter((m) => m.status === "live").flatMap((m) => m.lessons).filter((l) => completed.includes(`m1/${l.slug}`)).length;

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10">
      <h1 className="text-3xl font-extrabold text-white">
        成就墙 <span className="term-en">Achievements</span>
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        所有进度都保存在你自己的浏览器里（localStorage），换浏览器或清缓存会重新开始。
      </p>

      {/* 等级区 */}
      <section className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr]">
        <div className="card flex items-center justify-center !p-8">
          {/* 等级环 */}
          <div className="relative h-36 w-36">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r={RING_R} fill="none" stroke="#1e293b" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r={RING_R}
                fill="none"
                stroke="url(#grad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C * (1 - xpInLevel / 100)}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-slate-500">LEVEL</span>
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-4xl font-extrabold text-transparent">
                {level}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard icon="⚡" label="总经验" value={`${xp} XP`} />
          <StatCard icon="📚" label="完成课程" value={`${doneCount} / ${TOTAL_LIVE_LESSONS}`} />
          <StatCard icon="🏅" label="解锁成就" value={`${badges.length} / ${BADGES.length}`} />
          <div className="sm:col-span-3 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4">
            <div className="mb-1.5 flex justify-between text-xs text-slate-500">
              <span>距离 Lv.{level + 1}</span>
              <span className="font-mono">{xpInLevel}/100 XP</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 transition-all duration-500"
                style={{ width: `${xpInLevel}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 模块进度 */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-white">📈 模块进度</h2>
        <div className="space-y-3">
          {MODULES.map((m) => {
            const done = m.lessons.filter((l) => completed.includes(`${m.id}/${l.slug}`)).length;
            const pct = m.lessons.length ? (done / m.lessons.length) * 100 : 0;
            return (
              <div key={m.id} className={`flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3.5 ${m.status === "soon" ? "opacity-50" : ""}`}>
                <span className="text-xl">{m.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between text-sm">
                    <Link href={`/learn/${m.id}`} className="truncate font-medium text-slate-200 hover:text-indigo-300">
                      {m.titleZh}
                    </Link>
                    <span className="ml-3 shrink-0 font-mono text-xs text-slate-500">
                      {m.status === "soon" ? "未开放" : `${done}/${m.lessons.length}`}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div className={`h-full rounded-full bg-gradient-to-r ${m.accent}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 徽章墙 */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-white">🏅 徽章收集</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b) => {
            const owned = badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`relative overflow-hidden rounded-2xl border p-5 transition ${
                  owned
                    ? "border-amber-400/40 bg-gradient-to-br from-amber-500/10 to-slate-900 shadow-lg shadow-amber-500/5"
                    : "border-slate-800 bg-slate-900/40"
                }`}
              >
                {owned && (
                  <span className="absolute right-3 top-3 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    已解锁
                  </span>
                )}
                <div className={`text-4xl ${owned ? "" : "opacity-30 grayscale"}`}>
                  {owned ? b.icon : "🔒"}
                </div>
                <h3 className={`mt-3 font-bold ${owned ? "text-white" : "text-slate-500"}`}>
                  {b.name}
                  <span className="term-en">{b.en}</span>
                </h3>
                <p className={`mt-1 text-xs leading-5 ${owned ? "text-slate-400" : "text-slate-600"}`}>{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 危险区 */}
      <section className="mt-14 rounded-2xl border border-rose-500/25 bg-rose-500/5 p-6">
        <h2 className="font-bold text-rose-300">⚠️ 重置进度</h2>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          清空所有课程完成记录、经验值与徽章，从零开始。此操作无法撤销。
        </p>
        <button
          onClick={() => {
            if (window.confirm("确定要清空全部学习进度吗？此操作无法撤销。")) resetAll();
          }}
          disabled={!hydrated}
          className="mt-3 inline-flex items-center gap-2 rounded-xl border border-rose-500/50 px-4 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/15"
        >
          🗑 清空我的进度
        </button>
      </section>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span>{icon}</span> {label}
      </div>
      <div className="mt-1.5 font-mono text-xl font-bold text-white">{value}</div>
    </div>
  );
}
