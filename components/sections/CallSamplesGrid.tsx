"use client";

import { useState } from "react";
import { Entrance } from "@/components/ui/Entrance";
import { CallCard, type CallCardData } from "./CallCard";
import styles from "./CallSamples.module.css";

/**
 * Owns which card is currently playing so starting one stops any other —
 * each CallCard pauses itself once it's no longer the active index (see
 * CallCard.tsx), rather than this component reaching into sibling audio
 * elements directly.
 */
export function CallSamplesGrid({ calls }: { calls: CallCardData[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={styles.grid}>
      {calls.map((call, i) => (
        <Entrance key={call.title} delay={i * 60} as="div">
          <CallCard
            {...call}
            isActive={activeIndex === i}
            onActivate={() => setActiveIndex(i)}
            onEnded={() => setActiveIndex(null)}
          />
        </Entrance>
      ))}
    </div>
  );
}
