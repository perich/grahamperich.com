import { generateOgImage, size, contentType } from "../components/og-image";

export const alt = "Sankey";
export { size, contentType };

export default function Image() {
  return generateOgImage("sankey");
}
