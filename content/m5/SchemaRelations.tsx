import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";

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

type MiniRow = { cells: [string, string]; tone?: string };

/** 固定行高的迷你表卡片（header 36px、行高 24px，方便与旁边 SVG 连线精确对齐） */
function MiniTable({ name, rows }: { name: string; rows: MiniRow[] }) {
  return (
    <div className="w-[190px] overflow-hidden rounded-xl border border-slate-700">
      <div className="flex h-9 items-center justify-center bg-slate-800 font-mono text-xs font-bold text-white">
        {name}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex h-6 items-center gap-2 border-t border-slate-800 bg-slate-900/80 px-3 font-mono text-[11px]"
        >
          <span className={r.tone ?? "text-slate-300"}>{r.cells[0]}</span>
          <span className="ml-auto text-slate-500">{r.cells[1]}</span>
        </div>
      ))}
    </div>
  );
}

/** 一对多连线图：左表 1 行 ↔ 右表多行 */
function OneToManyDiagram() {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mx-auto flex min-w-[540px] items-start justify-center gap-1">
        <MiniTable
          name="books"
          rows={[
            { cells: ["1 · 活着", "pk"], tone: "text-fuchsia-300" },
            { cells: ["2 · 三体", "pk"], tone: "text-sky-300" },
            { cells: ["3 · 骆驼祥子", "pk"], tone: "text-amber-300" },
          ]}
        />
        <svg viewBox="0 0 150 132" className="h-[132px] w-[150px] shrink-0" aria-hidden="true">
          <line x1="0" y1="48" x2="150" y2="48" stroke="#e879f9" strokeWidth="1.5" />
          <line x1="0" y1="48" x2="150" y2="96" stroke="#e879f9" strokeWidth="1.5" />
          <line x1="0" y1="72" x2="150" y2="72" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="0" y1="96" x2="150" y2="120" stroke="#fbbf24" strokeWidth="1.5" />
          {[48, 72, 96].map((y) => (
            <circle key={`l${y}`} cx="2" cy={y} r="3" fill="#a78bfa" />
          ))}
          {[48, 72, 96, 120].map((y) => (
            <circle key={`r${y}`} cx="148" cy={y} r="3" fill="#94a3b8" />
          ))}
        </svg>
        <MiniTable
          name="borrow_logs"
          rows={[
            { cells: ["#1 book_id=1", "小林"], tone: "text-fuchsia-300" },
            { cells: ["#2 book_id=2", "阿黄"], tone: "text-sky-300" },
            { cells: ["#3 book_id=1", "老周"], tone: "text-fuchsia-300" },
            { cells: ["#4 book_id=3", "小美"], tone: "text-amber-300" },
          ]}
        />
      </div>
      <div className="mt-4 text-center text-xs leading-5 text-slate-400">
        左边一行 ↔ 右边多行：《活着》被借过两次，两条记录都指向同一个 id —— 这就是<Term en="One-to-Many">一对多</Term>
      </div>
    </div>
  );
}

const RELATIONS = [
  {
    icon: "👤",
    zh: "一对一",
    en: "One-to-One",
    eg: "users ↔ user_profiles",
    desc: "一行只对一行。常用来把不常用的大字段拆去「详情表」，让主表保持轻快。",
  },
  {
    icon: "📚",
    zh: "一对多",
    en: "One-to-Many",
    eg: "books ↔ borrow_logs",
    desc: "最常见的关系。规则很简单：外键放在「多」的那一侧。",
  },
  {
    icon: "🎓",
    zh: "多对多",
    en: "Many-to-Many",
    eg: "students ↔ courses",
    desc: "学生选多门课、课上有多个学生。需要第三张中间表牵线，比如选课表。",
  },
];

