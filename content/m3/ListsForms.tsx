import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        打开任何一个真实应用：聊天记录、订单列表、待办事项……界面的大半江山都是
        <b>列表</b>。没人会手抄一百遍 <code>&lt;li&gt;</code>——React 的做法是把数据数组
        「映射」成一排组件。这一课还顺路解决另一半问题：怎么优雅地收集用户输入。
      </p>

      <h2>用 map 把数组画成列表</h2>
      <p>
        模块 2 学过：<code>map</code> 会把数组的每个元素加工成新东西。在 JSX 里，
        这个「新东西」可以就是一段界面：
      </p>
      <pre className="codeblock">{`const fruits = ["苹果", "香蕉", "橘子"];

<ul>
  {fruits.map((f) => (
    <li key={f}>{f}</li>
  ))}
</ul>

// 数组里有几个元素，页面就长出几个 <li>`}</pre>
      <h3>key：每一项的身份证 🪪</h3>
      <p>
        列表会增删、会排序，React 更新时靠 <Term en="Key">key</Term> 认人：
        key 相同的项原地复用，新出现的项新建，消失的项移除——不必整列推翻重画。
        两条纪律：<b>兄弟之间唯一</b>、<b>稳定不变</b>。优先用数据自带的 id；
        顺序会变化的列表不要拿下标 <code>i</code> 当 key，否则增删时 React 会「认错人」。
      </p>

      <h2>对象数组：真实世界的形状</h2>
      <p>
        服务器吐回来的列表几乎都是对象数组。套路完全一样，只是多了一步取字段——
        结课挑战的天气看板，骨架正是这段代码：
      </p>
      <pre className="codeblock">{`const CITIES = [
  { id: "bj", name: "北京", temp: 26 },
  { id: "sh", name: "上海", temp: 31 },
];

{CITIES.map((c) => (
  <CityCard key={c.id} name={c.name} temp={c.temp} />
))}`}</pre>

      <h2>受控表单：state 说了算 🎛️</h2>
      <p>
        模块 2 里读输入框得先 <code>querySelector</code> 再翻 <code>.value</code>，
        React 反其道而行：<b>输入框显示什么，完全由 state 决定</b>；用户每敲一个字，
        就把最新值写回 state。这样的输入框叫<Term en="Controlled Input">受控组件</Term>：
      </p>
      <pre className="codeblock">{`const [text, setText] = useState("");

<input
  value={text}                                // 界面 ← state
  onChange={(e) => setText(e.target.value)}   // 打字 → 写回 state
/>
<p>你正在输入：{text}</p>`}</pre>
      <p>
        于是形成一个闭环：打字 → onChange → setText → 重新渲染 → 输入框显示新值。
        数据是唯一的真相源，界面只是它的投影——再也不怕「界面和数据对不上号」。
      </p>

      <Callout variant="warn" title="往数组里加东西：禁止 push！">
        数组也是 state，「直接改」的老毛病一样会犯：<code>items.push(x)</code>
        偷偷修改旧数组，React 察觉不到。正确姿势是<b>造一个新数组交上去</b>：
        追加用 <code>setItems([...items, 新项])</code>，删除用
        <code>setItems(items.filter(...))</code>。老规矩：改数据，不改旧物。
      </Callout>

      <h2>动手：「输入并添加到列表」小应用</h2>
      <CodePlayground
        mode="react"
        height={380}
        tasks={[
          '按下 Enter 也能添加（提示：给 input 加 onKeyDown={(e) => e.key === "Enter" && addItem()}）',
          "加删除功能：点击某条就移除（提示：setItems(items.filter((x) => x.id !== it.id))）",
          "输入为空时禁用添加按钮（提示：disabled={!text.trim()}）",
        ]}
        initialJsx={`const { useState } = React;

let nextId = 3; // 给新目标发身份证用

function WishBoard() {
  const [items, setItems] = useState([
    { id: 1, text: "学会 React 组件" },
    { id: 2, text: "做出天气看板" },
  ]);
  const [text, setText] = useState("");

  function addItem() {
    const t = text.trim();
    if (!t) return;                                  // 空白输入不加
    setItems([...items, { id: nextId, text: t }]);   // 新数组 = 旧数组 + 新项
    nextId += 1;
    setText("");                                     // 顺手清空输入框
  }

  return (
    <div className="board">
      <h1>🎯 我的小目标</h1>
      <div className="form-row">
        <input
          value={text}
          placeholder="输入一个小目标…"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addItem}>添加</button>
      </div>
      <ul>
        {items.map((it) => (
          <li key={it.id}>{it.text}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WishBoard />);`}
        initialCss={`body { font-family: "PingFang SC", "Microsoft YaHei", sans-serif; background: #faf5ff; padding: 16px; }
.board { max-width: 320px; margin: 0 auto; background: white; border-radius: 14px; padding: 20px; box-shadow: 0 10px 26px rgba(147, 51, 234, 0.14); }
h1 { margin: 0 0 12px; font-size: 17px; color: #7e22ce; }
.form-row { display: flex; gap: 8px; }
input { flex: 1; padding: 8px 10px; border: 1px solid #ddd6fe; border-radius: 8px; font-size: 13px; outline: none; }
input:focus { border-color: #a855f7; }
button { padding: 8px 14px; border: none; border-radius: 8px; background: #a855f7; color: white; cursor: pointer; font-size: 13px; }
ul { margin: 14px 0 0; padding-left: 4px; list-style: none; }
li { padding: 7px 8px; border-bottom: 1px dashed #ede9fe; font-size: 13px; color: #4b5563; }`}
        caption="这个小应用就是结课挑战天气看板的直系亲属：列表渲染 + 受控输入 + 数组 state。"
      />

      <Quiz
        questions={[
          {
            q: "列表渲染时，key 的作用是？",
            options: [
              "给列表加密保护",
              "帮 React 识别每一项的身份，从而高效地增删与复用",
              "控制列表的颜色",
              "装饰性属性，可有可无"],
            answer: 1,
            explain: "key 是每项稳定的身份证：React 靠它判断谁新增、谁消失、谁移动了，不必整列推倒重画。",
          },
          {
            q: "受控输入框必备的两件套是？",
            options: ["value 与 onChange", "name 与 id", "type 与 placeholder", "defaultValue"],
            answer: 0,
            explain: "value 让 state 决定显示什么，onChange 把用户输入写回 state——一进一出形成闭环。",
          },
          {
            q: "items 是数组 state，往里追加一项的正确姿势？",
            options: [
              "items.push(新项)",
              "setItems([...items, 新项])",
              "items[items.length] = 新项",
              "以上效果完全一样"],
            answer: 1,
            explain: "必须交给 React 一个全新的数组；push 是原地修改，引用没变，React 认为什么都没发生。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "列表渲染 = 数组.map() 变成一排 JSX；元素几个，界面就几个。",
          "key 要<b>稳定且唯一</b>：优先用数据里的 id，顺序会变的列表别用下标。",
          "受控表单两件套：<code>value={state}</code> + <code>onChange</code> 写回 state。",
          "更新数组 state 一律造新值：展开追加 [...arr, x]、filter 删除——绝不 push。",
        ]}
      />
    </>
  );
}
