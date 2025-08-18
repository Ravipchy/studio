// This document would use the user's UID as its ID.
export interface DoctorProfile {
  name: string; // Denormalized for easy access
  specialization: string;
  experience: string; // e.g., "10+ years"
  clinicAddress: string;
  availability: string[]; // Array of time slots like "10:00 AM"
  telemedicineEnabled: boolean;
  userId: string; // Foreign key to users collection
}
