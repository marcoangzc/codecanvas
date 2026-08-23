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

function buildDoc(html: string, css: string, js: string): string {
  const safeJs = js.replace(/<\/script/gi, "<\\/script");
  return [
    "<!DOCTYPE html><html><head><meta charset='utf-8'>",
    "<style>",
    css,
    "</style></head><body>",
    html,
    CONSOLE_SHIM,
    js.trim() ? "<script>" + safeJs + "<\/script>" : "",
    "</body></html>",
  ].join("\n");
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "html", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "js", label: "JS" },
];

/**
 * 实时代码演练场：左边编辑 HTML/CSS/JS，右边 iframe 实时预览 + 控制台输出。
 */
export default function CodePlayground({
  initialHtml,
  initialCss = "",
  initialJs = "",
  height = 260,
  caption,
  tasks,
}: {
  initialHtml: string;
  initialCss?: string;
  initialJs?: string;
  height?: number;
  caption?: string;
  tasks?: string[];
}) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [tab, setTab] = useState<TabKey>("html");
  const [doc, setDoc] = useState(() => buildDoc(initialHtml, initialCss, initialJs));
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 防抖：停止输入 500ms 后重新「运行」
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setDoc(buildDoc(html, css, js));
      setLogs([]);
    }, 500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [html, css, js]);

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
          ⌨️ 演练场 · 实时生效
        </span>
        {TABS.map((t) => (
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
            setJs(initialJs);
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
