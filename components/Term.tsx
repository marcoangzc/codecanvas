import type { ReactNode } from "react";

/** 双语术语：中文为主，英文以虚线小标签跟在后面 */
export default function Term({ children, en }: { children: ReactNode; en: string }) {
  return (
    <span className="font-semibold text-white">
      {children}
      <span className="term-en">{en}</span>
    </span>
  );
}
