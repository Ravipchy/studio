import { AdBanner } from "@/components/ad-banner";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { SearchFilters } from "@/components/search-filters";
import { ServicesSection } from "@/components/services-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchFilters />
      <ServicesSection />
      <AdBanner />
      <HowItWorks />
    </>
  );
}
