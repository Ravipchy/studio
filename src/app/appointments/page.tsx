import { AppointmentsHero } from "@/components/appointments-hero";
import { AppointmentsList } from "@/components/appointments-list";

export default function AppointmentsPage() {
  return (
    <div className="bg-background">
      <AppointmentsHero />
      <AppointmentsList />
    </div>
  );
}
