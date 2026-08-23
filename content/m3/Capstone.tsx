import Link from "next/link";
import Callout from "@/components/Callout";
import Challenge from "@/components/Challenge";
import CodePlayground from "@/components/playground/CodePlayground";
import { getChecksForLesson } from "@/lib/checks";

const CHECKS = getChecksForLesson("m3/capstone") ?? [];

const STARTER = `/* ============================================================
   🌤️ 结课挑战 · 天气看板 Weather Board
   把下面所有 TODO 补完，让看板能真正切换城市！
   ============================================================ */

// 已备好的城市 mock 数据（真实项目里它来自接口，模块 4 见 😉）
const CITIES = [
  { name: "北京", temp: 26, sky: "晴 ☀️", wind: "北风 3 级", tip: "紫外线强，注意防晒" },
  { name: "上海", temp: 31, sky: "多云 ⛅", wind: "东风 2 级", tip: "闷热潮湿，多喝水" },
  { name: "广州", temp: 34, sky: "雷阵雨 ⛈️", wind: "南风 4 级", tip: "出门记得带伞" },
  { name: "哈尔滨", temp: -8, sky: "小雪 🌨️", wind: "西北风 5 级", tip: "天寒地冻，穿厚点" },
];

/* ---------- 子组件：城市切换按钮 ---------- */
function CityButton({ city, active, onPick }) {
  return (
    /* TODO ①：给 button 加上点击事件（第 5 课练过），事件里调用
       onPick(city.name)，让父组件知道用户选了哪座城市 */
    <button className={"city-btn" + (active ? " active" : "")}>
      {city.name}
    </button>
  );
}

/* ---------- 主组件：天气看板 ---------- */
function App() {
  // TODO ②：用状态钩子记住「当前选中的城市名」，初始值设为 "北京"
  //         （第一步：像第 3 课那样，把钩子从 React 里解构出来）

  const current = CITIES[0]; // TODO ③：改成根据上面保存的城市名，从 CITIES 里找出对应对象

  return (
    <div className="board">
      <header>
        <h1>🌤️ 我的城市天气</h1>

        {/* TODO ④：用第 5 课的列表渲染方法，把 CITIES 数组变成一排
            <CityButton />；每个按钮都要传 city、active 和 onPick，
            并给每一项配上 key */}
        <nav className="city-list"></nav>
      </header>

      {/* 当前城市的天气卡片 */}
      <section className="weather-card">
        <div className="sky">{current.sky}</div>
        <h2>{current.name}</h2>
        <p className="temp">{current.temp}°C</p>
        <p className="wind">{current.wind}</p>
        <p className="tip">💡 {current.tip}</p>
      </section>

      {/* TODO ⑤（加分）：用第 4 课的副作用知识 + setTimeout，
          进页面时先显示「加载中…」，1 秒后再亮出这张卡片 */}
    </div>
  );
}

// 老口诀：把看板挂载到页面上
ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

export default function Lesson() {
  return (
    <>
      <p>
        恭喜通关六节课！🎉 组件思维、JSX 与 Props、useState、useEffect、列表与受控表单——
        React 最核心的工具已经全部在你手里。现在是收获时刻：
        把它们拧成一个真正的小应用——<b>天气看板 Weather Board</b>。
      </p>

      <Callout variant="tip" title="挑战玩法">
        分两步走：<b>第一步</b>在下方演练场里把示例看板跑通、改造顺手；
        <b>第二步</b>进入正式挑战，编辑器里是一份带 TODO 注释的半成品，补完全部功能即可。
        右侧清单会<b>实时核对</b>你的进度；全部打勾后点击提交——
        你的代码会真的发送到本站服务器的 <code>/api/validate</code> 接口校验。
      </Callout>

      {/* 要求清单速览 */}
      <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="!mt-0 flex items-center gap-2 text-lg font-bold text-white">📋 作品要求</h2>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 marker:text-sky-400">
          {CHECKS.map((c) => (
            <li key={c.id} className="text-sm leading-6 text-slate-300">
              {c.label}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          卡住了？每一项都对应一节课：
          组件定义与挂载见第 1 课 · JSX 与 props 见第 2 课 · useState 见第 3 课 ·
          useEffect 见第 4 课 · map 列表渲染与事件见第 5 课。
        </p>
      </div>

      <h2>第一步 · 热身：把看板盘熟 ☀️</h2>
      <p>
        这份示例已经完整实现了「切换城市」：注意城市按钮、<code>useState</code> 保存的选中项、
        以及 <code>.map()</code> 渲染出的按钮排——三件事如何咬合成一个循环。
      </p>
      <CodePlayground
        mode="react"
        height={430}
        tasks={[
          "加一个你家乡的城市（别漏了湿度字段）",
          "给天气卡片加一条穿衣建议 tip 字段并展示",
          "进阶：加一个 °C / °F 切换开关——又要用 useState 了",
        ]}
        initialJsx={`const { useState } = React;

