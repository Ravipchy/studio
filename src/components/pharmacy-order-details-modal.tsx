
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Order } from "./pharmacy-orders-list";
import { CheckCircle, Package, Truck, Home, Clock, FileDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PharmacyOrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const timelineSteps = [
  { status: "Pending", icon: Clock },
  { status: "Processing", icon: Package },
  { status: "Out for Delivery", icon: Truck },
  { status: "Delivered", icon: Home },
] as const;

export function PharmacyOrderDetailsModal({ isOpen, onClose, order }: PharmacyOrderDetailsModalProps) {
  if (!order) return null;

  const currentStepIndex = timelineSteps.findIndex(step => step.status === order.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details: {order.id}</DialogTitle>
          <DialogDescription>
            Placed on {order.date}. Current Status: {order.status}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {/* Timeline */}
            <div>
                <h3 className="font-semibold mb-4">Order Timeline</h3>
                <div className="flex justify-between items-center relative">
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-border -translate-y-1/2" />
                    <motion.div 
                        className="absolute left-0 top-1/2 h-1 bg-primary -translate-y-1/2"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStepIndex / (timelineSteps.length -1)) * 100}%`}}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    {timelineSteps.map((step, index) => (
                        <div key={step.status} className="z-10 flex flex-col items-center">
                            <motion.div
                                className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${index <= currentStepIndex ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-border text-muted-foreground'}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2 }}
                             >
                                <step.icon className="h-5 w-5" />
                            </motion.div>
                            <p className={`mt-2 text-xs font-medium ${index <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'}`}>{step.status}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <Separator />
            
            {/* Delivery Details */}
            <div>
                <h3 className="font-semibold mb-2">Delivery Details</h3>
                <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">John Doe</p>
                    <p>123, Health St, Wellness City</p>
                    <p>Hyderabad, 500001</p>
                    <p>India</p>
                </div>
            </div>

            <Separator />

            {/* Order Summary */}
            <div>
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="space-y-2">
                    {order.medicines.map((med, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <p>{med.name} (x{med.quantity})</p>
                            {/* Assuming a price per item, which is missing. Let's fake it for now */}
                            <p>₹{(27.50 * med.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <Separator/>
                    <div className="flex justify-between items-center font-bold">
                        <p>Total</p>
                        <p>₹{order.total}</p>
                    </div>
                </div>
            </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row sm:justify-end gap-2">
          <Button variant="outline"><FileDown className="mr-2 h-4 w-4"/> Download Invoice</Button>
          <Button><MessageSquare className="mr-2 h-4 w-4"/> Contact Support</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
