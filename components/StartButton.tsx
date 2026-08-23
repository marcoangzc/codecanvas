"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { getModule, lessonHref } from "@/lib/curriculum";

/** 模块页的智能按钮：跳到第一节未完成的课（全部完成则回第一课复习） */
export default function StartButton({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  const { isDone } = useProgress();
  if (!mod || mod.status !== "live") return null;

  const firstUndone = mod.lessons.find((l) => !isDone(`${moduleId}/${l.slug}`));
  const target = firstUndone ?? mod.lessons[0];
  const doneCount = mod.lessons.filter((l) => isDone(`${moduleId}/${l.slug}`)).length;
  const allDone = doneCount === mod.lessons.length;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <Link href={lessonHref(moduleId, target.slug)} className="btn-primary px-6 py-2.5">
        {allDone ? `🔄 复习：${target.titleZh}` : firstUndone ? (doneCount > 0 ? `▶ 继续：${target.titleZh}` : `🚀 开始学习`) : "开始学习"}
      </Link>
      <span className="font-mono text-xs text-slate-400">
        进度 {doneCount} / {mod.lessons.length}
      </span>
    </div>
  );
}
