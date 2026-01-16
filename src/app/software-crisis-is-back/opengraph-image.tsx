import { generateOgImage, size, contentType } from "../components/og-image";

export const alt = "The Software Crisis Is Back, and This Time It's Wearing a Different Mask";
export { size, contentType };

export default function Image() {
  return generateOgImage("software-crisis-is-back");
}
