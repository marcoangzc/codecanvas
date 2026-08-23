"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  getModule,
  getLesson,
  lessonHref,
  neighborsOf,
  LESSON_XP,
} from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

/**
 * 课程页外壳：左侧课程目录（桌面端）+ 顶部课程胶囊（移动端），
 * 底部「完成本课」与上一课/下一课导航。
 */
export default function LessonShell({
  moduleId,
  slug,
  children,
}: {
  moduleId: string;
  slug: string;
  children: ReactNode;
}) {
  const mod = getModule(moduleId);
  const meta = mod?.lessons.find((l) => l.slug === slug);
  const { isDone, completeLesson } = useProgress();
  const lessonId = `${moduleId}/${slug}`;
  const done = isDone(lessonId);
  const idx = mod?.lessons.findIndex((l) => l.slug === slug) ?? -1;
  const { prev, next } = neighborsOf(moduleId, slug);
  const doneCount = mod ? mod.lessons.filter((l) => isDone(`${moduleId}/${l.slug}`)).length : 0;

  if (!mod || !meta || idx < 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-6">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/curriculum" className="hover:text-slate-300">课程地图</Link>
        <span>/</span>
        <span>{mod.icon} {mod.titleZh}</span>
        <span>/</span>
        <span className="text-slate-300">{meta.titleZh}</span>
      </div>

      <div className="mt-4 flex gap-8">
        {/* 桌面端侧栏 */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20 space-y-1">
            <div className="mb-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="text-xl">{mod.icon}</span> {mod.titleZh}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${mod.accent}`}
                    style={{ width: `${(doneCount / mod.lessons.length) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-slate-400">
                  {doneCount}/{mod.lessons.length}
                </span>
              </div>
            </div>

            {mod.lessons.map((l, i) => {
              const active = l.slug === slug;
              const d = isDone(`${moduleId}/${l.slug}`);
              return (
                <Link
                  key={l.slug}
                  href={lessonHref(moduleId, l.slug)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-indigo-500/15 text-white ring-1 ring-indigo-400/50"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      d
                        ? "bg-emerald-500/20 text-emerald-400"
                        : active
                          ? "bg-indigo-500/30 text-indigo-200"
                          : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {d ? "✓" : i + 1}
                  </span>
                  <span className="min-w-0 truncate">{l.titleZh}</span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-slate-600">{l.minutes}′</span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* 主内容 */}
        <main className="lesson min-w-0 flex-1">
          {/* 移动端课程胶囊 */}
          <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden">
            {mod.lessons.map((l, i) => (
              <Link
                key={l.slug}
                href={lessonHref(moduleId, l.slug)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs ${
                  l.slug === slug
                    ? "border-indigo-400 bg-indigo-500/15 text-white"
                    : isDone(`${moduleId}/${l.slug}`)
                      ? "border-emerald-500/40 text-emerald-400"
                      : "border-slate-700 text-slate-400"
                }`}
              >
                {isDone(`${moduleId}/${l.slug}`) ? "✓ " : `${i + 1}. `}
                {l.titleZh}
              </Link>
            ))}
          </div>

          {/* 课程头 */}
          <header className="mb-10 border-b border-slate-800 pb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="chip">第 {idx + 1} 课 · 共 {mod.lessons.length} 课</span>
              <span className="chip">⏱ 约 {meta.minutes} 分钟</span>
              <span className="chip !border-emerald-500/40 !text-emerald-300">完成 +{LESSON_XP} XP</span>
              {done && <span className="chip !border-emerald-500/60 bg-emerald-500/10 !text-emerald-300">已完成 ✓</span>}
            </div>
            <h1 className="text-3xl font-extrabold leading-tight text-white">
              {meta.titleZh}
              <span className="mt-1 block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-base font-semibold text-transparent">
                {meta.titleEn}
              </span>
            </h1>
            <p className="mt-3 text-[15px] leading-7 text-slate-400">{meta.summary}</p>
          </header>

          {children}

          {/* 底部操作区 */}
          <footer className="mt-16 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center">
            <div>
              {!done ? (
                <button onClick={() => completeLesson(lessonId)} className="btn-primary">
                  ✓ 完成本课 +{LESSON_XP} XP
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-300">
                  已完成 ✓ 经验已入账
                </span>
              )}
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
              {prev && (
                <Link href={lessonHref(prev.moduleId, prev.slug)} className="btn-ghost max-w-[45%] truncate px-4 text-sm">
                  ◀ {getLesson(prev.moduleId, prev.slug)?.titleZh}
                </Link>
              )}
              {next ? (
                <Link href={lessonHref(next.moduleId, next.slug)} className="btn-primary px-4 text-sm">
                  {getLesson(next.moduleId, next.slug)?.titleZh} ▶
                </Link>
              ) : (
                <Link href="/curriculum" className="btn-primary px-4 text-sm">
                  🏁 回到课程地图
                </Link>
              )}
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
