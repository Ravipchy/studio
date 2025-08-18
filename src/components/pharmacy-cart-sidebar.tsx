"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/app/pharmacy/page";

interface PharmacyCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onProceedToCheckout: () => void;
}

export function PharmacyCartSidebar({ isOpen, onClose, cartItems, onUpdateQuantity, onProceedToCheckout }: PharmacyCartSidebarProps) {
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
            {cartItems.length === 0 ? (
                <p className="text-muted-foreground text-center">Your cart is empty.</p>
            ) : (
                cartItems.map(item => (
              <div key={item.id} className="flex gap-4">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md border" data-ai-hint="medicine product photo"/>
                <div className="flex-grow">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <p className="font-bold">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onUpdateQuantity(item.id, 0)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )))}
          </div>
        </div>
        <Separator />
        <SheetFooter className="flex-col space-y-4">
            <div className="flex justify-between font-bold text-lg">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
            </div>
          <Button size="lg" className="w-full" disabled={cartItems.length === 0} onClick={onProceedToCheckout}>Checkout</Button>
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
