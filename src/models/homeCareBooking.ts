export interface HomeCareBooking {
  bookingId: string;
  patientId: string;
  serviceType: "nurse" | "elderly-care" | "physiotherapy" | "post-surgery";
  status: "pending" | "confirmed" | "completed" | "cancelled";
  scheduledDate: Date;
  createdAt: Date;
}
