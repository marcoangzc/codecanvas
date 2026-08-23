import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";
import DomTree from "@/components/interactives/DomTree";

export default function Lesson() {
  return (
    <>
      <p>
        前四课的 JS 都在控制台里自言自语。从这一课起，它终于要<b>碰页面</b>了——
        这就是 JS 诞生时的使命：让网页动起来。
      </p>

      <h2>DOM：浏览器眼里的页面</h2>
      <p>
        浏览器把 HTML 解析成一棵<Term en="DOM">文档对象树</Term>——
        模块 1 第一课见过它生长，现在复习一遍（悬停节点试试）：
      </p>
      <DomTree />
      <Callout variant="tip" title="一句话记住 DOM">
        DOM 就是「JS 眼中的网页」：每个标签是一个对象，JS 拿到对象就能改它的文字、样式、结构。
        改了 DOM，屏幕立刻变——这是整个前端的心跳。
      </Callout>

      <h2>第一步：找到元素</h2>
      <pre className="codeblock">{`// 按 CSS 选择器找（最常用，模块 1 第 5 课的选择器全都能用！）
const title = document.querySelector("#main-title");   // 找 id
const btn   = document.querySelector(".btn-primary");  // 找类
const firstP = document.querySelector("p");            // 第一个 p

// 老牌写法（等价、更快打字）
document.getElementById("main-title");

// 全都找出来 → 数组
document.querySelectorAll("li");`}</pre>

      <h2>第二步：改它</h2>
      <pre className="codeblock">{`const title = document.querySelector("#main-title");

title.textContent = "新标题！";        // 改纯文本（安全）
title.style.color = "crimson";         // 改内联样式
title.classList.add("highlight");      // 加类（配合 <style> 里的 .highlight）
title.classList.toggle("done");        // 有则删、无则加——开关神器`}</pre>
      <Callout variant="warn" title="innerHTML 是把双刃剑">
        <code>el.innerHTML = …</code> 能塞进带标签的内容，但如果你把<b>用户输入</b>直接塞进去，
        别人就能往你页面注入恶意脚本（这叫 XSS 注入攻击）。原则很简单：
        显示用户输入一律用 <code>textContent</code>，innerHTML 只放你自己写死的内容。
      </Callout>

      <h2>第三步：造新的</h2>
      <pre className="codeblock">{`const li = document.createElement("li"); // 造一个新元素（还没上页面）
li.textContent = "新待办";
document.querySelector("ul").appendChild(li);  // 挂到 ul 里，页面立刻多一行`}</pre>
      <p>
        「造出来 → 打扮好 → 挂上去」，这三步就是所有列表渲染的套路，
        结课挑战的待办清单全靠它。
      </p>

      <h2>动手：第一次操纵页面</h2>
      <CodePlayground
        tasks={[
          "点开预览看效果；把按钮上的字改掉",
          "改 JS：换一种颜色、换一段文案",
          "用 classList.toggle 做一个「暗夜模式」开关",
          "挑战：再加一个按钮，点击后新增一个 <li>",
        ]}
        initialHtml={`<h1 id="title">我是标题</h1>
<p id="msg">等待被改变…</p>
<button id="magic-btn">点我施法 ✨</button>`}
        initialCss={`body { font-family: sans-serif; padding: 16px; }
#title { color: #4f46e5; }
.magic { background: #312e81; color: white; padding: 8px 16px; border-radius: 8px; }`}
        initialJs={`// script 放在 body 底部：元素早就长好了，随便抓
const title = document.getElementById("title");
const msg = document.getElementById("msg");
const btn = document.getElementById("magic-btn");

title.textContent = "被 JS 改过的标题";
title.style.fontSize = "28px";
msg.textContent = "现在是 " + new Date().toLocaleTimeString();

// 给按钮换个造型（classList 的力量）
btn.className = "magic";`}
        caption="为什么 script 要写在页面底部？因为浏览器从上往下执行——先有元素，后能抓取。放在头部会抓到 null，报错给你看：Cannot read properties of null。"
      />

      <Quiz
        questions={[
          {
            q: 'document.querySelector(".item") 找到几个元素？',
            options: ["全部 .item", "第一个 .item", "最后一个 .item", "0 个"],
            answer: 1,
            explain: "querySelector 只返回第一个匹配；要全部得用 querySelectorAll（返回数组）。",
          },
          {
            q: 'script 写在 <head> 里且不加任何处理，document.querySelector("#box") 最可能返回？',
            options: ["#box 元素", "null", "报错并中断页面", "一个空对象"],
            answer: 1,
            explain: "head 里的脚本执行时 body 还没解析，元素不存在，返回 null。所以要么放底部，要么监听 DOMContentLoaded。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "DOM = JS 眼中的页面；<b>找到 → 修改 → 屏幕即变</b>。",
          "<code>querySelector(\"选择器\")</code> 抓第一个，<code>querySelectorAll</code> 抓全部。",
          "<code>textContent</code> 改文字最安全；<code>style.x</code> 改样式；<code>classList.toggle</code> 开关类。",
          "innerHTML 别碰用户输入，谨防 XSS。",
          "createElement + appendChild 三步渲染法；script 放底部避免抓到 null。",
        ]}
      />
    </>
  );
}
