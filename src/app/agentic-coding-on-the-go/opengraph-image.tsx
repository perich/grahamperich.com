import { generateOgImage, size, contentType } from "../components/og-image";

export const alt = "Agentic Coding On-the-Go";
export { size, contentType };

export default function Image() {
  return generateOgImage("agentic-coding-on-the-go");
}
