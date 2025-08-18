
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle2, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
import { type Doctor } from "./doctors-nearby-section";

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  timeSlot: string;
}

export function BookingConfirmationModal({ isOpen, onClose, doctor, timeSlot }: BookingConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle2 className="h-20 w-20 text-green-500" />
            </motion.div>
          </div>
          <DialogTitle className="text-center text-2xl pt-4">Appointment Booked!</DialogTitle>
          <DialogDescription className="text-center">
            Your appointment with {doctor.name} on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {timeSlot} has been confirmed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center sm:justify-center flex-col sm:flex-row gap-2">
            <Button variant="outline"><CalendarPlus className="mr-2 h-4 w-4"/> Add to Calendar</Button>
            <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
