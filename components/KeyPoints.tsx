/** 本课要点回顾卡片 */
export default function KeyPoints({ points }: { points: string[] }) {
  return (
    <div className="my-10 rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 p-6">
      <div className="mb-3 flex items-center gap-2 text-base font-bold text-white">
        <span>📌</span> 本课要点 · Key Takeaways
      </div>
      <ul className="space-y-2 text-sm leading-6 text-slate-300">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[3px] text-indigo-400">✦</span>
            <span dangerouslySetInnerHTML={{ __html: p }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
