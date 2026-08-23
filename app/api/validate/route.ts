import { NextResponse } from "next/server";
import { getChecksForLesson } from "@/lib/checks";

/**
 * POST /api/validate   { lessonId: string, code: string }
 *
 * 结课挑战的服务端校验接口。学习者的代码会真的从这里走一遍 HTTP 往返——
 * 这本身就是课程内容的一部分：在挑战页的「HTTP 检查器」里能看到这次请求。
 */
export async function POST(req: Request) {
  let payload: { lessonId?: unknown; code?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const lessonId = typeof payload.lessonId === "string" ? payload.lessonId : "";
  const code = typeof payload.code === "string" ? payload.code : "";

  const checks = getChecksForLesson(lessonId);
  if (!checks) {
    return NextResponse.json({ error: `unknown lessonId: ${lessonId}` }, { status: 404 });
  }

  // 人为延迟一点点，让学习者能在检查器里看到真实的网络往返
  await new Promise((r) => setTimeout(r, 250));

  const results = checks.map((c) => {
    let pass = false;
    try {
      pass = c.test(code);
    } catch {
      pass = false;
    }
    return { id: c.id, label: c.label, pass };
  });

  const passed = results.filter((r) => r.pass).length;

  return NextResponse.json({
    pass: passed === checks.length,
    passed,
    total: checks.length,
    results,
    server: "codecanvas-validator v1",
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    api: "codecanvas validate",
    usage: "POST { lessonId, code }",
  });
}
