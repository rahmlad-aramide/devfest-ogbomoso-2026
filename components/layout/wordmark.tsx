import Link from "next/link";
import { event } from "@/content/event";
import { cn } from "@/lib/cn";

/**
 * The {DevFest} Ogbomoso brand lockup (public/brand). `variant="dark"` swaps in the
 * light-text version for dark backgrounds like the footer; `"light"` (default) is for the
 * light header/canvas. Plain <img>, not next/image: these are static local SVGs and the
 * project's image optimizer doesn't allow SVG sources (see next.config.ts).
 */
export function Wordmark({ className, variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const src = variant === "dark" ? "/brand/devfest-ogbomoso-logo-dark.svg" : "/brand/devfest-ogbomoso-logo.svg";

  return (
    <Link href="/" aria-label={`${event.fullName} home`} className={cn("inline-flex items-center gap-2", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={event.fullName} className="h-9 w-auto sm:h-11" />
    </Link>
  );
}
