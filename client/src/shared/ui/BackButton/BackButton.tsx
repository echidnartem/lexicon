import type { ButtonHTMLAttributes } from "react";
import { ChevronLeft } from "lucide-react";
import styles from "./BackButton.module.css";

type BackButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

export function BackButton({
  "aria-label": ariaLabel = "Назад",
  className,
  type = "button",
  ...props
}: BackButtonProps) {
  const buttonClassName = [styles.backButton, className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      aria-label={ariaLabel}
      className={buttonClassName}
      type={type}
      {...props}
    >
      <ChevronLeft className={styles.icon} aria-hidden="true" />
    </button>
  );
}
