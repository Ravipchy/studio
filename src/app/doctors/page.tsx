import { DoctorsHeroSection } from "@/components/doctors-hero-section";
import { DoctorsNearbySection } from "@/components/doctors-nearby-section";
import { DoctorsPromoBanner } from "@/components/doctors-promo-banner";

export default function DoctorsPage() {
  return (
    <div className="bg-slate-50">
      <DoctorsHeroSection />
      <DoctorsNearbySection />
      <DoctorsPromoBanner />
    </div>
  );
}
