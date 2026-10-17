import QRCode from "qrcode";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const FEEDBACK_PATH = "/feedback";

/**
 * Scannable QR code pointing at the site's /feedback page. Rendered on the server as inline SVG
 * (no client JS), dark on white with a quiet zone so it stays scannable when projected.
 */
export function FeedbackQr({ className, size = 224 }: { className?: string; size?: number }) {
  const url = `${site.url}${FEEDBACK_PATH}`;
  const { modules } = QRCode.create(url, { errorCorrectionLevel: "M" });
  const count = modules.size;

  let path = "";
  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      if (modules.get(x, y)) path += `M${x} ${y}h1v1h-1z`;
    }
  }

  return (
    <figure className={cn("inline-flex flex-col items-center gap-3", className)}>
      <div className="rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-float)]">
        <svg
          role="img"
          aria-label={`QR code linking to ${url}`}
          viewBox={`0 0 ${count} ${count}`}
          width={size}
          height={size}
          shapeRendering="crispEdges"
          className="block max-w-full"
        >
          <rect width={count} height={count} fill="#ffffff" />
          <path d={path} fill="#07142f" />
        </svg>
      </div>
      <figcaption className="text-center text-sm font-semibold text-muted">
        Scan to share your feedback
        <span className="block font-mono text-xs font-normal">{url.replace(/^https?:\/\//, "")}</span>
      </figcaption>
    </figure>
  );
}
