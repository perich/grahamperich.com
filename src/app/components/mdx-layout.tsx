// https://nextjs.org/docs/pages/building-your-application/configuring/mdx#using-tailwind-typography-plugin
export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
      <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
        {children}
      </div>
    )
  }


// Example Usage:

// import MdxLayout from '../components/mdx-layout'
 
// # Welcome to my MDX page!
 
// export default function MDXPage({ children }) {
//   return <MdxLayout>{children}</MdxLayout>
// }


// The "magic" happens in several steps:

// 1. Compilation: The MDX compiler converts your markdown content into JSX elements:
//    # Welcome becomes -> <h1>Welcome</h1>
//    Code blocks become ->  <pre> and <code> elements
//    Paragraphs become -> <p> elements
//    etc.

// ** 🚨🚨 THE IMPORTANT PART FOR UNDERSTANDING HOW .MDX FILES WORK🚨🚨  ***
// 2. Component Injection: All these converted elements become the children prop in your default export function. So internally, it looks something like this:
//      Pseudo-code of what Next.js/MDX generates
//          export default function MDXPage() {
//              const mdxContent = (
//              <>
//                  <h1>Welcome to my MDX page!</h1>
//                  {/* Any other MDX content */}
//              </>
//              );
//              return <MdxLayout>{mdxContent}</MdxLayout>;
//          }

// 3. Layout Application: Your MdxLayout component then wraps this content with Tailwind's typography styles:
//      - The prose class from @tailwindcss/typography applies sensible typography defaults
//      - Your additional classes (prose-headings:mt-8, etc.) customize these defaults

// 4. Final Render: Next.js treats this like any other React component in your app