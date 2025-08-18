export interface LabTest {
  labTestId: string;
  patientId: string;
  testName: string;
  status: "booked" | "processing" | "completed";
  resultUrl?: string; // URL to the report PDF/image
  createdAt: Date;
}
