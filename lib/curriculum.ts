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
    status: "soon",
    accent: "from-amber-500 to-orange-500",
    ring: "text-amber-400",
    lessons: [],
    outline: [
      { zh: "变量与数据类型", en: "Variables & Types" },
      { zh: "函数：代码的积木", en: "Functions" },
      { zh: "条件与循环", en: "Conditions & Loops" },
      { zh: "数组与对象", en: "Arrays & Objects" },
      { zh: "DOM 操作：控制页面", en: "DOM Manipulation" },
      { zh: "事件与交互", en: "Events" },
      { zh: "小项目：待办清单", en: "Mini Project: Todo App" },
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
    status: "soon",
    accent: "from-sky-500 to-cyan-500",
    ring: "text-sky-400",
    lessons: [],
    outline: [
      { zh: "组件思维", en: "Thinking in Components" },
      { zh: "JSX 与 Props", en: "JSX & Props" },
      { zh: "状态 useState", en: "State" },
      { zh: "副作用 useEffect", en: "Effects" },
      { zh: "列表渲染与表单", en: "Lists & Forms" },
      { zh: "项目：天气看板", en: "Project: Weather Board" },
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
    status: "soon",
    accent: "from-emerald-500 to-teal-500",
    ring: "text-emerald-400",
    lessons: [],
    outline: [
      { zh: "Node.js 运行时", en: "Node.js Runtime" },
      { zh: "HTTP 协议深入", en: "HTTP in Depth" },
      { zh: "API Routes 实战", en: "API Routes" },
      { zh: "RESTful 接口设计", en: "RESTful Design" },
      { zh: "鉴权与会话", en: "Auth & Sessions" },
      { zh: "项目：留言板 API", en: "Project: Guestbook API" },
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
    status: "soon",
    accent: "from-fuchsia-500 to-pink-500",
    ring: "text-fuchsia-400",
    lessons: [],
    outline: [
      { zh: "关系型数据库与 SQL", en: "Relational DB & SQL" },
      { zh: "表设计与关联", en: "Modeling & Relations" },
      { zh: "NoSQL 一瞥", en: "A Glimpse of NoSQL" },
      { zh: "ORM 入门", en: "Intro to ORM" },
      { zh: "接入全栈项目", en: "Wiring the Stack" },
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
    status: "soon",
    accent: "from-rose-500 to-red-500",
    ring: "text-rose-400",
    lessons: [],
    outline: [
      { zh: "需求分析与产品设计", en: "Requirements & Design" },
      { zh: "前后端联调", en: "Wiring Front & Back" },
      { zh: "测试与质量", en: "Testing" },
      { zh: "部署上线", en: "Deployment" },
      { zh: "作品集打磨", en: "Portfolio Polish" },
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
