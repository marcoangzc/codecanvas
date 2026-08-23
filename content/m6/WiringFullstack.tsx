import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

/** 页面接接口时的三种状态：联调课的主角 */
const STATES = [
  { icon: "⏳", name: "加载中 Loading", desc: "请求已发出、还没回来。转个小圈圈，让用户知道「没卡死」。" },
  { icon: "✅", name: "成功 Success", desc: "拿到数据，正常渲染列表——这是唯一一种「什么提示都不用给」的状态。" },
  { icon: "😔", name: "失败 Error", desc: "断网、404、500……用一句人话道歉并给出重试按钮，而不是白屏或吓人的红字。" },
  { icon: "🪣", name: "空空如也 Empty", desc: "请求成功了，但没有一条数据。引导用户「来抢沙发」，别让他以为坏了。" },
];

export default function Lesson() {
  return (
    <>
      <p>
        上一课我们把产品想清楚了，界面草图也画好了。但草图只是静态的画——
        <b>前后端联调（Wiring）</b>才是让它活起来的那一步：把页面和真实接口接上线。
        本站就有一个真实的留言板接口：<code>GET /api/guestbook</code> 返回留言列表，
        <code>POST</code> 同一路径可以创建新留言。今天我们就拿它练手。
      </p>

      <h2>先设计状态，再写代码</h2>
      <p>
        新手联调只考虑「顺利的情况」：发请求 → 渲染数据，完工。可真实世界里的页面，
        一生要在四种<Term en="State">状态</Term>之间切换：
      </p>
      <div className="my-6 grid gap-3 sm:grid-cols-2">
        {STATES.map((s) => (
          <div key={s.name} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="mb-1 text-sm font-bold text-white">
              <span className="mr-1.5">{s.icon}</span>
              {s.name}
            </p>
            <p className="mb-0 text-xs leading-5 text-slate-400">{s.desc}</p>
          </div>
        ))}
      </div>
      <Callout variant="warn" title="最容易漏掉的是 Empty">
        「接口 200 正常返回，但数组是空的」既不是成功也不是失败——
        如果不单独处理，用户会盯着一片空白怀疑网页坏了。<b>Empty 是第四种状态，不是 Error 的子集。</b>
      </Callout>

      <h2>完整范式：fetch + try / catch / finally</h2>
      <p>
        模块 4 学过 fetch 与 await；联调时把它们组装成一条标准流水线——
        <b>进函数先进入加载态，成功走渲染，出错走道歉，最后无论如何都要收尾</b>：
      </p>
      <pre className="codeblock">{`let status = "loading";              // ⏳ 一进来就是加载中

async function loadMessages() {
  try {
    const res = await fetch(API_BASE + "/api/guestbook");
    if (!res.ok) throw new Error("HTTP " + res.status); // 404/500 也算失败
    const data = await res.json();

    if (data.messages.length === 0) {
      status = "empty";              // 🪣 成功了，但一条都没有
    } else {
      status = "success";            // ✅ 正常渲染 data.messages
    }
  } catch (e) {
    status = "error";                // 😔 断网 / 接口挂了
  } finally {
    console.log("本次请求结束，当前状态：" + status);
    // 无论成败都执行：最适合关掉「加载中…」的转圈动画
  }
}`}</pre>
      <Callout variant="tip" title="三个关键字各司其职">
        <b>try</b> 放「乐观路径」，<b>catch</b> 接住一切意外（包括自己 throw 的），
        <b>finally</b> 无条件收尾。把关掉 loading 的代码放进 catch 和 try 各写一遍？
        迟早漏一处——这就是 finally 存在的理由。
      </Callout>

      <h2>动手：现场调一次真实接口</h2>
      <p>
        右侧预览里是一个正在联调的迷你页面。演练场已预置好本站地址常量
        <code>API_BASE</code>，所以下面的请求打向的是<b>真的线上接口</b>：
      </p>
      <CodePlayground
        height={300}
        tasks={[
          "点开控制台，看请求结束时的状态输出",
          '把 JS 里的 /api/guestbook 改成 /api/not-exist，观察 !res.ok 触发的失败分支',
          "在 empty 分支里补一句「还没有留言，来抢沙发！」",
        ]}
        initialHtml={`<div class="panel">
  <h1>留言板 · 联调实验</h1>
  <p id="status">⏳ 加载中……</p>
  <ul id="list"></ul>
</div>`}
        initialCss={`body { font-family: sans-serif; padding: 16px; background: #f8fafc; }
.panel { max-width: 320px; margin: 0 auto; }
h1 { font-size: 18px; color: #1e293b; }
#status { font-size: 14px; font-weight: bold; color: #6366f1; }
li { font-size: 13px; color: #334155; line-height: 1.9; }`}
        initialJs={`const statusEl = document.querySelector("#status");
const list = document.querySelector("#list");

async function loadMessages() {
  try {
    const res = await fetch(API_BASE + "/api/guestbook");
    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    if (data.messages.length === 0) {
      statusEl.textContent = "🪣 暂无留言";
    } else {
      statusEl.textContent = "✅ 共 " + data.count + " 条留言";
      data.messages.forEach((m) => {
        const li = document.createElement("li");
        li.textContent = m.name + "：" + m.text;
        list.appendChild(li);
      });
    }
  } catch (e) {
    statusEl.textContent = "😔 出错了：" + e.message + "（要不要重试？）";
  } finally {
    console.log("—— 请求结束 ——");
  }
}

loadMessages();`}
        caption="改完地址停半秒，页面会自动重新运行——你正在亲眼看着状态机在 success / error 之间切换。"
      />
      <p>
        看到了吗？同一个函数，因为写了完整的分支，无论网络怎么折腾，
        用户永远能看懂页面上发生了什么。<b>这就是「联调完成」的定义</b>：
        不是成功时好看，而是失败时也不难看。
      </p>

      <Quiz
        questions={[
          {
            q: "接口返回 200，但 messages 是空数组，页面应该显示什么？",
            options: [
              "红色报错「加载失败，请重试」",
              "「还没有留言，来抢沙发！」之类的空状态提示",
              "保持白屏，等待数据出现",
              "一直显示加载转圈"],
            answer: 1,
            explain:
              "请求本身是成功的，所以不是 error；只是没有数据。空状态（empty）要引导用户行动，报错和无限转圈都会让人以为网站坏了。",
          },
          {
            q: "try / catch / finally 里，「关闭加载中的转圈动画」最适合放在哪一段？",
            options: [
              "try 的最后一行",
              "catch 里",
              "finally 里",
              "不需要关，它自己会消失"],
            answer: 2,
            explain:
              "finally 无论如何都会执行，正好承载「不管成败都要做」的收尾工作；写在 try 或 catch 里则意味着另一条路径会漏掉它。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "联调 = 把静态页面接到真实接口上；先想清楚<b>状态的种类</b>再动手。",
          "页面四态：<b>Loading / Success / Error / Empty</b>——Empty 不是 Error。",
          "标准范式：<code>try</code> 走成功、<code>catch</code> 兜意外、<code>finally</code> 做收尾（关 loading）。",
          "<code>if (!res.ok) throw …</code> 让 404 / 500 也走失败分支，而不是假装成功。",
          "联调完成的定义：<b>失败时用户也能看懂发生了什么</b>。",
        ]}
      />
    </>
  );
}
