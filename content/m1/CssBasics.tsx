import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";
import SelectorMatch from "@/components/interactives/SelectorMatch";

export default function Lesson() {
  return (
    <>
      <p>
        HTML 搭好了骨架，现在轮到皮肤上场——<Term en="CSS">层叠样式表</Term>。
        一条 CSS 规则长这样：
      </p>
      <pre className="codeblock">{`h1 {                    ← 选择器 Selector：给谁化妆
  color: indigo;        ← 属性 Property：改什么
  font-size: 32px;      ← 值 Value：改成什么样
}                       ← 分号分隔每一条`}</pre>

      <h2>三种接入方式</h2>
      <ul>
        <li><code>style=&quot;…&quot;</code> 行内样式：写死在标签上，优先级最高但难维护，偶尔救急。</li>
        <li><code>&lt;style&gt;</code> 内部样式表：写在 head 里，适合单页练习（本课程演练场就用它）。</li>
        <li>
          外部样式表：<code>&lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;</code>，
          多页面共享一份样式——真实项目都这么做。
        </li>
      </ul>

      <h2>选择器：精确制导系统 🎮</h2>
      <p>
        选择器决定「这条规则命中哪些元素」。与其背规则，不如来玩一局——
        点选你认为会被选中的元素，看看你对选择器的直觉准不准：
      </p>
      <SelectorMatch />

      <Callout variant="deep" title="两条规则撞车了听谁的？">
        这就是名字里「<b>层叠（Cascading）</b>」的含义：越具体的优先级越高
        （id &gt; class &gt; 标签），同样具体时后写的覆盖先写的。
        现在记住结论即可，模块 3 会专门实验验证。
      </Callout>

      <h2>颜色与字体三件套</h2>
      <pre className="codeblock">{`body {
  color: #334155;            /* 文字颜色：十六进制 */
  background: rgb(241 245 249); /* 背景色：RGB 函数 */
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.7;
}`}</pre>
      <p>
        font-family 写一个「候选名单」：浏览器从左到右找第一个可用的字体，
        最后的 sans-serif 是兜底。<b>中文字体记得留备胎</b>。
      </p>

      <h2>动手：把一张素颜名片变成设计款</h2>
      <CodePlayground
        tasks={[
          "把 .card 的背景色改成你喜欢的颜色",
          "调整标题字号与字重，突出名字",
          "给按钮加 hover 效果：.btn:hover { opacity: 0.8 }",
          "试试 border-radius 加大圆角，感受气质变化",
        ]}
        initialHtml={`<div class="card">
  <img src="https://i.pravatar.cc/80?img=5" alt="头像" class="avatar" />
  <h1>王小码</h1>
  <p>前端学习者 · 正在全栈路上狂奔</p>
  <button class="btn">加个好友</button>
</div>`}
        initialCss={`body {
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  background: #eef2ff;
  display: grid;
  place-items: center;
  min-height: 240px;
}
.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  width: 220px;
}
.avatar { border-radius: 50%; }
h1 { margin: 12px 0 4px; font-size: 20px; color: #1e293b; }
p { margin: 0 0 16px; font-size: 13px; color: #64748b; }
.btn {
  padding: 8px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 999px;
  cursor: pointer;
}`}
        caption=":hover 是伪类——「鼠标悬停时」。这是你接触的第一个交互式样式！"
      />

      <Quiz
        questions={[
          {
            q: '选择器 ".intro" 选中哪些元素？',
            options: [
              '标签名为 intro 的元素',
              'class 含有 intro 的所有元素',
              'id 为 intro 的元素',
              '所有段落'],
            answer: 1,
            explain: "点开头是类选择器；# 开头才是 id；直接写字母是标签名。",
          },
          {
            q: "font-family: \"A\", \"B\", sans-serif 的含义是？",
            options: [
              "三种字体同时叠加使用",
              "随机使用其中一种",
              "按顺序找到第一个可用的，都没有则用任意无衬线字体",
              "报错，字体只能写一个"],
            answer: 2,
            explain: "它是「候选名单」机制，最后的通用族（sans-serif / serif / monospace）是保底。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "规则结构：<b>选择器 { 属性: 值; }</b>，分号分隔。",
          "三种接入方式：行内 / 内部 style / 外部 link，项目用外部。",
          "选择器三剑客：标签名、<code>.类</code>、<code>#id</code>；组合如 <code>p.tip</code>。",
          "层叠 = 具体者胜、后者胜。",
          "font-family 是候选名单，中文务必留兜底字体。",
        ]}
      />
    </>
  );
}
