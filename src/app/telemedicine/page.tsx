import { TelemedicineGuideSection } from "@/components/telemedicine-guide-section";
import { TelemedicineHeroSection } from "@/components/telemedicine-hero-section";
import { PatientTestimonialsSection } from "@/components/patient-testimonials-section";

export default function TelemedicinePage() {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/50">
      <TelemedicineHeroSection />
      <TelemedicineGuideSection />
      <PatientTestimonialsSection />
    </div>
  );
}
