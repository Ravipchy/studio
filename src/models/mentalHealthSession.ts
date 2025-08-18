export interface MentalHealthSession {
  sessionId: string;
  patientId: string;
  counsellorId: string;
  date: Date;
  time: string;
  status: "pending" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
}