export default function Lesson() {
  return (
    <>
      <p>
        上一课我们只盯着一张 books 表自娱自乐，但真实应用的数据从来不是孤岛：
        书要被借阅，借阅要有记录，读者还有自己的档案。这一课学两样设计数据库的基本功——
        <Term en="Primary Key">主键</Term>和<Term en="Foreign Key">外键</Term>，
        从此你设计的表结构不再返工。
      </p>

      <h2>主键：每一行的身份证号</h2>
      <p>
        再看一眼我们的 books 表。注意第一列 id：它是这张表的
        <Term en="Primary Key">主键</Term>——专门用来标识「这一行就是这一行」的编号。
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
        <li><b>唯一</b>：两本书可以同名，但 id 绝不允许重复。</li>
        <li><b>非空</b>：每行都必须有，出生即配发，终生不改。</li>
        <li>
          <b>有用</b>：<code>UPDATE books SET stock = 7 WHERE id = 4;</code> 靠它才能精确命中某一行，
          而不是误伤一堆重名的书。
        </li>
      </ul>

      <h2>外键：为什么借阅记录是另一张表</h2>
      <p>
        现在要记录「谁在什么时候借走了哪本书」。新手的直觉往往是往 books 里加几列硬塞，
        我们先看看这个反面教材：
      </p>
      <DbTable
        headers={["id", "title", "borrowers", "borrowed_at"]}
        rows={[
          ["1", "活着", "小林、老周", "08-01、08-05"],
          ["2", "三体", "阿黄", "08-03"],
          ["3", "骆驼祥子", "", ""],
        ]}
      />
      <ul>
        <li>一格塞多个名字，「小林借过哪些书」这种查询立刻变成文本处理的噩梦；</li>
        <li>同一本书被借两次，时间和人名挤在一个格子里，越攒越乱；</li>
        <li>没人借的书整列空白；书的信息一旦修改，所有塞过它的格子都得跟着改。</li>
      </ul>
      <p>
        正确的思路：<b>借阅是一个独立的事实</b>，它有自己的属性（谁借的、什么时候借的），
        所以它值得拥有自己的一张表。书的信息只在 books 里存<b>一份</b>，
        借阅记录只存一个指向它的编号——这个编号就是<Term en="Foreign Key">外键</Term>：
      </p>
      <DbTable
        headers={["id", "book_id", "borrower", "borrowed_at"]}
        rows={[
          ["1", "1", "小林", "2026-08-01"],
          ["2", "2", "阿黄", "2026-08-03"],
          ["3", "1", "老周", "2026-08-05"],
          ["4", "3", "小美", "2026-08-07"],
          ["5", "2", "大鹏", "2026-08-10"],
        ]}
      />
      <Callout variant="tip" title="规范化的直觉：一类事实，只说一遍">
        这个原则叫<Term en="Normalization">规范化</Term>，听起来吓人，直觉却很朴素：
        <b>每类事实只在一张表里存放，其他地方只用编号引用它。</b>
        想把两边的完整故事拼起来看？用一句 JOIN 就够：
        <code>SELECT borrower, title FROM borrow_logs JOIN books ON borrow_logs.book_id = books.id;</code>
        ——「把 book_id 对得上号的那些书，连同借阅人一起端上来」。
      </Callout>

      <h2>三种关系：一对一、一对多、多对多</h2>
      <p>表和表之间的关联，翻来覆去就三种形状。先用连线图看清我们图书馆里的一对多：</p>
      <OneToManyDiagram />
      <div className="my-6 grid gap-4 md:grid-cols-3">
        {RELATIONS.map((r) => (
          <div key={r.en} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-1 text-2xl">{r.icon}</div>
            <div className="font-bold text-white">
              {r.zh}
              <span className="term-en">{r.en}</span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-fuchsia-300/90">{r.eg}</div>
            <div className="mt-2 text-sm leading-6 text-slate-400">{r.desc}</div>
          </div>
        ))}
      </div>
      <p>
        彩蛋：细心的你可能发现了——一个读者能借多本书，一本书能被多个读者借过，
        这明明是多对多！没错，<b>borrow_logs 其实就是读者与书之间的那张中间表</b>：
        它一边牵着 reader，一边牵着 book，顺便把「什么时候借的」这件事实也记了下来。
      </p>

      <Quiz
        questions={[
          {
            q: "borrow_logs 表里的 book_id 这一列是什么？",
            options: [
              "borrow_logs 自己的主键",
              "引用 books.id 的外键，用来把记录和书连起来",
              "借阅人的会员卡号",
              "随手填的备注数字"],
            answer: 1,
            explain:
              "book_id 存的是 books 表某一行的主键值，所以叫外键。borrow_logs 自己的主键是 id 这一列。",
          },
          {
            q: "「一个读者可以借多本书，一本书可以被多个读者借过」属于哪种关系？",
            options: ["一对一", "一对多", "多对多", "这两者没有关系"],
            answer: 2,
            explain:
              "两边都是「多」，必须靠第三张中间表（如 borrow_logs）拆解成两个一对多来存储。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "<b>主键 Primary Key</b>：一行的身份证号，唯一、非空、不变；UPDATE/DELETE 靠它精确命中。",
          "<b>外键 Foreign Key</b>：「多」的一侧存放「一」侧的主键，两张表就此相连。",
          "借阅记录独立成表的直觉：<b>一类事实一张表</b>，其余地方只用编号引用，数据不重复。",
          "三种关系：一对一拆详情表 · 一对多加外键 · 多对多造一张中间表。",
        ]}
      />
    </>
  );
}
