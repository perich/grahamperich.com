import ArchiveBotBlogContent from "@/app/archive-bot/content.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building a Personal Digital Archive Bot",
  description:
    "My journey building an automated personal archive bot to preserve digital media forever.",
  openGraph: {
    title: "Building a Personal Digital Archive Bot",
    description:
      "My journey building an automated personal archive bot to preserve digital media forever.",
    type: "article",
    url: "https://www.grahamperich.com/archive-bot",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building a Personal Digital Archive Bot",
    description:
      "My journey building an automated personal archive bot to preserve digital media forever.",
  },
};

export default function ArchiveBotPage() {
  return <ArchiveBotBlogContent />;
}
