import Term from "@/components/Term";
import Callout from "@/components/Callout";
import KeyPoints from "@/components/KeyPoints";
import Quiz from "@/components/Quiz";

export default function Lesson() {
  return (
    <>
      <p>
        前两课的数据都方方正正：每本书不多不少正好五个字段。但现实中的数据常常「缺胳膊少腿」——
        商品有的带颜色尺码、有的只标重量；一篇笔记可能没有评论，也可能有几百条嵌套回复。
        硬塞进固定列数的表格里，就会收获一大片空格子。
        于是数据库世界还有另一大流派：<Term en="NoSQL">NoSQL</Term>——字面意思是「不只是 SQL」，
        下面快速见识它最有名的成员：<Term en="Document Database">文档数据库</Term>。
      </p>

      <h2>一条数据，就是一个 JSON 文档</h2>
      <p>
        文档数据库（代表选手 MongoDB）不再按行列切分数据，而是把一个完整的业务对象
        连同它的全部结构，存成一个<Term en="Document">文档</Term>——长得就像你模块 2 就认识的 JSON：
      </p>
      <pre className="codeblock">{`{
  "_id": "bk-002",                  ← 主键还在，只是换了名字
  "title": "三体",
  "author": "刘慈欣",
  "tags": ["科幻", "雨果奖"],        ← 数组直接放，不用另开一张表
  "reviews": [                      ← 嵌套结构也整块塞进来
    { "user": "小林", "stars": 5 },
    { "user": "阿黄", "stars": 4 }
  ]
}`}</pre>
      <p>
        直觉对比：<b>表格像档案柜</b>——每人一张统一格式的登记卡；
        <b>文档像牛皮纸袋</b>——东西全装进一个袋子，袋子和袋子可以长得完全不一样。
        想给某本书加个「译者」字段？改自己那份文档就行，别的书毫发无损。
      </p>

      <h2>两派怎么选？</h2>
      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/[0.06] p-5">
          <div className="font-bold text-white">🗄️ SQL 关系型</div>
          <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-300">
            <li>· 数据拆进多张表，用 JOIN 现场拼装</li>
            <li>· 先设计好表结构，再往里填数据</li>
            <li>· 强项：一致性、复杂查询、统计汇总</li>
            <li>· 典型场景：订单、账务、用户系统</li>
          </ul>
        </div>
        <div className="rounded-xl border border-sky-500/30 bg-sky-500/[0.06] p-5">
          <div className="font-bold text-white">📄 文档型 NoSQL</div>
          <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-300">
            <li>· 一个业务对象聚成一个 JSON 文档</li>
            <li>· 边存边长新字段，结构灵活</li>
            <li>· 强项：读写直白、原型迭代飞快</li>
            <li>· 典型场景：内容管理、商品目录、日志</li>
          </ul>
        </div>
      </div>
      <Callout variant="info" title="这不是一场必须站队的战争">
        很多真实系统两个一起用：核心账目走 SQL 保一致，动态内容和日志走文档求灵活。
        对初学者来说，先把关系型学扎实永远是性价比最高的路线——
        主键、外键、去重这些<b>建模思维</b>，换到任何数据库都通用。
      </Callout>

      <Quiz
        questions={[
          {
            q: "文档数据库里的一条「书」数据长什么样？",
            options: [
              "一行固定列数的表格记录",
              "一个自带结构的 JSON 文档，字段可以随需增减",
              "一张压缩图片",
              "一段 URL 链接"],
            answer: 1,
            explain:
              "文档 = 自带结构的 JSON：数组、嵌套对象都能整块存放，每条文档的结构还可以各不相同。",
          },
          {
            q: "商品目录里每个商品的属性都不太一样，哪种存储方式更省心？",
            options: [
              "表格：给所有可能的属性各建一列，没值的留空",
              "文档数据库：每个商品存自己的结构，缺什么就不写什么",
              "只能存成纯文本文件",
              "把属性全拼成一个长字符串塞进备注列"],
            answer: 1,
            explain:
              "属性差异大的场景正是文档的舒适区；硬上表格会得到一堆空列和频繁的改表操作。",
          },
        ]}
      />

      <KeyPoints
        points={[
          "NoSQL = 「不只是 SQL」，最常见的是<b>文档数据库</b>（如 MongoDB）。",
          "文档 = 一条自带结构的 JSON：数组、嵌套随便放，一条业务对象一个文档。",
          "表格 vs 文档：<b>先定结构</b>与<b>灵活多变</b>之别，不分优劣、看场景选。",
          "很多系统两者并用；SQL 的建模思维到哪里都值钱。",
        ]}
      />
    </>
  );
}
