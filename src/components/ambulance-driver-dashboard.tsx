
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, doc, updateDoc, Timestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, User, Check, Play, Navigation } from "lucide-react";
import { motion } from "framer-motion";

type BookingStatus = "Pending" | "Accepted" | "On The Way" | "Completed" | "Rejected";

type AmbulanceBooking = {
  id: string;
  patientId: string;
  patientName?: string;
  pickupLocation: string;
  dropLocation: string;
  status: BookingStatus;
  timestamp: Timestamp;
};

export function AmbulanceDriverDashboard() {
  const { user, userData } = useAuth();
  const [bookings, setBookings] = useState<AmbulanceBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);

    const bookingsRef = collection(db, "ambulanceBookings");
    const q = query(bookingsRef, where("driverId", "==", user.uid), where("status", "!=", "Completed"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const assignedBookings: AmbulanceBooking[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        assignedBookings.push({
          id: doc.id,
          patientId: data.patientId,
          patientName: data.patientName || "Unknown Patient",
          pickupLocation: data.pickupLocation,
          dropLocation: data.dropLocation,
          status: data.status,
          timestamp: data.timestamp,
        });
      });
      // Sort by timestamp, newest first
      assignedBookings.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
      setBookings(assignedBookings);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleUpdateStatus = async (bookingId: string, newStatus: BookingStatus) => {
    const bookingRef = doc(db, "ambulanceBookings", bookingId);
    try {
      await updateDoc(bookingRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const getStatusClass = (status: BookingStatus) => {
    switch (status) {
      case "Accepted": return "bg-blue-100 text-blue-800";
      case "On The Way": return "bg-purple-100 text-purple-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-muted/40 min-h-screen p-8">
        <Skeleton className="h-10 w-1/3 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/4 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted/40 min-h-screen p-4 md:p-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
            <h1 className="text-4xl font-bold font-headline">Driver Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userData?.name || 'Driver'}.</p>
        </div>
        <Card className="p-4 mt-4 md:mt-0">
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                     <AvatarImage src={user?.photoURL || ''} alt={userData?.name || ''} />
                    <AvatarFallback>{userData?.name?.charAt(0) || 'D'}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">{userData?.name}</p>
                    <p className="text-sm text-muted-foreground">Vehicle No: {userData?.vehicleNo || 'N/A'}</p>
                </div>
            </div>
        </Card>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Booking #{booking.id.slice(-6)}</CardTitle>
                    <Badge className={getStatusClass(booking.status)}>{booking.status}</Badge>
                  </div>
                  <CardDescription>
                    {booking.timestamp.toDate().toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                   <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary"/>
                        <span className="font-medium">{booking.patientName}</span>
                   </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold">Pickup</p>
                      <p className="text-sm text-muted-foreground">{booking.pickupLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <p className="text-sm font-semibold">Drop</p>
                      <p className="text-sm text-muted-foreground">{booking.dropLocation}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  {booking.status === "Pending" && (
                    <div className="flex w-full gap-2">
                      <Button variant="destructive" className="w-full" onClick={() => handleUpdateStatus(booking.id, "Rejected")}>Reject</Button>
                      <Button className="w-full" onClick={() => handleUpdateStatus(booking.id, "Accepted")}>
                        <Check className="mr-2 h-4 w-4" /> Accept
                      </Button>
                    </div>
                  )}
                  {booking.status === "Accepted" && (
                    <Button className="w-full" onClick={() => handleUpdateStatus(booking.id, "On The Way")}>
                      <Play className="mr-2 h-4 w-4" /> Start Trip
                    </Button>
                  )}
                  {booking.status === "On The Way" && (
                     <Button className="w-full" onClick={() => handleUpdateStatus(booking.id, "Completed")}>
                      <Check className="mr-2 h-4 w-4" /> Mark as Completed
                    </Button>
                  )}
                   <Button variant="outline" className="w-full">
                        <Navigation className="mr-2 h-4 w-4" /> View Route
                    </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-muted-foreground">
            <p>No active bookings assigned.</p>
          </div>
        )}
      </div>
    </div>
  );
}
