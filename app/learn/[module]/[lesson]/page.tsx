import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { flatLiveLessons, getLesson, getModule } from "@/lib/curriculum";
import { REGISTRY } from "@/content/registry";
import LessonShell from "@/components/LessonShell";

export function generateStaticParams() {
  return flatLiveLessons().map(({ moduleId, slug }) => ({ module: moduleId, lesson: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}): Promise<Metadata> {
  const { module: moduleId, lesson: slug } = await params;
  const meta = getLesson(moduleId, slug);
  if (!meta) return {};
  return {
    title: `${meta.titleZh} · CodeCanvas 代码画布`,
    description: meta.summary,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}) {
  const { module: moduleId, lesson: slug } = await params;
  const mod = getModule(moduleId);
  const meta = getLesson(moduleId, slug);
  if (!mod || !meta || mod.status !== "live") notFound();

  const Content = REGISTRY[`${moduleId}/${slug}`];
  if (!Content) notFound();

  return (
    <LessonShell moduleId={moduleId} slug={slug}>
      <Content />
    </LessonShell>
  );
}
