import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";
import DocAnatomy from "@/components/interactives/DocAnatomy";

export default function Lesson() {
  return (
    <>
      <p>
        HTML 全称 <Term en="HyperText Markup Language">超文本标记语言</Term>。
        名字很吓人，本质却很简单——它<b>不是编程语言</b>：没有变量、没有循环、不会「执行」；
        它是一门<b>标记语言</b>，只做一件事：告诉浏览器「这里是什么」——这是标题、这是段落、这是图片。
      </p>
      <p>
        先来看一份最小但完整的 HTML 文档。点击左边代码的任意一行，
        右边会告诉你它对应页面的哪个部分：
      </p>
      <DocAnatomy />

      <h2>标签的语法规则</h2>
      <p>
        刚才你看到的 <code>&lt;h1&gt;</code>、<code>&lt;p&gt;</code> 都叫
        <Term en="Tag">标签</Term>。它们的写法只有几条规则，一分钟就能记住：
      </p>
      <ul>
        <li>
          大多数标签<b>成对出现</b>：<code>&lt;p&gt;内容&lt;/p&gt;</code>。带斜杠的是结束标签，像括号一样把内容包起来。
        </li>
        <li>
          少数标签<b>自己就完整</b>（不需要包内容），比如图片 <code>&lt;img&gt;</code> 和换行 <code>&lt;br&gt;</code>。
        </li>
        <li>
          <Term en="Attribute">属性</Term>写在<b>开始标签</b>里，格式是 <code>名字=&quot;值&quot;</code>，
          用来给元素附加信息，比如 <code>&lt;img src=&quot;cat.jpg&quot;&gt;</code> 里的 src 就是图片来源。
        </li>
        <li>
          标签可以<b>嵌套</b>，但不能<b>交叉</b>：<code>&lt;p&gt;&lt;strong&gt;对&lt;/strong&gt;&lt;/p&gt;</code> ✓，
          <code>&lt;p&gt;&lt;strong&gt;错&lt;/p&gt;&lt;/strong&gt;</code> ✗ ——就像手套要先戴里面那层再戴外面那层。
        </li>
      </ul>

      <Callout variant="warn" title="新手最常见的三个笔误">
        ① 忘写结束斜杠 <code>&lt;p&gt;文字&lt;p&gt;</code>；
        ② 属性值忘了引号 <code>class=intro</code>；
        ③ 标签交叉嵌套。浏览器通常会「好心」帮你纠正，
        但纠正的结果未必是你想要的——养成规范书写的习惯，能省掉未来 90% 的诡异问题。
      </Callout>

      <h2>动手：改出你的第一个网页</h2>
      <p>
        下面是一个真实的演练场——左边改代码，右边立刻变样（这就是「实时预览」）。
        完成右上方列出的三个小任务吧！
      </p>
      <CodePlayground
        tasks={[
          "把大标题改成你自己的名字",
          "再加一个段落，介绍你的一个爱好",
          "用 <strong> 标签强调段落里的某个词，观察效果",
        ]}
        initialHtml={`<h1>你好，我是小明</h1>

<p>我正在学习全栈开发，这是我亲手写的第一个网页。</p>`}
        initialCss={`body {
  font-family: sans-serif;
  padding: 16px;
}`}
        caption="提示：切换 HTML / CSS 标签页编辑不同图层；改坏了随时点右上角「重置」。"
      />

      <Quiz
        questions={[
          {
            q: "下面哪种嵌套写法是正确的？",
            options: [
              '<p><strong>加油</strong></p>',
              "<p><strong>加油</p></strong>",
              "<strong><p>加油</strong></p>",
              "<p><strong>加油</strong>",
            ],
            answer: 0,
            explain:
              "嵌套不能交叉：里面的标签必须先闭合，外面的标签最后闭合。选项 D 则少了结束标签。",
          },
          {
            q: 'HTML 的属性应该写在哪里？',
            options: [
              "结束标签里，比如 </p class=\"x\">",
              "开始标签里，格式为 名字=\"值\"",
              "标签内容中间任意位置",
              "必须单独占一行"],
            answer: 1,
            explain:
              '属性永远写在开始标签里：<img src="cat.jpg">、<a href="https://...">。下一课你会大量用到它们。',
          },
        ]}
      />

      <KeyPoints
        points={[
          "HTML 是<b>标记语言</b>：只描述「这里是什么」，不包含逻辑。",
          "一份文档的骨架：<code>&lt;!DOCTYPE html&gt;</code> → <code>&lt;html&gt;</code> → <code>&lt;head&gt;</code> + <code>&lt;body&gt;</code>。",
          "标签大多成对出现；属性写在开始标签里：<code>名字=\"值\"</code>。",
          "嵌套不能交叉——先开的后关，后开的先关。",
        ]}
      />
    </>
  );
}
