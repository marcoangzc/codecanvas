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
        上一课你认识了 <code>&lt;h1&gt;</code> 和 <code>&lt;p&gt;</code>。
        这一课我们把「文字积木」凑齐，并理解一个重要思想：
        <b>语义化（Semantic HTML）</b>——标签选的是「意思」，不是「样子」。
      </p>
      <Callout variant="deep" title="为什么 h1 不只是「大号加粗」？">
        把标题写成 <code>&lt;h1&gt;</code> 而不是随便一个大字，是在告诉机器：「这是本页最重要的主题」。
        搜索引擎靠它理解你的页面；读屏软件靠它帮视障用户快速跳转章节；
        以后写 CSS 时你也能一键改掉所有标题的样式。<b>结构是骨架，样式是皮肤</b>——先把骨架搭对。
      </Callout>

      <h2>DOM 树：浏览器眼中的你的代码</h2>
      <p>
        浏览器读到 HTML 后，并不是直接开始画界面，而是先把它解析成一棵
        <Term en="DOM">文档对象模型</Term>树——标签套标签，就像家族谱系。
        点击下面的步骤，看这棵树如何一步步「生长」，并悬停节点观察它对应页面的哪个部分：
      </p>
      <DomTree />
      <p>
        记住这个概念：<b>嵌套的标签 = 树的父子关系</b>。模块 2 学 JavaScript 时，
        就是靠操作这棵树让页面动起来的。
      </p>

      <h2>常用文本标签速查</h2>
      <div className="not-prose grid gap-2 sm:grid-cols-2">
        {[
          ["<h1> ~ <h6>", "六级标题，重要性递减。一个页面只用一个 h1。"],
          ["<p>", "段落。段落之间自动留白。"],
          ["<ul> + <li>", "无序列表：爱好清单、功能列表。"],
          ["<ol> + <li>", "有序列表：步骤、排行榜。"],
          ["<strong>", "重要内容，默认加粗——强调「重要性」。"],
          ["<em>", "着重语气，默认斜体——强调「语气」。"],
          ["<br>", "强制换行（自闭合）。只用于诗歌、地址等真正需要断行处。"],
          ["<hr>", "主题分隔线（自闭合）。"],
        ].map(([tag, desc]) => (
          <div key={tag} className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <code className="text-sky-300">{tag}</code>
            <div className="mt-1 text-xs leading-5 text-slate-400">{desc}</div>
          </div>
        ))}
      </div>

      <h2>动手：把一坨文字变成一篇结构化文章</h2>
      <p>
        下面演练场里的内容「能看但没结构」。请用刚学的标签改造它，
        让它成为一份层次分明的小文章：
      </p>
      <CodePlayground
        tasks={[
          "把第一行改成 <h1> 主标题",
          "给两段介绍各配一个 <h2> 小节标题",
          "把三个技能改成 <ul> + <li> 列表",
          "用 <strong> 强调你最想突出的一句话",
        ]}
        initialHtml={`我的自我介绍

大家好我是小林，一名正在转型的前端学习者。

目前会的东西

HTML 入门、CSS 入门、还会一点点设计。

联系方式

邮箱 xiaolin@example.com，欢迎交流学习心得！`}
        initialCss={`body {
  font-family: sans-serif;
  line-height: 1.7;
  padding: 16px;
}`}
      />

      <Quiz
        questions={[
          {
            q: "一个页面里，<h1> 应该出现几次？",
            options: ["越多越好，方便搜索引擎收录", "最多一次", "每个段落前都要有", "没有限制，看心情"],
            answer: 1,
            explain:
              "h1 代表整页唯一的最高层级主题。需要更多层级时用 h2/h3 往下细分，而不是堆一堆 h1。",
          },
          {
            q: '要列出「做菜的三个步骤」，最合适的标签组合是？',
            options: ["<ul> + <li>", "<ol> + <li>", "<p> 一段写完", "<strong> 加粗每一步"],
            answer: 1,
            explain:
              "步骤有先后顺序，属于有序列表，用 <ol>（ordered list）；无序的并列事项才用 <ul>。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "<b>语义优先</b>：标签表达「意思」，样子交给 CSS。",
          "浏览器把 HTML 解析成 <b>DOM 树</b>，嵌套即父子。",
          "常用积木：标题 h1–h6、段落 p、列表 ul/ol+li、强调 strong/em。",
          "h1 全页唯一，层级往下细分。",
        ]}
      />
    </>
  );
}
