import Link from "next/link";
import Callout from "@/components/Callout";
import Challenge from "@/components/Challenge";
import CodePlayground from "@/components/playground/CodePlayground";
import { getChecksForLesson } from "@/lib/checks";

const STARTER = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>留言板 · Guestbook</title>
  <style>
    body {
      font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
      background: #f8fafc; margin: 0; padding: 24px;
    }
    /* 👇 卡片容器：想改成你自己的风格？尽管动手 */
    .board {
      max-width: 480px; margin: 0 auto; padding: 24px;
      box-sizing: border-box; background: white; border-radius: 16px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }
    h1 { margin: 0; font-size: 22px; color: #0f172a; }
    .sub { color: #64748b; font-size: 13px; margin: 4px 0 16px; }
    form { display: flex; gap: 8px; flex-wrap: wrap; }
    input {
      flex: 1; min-width: 110px; padding: 9px 12px;
      border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px;
    }
    button {
      padding: 9px 18px; border: none; border-radius: 8px;
      background: #10b981; color: white; font-size: 14px; cursor: pointer;
    }
    ul { list-style: none; padding: 0; margin: 16px 0 0; }
    li {
      padding: 10px 2px; font-size: 14px; line-height: 1.6;
      color: #334155; border-bottom: 1px dashed #e2e8f0;
    }
  </style>
</head>
<body>
  <main class="board">
    <h1>📮 我的留言板</h1>
    <p class="sub">我的第一个接通真实后端的前端应用</p>

    <form id="msg-form">
      <!-- 👇 昵称与内容两个输入框已经就位 -->
      <input id="msg-name" placeholder="昵称（20 字内）" maxlength="20" />
      <input id="msg-text" placeholder="说点什么……（200 字内）" />
      <button type="submit">发布</button>
    </form>

    <!-- 👇 留言列表要渲染到这个列表里 -->
    <ul id="msg-list"></ul>
  </main>

  <script>
    // ⚠️ 这里 API_BASE 故意留空：校验只看代码结构，
    // 真正联网调试请在上方演练场完成（那里已预置本站真实地址）。
    const API_BASE = "";

    const list = document.querySelector("#msg-list");

    // ── 任务 1：读取留言列表并渲染 ────────────────────
    async function load() {
      // TODO①：fetch(API_BASE + "/api/guestbook") 发出 GET 请求
      // TODO②：const data = await res.json() 得到 { count, messages }
      // TODO③：遍历 data.messages，把每条留言拼成一个 <li> 放进 list
      //        （提示：list.innerHTML = data.messages.map(...).join("")）
    }

    // ── 任务 2：发表一条留言 ──────────────────────────
    async function add(name, text) {
      // TODO①：再次 fetch 同一地址，这次带第二个参数：
      //        method: "POST"
      //        headers: { "Content-Type": "application/json" }
      //        body: JSON.stringify({ name, text })
      // TODO②：console.log(res.status) —— 201 才代表创建成功
      // TODO③：发布成功后调用 load()，让新留言立刻出现
    }

    document
      .querySelector("#msg-form")
      .addEventListener("submit", function (e) {
        e.preventDefault(); // 别让表单刷新页面
        // TODO④：读出两个输入框的值，调用 add(昵称, 内容)，然后清空输入框
      });

    load();
  <\/script>
</body>
</html>`;

export default function Lesson() {
  return (
    <>
      <p>
        恭喜抵达模块 4 的终点！🎉 这一模块里你看透了 HTTP、亲手解剖了接口、学会了设计约定与鉴权。
        现在，把它们<b>全部用上</b>：为留言板 API 做出一个能读能写的完整前端。
      </p>

      <Callout variant="tip" title="这次玩真的：对接真后端">
        和前几次挑战不同，<b>你对接的是本站正在运行的留言板接口</b>：
        <code>GET /api/guestbook</code> 返回全部留言，<code>POST</code> 一条 JSON 就能真的发布。
        你发布的留言会被服务器保存下来——别的同学打开这个页面也能看到它。🌍
        建议先在下面的演练场调通，再把成果誊进挑战编辑器提交。
      </Callout>

      {/* 要求清单速览 */}
      <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="!mt-0 flex items-center gap-2 text-lg font-bold text-white">📋 作品要求</h2>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 marker:text-emerald-400">
          {(getChecksForLesson("m4/capstone") ?? []).map((c) => (
            <li key={c.id} className="text-sm leading-6 text-slate-300">
              {c.label}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          卡住了？每一项都对应一节课：
          HTTP 请求结构见第 2 课 · 接口原理与 fetch 用法见第 3 课 ·
          方法与状态码语义见第 4 课 · 异步处理回顾模块 2–3。
          右侧清单会<b>实时核对</b>你的代码结构。
        </p>
      </div>

      <h2 className="!mt-10">第一步：在演练场把它调通 🎮</h2>
      <CodePlayground
        height={430}
        tasks={[
          "直接运行：GET 部分（load 函数）已写好，右侧应出现留言列表",
          "补全 add 函数里的 POST：method、headers、body 一个都不能少",
          "console.log 状态码——发布成功应是 201；试试空内容，观察 400",
          "全部跑通后，把实现誊进下方的挑战编辑器（API_BASE 记得保持空字符串）",
        ]}
        initialHtml={`<main class="board">
  <h1>📮 留言板</h1>
  <form id="msg-form">
    <input id="msg-name" placeholder="昵称" maxlength="20" />
    <input id="msg-text" placeholder="说点什么……" />
    <button type="submit">发布</button>
  </form>
  <ul id="msg-list"></ul>
</main>`}
        initialCss={`body { font-family: sans-serif; padding: 14px; }
.board h1 { font-size: 18px; margin: 0 0 10px; }
form { display: flex; gap: 6px; flex-wrap: wrap; }
input { flex: 1; min-width: 100px; padding: 7px 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; }
button { padding: 7px 14px; border: none; border-radius: 8px; background: #10b981; color: white; cursor: pointer; }
ul { list-style: none; padding: 0; margin: 12px 0 0; }
li { padding: 8px 2px; border-bottom: 1px dashed #e2e8f0; font-size: 13px; color: #334155; }`}
        initialJs={`// 🎮 演练场里 API_BASE 已预置为本站真实地址，直接用！

const list = document.querySelector("#msg-list");

async function load() {
  // ✅ 这段已写好：GET 列表并渲染
  const res = await fetch(API_BASE + "/api/guestbook");
  const data = await res.json();
  console.log("GET:", res.status);
  list.innerHTML = data.messages
    .map((m) => \`<li><b>\${m.name}</b>：\${m.text}</li>\`)
    .join("");
}

async function add(name, text) {
  // TODO：仿照上面的 load()，向同一地址发一个 POST：
  //  method: "POST"
  //  headers: { "Content-Type": "application/json" }
  //  body: JSON.stringify({ name, text })
  // TODO：console.log(res.status)；若等于 201 就调用 load() 刷新列表
  console.log("add() 还没实现哦～");
}

document.querySelector("#msg-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#msg-name").value.trim();
  const text = document.querySelector("#msg-text").value.trim();
  add(name, text);
});

load();`}
        caption="你发的留言会真实保存在服务器上——刷新页面、甚至明天再来，它们都还在。"
      />

      <h2>第二步：提交到挑战编辑器 🚀</h2>
      <Challenge lessonId="m4/capstone" starterCode={STARTER} />

      <Callout variant="deep" title="🎉 恭喜：你完成了第一次前后端联调">
        点击提交时，浏览器又向 <code>/api/validate</code> 发了一个 POST 请求做最终校验；
        而你写的页面则同时扮演了两个角色——用 fetch 读接口的客户端，
        和被真实服务器伺服的前端。<b>前端 + 后端，在你手里第一次合体了</b>。
        这正是模块 6 全栈实战的日常操作，你已经提前体验过了。
      </Callout>

      <div className="my-10 rounded-2xl border border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/5 p-6 text-center">
        <div className="text-3xl">🏁</div>
        <h2 className="!mt-2 justify-center text-xl font-bold text-white">完成之后</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300 [&_p]:mb-0">
          有个秘密：现在的留言其实存在服务器的一个 JSON 文件里——数据量一大就会力不从心。
          <b>模块 5「数据库基础」</b>将给这些数据一个真正的家：
          表格建模、SQL 查询、ORM，让你的接口从「能存」进化到「专业地存」。
        </p>
        <Link href="/curriculum" className="btn-primary mt-5 px-6 py-2.5">
          前往模块 5：数据库基础 🗄️
        </Link>
      </div>
    </>
  );
}
