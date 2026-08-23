import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";
import BoxModelLab from "@/components/interactives/BoxModelLab";

export default function Lesson() {
  return (
    <>
      <p>
        排版总对不齐？间距忽大忽小？九成问题都出在这节课的主角身上——
        <Term en="Box Model">盒模型</Term>。<b>页面上每个元素都是一个矩形盒子</b>，
        从里到外分四层：
      </p>
      <ol>
        <li><Term en="Content">内容区</Term>：文字图片本身，width/height 默认只管这一层。</li>
        <li><Term en="Padding">内边距</Term>：内容与边框之间的「呼吸空间」，属于盒子内部。</li>
        <li><Term en="Border">边框</Term>：盒子的描边，有粗细、线型和颜色。</li>
        <li><Term en="Margin">外边距</Term>：盒子与邻居之间的距离，透明的「社交距离」。</li>
      </ol>
      <p>亲手拖一拖滑块，看四层如何互相影响：</p>
      <BoxModelLab />

      <h2>content-box vs border-box</h2>
      <p>
        刚才的实验暴露了默认模式的问题：<b>content-box 下，加 padding 和 border 会把盒子越撑越大</b>，
        你设的 width 根本不是最终宽度。所以实际项目几乎都会全局切换成更符合直觉的 border-box：
      </p>
      <pre className="codeblock">{`* {
  box-sizing: border-box;   /* width 直接 = 盒子总宽 */
}`}</pre>

      <Callout variant="deep" title="margin 合并现象">
        垂直方向上，相邻两个元素的 margin 会「合并」取较大值，而不是相加：
        上方 margin-bottom 30px + 下方 margin-top 20px = 实际间隔 30px。
        初见觉得反直觉，习惯后反而方便。知道有这回事，遇到「间距没变大」就不会慌了。
      </Callout>

      <h2>动手：排出一张舒服的海报卡</h2>
      <CodePlayground
        tasks={[
          "给 .poster 加 padding: 24px 和圆角 border-radius: 16px",
          "给它加 border: 1px solid #e2e8f0",
          "用 margin: 40px auto 让卡片水平居中（auto = 左右平分）",
        ]}
        initialHtml={`<div class="poster">
  <h1>周末手冲工作坊 ☕</h1>
  <p>时间：本周六 14:00 · 地点：线上直播间</p>
  <p>从豆子到杯子，一起探索风味的世界。</p>
</div>`}
        initialCss={`body {
  font-family: sans-serif;
  background: #f1f5f9;
}
.poster {
  width: 320px;
  background: white;
}
h1 { font-size: 22px; margin: 0 0 8px; }
p { font-size: 14px; color: #475569; line-height: 1.7; }
`}
      />

      <Quiz
        questions={[
          {
            q: "content-box 模式下，width:100px + padding:10px + border:5px 的盒子实际总宽是？",
            options: ["100px", "115px", "130px", "120px"],
            answer: 2,
            explain: "100 + (10×2) + (5×2) = 130px。这就是为什么大家都切到 border-box。",
          },
          {
            q: "想加大「内容与边框之间」的距离，应该调？",
            options: ["margin", "padding", "border-width", "top"],
            answer: 1,
            explain:
              "padding 管盒子内部呼吸感；margin 是与邻居的外部距离，别再搞混啦。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "每个元素都是盒：<b>content → padding → border → margin</b> 四层。",
          "默认 content-box 会越撑越大；项目标配 <code>* {"+" box-sizing: border-box;"+" }</code>。",
          "<code>margin: 0 auto</code> 可让定宽块水平居中。",
          "垂直相邻 margin 会合并取较大值。",
        ]}
      />
    </>
  );
}
