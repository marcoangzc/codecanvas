import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

/** SQL ↔ ORM 对照卡：左边数据库语言，右边你在代码里写的东西 */
function SqlOrmPair({ title, sql, orm }: { title: string; sql: string; orm: string }) {
  return (
    <div className="my-5 overflow-hidden rounded-xl border border-slate-800">
      <div className="border-b border-slate-800 bg-slate-800/60 px-4 py-1.5 text-xs font-semibold text-white">
        {title}
      </div>
      <div className="grid lg:grid-cols-[1fr_auto_1fr]">
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-fuchsia-100/90">{sql}</pre>
        <div className="hidden items-center justify-center px-2 text-lg font-bold text-slate-600 lg:flex">⇄</div>
        <pre className="overflow-x-auto border-t border-slate-800 p-4 font-mono text-xs leading-6 text-sky-100/90 lg:border-t-0 lg:border-l">{orm}</pre>
      </div>
    </div>
  );
}

export default function Lesson() {
  return (
    <>
      <p>
        学完前两课，你可能以为以后写后端就是到处粘贴 SQL 字符串。先看看这段真实项目里
        一不留神就会写出来的代码：
      </p>
      <pre className="codeblock">{`const author = req.query.author;   // ← 直接来自用户的输入
const sql = "SELECT * FROM books WHERE author = '" + author + "'";
db.run(sql);`}</pre>
      <p>
        两颗地雷：一是引号、转义全靠手数，写错就崩；二是用户只要把输入改成
        <code>' OR '1'='1</code>，拼出来的条件永远为真——<b>整张表被拖走</b>。
        这就是大名鼎鼎的<Term en="SQL Injection">SQL 注入</Term>攻击。
        日常开发的解法优雅得多：<Term en="ORM">对象关系映射</Term>。
      </p>

      <h2>用对象和方法说话</h2>
      <p>
        ORM 的思路：<b>把表映射成对象，把 SQL 映射成方法调用</b>。
        你不再拼字符串，而是像调用普通函数一样操作数据库。
        下面四组对照（左边 SQL，右边 TypeScript 里 Prisma 风格的调用），感受一下翻译过程：
      </p>
      <SqlOrmPair
        title="查全部"
        sql={`SELECT * FROM books;`}
        orm={`await db.book.findMany();`}
      />
      <SqlOrmPair
        title="过滤 + 排序 + 选列"
        sql={`SELECT title, author FROM books
WHERE year > 1980
ORDER BY year DESC;`}
        orm={`await db.book.findMany({
  where: { year: { gt: 1980 } },
  orderBy: { year: "desc" },
  select: { title: true, author: true },
});`}
      />
      <SqlOrmPair
        title="新增"
        sql={`INSERT INTO books (title, author, year, stock)
VALUES ('活着', '余华', 1993, 5);`}
        orm={`await db.book.create({
  data: { title: "活着", author: "余华", year: 1993, stock: 5 },
});`}
      />
      <SqlOrmPair
        title="更新"
        sql={`UPDATE books SET stock = stock - 1
WHERE id = 2;`}
        orm={`await db.book.update({
  where: { id: 2 },
  data: { stock: { decrement: 1 } },
});`}
      />
      <p>
        是不是眼熟？第 1 课那张直觉映射表还在生效：<code>where</code> 就是 filter，
        <code>orderBy</code> 就是 sort，<code>select</code> 就是挑字段——
        只是这次由方法参数替你表达。
      </p>

      <h2>亲手拆开一个迷你 ORM 🔬</h2>
      <p>ORM 神秘吗？二十行就能写出它的核心原理——「收下参数，现场拼出等价的数组操作」：</p>
      <CodePlayground
        initialHtml={`<p style="font-family: sans-serif; color: #475569; padding: 16px;">
  调用的是 findMany()，控制台里看它返回了什么 👇
</p>`}
        initialJs={`const BOOKS = [
  { id: 1, title: "活着", year: 1993 },
  { id: 2, title: "三体", year: 2008 },
  { id: 3, title: "骆驼祥子", year: 1936 },
];

// 一个迷你 ORM：findMany 只是把 filter / sort / map 换了个名字
const db = {
  book: {
    findMany(opts) {
      let rows = [...BOOKS];                                   // FROM books
      if (opts?.where?.year?.gt !== undefined)
        rows = rows.filter(b => b.year > opts.where.year.gt);   // WHERE
      if (opts?.orderBy === "desc")
        rows = rows.sort((a, b) => b.year - a.year);            // ORDER BY
      return rows.map(b => ({ title: b.title, year: b.year })); // SELECT 列
    },
  },
};

console.log(
  db.book.findMany({ where: { year: { gt: 1980 } }, orderBy: "desc" })
);`}
        tasks={[
          "把 gt 改成 1990，看看还剩谁",
          "给 findMany 增加一个 asc 升序分支",
          "再调用一次 db.book.findMany({}) 不带任何条件",
        ]}
        caption="你在调方法，它在替你做筛选排序——这就是全部秘密。"
      />

      <Callout variant="deep" title="ORM 底层仍然生成 SQL">
        划重点：ORM 不是新型数据库，也没有绕过 SQL——它只是<b>替你写 SQL</b>。
        调用 findMany() 时，ORM 把参数翻译成一条真正的 SELECT 发给数据库；
        数据库返回结果集后，再把每行包装成对象交还给你。
        所以第 1–2 课的 SQL 功底依然是基本功：出了性能问题时，
        你得看得懂 ORM 最终生成了什么语句。
      </Callout>

      <Quiz
        questions={[
          {
            q: "ORM 到底是什么？",
            options: [
              "一种比 MySQL 更快的新型数据库",
              "一层中间件：把方法调用翻译成 SQL，并把结果包装成对象",
              "浏览器里的缓存机制",
              "用来画表格的前端 UI 组件库"],
            answer: 1,
            explain:
              "ORM 在代码和数据库之间做双向翻译：方法 → SQL 发过去，行数据 → 对象带回来。数据库本身还是原来那个。",
          },
          {
            q: "开头那段拼接字符串的查询，最大的风险是什么？",
            options: [
              "运行速度慢一点",
              "变量名太长不好看",
              "引号易错位，更可能被 SQL 注入攻击拖走整张表",
              "数据库不支持中文作者名"],
            answer: 2,
            explain:
              "拼接字符串让用户的输入直接变成了 SQL 代码的一部分。' OR '1'='1 能让 WHERE 条件永远为真——这就是 SQL 注入。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "手拼 SQL 字符串易错且危险：<b>SQL 注入</b>能让用户输入变成可执行代码。",
          "<b>ORM</b> 把表映射成对象、查询映射成方法：<code>db.book.findMany()</code>。",
          "<b>ORM 底层仍然生成真正的 SQL</b>——它替你写，不是取代数据库。",
          "会 ORM ≠ 不用懂 SQL；第 1–2 课的直觉是读懂一切的基础。",
        ]}
      />
    </>
  );
}
