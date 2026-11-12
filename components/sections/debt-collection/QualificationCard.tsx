"use client";

import { useEffect, useRef, useState } from "react";
import { FloatingField } from "@/components/ui/FloatingField";
import { Select, type SelectOption } from "@/components/ui/Select";
import { ArrowRight, CheckIcon } from "@/components/ui/icons";
import { pushDataLayer } from "@/lib/analytics";
import { MEETING_EMBED_URL as MEETING_SRC } from "@/lib/links";
import { DC_QUALIFY_FORM_ID, submitHubspotForm } from "@/lib/hubspot";
import { PORTFOLIO_EVENT, PORTFOLIO_OPTIONS, type PortfolioValue } from "@/lib/portfolio";
import styles from "./QualificationCard.module.css";

type FieldName = "who" | "size" | "timing" | "name" | "company" | "email";
type Values = Record<FieldName, string>;
type Pane = "form" | "sched" | "res";

const FIELD_ORDER: FieldName[] = ["who", "size", "timing", "name", "company", "email"];
const INITIAL: Values = { who: "", size: "", timing: "", name: "", company: "", email: "" };
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const WHO_OPTIONS: SelectOption[] = PORTFOLIO_OPTIONS.map((o) => ({ value: o.value, label: o.label }));
const SIZE_OPTIONS: SelectOption[] = [
  { value: "lt1k", label: "Under 1,000" },
  { value: "1k-10k", label: "1,000 to 10,000" },
  { value: "10k-100k", label: "10,000 to 100,000" },
  { value: "gt100k", label: "More than 100,000" },
];
const TIMING_OPTIONS: SelectOption[] = [
  { value: "90d", label: "Within 90 days" },
  { value: "evaluating", label: "Evaluating options" },
  { value: "researching", label: "Just researching" },
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(v: Values): Partial<Record<FieldName, string>> {
  const e: Partial<Record<FieldName, string>> = {};
  if (!v.who) e.who = "Select what you collect.";
  if (!v.size) e.size = "Select a range.";
  if (!v.timing) e.timing = "Select a timeframe.";
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!v.company.trim()) e.company = "Enter your company.";
  if (!v.email.trim()) e.email = "Enter your work email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid work email.";
  return e;
}

/** Client's routing rule: non-fits get a resource pane instead of the scheduler. */
function isFit(v: Values): boolean {
  return v.who !== "other" && v.timing !== "researching";
}

/**
 * "Book a 20-minute demo" card: 3 qualifying questions + contact details,
 * then either the HubSpot scheduler (prefilled) or a polite resource pane.
 * HubSpot submission is wired but dormant until DC_QUALIFY_FORM_ID is set
 * in lib/hubspot.ts; every submit is pushed to dataLayer regardless.
 */
