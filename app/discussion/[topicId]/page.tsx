import Link from "next/link";
import { notFound } from "next/navigation";
import { getDiscussionTopic } from "../../../lib/api/discussion";
import { routes } from "../../../lib/constants/routes";
import { discussionContent } from "../../components/discussion/discussionContent";

export default async function DiscussionTopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const topic = await getDiscussionTopic(topicId);
  if (!topic) notFound();
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
      <div className="flex justify-end">
        <Link href={routes.discussion} className="rounded-full border theme-accent-border bg-black/40 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:theme-accent-bg-soft hover:theme-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 theme-accent-focus">← Back</Link>
      </div>
      <div className="text-white">
        {topic.subtitle ? <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.35em]">{topic.subtitle}</div> : null}
        <h1 className="mt-4 text-3xl font-semibold uppercase tracking-tight sm:text-5xl theme-accent">{topic.title}</h1>
      </div>
      {(() => {
        const ContentComponent = discussionContent[topic.componentName];
        return ContentComponent ? <ContentComponent /> : null;
      })()}
    </main>
  );
}
