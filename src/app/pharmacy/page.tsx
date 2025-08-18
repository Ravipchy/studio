import { PharmacyHeroSection } from "@/components/pharmacy-hero-section";
import { PharmacyCategoriesSection } from "@/components/pharmacy-categories-section";
import { PharmacyListingSection } from "@/components/pharmacy-listing-section";
import { PharmacyPrescriptionUpload } from "@/components/pharmacy-prescription-upload";

export default function PharmacyPage() {
  return (
    <div className="bg-background">
      <PharmacyHeroSection />
      <PharmacyCategoriesSection />
      <PharmacyListingSection />
      <PharmacyPrescriptionUpload />
    </div>
  );
}
