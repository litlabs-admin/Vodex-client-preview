import { useEffect, useLayoutEffect } from "react";

// SSR has no DOM/window, and a real useLayoutEffect warns ("useLayoutEffect
// does nothing on the server") when Next server-renders a client component
// that uses it. Falls back to useEffect there; on the client it's always
// the real useLayoutEffect, so pre-paint DOM/window reads stay correct.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
