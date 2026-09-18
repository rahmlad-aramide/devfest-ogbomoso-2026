import Image from "next/image";
import { cn } from "@/lib/cn";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Round avatar: the person's photo, or their initials when no photo exists. */
export function PersonAvatar({
  name,
  photo,
  size = 48,
  className,
}: {
  name: string;
  photo?: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-primary-soft font-display font-bold text-primary", className)}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {photo ? (
        <Image src={photo} alt="" fill sizes={`${size}px`} className="object-cover object-top" />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
    </span>
  );
}
