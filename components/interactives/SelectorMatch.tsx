"use client";

import { useMemo, useState } from "react";

/**
 * 选择器匹配小游戏：给出一条 CSS 选择器，点击页面上所有会被选中的元素。
 * 把「选择器规则」变成可动手验证的直觉。
 */

type El = { id: string; tag: string; classes: string[]; elId?: string; text: string };

const ELEMENTS: El[] = [
  { id: "h1-top", tag: "h1", classes: ["logo"], elId: "top", text: "我的咖啡博客" },
  { id: "p-intro", tag: "p", classes: ["intro"], text: "关于手冲咖啡的第一段介绍……" },
  { id: "p-tip", tag: "p", classes: ["intro", "tip"], text: "小提示：水温 90°C。" },
  { id: "div-box", tag: "div", classes: ["box"], text: "盒子 A" },
  { id: "a-contact", tag: "a", classes: [], elId: "contact", text: "联系我" },
];

const ROUNDS: { sel: string; hits: string[]; why: string }[] = [
  { sel: "h1", hits: ["h1-top"], why: "元素选择器：选中页面上所有 <h1> 元素，只看标签名。" },
  { sel: ".intro", hits: ["p-intro", "p-tip"], why: "类选择器：class 里包含 intro 的所有元素——跟标签是什么没有关系，所以 h1 和 div 都不会中。" },
  { sel: "p.tip", hits: ["p-tip"], why: "组合条件：既要是 <p> 标签、又要有 tip 类。p-intro 没有 tip 类，所以不中。" },
  { sel: "#top", hits: ["h1-top"], why: "ID 选择器：id 是元素的身份证号，整个页面最多只有一个 #top。注意别写成 .top 哦。" },
  { sel: "div", hits: ["div-box"], why: "只选 <div> 元素。其他标签再像也不算。" },
  { sel: "*", hits: ELEMENTS.map((e) => e.id), why: "通配符选择器：选中一切元素。常用来做全局重置，比如 * { margin: 0 }。" },
];

function describe(el: El): string {
  const cls = el.classes.length ? ` class="${el.classes.join(" ")}"` : "";
  const id = el.elId ? ` id="${el.elId}"` : "";
  return `<${el.tag}${id}${cls}>${el.text}</${el.tag}>`;
}

export default function SelectorMatch() {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [judged, setJudged] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const r = ROUNDS[round];
  const correct = useMemo(() => new Set(r.hits), [r]);
  const isPerfect = useMemo(
    () => picked.size === correct.size && [...picked].every((p) => correct.has(p)),
    [picked, correct],
  );

  function toggle(id: string) {
    if (judged) return;
    setPicked((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function judge() {
    if (picked.size === 0) return;
    setJudged(true);
    if (isPerfect) setScore((s) => s + 1);
  }

  function nextRound() {
    if (round + 1 >= ROUNDS.length) {
      setFinished(true);
      return;
    }
    setRound((v) => v + 1);
    setPicked(new Set());
    setJudged(false);
  }

  function restart() {
    setRound(0);
    setPicked(new Set());
    setJudged(false);
    setScore(0);
    setFinished(false);
  }

  const chipCls = (id: string) => {
    const hit = correct.has(id);
    const isPicked = picked.has(id);
    let cls = "border-slate-700 bg-slate-900 hover:border-indigo-400/70";
    if (!judged && isPicked) cls = "border-indigo-400 bg-indigo-500/15 ring-1 ring-indigo-400";
    if (judged && hit && isPicked) cls = "border-emerald-500 bg-emerald-500/15";
    if (judged && hit && !isPicked) cls = "border-amber-500/80 bg-amber-500/10"; // 漏选
    if (judged && !hit && isPicked) cls = "border-rose-500 bg-rose-500/15";
    return cls;
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-white">🎮 选择器猎手</h3>
        <span className="font-mono text-xs text-slate-500">
          第 {Math.min(round + 1, ROUNDS.length)} / {ROUNDS.length} 轮 · 得分 {score}
        </span>
      </div>

      {!finished ? (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-slate-800/60 px-4 py-3">
            <span className="text-sm text-slate-300">哪几个元素会被这条规则选中？</span>
            <code className="rounded-lg bg-indigo-500/15 px-3 py-1 font-mono text-base font-bold text-indigo-200">
              {r.sel} {"{ … }"}
            </code>
          </div>

          <div className="grid gap-2">
            {ELEMENTS.map((el) => (
              <button
                key={el.id}
                onClick={() => toggle(el.id)}
                disabled={judged}
                className={`rounded-xl border px-4 py-2.5 text-left font-mono text-[13px] leading-5 text-slate-300 transition ${chipCls(
                  el.id
                )} ${judged ? "cursor-default" : "cursor-pointer"}`}
              >
                {describe(el)}
                {judged && correct.has(el.id) && !picked.has(el.id) && (
                  <span className="ml-2 text-xs text-amber-300">← 漏了它！</span>
                )}
              </button>
            ))}
          </div>

          {!judged ? (
            <button onClick={judge} disabled={picked.size === 0} className="btn-primary mt-4 px-5 py-2 text-sm disabled:opacity-40">
              判定！
            </button>
          ) : (
            <div className="anim-fade-up mt-4 space-y-3">
              <div
                className={`rounded-xl px-4 py-3 text-sm font-bold ${
                  isPerfect ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"
                }`}
              >
                {isPerfect ? "🎉 完美命中！" : "😅 差一点——"}
                <span className="ml-1 font-normal text-slate-300">{r.why}</span>
              </div>
              <button onClick={nextRound} className="btn-primary px-5 py-2 text-sm">
                {round + 1 >= ROUNDS.length ? "看看成绩 🏁" : "下一轮 ▶"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="py-8 text-center">
          <div className="text-5xl">{score >= 5 ? "🏆" : score >= 3 ? "👍" : "💪"}</div>
          <p className="mt-3 text-lg font-bold text-white">
            最终得分：{score} / {ROUNDS.length}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {score >= 5 ? "选择器已经被你拿捏了，去演练场实战吧！" : "再玩一轮巩固一下，选择器是 CSS 的地基～"}
          </p>
          <button onClick={restart} className="btn-ghost mt-4 px-5 py-2 text-sm">
            🔄 再来一轮
          </button>
        </div>
      )}
    </div>
  );
}
