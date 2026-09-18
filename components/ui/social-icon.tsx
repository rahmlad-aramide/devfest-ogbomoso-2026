import { Globe } from "lucide-react";
import type { SocialPlatform } from "@/content/types";

/**
 * lucide-react no longer ships brand icons, so brand marks are inlined here.
 * TODO(2026): add LinkedIn / Instagram / YouTube paths if those channels are added to `socials`.
 */
export function SocialIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  if (platform === "x") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return <Globe aria-hidden="true" className={className} />;
}
