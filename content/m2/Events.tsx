import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        上一课你学会了<b>改变</b>页面，但都是「脚本一跑就改」。
        真正的网页是<b>等用户先动，页面再回应</b>：点击、输入、滚动、按键……
        这一课让程序学会<Term en="Event">倾听事件</Term>。
      </p>

      <h2>addEventListener：给元素装上耳朵</h2>
      <pre className="codeblock">{`const btn = document.querySelector("#like-btn");

btn.addEventListener("click", () => {
  console.log("被点了一下！");
});
//     └─事件名    └─回调函数：事件发生时才执行

// 回调也可以是具名函数（逻辑复杂时更清晰）
function handleClick() { console.log("点了"); }
btn.addEventListener("click", handleClick);`}</pre>
      <p>
        读法：「在 btn 上，<b>监听</b> click 事件；一旦发生，就执行这个函数。」
        你不调用它，<b>浏览器替你在合适的时机调用</b>——这就是<Term en="Callback">回调函数</Term>的精髓。
      </p>

      <h2>最常用的几种事件</h2>
      <pre className="codeblock">{`click      点击          input   输入框内容变化（每敲一个字都触发）
submit     表单提交       keydown 按下键盘键
mouseover  鼠标悬停       scroll  页面滚动`}</pre>
      <p>
        完整列表有上百个，日常高频的就是这几个。用的时候搜「MDN + 元素 + event」即可，
        不用背。
      </p>

      <h2>event 对象：事件的现场记录</h2>
      <p>回调的第一个参数就是事件本身，藏着丰富的线索：</p>
      <pre className="codeblock">{`input.addEventListener("input", (e) => {
  console.log(e.target.value);  // e.target = 触发事件的元素
});                              // .value  = 输入框当前内容`}</pre>

      <h2>表单提交的必修动作：preventDefault</h2>
      <pre className="codeblock">{`form.addEventListener("submit", (e) => {
  e.preventDefault();  // 拦下浏览器的默认行为（整页刷新）
  // 👇 之后才轮到我们自己的处理逻辑
  const text = input.value.trim();
  if (text) console.log("要添加的待办：", text);
});`}</pre>
      <Callout variant="tip" title="为什么提交会刷新页面？">
        浏览器的祖传默认行为：把表单数据发给服务器并重新加载页面。但在前端应用里，
        数据是我们自己处理的，刷新反而清空一切——所以几乎每个 submit 监听的第一行
        都是 <code>e.preventDefault()</code>。
      </Callout>
      <Callout variant="info" title="冒泡：一句话版">
        点了按钮，它的父级、祖父级也会依次「听到」这次点击，像气泡上浮——这叫事件冒泡。
        现在知道现象即可；等遇到「点 A 却触发了 B 的监听」时你会想起它。
      </Callout>

      <h2>动手：做一个迷你互动页</h2>
      <CodePlayground
        tasks={[
          "在输入框打字，看控制台和回显区的反应",
          "连点 5 次「点赞」，观察计数",
          "加一个「取消点赞」按钮，每次点击让计数 -1",
          "挑战：计数超过 10 时，把数字变成红色",
        ]}
        initialHtml={`<h3>迷你互动实验室</h3>
<input id="name-input" placeholder="输入你的名字" />
<p id="echo">（回显区）</p>
<button id="like-btn">👍 点赞</button>
<span id="count">0</span>`}
        initialCss={`body { font-family: sans-serif; padding: 16px; }
input { padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 8px; }
button { margin-left: 8px; padding: 6px 14px; border: none; border-radius: 8px;
         background: #4f46e5; color: white; cursor: pointer; }`}
        initialJs={`const input = document.getElementById("name-input");
const echo = document.getElementById("echo");
const likeBtn = document.getElementById("like-btn");
const countEl = document.getElementById("count");

let likes = 0;

// 输入时实时回显
input.addEventListener("input", (e) => {
  const name = e.target.value;
  echo.textContent = name ? "你好呀，" + name + "！" : "（等待输入…）";
});

// 点击计数
likeBtn.addEventListener("click", () => {
  likes = likes + 1;
  countEl.textContent = likes;
});`}
        caption="这两段代码就是结课挑战待办清单的全部灵魂：input 事件负责「听输入」，click 事件负责「做动作」。"
      />

      <Quiz
        questions={[
          {
            q: 'addEventListener("click", fn) 里的 fn 什么时候执行？',
            options: ["立刻执行一次", "元素被点击时由浏览器调用", "页面加载完后自动执行", "永远不会执行"],
            answer: 1,
            explain: "你只登记不调用，触发时机交给浏览器——这就是回调函数。",
          },
          {
            q: "form 的 submit 监听里第一行写 e.preventDefault() 是为了？",
            options: ["阻止用户点击", "清空表单", "阻止浏览器默认的提交刷新行为", "让代码更快"],
            answer: 2,
            explain: "拦下祖传的「提交即刷新」，页面控制权才回到 JS 手里。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "<code>el.addEventListener(\"事件名\", 回调)</code>：登记监听，浏览器择机调用。",
          "高频五件套：click / input / submit / keydown / mouseover。",
          "回调参数 <code>e</code> 是事件现场：<code>e.target.value</code> 最常用。",
          "submit 监听第一行惯例：<code>e.preventDefault()</code>。",
          "事件会向父级冒泡；显示用户输入用 textContent 防 XSS。",
        ]}
      />
    </>
  );
}
