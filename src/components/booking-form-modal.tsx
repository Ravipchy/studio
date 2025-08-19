
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { type Doctor } from "./doctors-nearby-section";
import { BookingConfirmationModal } from "./booking-confirmation-modal";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";


interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  timeSlot: string;
  onBookingConfirmed: () => void;
  isTelemedicine: boolean;
}

export function BookingFormModal({ isOpen, onClose, doctor, timeSlot, onBookingConfirmed, isTelemedicine }: BookingFormModalProps) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmBooking = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "You must be logged in to book an appointment.",
        });
        return router.push('/login');
    }
    
    setIsLoading(true);

    try {
        const appointmentData = {
            doctorId: doctor.id,
            patientId: user.uid,
            doctorName: doctor.name,
            patientName: user.displayName,
            date: Timestamp.fromDate(new Date()), // Using today's date for now
            time: timeSlot,
            type: isTelemedicine ? "Telemedicine" : "Clinic",
            status: "Upcoming",
            createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, "appointments"), appointmentData);

        onClose();
        if (isTelemedicine) {
            router.push('/telemedicine/session');
        } else {
            setIsConfirmationOpen(true);
        }
    } catch (error) {
        console.error("Error booking appointment:", error);
        toast({
            variant: "destructive",
            title: "Booking Failed",
            description: "Could not book appointment. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
    onBookingConfirmed();
  }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book {isTelemedicine ? "Video Consultation" : "Appointment"}</DialogTitle>
          <DialogDescription>
            Confirm your details for an appointment with {doctor.name} at {timeSlot}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="name">Patient Name</Label>
            <Input id="name" defaultValue={user?.displayName || ""} placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" placeholder="30" type="number" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue={user?.phoneNumber || ""} placeholder="+91 1234567890" />
            </div>
          </div>
          <div>
            <Label htmlFor="symptoms">Briefly describe your symptoms</Label>
            <Textarea id="symptoms" placeholder="e.g., Headache, fever for 2 days..." />
          </div>
          <Separator />
          <div>
              <h3 className="font-semibold mb-2">Payment Option</h3>
              <RadioGroup defaultValue="clinic" className="flex gap-4">
                  <Label htmlFor="clinic" className="flex items-center gap-2 border rounded-md p-3 flex-1 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                      <RadioGroupItem value="clinic" id="clinic" />
                      <span>{isTelemedicine ? 'Pay Before Call' : 'Pay at Clinic'}</span>
                  </Label>
                   <Label htmlFor="online" className="flex items-center gap-2 border rounded-md p-3 flex-1 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                      <RadioGroupItem value="online" id="online" />
                      <span>Pay Online Now</span>
                  </Label>
              </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleConfirmBooking} disabled={isLoading}>
            {isLoading ? "Booking..." :
                isTelemedicine ? <><Video className="mr-2 h-4 w-4"/>Confirm & Pay (₹800)</> : "Confirm Booking (₹800)"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {!isTelemedicine && <BookingConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        doctor={doctor}
        timeSlot={timeSlot}
    />}
    </>
  );
}
