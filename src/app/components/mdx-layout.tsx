// https://nextjs.org/docs/pages/building-your-application/configuring/mdx#using-tailwind-typography-plugin
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen px-8 py-12 bg-gray-900 text-gray-100 
      prose prose-invert max-w-3xl lg:max-w-4xl mx-auto
      prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-10 prose-headings:mb-6 
      prose-h1:text-5xl prose-h1:text-transparent prose-h1:bg-clip-text prose-h1:bg-gradient-to-br prose-h1:from-blue-300 prose-h1:to-purple-500
      prose-h2:text-4xl prose-h2:text-gray-50
      prose-h3:text-3xl prose-h3:text-gray-100
      prose-h4:text-2xl prose-h4:text-gray-200
      prose-h5:text-xl prose-h5:text-gray-300
      prose-h6:text-lg prose-h6:text-gray-400
      prose-p:text-gray-300 prose-p:my-6 prose-p:leading-relaxed
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
      prose-strong:text-gray-100 prose-strong:font-semibold
      prose-code:text-yellow-300 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
      prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-800 prose-blockquote:p-4 prose-blockquote:rounded-r prose-blockquote:italic prose-blockquote:text-gray-300
      prose-li:my-1 prose-li:text-gray-300
      prose-img:rounded-lg prose-img:shadow-md"
    >
      {children}
    </div>
  );
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
