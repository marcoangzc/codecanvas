import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        组件学会记事了，但还有一类活儿天生不属于「画界面」：倒计时要每秒走字、
        进页面要去服务器拉数据、顺手把浏览器标签标题改掉。这些渲染之外的事，
        React 称之为<Term en="Side Effect">副作用</Term>，统一交给
        <Term en="useEffect">useEffect</Term>打理。
      </p>

      <h2>渲染之外的事，谁来干？</h2>
      <p>
        类比一下：渲染是「把桌椅摆好」——纯计算，摆出界面；副作用是「摆好之后再去烧水」——
        和摆桌椅无关、但必须有人做的事。<code>useEffect</code> 就是你给 React 留的便签：
        「等这次界面画完，帮我顺便办一件事。」
      </p>
      <pre className="codeblock">{`useEffect(() => {
  // 这里写「渲染之外的事」：定时器、日志、网络请求……
}, [依赖]);   // ← 第二个参数决定「什么时候办」`}</pre>

      <h2>依赖数组：什么时候执行？⏰</h2>
      <div className="not-prose grid gap-3 sm:grid-cols-3">
        {[
          ["不传第二个参数", "每次渲染后都执行——太容易失控，慎用"],
          ["[] 空数组", "只在组件首次出现后执行一次（最常用）"],
          ["[city]", "首次执行 + 每次 city 变化后再执行"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <code className="text-sky-300">{t}</code>
            <div className="mt-1 text-xs leading-5 text-slate-400">{d}</div>
          </div>
        ))}
      </div>
      <p>
        把它想成快递单上的「送达条件」：<Term en="Dependency Array">依赖数组</Term>
        里写谁，谁变化之后就再跑一遍；写空数组就是「只送第一次」。
      </p>

      <h2>定时器必须打扫干净：Cleanup 清理 🧹</h2>
      <p>
        <code>setInterval</code> 启动的计时器不会自己停。如果组件已经从页面上移除，
        计时器还在后台偷偷跑，就会越积越多、页面越来越卡。
        所以规矩是：<b>effect 里创建的东西，必须在清理函数里归还</b>——
        effect 函数 <code>return</code> 出去的那个函数就是清理函数，
        React 会在「下次 effect 执行前」和「组件卸载时」自动调用它：
      </p>
      <pre className="codeblock">{`useEffect(() => {
  const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
  return () => clearInterval(timer);   // 🧹 清理：不给幽灵定时器留后门
}, []);`}</pre>
      <Callout variant="warn" title="忘了清理会怎样？">
        切走页面后旧定时器仍在运行，来回几次就有一堆「幽灵定时器」同时改状态——
        这是内存泄漏（Memory Leak）最常见的来源之一。模块 2 里你得自己记得
        removeEventListener，现在 React 用统一的 cleanup 帮你善后。
      </Callout>

      <h2>用 setTimeout 彩排「获取网络数据」</h2>
      <p>
        真实的数据获取要等模块 4 的接口知识，但它的<b>节奏</b>现在就能彩排：
        发起请求 → 显示加载中 → 数据到达 → 渲染结果。<code>setTimeout</code>
        可以完美扮演那段网络延迟：
      </p>
      <pre className="codeblock">{`const [data, setData] = useState(null);       // 还没有数据
const [loading, setLoading] = useState(true); // 一开始正在加载

useEffect(() => {
  setTimeout(() => {
    setData({ city: "北京", temp: 26 });  // 假装这是服务器发来的
    setLoading(false);                    // 加载结束
  }, 1500);
}, []);

if (loading) return <p>⏳ 正在获取天气…</p>;
return <p>{data.city} · {data.temp}°C</p>;`}</pre>
      <p>
        将来只需把 <code>setTimeout</code> 换成 <code>fetch</code>，
        整套「加载中 → 有数据」的编排原封不动——这正是前端对接后端的固定戏码。
      </p>

      <CodePlayground
        mode="react"
        height={300}
        tasks={[
          "把模拟延迟改成 3 秒，体会 loading 占位的价值",
          "打开控制台，在两个 effect 里各加一句 console.log，观察它们何时执行",
          "给秒表加 running 状态与暂停/继续按钮（提示：running 时才累加）",
        ]}
        initialJsx={`const { useState, useEffect } = React;

// ① 秒表：注意 cleanup 是怎么清理定时器的
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer); // 🧹 不留幽灵定时器
  }, []);
  return <p className="line">⏱️ 你已在看板停留 {seconds} 秒</p>;
}

// ② 用 setTimeout 彩排「请求 → 加载中 → 数据到达」
const FAKE_SERVER = { city: "北京", temp: 26, sky: "晴 ☀️" };

function FakeFetch() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {  // 1.5 秒后「响应」抵达
      setData(FAKE_SERVER);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(t); // 定时器同样要清理！
  }, []);

  if (loading) return <p className="line muted">⏳ 正在向服务器获取天气…</p>;
  return (
    <p className="line">
      {data.city} · {data.temp}°C · {data.sky}
    </p>
  );
}

function App() {
  return (
    <div className="panel">
      <Stopwatch />
      <FakeFetch />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`}
        initialCss={`body { font-family: "PingFang SC", "Microsoft YaHei", sans-serif; background: #f0fdfa; display: grid; place-items: center; min-height: 200px; }
.panel { background: white; border-radius: 14px; padding: 18px 24px; box-shadow: 0 10px 26px rgba(13, 148, 136, 0.16); }
.line { margin: 6px 0; font-size: 14px; color: #0f766e; }
.muted { color: #94a3b8; animation: pulse 1.2s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: 0.45; } }`}
        caption="秒数每秒 +1 却不重复叠加，靠的正是空数组依赖：effect 只挂了一次，cleanup 保证不残留。"
      />

      <Quiz
        questions={[
          {
            q: "useEffect(() => {...}, []) 的执行时机是？",
            options: [
              "每次渲染后都执行",
              "只在组件第一次出现在页面后执行一次",
              "用户点击时执行",
              "永远不会执行"],
            answer: 1,
            explain: "空数组意味着「没有会变的依赖」，所以只在挂载后跑一次；不传第二个参数才会每次渲染都执行。",
          },
          {
            q: "effect 里 return 出去的那个函数，什么时候被调用？",
            options: [
              "每次渲染之前",
              "下一次 effect 执行前，以及组件从页面移除时",
              "永远不会被调用",
              "调用 setState 的瞬间"],
            answer: 1,
            explain: "它是清理函数，负责归还定时器、监听器等资源——这正是防止幽灵定时器和内存泄漏的机制。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "副作用 = 渲染之外的事：定时器、日志、网络请求。",
          "口诀 <b>useEffect(函数, 依赖数组)</b>：本次渲染完成后执行。",
          "依赖三态：不传＝每次渲染后；<code>[]</code>＝仅首次；<code>[a]</code>＝首次 + a 变化后。",
          "effect 里 return 的函数是<b>清理函数</b>：clearInterval / clearTimeout 写在这里。",
          "setTimeout 能完整彩排网络请求：loading → 数据到达 → setLoading(false)。",
        ]}
      />
    </>
  );
}
