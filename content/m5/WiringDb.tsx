import Link from "next/link";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import Term from "@/components/Term";

/** 编号步骤卡片：标题 + 富文本说明（复用 KeyPoints 的 HTML 注入模式）+ 可选代码块 */
function StepCard({ n, title, html, code }: { n: number; title: string; html?: string; code?: string }) {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/30">
        {n}
      </span>
      <div className="min-w-0">
        <div className="mb-1 font-bold text-white">{title}</div>
        {html && (
          <div
            className="text-sm leading-6 text-slate-300 [&_b]:font-semibold [&_b]:text-white [&_code]:mx-0.5"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
        {code && <pre className="codeblock mt-3 mb-0">{code}</pre>}
      </div>
    </div>
  );
}

export default function Lesson() {
  return (
    <>
      <p>
        现在四块拼图都齐了：<Link href="/learn/m1/how-web-works" className="text-fuchsia-400 underline decoration-dotted underline-offset-4 hover:text-fuchsia-300">第 1 模块</Link>里
        一个请求从浏览器出发的旅程、模块 4 里你亲手写过的接口、
        以及本模块的<Term en="Database">数据库</Term>和<Term en="ORM">对象关系映射</Term>。
        这一课把它们接成一条完整的路。场景还是那个图书馆：用户点一下「借阅《三体》」按钮，
        跟着这条数据走完它的一生。
      </p>

      <h2>一条数据的六站旅程</h2>
      <div className="my-6 space-y-4">
        <StepCard
          n={1}
          title="🖱️ 用户点击（浏览器）"
          html={`按钮上挂着 React 的 onClick（模块 3），点击后用 fetch 发出请求（模块 4）：向 <code>/api/borrow</code> 发送 POST，请求体是借阅信息。`}
          code={`POST /api/borrow
{ "bookId": 2, "borrower": "小林" }`}
        />

        <StepCard
          n={2}
          title="🔌 API 接口接住请求（服务端）"
          html={`<code>app/api/borrow/route.ts</code> 的 POST 函数被调用。它做的第一件事不是干活，而是<b>检查输入</b>：bookId 是正整数吗？这本书存在吗？库存还有剩吗？`}
        />

        <Callout variant="warn" title="服务端永远不能信任客户端输入">
          任何人都能绕过你的页面，用命令行工具直接向接口发送任意数据——
          前端校验只是体验优化，<b>服务端必须再验一遍</b>才是安全底线。
          这一课的挑战里你也会亲身经历：你的 SQL 会真的被送到服务器逐条核对。
        </Callout>

        <StepCard
          n={3}
          title="⚙️ ORM 生成 SQL"
          html={`校验通过后，接口调用 ORM 方法（上一课学的）：记一笔借阅，再把库存减一。ORM 把它们翻译成两条真正的 SQL，发给数据库。`}
          code={`INSERT INTO borrow_logs (book_id, borrower, borrowed_at)
VALUES (2, '小林', '2026-08-23');

UPDATE books SET stock = stock - 1 WHERE id = 2;`}
        />

        <StepCard
          n={4}
          title="💾 数据库落盘执行"
          html={`books 表里《三体》的 stock 从 3 变成 2；borrow_logs 多出一行。数据从此<b>长期保存</b>——服务器重启、用户关机都不会丢，这正是数据库区别于内存变量的超能力。`}
        />

        <StepCard
          n={5}
          title="↩️ 原路返回"
          html={`数据库返回结果 → ORM 包装成 JS 对象 → 接口打包成 JSON，带着状态码 200 沿同一条 HTTP 路线送回浏览器——第 1 模块那趟旅程的倒放。`}
        />

        <StepCard
          n={6}
          title="🎨 页面重新渲染"
          html={`React 收到响应后更新 state（模块 3），库存数字自动变成 2、「我的借阅」列表多出一条记录——全程没有整页刷新。用户只觉得：嗯，很快。`}
        />
      </div>

      <h2>全景图：三层各司其职</h2>
      <div className="my-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-center font-mono text-xs sm:text-sm">
          <span className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-sky-200">
            前端 React（看见）
          </span>
          <span className="text-slate-500">⇄ HTTP · JSON ⇄</span>
          <span className="rounded-lg border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-1.5 text-fuchsia-200">
            后端 API + ORM（中转）
          </span>
          <span className="text-slate-500">⇄ SQL ⇄</span>
          <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-emerald-200">
            数据库（记住）
          </span>
        </div>
        <div className="mt-4 text-center text-xs leading-5 text-slate-400">
          读操作同样六站，只是中间换成 SELECT；写操作（INSERT / UPDATE / DELETE）才真正改动数据。
        </div>
      </div>

      <Callout variant="tip" title="一个词记住分工">
        前端负责「看见」，后端负责「中转与把关」，数据库负责「记住」。
        面试官问「讲讲前后端怎么配合」，把这六站讲一遍就是满分答案的开头。
      </Callout>

      <Quiz
        questions={[
          {
            q: "前端已经校验过表单了，服务端为什么还要再校验一遍？",
            options: [
              "为了让代码看起来更专业",
              "因为任何人都能绕过页面、直接向接口发送任意数据",
              "前端校验太慢，会拖累页面",
              "数据库规定所有输入必须是中文"],
            answer: 1,
            explain:
              "curl、Postman 都能绕过浏览器直接打接口。前端校验管体验，服务端校验管安全，两者缺一不可。",
          },
          {
            q: "用户点击「借阅」后，数据库里的库存真正被改变发生在哪一步？",
            options: [
              "点击按钮的一瞬间",
              "API 处理请求、SQL 在数据库执行之后",
              "页面重新渲染完成之后",
              "服务器每天定时结算时"],
            answer: 1,
            explain:
              "点击只是发出请求。只有当服务端校验通过、UPDATE 语句在数据库执行成功，数据才真正改变。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "六站旅程：<b>点击 → API → ORM/SQL → 数据库 → 原路返回 → 渲染</b>。",
          "这趟旅程 = 第 1 模块的 HTTP + 第 4 模块的 API + 本模块的数据库，三段路合成一条。",
          "<b>服务端永远不能信任客户端输入</b>：前端校验管体验，服务端校验管底线。",
          "分工口诀：前端「看见」、后端「中转把关」、数据库「记住」。",
        ]}
      />
    </>
  );
}
