import Link from "next/link";
import Footer from "./Footer";

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
      <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Back link */}
        <div className="mb-8 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-smooth hover:text-heading group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>

        {/* Date */}
        {date && (
          <div className="mb-8 animate-fade-in-up">
            <time dateTime={date} className="text-sm text-muted">
              {formatDate(date)}
            </time>
          </div>
        )}

        {/* Content */}
        <div
          className="animate-fade-in-up delay-1 prose prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-heading
            prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:lg:text-5xl prose-h1:mb-8 prose-h1:mt-0
            prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-h4:text-lg prose-h4:sm:text-xl prose-h4:mt-6 prose-h4:mb-2
            prose-p:text-foreground prose-p:leading-relaxed prose-p:my-5
            prose-a:text-accent prose-a:no-underline prose-a:transition-smooth hover:prose-a:text-accent-hover hover:prose-a:underline
            prose-strong:text-heading prose-strong:font-semibold
            prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-6
            prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:bg-surface prose-blockquote:py-3 prose-blockquote:px-4 prose-blockquote:rounded-r prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:my-6
            prose-ul:my-5 prose-ol:my-5
            prose-li:text-foreground prose-li:my-1
            prose-img:rounded-xl prose-img:my-8
            prose-hr:border-border prose-hr:my-12"
        >
          {children}
        </div>
      </article>

      <Footer />
    </div>
  );
}
