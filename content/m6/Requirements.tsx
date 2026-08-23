import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";

/** 一张真实的功能清单：✓ = 进第一版，✗ = 这次先不做 */
const FEATURES = [
  { keep: true, name: "发表一条留言", reason: "产品的灵魂，砍掉它就不成立了" },
  { keep: true, name: "看到所有人的留言列表", reason: "没有人围观，发言就没了意义" },
  { keep: true, name: "网络出错时给出友好提示", reason: "下一课你就会看到：网络一定会出错" },
  { keep: false, name: "注册、登录与个人主页", reason: "匿名留言同样能验证核心价值 → 记入 v2" },
  { keep: false, name: "头像上传与表情包", reason: "锦上添花，不影响「能不能用」" },
  { keep: false, name: "点赞、回复、消息通知", reason: "社交全家桶是 v3 的事 😄" },
];

export default function Lesson() {
  return (
    <>
      <p>
        🚀 欢迎来到<b>毕业模块</b>。想象这一幕：老板拍拍你的肩膀说「给我们做个留言板」。
        几个月前的你大概会立刻新建 index.html 开始狂敲；而现在，请先停一秒——
        专业团队接到需求后的第一反应恰恰相反：<b>先别写代码，先把问题想清楚</b>。
      </p>
      <p>
        接下来六节课，我们把真实产品的完整生命周期走一遍：
        <b>想清楚 → 连起来 → 证明白 → 发出去 → 讲出来 → 毕业作品</b>。
        今天从第一步开始。
      </p>

      <h2>用户故事：替未来用户说话</h2>
      <p>
        第一个工具叫<Term en="User Story">用户故事</Term>，一个固定句式：
        <b>作为（某种用户），我想（做某件事），以便（得到某种价值）</b>。
        给我们的留言板写下三条：
      </p>
      <pre className="codeblock">{`作为 访客，我想 看到大家留下的留言，以便 感受这里有人在交流
作为 访客，我想 写下一句话署名发表，以便 表达想法并被看见
作为 站长，我想 知道共有多少条留言，以便 判断这个角落热不热闹`}</pre>
      <Callout variant="tip" title="为什么非要套这个句式？">
        因为句式里的每一格都在逼你回答一个问题：<b>为谁做、做什么、凭什么值得做</b>。
        「我想加个炫酷的粒子背景」这种念头一旦被迫写成「作为访客，我想看粒子，以便……」，
        你自己就会卡住——卡住的那格，往往就是该砍掉的功能。
      </Callout>

      <h2>MVP：先砍掉一半再说 ✂️</h2>
      <p>
        把用户故事展开会得到一长串功能愿望单。全部做完再上线？那是新手陷阱：
        三个月过去产品还没见面世，等你知道没人想要时，学费已经交完了。
        专业的做法是先定义<Term en="MVP">最小可行产品</Term>——
        <b>刚好能验证「有人需要它」的最小版本</b>。判断标准只有一句：
        <b>砍掉它，产品还成立吗？</b>
      </p>
      <div className="my-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 bg-slate-900 px-5 py-3 text-sm font-bold text-white">
          📋 留言板功能清单 · 第一版裁决
        </div>
        <ul>
          {FEATURES.map((f) => (
            <li key={f.name} className="flex gap-3 border-b border-slate-800/70 px-5 py-2.5 last:border-b-0">
              <span className={f.keep ? "text-emerald-400" : "text-rose-400"}>{f.keep ? "✓" : "✗"}</span>
              <div>
                <p className={`mb-0 text-sm font-medium ${f.keep ? "text-slate-100" : "text-slate-500 line-through decoration-slate-600"}`}>
                  {f.name}
                </p>
                <p className="mb-0 text-xs leading-5 text-slate-500">{f.reason}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Callout variant="deep" title="MVP ≠ 偷工减料">
        被砍掉的功能写在「v2 待办」里，而不是假装不存在；
        留下的三项则要做到<b>可靠</b>——错误提示、加载状态一个不少。
        MVP 砍的是「范围」，从不砍「质量」。
      </Callout>

      <h2>线框图：一张草图定界面</h2>
      <p>
        动手前最后一件事：把页面长什么样画下来。<Term en="Wireframe">线框图</Term>不需要美观，
        方框加文字就行，它的作用是让团队在写第一行 CSS 之前就对布局达成一致：
      </p>
      <pre className="codeblock">{`┌────────────────────────────────┐
│ 💬 码上留言              header │
├────────────────────────────────┤
│ [ 你的名字___________ ]         │
│ [ 想说的话___________ ]         │
│ [ 发表 ]  ← 主按钮               │
├────────────────────────────────┤
│ 留言列表                 main   │
│ ┌──────────────────────────┐   │
│ │ 小美：加油！    · 3 分钟前 │   │
│ ├──────────────────────────┤   │
│ │ 阿强：前排围观  · 刚刚     │   │
│ └──────────────────────────┘   │
├────────────────────────────────┤
│ © 我的第一个全栈作品     footer │
└────────────────────────────────┘`}</pre>
      <p>
        注意这张草图已经悄悄回答了很多问题：header 放标题、main 放表单和列表、footer 落款——
        正是模块 1 学的语义化标签。毕业挑战里，它会原样出现在你的代码顶部当「计划」。
      </p>

      <Quiz
        questions={[
          {
            q: "下面哪个是最合格的 MVP？",
            options: [
              "把想到的所有功能一次做全，憋个大招再上线",
              "只留「发留言 + 看留言」，界面朴素但稳定可用",
              "先做好登录系统和炫酷动画，核心功能下个版本补上",
              "不打折扣，做到自认完美再发布"],
            answer: 1,
            explain:
              "MVP 的唯一标准：用最小成本验证「有人需要」。选项 2 砍掉了外围却保住了核心价值；选项 1、4 是典型的无限延期陷阱；选项 3 甚至没包含核心价值。",
          },
          {
            q: "用户故事「作为…我想…以便…」里，「以便」这一格的作用是？",
            options: [
              "描述界面配色方案",
              "说明打算用什么技术实现",
              "说清这件事给用户带来的价值",
              "记录预计的开发工期"],
            answer: 2,
            explain:
              "三格分别回答「谁」「做什么」「为什么值得做」。填不出价值的功能，通常正是 MVP 应该最先砍掉的那一批。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "动手之前先想清楚：专业团队的第一步永远是<b>需求分析</b>，不是写代码。",
          "<b>用户故事</b>句式：作为…我想…以便…——逼你回答「为谁做、做什么、凭什么是值得的」。",
          "<b>MVP</b> = 刚好能验证核心价值的最小版本；判断标准：砍掉它产品还成立吗？",
          "MVP 砍范围不砍质量：留下的功能要带上错误处理和加载状态。",
          "<b>线框图</b>用方框定布局，顺便确定语义化结构（header/main/footer）。",
        ]}
      />
    </>
  );
}
