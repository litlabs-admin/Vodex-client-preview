import { Entrance } from "@/components/ui/Entrance";
import shared from "./DcSection.module.css";
import styles from "./DcHowItWorks.module.css";

const STEPS = [
  {
    title: "Connect your accounts",
    description: "Upload a CSV, or connect your collections platform by API.",
  },
  {
    title: "Set your rules",
    description: "Scripts, offers, call windows and escalation paths, approved by your team.",
  },
  {
    title: "Launch campaigns",
    description: "Reminders, promise-to-pay follow-ups and automatic redial of missed calls.",
  },
  {
    title: "Sync the outcomes",
    description: "Dispositions, transcripts and promises go back to your system of record.",
  },
];

export function DcHowItWorks() {
  return (
    <section
      id="how"
      className={`${shared.section} ${shared.dark}`}
      aria-labelledby="dc-how-title"
    >
      <div className="container">
        <Entrance className={shared.header}>
          <p className={shared.eyebrow}>How it works</p>
          <h2 id="dc-how-title" className={shared.title}>
            From account list to <span className="accent">live calls</span> in weeks.
          </h2>
          <p className={shared.lead}>Start with a file. Add integrations when you are ready.</p>
        </Entrance>

        <div className={styles.band}>
          {/* Decorative progress rail — draws left-to-right as the row scrolls in. */}
          <span className={styles.rail} aria-hidden="true" />
          <ol className={styles.steps}>
            {STEPS.map(({ title, description }, i) => (
              <Entrance key={title} as="li" delay={i * 70} className={styles.step}>
                <span className={styles.number} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDescription}>{description}</p>
              </Entrance>
            ))}
          </ol>
        </div>

        <Entrance delay={120}>
          <p className={styles.pilot}>
            <strong>CSV pilot in 1 to 3 weeks.</strong> Full API and dialer integration in 4 to
            8 weeks.
          </p>
        </Entrance>
      </div>
    </section>
  );
}
