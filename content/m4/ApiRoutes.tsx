import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import CodePlayground from "@/components/playground/CodePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        前两课你一直在「看懂」HTTP；这一课掀开服务器的幕布。先说结论，
        可能会让你松一口气：<b>一个接口，本质上就是一个函数</b>。
        请求进来 → 执行函数 → 返回结果，仅此而已。
      </p>

      <h2>接口 = 挂在地址上的函数</h2>
      <p>
        在 Next.js 这类框架里，这种写法叫 <Term en="Route Handler">路由处理函数</Term>：
        约定好文件路径就是接口地址，导出名字为 <code>GET</code>、<code>POST</code> 的函数，
        对应的请求就会自动找上门。
      </p>
      <pre className="codeblock">{`// app/api/hello/route.ts —— 一个最小接口
export async function GET() {
  return Response.json({ hello: "world" });   // 默认状态码 200
}`}</pre>
      <ul>
        <li>文件放在 <code>app/api/hello/</code> 下 → 接口地址就是 <code>/api/hello</code>。</li>
        <li>浏览器发 GET 请求过来 → 名为 <code>GET</code> 的函数被调用。</li>
        <li>函数返回什么，响应体就是什么——对象会被自动转成 JSON 文本寄回去。</li>
      </ul>
      <Callout variant="tip" title="JSON 是前后端之间的「普通话」">
        <code>Response.json(...)</code> 把 JS 对象变成 JSON 字符串发出去；
        浏览器再用 <code>res.json()</code> 把它变回 JS 对象。一来一回，
        两边操作的都是同一种数据结构——这就是 JSON 能成为通用语言的原因。
      </Callout>

      <h2>解剖本站的留言板接口 🐸</h2>
      <p>
        本站刚上线了一个真实的<Term en="Endpoint">端点</Term>：<code>/api/guestbook</code>。
        把它的实现简化后「解剖」给你看（真实代码还有文件存储、CORS 等细节，思路完全一致）：
      </p>
      <pre className="codeblock">{`// app/api/guestbook/route.ts（简化示意）
let messages = [ /* 已有留言：{ id, name, text, at } */ ];

export async function GET() {
  // 新留言排在前面，count 方便前端显示总数
  return Response.json({ count: messages.length, messages });
}

export async function POST(req) {
  const { name, text } = await req.json();     // 读出请求体里的 JSON

  if (!text) {
    return Response.json({ ok: false, error: "内容不能为空" }, { status: 400 });
  }
  if (text.length > 200 || name.length > 20) {
    return Response.json({ ok: false, error: "超长啦" }, { status: 400 });
  }

  const message = { id: 编号++, name, text, at: new Date() };
  messages = [message, ...messages];           // 新留言插到最前
  return Response.json({ ok: true, message }, { status: 201 }); // 创建成功
}`}</pre>
      <p>
        注意两个细节：GET 分支<b>只读不写</b>，返回列表；POST 分支先校验再入库，
        校验失败返回 <code>400</code>，成功返回 <code>201 Created</code>——
        正是上一课学的状态码语义。
      </p>
      <Callout variant="warn" title="服务器永远不能相信客户端">
        有人会绕过你的页面，用脚本直接向接口狂发垃圾数据。所以<b>校验必须在服务器再做一遍</b>：
        内容非空、长度上限、类型检查……浏览器端的校验只是为了体验更好，
        服务端的校验才是真正的防线。
      </Callout>

      <h2>现场调用：跟真接口过过招 ⚔️</h2>
      <p>
        光看不练假把式。下面的演练场连着本站的真实后端（沙箱里不能写相对地址，
        所以用预置的 <code>API_BASE</code> 拼出完整网址）。先认识一下 fetch 的用法：
      </p>
      <pre className="codeblock">{`const res = await fetch(url, {          // 发出请求，拿到响应对象 res
  method: "POST",                       // 不写 method 默认就是 GET
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, text }), // JS 对象 → JSON 文本
});
const data = await res.json();          // JSON 文本 → JS 对象
console.log(res.status);                // 201 就代表创建成功`}</pre>
      <CodePlayground
        height={320}
        tasks={[
          "切到 JS 标签页：load() 会打印 GET 的状态码和全部留言",
          '把 add("(你的名字)", …) 里的昵称改成你自己的，运行后真的发出一条留言',
          "刷新页面重新运行 load()，看看你的留言是不是还在（新留言在最前）",
          "试试发一条超过 200 字的留言，观察状态码变成 400",
        ]}
        initialHtml={`<div class="panel">
  <h1>📡 现场调用手记</h1>
  <p>运行结果在右下角控制台 Console 里查看。</p>
</div>`}
        initialCss={`body { font-family: sans-serif; padding: 16px; }
.panel h1 { font-size: 18px; margin: 0 0 8px; }
.panel p { color: #64748b; font-size: 13px; margin: 0; }`}
        initialJs={`// API_BASE 已预置为本站地址，直接拼接使用

async function load() {
  const res = await fetch(API_BASE + "/api/guestbook");
  const data = await res.json();
  console.log("GET 状态码:", res.status);
  console.log("共", data.count, "条留言");
  data.messages.forEach((m) => console.log("#" + m.id, m.name + ":", m.text));
}
load();

async function add(name, text) {
  const res = await fetch(API_BASE + "/api/guestbook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, text }),
  });
  console.log("POST 状态码:", res.status, res.status === 201 ? "(创建成功)" : "(看看哪错了)");
  const data = await res.json();
  console.log("服务器回应:", data);
}
add("(你的名字)", "来打卡了！");`}
        caption="这不是模拟数据——你刚刚真的向本站服务器读写了一条留言 🤯 小提醒：演练场每次改动都会重新运行整个脚本，别连续猛改 add 的调用，不然留言板要被你刷屏啦。"
      />

      <Quiz
        questions={[
          {
            q: "在 Next.js 的 route.ts 里，处理 POST 请求的函数应该怎么写？",
            options: [
              "function handlePost(req) { … }",
              "function doPost(req) { … }",
              "export async function POST(req) { … }",
              "随便起名，框架会自动识别"],
            answer: 2,
            explain:
              "这是约定式路由：导出的函数名必须与 HTTP 方法同名且导出（export），框架才会把对应的请求交给它。",
          },
          {
            q: "用户向 /api/guestbook 发了一条内容为空的留言，接口应该回应什么？",
            options: [
              "201，反正存进去也没人发现",
              "400，明确告知「内容不能为空」",
              "500，让前端自己猜哪里错了",
              "200 但什么都不存"],
            answer: 1,
            explain:
              "请求方的数据不合法属于 4xx 家族：400 Bad Request，并尽量附上原因。谎报 200 或乱报 500 都会误导调用方。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "接口本质是函数：<b>约定文件路径 = 接口地址，导出 GET/POST 函数 = 处理对应请求</b>。",
          "<code>Response.json(对象, { status: 201 })</code> 返回 JSON 并指定状态码。",
          "GET 只读、POST 先校验再写入；成功创建用 <b>201</b>，参数不合法用 <b>400</b>。",
          "fetch 四件套：method、headers、body（JSON.stringify）、res.json()。",
          "<b>校验必须在服务端再做一遍</b>——永远不要相信客户端传来的数据。",
        ]}
      />
    </>
  );
}
