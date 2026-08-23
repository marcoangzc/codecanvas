import Link from "next/link";
import { MODULES, TOTAL_LIVE_LESSONS, lessonHref } from "@/lib/curriculum";

const FEATURES = [
  {
    icon: "⌨️",
    title: "实时代码演练场",
    en: "Live Playground",
    desc: "左边敲代码，右边立刻看到效果，还有控制台看输出。写错也不怕，随时一键重置。",
  },
  {
    icon: "🎞️",
    title: "动画概念图",
    en: "Animated Concepts",
    desc: "HTTP 请求怎么走、DOM 树怎么长、盒模型怎么算——抽象概念全部变成会动的画面。",
  },
  {
    icon: "👣",
    title: "分步交互讲解",
    en: "Step by Step",
    desc: "每一步都可以暂停、回退、自己控制节奏。理解了再前进，不赶时间。",
  },
  {
    icon: "🏆",
    title: "进度与成就",
    en: "XP & Badges",
    desc: "经验值、等级、徽章收集。学习像打游戏一样有反馈，进度自动存在你的浏览器。",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* ---------------- Hero ---------------- */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="anim-fade-up">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="chip !border-indigo-400/40 !text-indigo-300">🧭 0 基础友好</span>
              <span className="chip !border-violet-400/40 !text-violet-300">🀄 中英双语</span>
              <span className="chip !border-emerald-400/40 !text-emerald-300">👀 可视化优先</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl">
              看得见的
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                全栈开发
              </span>
              学习之旅
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-slate-400">
              像 freeCodeCamp 一样的完整路线，但每一个抽象概念都被拆成
              <b className="text-slate-200">动画</b>和<b className="text-slate-200">互动实验</b>：
              网页如何诞生、盒模型如何计算、Flexbox 如何排队——边看边写，真正理解，而不是死记硬背。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={lessonHref("m1", "how-web-works")} className="btn-primary px-6 py-3">
                🚀 开始第一课（免费）
              </Link>
              <Link href="/curriculum" className="btn-ghost px-6 py-3">
                查看课程地图
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-3 text-center">
              {[
                { n: "6", l: "大模块" },
                { n: String(TOTAL_LIVE_LESSONS), l: "节精品课已上线" },
                { n: "4", l: "种互动形式" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-slate-800 bg-slate-900/50 px-2 py-3">
                  <div className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-2xl font-extrabold text-transparent">
                    {s.n}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：代码 → 页面 动画示意 */}
          <HeroDemo />
        </div>
      </section>

      {/* ---------------- 特色 ---------------- */}
      <section className="border-y border-slate-800/60 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold text-white">
            为什么这里的内容<span className="text-indigo-400">「看得懂」</span>？
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            四种互动形式，覆盖你学习时的每一种卡壳瞬间
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="card transition hover:-translate-y-1 hover:border-indigo-500/40">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 font-bold text-white">
                  {f.title}
                  <span className="term-en">{f.en}</span>
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 路线图速览 ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">你的成长路线</h2>
            <p className="mt-1 text-sm text-slate-500">从第一行 HTML 到部署自己的全栈应用</p>
          </div>
          <Link href="/curriculum" className="text-sm text-indigo-400 hover:text-indigo-300">
            完整地图 →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <ModuleCard key={m.id} id={m.id} icon={m.icon} zh={m.titleZh} en={m.titleEn} tagline={m.tagline} accent={m.accent} live={m.status === "live"} levelLabel={m.levelLabel} count={m.lessons.length} />
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/15 via-slate-900 to-violet-600/10 p-10 text-center">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <h2 className="relative text-2xl font-bold text-white">准备好了吗？</h2>
          <p className="relative mt-2 text-sm text-slate-400">
            第一课只要 12 分钟——你会亲眼看到网页诞生的全过程。
          </p>
          <Link href={lessonHref("m1", "how-web-works")} className="btn-primary relative mt-6 px-8 py-3">
            出发 🚀
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ---------- 小组件 ---------- */

function ModuleCard({
  id,
  icon,
  zh,
  en,
  tagline,
  accent,
  live,
  levelLabel,
  count,
}: {
  id: string;
  icon: string;
  zh: string;
  en: string;
  tagline: string;
  accent: string;
  live: boolean;
  levelLabel: string;
  count: number;
}) {
  const inner = (
    <>
      <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${accent} ${live ? "" : "opacity-40"}`} />
      <div className="flex items-start justify-between">
        <span className={`text-2xl ${live ? "" : "opacity-60 grayscale-[0.4]"}`}>{icon}</span>
        <span className={`chip text-[10px] ${live ? "!border-emerald-500/50 !text-emerald-300" : ""}`}>
          {live ? `已上线 · ${count} 课` : "敬请期待"}
        </span>
      </div>
      <h3 className="mt-3 font-bold text-white">
        {zh}
        <span className="term-en">{en}</span>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500">{tagline}</p>
      <div className="mt-3 text-[11px] text-slate-500">难度：<span className="text-slate-400">{levelLabel}</span></div>
    </>
  );
  const cls = `card relative overflow-hidden pt-7 transition ${
    live ? "cursor-pointer hover:-translate-y-1 hover:border-indigo-500/40" : "opacity-70"
  }`;
  return live ? (
    <Link href={`/learn/${id}`} className={cls}>{inner}</Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/** 纯 CSS 动画：左边代码逐行出现，右边渲染出页面 */
function HeroDemo() {
  return (
    <div className="anim-fade-up hidden lg:block" style={{ animationDelay: "0.15s" }}>
      <div className="anim-float relative mx-auto max-w-md">
        {/* 浏览器窗口 */}
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-2">
            <i className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <i className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 flex-1 truncate rounded-full bg-slate-950 px-3 py-1 font-mono text-[10px] text-slate-500">
              https://my-first-page.dev
            </span>
          </div>
          <div className="grid grid-cols-2">
            {/* 代码侧 */}
            <div className="space-y-1.5 border-r border-slate-800 bg-slate-950/80 p-3 font-mono text-[10.5px] leading-5">
              <div className="anim-fade-up" style={{ animationDelay: ".3s" }}>
                <span className="text-sky-300">&lt;h1&gt;</span>
                <span className="text-slate-200">你好！</span>
                <span className="text-sky-300">&lt;/h1&gt;</span>
              </div>
              <div className="anim-fade-up" style={{ animationDelay: ".7s" }}>
                <span className="text-sky-300">&lt;p&gt;</span>
                <span className="text-slate-200">我在学全栈</span>
                <span className="text-sky-300">&lt;/p&gt;</span>
              </div>
              <div className="anim-fade-up" style={{ animationDelay: "1.1s" }}>
                <span className="text-violet-300">h1</span>
                <span className="text-slate-400"> {"{"}</span>
                <span className="ml-1 block text-emerald-300">color: indigo;</span>
                <span className="text-slate-400">{"}"}</span>
              </div>
              <span className="caret inline-block h-3.5 w-1.5 bg-indigo-400 align-middle" />
            </div>
            {/* 渲染侧 */}
            <div className="min-h-[150px] bg-white p-4">
              <h1 className="anim-pop text-xl font-extrabold text-indigo-600" style={{ animationDelay: "1.5s" }}>
                你好！
              </h1>
              <p className="anim-pop mt-1 text-xs text-slate-600" style={{ animationDelay: "1.9s" }}>
                我在学全栈
              </p>
              <div className="anim-pop mt-3 h-8 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-500" style={{ animationDelay: "2.3s" }} />
            </div>
          </div>
        </div>
        {/* 悬浮徽章 */}
        <div className="absolute -bottom-5 -left-6 anim-float rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 shadow-xl" style={{ animationDelay: "1s" }}>
          <div className="font-mono text-[10px] text-slate-500">实时预览</div>
          <div className="text-sm font-bold text-emerald-400">● Live</div>
        </div>
      </div>
    </div>
  );
}
