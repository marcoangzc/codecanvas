import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        真实应用里的数据从来不是孤零零一个数字——微信的聊天记录、淘宝的商品列表、
        你正在学的课程大纲。它们都有两种基本形态：<Term en="Array">数组</Term>是清单，
        <Term en="Object">对象</Term>是档案卡。
      </p>

      <h2>数组：有序清单</h2>
      <pre className="codeblock">{`const fruits = ["苹果", "香蕉", "橘子"];   // 方括号 + 逗号

fruits[0]        // → "苹果"   ⚠️ 序号从 0 开始！
fruits.length    // → 3        个数
fruits.push("葡萄");  // 尾部加一个，length 变 4
fruits.pop();         // 尾部拿走一个，返回被拿走的`}</pre>
      <Callout variant="warn" title="从 0 开始数">
        第一项是 <code>[0]</code> 不是 <code>[1]</code>——几乎所有编程语言都这么数。
        「第 n 个」永远是 <code>[n-1]</code>，这个别扭感一周就习惯，但写错一次程序就崩，值得现在刻进 DNA。
      </Callout>
      <p>数组真正的杀手锏是几个「一句话加工整张清单」的方法：</p>
      <pre className="codeblock">{`const nums = [1, 2, 3, 4];

nums.map(n => n * 10);       // [10, 20, 30, 40]  每个都加工，返回新数组
nums.filter(n => n % 2 === 0); // [2, 4]          挑出满足条件的
nums.find(n => n > 2);         // 3               找第一个满足的（单个值）`}</pre>
      <p>
        <code>map</code> 和 <code>filter</code> 都<b>不改原数组</b>，而是返回新数组——
        这种风格叫不可变（immutable），React 会重度依赖它。
      </p>

      <h2>对象：一张档案卡</h2>
      <pre className="codeblock">{`const student = {
  name: "小码",     // 键: 值
  age: 18,
  isLearningJs: true,
};

student.name            // → "小码"   点号访问
student["name"]         // 同样效果，方括号里能放变量
student.age = 19;       // 改属性
student.city = "杭州";  // 加新属性，随写随有`}</pre>

      <h2>合体：对象数组 = 真实应用的数据形态</h2>
      <pre className="codeblock">{`const todos = [
  { text: "学完变量", done: true },
  { text: "写出第一个函数", done: false },
  { text: "做出待办清单", done: false },   // 结课挑战就是它！
];

const unfinished = todos.filter(t => !t.done);
unfinished.forEach(t => console.log("待办：", t.text));`}</pre>
      <Callout variant="deep" title="你在预览真实世界">
        打开任何 App 的接口数据，十有八九长这样：<code>{"[{ … }, { … }, { … }]"}</code>。
        第 4 模块你会亲手从服务器拿到这种结构；第 3 模块 React 的核心工作就是把它们画上屏幕。
      </Callout>

      <h2>动手：管理一份朋友名单</h2>
      <CodePlayground
        tasks={[
          "console.log 出所有人的名字（提示：map）",
          "挑出所有会 JS 的朋友（filter）",
          "找到第一个在杭州的朋友（find），打印他/她的全部信息",
          "给每个人加上一行新属性 level: \"青铜\"（map 返回新数组，别改原来的）",
        ]}
        initialJs={`const friends = [
  { name: "阿花", city: "杭州", canCode: true },
  { name: "大壮", city: "上海", canCode: false },
  { name: "小美", city: "杭州", canCode: true },
];

// 👇 在下面写你的 map / filter / find 实验`}
        caption="箭头函数在这里火力全开：n => n * 10 读作「给我一个 n，还你 n × 10」。读熟这个句式，后面所有课程都靠它。"
      />

      <Quiz
        questions={[
          {
            q: 'const arr = ["a", "b", "c"]; arr[1] 是什么？',
            options: ['"a"', '"b"', '"c"', "undefined"],
            answer: 1,
            explain: "索引从 0 开始：[0] 是 \"a\"，[1] 是 \"b\"。「第二个」的下标是 1。",
          },
          {
            q: "[1, 2, 3].map(n => n + 1) 之后，原数组变成？",
            options: ["[2, 3, 4]", "仍是 [1, 2, 3]", "[1, 2, 3, 4]", "报错"],
            answer: 1,
            explain: "map/filter 都不动原数组，只返回新数组。想要新结果要接住它：const newArr = …",
          },
        ]}
      />

      <KeyPoints
        points={[
          "数组是有序清单：<code>[0]</code> 起步、<code>length</code> 数个数、<code>push/pop</code> 进出口。",
          "<code>map</code> 逐个加工、<code>filter</code> 按条件挑选、<code>find</code> 找第一个——都返回新数组/新值。",
          "对象是档案卡：键值对、点号访问、随时增改。",
          "真实应用数据 = 对象数组；filter/map 组合是日常主力。",
          "不可变风格：造新的，不砸旧的——React 前哨战。",
        ]}
      />
    </>
  );
}
