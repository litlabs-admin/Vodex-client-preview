"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { DialCodeSelect } from "@/components/ui/DialCodeSelect";
import { Recaptcha, RECAPTCHA_SITE_KEY, type RecaptchaHandle } from "@/components/ui/Recaptcha";
import { ArrowRight, CheckIcon, MailIcon, PhoneIcon, UserIcon } from "@/components/ui/icons";
import { COUNTRIES } from "@/lib/countries";
import { submitInitiateCall } from "@/lib/initiate-call-client";
import {
  validateInitiateCall,
  type InitiateCallField,
  type InitiateCallInput,
} from "@/lib/initiate-call-validation";
import styles from "./InitiateCall.module.css";
import { BOOK_DEMO_URL } from "@/lib/links";

/** Client-preview build: never place real calls (see handleSubmit). */
const PREVIEW_MODE = true;

type FieldName = Exclude<InitiateCallField, "country">;
const FIELD_ORDER: FieldName[] = ["name", "email", "phone"];

// Strip characters that can never be valid as they're typed or pasted, so bad
// input can't even reach the field. Full rules still run in
// lib/initiate-call-validation.ts on both client and server.
const SANITIZE: Record<FieldName, (v: string) => string> = {
  name: (v) => v.replace(/[^A-Za-zÀ-ſ' -]/g, "").replace(/\s{2,}/g, " ").slice(0, 60),
  email: (v) => v.replace(/\s/g, "").slice(0, 254),
  phone: (v) => v.replace(/[^0-9\s().-]/g, "").slice(0, 24),
};

function withoutKeys<T extends object>(obj: T, keys: string[]): T {
  const next = { ...obj } as Record<string, unknown>;
  for (const k of keys) delete next[k];
  return next as T;
}

const INITIAL_VALUES: InitiateCallInput = { name: "", email: "", phone: "", countryIso2: "US" };

/**
 * The interactive form bar — split out from `InitiateCall.tsx` (a server
 * component) since it owns state. Submits to `/api/initiate-call`, which
 * verifies reCAPTCHA, re-validates, rate-limits and only then asks the Vodex
 * API to place the demo call and records the lead in HubSpot. Validation rules live in
 * `lib/initiate-call-validation.ts`, shared with that route.
 */
type InitiateCallFormProps = {
  /** Target of the "Book a Demo" button beside the form. Pages with their own
   * on-page booking section pass an anchor (e.g. "#book"). */
  bookHref?: string;
};

export function InitiateCallForm({ bookHref = BOOK_DEMO_URL }: InitiateCallFormProps = {}) {
  const [values, setValues] = useState<InitiateCallInput>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<Partial<Record<InitiateCallField, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [shakeField, setShakeField] = useState<FieldName | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const startedAt = useRef(0);
  const recaptchaRef = useRef<RecaptchaHandle>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLDivElement | null>>>({});

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const { errors: clientErrors } = validateInitiateCall(values);
  // Server errors only add to client ones. Never spread `undefined` over a
  // client error, or a field that's still invalid silently loses its message.
  const errors: Partial<Record<InitiateCallField, string>> = { ...clientErrors };
  for (const [key, msg] of Object.entries(serverErrors)) {
    if (msg) errors[key as InitiateCallField] = msg;
  }
  const dial = COUNTRIES.find((c) => c.iso2 === values.countryIso2)?.dial ?? "+1";
  const fullPhone = `${dial} ${values.phone}`.trim();

  function setValue(field: FieldName, raw: string) {
    const value = SANITIZE[field](raw);
    setValues((v) => ({ ...v, [field]: value }));
    setServerErrors((e) => withoutKeys(e, [field]));
    setFormError(null);
  }

  function setCountry(iso2: string) {
    setValues((v) => ({ ...v, countryIso2: iso2 }));
    setServerErrors((e) => withoutKeys(e, ["country", "phone"]));
  }

  function flagFirstInvalid(errs: Partial<Record<InitiateCallField, string>>) {
    setTouched({ name: true, email: true, phone: true });
    const first = FIELD_ORDER.find((f) => errs[f]) ?? (errs.country ? "phone" : undefined);
    if (!first) return;
    setShakeField(first);
    fieldRefs.current[first]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => setShakeField(null), 350);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setFormError(null);

    const { errors: nextErrors } = validateInitiateCall(values);
    if (Object.keys(nextErrors).length > 0) {
      flagFirstInvalid(nextErrors);
      return;
    }
    // CLIENT PREVIEW: demo calls are switched off — no API, no HubSpot lead.
    // Validation above behaves exactly as on the live site.
    if (PREVIEW_MODE) {
      setFormError(
        `Preview only: demo calls are turned off here. On the live site, Vodex calls ${fullPhone} within seconds.`,
      );
      return;
    }
    if (!RECAPTCHA_SITE_KEY) {
      setFormError("Verification is unavailable right now. Please book a demo instead.");
      return;
    }
    if (!captchaToken) {
      setFormError("Please confirm you're not a robot.");
      return;
    }

    setStatus("submitting");
    const result = await submitInitiateCall(values, {
      recaptchaToken: captchaToken,
      startedAt: startedAt.current,
      honeypot,
    });
    if (result.ok) {
      setStatus("success");
      return;
    }
    if (result.fieldErrors) {
      setServerErrors(result.fieldErrors);
      flagFirstInvalid(result.fieldErrors);
    }
    setFormError(result.error);
    // Tokens are single-use: any failed attempt needs a fresh tick.
    recaptchaRef.current?.reset();
    setStatus("idle");
  }

  function resetForm() {
    setValues(INITIAL_VALUES);
    setTouched({});
    setServerErrors({});
    setFormError(null);
    setCaptchaToken(null);
    startedAt.current = Date.now();
    setStatus("idle");
  }

  const visibleErrors = [
    touched.name && errors.name,
    touched.email && errors.email,
    touched.phone && (errors.phone ?? errors.country),
    formError,
  ].filter(Boolean) as string[];

  return (
    <>
      <div className={styles.formRow}>
        {/* Entrance wraps a plain, unstyled positioning element — the bar's
            own hover/focus-within visuals live on a nested child, never on
            the element Entrance itself animates — its `rise` animation's
            fill mode would otherwise pin `transform` over hover styles. */}
        <Entrance delay={280} className={styles.barSlot}>
          {status === "success" ? (
            <div className={styles.success} role="status">
              <span className={styles.successIcon}>
                <CheckIcon />
              </span>
              <div>
                <p className={styles.successTitle}>We&apos;re calling you now</p>
                <p className={styles.successBody}>{fullPhone} — pick up in a few seconds.</p>
              </div>
              <button type="button" className={styles.resetLink} onClick={resetForm}>
                Try another number
              </button>
            </div>
          ) : (
            <form
              id="initiate-call-form"
              className={styles.bar}
              onSubmit={handleSubmit}
              // Intent signals: start fetching reCAPTCHA before the visitor
              // reaches the checkbox (it otherwise loads on scroll-into-view).
              onFocusCapture={() => recaptchaRef.current?.load()}
              onPointerEnter={() => recaptchaRef.current?.load()}
              noValidate
            >
              {/* Honeypot — invisible to people, tempting to bots. Named so
                  browser autofill has nothing to match: as "Company website"
                  Chrome filled it from the visitor's saved profile, and the
                  route then faked a success without ever placing the call. */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="initiate-call-additional-notes">Additional notes</label>
                <input
                  id="initiate-call-additional-notes"
                  name="additional_notes"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className={styles.cell} ref={(el) => { fieldRefs.current.name = el; }}>
                <UserIcon className={styles.cellIcon} />
                <label className="visually-hidden" htmlFor="initiate-call-name">
                  Your Name
                </label>
                <input
                  id="initiate-call-name"
                  className={`${styles.cellInput} ${shakeField === "name" ? styles.shake : ""}`}
                  type="text"
                  placeholder="Your Name"
                  autoComplete="name"
                  maxLength={60}
                  value={values.name}
                  onChange={(e) => setValue("name", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  aria-invalid={Boolean(touched.name && errors.name)}
                />
              </div>

              <div className={styles.cell} ref={(el) => { fieldRefs.current.email = el; }}>
                <MailIcon className={styles.cellIcon} />
                <label className="visually-hidden" htmlFor="initiate-call-email">
                  Email
                </label>
                <input
                  id="initiate-call-email"
                  className={`${styles.cellInput} ${shakeField === "email" ? styles.shake : ""}`}
                  type="email"
                  inputMode="email"
                  placeholder="Email"
                  autoComplete="email"
                  maxLength={254}
                  value={values.email}
                  onChange={(e) => setValue("email", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  aria-invalid={Boolean(touched.email && errors.email)}
                />
              </div>

              <div
                className={`${styles.cell} ${styles.phoneCell}`}
                ref={(el) => { fieldRefs.current.phone = el; }}
              >
                <PhoneIcon className={styles.cellIcon} />
                <DialCodeSelect
                  value={values.countryIso2}
                  onChange={setCountry}
                  className={styles.dialWrap}
                />
                <label className="visually-hidden" htmlFor="initiate-call-phone">
                  Phone Number
                </label>
                <input
                  id="initiate-call-phone"
                  className={`${styles.cellInput} ${shakeField === "phone" ? styles.shake : ""}`}
                  type="tel"
                  inputMode="tel"
                  placeholder="Phone Number"
                  autoComplete="tel-national"
                  maxLength={24}
                  value={values.phone}
                  onChange={(e) => setValue("phone", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  aria-invalid={Boolean(touched.phone && (errors.phone || errors.country))}
                />
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={status === "submitting"}
                aria-busy={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Calling…
                  </>
                ) : (
                  <>
                    Initiate Call
                    <ArrowRight className={styles.submitArrow} />
                  </>
                )}
              </button>
            </form>
          )}
        </Entrance>

        {visibleErrors.length > 0 && status !== "success" ? (
          <div className={styles.formErrors} role="alert">
            {visibleErrors.map((msg) => (
              <p key={msg}>{msg}</p>
            ))}
          </div>
        ) : null}

        <Entrance delay={280} className={styles.demoWrap}>
          <Button href={bookHref} variant="light" size="lg" className={styles.demoButton}>
            Book a Demo
          </Button>
        </Entrance>
      </div>


      {status !== "success" ? (
        <Entrance delay={360} className={styles.captchaSlot}>
          <Recaptcha ref={recaptchaRef} onChange={setCaptchaToken} theme="dark" />
        </Entrance>
      ) : null}

      <Entrance delay={440}>
        <p className={styles.fineprint}>
          *By submitting this form, you will receive an automated test call
          from a Vodex AI agent.
        </p>
        <p className={styles.fineprint}>
          Enterprise-Grade Security | ISO 27001, SOC 2, HIPAA, &amp; TCPA
          Compliant.
        </p>
      </Entrance>
    </>
  );
}
