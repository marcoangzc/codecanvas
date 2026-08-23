import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";
import FlexboxLab from "@/components/interactives/FlexboxLab";

export default function Lesson() {
  return (
    <>
      <p>
        「怎么让这个 div 垂直居中？」曾是前端面试的劝退题。
        有了 <Term en="Flexbox">弹性布局</Term>，答案只要三行。它的心智模型只有两个词：
      </p>
      <ul>
        <li>
          <b>容器与项目</b>：给父元素设 <code>display: flex</code>，它就变成「弹性容器」，直接子元素自动排队。
        </li>
        <li>
          <b>主轴与交叉轴</b>：排队方向叫主轴，垂直于它的叫交叉轴。
          justify-content 管主轴对齐，align-items 管交叉轴对齐——
          <b>方向一换，两根轴跟着换</b>，这是新手最大的坑。
        </li>
      </ul>
      <p>别急着背属性，到实验室里拨一遍，手感自然就来了：</p>
      <FlexboxLab />

      <h2>三个高频配方</h2>
      <pre className="codeblock">{`/* ① 完美居中：曾经的世界难题 */
.center {
  display: flex;
  justify-content: center;   /* 主轴居中 */
  align-items: center;       /* 交叉轴居中 */
}

/* ② 导航栏：logo 左，菜单右 */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ③ 卡片墙：等间距 + 自动换行 */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}`}</pre>

      <Callout variant="tip" title="gap 是现代布局的礼物">
        过去控制子元素间距只能靠 margin（还常要 :last-child 清尾）。
        现在 <code>gap</code> 一行搞定容器内所有间隔，干净得让人感动。
      </Callout>

      <h2>动手：搭一条真正的导航栏</h2>
      <CodePlayground
        tasks={[
          "让 .nav 变成 flex 容器，logo 与链接分居两端",
          "让 .menu 内部的三个链接水平排列并留出 gap",
          "给整条导航加上垂直居中对齐",
        ]}
        initialHtml={`<nav class="nav">
  <div class="logo">☕ 咖啡小站</div>
  <div class="menu">
    <a href="#">首页</a>
    <a href="#">菜单</a>
    <a href="#">关于</a>
  </div>
</nav>`}
        initialCss={`body { font-family: sans-serif; }
.nav {
  background: #1e293b;
  padding: 14px 20px;
}
.logo { color: #fff; font-weight: bold; }
.menu a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
}`}
      />

      <Quiz
        questions={[
          {
            q: "flex-direction: column 时，justify-content 控制的是？",
            options: ["水平方向的排列", "垂直方向（主轴）的排列", "文字对齐", "元素大小"],
            answer: 1,
            explain:
              "justify-content 永远管主轴。column 的主轴是垂直的，所以它这时管上下排列——轴随方向变！",
          },
          {
            q: "想让一行 flex 子元素「两端贴边、中间均分剩余空间」，用？",
            options: ["space-around", "space-between", "space-evenly", "center"],
            answer: 1,
            explain:
              "between 首尾贴边；evenly 连首尾空隙也完全相等；around 则是每个元素两侧空隙相等（首尾外侧是内部一半）。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "<code>display: flex</code> 设在<b>父元素</b>上，子元素自动成为弹性项目。",
          "<b>主轴</b>随 flex-direction 变化；justify 管主轴、align 管交叉轴。",
          "完美居中配方：justify-content + align-items 双 center。",
          "导航配方：space-between + align-items: center。",
          "间距首选 <code>gap</code>。",
        ]}
      />
    </>
  );
}
