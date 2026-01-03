import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: number;
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function Blog() {
  const blogPosts = await getBlogPosts();

  return (
    <section className="w-full max-w-2xl mx-auto">
      {/* Section Header */}
      <div className="opacity-0 animate-fade-in-up delay-4 mb-8">
        <h2 className="text-2xl font-bold text-heading tracking-tight">
          Writing
        </h2>
        <p className="mt-2 text-muted">
          Thoughts on software, engineering, and building things.
        </p>
      </div>

      {/* Blog Posts */}
      {blogPosts.length === 0 ? (
        <p className="opacity-0 animate-fade-in-up delay-5 text-muted text-center py-12">
          Coming soon! Check back for articles about software engineering.
        </p>
      ) : (
        <div className="space-y-3">
          {blogPosts.map((post, index) => (
            <article
              key={post.slug}
              className="opacity-0 animate-fade-in-up group"
              style={{ animationDelay: `${250 + index * 75}ms` }}
            >
              <Link
                href={`/${post.slug}`}
                className="block p-4 -mx-4 rounded-xl transition-smooth hover:bg-surface"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <h3 className="font-medium text-heading group-hover:text-accent transition-smooth">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted shrink-0">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="hidden sm:inline text-border">·</span>
                    <span className="hidden sm:inline">{post.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const appDirectory = path.join(process.cwd(), "src", "app");

  try {
    const directories = await fs.readdir(appDirectory, { withFileTypes: true });
    const blogSlugs = [];

    for (const dirent of directories) {
      if (
        dirent.isDirectory() &&
        !["components", "about", "templates"].includes(dirent.name)
      ) {
        const dirPath = path.join(appDirectory, dirent.name);
        try {
          const files = await fs.readdir(dirPath);
          if (files.includes("content.mdx")) {
            blogSlugs.push(dirent.name);
          }
        } catch {
          // Directory not accessible
        }
      }
    }

    const blogPosts = await Promise.all(
      blogSlugs.map(async (slug) => {
        const contentPath = path.join(appDirectory, slug, "content.mdx");
        try {
          const content = await fs.readFile(contentPath, "utf8");

          const titleMatch = content.match(/# (.*?)($|\n)/);
          const title = titleMatch ? titleMatch[1].trim() : slug;

          const dateMatch = content.match(
            /export\s+const\s+date\s*=\s*["'](.+?)["']/
          );
          const date = dateMatch?.[1] || new Date().toISOString().split("T")[0];

          const readingTime = estimateReadingTime(content);

          return { slug, title, date, readingTime };
        } catch {
          return {
            slug,
            title: slug,
            date: new Date().toISOString().split("T")[0],
            readingTime: 1,
          };
        }
      })
    );

    blogPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return blogPosts;
  } catch {
    return [];
  }
}
