"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon } from "./icons";
import { COUNTRIES, type Country } from "@/lib/countries";
import styles from "./DialCodeSelect.module.css";

type DialCodeSelectProps = {
  /** ISO alpha-2 of the selected country, e.g. "US". */
  value: string;
  onChange: (iso2: string) => void;
  onBlur?: () => void;
  className?: string;
};

/** Regional-indicator flag emoji derived from an ISO alpha-2 code — no flag
 * assets needed, since `Country` only carries `iso2`. */
function flagEmoji(iso2: string): string {
  return iso2
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65));
}

/**
 * Dark-surface twin of `Select.tsx`, copy-adapted rather than given a `tone`
 * prop — the trigger's content (flag + dial code, no floating label) is
 * materially different, not just a colour swap. Same interaction mechanics:
 * outside-click close, open-effect that focuses the search input, full
 * arrow/Home/End/Enter/Escape keyboard support. Two deliberate improvements
 * over `Select` for this "phone country code" use case: search matches the
 * dial code too (not just the name), and the trigger/options both show the
 * flag so the whole control reads as a real phone-number picker rather than
 * a generic dropdown.
 */
export function DialCodeSelect({ value, onChange, onBlur, className }: DialCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const selected: Country = useMemo(
    () => COUNTRIES.find((c) => c.iso2 === value) ?? COUNTRIES[0],
    [value],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    const qDial = q.replace(/^\+/, "");
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.replace("+", "").includes(qDial),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(Math.max(0, COUNTRIES.findIndex((c) => c.iso2 === value)));
      requestAnimationFrame(() => searchRef.current?.focus());
    } else {
      onBlur?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function selectCountry(c: Country) {
    onChange(c.iso2);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function handleListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(filtered.length - 1);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const c = filtered[activeIndex];
      if (c) selectCountry(c);
    }
  }

  return (
    <div className={className} ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code, ${selected.name} ${selected.dial}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className={styles.flag} aria-hidden="true">{flagEmoji(selected.iso2)}</span>
        <span className={styles.dial}>{selected.dial}</span>
        <ChevronDownIcon className={styles.chevron} data-open={open} />
      </button>

      <div className={styles.panel} data-open={open} role="presentation">
        <div className={styles.searchWrap}>
          <SearchIcon className={styles.searchIcon} />
          <input
            ref={searchRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search country or code..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleListKeyDown}
            aria-label="Search country or dial code"
          />
        </div>
        <ul className={styles.list} role="listbox" aria-labelledby={id}>
          {filtered.length === 0 && <li className={styles.empty}>No matches</li>}
          {filtered.map((c, i) => (
            <li key={c.iso2}>
              <button
                type="button"
                role="option"
                aria-selected={c.iso2 === selected.iso2}
                className={styles.option}
                data-active={i === activeIndex}
                data-selected={c.iso2 === selected.iso2}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => selectCountry(c)}
              >
                <span className={styles.optionLeft}>
                  <span aria-hidden="true">{flagEmoji(c.iso2)}</span>
                  <span>{c.name}</span>
                </span>
                {c.iso2 === selected.iso2 ? (
                  <CheckIcon width={14} height={14} />
                ) : (
                  <span className={styles.optionDial}>{c.dial}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
