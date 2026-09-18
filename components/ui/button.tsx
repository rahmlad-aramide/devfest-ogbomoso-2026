import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "accent" | "inverse" | "outline-inverse";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-surface text-ink border border-line hover:border-primary hover:text-primary",
  accent: "bg-google-yellow text-navy hover:bg-[#ffcb3d]",
  inverse: "bg-white text-navy hover:bg-primary-soft",
  "outline-inverse": "border border-white/40 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external,
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors",
    variants[variant],
    sizes[size],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
