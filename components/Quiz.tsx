"use client";

import { useState } from "react";

export type QuizQuestion = { q: string; options: string[]; answer: number; explain: string };

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const answeredCount = Object.keys(picked).length;
  const score = questions.reduce((acc, q, i) => acc + (picked[i] === q.answer ? 1 : 0), 0);
  const allDone = answeredCount === questions.length;

  return (
    <div className="my-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white">
          <span>🎯</span> 随堂小测
        </h3>
        {allDone && (
          <span
            className={`text-sm font-semibold ${
              score === questions.length ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            得分：{score} / {questions.length}
            {score === questions.length ? " 🎉 全对！" : " · 错题看看解析，可以重做"}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {questions.map((q, qi) => {
          const chosen = picked[qi];
          return (
            <div key={qi} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="mb-3 font-medium leading-6 text-slate-100">
                {qi + 1}. {q.q}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const revealed = chosen !== undefined;
                  const isPicked = chosen === oi;
                  const isAnswer = q.answer === oi;
                  let cls =
                    "border-slate-700 bg-slate-800/50 text-slate-200 hover:border-indigo-400/60";
                  if (revealed && isAnswer) cls = "border-emerald-500/60 bg-emerald-500/10 text-emerald-200";
                  else if (revealed && isPicked) cls = "border-rose-500/60 bg-rose-500/10 text-rose-200";
                  else if (revealed) cls = "border-slate-800 bg-slate-900 text-slate-500";
                  return (
                    <button
                      key={oi}
                      disabled={revealed}
                      onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                      className={`rounded-xl border px-4 py-2.5 text-left text-sm transition ${cls}`}
                    >
                      {opt}
                      {revealed && isAnswer && <span className="ml-2">✓</span>}
                      {revealed && isPicked && !isAnswer && <span className="ml-2">✗</span>}
                    </button>
                  );
                })}
              </div>
              {chosen !== undefined && (
                <p className="anim-fade-up mt-3 rounded-lg bg-slate-800/60 px-4 py-2.5 text-sm leading-6 text-slate-300">
                  <span className="font-semibold text-indigo-300">解析：</span>
                  {q.explain}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {allDone && score < questions.length && (
        <button onClick={() => setPicked({})} className="btn-ghost mt-4 px-4 py-2 text-sm">
          🔄 重做一遍
        </button>
      )}
    </div>
  );
}
