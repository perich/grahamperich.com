---
name: blog-authoring
description: Create new blog posts for grahamperich.com. Use when writing a new blog post, adding content to the blog, or when the user asks to create an article or post.
allowed-tools: Read, Write, Glob, Grep, Bash
---

# Blog Authoring

Create blog posts for this Next.js 15 portfolio site using the App Router and MDX.

## Quick Start

To create a new blog post with slug `my-post`:

1. Create directory: `src/app/my-post/`
2. Create `page.tsx` with metadata
3. Create `content.mdx` with the blog content
4. Create `opengraph-image.tsx` for social media cards
5. Create `twitter-image.tsx` (re-exports opengraph-image)

## Directory Structure

```
src/app/{slug}/
├── page.tsx           # Next.js page with metadata
├── content.mdx        # Blog content in MDX
├── opengraph-image.tsx # Social media card image (Facebook, LinkedIn, etc.)
└── twitter-image.tsx   # Twitter/X card image
```

## Required Files

### 1. page.tsx

```tsx
import BlogPostContent from "@/app/{slug}/content.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Title",
  description: "Brief description for SEO (150-160 chars)",
  openGraph: {
    title: "Post Title",
    description: "Brief description for SEO",
    type: "article",
    url: "https://www.grahamperich.com/{slug}",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Title",
    description: "Brief description for SEO",
  },
};

export default function PostPage() {
  return <BlogPostContent />;
}
```

### 2. content.mdx

```mdx
import MdxLayout from '../components/mdx-layout'
import CodeBlock from '../components/CodeBlock'
import BlogNote from '../components/BlogNote'
import ResponsiveContainer from '../components/ResponsiveContainer'
import BlogSection from '../components/BlogSection'

export const date = "YYYY-MM-DD"

# Post Title

Your content here...

export default function BlogPostContent({ children }) {
  return <MdxLayout date={date}>{children}</MdxLayout>
}
```

### 3. opengraph-image.tsx

**Required for social media cards.** Uses the shared OG image generator.

```tsx
import { generateOgImage, size, contentType } from "../components/og-image";

export const alt = "Post Title";
export { size, contentType };

export default function Image() {
  return generateOgImage("{slug}");
}
```

### 4. twitter-image.tsx

Re-exports the OpenGraph image for Twitter/X cards.

```tsx
export { default, alt, size, contentType } from "./opengraph-image";
```

## Critical Requirements

1. **Date export is required**: `export const date = "YYYY-MM-DD"` - Blog.tsx uses this for discovery and sorting
2. **First heading is the title**: The first `# Heading` becomes the post title in the blog listing
3. **MdxLayout wrapper is required**: The default export must wrap children in MdxLayout
4. **Slug must be unique**: Check existing directories in `src/app/` before creating
5. **OG images are required**: Always create `opengraph-image.tsx` and `twitter-image.tsx` for social media cards

## Available Components

### BlogNote

Callout box for tips, warnings, or important information.

```mdx
<BlogNote title="Note Title">
  Content here. Supports **markdown** and HTML.
</BlogNote>

<BlogNote title="Tip" link={{ url: "https://example.com", text: "Learn more" }}>
  With an external link.
</BlogNote>
```

### BlogSection

Highlighted section with a title.

```mdx
<BlogSection title="Section Title">
  Content for this section...
</BlogSection>
```

### CodeBlock

Syntax-highlighted code with copy button. Always wrap in ResponsiveContainer.

```mdx
<ResponsiveContainer>
  <CodeBlock language="typescript" code={`
const greeting = "Hello, world!";
console.log(greeting);
  `} />
</ResponsiveContainer>
```

Supported languages: typescript, tsx, javascript, bash, json, python, go, rust, and more.

### ResponsiveContainer

Wrapper for horizontal scrolling on mobile. Use around CodeBlock and wide content.

```mdx
<ResponsiveContainer>
  {/* Wide content here */}
</ResponsiveContainer>
```

## Styling

### Color Classes

- `text-heading` - Dark brown for headings
- `text-foreground` - Main text color
- `text-muted` - Gray-brown for secondary text
- `text-link` - Warm brown for links
- `bg-surface` - Light background
- `bg-surface-hover` - Slightly darker background
- `border-border` - Standard border color

### Accent Colors (for custom elements)

- Amber/gold: `text-amber-700`, `border-amber-600/50`
- Blue: `text-blue-400`, `border-blue-500`

### Optional Styled Intro

Add a subtitle after the title:

```mdx
# Post Title

<div className="flex flex-col gap-2 my-6 self-start">
  <div className="text-amber-700 text-lg font-medium">Subtitle Text</div>
  <div className="border-l-4 border-amber-600/50 pl-4 italic text-stone-500">
    Brief description or tagline
  </div>
</div>
```

## Checklist Before Publishing

- [ ] Slug is URL-friendly (lowercase, hyphens, no spaces)
- [ ] Date is in YYYY-MM-DD format
- [ ] Title in content.mdx matches metadata title
- [ ] Description is 150-160 characters for SEO
- [ ] OpenGraph URL uses full domain: `https://www.grahamperich.com/{slug}`
- [ ] All code blocks wrapped in ResponsiveContainer
- [ ] `opengraph-image.tsx` created with correct slug and alt text
- [ ] `twitter-image.tsx` created (re-exports opengraph-image)
- [ ] Run `npm run build` to verify no errors

## Example: Complete Blog Post

**src/app/my-new-post/page.tsx:**

```tsx
import BlogPostContent from "@/app/my-new-post/content.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My New Post",
  description: "A brief description of what this post covers for search engines.",
  openGraph: {
    title: "My New Post",
    description: "A brief description of what this post covers for search engines.",
    type: "article",
    url: "https://www.grahamperich.com/my-new-post",
  },
  twitter: {
    card: "summary_large_image",
    title: "My New Post",
    description: "A brief description of what this post covers for search engines.",
  },
};

export default function MyNewPostPage() {
  return <BlogPostContent />;
}
```

**src/app/my-new-post/content.mdx:**

```mdx
import MdxLayout from '../components/mdx-layout'
import CodeBlock from '../components/CodeBlock'
import BlogNote from '../components/BlogNote'
import ResponsiveContainer from '../components/ResponsiveContainer'
import BlogSection from '../components/BlogSection'

export const date = "2026-01-16"

# My New Post

<div className="flex flex-col gap-2 my-6 self-start">
  <div className="text-amber-700 text-lg font-medium">A Journey</div>
  <div className="border-l-4 border-amber-600/50 pl-4 italic text-stone-500">
    Exploring something interesting
  </div>
</div>

## Introduction

Your introduction paragraph here...

<BlogNote title="Important">
  A callout for readers.
</BlogNote>

## Code Example

Here's how to do something:

<ResponsiveContainer>
  <CodeBlock language="typescript" code={`
function example() {
  return "Hello!";
}
  `} />
</ResponsiveContainer>

## Conclusion

Wrap up your thoughts...

export default function BlogPostContent({ children }) {
  return <MdxLayout date={date}>{children}</MdxLayout>
}
```

**src/app/my-new-post/opengraph-image.tsx:**

```tsx
import { generateOgImage, size, contentType } from "../components/og-image";

export const alt = "My New Post";
export { size, contentType };

export default function Image() {
  return generateOgImage("my-new-post");
}
```

**src/app/my-new-post/twitter-image.tsx:**

```tsx
export { default, alt, size, contentType } from "./opengraph-image";
```

## Excluded Directories

Blog.tsx excludes these directories from blog discovery:
- `components`
- `about`
- `templates`

Do not create blog posts in these directories.
