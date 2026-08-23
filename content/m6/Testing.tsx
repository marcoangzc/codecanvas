import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        功能终于联调通了 🎉 但请回答一个尴尬的问题：<b>你怎么证明它是对的？</b>
        「我点过一遍，没问题」叫手工测试——它的致命伤是：每次改动都得重新点一遍，
        而且人总会漏。这一课我们学程序员的办法：<b>让代码自己证明自己</b>。
      </p>

      <h2>断言：一句话说清「我以为」和「实际」</h2>
      <p>
        测试的核心动作叫<Term en="Assertion">断言</Term>，形状固定得像填空题：
        <code>expect(实际).toBe(期望)</code>。读出来就是一句人话——
        <b>「实际结果，应该等于我期望的结果」</b>：
      </p>
      <pre className="codeblock">{`expect(add(1, 2)).toBe(3);
// 算对了 → 绿勾 ✓  什么都不用做
// 算错了 → 红叉 ✗  并告诉你：期望 3，实际 4`}</pre>
      <p>
        注意红叉比绿勾更有价值：它精确指出了<b>「我以为是这样，其实是那样」</b>的那一瞬，
        bug 就藏在这个差值里。这个句式你还会在专业工具里反复见到：
        Jest、Vitest 这些<Term en="Test Framework">测试框架</Term>的核心 API
        长得和它一模一样——因为接下来我们就要亲手把它发明出来。
      </p>

      <h2>动手：十行写一个迷你测试器 🧪</h2>
      <p>
        右边的控制台就是你的「成绩单」。我们给一个小函数写三条断言——
        其中一条<b>故意</b>把期望值写错，看看红叉长什么样：
      </p>
      <CodePlayground
        height={320}
        tasks={[
          "数一数控制台的绿勾和红叉",
          '把第三条的期望改成正确的 "a-b"，让三条全绿',
          "再加一条边界测试：expect(slugify(\"\")) 应该得到什么？先猜再运行",
        ]}
        initialHtml={`<p style="font-family:sans-serif;padding:16px;color:#334155">
  打开下方「控制台 Console」查看测试成绩单 👇
</p>`}
        initialJs={`// ① 迷你测试器：expect(实际).toBe(期望)
function expect(actual) {
  return {
    toBe(expected) {
      const pass = actual === expected;
      const text = mark(pass) + " 期望 " + JSON.stringify(expected) +
                   "，实际 " + JSON.stringify(actual);
      if (pass) { console.log(text); } else { console.error(text); }
      return pass;
    },
  };
}
function mark(ok) { return ok ? "✓ 通过" : "✗ 失败"; }

// ② 被测函数：把标题转成 URL 别名 slug
function slugify(title) {
  return title.trim().toLowerCase().replace(/\\s+/g, "-");
}

// ③ 三条测试用例（第三条期望值故意写错）
expect(slugify("Hello World")).toBe("hello-world");
expect(slugify("  React 入门  ")).toBe("react-入门");
expect(slugify("A B")).toBe("a-b-c");`}
        caption="这十几行已经是一个真实测试框架的雏形：断言 → 输出 ✓/✗ → 人来看报告。"
      />

      <h2>该测哪些用例？专挑「容易坏」的地方下手</h2>
      <ul>
        <li><b>正常路径</b>：最常见的输入，保证主流程通。</li>
        <li><Term en="Boundary">边界情况</Term>：空字符串、0、负数、<code>null</code>、超长文本——bug 最爱藏在拐角处。</li>
        <li><b>失败路径</b>：接口挂了、输入非法时，代码是否优雅降级而不是崩溃。</li>
      </ul>
      <Callout variant="deep" title="测试不是覆盖率竞赛，是给自己买保险">
        新手常问「要测多少才算够」。但覆盖率数字漂亮不等于安全——真正衡量标准是：
        <b>三个月后你大改这段代码时，敢不敢只按一次「运行全部测试」就放心上线？</b>
        每条测试都是一份保单：平时感觉不到它，出事时它替你挡住回归
        （Regression，改好一处、弄坏另一处的事故）。所以别为凑数写测试，
        为「我最怕哪里被改坏」写测试。
      </Callout>

      <Quiz
        questions={[
          {
            q: "一条断言显示红叉时，最有价值的信息是什么？",
            options: [
              "测试执行用了多少毫秒",
              "期望值与实际值的对比",
              "测试文件的名字",
              "项目里一共有多少条测试"],
            answer: 1,
            explain:
              "断言的价值在于精确暴露「我以为 vs 实际是」的差异，这个差值几乎总是直接指向 bug 的位置。",
          },
          {
            q: "下面哪一组输入最值得优先写成测试用例？",
            options: [
              "页面背景色是不是紫色",
              "注释里的错别字",
              "边界情况：空字符串、0、null、超长文本",
              "随机挑几行代码意思一下"],
            answer: 2,
            explain:
              "测试应该保护最容易坏的地方。边界输入是 bug 高发区；而视觉样式更适合人工检查或截图对比，注释则轮不到测试来管。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "<b>断言</b> = 把「我觉得没问题」变成程序可判定的一句话：<code>expect(实际).toBe(期望)</code>。",
          "红叉比绿勾有价值：它直接给出<b>期望与实际的差值</b>。",
          "一个迷你测试器只需三步：断言 → 输出 ✓/✗ → 人看报告；专业框架只是把它做得更豪华。",
          "优先测三类：<b>正常路径、边界情况、失败路径</b>。",
          "测试的本质是<b>保险</b>：为将来最怕被改坏的地方投保，而不是为了覆盖率数字。",
        ]}
      />
    </>
  );
}
