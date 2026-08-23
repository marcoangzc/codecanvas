import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";

/** 从 push 到上线的流程步骤卡片 */
const STEPS = [
  {
    icon: "📦",
    title: "1 · 提交 Commit",
    body: "git add + git commit：把改动打包成一个带说明的快照，存在你自己的电脑上。",
  },
  {
    icon: "☁️",
    title: "2 · 推送 Push",
    body: "git push 上传到 GitHub。仓库里从此多了一个任何人都能看到的历史节点。",
  },
  {
    icon: "🏗️",
    title: "3 · 构建 Build",
    body: "托管平台执行 npm run build：把 TSX / TypeScript 翻译并打包成浏览器能直接运行的 HTML/CSS/JS。",
  },
  {
    icon: "🚀",
    title: "4 · 部署 Deploy",
    body: "构建产物被放到常驻服务器的指定目录，绑定域名——全世界输入网址就能访问了。",
  },
];

export default function Lesson() {
  return (
    <>
      <p>
        这几周你已经无数次敲下 <code>git add</code>、<code>git commit</code>、<code>git push</code>，
        用 GitHub 管理着这个课程项目的每一行代码。但你想过没有：
        <b>push 之后发生了什么？为什么别人的电脑上输入一个网址就能看到你的作品？</b>
        这一课把这段你已经亲身做过一遍的流程拆开，看看幕后。
      </p>

      <h2>从一行命令到一个网址</h2>
      <p>
        「上线」听起来神秘，拆开其实是<Term en="Deployment">部署</Term>流水线上的四张卡片。
        点击提交的那一刻起，每一步都是自动接力：
      </p>
      <div className="my-6 grid gap-3 sm:grid-cols-2">
        {STEPS.map((s) => (
          <div key={s.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="mb-1.5 text-sm font-bold text-white">
              <span className="mr-1.5">{s.icon}</span>
              {s.title}
            </p>
            <p className="mb-0 text-xs leading-5 text-slate-400">{s.body}</p>
          </div>
        ))}
      </div>
      <pre className="codeblock">{`$ git add .                      ← 把改动写进「打包清单」（暂存区）
$ git commit -m "完成留言板"       ← 本地存档，生成不可更改的快照
$ git push                       ← 快照上传到 GitHub
        ↓ 平台监测到新提交，自动触发 ↓
$ npm run build                  ← 构建：TSX/TS → 浏览器能懂的文件
$ deploy                         ← 部署：产物放上服务器，全网可访问 ✅`}</pre>
      <Callout variant="tip" title="为什么必须有构建这一步？">
        浏览器只认识 HTML、CSS 和原生 JavaScript，看不懂 TSX、TypeScript 或 Sass。
        <Term en="Build">构建</Term>就是翻译官兼打包员：翻译成浏览器语言、
        把几百个模块合并压缩成一两个文件、顺便做语法检查。
        你平时在演练场里写的「纯三件套」不需要它；真实项目几乎都需要。
      </Callout>

      <h2>环境变量：密码绝不进代码 🔑</h2>
      <p>
        项目一旦接上数据库（还记得模块 5 吗），代码里就需要连接密码。
        千万别把它直接写在源码里——push 到 GitHub 的那一刻，
        <b>全世界（包括爬虫机器人）都能读到它</b>。专业做法是用
        <Term en="Environment Variable">环境变量</Term>：
      </p>
      <pre className="codeblock">{`# .env —— 只住在你的电脑里，且已加入 .gitignore
DATABASE_URL="postgres://用户:密码@主机:5432/库名"

// 代码里只写变量名，运行时由环境注入
const db = connect(process.env.DATABASE_URL);`}</pre>
      <p>
        那服务器怎么拿到密码？部署平台都有一块「环境变量设置面板」，你在网页上填一次，
        每次构建时平台会<b>悄悄注入</b>给程序。这样密码既不在代码里、也不进 Git 历史，
        换密码时也不用改任何一行代码。
      </p>
      <Callout variant="warn" title="已经提交过的密码 = 已经泄露的密码">
        Git 会永久保留历史记录：哪怕下一个 commit 把密码删掉，
        翻旧版本照样能找到。<b>正确操作是立刻更换密码/密钥</b>，再考虑清理历史。
        所以最好的策略永远是：从一开始就不让它进门。
      </Callout>

      <Quiz
        questions={[
          {
            q: "npm run build（构建）主要在做的事是？",
            options: [
              "把代码上传到 GitHub",
              "把 TSX / TypeScript 等源码翻译打包成浏览器能运行的 HTML/CSS/JS",
              "给数据库建表和插入初始数据",
              "检查团队每个人的考勤"],
            answer: 1,
            explain:
              "浏览器不认识 TSX/TypeScript。构建负责「翻译 + 合并 + 压缩 + 检查」，产出可以直接部署的成品文件。",
          },
          {
            q: "数据库密码应该放在哪里？",
            options: [
              "直接写在代码里，方便随时查看",
              "写进 README，让队友都能配置",
              "放在前端 JavaScript 里，反正没人会看",
              "环境变量 / .env 文件中，并确保 .env 不进 Git 仓库"],
            answer: 3,
            explain:
              "推送后源码人人可见，README 同样公开，前端代码更是直接发给每个访客的浏览器。只有环境变量能做到「代码公开、密钥保密」，且换密码不用改代码。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "上线四步：<b>commit → push → build → deploy</b>，后两步通常由平台自动接力。",
          "<b>构建</b>= 翻译官 + 打包员：把 TSX/TS 变成浏览器能懂的文件，顺便合并压缩。",
          "密码等机密放<b>环境变量</b>（本地 .env + 部署面板配置），代码里只写变量名。",
          ".env 必须写进 <code>.gitignore</code>；<b>提交过的密码视同泄露，要立刻更换</b>。",
          "你早已会走这条流水线的前半段——现在你知道了后半段发生什么。",
        ]}
      />
    </>
  );
}
