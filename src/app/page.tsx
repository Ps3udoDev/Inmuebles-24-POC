import { Header } from "@/components/organisms/header";
import { HeroSection } from "@/components/organisms/hero-section";
import { FeaturesSection } from "@/components/organisms/features-section";
import { PropertiesSection } from "@/components/organisms/properties-section";
import { TestimonialsSection } from "@/components/organisms/testimonials-section";
import { CTASection } from "@/components/organisms/cta-section";
import { Footer } from "@/components/organisms/footer";

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="flex h-full grow flex-col">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PropertiesSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
