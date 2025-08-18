export interface AmbulanceBooking {
  bookingId: string;
  patientId: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  destination: string;
  status: "requested" | "on-the-way" | "completed" | "cancelled";
  createdAt: Date;
}
