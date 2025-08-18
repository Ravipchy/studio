
import { DoctorAppointmentsHero } from "@/components/doctor-appointments-hero";
import { DoctorAppointmentsList } from "@/components/doctor-appointments-list";

export default function DoctorAppointmentsPage() {
  return (
    <div className="bg-background">
      <DoctorAppointmentsHero />
      <DoctorAppointmentsList />
    </div>
  );
}
