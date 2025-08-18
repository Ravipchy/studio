
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { OrderConfirmationModal } from "./order-confirmation-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";

interface LabTestBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  testTitle: string;
}

export function LabTestBookingModal({ isOpen, onClose, testTitle }: LabTestBookingModalProps) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleConfirmBooking = () => {
    onClose(); 
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Lab Test</DialogTitle>
          <DialogDescription>
             Confirm your details for: <strong>{testTitle}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-4">
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
            <Label htmlFor="address">Sample Collection Address</Label>
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
                            <SelectItem value="morning">Morning (7am - 10am)</SelectItem>
                            <SelectItem value="forenoon">Forenoon (10am - 1pm)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
           </div>
          <Separator />
          <div>
              <h3 className="font-semibold mb-2">Payment Option</h3>
              <RadioGroup defaultValue="collection" className="flex gap-4">
                  <Label htmlFor="collection" className="flex items-center gap-2 border rounded-md p-3 flex-1 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                      <RadioGroupItem value="collection" id="collection" />
                      <span>Pay at Collection</span>
                  </Label>
                   <Label htmlFor="online" className="flex items-center gap-2 border rounded-md p-3 flex-1 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                      <RadioGroupItem value="online" id="online" />
                      <span>Pay Online Now</span>
                  </Label>
              </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirmBooking}>
            Confirm Booking
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
