import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

/** 深色小表格：表头 bg-slate-800，行 hover 高亮 */
function DbTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full min-w-[480px] text-left font-mono text-xs">
        <thead>
          <tr className="bg-slate-800 text-slate-100">
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-800 text-slate-300 hover:bg-slate-800/40">
              {r.map((cell, j) => (
                <td key={j} className="px-3 py-1.5 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Lesson() {
  return (
    <>
      <p>
        模块 4 里你已经能写出收发 JSON 的接口了，但有个尴尬的问题一直没解决：
        数据存哪？存在变量里，服务器一重启就清零；存进文件里，几万条记录一查就卡。
        该请出专门看管数据的软件了——<Term en="Database">数据库</Term>，
        以及和它对话的语言：<Term en="SQL">结构化查询语言</Term>。
      </p>

      <h2>表格的世界观：行与列</h2>
      <p>
        最主流的数据库叫<Term en="Relational Database">关系型数据库</Term>（MySQL、PostgreSQL、
        SQLite 都属于这一家子），它把数据组织成一张张二维的<Term en="Table">表</Term>——
        你在 Excel 里见过的样子。这是本模块反复使用的「小图书馆」的 books 表：
      </p>
      <DbTable
        headers={["id", "title", "author", "year", "stock"]}
        rows={[
          ["1", "活着", "余华", "1993", "5"],
          ["2", "三体", "刘慈欣", "2008", "3"],
          ["3", "骆驼祥子", "老舍", "1936", "0"],
          ["4", "平凡的世界", "路遥", "1986", "7"],
          ["5", "城南旧事", "林海音", "1960", "4"],
        ]}
      />
      <ul>
        <li>
          一<Term en="Row">行</Term>就是一条完整的<Term en="Record">记录</Term>：一行 = 一本书的全部信息。
        </li>
        <li>
          一<Term en="Column">列</Term>是记录的一个<Term en="Field">字段</Term>：整列只装一种类型的数据
          （year 列全是数字，title 列全是文字）。
        </li>
        <li>行列交叉的每个格子，装着这条记录在这个字段上的值。</li>
      </ul>

      <Callout variant="info" title="既然 Excel 也是表格，为什么不直接用 Excel？">
        Excel 是给<b>人</b>用的：一个文件、一次一个人改、几百行就开始卡。
        数据库是给<b>程序</b>用的：同时服务成千上万个用户互不踩脚、百万行数据毫秒级查出结果、
        谁有权限读、谁有权限写都管得清清楚楚。
        你可以把它想象成「开了外挂的 Excel + 全天候值班的图书管理员」。
      </Callout>

      <h2>和表格对话：SELECT 四连招</h2>
      <p>
        SQL 的气质和 CSS 很像：<b>声明式</b>。你只描述「我要什么」，不用写「怎么找」，
        翻山越岭找数据的脏活交给数据库引擎。看这句最常用的查询：
      </p>
      <pre className="codeblock">{`SELECT title, year        ← 要哪些列（* 代表全部列）
FROM books                ← 从哪张表
WHERE year > 1980         ← 只要满足条件的行
ORDER BY year DESC        ← 按 year 倒序排（新→旧）
LIMIT 3;                  ← 只取前 3 条`}</pre>
      <p>数据库收到后返回的结果集长这样：</p>
      <DbTable
        headers={["title", "year"]}
        rows={[
          ["三体", "2008"],
          ["活着", "1993"],
          ["平凡的世界", "1986"],
        ]}
      />
      <p>
        五个关键词各司其职：<code>SELECT</code> 选列、<code>FROM</code> 定表、
        <code>WHERE</code> 过滤行、<code>ORDER BY</code> 排序、<code>LIMIT</code> 截断。
        关键字习惯大写，语句用分号结尾——这是 SQL 社区的着装规范。
      </p>

      <h2>你其实早就会一半了 🧠</h2>
      <p>
        模块 2 学过的数组方法，恰好就是这套 SQL 的 JavaScript 版！对照着看，SQL 一点都不陌生：
      </p>
      <pre className="codeblock">{`FROM books                 ≈  const books = [ ... ]     // 先有这份清单
WHERE year > 1980          ≈  .filter(b => b.year > 1980)
ORDER BY year DESC         ≈  .sort((a, b) => b.year - a.year)
SELECT title, year         ≈  .map(b => ({ title: b.title, year: b.year }))
LIMIT 3                    ≈  .slice(0, 3)`}</pre>
      <p>
        在演练场里亲手跑一遍这五个步骤，感受一下两种语言的同构：
      </p>
      <CodePlayground
        initialHtml={`<p style="font-family: sans-serif; color: #475569; padding: 16px;">
  结果打印在下方控制台 👇 打开 JS 标签页改代码试试
</p>`}
        initialJs={`const books = [
  { id: 1, title: "活着", author: "余华", year: 1993 },
  { id: 2, title: "三体", author: "刘慈欣", year: 2008 },
  { id: 3, title: "骆驼祥子", author: "老舍", year: 1936 },
  { id: 4, title: "平凡的世界", author: "路遥", year: 1986 },
  { id: 5, title: "城南旧事", author: "林海音", year: 1960 },
];

// FROM books —— 先有这份清单
console.log("全表 SELECT *:", books.length, "行");

// WHERE year > 1980
console.log("WHERE 过滤后:", books.filter(b => b.year > 1980).map(b => b.title));

// ORDER BY year DESC + SELECT title + LIMIT 3
const result = books
  .filter(b => b.year > 1980)
  .sort((a, b) => b.year - a.year)
  .map(b => ({ title: b.title, year: b.year }))
  .slice(0, 3);

console.log("最终结果集:", result);`}
        tasks={[
          "把 WHERE 条件改成 year > 1960，看看多出来了谁",
          "把 sort 改成升序 (a.year - b.year)，最老的书排第一了吗？",
          "把 slice(0, 3) 改成 slice(1)，体会 LIMIT 的偏移用法",
        ]}
        caption="数据库引擎内部干的正是这些活儿——只是它用了几十年打磨出来的索引和数据结构，比 JS 快几个数量级。"
      />

      <Quiz
        questions={[
          {
            q: "SELECT * FROM books; 里的 * 是什么意思？",
            options: [
              "返回所有表",
              "返回所有列",
              "返回所有行",
              "任意匹配一个字符"],
            answer: 1,
            explain:
              "* 指「所有列」都要返回，行的去留由有没有 WHERE 决定。想过滤行得靠 WHERE。",
          },
          {
            q: "下面哪句 SQL 相当于 books.filter(b => b.stock === 0)？",
            options: [
              "SELECT * FROM books WHERE stock = 0;",
              "SELECT stock FROM books;",
              "UPDATE books SET stock = 0;",
              "DELETE FROM books WHERE stock = 0;"],
            answer: 0,
            explain:
              "filter 对应 WHERE——按条件筛行。SELECT stock 是挑列（map），UPDATE 和 DELETE 会改动数据，不是查询。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "关系型数据库 = 一堆互相有关联的表 Table；<b>行 Row = 记录</b>，<b>列 Column = 字段</b>。",
          "数据库不是 Excel：并发访问、海量数据、权限控制，都是给程序用的标配。",
          "SQL 是声明式语言：<code>SELECT … FROM … WHERE … ORDER BY … LIMIT;</code>。",
          "直觉映射：WHERE ≈ filter · ORDER BY ≈ sort · SELECT 列 ≈ map 取字段 · LIMIT ≈ slice。",
        ]}
      />
    </>
  );
}
