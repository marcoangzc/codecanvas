import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        模块 2 结束时，你已经能让页面「动」起来了。但你可能也隐隐觉得累：
        功能一多，<code>querySelector</code> 满天飞、DOM 改得晕头转向。
        这一课开始换一种活法——<Term en="React">React</Term> 的核心主张：
        <b>把界面拆成一块块积木</b>。
      </p>

      <h2>组件：界面的乐高积木 🧩</h2>
      <p>
        一盒乐高里有窗户、轮子、人偶：同一种零件能装上十辆不同的车；
        小零件拼成车厢，车厢拼成整列火车。<Term en="Component">组件</Term>
        就是界面世界的乐高零件，而且它的本体朴素得出乎意料——<b>一段返回界面的函数</b>：
      </p>
      <pre className="codeblock">{`function ProductCard() {      // 一个组件 = 一个函数
  return (                    // 返回什么 = 这块积木长什么样
    <div className="card">
      <h3>机械键盘</h3>
      <p>￥399</p>
    </div>
  );
}

// 想要几张卡片就用几次，零复制粘贴：
<ProductCard />
<ProductCard />`}</pre>
      <p>
        注意两件事：组件名<b>首字母必须大写</b>（React 靠它区分组件和普通标签）；
        使用时把它写成 <code>&lt;ProductCard /&gt;</code> 的样子——像一枚自定义标签。
      </p>

      <h2>为什么大家都在用它？</h2>
      <div className="not-prose grid gap-3 sm:grid-cols-3">
        {[
          ["♻️ 复用", "卡片组件写一次，首页、购物车、收藏夹到处能用；改一处，处处更新。"],
          ["🧱 组合", "小组件拼成大组件：按钮拼成表单，表单拼成页面。再复杂的界面也只是搭积木。"],
          ["📊 数据驱动", "界面是数据的函数：数据一变，界面自动重画，从此不再手动操作 DOM。"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <div className="font-semibold text-sky-300">{t}</div>
            <div className="mt-1 text-xs leading-5 text-slate-400">{d}</div>
          </div>
        ))}
      </div>

      <h2>拆界面：先画组件树，再写代码 🌳</h2>
      <p>
        专业前端拿到设计稿的第一件事不是敲代码，而是拿笔把界面<b>一圈一圈拆开</b>，
        画出嵌套关系——这就是<Term en="Component Tree">组件树</Term>。
        以一个「商品列表页」为例：
      </p>
      <div className="not-prose my-8 space-y-1 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 font-mono text-xs leading-7">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-bold text-sky-300">&lt;App&gt;</span>
          <span className="font-sans text-slate-400">整张页面：自己不长内容，专职拼积木</span>
        </div>
        <div className="ml-5 flex flex-wrap items-baseline gap-x-3">
          <span className="text-cyan-300">├─ &lt;Header&gt;</span>
          <span className="font-sans text-slate-500">顶部导航栏</span>
        </div>
        <div className="ml-5 flex flex-wrap items-baseline gap-x-3">
          <span className="text-cyan-300">├─ &lt;SearchBar&gt;</span>
          <span className="font-sans text-slate-500">搜索框</span>
        </div>
        <div className="ml-5 flex flex-wrap items-baseline gap-x-3">
          <span className="text-cyan-300">└─ &lt;ProductList&gt;</span>
          <span className="font-sans text-slate-500">商品列表区</span>
        </div>
        <div className="ml-[68px] flex flex-wrap items-baseline gap-x-3">
          <span className="rounded bg-amber-500/15 px-1.5 font-bold text-amber-300">└─ &lt;ProductCard&gt; × N</span>
          <span className="font-sans text-slate-500">同一份代码渲染 N 张卡！</span>
        </div>
        <div className="ml-[104px] flex flex-wrap items-baseline gap-x-3">
          <span className="text-teal-300">├─ &lt;Img&gt;</span>
          <span className="font-sans text-slate-500">商品图</span>
        </div>
        <div className="ml-[104px] flex flex-wrap items-baseline gap-x-3">
          <span className="text-teal-300">└─ &lt;PriceTag&gt;</span>
          <span className="font-sans text-slate-500">价格标签</span>
        </div>
      </div>
      <p>
        拆法很简单：看到<b>重复出现的区块</b>就抽成组件，看到<b>独立的功能区</b>也抽成组件，
        一层一层往下拆，直到剩下的都是一眼能写出来的小东西。
      </p>

      <Callout variant="tip" title="演练场已内置 React">
        本模块的演练场自带 React 18 + Babel：无需安装任何东西，也不用写
        <code>import</code>，左侧 JSX 标签页里的代码本身就是一份完整脚本。
        需要 hooks 时写 <code>{"const { useState } = React;"}</code>（下一课见）。
      </Callout>

      <h2>动手：写下你的第一个组件</h2>
      <p>
        光看不练假把式。写 React 只有两个固定动作——<b>定义组件</b>和<b>挂载到页面</b>：
      </p>
      <pre className="codeblock">{`// 1) 定义：一个返回界面的函数，首字母大写
function App() {
  return <h1>你好，React 👋</h1>;
}

// 2) 挂载：找到 id 为 root 的容器，把 <App /> 渲染进去
ReactDOM.createRoot(document.getElementById("root")).render(<App />);`}</pre>
      <CodePlayground
        mode="react"
        height={280}
        tasks={[
          "把 <h1> 里的问候语换成你的名字",
          "再添一个 <p>，写上今天的日期",
          "进阶：新建第二个组件 Footer（返回一句话），并在 App 里用 <Footer /> 排到卡片底部",
        ]}
        initialJsx={`function App() {
  return (
    <div className="card">
      <h1>你好，React！👋</h1>
      <p>这是我亲手写的第一个组件。</p>
    </div>
  );
}

// 固定口诀：找到 #root 容器，把 <App /> 挂载上去
ReactDOM.createRoot(document.getElementById("root")).render(<App />);`}
        initialCss={`body {
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  background: linear-gradient(135deg, #e0f2fe, #ede9fe);
  display: grid;
  place-items: center;
  min-height: 220px;
}
.card {
  background: white;
  padding: 26px 32px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 12px 32px rgba(79, 70, 229, 0.18);
}
h1 { margin: 0 0 8px; font-size: 21px; color: #1e293b; }
p { margin: 0; font-size: 13px; color: #64748b; }`}
        caption="记住最后这句「挂载口诀」——本模块每一课、包括结课挑战，都会见到它。"
      />

      <Quiz
        questions={[
          {
            q: "关于组件的说法，正确的是？",
            options: [
              "组件是一段只能使用一次的 HTML 片段",
              "组件是返回界面的函数，可以反复使用、自由组合",
              "组件必须放在单独的文件里才能使用",
              "组件是浏览器新推出的原生标签"],
            answer: 1,
            explain: "组件的本质就是函数：输入数据、返回界面。正因为是函数，它才能像积木一样随取随用。",
          },
          {
            q: "想把 Card 组件放到页面上，应该写？",
            options: ["Card()", "render(Card)", "<Card />", "document.write(Card)"],
            answer: 2,
            explain: "组件名首字母大写，然后像标签一样书写 <Card />；React 看到它就会调用这个函数，并把返回的界面渲染出来。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "组件 = 返回界面的函数，名字必须以<b>大写字母</b>开头。",
          "三大价值：<b>复用、组合、数据驱动 UI</b>。",
          "动手前先画<b>组件树</b>：从整页拆到局部，一层层往下分解。",
          "挂载口诀：<code>ReactDOM.createRoot(document.getElementById(&quot;root&quot;)).render(&lt;App /&gt;)</code>。",
        ]}
      />
    </>
  );
}
