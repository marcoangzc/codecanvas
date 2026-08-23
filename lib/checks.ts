/**
 * Shared exercise validation rules.
 * Pure functions over the raw code string, so the SAME checks run:
 *  - live in the browser while the learner types (Challenge checklist)
 *  - on the server when the code is POSTed to /api/validate
 */

export type Check = {
  id: string;
  /** shown in the checklist */
  label: string;
  /** shown when the check fails */
  hint: string;
  test: (code: string) => boolean;
};

const hasOpenTag = (code: string, tag: string) => new RegExp(`<${tag}[\\s>]`, "i").test(code);
const hasClosedTag = (code: string, tag: string) =>
  new RegExp(`<${tag}[\\s>][\\s\\S]*?</${tag}\\s*>`, "i").test(code);

/* ------------------------------------------------------------------ */
/* m1 · 个人主页                                                        */
/* ------------------------------------------------------------------ */

export const CAPSTONE_M1: Check[] = [
  {
    id: "doctype",
    label: "文档以 <!DOCTYPE html> 开头",
    hint: "在第一行加上 <!DOCTYPE html>，告诉浏览器这是现代 HTML 文档。",
    test: (c) => /<!DOCTYPE\s+html\s*>/i.test(c),
  },
  {
    id: "html",
    label: "有完整的 <html> … </html> 结构",
    hint: "所有内容都应包在 <html> 和 </html> 之间。",
    test: (c) => hasClosedTag(c, "html"),
  },
  {
    id: "head-title",
    label: "<head> 里有一个 <title>",
    hint: "加上 <head><title>你的名字</title></head>，标题会显示在浏览器标签页上。",
    test: (c) => hasClosedTag(c, "head") && hasClosedTag(c, "title"),
  },
  {
    id: "h1",
    label: "有一个 <h1> 主标题",
    hint: "用 <h1> 写出页面最重要的标题，比如你的名字。",
    test: (c) => hasClosedTag(c, "h1"),
  },
  {
    id: "paragraphs",
    label: "至少有两个 <p> 段落",
    hint: "用 <p> 介绍你自己，比如兴趣爱好、正在学什么。",
    test: (c) => (c.match(/<p[\s>][\s\S]*?<\/p\s*>/gi) || []).length >= 2,
  },
  {
    id: "image",
    label: "有一张 <img> 图片，且带 src 和 alt",
    hint: '<img src="图片地址" alt="图片描述"> —— alt 在图片加载失败时显示，也是无障碍要求。',
    test: (c) => /<img[^>]*\ssrc\s*=\s*["'][^"']+["'][^>]*\salt\s*=\s*["'][^"']+["']/i.test(c),
  },
  {
    id: "link",
    label: "至少一个 <a> 链接，带 href",
    hint: '<a href="https://...">文字</a> 可以链接到你的社交主页或喜欢的网站。',
    test: (c) => /<a[^>]*\shref\s*=\s*["'][^"']+["'][^>]*>[\s\S]*?<\/a\s*>/i.test(c),
  },
  {
    id: "list",
    label: "用 <ul>/<ol> + <li> 做一个列表",
    hint: "列一下你的技能或爱好：<ul><li>…</li></ul>。",
    test: (c) => /<(u|o)l[\s>][\s\S]*<li[\s>][\s\S]*?<\/(u|o)l\s*>/i.test(c),
  },
  {
    id: "style-block",
    label: "有 <style> 块，写了至少两条 CSS 规则",
    hint: "在 <head> 里加 <style> … </style>，写两条规则，比如 body { … } h1 { … }。",
    test: (c) =>
      hasClosedTag(c, "style") && (c.match(/[-a-z]+\s*:\s*[^;{}]+;/gi) || []).length >= 2,
  },
  {
    id: "class-selector",
    label: "CSS 里用到了类选择器（.类名 { … }）",
    hint: '给某个元素加 class="card"，然后在 <style> 里写 .card { … } 来给它定制样式。',
    test: (c) => /\.[-\w]+\s*\{[^}]*\}/.test(c),
  },
];

/* ------------------------------------------------------------------ */
/* m2 · 待办清单（原生 JS）                                              */
/* ------------------------------------------------------------------ */

