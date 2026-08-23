"use client";

import { useState } from "react";
import { StepControls } from "./Stepper";

/**
 * DOM 树生长动画：HTML 文本如何被浏览器解析成一棵树。
 * 悬停树节点 ↔ 右侧页面元素互相高亮。
 */

type NodeId = "html" | "head" | "title" | "body" | "h1" | "p" | "b";

const TREE: { id: NodeId; depth: number; order: number; guide: string; tag: string; text?: string }[] = [
  { id: "html", depth: 0, order: 1, guide: "", tag: "html" },
  { id: "head", depth: 1, order: 2, guide: "├─", tag: "head" },
  { id: "title", depth: 2, order: 3, guide: "│ └─", tag: "title", text: "我的小站" },
  { id: "body", depth: 1, order: 4, guide: "└─", tag: "body" },
  { id: "h1", depth: 2, order: 5, guide: "  ├─", tag: "h1", text: "你好！" },
  { id: "p", depth: 2, order: 6, guide: "  └─", tag: "p", text: "这是<b>加粗</b>文本" },
  { id: "b", depth: 3, order: 7, guide: "      └─", tag: "b", text: "加粗" },
];

const STAGE_TEXT = [
  "硬盘上的 index.html 只是一个纯文本文件，浏览器还不知道里面有什么。",
  "读到 <html>，浏览器创建了根节点——整棵树的起点。",
  "接着分出两个分支：<head> 管幕后信息，<body> 管看得见的内容。",
  "<head> 里发现了 <title>，标签页标题有了着落。",
  "<body> 里有一个 <h1> 大标题节点。",
  "还有一个 <p> 段落节点。",
  "段落里还嵌套着一个 <b> 加粗——树长成了！这棵树就是传说中的 DOM（文档对象模型），JavaScript 之后就是靠操作它来改变页面的。",
];

export default function DomTree() {
  const [stage, setStage] = useState(1);
  const [hover, setHover] = useState<NodeId | null>(null);

  return (
    <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左：DOM 树 */}
        <div>
          <div className="mb-2 text-xs font-semibold text-slate-500">
            🌳 DOM 树 <span className="ml-2 font-normal text-indigo-300">悬停节点，右侧会亮起来</span>
          </div>
          <div className="min-h-[240px] rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[13px] leading-8">
            {TREE.map((n) => (
              <div
                key={n.id}
                style={{ paddingLeft: n.depth * 22 }}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                className={`flex items-center gap-2 whitespace-pre transition ${
                  stage >= n.order ? "" : "hidden"
                } ${hover === n.id ? "" : ""}`}
              >
                <span className="text-slate-600">{n.guide}</span>
                <span
                  className={`anim-pop cursor-pointer rounded-md px-2 py-0.5 transition ${
                    hover === n.id
                      ? "bg-indigo-500/25 ring-1 ring-indigo-400"
                      : "bg-slate-800/80 ring-1 ring-slate-700 hover:bg-slate-700"
                  }`}
                >
                  <span className="text-sky-300">&lt;{n.tag}&gt;</span>
                  {n.text && <span className="ml-1.5 text-emerald-300">{n.text}</span>}
                </span>
              </div>
            ))}
            {stage >= 7 && (
              <div className="mt-2 text-[11px] leading-5 text-violet-300">✨ 这棵树就叫 DOM</div>
            )}
          </div>
        </div>

        {/* 右：渲染结果 */}
        <div>
          <div className="mb-2 text-xs font-semibold text-slate-500">🖥️ 用户看到的页面</div>
          <div className="min-h-[240px] overflow-hidden rounded-xl border border-slate-700 bg-white">
            {/* 标签页栏 */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5">
              <span className={`rounded-t-lg bg-white px-3 py-0.5 text-[11px] text-slate-600 shadow-sm transition ${stage >= 3 && hover === "title" ? "ring-2 ring-indigo-400" : stage >= 3 ? "" : "opacity-20"}`}>
                {stage >= 3 ? "我的小站" : "…"}
              </span>
              <span className="ml-auto flex gap-1">
                <i className="h-2 w-2 rounded-full bg-rose-300" />
                <i className="h-2 w-2 rounded-full bg-amber-300" />
                <i className="h-2 w-2 rounded-full bg-emerald-300" />
              </span>
            </div>
            <div className="p-4">
              <h1
                className={`text-xl font-extrabold text-slate-800 transition ${stage >= 5 ? "" : "opacity-10"} ${
                  stage >= 5 && hover === "h1" ? "rounded bg-indigo-100 ring-2 ring-indigo-400" : ""
                }`}
              >
                你好！
              </h1>
              <p
                className={`mt-1.5 text-sm leading-6 text-slate-600 transition ${stage >= 6 ? "" : "opacity-10"} ${
                  stage >= 6 && hover === "p" ? "rounded bg-indigo-100 ring-2 ring-indigo-400" : ""
                }`}
              >
                这是<b className={stage >= 7 && hover === "b" ? "rounded bg-indigo-100 ring-2 ring-indigo-400" : ""}>加粗</b>文本
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 阶段说明 + 控制 */}
      <div className="mt-4 rounded-xl bg-slate-800/60 px-4 py-3 text-sm leading-6 text-slate-300">
        第 {stage} 步：{STAGE_TEXT[stage - 1]}
      </div>
      <StepControls count={7} current={stage - 1} onChange={(i) => setStage(i + 1)} />
    </div>
  );
}
