import * as React from "react";
import { cn } from "@/app/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: `
bg-[var(--accent)]
text-white

border-transparent

hover:bg-[var(--accent-hover)]

shadow-[0_12px_30px_rgba(139,115,85,0.20)]

hover:shadow-[0_20px_45px_rgba(139,115,85,0.30)]

hover:-translate-y-[2px]
`,

    secondary: `
      bg-white
      text-[var(--foreground)]

      border-[var(--border)]

      hover:bg-[var(--surface-muted)]
      hover:-translate-y-[2px]

      shadow-[0_8px_24px_rgba(15,23,42,0.05)]
    `,

    ghost: `
      bg-transparent
      text-[var(--foreground-secondary)]

      border-transparent

      hover:bg-white
      hover:text-[var(--foreground)]
    `,

    danger: `
      bg-red-600
      text-white

      hover:bg-red-700
      hover:-translate-y-[2px]
    `,
  };

  return (
    <button
      className={cn(
        `
        inline-flex
        items-center
        justify-center
        gap-2

        h-12
        px-6

        rounded-[18px]

        border

        font-semibold
        tracking-[-0.02em]

        transition-all
        duration-300

        focus:outline-none
        focus:ring-4
        focus:ring-[rgba(91,91,214,0.15)]

        disabled:pointer-events-none
        disabled:opacity-50

        active:translate-y-[1px]
      `,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
} ;