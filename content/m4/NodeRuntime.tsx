import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";

export default function Lesson() {
  return (
    <>
      <p>
        欢迎进入模块 4！🎉 前三个模块里，你的每一行 JavaScript 都活在浏览器中：
        操纵 DOM、监听点击、渲染组件。但你有没有想过——抢票系统在毫秒间扣票、
        聊天软件实时推送消息、还有<b>你现在正在上的这个课程网站</b>，它们背后的程序是谁在跑？
      </p>
      <p>
        答案可能让你意外：还是 JavaScript。2009 年，有人把 Chrome 浏览器里那个飞快的
        <Term en="V8">V8 引擎</Term>从浏览器里「拆」了出来，装上一个全新的外壳，
        让它能直接在你的操作系统上运行——这就是 <Term en="Node.js">Node.js</Term>。
        同一门语言，从此既管前端，也管后端。
      </p>

      <h2>同一台引擎，两套装备</h2>
      <p>
        准确地说，浏览器和 Node 是两个不同的<Term en="Runtime">运行环境</Term>：
        <b>引擎相同（都是 V8），周边能力不同</b>。就像同一个司机（V8 负责读懂并执行 JS），
        开上不同的车：浏览器这辆车装了「DOM 方向盘」和「alert 喇叭」；
        Node 这辆车则装了「文件系统货箱」和「进程仪表盘」。
      </p>

      <div className="my-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900 text-left text-slate-200">
              <th className="px-4 py-2.5 font-semibold">能力</th>
              <th className="px-4 py-2.5 font-semibold">🌐 浏览器</th>
              <th className="px-4 py-2.5 font-semibold">🛠️ Node.js</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            <tr>
              <td className="px-4 py-2.5">操作页面：<code>document</code>、DOM</td>
              <td className="px-4 py-2.5 text-emerald-400">✅ 主业</td>
              <td className="px-4 py-2.5 text-slate-500">❌ 根本没有页面</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code>alert()</code> 弹窗</td>
              <td className="px-4 py-2.5 text-emerald-400">✅</td>
              <td className="px-4 py-2.5 text-slate-500">❌ 没有 window</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5">读写硬盘文件：<code>fs</code> 模块</td>
              <td className="px-4 py-2.5 text-slate-500">❌ 出于安全禁止</td>
              <td className="px-4 py-2.5 text-emerald-400">✅</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5">进程与环境变量：<code>process</code></td>
              <td className="px-4 py-2.5 text-slate-500">❌</td>
              <td className="px-4 py-2.5 text-emerald-400">✅</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5"><code>console</code> / <code>setTimeout</code> / <code>JSON</code></td>
              <td className="px-4 py-2.5 text-emerald-400">✅</td>
              <td className="px-4 py-2.5 text-emerald-400">✅</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5">发起网络请求：<code>fetch</code></td>
              <td className="px-4 py-2.5 text-emerald-400">✅</td>
              <td className="px-4 py-2.5 text-emerald-400">✅（Node 18 起）</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        重点看最后两行：<b>你在模块 1–3 学的 JavaScript 全部平移过来，一行都不浪费</b>。
        变量、函数、数组、async/await……到了服务器照样好使。
      </p>

      <Callout variant="tip" title="其实你早就用过 Node 了">
        VS Code 本身就是一个跑在 Node 上的应用；<code>npm install</code> 装包靠的是 Node；
        前端项目的热更新、打包构建，背后也都是 Node 进程在干活。
        前端工程师每天都在用 Node，只是一直没人点名介绍而已——今天正式认识一下。
      </Callout>

      <h2>Node 的独门武器</h2>
      <p>
        浏览器出于安全考虑不许网页碰你的硬盘，而 Node 就运行在你自己的电脑（或服务器）上，
        可以光明正大地读写文件——这是它和浏览器最大的分野：
      </p>
      <pre className="codeblock">{`// read-note.js —— 读写硬盘上的文件（浏览器做不到的事）
const fs = require("node:fs");           // 引入内置的文件系统模块

const old = fs.readFileSync("todo.txt", "utf8");
console.log("旧便签：" + old);

fs.writeFileSync("todo.txt", "学完模块 4！");  // 写回硬盘`}</pre>
      <p>
        它还能反过来「当网站」：监听某个端口，等别人的请求上门。下面这五行代码，
        就是一个货真价实的<Term en="Server">服务器</Term>：
      </p>
      <pre className="codeblock">{`// server.js —— 五行代码，起一个网站
const http = require("node:http");

http.createServer((req, res) => {
  res.end("<h1>你好，我是服务器！</h1>");  // 每个进来的请求都收到这句
}).listen(3000);                          // 开始监听 3000 端口`}</pre>

      <h2>写下你的第一行 Node 代码</h2>
      <p>
        在电脑上装好 Node（官网下载安装包，一路下一步）后，新建一个 <code>hello.js</code>：
      </p>
      <pre className="codeblock">{`// hello.js
const who = "未来的全栈工程师";
console.log("你好，" + who + "！");
console.log("服务器时间：" + new Date().toLocaleTimeString("zh-CN"));`}</pre>
      <p>
        然后打开终端，敲下两个词——注意，<b>不是在浏览器里</b>：
      </p>
      <pre className="codeblock">{`$ node hello.js
你好，未来的全栈工程师！
服务器时间：14:32:07`}</pre>
      <p>
        没有任何网页参与，JS 直接在你的操作系统上跑完了。<b>这就是后端的入口</b>。
      </p>

      <Callout variant="deep" title="🔬 你脚下的就是 Node">
        你正在读的这个网站，就是一个跑在 Node.js 上的 Next.js 应用：
        每打开一课，都是某台服务器上的 Node 进程把 HTML 渲染好发给你的浏览器；
        稍后你要调用的留言板接口，同样是一段 Node 代码。
        学完这个模块，这台「黑箱服务器」对你将不再有秘密。
      </Callout>

      <Quiz
        questions={[
          {
            q: "下面哪段代码只能在 Node 里运行，放到浏览器里会报错？",
            options: [
              'console.log("hi")',
              'setTimeout(() => {}, 1000)',
              'fs.readFileSync("note.txt")',
              'JSON.parse("{}")'],
            answer: 2,
            explain:
              "fs 是 Node 独有的文件系统模块，浏览器出于安全不允许网页读写硬盘。另外三个是两边通用的能力。",
          },
          {
            q: '在 Node 里执行 alert("你好") 会发生什么？',
            options: [
              "弹出系统对话框",
              "报错：alert is not defined——Node 没有 window",
              "自动降级为 console.log 输出到终端",
              "把文字写入日志文件"],
            answer: 1,
            explain:
              "alert 挂在浏览器的 window 对象上，而 Node 没有窗口的概念，自然也没有 alert。想在服务器上「说话」，用 console.log。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "<b>运行环境 Runtime = 引擎 + 周边能力</b>：浏览器和 Node 共用 V8 引擎，装备清单不同。",
          "浏览器独有 <code>document</code>/DOM/<code>alert</code>；Node 独有 <code>fs</code> 文件系统与 <code>process</code>。",
          "双方通用：console、setTimeout、JSON、fetch——前三个模块的 JS 全部平移复用。",
          "终端里 <code>node 文件名.js</code> 即可运行；npm 生态、构建工具、以及本站的 Next.js 都跑在 Node 上。",
        ]}
      />
    </>
  );
}
