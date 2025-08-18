
import { TelemedicineGuideSection } from "@/components/telemedicine-guide-section";
import { TelemedicineHeroSection } from "@/components/telemedicine-hero-section";
import { PatientTestimonialsSection } from "@/components/patient-testimonials-section";
import { TelemedicineDoctors } from "@/components/telemedicine-doctors";
import { TelemedicineHowItWorks } from "@/components/telemedicine-how-it-works";

export default function TelemedicinePage() {
  return (
    <div className="bg-background">
      <TelemedicineHeroSection />
      <TelemedicineHowItWorks />
      <TelemedicineDoctors />
      <PatientTestimonialsSection />
    </div>
  );
}