export const CAPSTONE_M2: Check[] = [
  {
    id: "structure",
    label: "完整的 HTML 结构 + <input> 输入框 + <button> 按钮",
    hint: "骨架：<input id=\"todo-input\" /> <button id=\"add-btn\">添加</button>，再配一个显示清单的 <ul id=\"todo-list\">。",
    test: (c) => /<input[\s>]/i.test(c) && /<button[\s>]/i.test(c) && hasClosedTag(c, "ul"),
  },
  {
    id: "script-tag",
    label: "有 <script> 标签，逻辑写在其中",
    hint: "把 JavaScript 写在 </body> 前的 <script> … </script> 里。",
    test: (c) => hasClosedTag(c, "script"),
  },
  {
    id: "select-element",
    label: "用 querySelector / getElementById 获取元素",
    hint: "例如：const input = document.querySelector('#todo-input');",
    test: (c) => /(querySelector|getElementById)\s*\(/.test(c),
  },
  {
    id: "event-listener",
    label: "用 addEventListener 监听点击事件",
    hint: "btn.addEventListener('click', () => { … })——用户点「添加」时执行里面的代码。",
    test: (c) => /addEventListener\s*\(\s*['"]click['"]/.test(c),
  },
  {
    id: "array-push",
    label: "用数组保存待办，并能添加新项",
    hint: "维护一个 const todos = []，添加时 todos.push({ text, done: false })。",
    test: (c) => /\.push\s*\(/.test(c),
  },
  {
    id: "render-list",
    label: "用 forEach / map 循环渲染清单到页面",
    hint: "遍历数组，为每一条生成 <li>：todos.forEach(t => { … }) 或 list.innerHTML = todos.map(…).join('')。",
    test: (c) => /\.(forEach|map)\s*\(/.test(c),
  },
  {
    id: "toggle-done",
    label: "能切换完成状态（点击划掉）",
    hint: "给每条待办加个开关：点击时 t.done = !t.done 再重新渲染；样式上可用 line-through 划掉。",
    test: (c) => /(classList\.toggle|line-through|done\s*=\s*!|checked)/i.test(c),
  },
  {
    id: "function-def",
    label: "至少定义了一个函数来组织代码",
    hint: "把渲染逻辑包成函数：function render() { … }，每次数据变化后调用它。",
    test: (c) => /(function\s+\w+|(const|let)\s+\w+\s*=\s*(\(|async))/m.test(c),
  },
];

/* ------------------------------------------------------------------ */
/* m3 · 天气看板（React）                                               */
/* ------------------------------------------------------------------ */

export const CAPSTONE_M3: Check[] = [
  {
    id: "component",
    label: "定义了组件（function App / const App = () =>）",
    hint: "组件就是返回 JSX 的函数：function App() { return (<div>…</div>); }",
    test: (c) => /(function\s+[A-Z]\w*\s*\(|const\s+[A-Z]\w*\s*=\s*\()/.test(c),
  },
  {
    id: "use-state",
    label: "使用 useState 管理状态",
    hint: "const [city, setCity] = useState('北京'); 数据变了界面会自动更新。",
    test: (c) => /useState\s*\(/.test(c),
  },
  {
    id: "jsx-render",
    label: "组件返回 JSX（return ( <…> ) ）",
    hint: "JSX 就是在 JS 里写的 HTML：return (<div className=\"board\">…</div>)。",
    test: (c) => /return\s*\(\s*</.test(c) || /ReactDOM|createRoot/.test(c),
  },
  {
    id: "list-map",
    label: "用 .map() 渲染一个列表（如未来几天天气）",
    hint: "{days.map(d => <div key={d.name}>…</div>)} —— 记得给每个元素加 key。",
    test: (c) => /\.map\s*\(/.test(c),
  },
  {
    id: "props-or-events",
    label: "使用了 props 传递 或 onClick 事件",
    hint: "父传子用 props：<Card name={d.name} />；交互用 onClick={() => setCity('上海')}。",
    test: (c) => /(onClick|\bprops\b|\{\s*\w+\s*,?\s*\w*\s*\}\s*=\s*)/.test(c),
  },
  {
    id: "create-root",
    label: "用 createRoot 把组件挂载到页面",
    hint: "ReactDOM.createRoot(document.getElementById('root')).render(<App />);",
    test: (c) => /createRoot\s*\(/.test(c),
  },
];

/* ------------------------------------------------------------------ */
/* m4 · 留言板前端（fetch 对接真实 API）                                  */
/* ------------------------------------------------------------------ */

export const CAPSTONE_M4: Check[] = [
  {
    id: "fetch-get",
    label: "用 fetch 请求留言列表（GET）",
    hint: "fetch(API_BASE + '/api/guestbook') 默认就是 GET，拿到后 res.json() 解析。",
    test: (c) => /fetch\s*\(/.test(c),
  },
  {
    id: "api-path",
    label: "请求了 /api/guestbook 接口",
    hint: "接口地址是 API_BASE + '/api/guestbook'（API_BASE 已在演练场里预置好）。",
    test: (c) => /\/api\/guestbook/.test(c),
  },
  {
    id: "post-method",
    label: "实现了发表留言（POST + JSON body）",
    hint: 'fetch(url, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({name, text}) })',
    test: (c) => /method\s*:\s*['"]POST['"]/i.test(c),
  },
  {
    id: "json-parse",
    label: "解析了 JSON 响应（res.json()）",
    hint: "服务器返回 JSON：const data = await res.json(); 之后就能用 data.messages 了。",
    test: (c) => /\.json\s*\(\s*\)/.test(c),
  },
  {
    id: "async-handling",
    label: "用了 async/await 或 .then 处理异步",
    hint: "网络请求需要时间：async function load() { await fetch(…) } 或 fetch(…).then(res => …)。",
    test: (c) => /(async|await|\.then\s*\()/m.test(c),
  },
  {
    id: "render-messages",
    label: "把留言渲染到了页面上",
    hint: "遍历 data.messages 生成 DOM：forEach/map 拼 <li>，或直接 innerHTML。",
    test: (c) => /\.(forEach|map)\s*\(|innerHTML|appendChild|insertAdjacentHTML/.test(c),
  },
];

/* ------------------------------------------------------------------ */
/* m5 · 图书馆查询（SQL）                                               */
/* ------------------------------------------------------------------ */

export const CAPSTONE_M5: Check[] = [
  {
    id: "select-all",
    label: "用 SELECT * FROM books 查看全表",
    hint: "先看看表里有什么：SELECT * FROM books;",
    test: (c) => /SELECT\s+\*\s+FROM\s+books/i.test(c),
  },
  {
    id: "select-columns",
    label: "只查询指定列（title, author …）",
    hint: "实际项目别动不动 SELECT *：SELECT title, author FROM books; 更省更快。",
    test: (c) => /SELECT\s+(?! \* )(title|author|[a-z_]+\s*,)/im.test(c),
  },
  {
    id: "where-filter",
    label: "用 WHERE 过滤条件",
    hint: "WHERE year > 2000 或 WHERE author = '鲁迅'——只取需要的行。",
    test: (c) => /WHERE\s+/i.test(c),
  },
  {
    id: "order-sort",
    label: "用 ORDER BY 排序",
    hint: "ORDER BY year DESC——最新的排前面。",
    test: (c) => /ORDER\s+BY\s+/i.test(c),
  },
  {
    id: "join-tables",
    label: "用 JOIN 关联另一张表",
    hint: "JOIN borrow_logs ON books.id = borrow_logs.book_id——把借阅记录和书对上。",
    test: (c) => /JOIN\s+\w+\s+ON\s+/i.test(c),
  },
  {
    id: "insert-into",
    label: "用 INSERT INTO 新增数据",
    hint: "INSERT INTO books (title, author, year) VALUES ('活着', '余华', 1993);",
    test: (c) => /INSERT\s+INTO\s+/i.test(c),
  },
  {
    id: "update-delete",
    label: "会用 UPDATE 或 DELETE 维护数据",
    hint: 'UPDATE books SET stock = stock - 1 WHERE id = 3;（记得永远带上 WHERE！）',
    test: (c) => /(UPDATE\s+\w+\s+SET|DELETE\s+FROM\s+)/i.test(c),
  },
];

/* ------------------------------------------------------------------ */
/* m6 · 毕业挑战：全栈小应用                                             */
/* ------------------------------------------------------------------ */

export const CAPSTONE_M6: Check[] = [
  {
    id: "plan-comment",
    label: "开头用注释写出你的产品计划（<!-- 计划 -->）",
    hint: "<!-- 我的计划：做一个 XX 应用，用户可以 YY -->——先想清楚再动手，是专业习惯。",
    test: (c) => /<!--[\s\S]{0,400}?计划[\s\S]*?-->/.test(c),
  },
  {
    id: "semantic-ui",
    label: "用语义化标签搭出界面（header/main/section 等）",
    hint: "别全是 div：header、main、section、footer 让结构一目了然。",
    test: (c) => /<(header|main|section|nav|footer)[\s>]/i.test(c),
  },
  {
    id: "custom-style",
    label: "有自己的 <style> 设计（类选择器 ≥ 3 条规则）",
    hint: "至少三个类选择器，各写几条属性——让它像「你的」产品。",
    test: (c) => (c.match(/\.[-\w]+\s*\{[^}]*\}/g) || []).length >= 3,
  },
  {
    id: "interaction",
    label: "有用户交互（addEventListener 或 React 事件）",
    hint: "至少一个 addEventListener / onClick，让用户的操作有回应。",
    test: (c) => /(addEventListener|onClick)/.test(c),
  },
  {
    id: "real-api",
    label: "调用了真实 API（fetch → /api/guestbook 或 /api/validate）",
    hint: "fetch(API_BASE + '/api/guestbook') —— 你的应用已经接入真实后端！",
    test: (c) => /fetch\s*\([\s\S]{0,80}\/api\/(guestbook|validate)/.test(c),
  },
  {
    id: "error-handling",
    label: "处理了失败情况（try/catch 或 .catch）",
    hint: "网络可能出错：try { … } catch (e) { 显示错误提示 } —— 优雅降级是加分项。",
    test: (c) => /(try\s*\{[\s\S]*catch|\.catch\s*\()/m.test(c),
  },
  {
    id: "reflection-comment",
    label: "结尾用注释写下学习心得（<!-- 心得 -->）",
    hint: "<!-- 心得：这次我学会了…… --> 复盘是最好的老师。",
    test: (c) => /<!--[\s\S]{0,600}?心得[\s\S]*?-->/.test(c),
  },
];

const REGISTRY: Record<string, Check[]> = {
  "m1/capstone": CAPSTONE_M1,
  "m2/capstone": CAPSTONE_M2,
  "m3/capstone": CAPSTONE_M3,
  "m4/capstone": CAPSTONE_M4,
  "m5/capstone": CAPSTONE_M5,
  "m6/capstone": CAPSTONE_M6,
};

export function getChecksForLesson(lessonId: string): Check[] | undefined {
  return REGISTRY[lessonId];
}
