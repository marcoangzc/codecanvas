import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        到目前为止，我们的组件都是「一次性照片」：渲染完就定格了。
        可真实应用随时都在变——购物车数字会涨、深色模式能开关、点赞会变红。
        这一课给组件装上<Term en="State">状态</Term>：组件自己的记忆。
      </p>

      <h2>先踩个坑：普通变量为什么不行？</h2>
      <p>
        直觉方案是用模块 2 学的 <code>let</code> 变量来计数。看看左右两种写法的区别：
      </p>
      <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/[0.06] p-4">
          <p className="!mb-2 text-sm font-bold text-rose-300">❌ 直接改变量：React 不知情</p>
          <pre className="codeblock !mb-2">{`let count = 0;

function handleClick() {
  count = count + 1;
  console.log(count); // 1、2、3…
}`}</pre>
          <p className="!mb-0 text-xs leading-5 text-slate-400">
            控制台里的数字确实在涨，界面却纹丝不动——React 根本不知道有人私改了它的档案。
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4">
          <p className="!mb-2 text-sm font-bold text-emerald-300">✅ setCount：正式提交变更申请</p>
          <pre className="codeblock !mb-2">{`const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  点了 {count} 次
</button>`}</pre>
          <p className="!mb-0 text-xs leading-5 text-slate-400">
            调用修改函数 = 通知 React「数据变了，请重新渲染」，界面随之自动更新。
          </p>
        </div>
      </div>

      <h2>useState：申请一块组件专属的记忆</h2>
      <pre className="codeblock">{`const [count, setCount] = useState(0);
//     ↑      ↑             ↑
//   当前值  修改函数       初始值
// （useState 返回一个数组，用模块 2 学过的解构接住）

setCount(count + 1);   // 唯一正确的改法：永远通过 setCount`}</pre>
      <ol>
        <li>调用 <code>useState(初始值)</code> 申请一块记忆，它返回一个数组；</li>
        <li>解构接住两项：<b>当前值</b>和<b>修改函数</b>，命名惯例是 <code>xxx / setXxx</code>；</li>
        <li>想改变界面？调用修改函数。React 会<b>重新执行整个组件函数</b>，用新数据画出新界面。</li>
      </ol>
      <p>
        这就是「数据驱动 UI」的完整闭环：点击按钮 → <code>setCount</code> → 组件重跑 → 界面更新。
        你再也不用手动找元素、改文字——<b>改数据就够了</b>。
      </p>

      <Callout variant="deep" title="setXxx 是「预约」，不是「立刻生效」">
        调用修改函数后，React 会攒一批变更再统一重绘（批处理 Batch Update）。
        所以紧接着打印 <code>count</code> 得到的还是旧值——这不是 bug，是特性。
        正确心态：把「改成什么样」交给 setCount 去计算，别指望它马上生效。
      </Callout>

      <h2>动手：计数器 + 心情开关</h2>
      <p>
        补一个小细节：React 的事件属性用驼峰命名 <code>onClick</code>（HTML 里是小写 onclick），
        且值必须是<b>一个函数</b>：<code>{"onClick={() => 做点什么}"}</code>。
        来把两个经典 demo 都玩一遍：
      </p>
      <CodePlayground
        mode="react"
        height={330}
        tasks={[
          "把计数器改成每次 +10",
          "加一个「清零」按钮，点击时执行 setCount(0)",
          "反着玩：把 setCount(count + 1) 改成 count = count + 1，亲眼看看界面还更不更新",
        ]}
        initialJsx={`const { useState } = React; // 本课主角登场

// 计数器：数字存在 state 里，点一次涨一次
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="panel">
      <p className="label">当前点击次数</p>
      <p className="big">{count}</p>
      <button onClick={() => setCount(count + 1)}>点我 +1</button>
    </div>
  );
}

// 开关：布尔 state 配上取反 !
function MoodSwitch() {
  const [happy, setHappy] = useState(true);
  return (
    <div className="panel">
      <p className="big">{happy ? "😀" : "😴"}</p>
      <button onClick={() => setHappy(!happy)}>
        {happy ? "切换到困倦模式" : "满血复活！"}
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="row">
      <Counter />
      <MoodSwitch />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`}
        initialCss={`body { font-family: "PingFang SC", "Microsoft YaHei", sans-serif; background: #eef2ff; }
.row { display: flex; gap: 12px; justify-content: center; padding: 16px; flex-wrap: wrap; }
.panel {
  background: white; border-radius: 14px; padding: 16px 20px;
  width: 170px; text-align: center;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
}
.label { margin: 0 0 4px; font-size: 12px; color: #94a3b8; }
.big { margin: 0 0 10px; font-size: 34px; font-weight: bold; color: #4338ca; }
button {
  padding: 8px 14px; border: none; border-radius: 8px;
  background: #6366f1; color: white; font-size: 12px; cursor: pointer;
}
button:hover { background: #4f46e5; }`}
        caption="第三个任务会让你对「为什么必须 setXxx」终身难忘。"
      />

      <Quiz
        questions={[
          {
            q: "点击按钮后希望界面跟着变，正确写法是？",
            options: ["count = count + 1", "setCount(count + 1)", "count++ 然后 return count", "重新定义一次变量 count"],
            answer: 1,
            explain: "只有通过 setCount 提交变更，React 才知道要重新渲染；直接改变量只是改了一个谁也不看的数字。",
          },
          {
            q: "const [visible, setVisible] = useState(false) 中，visible 是什么？",
            options: [
              "初始值为 false、可被 setVisible 更新的状态",
              "恒为 false 的常量",
              "一个 DOM 元素",
              "CSS 属性名"],
            answer: 0,
            explain: "useState(false) 表示这块记忆初始是 false；调用 setVisible(true) 后，组件会用新值重新渲染。",
          },
          {
            q: "happy 初始为 true，按钮执行 setHappy(!happy)，连点两次后显示的表情是？",
            options: ["😀（取反两次回到原点）", "一直 😀 不变", "😴", "报错"],
            answer: 0,
            explain: "!happy 取反：true→false→true。每次 setState 都触发重渲染，表情永远跟着 state 走。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "直接改变量 React 不知情；<b>必须调用 setXxx</b> 提交变更。",
          "<code>useState(初值)</code> 返回数组 [当前值, 修改函数]，惯例命名为 xxx / setXxx。",
          "每次 setState 都会<b>重新执行组件函数</b>——界面永远是数据的投影。",
          "事件用驼峰 onClick，值为函数：<code>onClick={() =&gt; …}</code>。",
        ]}
      />
    </>
  );
}
