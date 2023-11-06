import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export default async function Home() {
  return (
    <div className="h-screen grid grid-rows-[auto_minmax(0,1fr)_auto]">
      <Nav />
      <div className="flex flex-col items-center justify-center flex-1">
        <p className="text-center text-neutral-500 text-xl">
          Select a Category
        </p>
      </div>
      <Footer />
    </div>
  );
}
