"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  reset: (id?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __vodexRecaptchaOnload?: () => void;
  }
}

export type RecaptchaHandle = {
  reset: () => void;
  /** Start loading Google's script now (e.g. the visitor focused the form),
   * rather than waiting for the widget to scroll near the viewport. */
  load: () => void;
};

type Props = {
  onChange: (token: string | null) => void;
  theme?: "light" | "dark";
  className?: string;
};

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const SCRIPT_ID = "google-recaptcha-v2";

let loadPromise: Promise<Grecaptcha> | null = null;

/** Loads Google's script once per page, however many widgets mount. */
function loadRecaptcha(): Promise<Grecaptcha> {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve, reject) => {
    window.__vodexRecaptchaOnload = () => resolve(window.grecaptcha!);
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://www.google.com/recaptcha/api.js?onload=__vodexRecaptchaOnload&render=explicit";
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("reCAPTCHA failed to load"));
    };
    document.head.appendChild(script);
  });
  return loadPromise;
}

/** How far outside the viewport the widget starts loading. */
const LOAD_MARGIN = "400px";

/**
 * Google reCAPTCHA v2 checkbox ("I'm not a robot"), rendered explicitly so it
 * mounts inside React's tree. Google's script (hundreds of KB plus iframes)
 * is only fetched once the widget nears the viewport or the parent calls
 * `load()` on intent — never as part of the initial page load. The parent
 * should reserve the widget's 78px height so its arrival doesn't shift
 * layout. The token it yields is single-use and is
 * verified server-side in `app/api/initiate-call/route.ts` — never trust it
 * on the client.
 */
export const Recaptcha = forwardRef<RecaptchaHandle, Props>(function Recaptcha(
  { onChange, theme = "dark", className },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const [shouldLoad, setShouldLoad] = useState(false);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
      onChangeRef.current(null);
    },
    load() {
      setShouldLoad(true);
    },
  }));

  useEffect(() => {
    const el = containerRef.current;
    if (shouldLoad || !el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShouldLoad(true);
      },
      { rootMargin: LOAD_MARGIN },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !shouldLoad) return;
    let cancelled = false;
    loadRecaptcha()
      .then((g) => {
        if (cancelled || !containerRef.current || widgetId.current !== null) return;
        widgetId.current = g.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme,
          callback: (token: string) => onChangeRef.current(token),
          "expired-callback": () => onChangeRef.current(null),
          "error-callback": () => onChangeRef.current(null),
        });
      })
      .catch(() => onChangeRef.current(null));
    return () => {
      cancelled = true;
    };
  }, [theme, shouldLoad]);

  // Client preview has no reCAPTCHA key: hold the widget's exact footprint
  // (304x78) with a neutral placeholder so the layout matches the live site.
  if (!RECAPTCHA_SITE_KEY) {
    return (
      <div
        className={className}
        style={{
          width: 304,
          height: 78,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 3,
          border: "1px dashed rgba(255,255,255,0.3)",
          color: "rgba(255,255,255,0.6)",
          fontSize: 13,
          textAlign: "center",
          padding: "0 12px",
        }}
      >
        reCAPTCHA check appears here on the live site
      </div>
    );
  }
  return <div ref={containerRef} className={className} />;
});
