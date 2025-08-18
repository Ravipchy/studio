interface OrderItem {
  medicineId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface PharmacyOrder {
  orderId: string;
  patientId: string;
  medicineList: OrderItem[];
  status: "ordered" | "dispatched" | "delivered" | "cancelled";
  deliveryAddress: string;
  createdAt: Date;
}
