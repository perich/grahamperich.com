import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface BlogMeta {
  title: string;
  date: string;
}

async function getBlogMeta(slug: string): Promise<BlogMeta> {
  const contentPath = join(process.cwd(), "src/app", slug, "content.mdx");
  const content = await readFile(contentPath, "utf8");

  const titleMatch = content.match(/# (.*?)($|\n)/);
  const title = titleMatch ? titleMatch[1].trim() : "Blog Post";

  const dateMatch = content.match(/export\s+const\s+date\s*=\s*["'](.+?)["']/);
  const date = dateMatch?.[1] || "";

  return { title, date };
}

export async function generateOgImage(slug: string) {
  const { title, date } = await getBlogMeta(slug);

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#141311",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, #c9a87c 0%, #d4b68f 50%, #c9a87c 100%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <h1
            style={{
              fontSize: title.length > 30 ? "56px" : "72px",
              fontWeight: 700,
              color: "#f0ede8",
              lineHeight: 1.2,
              margin: 0,
              marginBottom: "24px",
            }}
          >
            {title}
          </h1>
          {formattedDate && (
            <p
              style={{
                fontSize: "24px",
                color: "#8a847a",
                margin: 0,
              }}
            >
              {formattedDate}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#c9a87c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 700,
                color: "#141311",
              }}
            >
              G
            </div>
            <span
              style={{
                fontSize: "24px",
                color: "#c9c4bb",
              }}
            >
              Graham Perich
            </span>
          </div>
          <span
            style={{
              fontSize: "20px",
              color: "#8a847a",
            }}
          >
            grahamperich.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
