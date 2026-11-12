import type { ReactNode } from "react";
import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./SolutionStatBand.module.css";

type Stat = {
  number: string;
  label: string;
};

type SolutionStatBandProps = {
  bgImage: Parameters<typeof Image>[0]["src"];
  stats: Stat[];
  /** Optional source line under the band (e.g. a case-study link). */
  caption?: ReactNode;
};

export function SolutionStatBand({ bgImage, stats, caption }: SolutionStatBandProps) {
  return (
    <section className={styles.section} aria-label="Results at a glance">
      <div className="container">
        <Entrance className={styles.banner}>
          <Image src={bgImage} alt="" fill sizes="1327px" className={styles.bg} />
          <div className={styles.grid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <p className={styles.statNumber}>{stat.number}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </Entrance>
        {caption ? (
          <Entrance delay={90}>
            <p className={styles.caption}>{caption}</p>
          </Entrance>
        ) : null}
      </div>
    </section>
  );
}
