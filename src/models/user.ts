
export interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: "patient" | "doctor" | "driver";
  profileImage?: string;
  createdAt: Date;
  vehicleNo?: string; // Specific to drivers
}
