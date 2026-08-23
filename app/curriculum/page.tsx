import Link from "next/link";
import { MODULES, lessonHref } from "@/lib/curriculum";
import Callout from "@/components/Callout";
import DoneDot from "@/components/DoneDot";

export default function CurriculumPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          课程地图 <span className="term-en">Curriculum</span>
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-slate-400">
          六大模块，从 0 基础到能独立开发并部署完整的全栈应用。
          每个模块都围绕「看得懂」设计：概念有动画、代码有演练场、学完有小测、结课有挑战。
        </p>
      </header>

      <Callout variant="tip" title="学习建议">
        按顺序学习效果最好。每课约 15–25 分钟：<b>先看动画理解 → 再去演练场亲手敲一遍 → 最后做小测检验</b>。
        千万不要只看不练——写错、修错的过程才是真正在学会。
      </Callout>

      {/* 路线 */}
      <div className="relative mt-12 space-y-6 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-gradient-to-b before:from-indigo-500/60 before:via-slate-700 before:to-slate-800">
        {MODULES.map((m) => (
          <div key={m.id} className="relative flex gap-5">
            {/* 节点圆 */}
            <div
              className={`z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-2xl ${
                m.status === "live"
                  ? "border-indigo-400/60 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 shadow-lg shadow-indigo-500/10"
                  : "border-slate-700 bg-slate-900 opacity-70"
              }`}
            >
              {m.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="card !p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-white">
                    {m.titleZh}
                    <span className="term-en">{m.titleEn}</span>
                  </h2>
                  <span className={`chip ml-auto text-[10px] ${m.status === "live" ? "!border-emerald-500/50 !text-emerald-300" : ""}`}>
                    {m.status === "live" ? "🟢 已上线" : "⏳ 敬请期待"}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">{m.tagline}</p>
                <div className="mt-2 text-xs text-slate-500">难度：{m.levelLabel}</div>

                {m.status === "live" ? (
                  /* 已上线：逐课列表 */
                  <ol className="mt-4 space-y-1.5">
                    {m.lessons.map((l, i) => (
                      <li key={l.slug}>
                        <Link
                          href={lessonHref(m.id, l.slug)}
                          className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 transition hover:border-indigo-500/40 hover:bg-indigo-500/5"
                        >
                          <DoneDot id={`${m.id}/${l.slug}`} />
                          <span className="font-mono text-xs text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                          <span className="min-w-0 truncate text-sm text-slate-300 group-hover:text-white">
                            {l.titleZh}
                            <span className="ml-2 hidden font-mono text-xs text-slate-500 sm:inline">{l.titleEn}</span>
                          </span>
                          <span className="ml-auto shrink-0 font-mono text-[11px] text-slate-600">{l.minutes}′</span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                ) : (
                  /* 未上线：主题标签 */
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.outline?.map((o) => (
                      <span key={o.en} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-400">
                        {o.zh} <span className="font-mono text-[10px] text-slate-600">{o.en}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 p-6 text-center">
        <div className="text-2xl">🗺️</div>
        <h3 className="mt-2 font-bold text-white">路线会持续生长</h3>
        <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-400">
          六大模块全部上线，从第一行 HTML 一直陪你到毕业挑战。
          还没出发？现在就是最好的时机！
        </p>
        <Link href={lessonHref("m1", "how-web-works")} className="btn-primary mt-4 px-6 py-2.5">
          🚀 开始第一课
        </Link>
      </div>
    </main>
  );
}
