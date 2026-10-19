import PageHero from "../components/hero/PageHero";
import DiscussionTopicCard from "../components/discussion/DiscussionTopicCard";
import { getDiscussionTopics } from "../../lib/api/discussion";
import AnimPanning from "../components/gsap/AnimPanning";

export const metadata = { title: "Discussion", description: "Explore thoughtful discussion topics inspired by Scripture." };

export default async function DiscussionPage() {
  const topics = await getDiscussionTopics();
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
      {/* <PageHero eyebrow="Make room for reflection" title="Discussion" description="Explore thoughtful topics, reflect on Scripture, and make space for a deeper conversation." /> */}
      <section aria-labelledby="discussion-topics-title" className="space-y-5">
        {/* <div><p className="text-sm font-semibold uppercase tracking-[0.32em] theme-accent-soft">Choose a topic</p><h1 id="discussion-topics-title" className="sr-only">Discussion topics</h1></div> */}
        <div className="grid gap-4 grid-cols-1">
          {topics.map((topic, index) => (
          <AnimPanning
            key={topic.id}
            duration={0.8}
            delay={0.2 + (0.1 * index)}
            direction="up"
            from={0} to={0}
            fade="in"
            animOnce={true}
            onScroll={false}
          >
            <DiscussionTopicCard  topic={topic} />
          </AnimPanning>
          ))}
        </div>
      </section>
    </main>
  );
}
