import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import MLS from "@/components/MLS";
import Journey from "@/components/Journey";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
export default function Home() {

  return (
    <main>
      <Navbar />
      <HeroSection />
      <MLS />
      <Journey />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}
