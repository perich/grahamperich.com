import HelloWorld from "./components/HelloWorld";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <main className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="w-full max-w-6xl pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24">
          <HelloWorld />
        </section>

        {/* Divider */}
        <div className="w-full max-w-2xl">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Blog Section */}
        <section className="w-full max-w-6xl py-16 sm:py-24">
          <Blog />
        </section>
      </main>

      <Footer />
    </div>
  );
}
