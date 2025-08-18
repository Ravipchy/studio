export interface Appointment {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  type: "in-person" | "telemedicine";
  date: Date;
  time: string; // e.g., "10:30 AM"
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
}
