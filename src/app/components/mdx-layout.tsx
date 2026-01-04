import Link from "next/link";
import Footer from "./Footer";
import TableOfContents from "./TableOfContents";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function MdxLayout({
  children,
  date,
}: {
  children: React.ReactNode;
  date?: string;
}) {
  return (
    <div className="flex flex-col">
      <TableOfContents />
      <article className="w-full max-w-3xl mx-auto px-6 sm:px-8 pt-28 sm:pt-36 pb-20 sm:pb-28">
        {/* Back link */}
        <div className="mb-10 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-smooth hover:text-heading group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
        </div>

        {/* Date */}
        {date && (
          <div className="mb-10 animate-fade-in-up">
            <time dateTime={date} className="text-sm text-muted">
              {formatDate(date)}
            </time>
          </div>
        )}

        {/* Content */}
        <div
          className="animate-fade-in-up delay-1 prose max-w-none
            prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-heading
            prose-h1:text-4xl prose-h1:sm:text-5xl prose-h1:lg:text-6xl prose-h1:mb-10 prose-h1:mt-0 prose-h1:font-medium
            prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:font-medium
            prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-medium
            prose-h4:text-lg prose-h4:sm:text-xl prose-h4:mt-8 prose-h4:mb-3
            prose-p:text-foreground prose-p:leading-relaxed prose-p:my-6
            prose-a:text-heading prose-a:no-underline prose-a:border-b prose-a:border-border prose-a:transition-smooth hover:prose-a:border-heading
            prose-strong:text-heading prose-strong:font-medium
            prose-code:text-foreground prose-code:bg-surface-hover prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-8
            prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:bg-surface-hover prose-blockquote:py-4 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-muted prose-blockquote:my-8
            prose-ul:my-6 prose-ol:my-6
            prose-li:text-foreground prose-li:my-2
            prose-img:rounded-lg prose-img:my-10
            prose-hr:border-border prose-hr:my-14"
        >
          {children}
        </div>
      </article>

      <Footer />
    </div>
  );
}
