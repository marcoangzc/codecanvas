import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import WebJourney from "@/components/interactives/WebJourney";

export default function Lesson() {
  return (
    <>
      <p>
        模块 1 的第一课，我们坐观光车看过一遍「网页诞生之旅」。当时隔着毛玻璃，
        你只知道「浏览器发请求、服务器回响应」。今天我们把引擎盖掀开：
        HTTP 这套对话规矩，每个字到底长什么样？
      </p>
      <p>先热身：把这趟旅程再走一遍。这次请边走边记笔记——每一站我们都将拆开细看。</p>
      <WebJourney />

      <h2>拆一封请求：Request 的三个部分</h2>
      <p>
        浏览器发出的每一次请求，都是一封格式严格的信。以「往留言板发一条留言」为例，
        它的真实模样（简化后）长这样：
      </p>
      <pre className="codeblock">{`POST /api/guestbook HTTP/1.1          ← 请求行 Request Line
Host: codecanvas.dev                  ← 从这行往下都是请求头 Headers
Content-Type: application/json        ← 「我带的正文是 JSON」
Content-Length: 39                    ← 正文的字节数

{"name":"王小码","text":"打卡！"}       ← 请求体 Body（空行之后才是它）`}</pre>
      <ul>
        <li>
          <Term en="Request Line">请求行</Term>：第一行，三段式——
          方法（<code>POST</code>）+ 路径（<code>/api/guestbook</code>）+ 协议版本。
          一句话说明白「想干什么、对谁干」。
        </li>
        <li>
          <Term en="Headers">请求头</Term>：一行一条的「元信息」，帮服务器理解这封信：
          发给哪个域名、正文是什么格式、用户用什么浏览器……
        </li>
        <li>
          <Term en="Body">请求体</Term>：真正携带的数据。<b>只有 POST / PUT 这类「带货」的请求才有</b>；
          GET 请求一般不带东西，参数写在 URL 上。
        </li>
      </ul>

      <Callout variant="tip" title="请求头里藏着一位重要乘客">
        浏览器每次都会自动把 <code>Cookie</code> 塞进请求头发给同域的服务器——
        这是实现「保持登录状态」的关键道具，本模块第 5 课它会正式登场。
      </Callout>

      <h2>拆一封响应：Response 长得几乎一样</h2>
      <pre className="codeblock">{`HTTP/1.1 201 Created                  ← 状态行 Status Line
Content-Type: application/json

{"ok":true,"message":{"id":42,"name":"王小码",…}}   ← 响应体 Body`}</pre>
      <p>
        结构与请求对称：<b>状态行 + 响应头 + 响应体</b>。
        状态行里的数字就是模块 1 见过的<Term en="Status Code">状态码</Term>，
        后面跟一句人话短语（<code>201 Created</code>）。这次不是笼统的「成功」，
        而是<b>精确地告诉你：新建了一条留言，编号 42</b>。
      </p>

      <h2>状态码家族：一眼判断该谁背锅</h2>
      <p>
        状态码上百个，但按百位数分成五个家族，先记住家族就够用：
      </p>

      <div className="my-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900 text-left text-slate-200">
              <th className="px-4 py-2.5 font-semibold">家族</th>
              <th className="px-4 py-2.5 font-semibold">一句话含义</th>
              <th className="px-4 py-2.5 font-semibold">常见成员</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            <tr>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-emerald-300">1xx</td>
              <td className="px-4 py-2.5">💬 收到了，继续说</td>
              <td className="px-4 py-2.5 text-slate-400">101 切换协议（少见，混个脸熟即可）</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-emerald-300">2xx</td>
              <td className="px-4 py-2.5">✅ 成功，事情办妥了</td>
              <td className="px-4 py-2.5"><code>200 OK</code> · <code>201 Created</code> · <code>204 无内容</code></td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-amber-300">3xx</td>
              <td className="px-4 py-2.5">🔀 重定向：去别处找 / 用缓存</td>
              <td className="px-4 py-2.5"><code>301 永久搬家</code> · <code>302 临时去别处</code> · <code>304 用你缓存的</code></td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-rose-300">4xx</td>
              <td className="px-4 py-2.5">❌ 你的错（客户端的问题）</td>
              <td className="px-4 py-2.5"><code>400 参数不对</code> · <code>401 未登录</code> · <code>403 禁止访问</code> · <code>404 不存在</code></td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-rose-300">5xx</td>
              <td className="px-4 py-2.5">💥 我的错（服务器出事了）</td>
              <td className="px-4 py-2.5"><code>500 内部错误</code> · <code>502 网关出错</code> · <code>503 暂时过载</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout variant="warn" title="最容易混的一对：404 vs 500">
        记忆口诀——<b>4xx 是「你的错」，5xx 是「我的错」</b>（服务器自称「我」）。
        地址拼错了收到 404，锅在客户端；服务器代码崩了返回 500，锅在后端程序员。
        另外别用 200 谎报军情：出了错却返回 200，前端和爬虫都会被误导，错误就该大声说出来。
      </Callout>

      <Quiz
        questions={[
          {
            q: "你在自己博客点开一篇文章，页面报了 500。问题最可能出在哪？",
            options: [
              "读者输错了网址",
              "文章已被删除",
              "服务器程序内部出错",
              "浏览器缓存太多"],
            answer: 2,
            explain:
              "500 = Internal Server Error，属于 5xx 家族——「我的错」，是服务器代码崩了或配置出问题。网址错应该是 404。",
          },
          {
            q: "用户请求了一篇不存在的文章地址，正确的回应是什么？",
            options: [
              "返回 200 并显示空白页，免得吓到用户",
              "返回 404，明确告知资源不存在",
              "返回 500 让程序员背锅",
              "返回 302 强制跳回首页"],
            answer: 1,
            explain:
              "404 的语义就是「这个资源不存在」。用 200 掩盖错误会让前端和搜索引擎误判；302 重定向则让用户永远不知道自己点开了坏链接，也不诚实。",
          },
          {
            q: '「我发送的正文是 JSON 格式」这条信息，应该写在哪里？',
            options: ["请求行的路径里", "请求头 Content-Type 里", "URL 的查询参数里", "响应体里"],
            answer: 1,
            explain:
              "描述「这封信用什么格式写的」属于元信息，归请求头管：Content-Type: application/json。正文本身才放在 Body 里。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "请求 = <b>请求行（方法 + 路径 + 版本）+ 请求头 + 请求体</b>；GET 一般无体。",
          "响应结构对称：<b>状态行 + 响应头 + 响应体</b>。",
          "<code>Content-Type</code> 声明正文的格式（如 JSON），是双方正确解读数据的前提。",
          "状态码按家族记忆：<b>2xx 成功 · 3xx 重定向 · 4xx 你的错 · 5xx 我的错</b>。",
          "常见成员：200 OK / 201 Created / 301 重定向 / 400 参数错 / 401 未登录 / 404 不存在 / 500 内部错误。",
        ]}
      />
    </>
  );
}
