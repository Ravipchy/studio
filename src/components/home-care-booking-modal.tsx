
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { OrderConfirmationModal } from "./order-confirmation-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";

interface HomeCareBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
}

export function HomeCareBookingModal({ isOpen, onClose, serviceTitle }: HomeCareBookingModalProps) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleConfirmBooking = async () => {
     if (!user) {
        toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "You must be logged in to book a service.",
        });
        return router.push('/login');
    }
    if (!date) {
        toast({ variant: "destructive", title: "Please select a date." });
        return;
    }

    setIsLoading(true);
    try {
        await addDoc(collection(db, "homeCareBookings"), {
            patientId: user.uid,
            patientName: user.displayName,
            serviceType: serviceTitle,
            status: "Upcoming",
            scheduledDate: Timestamp.fromDate(date),
            createdAt: serverTimestamp(),
        });

        onClose(); 
        setIsConfirmationOpen(true);
    } catch (error) {
        console.error("Error booking home care:", error);
        toast({
            variant: "destructive",
            title: "Booking Failed",
            description: "Could not book service. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
    router.push('/home-care/history');
  }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Home Care Service</DialogTitle>
          <DialogDescription>
            Confirm your details for: <strong>{serviceTitle}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-4">
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
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="123 Health St, Wellness City, Hyderabad" />
          </div>
           <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Preferred Date</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                     <Label>Preferred Time</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                            <SelectItem value="evening">Evening (4pm - 8pm)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
           </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time Visit</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea id="notes" placeholder="e.g., specific instructions for the care provider..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleConfirmBooking} disabled={isLoading}>
            {isLoading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={handleCloseConfirmation}
    />
    </>
  );
}
