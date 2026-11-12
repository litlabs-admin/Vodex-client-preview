import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { Entrance } from "@/components/ui/Entrance";
import {
  ArrowRight,
  HandshakeIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@/components/ui/icons";
import shared from "./DcSection.module.css";
import styles from "./DcWorkflowCards.module.css";

type Workflow = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const WORKFLOWS: Workflow[] = [
  {
    title: "Payment reminders",
    description: "Friendly nudges before and after the due date, on the schedule you set.",
    linkLabel: "See payment reminders",
    href: "/solutions/payment-reminders",
    Icon: PhoneCallIcon,
  },
  {
    title: "Promise-to-pay capture",
    description: "Commit the borrower to a date on the call and log it straight to your system.",
    linkLabel: "See promise-to-pay",
    href: "/solutions/promise-to-pay",
    Icon: HandshakeIcon,
  },
  {
    title: "Right party contact",
    description: "Verify who is on the line before any account detail is shared.",
    linkLabel: "Ask us how",
    href: "#book",
    Icon: UserIcon,
  },
  {
    title: "Dispute and hardship triage",
    description: "Flag disputes and hardship, then hand off to a person with the full call attached.",
    linkLabel: "Hear a handoff",
    href: "#hear",
    Icon: ShieldCheckIcon,
  },
];

export function DcWorkflowCards() {
  return (
    <section className={shared.section} aria-labelledby="dc-workflows-title">
      <div className="container">
        <Entrance className={shared.header}>
          <p className={shared.eyebrow}>What the agents do</p>
          <h2 id="dc-workflows-title" className={shared.title}>
            Four workflows that move <span className="accent">recovery</span>.
          </h2>
        </Entrance>

        <div className={styles.grid}>
          {WORKFLOWS.map(({ title, description, linkLabel, href, Icon }, i) => {
            const isAnchor = href.startsWith("#");
            const content = (
              <>
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon />
                </span>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <span className={styles.link}>
                  {linkLabel}
                  <ArrowRight className={styles.arrow} aria-hidden="true" />
                </span>
              </>
            );
            return (
              // Outer Entrance owns the reveal animation; the hover lift lives
              // on the inner link so the two transforms never fight (same split
              // as SolutionSecurity / InitiateCallForm).
              <Entrance key={title} delay={i * 70} className={styles.cell}>
                {isAnchor ? (
                  <a href={href} className={styles.card}>
                    {content}
                  </a>
                ) : (
                  <Link href={href} className={styles.card}>
                    {content}
                  </Link>
                )}
              </Entrance>
            );
          })}
        </div>
      </div>
    </section>
  );
}
