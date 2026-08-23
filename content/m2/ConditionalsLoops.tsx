import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        现在你的程序会记事（变量）、会打包（函数），还差两样本能：
        <b>做选择题</b>和<b>重复劳动</b>。学会它们，程序才算「活」了。
      </p>

      <h2>if / else：程序的判断力</h2>
      <pre className="codeblock">{`const score = 86;

if (score >= 90) {
  console.log("优秀！");          // 条件为 true 才执行
} else if (score >= 60) {
  console.log("及格，继续加油");   // 上面的不成立才轮到它
} else {
  console.log("要补课了…");       // 兜底
}`}</pre>
      <p>条件里常用这些比较与逻辑运算符：</p>
      <pre className="codeblock">{`===  全等（值和类型都要一样）    !==  不全等
>    大于        <    小于       >=   >=     <=   <=
&&   并且（两个都真才真）  ||  或者（一个真就真）  !  取反

if (age >= 18 && hasTicket) { … }   // 成年 且 有票`}</pre>

      <Callout variant="warn" title="== 的坑：永远用 ===">
        <code>&quot;1&quot; == 1</code> 居然是 <code>true</code>——双等号会偷偷做类型转换，
        「1 == true」「0 == &quot;&quot;」都是 true，坑多到有专门的笑话合集。
        记住一条：<b>比较一律用 === 和 !==</b>，让类型不同的值直接判不等。
      </Callout>

      <Callout variant="info" title="真值与假值 Truthy / Falsy">
        if 的括号里不一定是比较，任何值都会被当成「真」或「假」。
        假值只有六个：<code>false</code>、<code>0</code>、<code>&quot;&quot;</code>（空字符串）、
        <code>null</code>、<code>undefined</code>、<code>NaN</code>。
        其余全是真值——包括 <code>&quot;0&quot;</code> 和 <code>[]</code>。这个清单值得背下来。
      </Callout>

      <h2>for 循环：重复劳动专家</h2>
      <p>打印 1 到 5，不用写五行 console.log：</p>
      <pre className="codeblock">{`for (let i = 1; i <= 5; i++) {
//   └─起点      └─继续条件  └─每圈之后 +1
  console.log(i);   // 圈内代码会被反复执行
}`}</pre>
      <ul>
        <li><b>起点</b> <code>let i = 1</code>：只在开始前执行一次。</li>
        <li><b>继续条件</b> <code>i &lt;= 5</code>：每圈开始前检查，false 就停。</li>
        <li><b>步进</b> <code>i++</code>：每圈结束后加 1（<code>i--</code> 是减）。</li>
      </ul>
      <p>
        另一位选手 <Term en="while">当型循环</Term> 只带一个条件，适合「不知道要循环几圈」的场景；
        循环里还能用 <code>break</code> 提前退场、<code>continue</code> 跳过本轮。
      </p>
      <Callout variant="warn" title="小心无限循环">
        忘了 <code>i++</code> 或条件永远成立，浏览器会卡死在原地转圈。
        写 while 时先问自己：「什么情况会让它停下来？」答不上来就别按运行。
      </Callout>

      <h2>组合技：循环里做判断</h2>
      <pre className="codeblock">{`let sum = 0;
for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {   // % 是取余数：偶数余 0
    sum = sum + i;
  }
}
console.log(sum);  // → 2550，1~100 所有偶数之和`}</pre>

      <h2>动手：经典面试题 FizzBuzz</h2>
      <CodePlayground
        tasks={[
          "运行它，看懂输出规律（3 的倍数说 Fizz，5 的倍数说 Buzz）",
          "把上限 15 改成 30",
          "补上最后一种情况：既是 3 又是 5 的倍数要说 FizzBuzz（提示：放在最前面判断）",
          "挑战：换成 while 循环实现同样的效果",
        ]}
        initialJs={`for (let i = 1; i <= 15; i++) {
  if (i % 3 === 0) {
    console.log(i, "→ Fizz");
  } else if (i % 5 === 0) {
    console.log(i, "→ Buzz");
  } else {
    console.log(i);
  }
}
// 🤔 为什么 15 会输出 "Fizz" 而不是 "FizzBuzz"？想想判断顺序`}
        caption="% 叫取余运算符：10 % 3 = 1。「n % 3 === 0」就是「n 能被 3 整除」。它是判断倍数、奇偶的标准姿势。"
      />

      <Quiz
        questions={[
          {
            q: 'if ("0") { … } 里的代码会执行吗？',
            options: ["不会，0 是假值", "会，非空字符串是真值", "报错", "随机"],
            answer: 1,
            explain: '"0" 是长度为 1 的字符串，不是数字 0——字符串只有空串 "" 是假值。',
          },
          {
            q: "for (let i = 0; i < 3; i++) { … } 循环体一共执行几次？",
            options: ["2 次", "3 次", "4 次", "无限次"],
            answer: 1,
            explain: "i = 0, 1, 2 各跑一圈；i 变成 3 时条件 i < 3 为 false，退出。从 0 数到 3 前停，正好 3 次。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "if / else if / else 三段式；<b>比较永远用 === 和 !==</b>。",
          "逻辑运算符 && 并、|| 或、! 反。",
          "假值只有六个：false、0、\"\"、null、undefined、NaN。",
          "for(起点; 条件; 步进)：条件 false 即停；while 适合不定圈数。",
          "% 取余判断倍数/奇偶；警惕忘了步进的无限循环。",
        ]}
      />
    </>
  );
}
