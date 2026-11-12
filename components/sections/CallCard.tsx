"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import agentAvatar from "@/public/assets/agent-avatar.png";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { CALL_SAMPLE_WAVEFORMS } from "@/lib/call-sample-waveforms";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import styles from "./CallCard.module.css";

export type CallCardData = {
  title: string;
  agent: string;
  quote: string;
  status: string;
  /** Audio file for this sample — see the note in CallSamples.tsx. */
  src: string;
};

type CallCardProps = CallCardData & {
  /** True when this card is the one CallSamplesGrid has designated active —
   * used to pause this card the moment a *different* card starts playing. */
  isActive: boolean;
  onActivate: () => void;
  onEnded: () => void;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function CallCard({
  title,
  agent,
  quote,
  status,
  src,
  isActive,
  onActivate,
  onEnded,
}: CallCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  // Waveform + duration are precomputed (scripts/waveform-peaks.mjs) so the
  // audio itself isn't fetched until the visitor presses Play.
  const precomputed = CALL_SAMPLE_WAVEFORMS[src];
  const waveformHeights = precomputed?.heights;
  const [duration, setDuration] = useState(precomputed?.duration ?? NaN);
  // Counts down while playing (duration - currentTime) rather than showing
  // a static total, per explicit user feedback that the label should be
  // dynamic and reflect the real time left to finish.
  const [remaining, setRemaining] = useState(precomputed?.duration ?? NaN);

  // A different card became active — stop this one. This, not a direct ref
  // into sibling cards, is what makes "starting one stops the other" work.
  useEffect(() => {
    if (!isActive) {
      audioRef.current?.pause();
    }
  }, [isActive]);

  // Swaps the precomputed duration for the element's own once metadata
  // arrives (after the first Play). Attached imperatively (rather than via the
  // onLoadedMetadata JSX prop) because the native event can fire before React
  // finishes attaching its listener — readyState is checked immediately in
  // case metadata already arrived by the time this effect runs. Remaining is
  // measured from currentTime, since a pre-load seek may have moved it.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const readDuration = () => {
      setDuration(audio.duration);
      setRemaining(Math.max(0, audio.duration - audio.currentTime));
    };
    if (audio.readyState >= 1) readDuration();
    audio.addEventListener("loadedmetadata", readDuration);
    return () => audio.removeEventListener("loadedmetadata", readDuration);
  }, []);

  // Smooth progress sweep while playing. Driven by rAF and written straight
  // to a CSS custom property (not React state), so the waveform animates
  // every frame without a re-render on each tick.
  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      const audio = audioRef.current;
      const wave = waveformRef.current;
      if (audio && wave && audio.duration) {
        wave.style.setProperty(
          "--progress",
          String(audio.currentTime / audio.duration),
        );
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      onActivate();
      void audio.play();
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const wave = waveformRef.current;
    // Before the first Play (preload="none") the element doesn't know its
    // duration yet — fall back to the precomputed one.
    const total = audio?.duration || duration;
    if (!audio || !wave || !total) return;
    const rect = wave.getBoundingClientRect();
    const fraction = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width),
    );
    audio.currentTime = fraction * total;
    wave.style.setProperty("--progress", String(fraction));
    setRemaining(Math.max(0, total * (1 - fraction)));
    if (!playing) {
      onActivate();
      void audio.play();
    }
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = event.currentTarget;
    if (audio.duration) {
      setRemaining(Math.max(0, audio.duration - audio.currentTime));
    }
  };

  const handleEnded = () => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = 0;
    waveformRef.current?.style.setProperty("--progress", "0");
    setRemaining(duration);
    onEnded();
  };

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.avatar}>
          <Image src={agentAvatar} alt="" width={48} height={48} />
        </span>
        <div className={styles.identity}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.meta}>
            <strong>{agent}</strong> · <span>AI voice agent</span>
          </p>
        </div>
        <button
          type="button"
          className={styles.playButton}
          aria-label={`${playing ? "Pause" : "Play"} ${title}`}
          aria-pressed={playing}
          onClick={handleToggle}
        >
          {playing ? (
            <PauseIcon key="pause" className={styles.icon} />
          ) : (
            <PlayIcon key="play" className={styles.icon} />
          )}
        </button>
      </div>

      <div className={styles.waveformRow}>
        <div
          ref={waveformRef}
          className={`${styles.waveformWrap} ${playing ? styles.playing : ""}`}
          onClick={handleSeek}
        >
          <AudioWaveform
            className={styles.waveformBase}
            heights={waveformHeights}
          />
          <AudioWaveform
            className={styles.waveformProgress}
            heights={waveformHeights}
          />
        </div>
        <span className={styles.time}>{formatTime(remaining)}</span>
      </div>

      <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>

      <div className={styles.status}>
        <span className={styles.statusDot} aria-hidden="true" />
        <span className={styles.statusText}>{status}</span>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="none"
        className={styles.audioEl}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </article>
  );
}
