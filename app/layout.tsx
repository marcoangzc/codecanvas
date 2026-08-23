import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CodeCanvas 代码画布 · 可视化学全栈",
  description:
    "0 基础到进阶的全栈开发可视化课程：动画概念图、实时代码演练场、分步交互讲解、进度与成就系统。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col">
        <ProgressProvider>
          <NavBar />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-slate-800 py-8 text-center text-xs leading-5 text-slate-500">
            CodeCanvas · 代码画布 —— 用看得见的方式学全栈
            <br />
            灵感致敬 freeCodeCamp · 本地进度保存在你的浏览器里
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
}
