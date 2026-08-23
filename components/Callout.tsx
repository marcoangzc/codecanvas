import type { ReactNode } from "react";

const STYLES = {
  tip: { icon: "💡", label: "小贴士", cls: "border-emerald-500/30 bg-emerald-500/[0.07]" },
  warn: { icon: "⚠️", label: "注意", cls: "border-amber-500/30 bg-amber-500/[0.07]" },
  info: { icon: "ℹ️", label: "补充", cls: "border-sky-500/30 bg-sky-500/[0.07]" },
  deep: { icon: "🔬", label: "深入一点", cls: "border-violet-500/30 bg-violet-500/[0.07]" },
} as const;

export default function Callout({
  variant = "tip",
  title,
  children,
}: {
  variant?: keyof typeof STYLES;
  title?: string;
  children: ReactNode;
}) {
  const s = STYLES[variant];
  return (
    <div className={`my-6 rounded-xl border p-4 ${s.cls}`}>
      <div className="mb-1 flex items-center gap-2 text-sm font-bold text-white">
        <span>{s.icon}</span>
        <span>{title ?? s.label}</span>
      </div>
      <div className="text-sm leading-6 text-slate-300 [&_p]:mb-0 [&_code]:text-inherit">
        {children}
      </div>
    </div>
  );
}
