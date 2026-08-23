import Link from "next/link";
import Callout from "@/components/Callout";
import Challenge from "@/components/Challenge";
import CodePlayground from "@/components/playground/CodePlayground";
import { getChecksForLesson } from "@/lib/checks";

const CAPSTONE_CHECKS = getChecksForLesson("m2/capstone") ?? [];

/** 演练场用的开发骨架：与提交版 STARTER 同一套结构 */
const LAB_HTML = `<h2>📝 我的待办清单</h2>
<input id="todo-input" placeholder="想做的事…" />
<button id="add-btn">添加</button>
<ul id="todo-list"></ul>`;

const LAB_CSS = `body { font-family: sans-serif; padding: 16px; }
input { padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 8px; }
button { padding: 6px 14px; border: none; border-radius: 8px;
         background: #d97706; color: white; cursor: pointer; }
li { margin: 6px 0; font-size: 15px; cursor: pointer; }
.done { text-decoration: line-through; color: #94a3b8; }`;

const LAB_JS = `const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// 👇 数据与界面分离：数组是唯一的「事实来源」
const todos = [];

function render() {
  // TODO 1：先把 list 清空
  // TODO 2：用 forEach 遍历 todos，为每条造一个 <li>
  //         - li.textContent = t.text
  //         - 完成的加 class "done"
  // TODO 3：点击 li 时切换 t.done 并重新 render()
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = "";
  render();   // 数据变了 → 重画整个清单
});`;

const STARTER = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>我的待办清单</title>
  <style>
    body {
      font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
      background: #fffbeb;
      display: flex;
      justify-content: center;
      padding-top: 48px;
    }
    .app {
      width: 360px;
      background: white;
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }
    h1 { font-size: 20px; color: #92400e; margin: 0 0 16px; }
    .row { display: flex; gap: 8px; }
    input {
      flex: 1;
      padding: 9px 12px;
      border: 1px solid #fde68a;
      border-radius: 10px;
      font-size: 14px;
    }
    button {
      padding: 9px 18px;
      border: none;
      border-radius: 10px;
      background: #d97706;
      color: white;
      cursor: pointer;
    }
    ul { list-style: none; padding: 0; margin-top: 16px; }
    li {
      padding: 9px 6px;
      border-bottom: 1px dashed #fef3c7;
      font-size: 14px;
      color: #374151;
      cursor: pointer;
    }
    li.done { text-decoration: line-through; color: #cbd5e1; }
  </style>
</head>
<body>
  <div class="app">
    <h1>📝 我的待办清单</h1>
    <div class="row">
      <input id="todo-input" placeholder="想做的事，回车或点添加" />
      <button id="add-btn">添加</button>
    </div>
    <ul id="todo-list"></ul>
  </div>

  <script>
    // ===== 第 1 步：抓元素（第 5 课）=====
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const list = document.getElementById("todo-list");

    // ===== 第 2 步：数据（第 4 课的对象数组）=====
    const todos = [];

    // ===== 第 3 步：渲染函数（第 2 课的函数 + 第 4 课的循环）=====
    function render() {
      // TODO A: 清空 list.innerHTML
      // TODO B: 用 todos.forEach 给每条待办造一个 <li> 挂进 list
      // TODO C: 完成项给 li 加上 "done" 类（样式已写好）
      // TODO D: 监听 li 的 click —— 切换 done 后调用 render()
      // 提示：li.addEventListener("click", () => { t.done = !t.done; render(); })
    }

    // ===== 第 4 步：交互（第 6 课的事件）=====
    function addItem() {
      const text = input.value.trim();
      if (!text) return;
      // TODO E: push 进 todos，然后清空输入框、调用 render()
    }

    addBtn.addEventListener("click", addItem);
    // 加分：按回车也能添加 —— input 上监听 keydown，
    // 判断 e.key === "Enter" 时调用 addItem()
  <\/script>
</body>
</html>`;

export default function Lesson() {
  return (
    <>
      <p>
        来到模块 2 的终点站！🎉 六节课下来你已经集齐了 JS 的全部核心装备：
        变量存数据、函数打包逻辑、循环做重复、对象数组组织信息、DOM 改页面、事件听用户。
        现在把它们<b>全部拧成一台真正的应用</b>——每个前端初学者的成人礼：<b>待办清单</b>。
      </p>

      <Callout variant="tip" title="挑战玩法">
        先在下面的<b>演练场</b>里把功能调通（改错零成本、实时看效果）；
        做好后把代码贴进底部的<b>结课挑战</b>编辑器——右侧清单实时核对，
        全部打勾后提交服务器完成通关。
      </Callout>

      <h2>先想清楚：应用的三层结构</h2>
      <pre className="codeblock">{`┌─ 数据层 ──── const todos = [{ text, done }]     ← 唯一事实来源
├─ 渲染层 ──── function render()                  ← 数据 → 页面
└─ 交互层 ──── 点击添加 / 点击切换                 ← 改数据后调 render()`}</pre>
      <Callout variant="deep" title="一个重要的思想转变">
        新手爱直接往页面上插 <code>&lt;li&gt;</code>；高手只改<b>数据</b>，然后让渲染函数
        把整个清单重画一遍。「<b>数据变了 → 全量重画</b>」听起来笨，却是 React
        （下一模块的主角）安身立命的哲学。在这里养成它，下个模块你会飞起来。
      </Callout>

      <h2>🛠️ 开发演练场</h2>
      <CodePlayground
        initialHtml={LAB_HTML}
        initialCss={LAB_CSS}
        initialJs={LAB_JS}
        height={300}
        tasks={[
          "补全 render()：清空 → forEach 造 li → 挂载",
          "实现 addItem()：push + 清空输入框 + render",
          "点击 li 切换完成状态并重新渲染",
          "加分项：回车键也能添加（keydown + e.key === \"Enter\"）",
        ]}
        caption="卡住了？回看对应课程：函数第 2 课 · 数组方法第 4 课 · DOM 第 5 课 · 事件第 6 课。"
      />

      <h2>🏁 结课挑战</h2>
      <div className="my-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="!mt-0 flex items-center gap-2 text-lg font-bold text-white">📋 作品要求</h3>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 marker:text-amber-400">
          {CAPSTONE_CHECKS.map((c) => (
            <li key={c.id} className="text-sm leading-6 text-slate-300">
              {c.label}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          每一项都来自一节课：结构见第 1 课 · script 见本课 · 抓元素第 5 课 ·
          监听第 6 课 · push 与 forEach 第 4 课 · 切换状态第 5/6 课 · 函数第 2 课。
        </p>
      </div>

      <Challenge lessonId="m2/capstone" starterCode={STARTER} />

      <Callout variant="deep" title="刚才你经历了什么？">
        你刚刚完成了软件工程最日常的循环：<b>设计数据结构 → 写渲染 → 接交互 → 调试 → 交付验证</b>。
        待办清单虽小，五脏俱全——它就是你简历上的第一个「项目」，而不只是练习。
      </Callout>

      <div className="my-10 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-6 text-center">
        <div className="text-3xl">⚡</div>
        <h2 className="!mt-2 justify-center text-xl font-bold text-white">完成之后</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300 [&_p]:mb-0">
          你已经能用原生 JS 驾驭网页了。但你也隐约感到：手动抓元素、手动重画，
          应用一大就会乱。<b>下一模块的 React 就是来解决这个的</b>——
          「数据变了自动重画」这件事，让它替你做。
        </p>
        <Link href="/curriculum" className="btn-primary mt-5 px-6 py-2.5">
          前往模块 3：React 🧩
        </Link>
      </div>
    </>
  );
}