// 预置的城市 mock 数据（正式挑战里有一份更丰富的）
const CITIES = [
  { id: "bj", name: "北京", temp: 26, sky: "晴 ☀️", humidity: 38 },
  { id: "sh", name: "上海", temp: 31, sky: "多云 ⛅", humidity: 62 },
  { id: "gz", name: "广州", temp: 34, sky: "雷阵雨 ⛈️", humidity: 81 },
  { id: "hrb", name: "哈尔滨", temp: -8, sky: "小雪 🌨️", humidity: 55 },
];

function App() {
  const [cityId, setCityId] = useState("bj");       // 记住选中的城市
  const current = CITIES.find((c) => c.id === cityId); // 找出它的数据

  return (
    <div className="wrap">
      <div className="tabs">
        {CITIES.map((c) => (
          <button
            key={c.id}
            className={c.id === cityId ? "tab on" : "tab"}
            onClick={() => setCityId(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="weather">
        <div className="sky">{current.sky}</div>
        <h2>{current.name}</h2>
        <p className="temp">{current.temp}°C</p>
        <p className="meta">💧 湿度 {current.humidity}%</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`}
        initialCss={`body { font-family: "PingFang SC", "Microsoft YaHei", sans-serif; background: #e0f2fe; padding: 14px; }
.wrap { max-width: 340px; margin: 0 auto; }
.tabs { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.tab { padding: 6px 12px; border: 1px solid #bae6fd; background: white; border-radius: 999px; font-size: 12px; cursor: pointer; color: #0369a1; }
.tab.on { background: #0284c7; border-color: #0284c7; color: white; }
.weather { margin-top: 12px; background: white; border-radius: 16px; padding: 18px; text-align: center; box-shadow: 0 10px 26px rgba(2, 132, 199, 0.16); }
.sky { font-size: 34px; }
h2 { margin: 4px 0 0; font-size: 17px; color: #0c4a6e; }
.temp { margin: 4px 0; font-size: 30px; font-weight: bold; color: #0284c7; }
.meta { margin: 0; font-size: 12px; color: #94a3b8; }`}
        caption="点城市按钮 → setCityId → 重新渲染。这个循环，就是结课挑战的心跳。"
      />

      <h2>第二步 · 正式挑战：补完你的看板 ⛅</h2>
      <Challenge lessonId="m3/capstone" starterCode={STARTER} />

      <Callout variant="deep" title="刚才发生了什么？">
        你写的 JSX 并不是浏览器天生认识的语言——演练场里的 Babel 当场把它翻译成普通的
        JS 函数调用（这也是为什么全程不用写 import）。点击提交时，代码被 POST 到
        <code>/api/validate</code>，服务器逐条运行校验规则再返回 JSON 结果。
        「翻译 → 发送 → 校验 → 渲染」这套组合拳，就是你未来每一天的真实日常；
        模块 4 里，你会亲手写出天气数据真正的来源——Node.js 接口。
      </Callout>

      <div className="my-10 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-6 text-center">
        <div className="text-3xl">🏁</div>
        <h2 className="!mt-2 justify-center text-xl font-bold text-white">完成之后</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300 [&_p]:mb-0">
          你刚刚完成了一次思维升级：从「找到元素再改它」到「描述界面，让数据驱动它」。
          接下来的旅程：<b>Node.js 后端 → RESTful 接口 → 数据库 → 全栈实战</b>。
          等学完模块 4，回头给这块天气看板接上真实的气象 API——
          它会从练习品毕业成作品集里的第一件前端藏品。
        </p>
        <Link href="/curriculum" className="btn-primary mt-5 px-6 py-2.5">
          查看接下来的路线 🗺️
        </Link>
      </div>
    </>
  );
}
