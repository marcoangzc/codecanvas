import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";
import WebJourney from "@/components/interactives/WebJourney";

export default function Lesson() {
  return (
    <>
      <p>
        你每天打开几十次网页：查资料、看视频、刷社交……但有没有想过，
        从敲下回车到页面出现在眼前，中间那零点几秒里发生了什么？
        这一课，我们把这段旅程「慢放」给你看。
      </p>
      <p>先认识三位主角：</p>
      <ul>
        <li>
          <Term en="Client">客户端</Term>：你的浏览器。它负责「要东西」和「展示东西」。
        </li>
        <li>
          <Term en="Server">服务器</Term>：一台常年不关机的电脑。网站的文件都住在那里，负责「给东西」。
        </li>
        <li>
          <Term en="DNS">DNS 服务器</Term>：互联网的电话簿，负责把好记的域名翻译成机器用的 IP 地址。
        </li>
      </ul>

      <p>现在，点击「下一步」，跟着一个请求走完它的完整一生：</p>
      <WebJourney />

      <h2>几个你会反复遇到的关键词</h2>
      <ul>
        <li>
          <Term en="URL">网址</Term>：统一资源定位符。协议 + 域名 + 路径，就像「快递方式 + 城市 + 门牌号」。
        </li>
        <li>
          <Term en="HTTP / HTTPS">超文本传输协议</Term>：浏览器和服务器说话的「规矩」。
          结尾多出来的 S 代表 Secure——内容全程加密，所以输密码一定要认准 https。
        </li>
        <li>
          <Term en="Status Code">状态码</Term>：服务器的回执。
          <code>200</code> 成功、<code>404</code> 页面不存在、<code>500</code> 服务器出错了。
        </li>
      </ul>

      <Callout variant="tip" title="一个生活化的类比">
        整个过程像点外卖：你在 App 下单（发送请求）→ 平台先查商家地址（DNS）→
        骑手到店取餐（请求到达服务器）→ 商家打包交给你（响应返回 HTML）→
        你拆开包装摆盘上桌（浏览器渲染）。每一环都有可能出错——对应的就是各种状态码。
      </Callout>

      <Callout variant="deep" title="前端与后端的分界线">
        刚才的故事里，「要东西」的浏览器一侧就是<b>前端（Front-end）</b>的工作范围；
        「给东西」的服务器一侧就是<b>后端（Back-end）</b>。
        而能同时搞定两边的人，就是我们这趟旅程的目的地——<b>全栈工程师（Full-Stack Developer）</b>。
        本课程的模块 1–3 主攻前端，模块 4–6 带你走向后端与全栈。
      </Callout>

      <Quiz
        questions={[
          {
            q: "当你访问 example.com 时，DNS 的作用是什么？",
            options: [
              "把域名翻译成 IP 地址",
              "存储网站的 HTML 文件",
              "加密浏览器与服务器之间的通信",
              "给网页画上样式"],
            answer: 0,
            explain:
              "DNS 是「电话簿」：域名给人看，IP 地址给机器用，DNS 负责两者之间的翻译。存文件的是网站服务器。",
          },
          {
            q: "服务器返回状态码 404，意味着什么？",
            options: ["一切正常，页面马上加载", "请求的页面不存在", "服务器内部出错", "你的网断了"],
            answer: 1,
            explain:
              "404 = Not Found，地址对了但那个页面不存在（或已被删除）。500 才是服务器自己出了错。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "三个主角：<b>浏览器（客户端）→ DNS → 服务器</b>。",
          "流程：输入 URL → DNS 查 IP → 发送 HTTP 请求 → 返回响应（200 OK + HTML）→ 浏览器解析渲染。",
          "HTTPS = HTTP + 加密；状态码是服务器的回执：<b>200</b> 成功、<b>404</b> 不存在、<b>500</b> 出错。",
          "前端管「要与展示」，后端管「处理与给」——这就是全栈的两端。",
        ]}
      />
    </>
  );
}
