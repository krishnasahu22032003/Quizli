import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonial";


export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks/>
        <Pricing/>
        <Testimonials/>
        <CTA/>
      </main>

    </div>
  );
}