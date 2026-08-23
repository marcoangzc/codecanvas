import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULES, getModule, lessonHref } from "@/lib/curriculum";
import DoneDot from "@/components/DoneDot";
import StartButton from "@/components/StartButton";

export function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.id }));
}

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: moduleId } = await params;
  const mod = getModule(moduleId);
  if (!mod) notFound();

  /* ---------- 未上线模块 ---------- */
  if (mod.status === "soon") {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-16 text-center">
        <div className="text-6xl opacity-80">{mod.icon}</div>
        <h1 className="mt-5 text-3xl font-extrabold text-white">
          {mod.titleZh}
          <span className="term-en">{mod.titleEn}</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-slate-400">{mod.tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {mod.outline?.map((o) => (
            <span key={o.en} className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-400">
              {o.zh} <span className="font-mono text-[10px] text-slate-600">{o.en}</span>
            </span>
          ))}
        </div>
        <div className="mt-10 inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-4 text-sm text-slate-500">
          ⏳ 这个模块正在制作中，会以同样的可视化标准上线
        </div>
        <div className="mt-8">
          <Link href="/curriculum" className="btn-ghost px-5 py-2.5 text-sm">← 返回课程地图</Link>
        </div>
      </main>
    );
  }

  /* ---------- 已上线模块 ---------- */
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-10">
      {/* 模块头 */}
      <header className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br ${mod.accent} p-[1px]`}>
        <div className="rounded-3xl bg-slate-950/90 p-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{mod.icon}</span>
            <div>
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                {mod.titleZh}
                <span className="term-en">{mod.titleEn}</span>
              </h1>
              <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-400">{mod.tagline}</p>
            </div>
            <span className="chip ml-auto hidden sm:inline-flex">难度：{mod.levelLabel}</span>
          </div>
          <StartButton moduleId={mod.id} />
        </div>
      </header>

      {/* 课程卡片 */}
      <h2 className="mb-4 mt-10 text-lg font-bold text-white">📚 本模块课程（{mod.lessons.length} 节）</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {mod.lessons.map((l, i) => (
          <Link
            key={l.slug}
            href={lessonHref(mod.id, l.slug)}
            className="card group !p-5 transition hover:-translate-y-0.5 hover:border-indigo-500/40"
          >
            <div className="flex items-center gap-3">
              <DoneDot id={`${mod.id}/${l.slug}`} />
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="truncate font-bold text-white group-hover:text-indigo-300">{l.titleZh}</h3>
                </div>
                <div className="mt-0.5 truncate font-mono text-[11px] text-slate-500">{l.titleEn}</div>
              </div>
              <span className="ml-auto shrink-0 font-mono text-xs text-slate-600">{l.minutes}′</span>
            </div>
            <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-400">{l.summary}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/curriculum" className="text-sm text-indigo-400 hover:text-indigo-300">
          ← 返回课程地图，看看后面的路线
        </Link>
      </div>
    </main>
  );
}
