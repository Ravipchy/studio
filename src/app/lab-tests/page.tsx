
import { LabTestsHero } from "@/components/lab-tests-hero";
import { LabTestsSearch } from "@/components/lab-tests-search";
import { LabTestsPackages } from "@/components/lab-tests-packages";
import { LabTestsHowItWorks } from "@/components/lab-tests-how-it-works";
import { LabTestsBenefits } from "@/components/lab-tests-benefits";
import { PatientTestimonialsSection } from "@/components/patient-testimonials-section";
import { LabTestsCtaBanner } from "@/components/lab-tests-cta-banner";

export default function LabTestsPage() {
  return (
    <div className="bg-background">
      <LabTestsHero />
      <LabTestsSearch />
      <LabTestsPackages />
      <LabTestsHowItWorks />
      <LabTestsBenefits />
      <PatientTestimonialsSection />
      <LabTestsCtaBanner />
    </div>
  );
}
