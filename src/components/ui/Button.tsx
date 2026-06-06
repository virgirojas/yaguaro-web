import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "whatsapp";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-dark text-white hover:bg-accent shadow-lg shadow-accent-dark/20",
  secondary: "bg-accent text-white hover:bg-accent-dark",
  outline:
    "border-2 border-white/80 text-white hover:bg-white hover:text-navy",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-lg shadow-[#25D366]/25",
};

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  external,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
