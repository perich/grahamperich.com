import type { MDXComponents } from 'mdx/types'
 

// Good to know:
// https://nextjs.org/docs/pages/building-your-application/configuring/mdx
// mdx-components.tsx is required to use @next/mdx with App Router and will not work without it.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}