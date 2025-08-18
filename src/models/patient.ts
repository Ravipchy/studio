// This document would use the user's UID as its ID.
export interface PatientProfile {
  name: string; // Denormalized for easy access
  dob: Date;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  userId: string; // Foreign key to users collection
  medicalHistory?: string[]; // Array of condition IDs or descriptions
}
