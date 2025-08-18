
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Appointment } from "./appointments-list";
import { Calendar, Clock, MapPin, Video, User, FileText, Phone, Mail } from "lucide-react";
import Image from "next/image";

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

export function AppointmentDetailsModal({ isOpen, onClose, appointment }: AppointmentDetailsModalProps) {
  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            Details for appointment #{appointment.id}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            
            {/* Doctor Details */}
            <div className="flex items-center gap-4">
                <Image src={appointment.doctor.avatar} alt={appointment.doctor.name} width={80} height={80} className="rounded-full border" data-ai-hint="doctor avatar" />
                <div>
                    <h3 className="font-bold text-lg">{appointment.doctor.name}</h3>
                    <p className="text-muted-foreground">{appointment.doctor.specialty}</p>
                    <div className="flex gap-2 mt-1">
                        <Button variant="outline" size="icon" className="h-8 w-8"><Phone className="h-4 w-4"/></Button>
                        <Button variant="outline" size="icon" className="h-8 w-8"><Mail className="h-4 w-4"/></Button>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Appointment Info */}
            <div>
                <h3 className="font-semibold mb-3">Appointment Info</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>Date: <span className="font-medium">{appointment.date}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>Time: <span className="font-medium">{appointment.time}</span></span>
                    </div>
                     <div className="flex items-center gap-3">
                        {appointment.type === "Clinic" ? <MapPin className="h-5 w-5 text-primary" /> : <Video className="h-5 w-5 text-primary" />}
                       <span>Mode: <span className="font-medium">{appointment.type === "Clinic" ? "In-Person" : "Telemedicine"}</span></span>
                   </div>
                    <div className="flex items-start gap-3">
                       <MapPin className="h-5 w-5 text-primary mt-0.5" />
                       <span>Location: <span className="font-medium">{appointment.location}</span></span>
                   </div>
                </div>
            </div>

            <Separator />
            
            {/* Patient Details */}
            <div>
                <h3 className="font-semibold mb-3">Patient Details</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <span>Name: <span className="font-medium">John Doe</span></span>
                    </div>
                     <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Symptoms: <span className="font-medium">Headache, fever</span></span>
                    </div>
                </div>
            </div>
            
        </div>
        <DialogFooter className="flex-col sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Download Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
