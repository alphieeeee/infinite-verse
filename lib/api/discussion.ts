import type { DiscussionTopic } from "../types/discussion";

const discussionTopics: DiscussionTopic[] = [
  {
    id: "return-to-the-lord-with-all-your-heart",
    date: "October 19, 2026",
    title: "Return To The Lord With All Your Heart",
    subtitle: "Looking for a way back to God",
    description: "",
    componentName: "youth-month-content"
  },
  // {
  //   id: "learning-to-forgive",
  //   date: "October 12, 2026",
  //   title: "Learning to forgive",
  //   subtitle: "The courage to begin again",
  //   description: "Explore how Scripture frames forgiveness, restoration, and the courage to begin again.",
  //   componentName: "learning-to-forgive"
  // },
  // {
  //   id: "living-with-purpose",
  //   date: "October 5, 2026",
  //   title: "Living with purpose",
  //   subtitle: "Small choices, lasting direction",
  //   description: "Consider the small, faithful choices that shape a life directed toward what matters most.",
  //   componentName: "living-with-purpose"
  // },
  // {
  //   id: "practicing-gratitude",
  //   date: "September 28, 2026",
  //   title: "Practicing gratitude",
  //   subtitle: "Noticing the goodness around us",
  //   description: "Use a few quiet moments to notice goodness and cultivate a thankful perspective.",
  //   componentName: "practicing-gratitude"
  // },
];

export async function getDiscussionTopics() { return discussionTopics; }
export async function getDiscussionTopic(topicId: string) { return discussionTopics.find((topic) => topic.id === topicId) ?? null; }
