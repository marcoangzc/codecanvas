import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        到目前为止，你的网页还是一座「孤岛」：不能跳转、没有图片、无法收集访客输入。
        这一课补齐三块拼图：<Term en="Anchor">链接</Term>、<Term en="Image">图片</Term>和
        <Term en="Form">表单</Term>。
      </p>

      <h2>链接 a：互联网的起点</h2>
      <p>
        <code>&lt;a&gt;</code> 是 anchor（锚）的缩写，靠
        <Term en="href">超引用</Term>属性指路。href 的值可以是完整网址，也可以是站内相对路径：
      </p>
      <pre className="codeblock">{`<a href="https://developer.mozilla.org">外部链接：MDN 文档</a>
<a href="/about.html">站内链接：关于我</a>
<a href="#top">页内跳转：回到顶部（id 为 top 的元素处）</a>`}</pre>
      <Callout variant="warn" title="新窗口打开要成对使用">
        <code>&lt;a target=&quot;_blank&quot;&gt;</code> 会在新标签页打开链接，
        但请同时加上 <code>rel=&quot;noopener&quot;</code>——这是安全惯例，防止新页面对你的页面做手脚。
      </Callout>

      <h2>图片 img 与 alt 属性</h2>
      <pre className="codeblock">{`<img src="./cat.jpg" alt="一只趴在键盘上的橘猫" width="240" />`}</pre>
      <p>
        <code>&lt;img&gt;</code> 是自闭合标签。<Term en="src">来源</Term>指向图片文件；
        <Term en="alt">替代文本</Term>在图片加载失败时显示，更是视障用户读屏时「听图」的唯一途径。
        <b>alt 不是可选项，是必修课。</b>
      </p>

      <h2>表单 form：收集用户输入</h2>
      <p>
        登录框、搜索栏、留言板——凡是用户能「打字点按」的地方都是表单。
        <code>&lt;input&gt;</code> 靠 <code>type</code> 变身十几种控件：
      </p>
      <div className="not-prose grid gap-2 sm:grid-cols-3">
        {[
          ["text", "单行文本"],
          ["password", "密码（打码）"],
          ["email", "邮箱（自带校验）"],
          ["checkbox", "多选框"],
          ["radio", "单选框（同名一组）"],
          ["submit / button", "提交 / 按钮"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <code className="text-violet-300">{t}</code>
            <div className="mt-1 text-xs leading-5 text-slate-400">{d}</div>
          </div>
        ))}
      </div>
      <p>
        多行输入用 <code>&lt;textarea&gt;</code>；每个控件都应配一个
        <code>&lt;label&gt;</code> 说明文字，并用 <code>for</code> 对准控件的 <code>id</code>——
        点击文字就能聚焦输入框，读屏软件也能正确播报。
      </p>

      <h2>动手 1：友情链接卡片</h2>
      <CodePlayground
        tasks={["换一张图片（试试 https://picsum.photos/300/200）", "改写 alt 为图片的真实描述", "加第三个友情链接，指向你喜欢的网站"]}
        initialHtml={`<img src="https://picsum.photos/300/200" alt="随机风景图" />

<h3>我的朋友们</h3>
<ul>
  <li><a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN 开发文档</a></li>
  <li><a href="https://www.freecodecamp.org" target="_blank" rel="noopener">freeCodeCamp</a></li>
</ul>`}
        initialCss={`body { font-family: sans-serif; padding: 16px; }
img { border-radius: 12px; }
a { color: #6366f1; }`}
      />

      <h2>动手 2：一张能用的报名表单</h2>
      <CodePlayground
        height={330}
        tasks={[
          "给姓名输入框加 placeholder=\"你的名字\"",
          '加一行 radio：性别选择（两个 input 的 name 都设为 "gender"）',
          "把按钮文字改成「立即报名」",
        ]}
        initialHtml={`<form>
  <label for="name">姓名</label>
  <input id="name" type="text" placeholder="怎么称呼你？" />

  <label for="mail">邮箱</label>
  <input id="mail" type="email" placeholder="you@example.com" />

  <label for="msg">想对站长说的话</label>
  <textarea id="msg" rows="3"></textarea>

  <button type="submit">提交</button>
</form>`}
        initialCss={`body { font-family: sans-serif; padding: 16px; }
label { display: block; margin-top: 10px; font-size: 13px; color: #334155; }
input, textarea {
  width: 100%; padding: 8px; margin-top: 4px;
  border: 1px solid #cbd5e1; border-radius: 8px;
}
button {
  margin-top: 14px; padding: 9px 18px;
  background: #6366f1; color: white; border: none;
  border-radius: 8px; cursor: pointer;
}`}
      />

      <Quiz
        questions={[
          {
            q: "alt 属性的作用是什么？",
            options: [
              "鼠标悬停时的提示文字",
              "图片加载失败时的替代显示 + 读屏软件的图片描述",
              "给图片加滤镜效果",
              "控制图片大小"],
            answer: 1,
            explain:
              "alt 是「替代文本」：网络差、图片挂了或用户看不见图时，它就是那张图的代言人。",
          },
          {
            q: "两个 radio 单选框想实现「二选一」，关键是？",
            options: [
              "type 写成 radiobox",
              "它们的 name 设成相同的值",
              "放在同一个 label 里",
              "加 checked 属性"],
            answer: 1,
            explain: "name 相同的 radio 才算同一组，组内自动互斥。checked 只是设置默认选中项。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "链接三件套：<code>href</code> 指路、<code>target=\"_blank\"</code> 新开、<code>rel=\"noopener\"</code> 保安全。",
          "<code>&lt;img&gt;</code> 必带 src 与 alt；alt 是无障碍刚需。",
          "input 的 <code>type</code> 决定控件形态；label 用 for 绑定控件 id。",
          "同名 name 的 radio 才是一组。",
        ]}
      />
    </>
  );
}
