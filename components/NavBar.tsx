"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgress } from "@/lib/progress";

const LINKS = [
  { href: "/", label: "首页" },
  { href: "/curriculum", label: "课程地图" },
  { href: "/achievements", label: "成就墙" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { xp, level, xpInLevel } = useProgress();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 font-mono text-xs font-bold text-white shadow-md shadow-indigo-500/30">
            {"</>"}
          </span>
          <span className="text-sm font-bold text-white">
            CodeCanvas
            <span className="ml-1.5 hidden font-normal text-slate-400 sm:inline">代码画布</span>
          </span>
        </Link>

        {/* 链接 */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-2.5 py-1.5 text-sm transition sm:px-3 ${
                  active ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          {/* XP HUD */}
          <Link
            href="/achievements"
            className="ml-1 flex items-center gap-2 rounded-full border border-slate-700 py-1 pl-1 pr-3 transition hover:border-indigo-400"
            title={`总经验 ${xp} XP`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
              {level}
            </span>
            <span className="hidden flex-col gap-0.5 md:flex">
              <span className="font-mono text-[10px] leading-none text-slate-400">{xp} XP</span>
              <span className="h-1 w-16 overflow-hidden rounded-full bg-slate-800">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 transition-all"
                  style={{ width: `${xpInLevel}%` }}
                />
              </span>
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
