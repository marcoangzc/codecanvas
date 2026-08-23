# CodeCanvas · 代码画布

一个「看得懂、看得见」的全栈开发学习网站 —— 灵感来自 freeCodeCamp，但每个抽象概念都被拆成**动画**和**互动实验**。

## 🚀 快速开始

```bash
# 安装依赖（需要 Node.js 18+，或直接用 bun）
npm install        # 或 bun install

# 开发模式（改代码实时热更新）
npm run dev        # 或 bun run dev

# 生产构建 + 启动
npm run build && npm start
```

打开浏览器访问 **http://localhost:3000**

## 🗺️ 课程结构

| 模块 | 内容 | 状态 |
| --- | --- | --- |
| 1️⃣ 网页基础 | HTML / CSS / 响应式 / 结课挑战（9 节课） | ✅ 已上线 |
| 2️⃣ JavaScript 编程思维 | 变量、函数、DOM、事件、待办清单项目 | 🚧 敬请期待 |
| 3️⃣ React 框架 | 组件、状态、副作用、天气看板项目 | 🚧 敬请期待 |
| 4️⃣ Node.js 与 API | HTTP 深入、接口设计、鉴权 | 🚧 敬请期待 |
| 5️⃣ 数据库基础 | SQL 建模、查询、ORM | 🚧 敬请期待 |
| 6️⃣ 全栈实战 | 需求到上线的完整流程 | 🚧 敬请期待 |

## ✨ 四大互动形式

1. **实时代码演练场** — 左边写 HTML/CSS/JS，右边 iframe 实时预览，带控制台输出
2. **动画概念图** — 网页诞生之旅（HTTP 全流程）、HTML 文档解剖图、DOM 树生长动画
3. **分步交互讲解** — 盒模型实验室、Flexbox 实验室、响应式断点实验室、选择器小游戏
4. **进度与成就** — XP 经验等级、5 枚徽章、课程完成度（保存在浏览器 localStorage）

## 🏗️ 技术栈

- **Next.js 15**（App Router）+ **TypeScript**
- **Tailwind CSS v4**
- 服务端校验 API：`POST /api/validate`（结课挑战的代码会真的走一遍 HTTP 往返）

## 📁 目录导览

```
app/                    页面路由（首页、课程、成就、API）
components/
  interactives/         动画概念图与实验室组件
  playground/           实时代码演练场
content/m1/             第一模块 9 节课的正文内容
lib/
  curriculum.ts         六大模块课程数据（想加课先改这里）
  checks.ts             结课挑战校验规则（前后端共享）
  progress.tsx          进度 / XP / 成就系统
```

## ➕ 如何新增一节课

1. 在 `content/m1/` 新建课程组件（参考现有课程的结构）
2. 在 `content/registry.ts` 注册 `moduleId/slug → 组件`
3. 在 `lib/curriculum.ts` 的对应模块里添加课程元信息
4. 完成 —— 页面路由、侧边栏、进度系统都会自动生效
