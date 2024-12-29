import HelloWorld from "./components/HelloWorld";
import Writing from "./components/Blog";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-24 items-center">
        <HelloWorld />
        <Writing />
      </main>

      <footer className="row-start-2 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Graham Perich
      </footer>
    </div>
  );
}
