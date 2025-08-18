
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Repeat, FileDown, MessageSquare } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PharmacyOrderDetailsModal } from "./pharmacy-order-details-modal";
import Link from "next/link";

type OrderStatus = "Pending" | "Processing" | "Out for Delivery" | "Delivered";

export type Order = {
  id: string;
  date: string;
  medicines: { name: string; image: string; quantity: number }[];
  total: string;
  status: OrderStatus;
};

const orders: Order[] = [
  { id: "#AS-1025", date: "20 Aug 2025, 10:30 AM", medicines: [{ name: "Paracetamol 500mg", image: "https://placehold.co/100x100.png", quantity: 2 }, { name: "Dolo 650", image: "https://placehold.co/100x100.png", quantity: 1 }], total: "55.00", status: "Delivered" },
  { id: "#AS-1024", date: "18 Aug 2025, 05:00 PM", medicines: [{ name: "N95 Mask", image: "https://placehold.co/100x100.png", quantity: 5 }], total: "495.00", status: "Out for Delivery" },
  { id: "#AS-1023", date: "17 Aug 2025, 11:00 AM", medicines: [{ name: "Metformin 500mg", image: "https://placehold.co/100x100.png", quantity: 3 }], total: "165.00", status: "Processing" },
  { id: "#AS-1022", date: "15 Aug 2025, 09:00 AM", medicines: [{ name: "Vitamin C 1000mg", image: "https://placehold.co/100x100.png", quantity: 1 }], total: "150.00", status: "Pending" },
];

export function PharmacyOrdersList() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Out for Delivery": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-purple-100 text-purple-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCloseModal = () => setSelectedOrder(null);

  if (orders.length === 0) {
      return (
          <section className="py-12 md:py-24">
              <div className="container text-center">
                <Package className="h-24 w-24 mx-auto text-muted-foreground" />
                <h2 className="mt-6 text-2xl font-bold">No orders yet.</h2>
                <p className="mt-2 text-muted-foreground">Book your medicines now to see your orders here!</p>
                <Button asChild className="mt-6">
                  <Link href="/pharmacy">Go to Pharmacy</Link>
                </Button>
              </div>
          </section>
      )
  }

  return (
    <section className="py-12 md:py-24">
      <div className="container">
        <Card className="mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <div className="lg:col-span-1">
              <label htmlFor="search-order" className="text-sm font-medium">Search Order</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="search-order" placeholder="Search by Order ID or Medicine..." className="pl-10 h-12" />
              </div>
            </div>
            <div>
              <label htmlFor="filter-status" className="text-sm font-medium">Status</label>
              <Select>
                <SelectTrigger id="filter-status" className="h-12">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="h-12">Search Orders</Button>
          </div>
        </Card>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Order {order.id}</CardTitle>
                      <CardDescription>Placed on: {order.date}</CardDescription>
                    </div>
                    <Badge variant="outline" className={`font-semibold ${getStatusClass(order.status)}`}>{order.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {order.medicines.map((med, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <Image src={med.image} alt={med.name} width={60} height={60} className="rounded-md border" data-ai-hint="medicine product photo"/>
                        <p className="text-xs text-center w-20 truncate">{med.name} (x{med.quantity})</p>
                      </div>
                    ))}
                    {order.medicines.length > 3 && <div className="text-muted-foreground self-center">+ {order.medicines.length - 3} more</div>}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="font-bold text-lg">Total: ₹{order.total}</p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm"><Repeat className="mr-2 h-4 w-4"/> Reorder</Button>
                    <Button onClick={() => setSelectedOrder(order)}>View Details</Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedOrder && (
        <PharmacyOrderDetailsModal
            isOpen={!!selectedOrder}
            onClose={handleCloseModal}
            order={selectedOrder}
        />
      )}
    </section>
  );
}
