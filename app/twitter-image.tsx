import { event } from "@/content/event";
import OpengraphImage from "./opengraph-image";

// Route-segment config must be declared literally in each file, so these repeat opengraph-image.
export const alt = `${event.fullName}: ${event.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;
