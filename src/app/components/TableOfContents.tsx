"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract h2 and h3 headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: TOCItem[] = Array.from(elements).map((el) => {
      // Generate ID if not present
      const id =
        el.id ||
        el.textContent
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") ||
        "";
      return {
        id,
        text: el.textContent || "",
        level: parseInt(el.tagName[1]),
      };
    });

    // Add IDs to headings if they don't have them
    elements.forEach((el, i) => {
      if (!el.id && items[i].id) {
        el.id = items[i].id;
      }
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Only show for posts with 3+ headings
  if (headings.length < 3) return null;

  return (
    <nav className="hidden xl:block fixed right-8 top-36 w-56 max-h-[calc(100vh-10rem)] overflow-auto">
      <p className="text-xs uppercase tracking-wider text-muted mb-4">
        On this page
      </p>
      <ul className="space-y-2 text-sm border-l border-border">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 transition-smooth border-l -ml-px pl-3 ${
                activeId === heading.id
                  ? "text-heading border-heading"
                  : "text-muted hover:text-heading border-transparent hover:border-border"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
