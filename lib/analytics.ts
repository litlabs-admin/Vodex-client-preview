/**
 * Thin, SSR-safe wrapper over GTM/GA4's `dataLayer` (initialised in
 * app/layout.tsx). Event names for the debt-collection page follow the
 * client's spec: vodex_dc_cta_click, vodex_dc_portfolio_select,
 * vodex_dc_form_submit, vodex_dc_demo_call.
 */
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function pushDataLayer(event: string, data: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
}
