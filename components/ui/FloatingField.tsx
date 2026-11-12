"use client";

import { useId, useState } from "react";
import { CheckIcon } from "./icons";
import styles from "./FloatingField.module.css";

type BaseProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  /** Show the green check once the field has been touched and is valid. */
  valid?: boolean;
  touched?: boolean;
  required?: boolean;
  autoComplete?: string;
  shake?: boolean;
  className?: string;
};

type InputProps = BaseProps & {
  as?: "input";
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel" | "numeric";
};

type TextareaProps = BaseProps & {
  as: "textarea";
  rows?: number;
  maxLength?: number;
};

/**
 * Outlined field with a notched floating label — mirrors the reference's two
 * visible states (plain placeholder-style text when empty, a floated label +
 * value once filled/focused) as one consistent control. Float/valid/error
 * state is driven by React (this component already needs per-field touched/
 * valid tracking for messages), not a CSS-only `:placeholder-shown` trick.
 */
export function FloatingField(props: InputProps | TextareaProps) {
  const { label, name, value, onChange, onBlur, error, valid, touched, required, shake, className } = props;
  const [focused, setFocused] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;

  const floated = focused || value.length > 0;
  const invalid = Boolean(touched && error);
  const showCheck = Boolean(touched && !error && valid && value.length > 0);

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  const isTextarea = props.as === "textarea";

  return (
    <div className={className}>
      <div
        className={`${styles.shell} ${isTextarea ? styles.textareaShell : ""} ${shake ? styles.shake : ""}`}
        data-focused={focused}
        data-invalid={invalid}
      >
        <label htmlFor={id} className={styles.label} data-float={floated}>
          {label}
          {required ? " *" : ""}
        </label>

        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            value={value}
            rows={(props as TextareaProps).rows ?? 4}
            maxLength={(props as TextareaProps).maxLength}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            aria-invalid={invalid}
            aria-describedby={invalid ? errorId : undefined}
            className={`${styles.input} ${styles.textareaInput}`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={(props as InputProps).type ?? "text"}
            inputMode={(props as InputProps).inputMode}
            autoComplete={props.autoComplete}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            aria-invalid={invalid}
            aria-describedby={invalid ? errorId : undefined}
            className={styles.input}
          />
        )}

        {!isTextarea && (
          <CheckIcon className={styles.suffixIcon} data-show={showCheck} />
        )}
      </div>
      {invalid && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
