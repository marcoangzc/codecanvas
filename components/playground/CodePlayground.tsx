"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type TabKey = "html" | "css" | "js";
type LogEntry = { kind: "log" | "warn" | "error"; text: string };

/**
 * 注入到 iframe 里的控制台桥接脚本：
 * 拦截 console.log/warn/error 与运行错误，通过 postMessage 发给父页面展示。
 */
const CONSOLE_SHIM = `<script>(function(){
  function send(kind, args){
    try {
      var parts = [];
      for (var i=0;i<args.length;i++){
        var a = args[i];
        try { parts.push(typeof a === "object" && a !== null ? JSON.stringify(a) : String(a)); }
        catch(e){ parts.push(String(a)); }
      }
      parent.postMessage({ __cc: true, kind: kind, text: parts.join(" ") }, "*");
    } catch(e){}
  }
  ["log","warn","error"].forEach(function(k){
    var orig = console[k];
    console[k] = function(){ send(k, arguments); if (orig) orig.apply(console, arguments); };
  });
  window.addEventListener("error", function(ev){ send("error", [ev.message]); });
})();<\/script>`;

/** React 模式所需的 CDN（UMD 版，无需构建工具即可在浏览器里跑 JSX） */
const REACT_CDN = [
  `<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"><\/script>`,
  `<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"><\/script>`,
  `<script src="https://unpkg.com/@babel/standalone@7.24.7/babel.min.js"><\/script>`,
];

function buildDoc(
  html: string,
  css: string,
  js: string,
  mode: "web" | "react",
  apiBase: string,
): string {
  const safeJs = js.replace(/<\/script/gi, "<\\/script");
  // 预置在 window 上而非裸变量：学习者自己写 const API_BASE 时不会冲突
  const apiShim = `<script>window.API_BASE = ${JSON.stringify(apiBase)};<\/script>`;

  if (mode === "react") {
    return [
      "<!DOCTYPE html><html><head><meta charset='utf-8'>",
      "<style>",
      css,
      "</style>",
      ...REACT_CDN,
      "</head><body>",
      '<div id="root"></div>',
      CONSOLE_SHIM,
      apiShim,
      `<script type="text/babel" data-presets="react">`,
      "var exports = {};",
      safeJs,
      "<\/script></body></html>",
    ].join("\n");
  }

  return [
    "<!DOCTYPE html><html><head><meta charset='utf-8'>",
    "<style>",
    css,
    "</style></head><body>",
    html,
    CONSOLE_SHIM,
    apiShim,
    js.trim() ? "<script>" + safeJs + "<\/script>" : "",
    "</body></html>",
  ].join("\n");
}

const TABS_WEB: { key: TabKey; label: string }[] = [
  { key: "html", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "js", label: "JS" },
];
const TABS_REACT: { key: TabKey; label: string }[] = [
  { key: "js", label: "JSX" },
  { key: "css", label: "CSS" },
];

/**
 * 实时代码演练场：左边编辑代码，右边 iframe 实时预览 + 控制台输出。
 *
 * mode="web"   —— HTML/CSS/JS 三标签，经典网页三件套。
 * mode="react" —— 只有 JSX/CSS 两块，iframe 里已备好 React 18 + Babel，
 *                 学习者直接写组件并 createRoot 挂载，无需任何构建工具；
 *                 window.API_BASE 已指向本站，可现场调用真实接口。
 */
