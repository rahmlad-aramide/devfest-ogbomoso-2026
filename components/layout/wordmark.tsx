import Link from "next/link";
import { event } from "@/content/event";
import { cn } from "@/lib/cn";

/** Live-text version of the {DevFest} mark, so it works on any background at any size. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${event.fullName} home`}
      className={cn("inline-flex items-baseline gap-2 font-display font-extrabold tracking-tight", className)}
    >
      <span className="text-xl leading-none sm:text-2xl">
        <span className="text-google-yellow" aria-hidden="true">
          {"{"}
        </span>
        DevFest
        <span className="text-google-yellow" aria-hidden="true">
          {"}"}
        </span>
      </span>
      <span className="text-sm font-bold whitespace-nowrap opacity-70 max-sm:hidden">Ogbomoso {event.year}</span>
    </Link>
  );
}
