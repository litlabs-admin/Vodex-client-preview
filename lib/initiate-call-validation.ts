import { COUNTRIES } from "@/lib/countries";

/**
 * Shared by `InitiateCallForm` (client) and `app/api/initiate-call/route.ts`
 * (server) so the two can never disagree. The server always re-runs this —
 * client validation is UX only, never a security boundary.
 */
export type InitiateCallField = "name" | "email" | "phone" | "country";

export type InitiateCallInput = {
  name: string;
  email: string;
  phone: string;
  countryIso2: string;
};

export type InitiateCallPayload = {
  name: string;
  email: string;
  /** Digits only after the "+", e.g. "+15551234567". */
  phone: string;
};

const NAME_RE = /^[A-Za-zÀ-ſ' -]+$/;
// Local part: no leading/trailing/consecutive dots. Domain: labels + a 2+ letter TLD.
const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const PHONE_CHARS_RE = /^[0-9\s().-]+$/;

export function validateInitiateCall(input: Partial<InitiateCallInput>): {
  errors: Partial<Record<InitiateCallField, string>>;
  payload: InitiateCallPayload | null;
} {
  const errors: Partial<Record<InitiateCallField, string>> = {};
  const name = String(input.name ?? "").trim().replace(/\s+/g, " ");
  const email = String(input.email ?? "").trim().toLowerCase();
  const rawPhone = String(input.phone ?? "").trim();
  const country = COUNTRIES.find((c) => c.iso2 === String(input.countryIso2 ?? ""));

  if (!name) errors.name = "Your name is required.";
  else if (name.length < 2 || name.length > 60) errors.name = "Name must be 2–60 characters.";
  else if (!NAME_RE.test(name)) errors.name = "Name can only contain letters, spaces, hyphens and apostrophes.";

  if (!email) errors.email = "Email is required.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  if (!country) errors.country = "Select a valid country code.";

  const digits = rawPhone.replace(/[\s().-]/g, "");
  const dialDigits = country ? country.dial.replace(/\D/g, "") : "";
  if (!rawPhone) errors.phone = "Phone number is required.";
  else if (rawPhone.length > 24 || !PHONE_CHARS_RE.test(rawPhone)) errors.phone = "Enter a valid phone number.";
  else if (digits.length < 6 || digits.length > 14) errors.phone = "Phone number must be 6–14 digits.";
  else if (/^(\d)\1+$/.test(digits)) errors.phone = "Enter a valid phone number.";
  else if (country && dialDigits.length + digits.length > 15)
    errors.phone = "Phone number is too long for this country code.";

  const valid = Object.keys(errors).length === 0 && country;
  return {
    errors,
    payload: valid ? { name, email, phone: `+${dialDigits}${digits}` } : null,
  };
}
