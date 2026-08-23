import Link from "next/link";
import Callout from "@/components/Callout";
import Challenge from "@/components/Challenge";
import { getChecksForLesson } from "@/lib/checks";

const STARTER = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>我的全栈小应用</title>
  <style>
    /* 🎨 设计你的产品：至少写出三个类选择器规则
       （比如分别给页面容器、留言卡片、主按钮来一条），
       让它一眼看上去像「你的」产品，而不是浏览器默认样式。 */
    body {
      font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      margin: 0;
      padding: 24px;
    }
  </style>
</head>
<body>
  <!-- 计划：做一个 ______ 应用，用户可以 ______，以便 ______ -->

  <header class="topbar">
    <h1>我的全栈小应用</h1>
    <p>用一句话向访客介绍你的产品</p>
  </header>

  <main>
    <!-- 发表区：名字 + 内容 + 按钮 -->
    <section class="composer">
      <input id="name-input" placeholder="你的名字" />
      <textarea id="text-input" placeholder="想说的话……"></textarea>
      <button id="send-btn">发表</button>
    </section>

    <!-- 展示区：所有人的留言 -->
    <section class="board">
      <h2>大家都在说</h2>
      <ul id="message-list"><li>加载中……</li></ul>
    </section>
  </main>

  <footer class="colophon">
    <p>CodeCanvas 全栈旅程毕业作品 · <span id="status"></span></p>
  </footer>

  <script>
    // 校验只看结构，演练场里才有真实值；
    // 本地双击打开时接口不可达也没关系，把它当成接口地址常量即可。
    const API_BASE = "";

    // TODO 1 · 读：fetch(API_BASE + "/api/guestbook") 拿到留言列表，
    //           res.json() 解析后，遍历 data.messages 渲染进 #message-list
    async function loadMessages() {

    }

    // TODO 2 · 写：给 #send-btn 接上点击事件（模块 2 学过的监听方法），
    //           用 method: "POST" + JSON.stringify({ name, text })
    //           把输入框内容发到同一个 /api/guestbook，成功后重新加载列表

    // TODO 3 · 稳：所有请求都用 try { … } catch (e) { … } 包住——
    //           catch 里往 #status 写一句用户看得懂的提示，
    //           finally 里关掉「加载中 / 发送中」，别忘了空输入要拦截

    loadMessages();
  <\/script>

  <!-- 心得：（做完回来写）这次我学会了 ______，卡壳最久的地方是 ______ -->
</body>
</html>`;

export default function Lesson() {
  const checks = getChecksForLesson("m6/capstone") ?? [];

  return (
    <>
      <p>
        🎓 这是整个课程的<b>最后一课</b>。还记得第 1 课开头那个连
        <code>&lt;!DOCTYPE html&gt;</code> 都没见过的自己吗？六个模块走下来，
        你已经摸过了网页、JavaScript、React、Node 与数据库——现在是把它们
        <b>拧成一件完整作品</b>的时刻：一个调用真实接口的全栈小应用。
      </p>
      <p>
        这次挑战和以往不同：<b>先想，再做</b>。上一课刚学的流程立刻派上用场——
        动手之前，先用一句话写下你的产品计划，并把它作为注释放进代码顶部。
        这行注释不只是仪式感，它正是下方清单的第 1 项。
      </p>

      <Callout variant="tip" title="挑战玩法">
        左侧编辑器已备好一份骨架：header / main / footer 已经搭好，计划与心得留了占位，
        三个 TODO 标出了你要补的逻辑。右侧清单会实时核对进度；
        全部打勾后提交，你的代码会真的 POST 到本站服务器校验——
        这本身就是一次真实的 HTTP 往返。接口就用你练过多次的留言板：
        <code>/api/guestbook</code>，GET 读列表，POST 发留言。
      </Callout>

      {/* 要求清单速览 */}
      <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="!mt-0 flex items-center gap-2 text-lg font-bold text-white">📋 作品要求</h2>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 marker:text-rose-400">
          {checks.map((c, i) => (
            <li key={c.id} className="text-sm leading-6 text-slate-300">
              {c.label}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          卡住了？每一项都对应一段旅程：
          产品计划与语义化结构见本模块第 1 课 · fetch 与三态处理见第 2 课 ·
          类选择器见模块 1 · 事件监听见模块 2 · 真实接口见模块 4 · 心得复盘是第 3 课教的好习惯。
        </p>
      </div>

      <Challenge lessonId="m6/capstone" starterCode={STARTER} />

      <Callout variant="deep" title="诚实声明：清单打勾 ≠ 完成">
        校验程序只看代码结构，所以连 TODO 注释都可能让某几项提前亮起绿勾。
        但你自己知道哪些是真话：把「计划」从占位改成一句真的想清楚了的产品描述，
        把 TODO 变成真正能跑的读写逻辑，让页面在没有你解释的情况下也能被陌生人用起来——
        <b>那才是这份毕业证书的分量</b>。
      </Callout>

      <div className="my-10 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-6 text-center sm:p-8">
        <div className="text-3xl">🎉</div>
        <h2 className="!mt-2 justify-center text-xl font-bold text-white">毕业典礼 · Graduation</h2>
        <div className="mx-auto mt-4 max-w-xl text-left text-sm leading-7 text-slate-300 [&_p]:mb-0">
          <p>
            回头看看这条路，你其实走了很远：
            <b>模块 1</b>，你写下第一行 HTML，第一次让一张白纸有了骨架和皮肤；
            <b>模块 2</b>，JavaScript 让页面听懂了用户的点击；
            <b>模块 3</b>，React 教会你把界面拆成一块块可复用的组件；
            <b>模块 4</b>，你跨过分界线走进服务器，亲手写了 API；
            <b>模块 5</b>，数据终于有了自己的家；
            <b>模块 6</b>，你从需求一路做到上线，还学会了怎么讲述它。
          </p>
          <p className="mt-3">
            而此刻，屏幕上这件小应用，是<b>你自己规划、亲手构建、真刀真枪联调</b>出来的东西。
            它不完美——但它完整。这比完美更接近工程师这个词。
          </p>
          <p className="mt-3">
            毕业不是终点，是换一个起点：去改一个真实项目、去投出第一份简历、
            去把你脑子里那个「要是有个工具能……」的想法做出来。
            遇到卡壳时记得回来翻翻前面的课——它们会一直在。
          </p>
        </div>
        <p className="mt-5 text-sm font-semibold text-emerald-300">
          恭喜你，全栈之路正式启程。🚀 前方没有课程大纲了，但你有能力自己画一张。
        </p>
        <Link href="/curriculum" className="btn-primary mt-6 px-6 py-2.5">
          回到课程目录 · 再看一眼来时的路 🗺️
        </Link>
      </div>
    </>
  );
}
