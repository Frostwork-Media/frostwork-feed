import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export default async function Home() {
  return (
    <>
      <Nav />
      <p className="text-center text-neutral-500">Select a Category</p>
      <Footer />
    </>
  );
}
