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

export const CAPSTONE_CHECKS: Check[] = [
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

const REGISTRY: Record<string, Check[]> = {
  "m1/capstone": CAPSTONE_CHECKS,
};

export function getChecksForLesson(lessonId: string): Check[] | undefined {
  return REGISTRY[lessonId];
}
