"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";

interface PharmacyCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const cartItems = [
  { id: 1, name: "Paracetamol 500mg", price: "25.00", quantity: 2, image: "https://placehold.co/100x100.png" },
  { id: 2, name: "Metformin 500mg", price: "55.00", quantity: 1, image: "https://placehold.co/100x100.png" },
  { id: 3, name: "Dolo 650", price: "30.00", quantity: 3, image: "https://placehold.co/100x100.png" },
];

export function PharmacyCartSidebar({ isOpen, onClose }: PharmacyCartSidebarProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto -mx-6 px-6 py-4">
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md border" data-ai-hint="medicine product photo"/>
                <div className="flex-grow">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="icon" className="h-6 w-6">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <p className="font-bold">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <SheetFooter className="flex-col space-y-4">
            <div className="flex justify-between font-bold text-lg">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
            </div>
          <Button size="lg" className="w-full">Checkout</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full" onClick={onClose}>
                Continue Shopping
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
