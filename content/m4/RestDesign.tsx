import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";

export default function Lesson() {
  return (
    <>
      <p>
        上一课你已经会写接口了——但会写和写得好是两回事。想象接手一个项目，
        接口叫 <code>/api/getMsg2</code>、<code>/api/del</code>、<code>/api/doIt</code>……
        是不是想立刻提桶跑路？<Term en="Representational State Transfer">RESTful</Term> 就是业界约定的一套「起名礼貌」，
        让人看一眼 URL 和方法，就知道这个接口在干什么。
      </p>

      <h2>URL 是名词，不是动词</h2>
      <p>
        核心思想只有一句：<b>URL 用来定位「资源」（名词），动作由 HTTP 方法来表达</b>。
        既然方法已经说了「干什么」，URL 里就不必再写 get、create、delete。
      </p>
      <div className="my-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900 text-left text-slate-200">
              <th className="px-4 py-2.5 font-semibold">❌ 常见写法</th>
              <th className="px-4 py-2.5 font-semibold">✅ 更 RESTful</th>
              <th className="px-4 py-2.5 font-semibold">为什么</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono text-[13px] text-slate-300">
            <tr>
              <td className="px-4 py-2.5 text-rose-300">GET /api/getMessages</td>
              <td className="px-4 py-2.5 text-emerald-300">GET /api/messages</td>
              <td className="px-4 py-2.5 font-sans text-slate-400">GET 已含「取」的意思，URL 只留名词</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-rose-300">POST /api/createMessage</td>
              <td className="px-4 py-2.5 text-emerald-300">POST /api/messages</td>
              <td className="px-4 py-2.5 font-sans text-slate-400">对同一资源，POST 就是「新建一个」</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-rose-300">GET /api/delete?id=3</td>
              <td className="px-4 py-2.5 text-emerald-300">DELETE /api/messages/3</td>
              <td className="px-4 py-2.5 font-sans text-slate-400">删除不该用 GET；编号放路径里</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-rose-300">POST /api/updateUserName</td>
              <td className="px-4 py-2.5 text-emerald-300">PUT /api/users/7</td>
              <td className="px-4 py-2.5 font-sans text-slate-400">改谁？路径说清楚；方法说改</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Callout variant="tip" title="用本站接口对照一下">
        留言板资源是「留言们」——复数名词 <code>messages</code>，所以接口是
        <code>/api/guestbook</code>：GET 拿列表、POST 加一条。没有出现任何动词，
        却把「查」和「增」都安排得明明白白。
      </Callout>

      <h2>方法即动作：一套方法覆盖增删改查</h2>
      <p>
        四个最常用的方法，正好对应数据的四种基本操作，合称
        <Term en="CRUD">增删改查</Term>（Create / Read / Update / Delete）：
      </p>
      <div className="my-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900 text-left text-slate-200">
              <th className="px-4 py-2.5 font-semibold">方法</th>
              <th className="px-4 py-2.5 font-semibold">动作</th>
              <th className="px-4 py-2.5 font-semibold">例子</th>
              <th className="px-4 py-2.5 font-semibold">典型成功状态码</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            <tr>
              <td className="px-4 py-2.5 font-mono text-emerald-300">GET</td>
              <td className="px-4 py-2.5">📖 查 Read</td>
              <td className="px-4 py-2.5 font-mono text-[13px]">GET /api/guestbook</td>
              <td className="px-4 py-2.5 font-mono">200</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-sky-300">POST</td>
              <td className="px-4 py-2.5">➕ 增 Create</td>
              <td className="px-4 py-2.5 font-mono text-[13px]">POST /api/guestbook</td>
              <td className="px-4 py-2.5 font-mono">201</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-amber-300">PUT</td>
              <td className="px-4 py-2.5">✏️ 改 Update</td>
              <td className="px-4 py-2.5 font-mono text-[13px]">PUT /api/messages/3</td>
              <td className="px-4 py-2.5 font-mono">200（或 204）</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-rose-300">DELETE</td>
              <td className="px-4 py-2.5">🗑️ 删 Delete</td>
              <td className="px-4 py-2.5 font-mono text-[13px]">DELETE /api/messages/3</td>
              <td className="px-4 py-2.5 font-mono">200（或 204）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        顺带记住一个安全红线：<b>改变数据的操作永远不要用 GET</b>。
        GET 会被浏览器预加载、被爬虫顺路访问、被转发链接触发——
        想象搜索引擎爬虫「顺手」删光了你的数据库。
      </p>

      <h2>状态码也要说准确的话</h2>
      <ul>
        <li>新建资源成功 → <code>201 Created</code>，别偷懒一律 200；语义准确，前端才能区分「查到了」和「新建了」。</li>
        <li>成功但无需返回内容（如删除）→ <code>204 No Content</code>。</li>
        <li>参数不合法 → <code>400</code>；没登录 → <code>401</code>；登录了但没权限 → <code>403</code>；资源不存在 → <code>404</code>。</li>
      </ul>
      <p>
        状态码是前后端之间的<b>契约</b>：前端靠它决定下一步——201 就刷新列表、
        400 就提示用户改输入、401 就跳登录页。含糊的状态码会让联调变成猜谜。
      </p>

      <Callout variant="deep" title="REST 是风格，不是法律">
        REST 不是协议也没有强制检查器，业界也有 GraphQL、RPC 等别的流派。
        但对初学者和小团队来说，遵循 REST 约定收益最大：
        任何人接手你的项目，看 URL 就能猜到接口怎么用——这就是「约定优于配置」的价值。
      </Callout>

      <Quiz
        questions={[
          {
            q: "获取留言列表，哪个设计更 RESTful？",
            options: ["GET /api/getMessages", "GET /api/messages", "POST /api/messages/list", "GET /api/message/getAll"],
            answer: 1,
            explain:
              "URL 只留名词（复数 resources），「取」的动作由 GET 表达。/api/getMessages 把动词写进了 URL，属于重复表达。",
          },
          {
            q: "删除编号为 3 的留言，哪个设计更好？",
            options: [
              "GET /api/deleteMessage?id=3",
              "POST /api/messages/delete/3",
              "DELETE /api/messages/3",
              "GET /api/messages/3?do=delete"],
            answer: 2,
            explain:
              "动作交给 DELETE 方法，资源编号放路径。用 GET 执行删除尤其危险：预加载、爬虫、链接预览都可能误触它。",
          },
          {
            q: "POST /api/guestbook 成功创建了一条留言，最准确的状态码是？",
            options: ["200 OK", "201 Created", "204 No Content", "302 Found"],
            answer: 1,
            explain:
              "201 = Created，专指「新资源创建成功」。200 只说「成功」，204 表示成功但无内容，302 是重定向——都不如 201 精确。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "URL 定位资源，用<b>复数名词</b>：<code>/api/messages</code>；动词交给 HTTP 方法。",
          "CRUD 对照：<b>GET 查 / POST 增 / PUT 改 / DELETE 删</b>；编号放路径 <code>/api/messages/3</code>。",
          "写操作永远别用 GET——预加载与爬虫可能误触。",
          "状态码要说准话：创建 <b>201</b>、无内容 <b>204</b>、参数错 <b>400</b>、未登录 <b>401</b>、无权限 <b>403</b>。",
          "状态码是前后端契约，前端靠它决定下一步动作。",
        ]}
      />
    </>
  );
}
