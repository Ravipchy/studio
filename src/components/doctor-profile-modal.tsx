
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { MapPin, Star, Calendar, Clock, X, Phone, Video } from "lucide-react";
import { Badge } from "./ui/badge";
import { type Doctor } from "./doctors-nearby-section";
import { BookingFormModal } from "./booking-form-modal";

interface DoctorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

const availableTimeSlots = [ "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM" ];

export function DoctorProfileModal({ isOpen, onClose, doctor }: DoctorProfileModalProps) {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!doctor) return null;

  const isTelemedicine = doctor.distance === "Online";

  const handleBookNow = (slot: string) => {
    setSelectedSlot(slot);
    setIsBookingFormOpen(true);
  };
  
  const handleCloseBookingForm = () => {
    setIsBookingFormOpen(false);
    setSelectedSlot(null); // Reset slot when closing
  };


  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0">
          <Button variant="ghost" size="icon" className="absolute top-3 right-3 z-10" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>

        <div className="grid md:grid-cols-2">
            <div className="p-6 flex flex-col items-center justify-center text-center bg-muted/30">
                <Image src={doctor.avatar} alt={doctor.name} width={120} height={120} className="rounded-full border-4 border-background shadow-lg" data-ai-hint="doctor professional photo"/>
                <DialogTitle className="mt-4 text-2xl">{doctor.name}</DialogTitle>
                <DialogDescription className="text-primary font-semibold">{doctor.specialty}</DialogDescription>
                <p className="text-sm text-muted-foreground mt-1">{doctor.qualification}</p>
                <div className="flex items-center my-3">
                    {[...Array(doctor.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                    <span className="text-sm text-muted-foreground ml-2">({doctor.reviews} reviews)</span>
                </div>
                 <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm"><Phone className="mr-2 h-4 w-4"/> Call Now</Button>
                    <Button variant="outline" size="sm" disabled={!isTelemedicine}><Video className="mr-2 h-4 w-4"/> Video Consult</Button>
                 </div>
            </div>
            <div className="p-6">
                <h3 className="font-semibold mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Dr. {doctor.name} is a highly respected {doctor.specialty} with {doctor.experience} of experience. Known for a patient-centric approach and commitment to providing the highest quality care.
                </p>
                <Separator />
                <div className="flex items-center gap-2 my-4">
                    {isTelemedicine ? <Video className="h-5 w-5 text-primary" /> : <MapPin className="h-5 w-5 text-primary" />}
                    <div>
                        <p className="font-semibold">{isTelemedicine ? "Online Consultation" : "Arogya Sathi Clinic"}</p>
                        <p className="text-sm text-muted-foreground">{isTelemedicine ? "Available for video calls" : `123 Health St, Hyderabad. ${doctor.distance}`}</p>
                    </div>
                </div>
                 <Separator />
                 <div className="my-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Available Slots
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {availableTimeSlots.map(slot => (
                            <Button key={slot} variant="outline" onClick={() => handleBookNow(slot)}>
                                <Clock className="mr-2 h-4 w-4" />
                                {slot}
                            </Button>
                        ))}
                    </div>
                 </div>
                 <Separator />
                 <div className="mt-4">
                     <p className="font-semibold">Consultation Fee: <span className="text-primary">₹800</span></p>
                 </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>

    {isBookingFormOpen && selectedSlot && doctor && (
        <BookingFormModal 
            isOpen={isBookingFormOpen}
            onClose={handleCloseBookingForm}
            doctor={doctor}
            timeSlot={selectedSlot}
            onBookingConfirmed={onClose} // Close profile modal on final confirmation
            isTelemedicine={isTelemedicine}
        />
    )}
    </>
  );
}
