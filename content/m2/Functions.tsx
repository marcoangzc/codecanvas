import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        上一课你学会了把数据放进「盒子」。这一课解决另一个问题：
        <b>同一段逻辑要反复用，难道复制粘贴三遍？</b>
        程序员对付重复的武器，叫<Term en="Function">函数</Term>——代码的乐高积木。
      </p>
      <pre className="codeblock">{`function greet(name) {        // 定义积木：接收一个参数 name
  return "你好，" + name + "！";  // 加工后把结果递出去
}

greet("小码");   // → "你好，小码！"     调用：积木装上去
greet("阿花");   // → "你好，阿花！"     同一块积木，随插随用`}</pre>

      <h2>解剖一块积木</h2>
      <ul>
        <li><b>函数名</b>：习惯用动词，见名知义——<code>greet</code>、<code>calcTotal</code>、<code>renderList</code>。</li>
        <li><b>参数 Parameter</b>：进料口。调用时塞进去的值，在函数体内像变量一样用。</li>
        <li><b>返回值 Return</b>：出料口。<code>return</code> 的结果就是这次调用的值；没写 return，返回 <code>undefined</code>。</li>
        <li><b>作用域</b>：函数体内声明的变量是「私有的」，外面拿不到——天然防串味。</li>
      </ul>

      <h2>两种写法，一个意思</h2>
      <pre className="codeblock">{`// 写法一：function 声明（老牌、直观）
function double(n) {
  return n * 2;
}

// 写法二：箭头函数 Arrow Function（现代、简洁）
const double2 = (n) => {
  return n * 2;
};

// 只有一句话时还能更短：省略 { } 和 return
const triple = (n) => n * 3;`}</pre>
      <Callout variant="tip" title="先学读，再学挑">
        两种写法日常都能见到。本课程里：<b>有名字的逻辑用 function 声明</b>，
        当场传给别人的小逻辑用箭头函数（第 4 课的 map/filter 里你会天天见到它）。
        细微差别以后再聊，现在会认会写就够了。
      </Callout>

      <h2>积木的进阶玩法</h2>
      <p>参数可以有默认值——不传就用兜底：</p>
      <pre className="codeblock">{`function welcome(name = "访客") {
  return "欢迎回来，" + name;
}
welcome();          // → "欢迎回来，访客"
welcome("小码");    // → "欢迎回来，小码"`}</pre>
      <Callout variant="deep" title="函数也是一种值">
        <code>const double2 = …</code> 这行说明了一切：函数可以存进变量、当参数传来传去。
        这是 JS 最强大的特性之一——第 3 模块 React 里，你会看到整个框架都建立在这个思想上。
      </Callout>

      <h2>动手：造你的第一批积木</h2>
      <CodePlayground
        tasks={[
          "写一个 sum(a, b) 返回两数之和，试三组数",
          "给 greet 补一个默认参数 greeting = \"你好\"",
          "故意删掉 return 再调用，观察控制台输出什么",
          "挑战：写 isAdult(age)，满 18 返回 true 否则 false",
        ]}
        initialJs={`function greet(name) {
  return "你好，" + name + "！";
}

console.log(greet("小码"));

// 👇 轮到你写 sum 了

// 👇 这里试试带默认参数的 welcome`}
        caption="改完停半秒就会自动运行。报错别慌——控制台的红色信息就是最好的老师，下一课我们就专门学读懂它。"
      />

      <Quiz
        questions={[
          {
            q: "function f(x) { x * 2 } 调用 f(5) 的结果是？",
            options: ["10", "undefined", "报错", "NaN"],
            answer: 1,
            explain: "算了但没说出口等于白算：没有 return，函数一律返回 undefined。",
          },
          {
            q: "const add = (a, b) => a + b; 等价于哪种传统写法？",
            options: [
              "function add(a, b) { a + b; }",
              "function add(a, b) { return a + b; }",
              "var add = a + b;",
              "add(a, b) => a + b;"],
            answer: 1,
            explain: "单表达式箭头函数隐式 return。传统写法必须自己写 return，缺了就返回 undefined。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "函数 = 可复用的逻辑积木：<b>参数进，return 出</b>。",
          "没有 return 就返回 <code>undefined</code>。",
          "两种写法：<code>function 名字(参数) { … }</code> 与箭头函数 <code>(参数) =&gt; { … }</code>，单表达式可省略 return。",
          "参数能设默认值：<code>(name = \"访客\")</code>。",
          "函数也是值，可以存变量、当参数——为 React 埋下伏笔。",
        ]}
      />
    </>
  );
}
