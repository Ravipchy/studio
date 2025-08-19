
import { GeoPoint } from "firebase/firestore";

// This document would use the user's UID as its ID.
export interface DriverProfile {
  name: string; // Denormalized for easy access
  phone: string;
  vehicleNo: string;
  isAvailable: boolean;
  location: GeoPoint; // Live location
  userId: string; // Foreign key to users collection
}
