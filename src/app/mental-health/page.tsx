
import { MentalHealthHero } from "@/components/mental-health-hero";
import { MentalHealthWhyMatters } from "@/components/mental-health-why-matters";
import { MentalHealthTherapists } from "@/components/mental-health-therapists";
import { MentalHealthHowItWorks } from "@/components/mental-health-how-it-works";
import { MentalHealthResources } from "@/components/mental-health-resources";
import { PatientTestimonialsSection } from "@/components/patient-testimonials-section";
import { MentalHealthEmergencyBanner } from "@/components/mental-health-emergency-banner";


export default function MentalHealthPage() {
  return (
    <div className="bg-background">
      <MentalHealthHero />
      <MentalHealthWhyMatters />
      <MentalHealthTherapists />
      <MentalHealthHowItWorks />
      <MentalHealthResources />
      <PatientTestimonialsSection />
      <MentalHealthEmergencyBanner />
    </div>
  );
}
