## Commands

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
vercel --prod    # deploy the site to prod
```

## Architecture

This is a Next.js 15 personal portfolio/blog using the App Router with MDX for content.

### Directory Structure

- `src/app/` - App router pages and components
- `src/app/components/` - Shared UI components (Nav, Blog, BlogNote, BlogSection, CodeBlock, etc.)
- `src/mdx-components.tsx` - Custom component mapping for MDX files

### Blog System

Blog posts are file-based with no database:
- Each post lives in `src/app/{slug}/` with a `page.tsx` and `content.mdx`
- `Blog.tsx` dynamically scans for directories containing `content.mdx`
- Metadata is extracted from MDX files:
  - Title: first `# heading`
  - Date: `export const date = "YYYY-MM-DD"`

### Server/Client Split

- Server Components (default): pages, Blog.tsx (filesystem access)
- Client Components (`"use client"`): Nav, BlogSection, BlogNote, CodeBlock

### Styling

- Tailwind CSS with dark theme
- `@tailwindcss/typography` plugin for prose
- Custom gradient utility `.text-gradient-gold`

### Adding a New Blog Post

1. Create directory: `src/app/{slug}/`
2. Add `page.tsx` that imports and renders `content.mdx`
3. Add `content.mdx` with `export const date = "YYYY-MM-DD"` and content starting with `# Title`
4. Use custom components: `BlogNote`, `BlogSection`, `CodeBlock`, `ResponsiveContainer`
