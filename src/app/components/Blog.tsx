import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: number;
  excerpt: string | null;
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function Blog() {
  const blogPosts = await getBlogPosts();

  return (
    <section id="writing" className="w-full max-w-2xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="opacity-0 animate-fade-in-up delay-4 mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl text-heading tracking-tight">
          Writing
        </h2>
      </div>

      {/* Blog Posts */}
      {blogPosts.length === 0 ? (
        <p className="opacity-0 animate-fade-in-up delay-5 text-muted text-center py-12">
          Coming soon.
        </p>
      ) : (
        <div className="space-y-0">
          {blogPosts.map((post, index) => (
            <article
              key={post.slug}
              className="opacity-0 animate-fade-in-up group"
              style={{ animationDelay: `${250 + index * 75}ms` }}
            >
              <Link
                href={`/${post.slug}`}
                className="block py-6 transition-smooth"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
                  <h3 className="font-serif text-xl sm:text-2xl text-heading group-hover:text-muted transition-smooth">
                    {post.title}
                  </h3>
                  <span className="text-sm text-muted shrink-0">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="mx-2">·</span>
                    <span>{post.readingTime} min</span>
                  </span>
                </div>
              </Link>
              {index < blogPosts.length - 1 && (
                <div className="h-px bg-border" />
              )}
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

          // Extract excerpt: first paragraph after the title that isn't an export
          const lines = content.split("\n");
          let excerpt: string | null = null;
          let foundTitle = false;
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("#")) {
              foundTitle = true;
              continue;
            }
            if (!foundTitle) continue;
            if (trimmed.startsWith("export")) continue;
            if (trimmed.startsWith("<")) continue;
            if (trimmed.startsWith("import")) continue;
            if (trimmed.length > 30) {
              excerpt =
                trimmed.slice(0, 150) + (trimmed.length > 150 ? "..." : "");
              break;
            }
          }

          return { slug, title, date, readingTime, excerpt };
        } catch {
          return {
            slug,
            title: slug,
            date: new Date().toISOString().split("T")[0],
            readingTime: 1,
            excerpt: null,
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
