export interface MedicalReport {
  reportId: string;
  patientId: string;
  doctorId?: string; // Optional, if shared by a specific doctor
  fileUrl: string; // Link to the report in Firebase Storage
  sharedWith: string[]; // Array of doctor UIDs
  createdAt: Date;
}
