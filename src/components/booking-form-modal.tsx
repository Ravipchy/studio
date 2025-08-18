
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

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  timeSlot: string;
  onBookingConfirmed: () => void;
}

export function BookingFormModal({ isOpen, onClose, doctor, timeSlot, onBookingConfirmed }: BookingFormModalProps) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleConfirmBooking = () => {
    // Logic to submit form data would go here
    onClose(); // Close the current form
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
    onBookingConfirmed(); // Also close the underlying profile modal
  }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Confirm your details for an appointment with {doctor.name} at {timeSlot}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="name">Patient Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" placeholder="30" type="number" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+91 1234567890" />
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
                      <span>Pay at Clinic</span>
                  </Label>
                   <Label htmlFor="online" className="flex items-center gap-2 border rounded-md p-3 flex-1 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                      <RadioGroupItem value="online" id="online" />
                      <span>Pay Online</span>
                  </Label>
              </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirmBooking}>Confirm & Book (₹800)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <BookingConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        doctor={doctor}
        timeSlot={timeSlot}
    />
    </>
  );
}
