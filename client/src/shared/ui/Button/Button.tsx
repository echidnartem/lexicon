import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "small" | "medium" | "large";

type ButtonStyleProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = ButtonStyleProps & LinkProps;

const getButtonClassName = ({
  className,
  fullWidth,
  size = "medium",
  variant = "primary",
}: Pick<ButtonStyleProps, "className" | "fullWidth" | "size" | "variant">) =>
  [
    styles.button,
    styles[variant],
    size !== "medium" ? styles[size] : "",
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

export function Button({
  children,
  className,
  fullWidth,
  size,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName({ className, fullWidth, size, variant })}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  fullWidth,
  size,
  variant,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={getButtonClassName({ className, fullWidth, size, variant })}
      {...props}
    >
      {children}
    </Link>
  );
}