export default function CodePlayground({
  initialHtml = "",
  initialCss = "",
  initialJs = "",
  /** react 模式下 JSX 起始代码（initialJs 的语义化别名） */
  initialJsx,
  mode = "web",
  height = 260,
  caption,
  tasks,
}: {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  initialJsx?: string;
  /** react 模式下省略 initialHtml */
  mode?: "web" | "react";
  height?: number;
  caption?: string;
  tasks?: string[];
}) {
  const js0 = initialJsx ?? initialJs;
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(js0);
  const [tab, setTab] = useState<TabKey>(mode === "react" ? "js" : "html");
  const [apiBase] = useState(() => (typeof window === "undefined" ? "" : window.location.origin));
  const [doc, setDoc] = useState(() => buildDoc(initialHtml, initialCss, js0, mode, apiBase));
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 防抖：停止输入 500ms 后重新「运行」
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setDoc(buildDoc(html, css, js, mode, apiBase));
      setLogs([]);
    }, 500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [html, css, js, mode, apiBase]);

  // 接收 iframe 内部的 console 输出
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      const d = e.data as { __cc?: boolean; kind?: LogEntry["kind"]; text?: string };
      if (d && d.__cc) {
        setLogs((l) => [...l.slice(-40), { kind: d.kind ?? "log", text: String(d.text ?? "") }]);
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const setters = { html: setHtml, css: setCss, js: setJs } as const;
  const values = { html, css, js } as const;
  const tabs = mode === "react" ? TABS_REACT : TABS_WEB;

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const el = e.currentTarget;
    const s = el.selectionStart;
    const end = el.selectionEnd;
    el.setRangeText("  ", s, end, "end"); // 直接操作 DOM，光标位置天然正确
    setters[tab](el.value);
  }

  return (
    <section className="my-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
      {/* 工具栏 */}
      <div className="flex items-center gap-1 border-b border-slate-800 bg-slate-900 px-3 py-2">
        <span className="mr-2 hidden text-xs font-semibold tracking-wide text-slate-500 sm:block">
          ⌨️ 演练场 · 实时生效{mode === "react" ? " · React 已就绪" : ""}
        </span>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs transition ${
              tab === t.key ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={() => {
            setHtml(initialHtml);
            setCss(initialCss);
            setJs(js0);
            setLogs([]);
          }}
          className="ml-auto rounded-lg px-3 py-1.5 text-xs text-slate-400 transition hover:text-white"
        >
          ↺ 重置
        </button>
      </div>

      {/* 任务清单 */}
      {tasks && tasks.length > 0 && (
        <ul className="list-disc space-y-0.5 border-b border-slate-800 bg-indigo-500/[0.06] px-9 py-2.5 text-xs leading-5 text-indigo-200/90 marker:text-indigo-400">
          {tasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}

      <div className="grid lg:grid-cols-2">
        {/* 编辑器 */}
        <div className="relative h-[240px] border-b border-slate-800 lg:border-b-0 lg:border-r">
          <textarea
            key={tab}
            value={values[tab]}
            onChange={(e) => setters[tab](e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            aria-label={`${tab} 编辑器`}
            className="editor-area absolute inset-0"
          />
        </div>

        {/* 预览 + 控制台 */}
        <div>
          <iframe
            title="实时预览"
            sandbox="allow-scripts allow-modals allow-forms"
            srcDoc={doc}
            style={{ height }}
            className="block w-full border-0 bg-white"
          />
          <div className="border-t border-slate-800 bg-slate-950/80">
            <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-slate-500">
              <span>控制台 Console</span>
              <button onClick={() => setLogs([])} className="ml-auto transition hover:text-slate-300">
                清空
              </button>
            </div>
            <div className="h-[88px] overflow-y-auto px-3 pb-2 font-mono text-xs leading-5">
              {logs.length === 0 ? (
                <div className="text-slate-600">{"// 在 JS 标签页里试试 console.log(\"你好\")"}</div>
              ) : (
                logs.map((l, i) => (
                  <div
                    key={i}
                    className={
                      l.kind === "error" ? "text-rose-400" : l.kind === "warn" ? "text-amber-300" : "text-slate-300"
                    }
                  >
                    {l.kind === "error" ? "⛔ " : l.kind === "warn" ? "⚠️ " : "› "}
                    {l.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {caption && (
        <div className="border-t border-slate-800 px-4 py-2 text-xs text-slate-500">{caption}</div>
      )}
    </section>
  );
}
