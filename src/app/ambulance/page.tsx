import { AmbulanceBookingSection } from "@/components/ambulance-booking-section";
import { AmbulanceHeroSection } from "@/components/ambulance-hero-section";
import { AmbulancePromoBanner } from "@/components/ambulance-promo-banner";

export default function AmbulancePage() {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/50">
      <AmbulanceHeroSection />
      <AmbulanceBookingSection />
      <AmbulancePromoBanner />
    </div>
  );
}
