"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderConfirmationModal({ isOpen, onClose }: OrderConfirmationModalProps) {
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
          <DialogTitle className="text-center text-2xl pt-4">Order Placed Successfully!</DialogTitle>
          <DialogDescription className="text-center">
            Your order has been confirmed. You can track your medicines in the dashboard.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
