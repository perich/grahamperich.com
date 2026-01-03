import SankeyBlogContent from "@/app/sankey/content.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building a Personal Finance Visualization",
  description:
    "An interactive Sankey diagram built with React and Chart.js to visualize a year of financial data.",
  openGraph: {
    title: "Building a Personal Finance Visualization",
    description:
      "An interactive Sankey diagram built with React and Chart.js to visualize a year of financial data.",
    type: "article",
    url: "https://www.grahamperich.com/sankey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building a Personal Finance Visualization",
    description:
      "An interactive Sankey diagram built with React and Chart.js to visualize a year of financial data.",
  },
};

export default function SankeyPage() {
  return <SankeyBlogContent />;
}
