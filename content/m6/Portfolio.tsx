import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";

/** STAR 法则四格 */
const STAR = [
  { k: "S", name: "Situation 背景", desc: "一句话交代项目缘起：「毕业要求做一款调用真实 API 的应用」。" },
  { k: "T", name: "Task 任务", desc: "你的目标与约束：「让不懂技术的同学 30 秒内看懂并留下第一条言」。" },
  { k: "A", name: "Action 行动", desc: "重头戏：你做了哪些决策、踩了什么坑、怎么解决。" },
  { k: "R", name: "Result 结果", desc: "用事实收尾：「上线一周收到 40 条留言」「演示全程零故障」。" },
];

export default function Lesson() {
  return (
    <>
      <p>
        再过一课就是毕业挑战。等它完成，你手里就有了第一个真正意义上的全栈作品。
        但请先回答：<b>同一个课程项目，为什么有人把它放进简历后拿到面试，
          有人的却躺在文件夹里吃灰？</b>
        差别几乎从不在项目大小，而在于<Term en="Portfolio">作品集</Term>的另一半——<b>讲述</b>。
        所以这一课我们提前把「展示」这件事准备好，让下一件作品从诞生起就按藏品的标准打磨。
      </p>

      <h2>README 三段式：让陌生人在 60 秒内读懂</h2>
      <p>
        打开 GitHub 仓库，别人第一眼看的就是 README。<b>它不是使用说明书，是你的门面</b>。
        零基础也能写好的骨架就三段：<b>它是什么 → 怎么跑起来 → 我学到什么</b>。
        下面这份模板可以直接抄走，把空填上就是一份合格的作品说明：
      </p>
      <pre className="codeblock">{`# 码上留言 · Guestboard

> 一个可以匿名发表、实时浏览留言的全栈小应用。
> 在线演示：https://你的演示地址   ← 放最显眼的位置！

## 它是什么
- 技术栈：HTML/CSS/JS 前端 · Node.js API · SQLite 数据库
- 核心功能：发表留言 / 列表展示 / 加载与错误状态处理
- 我的角色：从需求分析到部署上线的全部环节

## 怎么跑起来
\`\`\`bash
git clone https://github.com/你的用户名/guestboard.git
cd guestboard && npm install && npm run dev
# 然后打开终端提示的本地地址即可
\`\`\`

## 我学到什么
- 用 try/catch/finally 设计了 loading / error / empty 三种页面状态
- 第一次把前端、API、数据库连成完整的一条线
- 已知不足：暂无登录，留言不能删除（规划在 v2）——诚实反而加分`}</pre>
      <Callout variant="tip" title="「已知不足」是加分项">
        敢写局限说明你清楚产品的边界——这恰恰是初级开发者最稀缺的自我认知。
        面试官看到「我知道它还不完美，且知道下一步怎么改」，比看到十行自夸印象深得多。
      </Callout>

      <h2>截图与在线 Demo：30 秒定生死 📸</h2>
      <ul>
        <li><b>在线 Demo 放在 README 第一行</b>：能让别人点开就玩，就别让人先装环境。</li>
        <li><b>至少一张界面截图</b>：放在 README 开头；有交互就录一张 GIF 或短视频。</li>
        <li><b>截「工作正常」的样子</b>：列表有数据、状态提示友好——而不是控制台一片红色报错 😅。</li>
        <li><b>手机也看看</b>：响应式那课学的本事，正好在这里变成卖点。</li>
      </ul>

      <h2>STAR 法则：把项目讲成一个故事 🎬</h2>
      <p>
        面试和简历里的项目描述，专业圈通用<Term en="STAR">STAR 法则</Term>：
      </p>
      <div className="my-6 grid gap-3 sm:grid-cols-2">
        {STAR.map((s) => (
          <div key={s.k} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="mb-1 text-sm font-bold text-white">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 font-mono text-xs text-indigo-300">{s.k}</span>
              {s.name}
            </p>
            <p className="mb-0 text-xs leading-5 text-slate-400">{s.desc}</p>
          </div>
        ))}
      </div>
      <p>
        四格里<b>最能体现水平的是 A（行动）</b>：背景大家相似，但「我发现断网时页面白屏，
        于是设计了三种状态的兜底方案」这种句子，是任何人都替代不了的你。
        把毕业挑战里每一次真实的卡壳与解决记下来——那就是最好的素材。
      </p>

      <Quiz
        questions={[
          {
            q: "README 的开头（第一屏）最应该回答的问题是？",
            options: [
              "这个项目的完整源码",
              "开发过程中每天的工作日志",
              "这个项目是什么、给谁用、点哪里能看到效果",
              "两百行的版本更新记录"],
            answer: 2,
            explain:
              "读者只给你 30 秒。「是什么 + 在线 Demo/截图」决定了他要不要继续往下读，其余内容都应该排在这之后。",
          },
          {
            q: "用 STAR 法则讲项目时，最能体现你个人水平的部分是？",
            options: [
              "Situation：项目背景有多宏大",
              "Task：任务清单列得有多长",
              "Action：你做的决策、遇到的坑与解决办法",
              "Result：结果部分用了多少感叹号"],
            answer: 2,
            explain:
              "背景与任务人人相似，唯有「怎么想、怎么做」不可复制——面试官的追问几乎总是落在 Action 上。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "作品集 = <b>项目 × 讲述</b>；同样的项目，会讲故事的人拿面试。",
          "README 三段式：<b>它是什么 → 怎么跑起来 → 我学到什么</b>，末尾诚实写下已知不足。",
          "<b>在线 Demo 和截图放最显眼处</b>，让别人 30 秒内看到效果。",
          "<b>STAR 法则</b>：背景、任务、行动、结果；其中 Action 最能体现你的水平。",
          "把学习过程中的坑记下来——它们正是未来面试里的最佳素材。",
        ]}
      />
    </>
  );
}
