import HelloWorld from "./components/HelloWorld";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 sm:px-8">
        {/* Hero Section */}
        <section className="w-full max-w-3xl pt-24 sm:pt-32 pb-12 sm:pb-14">
          <HelloWorld />
        </section>

        {/* Divider */}
        <div className="w-full max-w-2xl">
          <div className="h-px bg-border" />
        </div>

        {/* Blog Section */}
        <section className="w-full max-w-3xl py-12 sm:py-14">
          <Blog />
        </section>
      </main>

      <Footer />
    </div>
  );
}
