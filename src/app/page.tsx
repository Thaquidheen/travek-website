import { HeroSection } from "@/components/Hero";
import { DestinationsSection } from "@/components/Destinations";
import { ServicesSection } from "@/components/Services";
import { WorldMapSection } from "@/components/WorldMap";
import { AboutSection } from "@/components/About";
import { FAQSection } from "@/components/FAQ";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <DestinationsSection />
      <ServicesSection />
      <WorldMapSection />
      <FAQSection />
    </main>
  );
}
