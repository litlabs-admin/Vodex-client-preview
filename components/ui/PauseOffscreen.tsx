"use client";

import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type RefObject,
} from "react";

/**
 * Sets `data-offscreen="true"` on the element while it's out of view, which
 * pauses every CSS animation inside it (rule in app/globals.css). Written
 * straight to the DOM — no React state, so no re-renders on scroll. Use for
 * decorative infinite loops that otherwise keep repainting (or re-laying out)
 * every frame while the visitor is elsewhere on the page.
 */
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.removeAttribute("data-offscreen");
        else el.setAttribute("data-offscreen", "true");
      },
      // Resume a little before it scrolls in, so it's already moving.
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

/** A plain `<div>` with `usePauseOffscreen` applied — for server components. */
export function PauseOffscreen(props: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  usePauseOffscreen(ref);
  return <div ref={ref} {...props} />;
}
