import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { ArrowRight } from "./icons";
import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "dark";
  size?: "lg" | "sm";
  /** Appends the long right arrow used throughout the design. */
  withArrow?: boolean;
  className?: string;
  /** Only usable from client components (e.g. closing a menu on navigate). */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
  withArrow = false,
  className,
  onClick,
}: ButtonProps) {
  const classes = [styles.button, styles[size], styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
      {withArrow ? <ArrowRight /> : null}
    </Link>
  );
}
