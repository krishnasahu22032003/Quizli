import Features from "@/components/ui/Features";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import HowItWorks from "@/components/ui/HowItWorks";
import Pricing from "@/components/ui/Pricing";


export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks/>
        <Pricing/>
      </main>

    </div>
  );
}