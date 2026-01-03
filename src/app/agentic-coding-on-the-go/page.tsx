import AgenticCodingContent from "@/app/agentic-coding-on-the-go/content.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentic Coding On-the-Go",
  description:
    "Use Claude Code from your iPhone by combining tmux, Tailscale, and Termius for seamless mobile development.",
  openGraph: {
    title: "Agentic Coding On-the-Go",
    description:
      "Use Claude Code from your iPhone by combining tmux, Tailscale, and Termius for seamless mobile development.",
    type: "article",
    url: "https://www.grahamperich.com/agentic-coding-on-the-go",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Coding On-the-Go",
    description:
      "Use Claude Code from your iPhone by combining tmux, Tailscale, and Termius for seamless mobile development.",
  },
};

export default function AgenticCodingPage() {
  return <AgenticCodingContent />;
}
