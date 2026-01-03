import { generateOgImage, size, contentType } from "../components/og-image";

export const alt = "Archive Bot";
export { size, contentType };

export default function Image() {
  return generateOgImage("archive-bot");
}
