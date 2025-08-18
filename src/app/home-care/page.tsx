import { HomeCareBanner } from "@/components/home-care-banner";
import { HomeCareHero } from "@/components/home-care-hero";
import { HomeCareHowItWorks } from "@/components/home-care-how-it-works";
import { HomeCareServices } from "@/components/home-care-services";
import { PatientTestimonialsSection } from "@/components/patient-testimonials-section";

export default function HomeCarePage() {
  return (
    <div className="bg-background">
      <HomeCareHero />
      <HomeCareServices />
      <HomeCareHowItWorks />
      <PatientTestimonialsSection />
      <HomeCareBanner />
    </div>
  );
}
