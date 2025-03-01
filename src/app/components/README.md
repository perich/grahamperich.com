# Blog Components

This directory contains reusable components for blog posts. These components help maintain consistent styling and responsive behavior across all blog posts.

## Available Components

### `MdxLayout`

The main wrapper for all MDX blog posts. It provides consistent typography, spacing, and responsive behavior.

```jsx
import MdxLayout from '../components/mdx-layout'

export const date = "2025-02-28"

# Your Blog Title

Content goes here...

export default function YourBlogContent({ children }) {
  return <MdxLayout date={date}>{children}</MdxLayout>
}
```

### `BlogSection`

Use for highlighting important sections with colored borders.

```jsx
<BlogSection title="📝 Project Goals" color="blue">
  Content goes here...
</BlogSection>
```

**Props:**
- `title`: Section heading
- `color`: Border and title color (options: "blue", "green", "purple", "yellow", "red")
- `children`: Content inside the section

### `BlogNote`

Use for adding highlighted notes or tips.

```jsx
<BlogNote type="info" title="Did You Know?">
  Interesting fact goes here...
</BlogNote>
```

**Props:**
- `title`: Optional note title
- `type`: Note style (options: "info", "warning", "tip", "note")
- `children`: Content inside the note

### `ResponsiveContainer`

Wrapper to ensure any content is responsive and scrollable if needed.

```jsx
<ResponsiveContainer>
  <div className="wide-content">...</div>
</ResponsiveContainer>
```

**Props:**
- `className`: Additional CSS classes
- `children`: Content to make responsive

### `CodeBlock`

Syntax-highlighted code blocks.

```jsx
<CodeBlock language="tsx" code={`
const example = "code";
function demo() {
  return example;
}
`} />
```

**Props:**
- `language`: Programming language for syntax highlighting
- `code`: The code to display

## Usage Examples

### For a code snippet:

```jsx
<ResponsiveContainer>
  <CodeBlock language="typescript" code={`
const greeting = "Hello, world!";
console.log(greeting);
`} />
</ResponsiveContainer>
```

### For a highlighted section:

```jsx
<BlogSection title="🚀 Getting Started" color="green">
  <p>Follow these steps to get started:</p>
  <ul>
    <li>Step 1: Install dependencies</li>
    <li>Step 2: Configure settings</li>
    <li>Step 3: Run the application</li>
  </ul>
</BlogSection>
```

### For a note or warning:

```jsx
<BlogNote type="warning" title="Important">
  Make sure to backup your data before proceeding.
</BlogNote>
```

### For complex responsive layouts:

```jsx
<ResponsiveContainer>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-gray-800 p-4 rounded">
      <h3>Column 1</h3>
      <p>Content...</p>
    </div>
    <div className="bg-gray-800 p-4 rounded">
      <h3>Column 2</h3>
      <p>Content...</p>
    </div>
  </div>
</ResponsiveContainer>
```