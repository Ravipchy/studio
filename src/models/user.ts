export interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: "patient" | "doctor";
  profileImage?: string;
  createdAt: Date;
}
