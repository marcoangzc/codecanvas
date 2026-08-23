import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";
import ResponsiveLab from "@/components/interactives/ResponsiveLab";

export default function Lesson() {
  return (
    <>
      <p>
        今天超过一半的网页访问来自手机。<Term en="Responsive Web Design">响应式设计</Term>的目标：
        <b>同一份代码，在手机、平板、电脑上都好看</b>——而不是给每种设备写一个网站。
      </p>

      <h2>第一步：视口声明</h2>
      <p>
        手机浏览器默认会「假装」自己是一台 980px 宽的桌面浏览器再整体缩小——
        这会让你的布局看起来像缩略图。一行 meta 标签纠正它：
      </p>
      <pre className="codeblock">{`<meta name="viewport" content="width=device-width, initial-scale=1" />`}</pre>

      <h2>第二步：媒体查询 = 给样式加「触发条件」</h2>
      <pre className="codeblock">{`/* 默认：手机优先的样式 */
.cards { display: grid; grid-template-columns: 1fr; }

/* 屏幕宽度 ≥ 640px 时追加 */
@media (min-width: 640px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

/* ≥ 1024px 再追加 */
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}`}</pre>
      <p>亲手拖动下面的滑块，看断点如何「咔哒、咔哒」地切换布局：</p>
      <ResponsiveLab />

      <h2>第三步：弹性素材</h2>
      <ul>
        <li>
          图片防撑破：<code>img {"{ max-width: 100%; }"}</code> ——图片最宽不超过容器。
        </li>
        <li>
          定宽容器居中：<code>.page {"{ max-width: 1080px; margin: 0 auto; }"}</code>，
          小屏自动收窄，大屏居中留白。
        </li>
      </ul>

      <Callout variant="deep" title="为什么推荐「移动优先」？">
        先写小屏样式（简单场景），再用 min-width 逐级「增强」到大屏，
        而不是反过来删减。这样基础层永远是最精简可靠的版本，
        媒体查询也只做加法，代码更好维护。刚才实验室里的规则就是这种写法。
      </Callout>

      <h2>动手：让名片页在手机上也不破版</h2>
      <CodePlayground
        tasks={[
          "把 .wrap 的固定 width 改成 max-width: 640px 并加 margin: 0 auto",
          "给 img 加 max-width: 100%，拖窄预览区验证不再溢出",
          '加媒体查询：屏幕 ≥ 480px 时 h1 字号变为 28px',
        ]}
        initialHtml={`<div class="wrap">
  <h1>我的旅行手记 🏔️</h1>
  <img src="https://picsum.photos/800/300" alt="山间风景" />
  <p>这一路遇见了云海、篝火和很多善良的人。</p>
</div>`}
        initialCss={`body {
  font-family: sans-serif;
  margin: 0;
  padding: 12px;
}
.wrap {
  width: 640px;   /* ← 问题就在这：手机上放不下！ */
}
h1 { font-size: 20px; }
img { border-radius: 10px; }
p { color: #475569; line-height: 1.7; }`}
        caption="改完后试着把浏览器窗口拉窄，对比修改前后的效果。"
      />

      <Quiz
        questions={[
          {
            q: "meta viewport 标签的作用是？",
            options: [
              "让页面在搜索引擎排名更高",
              "让手机按真实设备宽度渲染页面",
              "加快页面加载速度",
              "隐藏滚动条"],
            answer: 1,
            explain:
              "没有它，手机会假装自己是 980px 宽的桌面浏览器再缩小整页；有了它，你的媒体查询才能按真实宽度生效。",
          },
          {
            q: '"移动优先" 的正确姿势是？',
            options: [
              "先写电脑版再用 max-width 缩小",
              "先写手机版，用 min-width 逐级增强到平板和桌面",
              "只做手机版",
              "为每种设备各写一套 CSS"],
            answer: 1,
            explain:
              "从最窄的场景开始写基础样式，媒体查询只做加法（min-width），逻辑更清晰、覆盖更可靠。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "viewport meta 是响应式的<b>第一行代码</b>。",
          "<code>@media (min-width: …)</code> 在指定宽度以上追加样式。",
          "移动优先：小屏基础 + 大屏增强。",
          "保命两行：<code>img {"+" max-width: 100%;"+" }</code> 与 <code>max-width + margin: 0 auto</code>。",
        ]}
      />
    </>
  );
}
