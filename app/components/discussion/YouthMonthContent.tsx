import Link from "next/link";

export default function FindingPeaceContent() {
  return (
    <div className="mt-3 max-w-4xl space-y-10 text-white">
      <section aria-labelledby="return-to-the-lord-title">
        {/* <h2 id="return-to-the-lord-title" className="text-xl font-semibold uppercase theme-accent sm:text-2xl">
          Return to the Lord with all your heart
        </h2> */}
        <ul className="list-disc pl-4 font-bold space-y-3 text-lg leading-7 text-white/78 marker:theme-accent uppercase">
          <li>Recognize GOD&apos;s wake-up call</li>
          <li>Repent and be restored</li>
          <li>Remember GOD is the immaculate victor</li>
        </ul>
      </section>
      <section aria-labelledby="jeremiah-17-9-title">
        <h2 id="jeremiah-17-9-title" className="text-xl font-semibold uppercase theme-accent sm:text-2xl">
          Jeremiah 17:9
        </h2>
        <p className="mt-5 space-y-3 text-base leading-7 text-white/78 marker:theme-accent">The heart is  more deceitful than anything else and is desperately sick; who can understand it? <Link href={`/web/JER/17`}><span className="theme-accent">(Jeremiah 17:9)</span></Link></p>
      </section>
      <section aria-labelledby="discussion-questions-title">
        <h2 id="discussion-questions-title" className="text-xl font-semibold uppercase theme-accent sm:text-2xl">
          Discussion questions
        </h2>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-base leading-7 text-white/78 marker:theme-accent">
          <li>In what area of your life might you be drifting away from GOD without realizing it? What might GOD be using to get your attention?</li>
          <li>What is the difference between simply feeling sorry for our sins and genuinely repenting? Is there something specific GOD is calling you to turn away from or surrender to Him?</li>
          <li>Knowing that GOD is our refuge and ultimate victor (Joel 3:16), how should this change the way you face your current struggles, fears, or uncertainties? What would it look like to trust Him more fully this week?</li>
        </ol>
      </section>
    </div>
  );
}
