import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";

export default function Lesson() {
  return (
    <>
      <p>
        你每天都会经历这个动作：打开网站 → 输入账号密码 → 之后好几天都不用再登录。
        听起来天经地义，但用前几课的知识一想就会发现矛盾：
        HTTP 的每个请求都是独立的，服务器凭什么「记得」你登录过？
      </p>

      <h2>HTTP 天生没有记忆</h2>
      <p>
        HTTP 是<Term en="Stateless">无状态</Term>协议：服务器处理完一个请求，
        立刻把它忘掉。下一个请求进来——哪怕还是同一台设备同一秒发的——
        在服务器眼里都是一个彻头彻尾的陌生人。
      </p>
      <p>
        这个设计让服务器轻装上阵（不用记住海量连接，随便换机器处理都行），
        却带来一个现实问题：<b>总不能每点一个按钮就输一次密码吧？</b>
        于是需要一个约定，让服务器能认出「这串请求来自同一个人」——这就是
        <Term en="Authentication">鉴权</Term>要解决的事。
      </p>

      <h2>Cookie + Session：健身房的手环 🎫</h2>
      <p>
        最经典的方案像健身房的会员系统：前台登记你的信息，发你一只手环；
        之后每次进店不用报姓名，刷手环就能对上号。
      </p>
      <div className="my-6 space-y-2.5">
        {[
          "① 登录：你在页面提交账号密码，浏览器发出 POST /api/login。",
          "② 核对：服务器查库验证无误，创建一份 Session（会话记录）：「编号 abc123 → 用户王小码」，存在服务器这边。",
          "③ 发牌：服务器在响应头里写上 Set-Cookie: session=abc123，把编号发给浏览器。",
          "④ 随身携带：浏览器自动保存这条 Cookie，之后向本站的每个请求都自动带上它——不用你写一行代码。",
          "⑤ 认人：服务器收到请求，从 Cookie 里取出 abc123，一查会话记录：「哦，是王小码！」放行。",
        ].map((s) => (
          <div
            key={s}
            className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm leading-6 text-slate-300"
          >
            {s}
          </div>
        ))}
      </div>
      <Callout variant="tip" title="为什么第 ④ 步特别省心">
        Cookie 由浏览器自动管理：设置、携带、过期，全都不需要前端代码参与。
        上一课拆请求头时提到的那个神秘乘客——<code>Cookie: session=abc123</code>，
        就是这么混进去的。
      </Callout>

      <h2>Token / JWT：签名过的身份证 💳</h2>
      <p>
        另一种主流思路是不在服务器存记录，直接把身份证明<b>发给你随身带着</b>——这就是
        <Term en="Token">令牌</Term>方案，代表人物是 JWT（JSON Web Token）。
        一句话直觉：<b>JWT 就是一张带防伪签名的身份证</b>：
      </p>
      <ul>
        <li>卡面明文写着你是谁（用户 id、有效期等），谁都能读；</li>
        <li>但卡上有官方签名，改一个字签名就对不上，立刻穿帮。</li>
      </ul>
      <p>
        服务器验签即可放行，<b>不需要查会话记录</b>——这让 Token 特别适合 App、
        小程序和跨服务的场景。
      </p>

      <div className="my-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900 text-left text-slate-200">
              <th className="px-4 py-2.5 font-semibold">对比</th>
              <th className="px-4 py-2.5 font-semibold">🎫 Cookie + Session</th>
              <th className="px-4 py-2.5 font-semibold">💳 Token / JWT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            <tr>
              <td className="px-4 py-2.5 text-slate-400">凭证放在哪</td>
              <td className="px-4 py-2.5">浏览器 Cookie 里自动携带</td>
              <td className="px-4 py-2.5">客户端自己存，请求头 Authorization 带上</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-slate-400">服务器要存记录吗</td>
              <td className="px-4 py-2.5">要（内存或数据库里存会话）</td>
              <td className="px-4 py-2.5">不要，验签即知身份</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-slate-400">类比</td>
              <td className="px-4 py-2.5">健身房手环（店里留了你的档案）</td>
              <td className="px-4 py-2.5">签名身份证（信息都在卡上）</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-slate-400">适合场景</td>
              <td className="px-4 py-2.5">同一个网站的网页应用</td>
              <td className="px-4 py-2.5">App、小程序、微服务之间调用</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>密码永远只存哈希 🔒</h2>
      <p>
        不管用哪种方案，起点都是用户交出的密码。<b>数据库里绝对不能存密码明文</b>——
        一旦被拖库，所有用户的密码当场泄露（而大家到处都在复用密码）。
      </p>
      <p>
        正确做法是用专门的哈希函数（如 <Term en="Hash">加盐慢哈希</Term>算法 <code>bcrypt</code>）：
        单向、不可逆、慢得刚刚好，并自动加盐让相同密码得到不同结果：
      </p>
      <pre className="codeblock">{`// 注册时：存的是哈希，不是密码本身
const hash = await bcrypt.hash(password, 10);
await db.saveUser({ email, passwordHash: hash });

// 登录时：把你输入的密码再走一遍同样的流程去比对
const ok = await bcrypt.compare(inputPassword, user.passwordHash);`}</pre>
      <Callout variant="warn" title="一个自保小技巧">
        正因为哈希不可逆，正经网站<b>永远无法「告诉」你原密码</b>，只能让你重置。
        如果哪个网站找回密码时直接把原密码发给你——说明它存了明文，快跑，并且以后别再用这个密码。
      </Callout>

      <Quiz
        questions={[
          {
            q: "为什么需要 Cookie / Session 这套机制？",
            options: [
              "因为 HTTP 传输速度太慢",
              "因为 HTTP 无状态，服务器处理完请求就忘了你是谁",
              "因为 JSON 不能传输中文",
              "为了防止图片盗链"],
            answer: 1,
            explain:
              "无状态让服务器高效，但也意味着「保持登录」必须靠额外约定：Session 存在服务器，Cookie 让浏览器每次自动出示凭证。",
          },
          {
            q: "网站数据库不幸被拖库，哪种密码存储方式能保护用户？",
            options: [
              "密码倒序存储，增加破解难度",
              "Base64 编码后存储",
              "用 bcrypt 加盐哈希存储",
              "加密后存在 Excel 表格里"],
            answer: 2,
            explain:
              "倒序和 Base64 都能瞬间还原，等于没防；bcrypt 是单向不可逆的慢哈希且自带盐值，攻击者只能拿到一堆算不回原文的乱码。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "HTTP <b>无状态</b>：每个请求都是陌生人，所以需要鉴权机制维持身份。",
          "<b>Cookie + Session 五步</b>：提交凭证 → 服务器存会话 → Set-Cookie 发编号 → 浏览器自动携带 → 查会话认人。",
          "<b>JWT = 签名过的身份证</b>：信息写在令牌上，验签即可，服务器无需存会话。",
          "两者取舍：同域网页常用 Cookie+Session，App 与服务间调用常用 Token。",
          "密码<b>只存 bcrypt 加盐哈希</b>，绝不存明文；能「找回」原密码的网站必有问题。",
        ]}
      />
    </>
  );
}
