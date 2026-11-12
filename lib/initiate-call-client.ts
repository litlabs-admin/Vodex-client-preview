import { readCookie } from "@/lib/hubspot";
import type { InitiateCallField, InitiateCallInput } from "@/lib/initiate-call-validation";

export type InitiateCallResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<InitiateCallField, string>>;
    };

/**
 * Client-side POST to `/api/initiate-call`, shared by every "call me" form
 * (homepage InitiateCallForm, debt-collection CallMeForm) so the payload the
 * route validates can never drift between them.
 */
export async function submitInitiateCall(
  values: InitiateCallInput,
  opts: { recaptchaToken: string; startedAt: number; honeypot: string },
): Promise<InitiateCallResult> {
  try {
    const res = await fetch("/api/initiate-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        recaptchaToken: opts.recaptchaToken,
        startedAt: opts.startedAt,
        additional_notes: opts.honeypot,
        // Context for the server-side HubSpot submission.
        hutk: readCookie("hubspotutk"),
        pageUri: window.location.href,
        pageName: document.title,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      fieldErrors?: Partial<Record<InitiateCallField, string>>;
    };

    if (res.ok) return { ok: true };
    return {
      ok: false,
      error: data.error ?? "Something went wrong. Please try again.",
      fieldErrors: res.status === 422 ? data.fieldErrors : undefined,
    };
  } catch {
    return { ok: false, error: "Network error. Check your connection and try again." };
  }
}
