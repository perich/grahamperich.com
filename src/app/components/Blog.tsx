import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

export default async function Blog() {
  const blogPosts = await getBlogPosts();

  return (
    <section className="flex flex-col items-start gap-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold">Blog</h2>
      {blogPosts.length === 0 ? (
        <p className="text-gray-300 text-center">
          Coming soon! Check back for articles about software engineering, web
          development, and more.
        </p>
      ) : (
        <ul className="space-y-4 w-full">
          {blogPosts.map((post) => (
            <li
              key={post.slug}
              className="border border-gray-800 rounded-lg p-4 transition"
            >
              <div className="flex flex-col gap-1">
                <Link
                  href={`/${post.slug}`}
                  className="block font-medium text-lg  text-blue-400 hover:text-blue-300"
                >
                  {post.title}
                </Link>
                <time dateTime={post.date} className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

async function getBlogPosts(): Promise<BlogPost[]> {
  // Define the app directory path
  const appDirectory = path.join(process.cwd(), "src", "app");

  try {
    // Read all directories in the app folder
    const directories = await fs.readdir(appDirectory, { withFileTypes: true });

    // Filter out directories that are not blog posts (exclude components, about, and any directories that don't contain content.mdx)
    const blogSlugs = [];
    for (const dirent of directories) {
      if (
        dirent.isDirectory() &&
        dirent.name !== "components" &&
        dirent.name !== "about"
      ) {
        const dirPath = path.join(appDirectory, dirent.name);
        try {
          const files = await fs.readdir(dirPath);
          if (files.includes("content.mdx")) {
            blogSlugs.push(dirent.name);
          }
        } catch (error) {
          console.error(`Error reading directory ${dirPath}:`, error);
        }
      }
    }

    // Get blog post details (extracting titles and dates from the mdx files)
    const blogPosts = await Promise.all(
      blogSlugs.map(async (slug) => {
        const contentPath = path.join(appDirectory, slug, "content.mdx");
        try {
          const content = await fs.readFile(contentPath, "utf8");

          // Extract title from the MDX content (assuming it's a # heading)
          const titleMatch = content.match(/# (.*?)($|\n)/);
          const title = titleMatch ? titleMatch[1].trim() : slug;

          // Extract date from frontmatter or metadata section
          // Looking for patterns like: export const date = "2024-02-24"
          // or date: "2024-02-24"
          let date = "";
          const dateMatch = content.match(
            /export\s+const\s+date\s*=\s*["'](.+?)["']/
          );
          if (dateMatch && dateMatch[1]) {
            date = dateMatch[1];
          } else {
            // If no date is found, use the current date
            date = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
          }

          return { slug, title, date };
        } catch (error) {
          console.error(`Error reading file ${contentPath}:`, error);
          return {
            slug,
            title: slug,
            date: new Date().toISOString().split("T")[0],
          };
        }
      })
    );

    // Sort blog posts by date (newest first)
    blogPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return blogPosts;
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
}
