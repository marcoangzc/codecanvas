"use client";

import { useRef, useState } from "react";
import { getChecksForLesson, type Check } from "@/lib/checks";
import { useProgress } from "@/lib/progress";

/**
 * 结课挑战：左边写完整 HTML，右边实时核对清单；
 * 点击提交 → POST /api/validate 由服务器校验（顺便演示一次真实的 HTTP 往返）。
 */

const CONFETTI_COLORS = ["#818cf8", "#34d399", "#fbbf24", "#f472b6", "#38bdf8"];

function safeTest(c: Check, code: string): boolean {
  try {
    return c.test(code);
  } catch {
    return false;
  }
}

export default function Challenge({
  lessonId,
  starterCode,
}: {
  lessonId: string;
  starterCode: string;
}) {
  // 规则由客户端自行获取（函数无法跨服务端边界传递）
  const checks = getChecksForLesson(lessonId) ?? [];
  const [code, setCode] = useState(starterCode);
  const [srv, setSrv] = useState<{ status: number; ms: number; body: unknown } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [celebrate, setCelebrate] = useState<{ left: number; color: string; delay: number }[] | null>(null);
  const submitsRef = useRef(0);
  const { completeLesson, award } = useProgress();

  const results = checks.map((c) => ({ check: c, pass: safeTest(c, code) }));
  const passedCount = results.filter((r) => r.pass).length;
  const allPassLocal = passedCount === checks.length;
  const srvResults = (srv?.body as { results?: { id: string; pass: boolean }[] } | undefined)?.results;
  const srvPass = (srv?.body as { pass?: boolean } | undefined)?.pass ?? false;

  async function submit() {
    setSubmitting(true);
    const t0 = performance.now();
    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, code }),
      });
      const body = (await res.json()) as { pass?: boolean };
      const ms = Math.round(performance.now() - t0);
      setSrv({ status: res.status, ms, body });
      submitsRef.current += 1;

      if (body.pass && res.ok) {
        completeLesson(lessonId);
        award("server-handshake");
        if (submitsRef.current === 1) award("perfectionist");
        setCelebrate(
          Array.from({ length: 30 }, () => ({
            left: Math.random() * 100,
            color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
            delay: Math.random() * 0.8,
          })),
        );
        setTimeout(() => setCelebrate(null), 3200);
      }
    } catch {
      setSrv({ status: 0, ms: Math.round(performance.now() - t0), body: { error: "网络请求失败，请重试" } });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative my-8 overflow-visible rounded-2xl border border-slate-800 bg-slate-900/70">
      {/* 礼花 */}
      {celebrate && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-full overflow-hidden">
          {celebrate.map((p, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{ left: `${p.left}%`, background: p.color, animationDelay: `${p.delay}s` }}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-2.5">
        <span className="font-mono text-xs text-slate-400">📄 index.html</span>
        <span className="ml-auto font-mono text-xs text-slate-500">
          实时核对：{passedCount} / {checks.length}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_330px]">
        {/* 编辑器 */}
        <div className="relative h-[480px] border-b border-slate-800 lg:border-b-0 lg:border-r">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            aria-label="挑战代码编辑器"
            className="editor-area absolute inset-0"
          />
        </div>

        {/* 清单 + 提交 */}
        <div className="flex flex-col">
          <ul className="max-h-[360px] flex-1 space-y-1.5 overflow-y-auto p-4">
            {results.map(({ check, pass }, i) => (
              <li key={check.id} className="flex gap-2.5 text-xs leading-5">
                <span className={`mt-0.5 shrink-0 ${pass ? "text-emerald-400" : "text-slate-600"}`}>
                  {pass ? "✓" : "○"}
                </span>
                <div>
                  <span className={pass ? "text-slate-400 line-through decoration-slate-600" : "text-slate-200"}>
                    {i + 1}. {check.label}
                  </span>
                  {!pass && srvResults && (
                    <p className="mt-0.5 text-[11px] leading-4 text-amber-300/90">
                      💡 {check.hint}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-800 p-4">
            <button
              onClick={submit}
              disabled={submitting || !allPassLocal}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "⏳ 正在发送请求…" : allPassLocal ? "🚀 提交到服务器验证" : `还差 ${checks.length - passedCount} 项`}
            </button>
            {!allPassLocal && (
              <p className="mt-2 text-center text-[11px] leading-4 text-slate-500">
                本地清单全部打勾后，才能提交给服务器哦
              </p>
            )}

            {/* HTTP 检查器 */}
            {srv && (
              <div className="anim-fade-up mt-3 rounded-xl border border-slate-700 bg-slate-950 p-3 font-mono text-[11px] leading-5">
                <div className="flex items-center justify-between text-slate-400">
                  <span>
                    <b className="text-amber-300">POST</b> /api/validate
                  </span>
                  <span className={srv.status === 200 ? "text-emerald-400" : "text-rose-400"}>
                    {srv.status === 200 ? "200 OK ✓" : srv.status === 0 ? "FAILED" : srv.status}
                  </span>
                </div>
                <div className="text-slate-500">{srv.ms}ms · application/json</div>
                <pre className="mt-1.5 max-h-24 overflow-auto whitespace-pre-wrap text-sky-200">
                  {JSON.stringify(srv.body, null, 1)}
                </pre>
                {srv.status === 200 && srvPass && (
                  <div className="mt-2 rounded-lg bg-emerald-500/15 px-2.5 py-1.5 text-center text-xs font-bold text-emerald-300">
                    🎉 服务器确认：全部通过！+50 XP
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
