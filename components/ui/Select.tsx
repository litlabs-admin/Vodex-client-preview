"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon } from "./icons";
import styles from "./Select.module.css";

export type SelectOption = {
  value: string;
  label: string;
  meta?: string;
  /** Shorter text shown in the closed trigger (defaults to `label`). */
  triggerLabel?: string;
};

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: SelectOption[];
  required?: boolean;
  error?: string;
  touched?: boolean;
  className?: string;
};

/**
 * This project's first click/keyboard-driven listbox popover — the existing
 * mega menus (Solutions/Resources/Company) are hover-only, and IndustryTabs/
 * FaqTopics are tab-lists, neither fits a form control. Trigger shares the
 * same notched field chrome as FloatingField (via CSS Modules `composes`).
 */
export function Select({
  label,
  value,
  onChange,
  onBlur,
  options,
  required,
  error,
  touched,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const errorId = `${id}-error`;

  const selected = options.find((o) => o.value === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const invalid = Boolean(touched && error);

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
      setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
      requestAnimationFrame(() => searchRef.current?.focus());
    } else {
      onBlur?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function selectOption(opt: SelectOption) {
    onChange(opt.value);
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
      const opt = filtered[activeIndex];
      if (opt) selectOption(opt);
    }
  }

  return (
    <div className={className} ref={wrapRef}>
      <div className={styles.wrap}>
        <button
          ref={triggerRef}
          type="button"
          id={id}
          className={styles.trigger}
          data-focused={open}
          data-invalid={invalid}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-describedby={invalid ? errorId : undefined}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className={styles.label} data-float={open || Boolean(selected)}>
            {label}
            {required ? " *" : ""}
          </span>
          <span className={styles.value}>{selected?.triggerLabel ?? selected?.label ?? ""}</span>
          <ChevronDownIcon className={styles.chevron} data-open={open} />
        </button>

        <div className={styles.panel} data-open={open} role="presentation">
          <div className={styles.searchWrap}>
            <SearchIcon className={styles.searchIcon} />
            <input
              ref={searchRef}
              type="text"
              className={styles.searchInput}
              placeholder={`Search ${label.toLowerCase()}...`}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleListKeyDown}
              aria-label={`Search ${label}`}
            />
          </div>
          <ul className={styles.list} role="listbox" aria-labelledby={id}>
            {filtered.length === 0 && <li className={styles.empty}>No matches</li>}
            {filtered.map((opt, i) => (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  className={styles.option}
                  data-active={i === activeIndex}
                  data-selected={opt.value === value}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => selectOption(opt)}
                >
                  <span>{opt.label}</span>
                  {opt.value === value ? (
                    <CheckIcon width={14} height={14} />
                  ) : opt.meta ? (
                    <span className={styles.dial}>{opt.meta}</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {invalid && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
