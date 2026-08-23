"use client";

import { useState } from "react";

/**
 * HTML 文档解剖图：左边点代码行，右边对应的渲染区域高亮 + 解释。
 * 建立「源代码 ↔ 页面」的双向直觉。
 */

type PartId = "doctype" | "html" | "head" | "title" | "body" | "h1" | "p";

const LINES: { part?: PartId; code: string }[] = [
  { part: "doctype", code: "<!DOCTYPE html>" },
  { part: "html", code: '<html lang="zh-CN">' },
  { code: "  <head>" },
  { part: "title", code: "    <title>小明的个人站</title>" },
  { code: "  </head>" },
  { part: "body", code: "  <body>" },
  { part: "h1", code: "    <h1>你好，世界！</h1>" },
  { part: "p", code: "    <p>这是我的第一个网页。</p>" },
  { code: "  </body>" },
  { part: "html", code: "</html>" },
];

const EXPLAIN: Record<PartId, { t: string; en: string; d: string }> = {
  doctype: {
    t: "文档类型声明",
    en: "DOCTYPE",
    d: "它不是标签，而是一句声明：告诉浏览器「请用现代标准模式来渲染我」。永远固定写在第一行。",
  },
  html: {
    t: "根元素",
    en: "Root Element",
    d: "整个文档的老祖宗，其他所有元素都是它的子孙。lang 属性声明页面语言，方便读屏软件和翻译工具。",
  },
  head: {
    t: "幕后配置区",
    en: "Head",
    d: "放给浏览器和搜索引擎看的「元信息」：字符编码、页面标题等。注意：用户看不到这里面的内容。",
  },
  title: {
    t: "标签页标题",
    en: "Title",
    d: "显示在浏览器标签页、收藏夹和搜索结果里的文字——就是浏览器窗口上方那行字。",
  },
  body: {
    t: "正文容器",
    en: "Body",
    d: "用户在窗口里看到的一切内容都住在这里：文字、图片、按钮……全部都是 body 的孩子。",
  },
  h1: {
    t: "一级标题",
    en: "Heading 1",
    d: "页面最重要的标题，默认显示为大号加粗。更重要的是它的含义：「这是整个页面的核心主题」。",
  },
  p: {
    t: "段落",
    en: "Paragraph",
    d: "一段有完整意思的文字。浏览器会自动在段落之间留出间距——不用你手动空两行。",
  },
};

/** 极简语法高亮 */
function hl(code: string): string {
  const esc = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc
    .replace(/([\w-]+)=(&quot;|")([^"]*)(&quot;|")/g, '<span class="attr">$1</span>=<span class="val">$2$3$4</span>')
    .replace(/(&lt;\/?)([\w!-]+)/g, '$1<span class="tag">$2</span>');
}

export default function DocAnatomy() {
  const [sel, setSel] = useState<PartId | null>(null);

  return (
    <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左：代码 */}
        <div>
          <div className="mb-2 text-xs font-semibold text-slate-500">
            📄 index.html <span className="ml-2 font-normal text-indigo-300">👆 点击任意一行试试</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
            {LINES.map((l, i) => (
              <button
                key={i}
                onClick={() => l.part && setSel(l.part === sel ? null : l.part)}
                className={`block w-full whitespace-pre px-4 py-0.5 text-left font-mono text-[13px] leading-6 transition ${
                  l.part ? "cursor-pointer hover:bg-slate-800/70" : "cursor-default"
                } ${l.part && sel === l.part ? "bg-indigo-500/15 ring-1 ring-inset ring-indigo-400/60" : ""}`}
              >
                {l.part && sel === l.part && (
                  <span className="mr-1 inline-block h-4 w-0.5 translate-y-[3px] bg-indigo-400" />
                )}
                <span dangerouslySetInnerHTML={{ __html: hl(l.code) }} />
              </button>
            ))}
          </div>
        </div>

        {/* 右：渲染结果 */}
        <div>
          <div className="mb-2 text-xs font-semibold text-slate-500">🖥️ 浏览器里的样子</div>
          <div
            className={`overflow-hidden rounded-xl border-2 transition ${
              sel === "doctype" ? "border-dashed border-indigo-400 bg-slate-900" : "border-slate-700 bg-slate-900"
            }`}
          >
            {/* 标签页栏（title 在这里） */}
            <div className={`flex items-center gap-1.5 bg-slate-800 px-2.5 py-1.5 transition ${sel === "head" ? "bg-indigo-500/20" : ""}`}>
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span
                className={`ml-2 truncate rounded-t-lg bg-slate-700/70 px-3 py-0.5 text-[11px] text-slate-300 transition ${
                  sel === "title" ? "ring-2 ring-indigo-400 text-white" : ""
                }`}
              >
                小明的个人站
              </span>
            </div>
            {/* 正文区 */}
            <div className={`min-h-[150px] bg-white p-4 transition ${sel === "body" || sel === "html" ? "ring-2 ring-inset ring-indigo-400" : ""}`}>
              <h1
                className={`text-2xl font-extrabold text-slate-800 transition ${
                  sel === "h1" ? "rounded bg-indigo-100 ring-2 ring-indigo-400" : ""
                }`}
              >
                你好，世界！
              </h1>
              <p
                className={`mt-2 text-sm leading-6 text-slate-600 transition ${
                  sel === "p" ? "rounded bg-indigo-100 ring-2 ring-indigo-400" : ""
                }`}
              >
                这是我的第一个网页。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 解释卡 */}
      <div className="mt-4 min-h-[76px] rounded-xl border border-slate-800 bg-slate-800/50 px-4 py-3">
        {!sel ? (
          <p className="py-3 text-center text-sm text-slate-500">
            👈 点击左边代码里的任意一行，看看它对应页面的哪个部分
          </p>
        ) : (
          <div className="anim-fade-up">
            <div className="text-sm font-bold text-white">
              {EXPLAIN[sel].t} <span className="term-en">{EXPLAIN[sel].en}</span>
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-300">{EXPLAIN[sel].d}</p>
          </div>
        )}
      </div>
    </div>
  );
}
