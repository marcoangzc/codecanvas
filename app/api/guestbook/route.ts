import { promises as fs } from "fs";
import path from "path";

/**
 * 留言板 API —— 模块 4 / 毕业挑战的真实后端。
 *
 * GET  /api/guestbook            → { count, messages }（新留言在前）
 * POST /api/guestbook {name,text} → 201 { ok:true, message }
 *
 * 数据落盘到 .data/guestbook.json（重启不丢）；
 * 写失败时静默退化为内存存储，不影响教学演示。
 * 响应带 CORS 头：演练场的预览 iframe 是沙箱源，需要允许跨源访问。
 */

type GuestMessage = { id: number; name: string; text: string; at: string };

const DATA_FILE = path.join(process.cwd(), ".data", "guestbook.json");

let cache: GuestMessage[] | null = null;
let nextId = 1;

const SEED: Omit<GuestMessage, "id">[] = [
  { name: "站长", text: "欢迎来到留言板！这是第一条留言，点击右上角演练场亲手发一条吧。", at: "2026-08-23T09:00:00.000Z" },
  { name: "小画", text: "我用 fetch 成功调通了 GET 接口，好激动 🎉", at: "2026-08-23T10:30:00.000Z" },
];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: CORS });
}

async function load(): Promise<GuestMessage[]> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as { messages?: GuestMessage[] };
    cache = Array.isArray(parsed.messages) ? parsed.messages : [];
  } catch {
    cache = SEED.map((m, i) => ({ id: i + 1, ...m }));
    void persist(cache);
  }
  nextId = cache.reduce((max, m) => Math.max(max, m.id), 0) + 1;
  return cache;
}

async function persist(messages: GuestMessage[]) {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ messages }, null, 2), "utf8");
  } catch {
    /* 只读文件系统等场景：退化为内存存储 */
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET() {
  const messages = await load();
  return json({ count: messages.length, messages });
}

export async function POST(req: Request) {
  let body: { name?: unknown; text?: unknown };
  try {
    body = (await req.json()) as { name?: unknown; text?: unknown };
  } catch {
    return json({ ok: false, error: "请求体不是合法 JSON，检查一下 Content-Type 头？" }, 400);
  }

  // 服务端永远不能信任客户端输入：类型、长度在这里统一把关
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) return json({ ok: false, error: "留言内容不能为空" }, 400);
  if (text.length > 200) return json({ ok: false, error: `留言太长了（${text.length}/200 字）` }, 400);
  if (name.length > 20) return json({ ok: false, error: `昵称太长了（${name.length}/20 字）` }, 400);

  const messages = await load();
  const message: GuestMessage = {
    id: nextId++,
    name: name || "匿名同学",
    text,
    at: new Date().toISOString(),
  };
  const updated = [message, ...messages];
  cache = updated;
  await persist(updated);
  return json({ ok: true, message }, 201);
}
