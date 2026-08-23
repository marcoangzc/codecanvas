import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        上一课的 <code>&lt;App /&gt;</code> 只会对全世界说同一句「你好」。
        想跟三个人分别打招呼，难道复制三遍再手改文字？这一课补上两件武器：
        JSX 的<b>三条交通规则</b>，以及组件之间的传话机制——
        <Term en="Props">属性</Term>。
      </p>

      <h2>JSX：在 JavaScript 里写 HTML</h2>
      <p>
        <Term en="JSX">JSX</Term> 长得像 HTML，其实是 JavaScript 的语法糖——
        演练场里的 Babel 会当场把它翻译成普通函数调用，所以你不需要写任何
        <code>import</code>。但它有三条铁律，新手九成的报错都栽在这里：
      </p>
      <ol>
        <li><b>样式类叫 className</b>，不叫 class——因为 class 是 JS 的保留字。</li>
        <li><b>花括号 {"{}"} 里写表达式</b>：变量、算式、函数调用都行，结果会被渲染出来。</li>
        <li><b>所有标签必须闭合</b>：<code>&lt;img /&gt;</code>、<code>&lt;br /&gt;</code> 这类单标签也要自闭合。</li>
      </ol>
      <pre className="codeblock">{`<h1 className="title">你好</h1>     ✅ 用 className
<h1 class="title">你好</h1>         ❌ 报错：class 是保留字

<p>{1 + 2} 杯奶茶</p>               ✅ 显示：3 杯奶茶
<p>{user.name} 的账单</p>            ✅ {} 里放变量也行

<img src="cat.jpg" />               ✅ 自闭合
<img src="cat.jpg">                 ❌ 没闭合，Babel 直接罢工`}</pre>
      <Callout variant="warn" title="一个高频坑">
        花括号里只能放<b>表达式</b>（能算出一个值的东西），不能放语句。
        <code>{"{if (ok) …}"}</code> 不合法；条件显示请用三目运算符：
        <code>{"{isVip ? \"尊贵会员\" : \"普通用户\"}"}</code>。
      </Callout>

      <h2>Props：父组件给孩子递纸条</h2>
      <p>
        组件既然是函数，就能接收参数。React 把这些参数称为
        <Term en="Props">属性</Term>：父组件在标签上像写 HTML 属性一样把它们传进去，
        子组件收到的则是一个打包好的对象：
      </p>
      <pre className="codeblock">{`function Greeting(props) {
  return <h2>你好，{props.name}！</h2>;   // 从包裹里取出 name
}

<Greeting name="小明" />   // → 你好，小明！
<Greeting name="小红" />   // → 你好，小红！

// 同一个组件，喂不同的数据，长出不同的样子`}</pre>
      <p>
        和模块 2 的函数传参一模一样：参数不同，结果不同——区别只是「参数」穿上了标签属性的外衣。
        另外注意传值姿势：<b>字符串用引号，数字、布尔值、变量要用花括号</b>，
        比如 <code>&lt;Greeting age={"{"}18{"}"} /&gt;</code>。
      </p>

      <Callout variant="deep" title="Props 是只读的">
        子组件拿到 prop 也<b>不能修改它</b>——数据只能从父组件单向流向子组件，
        这叫单向数据流（Unidirectional Data Flow）。想让子组件「改变主意」？
        得由父组件把修改函数也作为 prop 传下去。这一招第 5 课和结课挑战都会用到。
      </Callout>

      <h2>动手：一个组件，三种问候</h2>
      <CodePlayground
        mode="react"
        height={300}
        tasks={[
          "加第四个 <Greeting />，name 写成你自己",
          "给 Greeting 多传一个 mood prop，把它显示在句尾（比如 😄 或 ☕）",
          "进阶：写一个 Badge 组件接收 count prop，渲染「🔔 × 数字」，再用两种 count 各调一次",
        ]}
        initialJsx={`// Greeting 接收 name prop，就能对任何人问好
function Greeting(props) {
  return (
    <div className="chip">
      <span className="avatar">{props.name[0]}</span>
      <span>
        你好，<b>{props.name}</b>！祝你今天写码顺利～
      </span>
    </div>
  );
}

function App() {
  return (
    <div>
      {/* 同一个组件复用三次，只有数据不同 */}
      <Greeting name="王小码" />
      <Greeting name="React 学习者" />
      <Greeting name="未来的全栈工程师" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`}
        initialCss={`body { font-family: "PingFang SC", "Microsoft YaHei", sans-serif; background: #ecfeff; padding: 14px; }
.chip {
  display: flex; align-items: center; gap: 10px;
  background: white; border-radius: 999px;
  padding: 6px 16px 6px 6px; margin: 8px auto; width: fit-content;
  box-shadow: 0 3px 10px rgba(6, 182, 212, 0.15);
  font-size: 13px; color: #334155;
}
.avatar {
  width: 28px; height: 28px; border-radius: 50%;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #06b6d4, #6366f1);
  color: white; font-weight: bold; font-size: 13px;
}
b { color: #0e7490; }`}
        caption='小实验：把某个调用改成 <Greeting name={3 + 4} /> ——花括号里是表达式，会先求值再渲染。'
      />

      <Quiz
        questions={[
          {
            q: "JSX 里正确的样式类写法是？",
            options: ['class="box"', 'className="box"', 'cssClass="box"', "style=box"],
            answer: 1,
            explain: "class 是 JavaScript 的保留字，React 特意改名为 className；用法和 HTML 的 class 完全相同。",
          },
          {
            q: "<p>{2 * 3} 元</p> 在页面上显示什么？",
            options: ["{2 * 3} 元 原样照印", "6 元", "23 元", "空白并报错"],
            answer: 1,
            explain: "花括号里是 JS 表达式，先算出 6 再渲染成文本；想原样显示花括号反而需要想办法转义。",
          },
          {
            q: "age 是数字，下面哪种 props 写法是对的？",
            options: ['<User age="18" />', "<User age={18} />", "<User age:18 />", "<User age=18 />"],
            answer: 1,
            explain: '字符串才用引号；数字、布尔值、变量、函数都要放进花括号，否则会被当成字符串 "18"。',
          },
        ]}
      />

      <KeyPoints
        points={[
          "JSX 三规则：<b>className 代替 class</b>、花括号里写表达式、标签一律闭合。",
          "花括号里只能放表达式；条件渲染用三目运算符 <code>{x ? a : b}</code>。",
          "props 是父传子的数据包裹，写在标签属性的位置；字符串用引号，其余用花括号。",
          "props 只读：数据单向流动，子组件不改父组件的东西。",
        ]}
      />
    </>
  );
}
