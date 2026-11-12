import type { ComponentType, ReactNode, SVGProps } from "react";
import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./SolutionWhyUs.module.css";

type WhyCard = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  src: string;
};

type SolutionWhyUsProps = {
  eyebrow?: string;
  heading: ReactNode;
  lead: string;
  cards: WhyCard[];
};

export function SolutionWhyUs({ eyebrow = "Why Vodex", heading, lead, cards }: SolutionWhyUsProps) {
  return (
    <section className={styles.section} aria-labelledby="why-us-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id="why-us-title" className={styles.title}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </Entrance>

        <div className={styles.grid}>
          {cards.map(({ title, description, Icon, src }, i) => (
            <Entrance key={title} delay={i * 70} as="article" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 1279px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>
                  <Icon />
                  {title}
                </h3>
                <p className={styles.description}>{description}</p>
              </div>
            </Entrance>
          ))}
        </div>
      </div>
    </section>
  );
}
