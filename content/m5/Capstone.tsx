import Link from "next/link";
import Callout from "@/components/Callout";
import Challenge from "@/components/Challenge";
import { getChecksForLesson } from "@/lib/checks";

const STARTER = `-- ============================================================
-- 📚 结课挑战：图书馆查询系统
-- 数据库里有两张表：
--   books       (id, title, author, year, stock)
--   borrow_logs (id, book_id, borrower, borrowed_at)
-- 下面每个任务写一条 SQL，逐个击破！
-- 提示：关键字大写 · 字符串用单引号 · 每条语句以分号结尾
-- ============================================================

-- 任务 1（已示范）：查看所有书目
SELECT * FROM books;

-- 任务 2：只查书名和作者这两列（实际项目别动不动就取全部列）


-- 任务 3：找出 1980 年以后出版的书，按出版年份从新到旧排列


-- 任务 4：把借阅记录和对上号的书名一起查出来
-- 思路：FROM borrow_logs，再用 JOIN … ON … 连上 books


-- 任务 5：《城南旧事》到货入库！把它插入 books 表


-- 任务 6：有人借走了《三体》(id = 2)，把它的库存从 3 改成 2


-- 任务 7：《骆驼祥子》(id = 3) 破损下架，删除这条书目
-- ⚠️ 动手前先想清楚过滤条件，不然会清空整张表！`;

/** 深色小表格：表头 bg-slate-800，行 hover 高亮 */
function DbTable({ headers, rows, minW = "480px" }: { headers: string[]; rows: string[][]; minW?: string }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-left font-mono text-xs" style={{ minWidth: minW }}>
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
  const checks = getChecksForLesson("m5/capstone") ?? [];

  return (
    <>
      <p>
        恭喜来到模块 5 的最后一课！🎉 五节课里，你认识了表格的世界观、学会了主键外键的建模直觉、
        见识了文档数据库、拆开了 ORM 的魔术盒、还跟着一条数据走完了全栈旅程。
        现在，请你走马上任，当一次图书馆的管理员：对着 books 和 borrow_logs 两张表，
        写出<b>增查改删</b>全套 SQL。
      </p>

      <h2>先认识你要操作的数据库</h2>
      <p>books 表存书目，五个字段各司其职：</p>
      <DbTable
        headers={["列名", "类型", "含义"]}
        rows={[
          ["id", "INTEGER", "书目编号 · 主键，绝不重复"],
          ["title", "TEXT", "书名"],
          ["author", "TEXT", "作者"],
          ["year", "INTEGER", "出版年份"],
          ["stock", "INTEGER", "在馆数量"],
        ]}
      />
      <p>borrow_logs 表存借阅记录，book_id 是指向 books.id 的外键：</p>
      <DbTable
        headers={["列名", "类型", "含义"]}
        rows={[
          ["id", "INTEGER", "借阅记录编号 · 主键"],
          ["book_id", "INTEGER", "借的是哪本书 → books.id（外键）"],
          ["borrower", "TEXT", "借阅人姓名"],
          ["borrowed_at", "TEXT", "借出日期"],
        ]}
      />
      <p>两张表现在长这样（节选）：</p>
      <div className="my-5 grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 font-mono text-xs font-bold text-white">📚 books</div>
          <DbTable
            minW="340px"
            headers={["id", "title", "author", "year", "stock"]}
            rows={[
              ["1", "活着", "余华", "1993", "5"],
              ["2", "三体", "刘慈欣", "2008", "3"],
              ["3", "骆驼祥子", "老舍", "1936", "0"],
            ]}
          />
        </div>
        <div>
          <div className="mb-2 font-mono text-xs font-bold text-white">📝 borrow_logs</div>
          <DbTable
            minW="340px"
            headers={["id", "book_id", "borrower", "borrowed_at"]}
            rows={[
              ["1", "1", "小林", "2026-08-01"],
              ["2", "2", "阿黄", "2026-08-03"],
              ["3", "1", "老周", "2026-08-05"],
            ]}
          />
        </div>
      </div>

      <Callout variant="tip" title="挑战玩法">
        左侧编辑器里是一份<b>带任务注释的引导稿</b>：任务 1 已示范，剩下六个空位等你补上 SQL。
        右侧清单会<b>实时核对</b>你的进度；全部打勾后点击提交——
        你的代码会真的发送到本站的服务器接口校验，下方能看到这次 HTTP 往返的全过程。
        不需要真的连接数据库：校验器检查的是每条 SQL 的「形状」，就像第 5 课讲的，
        服务端从不信任客户端，逐条验过才放行。
      </Callout>

      {/* 要求清单速览 */}
      <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex items-center gap-2 text-lg font-bold text-white">📋 任务要求</div>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 marker:text-fuchsia-400">
          {checks.map((c) => (
            <li key={c.id} className="text-sm leading-6 text-slate-300">
              {c.label}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          卡住了？每一项都对应一节课：
          SELECT / FROM / WHERE / ORDER BY 见第 1 课 · 主键、外键与 JOIN 见第 2 课 ·
          INSERT / UPDATE / DELETE 也见第 1–2 课 · 这些语句在真实项目里由 ORM 代写，见第 4–5 课。
        </p>
      </div>

      <Challenge lessonId="m5/capstone" starterCode={STARTER} />

      <Callout variant="deep" title="刚才发生了什么？（服务器视角）">
        点击提交时，浏览器向 <code>/api/validate</code> 发送了一个 POST 请求，
        请求体是你的 SQL 文本；服务器的校验程序逐条核对后返回 JSON 结果。
        真实项目里，这条链路的下一站不是校验器而是真数据库：
        接口收到请求 → ORM 生成 SQL → 数据库执行并原路返回——正是上一课那张六站旅程图。
        你今天手写的每一条规则，将来都会以 ORM 方法的形态出现在代码里。
      </Callout>

      <div className="my-10 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-6 text-center">
        <div className="text-3xl">🏁</div>
        <div className="mt-2 text-xl font-bold text-white">完成之后</div>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300 [&_p]:mb-0">
          增查改删全通关，数据的家你既能住也能装修——全栈的最后一块拼图归位了。
          毕业模块 6 在前方等你：<b>需求分析 → 前后端联调 → 测试与质量 → 部署上线 → 作品集打磨</b>，
          最后用一个真实的全栈小应用，为这段旅程收官。
        </p>
        <Link href="/curriculum" className="btn-primary mt-5 px-6 py-2.5">
          查看毕业路线 🗺️
        </Link>
      </div>
    </>
  );
}
