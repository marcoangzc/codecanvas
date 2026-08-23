import Link from "next/link";
import Callout from "@/components/Callout";
import Challenge from "@/components/Challenge";
import { getChecksForLesson } from "@/lib/checks";

const CAPSTONE_CHECKS = getChecksForLesson("m1/capstone") ?? [];

const STARTER = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>我的名片</title>
  <style>
    body {
      font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
      background: #f1f5f9;
      margin: 0;
      padding: 24px;
    }
    .card {
      max-width: 420px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-sizing: border-box;
    }
    .avatar {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      display: block;
    }
    h1 {
      font-size: 26px;
      color: #1e293b;
      margin: 16px 0 4px;
    }
    .tagline {
      color: #64748b;
      font-size: 14px;
      line-height: 1.7;
    }
    h2 {
      font-size: 15px;
      color: #6366f1;
      margin-top: 20px;
    }
    ul {
      padding-left: 18px;
      color: #334155;
      font-size: 14px;
      line-height: 1.9;
    }
    a { color: #6366f1; }
  </style>
</head>
<body>
  <div class="card">
    <!-- 👇 把这里改成你自己的内容 -->
    <img class="avatar" src="https://i.pravatar.cc/160?img=12" alt="我的头像" />
    <h1>王小码</h1>
    <p class="tagline">正在从零学习全栈开发，这是我用 HTML + CSS 写的第一张网页名片。</p>

    <h2>我在学什么</h2>
    <ul>
      <li>HTML 结构</li>
      <li>CSS 布局（Flexbox 真香）</li>
      <li>下一步：JavaScript！</li>
    </ul>

    <h2>找到我</h2>
    <a href="https://github.com" target="_blank" rel="noopener">我的 GitHub 主页 →</a>
  </div>
</body>
</html>`;

export default function Lesson() {
  return (
    <>
      <p>
        恭喜走到这一课！🎉 前八节里你已经集齐了搭建一张完整网页所需的全部技能。
        现在，把它们<b>全部用上</b>：做一张属于你自己的「个人名片页」。
      </p>

      <Callout variant="tip" title="挑战玩法">
        左侧编辑器已备好一份「半成品」。你可以直接改它，也可以全删了从零写。
        右侧清单会<b>实时核对</b>你的进度；全部打勾后点击提交——
        你的代码会真的发送到本站的服务器接口校验，
        你还能在下方看到这次 HTTP 请求的完整往返过程（第一课学的知识活过来了！）。
      </Callout>

      {/* 要求清单速览 */}
      <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="!mt-0 flex items-center gap-2 text-lg font-bold text-white">📋 作品要求</h2>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 marker:text-indigo-400">
          {CAPSTONE_CHECKS.map((c, i) => (
            <li key={c.id} className="text-sm leading-6 text-slate-300">
              {c.label}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          卡住了？每一项都对应一节课：
          文档骨架见第 1–2 课 · 标题段落列表见第 3 课 · 图片链接见第 4 课 ·
          选择器与颜色见第 5 课 · 盒模型间距见第 6 课 · 布局见第 7 课 · 响应式见第 8 课。
        </p>
      </div>

      <Challenge lessonId="m1/capstone" starterCode={STARTER} />

      <Callout variant="deep" title="刚才发生了什么？（服务器视角）">
        点击提交时，浏览器向 <code>/api/validate</code> 发送了一个 POST 请求，
        请求体是你的代码字符串；服务器的校验程序逐条检查后返回 JSON 结果，
        状态码 200 表示通信成功。<b>这就是后端 API 的日常</b>——模块 4 里你会亲手写出这样的接口。
      </Callout>

      <div className="my-10 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-6 text-center">
        <div className="text-3xl">🏁</div>
        <h2 className="!mt-2 justify-center text-xl font-bold text-white">完成之后</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300 [&_p]:mb-0">
          你已经跨过了从「完全没写过」到「能独立交付一个页面」的门槛。
          接下来的旅程：<b>JavaScript 让页面动起来 → React 组件化 → Node.js 后端 → 数据库 → 全栈实战</b>。
          把这张名片保存下来，它会成为你作品集的第一件藏品。
        </p>
        <Link href="/curriculum" className="btn-primary mt-5 px-6 py-2.5">
          查看接下来的路线 🗺️
        </Link>
      </div>
    </>
  );
}
