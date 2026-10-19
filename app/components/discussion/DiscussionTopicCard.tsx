import Link from "next/link";
import type { DiscussionTopic } from "../../../lib/types/discussion";
import AnimPanning from "../gsap/AnimPanning";

export default function DiscussionTopicCard({ topic }: { topic: DiscussionTopic }) {
  return (
    <div className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white shadow-sm transition hover:-translate-y-0.5 theme-accent-border theme-accent-border-hover hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 theme-accent-focus">
      <Link href={`/discussion/${topic.id}`} className="block h-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <time className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">{topic.date}</time>
            <h2 className="mt-2 text-md font-semibold theme-accent">{topic.title}</h2>
            {topic.subtitle ? <p className="mt-1 text-sm text-white/65">{topic.subtitle}</p> : null}
          </div>
          <span aria-hidden="true" className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 transition group-hover:border-white/20 group-hover:text-white">View</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/72">{topic.description}</p>
      </Link>
    </div>
  );
}
