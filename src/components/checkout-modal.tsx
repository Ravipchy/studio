"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { CreditCard, Truck, Landmark } from "lucide-react";
import { Separator } from "./ui/separator";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: () => void;
  totalAmount: string;
}

export function CheckoutModal({ isOpen, onClose, onPlaceOrder, totalAmount }: CheckoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Complete your purchase by providing your details. Total amount: <span className="font-bold">₹{totalAmount}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
            <div className="space-y-4">
                <h3 className="font-semibold">Delivery Address</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="+91 1234567890" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123, Health St, Wellness City" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Hyderabad" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" placeholder="500001" />
                    </div>
                </div>
            </div>
            
            <Separator/>
            
            <div className="space-y-4">
                <h3 className="font-semibold">Delivery Options</h3>
                <RadioGroup defaultValue="standard" className="flex gap-4">
                    <Label htmlFor="standard" className="flex items-center gap-2 border rounded-md p-4 flex-1 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                        <RadioGroupItem value="standard" id="standard" />
                         <Truck className="h-5 w-5 mr-2" />
                        <div>
                            <p className="font-semibold">Standard</p>
                            <p className="text-sm text-muted-foreground">3-5 business days</p>
                        </div>
                    </Label>
                     <Label htmlFor="express" className="flex items-center gap-2 border rounded-md p-4 flex-1 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                        <RadioGroupItem value="express" id="express" />
                        <Truck className="h-5 w-5 mr-2" />
                        <div>
                            <p className="font-semibold">Express</p>
                            <p className="text-sm text-muted-foreground">1-2 business days</p>
                        </div>
                    </Label>
                </RadioGroup>
            </div>
            
            <Separator/>

            <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>
                <RadioGroup defaultValue="card" className="flex flex-col gap-2">
                    <Label htmlFor="card" className="flex items-center gap-2 border rounded-md p-4 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span>Credit/Debit Card</span>
                    </Label>
                     <Label htmlFor="upi" className="flex items-center gap-2 border rounded-md p-4 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                        <RadioGroupItem value="upi" id="upi" />
                         <Landmark className="h-5 w-5 mr-2" />
                        <span>UPI / Net Banking</span>
                    </Label>
                    <Label htmlFor="cod" className="flex items-center gap-2 border rounded-md p-4 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                        <RadioGroupItem value="cod" id="cod" />
                        <Landmark className="h-5 w-5 mr-2" />
                        <span>Cash on Delivery</span>
                    </Label>
                </RadioGroup>
            </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onPlaceOrder}>Place Order (₹{totalAmount})</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
