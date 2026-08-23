"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LESSON_XP, MODULES, TOTAL_LIVE_LESSONS } from "@/lib/curriculum";

/* ------------------------------------------------------------------ */
/* badges                                                              */
/* ------------------------------------------------------------------ */

export type BadgeDef = { id: string; icon: string; name: string; en: string; desc: string };

export const BADGES: BadgeDef[] = [
  { id: "first-step", icon: "🌱", name: "初来乍到", en: "First Step", desc: "完成你的第一节课" },
  { id: "halfway", icon: "⛰️", name: "行百里者", en: "Halfway Hero", desc: "完成 5 节课程" },
  { id: "module-m1", icon: "🏅", name: "网页基础通关", en: "Foundations Clear", desc: "完成第 1 模块全部课程" },
  { id: "module-m2", icon: "⚡", name: "JS 思维通关", en: "JavaScript Clear", desc: "完成第 2 模块全部课程" },
  { id: "module-m3", icon: "🧩", name: "React 入门通关", en: "React Initiate", desc: "完成第 3 模块全部课程" },
  { id: "module-m4", icon: "🛠️", name: "后端之门通关", en: "Backend Gate", desc: "完成第 4 模块全部课程" },
  { id: "module-m5", icon: "🗄️", name: "数据库通关", en: "Database Clear", desc: "完成第 5 模块全部课程" },
  { id: "module-m6", icon: "🚀", name: "全栈毕业", en: "Full-Stack Graduate", desc: "完成毕业挑战，走完全部旅程" },
  { id: "server-handshake", icon: "🤝", name: "服务器握手", en: "Server Handshake", desc: "第一次成功调用服务端校验 API" },
  { id: "perfectionist", icon: "💎", name: "一次成型", en: "Perfectionist", desc: "结课挑战第一次提交就全部通过" },
];

/* ------------------------------------------------------------------ */
/* state                                                               */
/* ------------------------------------------------------------------ */

type ProgressState = { completed: string[]; xp: number; badges: string[] };

const EMPTY: ProgressState = { completed: [], xp: 0, badges: [] };
const STORAGE_KEY = "codecanvas-progress-v1";

type Toast = { key: number; icon: string; title: string; sub?: string };

type ProgressContextValue = {
  hydrated: boolean;
  completed: string[];
  xp: number;
  badges: string[];
  level: number;
  xpInLevel: number;
  isDone: (lessonId: string) => boolean;
  completeLesson: (lessonId: string) => void;
  award: (badgeId: string) => void;
  resetAll: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // load once
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ProgressState>;
        setState({
          completed: Array.isArray(parsed.completed) ? parsed.completed : [],
          xp: typeof parsed.xp === "number" ? parsed.xp : 0,
          badges: Array.isArray(parsed.badges) ? parsed.badges : [],
        });
      }
    } catch {
      /* corrupted storage -> start fresh */
    }
    setHydrated(true);
  }, []);

  // persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [state, hydrated]);

  const pushToast = useCallback((icon: string, title: string, sub?: string) => {
    const key = Date.now() + Math.random();
    setToasts((t) => [...t, { key, icon, title, sub }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), 4000);
  }, []);

  const award = useCallback(
    (badgeId: string) => {
      setState((s) => {
        if (s.badges.includes(badgeId)) return s;
        const def = BADGES.find((b) => b.id === badgeId);
        if (def) pushToast(def.icon, `成就解锁：${def.name}`, def.en);
        return { ...s, badges: [...s.badges, badgeId] };
      });
    },
    [pushToast],
  );

  const completeLesson = useCallback(
    (lessonId: string) => {
      setState((s) => {
        if (s.completed.includes(lessonId)) return s;
        const completed = [...s.completed, lessonId];
        const xp = s.xp + LESSON_XP;
        // auto badges
        const nextBadges = new Set(s.badges);
        const queue: (() => void)[] = [];
        if (!nextBadges.has("first-step")) {
          nextBadges.add("first-step");
          queue.push(() => pushToast("🌱", "成就解锁：初来乍到", "First Step"));
        }
        if (completed.length >= 5 && !nextBadges.has("halfway")) {
          nextBadges.add("halfway");
          queue.push(() => pushToast("⛰️", "成就解锁：行百里者", "Halfway Hero"));
        }
        // 每个模块的全部课程都完成 → 解锁对应「通关」徽章
        for (const mod of MODULES) {
          const badgeId = `module-${mod.id}`;
          const def = BADGES.find((b) => b.id === badgeId);
          if (!def || nextBadges.has(badgeId)) continue;
          const allDone = mod.lessons.every((l) => completed.includes(`${mod.id}/${l.slug}`));
          if (!allDone) continue;
          nextBadges.add(badgeId);
          queue.push(() => pushToast(def.icon, `成就解锁：${def.name}`, def.en));
        }
        // fire toasts outside the reducer
        setTimeout(() => queue.forEach((f) => f()), 0);
        return { ...s, completed, xp, badges: [...nextBadges] };
      });
      pushToast("✨", `课程完成！+${LESSON_XP} XP`);
    },
    [pushToast],
  );

  const resetAll = useCallback(() => {
    setState(EMPTY);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<ProgressContextValue>(() => {
    const level = Math.floor(state.xp / 100) + 1;
    return {
      hydrated,
      completed: state.completed,
      xp: state.xp,
      badges: state.badges,
      level,
      xpInLevel: state.xp % 100,
      isDone: (id: string) => state.completed.includes(id),
      completeLesson,
      award,
      resetAll,
    };
  }, [state, hydrated, completeLesson, award, resetAll]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
      {/* toast stack */}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-72 flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.key}
            className="anim-pop flex items-center gap-3 rounded-xl border border-indigo-400/30 bg-slate-900/95 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur"
          >
            <span className="text-2xl">{t.icon}</span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">{t.title}</div>
              {t.sub && <div className="truncate text-xs text-slate-400">{t.sub}</div>}
            </div>
          </div>
        ))}
      </div>
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within <ProgressProvider>");
  return ctx;
}
