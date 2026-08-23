"use client";

import { useProgress } from "@/lib/progress";

/** 课程列表里的完成状态圆点 */
export default function DoneDot({ id }: { id: string }) {
  const { isDone } = useProgress();
  return isDone(id) ? (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
      ✓
    </span>
  ) : (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-600">
      ○
    </span>
  );
}