export function QualificationCard() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [pane, setPane] = useState<Pane>("form");
  const [submitting, setSubmitting] = useState(false);
  const [shakeField, setShakeField] = useState<FieldName | null>(null);
  const [flashWho, setFlashWho] = useState(0);
  const [schedUrl, setSchedUrl] = useState(MEETING_SRC);
  const [honeypot, setHoneypot] = useState("");

  const context = useRef<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLDivElement | null>>>({});
  const firstRender = useRef(true);

  const errors = validate(values);

  // UTM + referrer captured once, sent with the HubSpot submission.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const ctx: Record<string, string> = { referrer: document.referrer || "" };
    for (const k of UTM_KEYS) ctx[k] = q.get(k) ?? "";
    context.current = ctx;
  }, []);

  // Hero chips / portfolio cards preselect "What do you collect?".
  useEffect(() => {
    function onSelect(e: Event) {
      const value = (e as CustomEvent<PortfolioValue>).detail;
      setValues((v) => ({ ...v, who: value }));
      setPane("form");
      setFlashWho((n) => n + 1);
    }
    window.addEventListener(PORTFOLIO_EVENT, onSelect);
    return () => window.removeEventListener(PORTFOLIO_EVENT, onSelect);
  }, []);

  // Announce pane changes: move focus to the new pane's heading.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [pane]);

  function setValue(field: FieldName, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function touch(field: FieldName) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (honeypot) return;

    if (Object.keys(errors).length > 0) {
      setTouched({ who: true, size: true, timing: true, name: true, company: true, email: true });
      const first = FIELD_ORDER.find((f) => errors[f]);
      if (first) {
        setShakeField(first);
        fieldRefs.current[first]?.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setShakeField(null), 350);
      }
      return;
    }

    const qualified = isFit(values);
    const route = qualified ? "scheduler" : "resource";
    const [firstname, ...rest] = values.name.trim().split(/\s+/);
    const lastname = rest.join(" ");

    pushDataLayer("vodex_dc_form_submit", {
      qualified,
      route,
      portfolio: values.who,
      size: values.size,
      timing: values.timing,
    });

    setSubmitting(true);
    if (DC_QUALIFY_FORM_ID) {
      try {
        await submitHubspotForm(DC_QUALIFY_FORM_ID, {
          firstname,
          lastname,
          email: values.email.trim(),
          company: values.company.trim(),
          who: values.who,
          size: values.size,
          timing: values.timing,
          page: "vodex-debt-collection",
          brand: "vodex",
          route,
          qualified: String(qualified),
          ...context.current,
        });
      } catch {
        // Never block the visitor on a CRM hiccup — same as the client's spec.
      }
    }
    setSubmitting(false);

    if (qualified) {
      const params = new URLSearchParams({ firstname, lastname, email: values.email.trim() });
      setSchedUrl(`${MEETING_SRC}&${params.toString()}`);
      setPane("sched");
    } else {
      setPane("res");
    }
  }

  const shown = (f: FieldName) => (touched[f] ? errors[f] : undefined);
  const fallbackUrl = schedUrl.replace("embed=true&", "").replace("?embed=true", "");

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span>Book a 20-minute demo</span>
        <span className={styles.cardHeadSub}>Three quick questions first</span>
      </div>

      <div className={styles.cardBody}>
        {pane === "form" && (
          <div key="form" className={styles.pane}>
            <h3 ref={headingRef} tabIndex={-1} className={styles.paneTitle}>
              Tell us about your portfolio
            </h3>
            <p className={styles.paneSub}>We use your answers to bring the right person to the call.</p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="dc-qualify-notes">Additional notes</label>
                <input
                  id="dc-qualify-notes"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div
                key={flashWho}
                ref={(el) => { fieldRefs.current.who = el; }}
                className={`${styles.field} ${flashWho ? styles.flash : ""} ${shakeField === "who" ? styles.shake : ""}`}
              >
                <Select
                  label="What do you collect?"
                  required
                  value={values.who}
                  onChange={(v) => setValue("who", v)}
                  onBlur={() => touch("who")}
                  options={WHO_OPTIONS}
                  error={shown("who")}
                  touched={touched.who}
                />
              </div>

              <div className={styles.row}>
                <div
                  ref={(el) => { fieldRefs.current.size = el; }}
                  className={`${styles.field} ${shakeField === "size" ? styles.shake : ""}`}
                >
                  <Select
                    label="Past-due accounts"
                    required
                    value={values.size}
                    onChange={(v) => setValue("size", v)}
                    onBlur={() => touch("size")}
                    options={SIZE_OPTIONS}
                    error={shown("size")}
                    touched={touched.size}
                  />
                </div>
                <div
                  ref={(el) => { fieldRefs.current.timing = el; }}
                  className={`${styles.field} ${shakeField === "timing" ? styles.shake : ""}`}
                >
                  <Select
                    label="When would you start?"
                    required
                    value={values.timing}
                    onChange={(v) => setValue("timing", v)}
                    onBlur={() => touch("timing")}
                    options={TIMING_OPTIONS}
                    error={shown("timing")}
                    touched={touched.timing}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div ref={(el) => { fieldRefs.current.name = el; }}>
                  <FloatingField
                    label="Full name"
                    name="name"
                    required
                    autoComplete="name"
                    value={values.name}
                    onChange={(v) => setValue("name", v.replace(/[0-9]/g, "").slice(0, 80))}
                    onBlur={() => touch("name")}
                    touched={touched.name}
                    error={errors.name}
                    valid={!errors.name}
                    shake={shakeField === "name"}
                  />
                </div>
                <div ref={(el) => { fieldRefs.current.company = el; }}>
                  <FloatingField
                    label="Company"
                    name="company"
                    required
                    autoComplete="organization"
                    value={values.company}
                    onChange={(v) => setValue("company", v.slice(0, 120))}
                    onBlur={() => touch("company")}
                    touched={touched.company}
                    error={errors.company}
                    valid={!errors.company}
                    shake={shakeField === "company"}
                  />
                </div>
              </div>

              <div ref={(el) => { fieldRefs.current.email = el; }}>
                <FloatingField
                  label="Work email"
                  name="email"
                  type="email"
                  inputMode="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={(v) => setValue("email", v.replace(/\s/g, "").slice(0, 254))}
                  onBlur={() => touch("email")}
                  touched={touched.email}
                  error={errors.email}
                  valid={!errors.email}
                  shake={shakeField === "email"}
                />
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Continue to pick a time
                    <ArrowRight className={styles.submitArrow} />
                  </>
                )}
              </button>
              <p className={styles.privacy}>
                Private. Used only to schedule and follow up on this demo.
              </p>
            </form>
          </div>
        )}

        {pane === "sched" && (
          <div key="sched" className={styles.pane}>
            <span className={styles.okMark} aria-hidden="true">
              <CheckIcon />
            </span>
            <h3 ref={headingRef} tabIndex={-1} className={styles.paneTitle}>
              Pick a time that works
            </h3>
            <p className={styles.paneSub}>Choose a 20-minute slot. Your details are already filled in.</p>
            <div className={styles.sched}>
              <iframe src={schedUrl} title="Pick a demo time" loading="lazy" />
            </div>
            <p className={styles.fallback}>
              Calendar not loading?{" "}
              <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
                Open it in a new tab
              </a>
              .
            </p>
          </div>
        )}

        {pane === "res" && (
          <div key="res" className={styles.pane}>
            <span className={styles.okMark} aria-hidden="true">
              <CheckIcon />
            </span>
            <h3 ref={headingRef} tabIndex={-1} className={styles.paneTitle}>
              Thanks, we have your details
            </h3>
            <p className={styles.paneSub}>
              A live demo is probably early for where you are right now. We will email something
              more useful, and you are welcome to book once you have a portfolio to run.
            </p>
            <ul className={styles.resources}>
              <li>A short guide to getting started with voice AI in collections</li>
              <li>A checklist for evaluating AI voice agents on a live call</li>
            </ul>
            <button type="button" className={styles.linkButton} onClick={() => setPane("form")}>
              Edit my answers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
