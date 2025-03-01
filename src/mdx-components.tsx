import type { MDXComponents } from 'mdx/types'
import BlogSection from './app/components/BlogSection'
import BlogNote from './app/components/BlogNote'
import ResponsiveContainer from './app/components/ResponsiveContainer'
import CodeBlock from './app/components/CodeBlock'

// Good to know:
// https://nextjs.org/docs/pages/building-your-application/configuring/mdx
// mdx-components.tsx is required to use @next/mdx with App Router and will not work without it.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    BlogSection,
    BlogNote,
    ResponsiveContainer,
    CodeBlock,
    // Add custom handling for pre and code elements to ensure they're responsive
    pre: (props) => (
      <ResponsiveContainer>
        <pre {...props} />
      </ResponsiveContainer>
    ),
  }
}