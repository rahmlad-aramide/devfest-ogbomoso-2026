import { cn } from "@/lib/cn";

/** Title plus optional lead paragraph. Left-aligned; `tone="dark"` is for navy backgrounds. */
export function SectionHeading({
  id,
  title,
  description,
  tone = "light",
  className,
}: {
  id?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2
        id={id}
        className={cn(
          "font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl",
          tone === "dark" ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-lg leading-relaxed text-pretty", tone === "dark" ? "text-white/75" : "text-muted")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
