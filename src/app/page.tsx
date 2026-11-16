import Navbar from "@/components/Navbar";
import ShowcaseView from "@/components/ShowcaseView";
import Footer from "@/components/Footer";
import FlaxAiAgent from "@/components/FlaxAiAgent";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ShowcaseView />
      </main>
      <Footer />
      <FlaxAiAgent />
    </div>
  );
}
