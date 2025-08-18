
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Repeat, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type BookingStatus = "Upcoming" | "Completed" | "Cancelled";

type HomeCareBooking = {
  id: string;
  serviceType: string;
  date: string;
  address: string;
  status: BookingStatus;
};

const bookings: HomeCareBooking[] = [
  { id: "#HC-501", serviceType: "Nursing Care", date: "30 Aug 2025", address: "123 Health St, Hyderabad", status: "Upcoming" },
  { id: "#HC-502", serviceType: "Physiotherapy", date: "15 Aug 2025", address: "123 Health St, Hyderabad", status: "Completed" },
  { id: "#HC-503", serviceType: "Elderly Care", date: "10 Aug 2025", address: "123 Health St, Hyderabad", status: "Completed" },
  { id: "#HC-504", serviceType: "Nursing Care", date: "01 Aug 2025", address: "123 Health St, Hyderabad", status: "Cancelled" },
];

export default function HomeCareHistoryPage() {

  const getStatusClass = (status: BookingStatus) => {
    switch (status) {
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-background">
      <section className="w-full py-12 md:py-24 bg-muted/20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container px-4 md:px-6 text-center"
        >
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
              <CalendarDays className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            My Home Care Bookings
          </h1>
          <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
            View your past and upcoming home care service appointments.
          </p>
        </motion.div>
      </section>
      
      <section className="py-12 md:py-24">
        <div className="container">
          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <CardTitle>Booking {booking.id}</CardTitle>
                        <Badge variant="outline" className={`mt-2 sm:mt-0 font-semibold ${getStatusClass(booking.status)}`}>{booking.status}</Badge>
                      </div>
                      <CardDescription>Service: {booking.serviceType}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm"><strong>Date:</strong> {booking.date}</p>
                      <p className="text-sm"><strong>Address:</strong> {booking.address}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      {booking.status === "Upcoming" && <Button variant="destructive" size="sm">Cancel</Button>}
                      {booking.status !== "Upcoming" && <Button variant="outline" size="sm"><Repeat className="mr-2 h-4 w-4" /> Rebook</Button>}
                      <Button variant="secondary" size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Home className="h-24 w-24 mx-auto text-muted-foreground" />
              <h2 className="mt-6 text-2xl font-bold">No home care bookings found.</h2>
              <p className="mt-2 text-muted-foreground">Request a service to see your history here.</p>
              <Button asChild className="mt-6">
                  <Link href="/home-care">Book a Service</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
