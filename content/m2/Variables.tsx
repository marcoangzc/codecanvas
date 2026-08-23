import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";
import VariableBox from "@/components/interactives/VariableBox";

export default function Lesson() {
  return (
    <>
      <p>
        模块 1 里你让网页有了骨架和皮肤；这个模块，我们给它装上<b>大脑</b>。
        一切从程序的「记忆」开始——<Term en="Variable">变量</Term>。
      </p>
      <p>
        想象内存是一面放满盒子的墙：每个盒子贴一张标签（变量名），里面装一个值。
        程序运行时做的事，本质上就是<b>往盒子里放东西、取东西、换东西</b>。
      </p>

      <h2>声明一个变量：let 与 const</h2>
      <pre className="codeblock">{`let score = 10;        // 会变的数，用 let
const maxScore = 100;  // 不该变的常量，用 const（声明时必须赋值）

score = 25;            // ✅ let 可以重新赋值
maxScore = 200;        // ⛔ 报错！const 不允许重新赋值`}</pre>
      <p>
        命名讲究：<b>驼峰命名</b>（camelCase，如 <code>maxScore</code>）、见名知意。
        <code>x1</code>、<code>a</code> 这种名字，一周后的你自己都看不懂。
      </p>

      <Callout variant="deep" title="为什么大家都默认用 const？">
        经验法则：<b>先用 const，确实需要重新赋值才换成 let</b>。
        这样一读代码就知道「这个值从头到尾不会变」，少一类隐蔽 bug。
        至于 <code>var</code>——老一代的声明方式，有作用域怪癖，如今请当它不存在。
      </Callout>

      <h2>亲眼看：赋值时内存里发生了什么</h2>
      <p>与其背规则，不如看一遍。点下面的按钮逐行执行这段代码：</p>
      <VariableBox />

      <h2>数据都有类型</h2>
      <p>
        盒子里装的东西分几种<Term en="Type">类型</Term>，最常用的是这几种基本类型：
      </p>
      <ul>
        <li><code>string</code> 字符串 —— 文字，穿引号：<code>&quot;你好&quot;</code></li>
        <li><code>number</code> 数字 —— 整数小数都是它：<code>42</code>、<code>3.14</code></li>
        <li><code>boolean</code> 布尔 —— 只有两个人：<code>true</code> / <code>false</code></li>
        <li><code>undefined</code> —— 声明了但还没赋值：「这儿有个盒子，空的」</li>
        <li><code>null</code> —— 故意放进去的「空」：「我知道它是空」</li>
        <li>以及万物皆可装的 <code>object</code>（对象、数组都算，第 4 课见）</li>
      </ul>
      <p>
        用 <Term en="typeof">类型检查</Term> 运算符可以随时问浏览器「这是什么类型」：
      </p>

      <h2>动手：认识你的数据</h2>
      <CodePlayground
        tasks={[
          "把 name 和 age 换成你自己的信息",
          "给每个值 console.log(typeof …)，看看类型",
          "故意写一句 age = \"十八岁\"，再看 typeof age 变成什么",
          "试试声明一个不赋值的变量，它的值和类型是什么？",
        ]}
        initialJs={`// 👇 变量声明 + 赋值
const name = "小码";
let age = 18;

console.log(name, "的类型是", typeof name);
console.log(age, "的类型是", typeof age);

age = 19; // 过了个生日
console.log("生日后：", age);

let mystery;
console.log("mystery 的值是", mystery, "，类型是", typeof mystery);`}
        caption={`注意上面的小实验：age = "十八岁" 之后 typeof 会变成 string——同一个变量可以换类型，这叫动态类型。灵活，但也容易埋雷，所以心里要清楚盒子里装的是什么。`}
      />

      <Quiz
        questions={[
          {
            q: "const price = 99; 之后执行 price = 88; 会发生什么？",
            options: ["price 变成 88", "报错，const 不能重新赋值", "price 保持 99 但不报错", "price 变成 undefined"],
            answer: 1,
            explain: "const 是常量绑定：声明时必须赋值，之后不允许再整体赋新值。想改就用 let。",
          },
          {
            q: 'console.log(typeof "42") 输出什么？',
            options: ['"number"', '"string"', '"text"', '"undefined"'],
            answer: 1,
            explain: "穿了引号就是字符串，哪怕内容看起来是数字。typeof 返回的是表示类型名的字符串。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "变量 = 内存里贴了标签的盒子；<b>const 默认，会变才 let</b>，忘掉 var。",
          "重新赋值：先算等号右边，再覆盖旧值。",
          "五大基本类型：string / number / boolean / undefined / null；复杂的一律 object。",
          "<code>typeof x</code> 随时查类型；JS 是动态类型，换值也可能换型。",
          "命名用驼峰、见名知意——代码是写给人看的。",
        ]}
      />
    </>
  );
}
