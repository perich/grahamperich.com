import BlogPostContent from "@/app/software-crisis-is-back/content.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Software Crisis Is Back, and This Time It's Wearing a Different Mask",
  description:
    "The 1968 software crisis happened when hardware outpaced practices. Now LLM code generation is creating a new crisis for code review and integration.",
  openGraph: {
    title: "The Software Crisis Is Back, and This Time It's Wearing a Different Mask",
    description:
      "The 1968 software crisis happened when hardware outpaced practices. Now LLM code generation is creating a new crisis for code review and integration.",
    type: "article",
    url: "https://www.grahamperich.com/software-crisis-is-back",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Software Crisis Is Back, and This Time It's Wearing a Different Mask",
    description:
      "The 1968 software crisis happened when hardware outpaced practices. Now LLM code generation is creating a new crisis for code review and integration.",
  },
};

export default function SoftwareCrisisPage() {
  return <BlogPostContent />;
}
