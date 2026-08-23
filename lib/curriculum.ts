export type LessonMeta = {
  slug: string;
  titleZh: string;
  titleEn: string;
  minutes: number;
  summary: string;
};

export type OutlineItem = { zh: string; en: string };

export type ModuleMeta = {
  id: string;
  order: number;
  icon: string;
  titleZh: string;
  titleEn: string;
  tagline: string;
  levelLabel: string;
  status: "live" | "soon";
  /** tailwind gradient, e.g. "from-indigo-500 to-violet-500" */
  accent: string;
  /** tailwind text color for accents, e.g. "text-indigo-400" */
  ring: string;
  lessons: LessonMeta[];
  /** topic bullets for coming-soon modules */
  outline?: OutlineItem[];
};

export const LESSON_XP = 50;

export const MODULES: ModuleMeta[] = [
  {
    id: "m1",
    order: 1,
    icon: "🎨",
    titleZh: "网页基础",
    titleEn: "Web Foundations",
    tagline: "从零认识网页的骨架与皮肤：HTML 与 CSS，全部可视化演示。",
    levelLabel: "入门",
    status: "live",
    accent: "from-indigo-500 to-violet-500",
    ring: "text-indigo-400",
    lessons: [
      {
        slug: "how-web-works",
        titleZh: "网页是如何诞生的",
        titleEn: "How the Web Works",
        minutes: 12,
        summary: "从输入网址到页面出现，中间那零点几秒发生了什么？",
      },
      {
        slug: "first-page",
        titleZh: "你的第一个网页",
        titleEn: "Your First HTML Page",
        minutes: 15,
        summary: "亲手写下人生第一行 HTML，并在浏览器里看到它。",
      },
      {
        slug: "html-text",
        titleZh: "骨架与文本",
        titleEn: "Structure & Text",
        minutes: 18,
        summary: "标题、段落、列表——用语义化标签搭出文章结构。",
      },
      {
        slug: "links-media",
        titleZh: "链接、图片与表单",
        titleEn: "Links, Media & Forms",
        minutes: 20,
        summary: "让页面之间能跳转，让页面有图，还能收集用户输入。",
      },
      {
        slug: "css-basics",
        titleZh: "给网页化妆：CSS 入门",
        titleEn: "CSS Basics",
        minutes: 20,
        summary: "选择器、颜色与字体，三步改变整张页面的气质。",
      },
      {
        slug: "box-model",
        titleZh: "盒模型",
        titleEn: "The Box Model",
        minutes: 18,
        summary: "每个元素都是一个盒子，理解它就理解了网页排版的一半。",
      },
      {
        slug: "flexbox",
        titleZh: "Flexbox 弹性布局",
        titleEn: "Flexbox Layout",
        minutes: 22,
        summary: "一行代码让元素乖乖排好队，现代布局的核心工具。",
      },
      {
        slug: "responsive",
        titleZh: "响应式设计",
        titleEn: "Responsive Design",
        minutes: 18,
        summary: "同一份代码，在手机和电脑上都好看。",
      },
      {
        slug: "capstone",
        titleZh: "结课挑战：个人主页",
        titleEn: "Capstone: Profile Page",
        minutes: 30,
        summary: "综合运用本模块所学，写出并提交你的第一张名片页。",
      },
    ],
  },
  {
    id: "m2",
    order: 2,
    icon: "⚡",
    titleZh: "JavaScript 编程思维",
    titleEn: "JavaScript Essentials",
    tagline: "让网页动起来：变量、函数、逻辑，以及操作页面的超能力。",
    levelLabel: "进阶",
    status: "live",
    accent: "from-amber-500 to-orange-500",
    ring: "text-amber-400",
    lessons: [
      {
        slug: "js-variables",
        titleZh: "变量与数据类型",
        titleEn: "Variables & Types",
        minutes: 15,
        summary: "给数据贴上标签存起来：let、const 和六种基本类型。",
      },
      {
        slug: "js-functions",
        titleZh: "函数：代码的积木",
        titleEn: "Functions",
        minutes: 18,
        summary: "把一段逻辑打包复用，参数进去、结果出来。",
      },
      {
        slug: "js-conditionals-loops",
        titleZh: "条件与循环",
        titleEn: "Conditions & Loops",
        minutes: 20,
        summary: "让程序学会做选择题（if）和重复劳动（for/while）。",
      },
      {
        slug: "js-arrays-objects",
        titleZh: "数组与对象",
        titleEn: "Arrays & Objects",
        minutes: 20,
        summary: "把数据整理成清单和档案卡，这是真实应用的数据形态。",
      },
      {
        slug: "js-dom",
        titleZh: "DOM 操作：控制页面",
        titleEn: "DOM Manipulation",
        minutes: 22,
        summary: "用 JavaScript 找到页面元素并改变它——网页「活」起来的秘密。",
      },
      {
        slug: "js-events",
        titleZh: "事件与交互",
        titleEn: "Events & Interactions",
        minutes: 20,
        summary: "点击、输入、提交……监听用户的每一个动作并做出反应。",
      },
      {
        slug: "capstone",
        titleZh: "结课挑战：待办清单",
        titleEn: "Capstone: Todo App",
        minutes: 35,
        summary: "综合运用本模块所学，做一个能增删改的待办清单应用。",
      },
    ],
  },
  {
    id: "m3",
    order: 3,
    icon: "🧩",
    titleZh: "前端框架 React",
    titleEn: "React Framework",
    tagline: "用组件思维搭建界面：状态驱动、一次学习处处使用。",
    levelLabel: "进阶",
    status: "live",
    accent: "from-sky-500 to-cyan-500",
    ring: "text-sky-400",
    lessons: [
      {
        slug: "react-components",
        titleZh: "组件思维",
        titleEn: "Thinking in Components",
        minutes: 18,
        summary: "把界面拆成乐高积木：组件是什么、为什么框架都用它。",
      },
      {
        slug: "react-jsx-props",
        titleZh: "JSX 与 Props",
        titleEn: "JSX & Props",
        minutes: 20,
        summary: "在 JavaScript 里写 HTML；父组件如何向子组件传话。",
      },
      {
        slug: "react-use-state",
        titleZh: "状态 useState",
        titleEn: "State",
        minutes: 20,
        summary: "组件的记忆：数据一变，界面自动更新。",
      },
      {
        slug: "react-use-effect",
        titleZh: "副作用 useEffect",
        titleEn: "Effects",
        minutes: 20,
        summary: "组件渲染之外的事：定时器、日志，以及获取网络数据。",
      },
      {
        slug: "react-lists-forms",
        titleZh: "列表渲染与受控表单",
        titleEn: "Lists & Forms",
        minutes: 20,
        summary: "用 map 画列表、用状态接管输入框，做出真正的互动界面。",
      },
      {
        slug: "capstone",
        titleZh: "结课挑战：天气看板",
        titleEn: "Capstone: Weather Board",
        minutes: 35,
        summary: "用 React 组件搭建一个带切换城市功能的天气看板。",
      },
    ],
  },
  {
    id: "m4",
    order: 4,
    icon: "🛠️",
    titleZh: "后端开发 Node.js 与 API",
    titleEn: "Backend: Node.js & APIs",
    tagline: "走向服务器：HTTP 深入、接口设计与鉴权，看懂全栈另一半。",
    levelLabel: "中级",
    status: "live",
    accent: "from-emerald-500 to-teal-500",
    ring: "text-emerald-400",
    lessons: [
      {
        slug: "node-runtime",
        titleZh: "Node.js：离开浏览器的 JS",
        titleEn: "The Node.js Runtime",
        minutes: 15,
        summary: "同一门语言，从前端跑到服务器，它是怎么做到的？",
      },
      {
        slug: "http-deep",
        titleZh: "HTTP 协议深入",
        titleEn: "HTTP in Depth",
        minutes: 20,
        summary: "请求头、方法、状态码——把第 1 模块那趟旅程看个通透。",
      },
      {
        slug: "api-routes",
        titleZh: "API Routes 实战",
        titleEn: "API Routes in Action",
        minutes: 22,
        summary: "亲手写一个服务端接口，并现场调用它！",
      },
      {
        slug: "rest-design",
        titleZh: "RESTful 接口设计",
        titleEn: "RESTful Design",
        minutes: 20,
        summary: "URL 怎么起名、方法怎么选——专业团队都在用的约定。",
      },
      {
        slug: "auth-sessions",
        titleZh: "鉴权与会话",
        titleEn: "Auth & Sessions",
        minutes: 22,
        summary: "登录是怎么实现的？Cookie、Token 与密码安全入门。",
      },
      {
        slug: "capstone",
        titleZh: "结课挑战：留言板 API",
        titleEn: "Capstone: Guestbook UI",
        minutes: 30,
        summary: "用 fetch 对接本站真实留言板接口，做出能读能写的完整前端。",
      },
    ],
  },
  {
    id: "m5",
    order: 5,
    icon: "🗄️",
    titleZh: "数据库基础",
    titleEn: "Databases",
    tagline: "给数据一个家：SQL 建模、查询，以及全栈项目如何接入。",
    levelLabel: "中级",
    status: "live",
    accent: "from-fuchsia-500 to-pink-500",
    ring: "text-fuchsia-400",
    lessons: [
      {
        slug: "sql-intro",
        titleZh: "关系型数据库与 SQL",
        titleEn: "Relational DB & SQL",
        minutes: 20,
        summary: "表格的世界观，以及和它对话的语言 SELECT。",
      },
      {
        slug: "schema-relations",
        titleZh: "表设计与关联",
        titleEn: "Schema & Relations",
        minutes: 22,
        summary: "主键、外键、一对一/一对多/多对多——设计不返工的数据结构。",
      },
      {
        slug: "nosql-glimpse",
        titleZh: "NoSQL 一瞥",
        titleEn: "A Glimpse of NoSQL",
        minutes: 12,
        summary: "不是所有数据都住表格里：文档数据库的另一种思路。",
      },
      {
        slug: "orm-intro",
        titleZh: "ORM 入门",
        titleEn: "Intro to ORM",
        minutes: 18,
        summary: "不用手写 SQL，用对象操作数据库——现代开发的日常。",
      },
      {
        slug: "wiring-db",
        titleZh: "接入全栈项目",
        titleEn: "Wiring the Database",
        minutes: 20,
        summary: "数据库 → API → 页面：一条数据的完整旅程。",
      },
      {
        slug: "capstone",
        titleZh: "结课挑战：图书查询系统",
        titleEn: "Capstone: Library Query",
        minutes: 30,
        summary: "为一家图书馆写出增查改删的 SQL，通过服务端校验。",
      },
    ],
  },
  {
    id: "m6",
    order: 6,
    icon: "🚀",
    titleZh: "全栈实战",
    titleEn: "Full-Stack Capstone",
    tagline: "从需求到上线：完整走一遍真实产品的开发流程。",
    levelLabel: "高阶",
    status: "live",
    accent: "from-rose-500 to-red-500",
    ring: "text-rose-400",
    lessons: [
      {
        slug: "requirements",
        titleZh: "需求分析与产品设计",
        titleEn: "Requirements & Design",
        minutes: 18,
        summary: "动手写代码之前，专业团队都在做什么？",
      },
      {
        slug: "wiring-fullstack",
        titleZh: "前后端联调",
        titleEn: "Wiring Front & Back",
        minutes: 22,
        summary: "把页面和接口接在一起：错误处理与加载状态的实战。",
      },
      {
        slug: "testing",
        titleZh: "测试与质量",
        titleEn: "Testing & Quality",
        minutes: 18,
        summary: "怎么证明你的代码是对的？测试思维与断言入门。",
      },
      {
        slug: "deployment",
        titleZh: "部署上线",
        titleEn: "Deployment",
        minutes: 20,
        summary: "你已经做过一遍的事，背后发生了什么：Git → 构建 → 上线。",
      },
      {
        slug: "portfolio",
        titleZh: "作品集打磨",
        titleEn: "Portfolio Polish",
        minutes: 15,
        summary: "把学过的项目变成能让面试官眼前一亮的作品集。",
      },
      {
        slug: "capstone",
        titleZh: "毕业挑战：全栈小应用",
        titleEn: "Final: Full-Stack Mini App",
        minutes: 40,
        summary: "规划、构建、联调一个调用真实 API 的完整应用，为旅程收官。",
      },
    ],
  },
];

export function getModule(id: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getLesson(moduleId: string, slug: string): LessonMeta | undefined {
  return getModule(moduleId)?.lessons.find((l) => l.slug === slug);
}

export function lessonHref(moduleId: string, slug: string): string {
  return `/learn/${moduleId}/${slug}`;
}

/** ordered flat list of live lessons, used for prev/next navigation */
export function flatLiveLessons(): { moduleId: string; slug: string }[] {
  return MODULES.filter((m) => m.status === "live").flatMap((m) =>
    m.lessons.map((l) => ({ moduleId: m.id, slug: l.slug })),
  );
}

export function neighborsOf(moduleId: string, slug: string) {
  const flat = flatLiveLessons();
  const i = flat.findIndex((x) => x.moduleId === moduleId && x.slug === slug);
  return { prev: i > 0 ? flat[i - 1] : undefined, next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : undefined };
}

export const TOTAL_LIVE_LESSONS = flatLiveLessons().length;
