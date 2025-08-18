"use client";

import { useState } from "react";
import { PharmacyHeroSection } from "@/components/pharmacy-hero-section";
import { PharmacyCategoriesSection } from "@/components/pharmacy-categories-section";
import { PharmacyListingSection } from "@/components/pharmacy-listing-section";
import { PharmacyPrescriptionUpload } from "@/components/pharmacy-prescription-upload";
import { PharmacyCartSidebar } from "@/components/pharmacy-cart-sidebar";
import { CheckoutModal } from "@/components/checkout-modal";
import { OrderConfirmationModal } from "@/components/order-confirmation-modal";

export type CartItem = {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  quantity: number;
};

export default function PharmacyPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const initialCartItems: CartItem[] = [
    { id: 1, name: "Paracetamol 500mg", brand: "Cipla", price: "25.00", image: "https://placehold.co/200x200.png", quantity: 2 },
    { id: 5, name: "Dolo 650", brand: "Micro Labs", price: "30.00", image: "https://placehold.co/200x200.png", quantity: 1 },
  ];
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleAddToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
        const existingItem = prev.find(i => i.id === item.id);
        if (existingItem) {
            return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  
  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === itemId ? {...item, quantity} : item).filter(item => item.quantity > 0));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
    setCartItems([]); // Clear cart
  };


  return (
    <div className="bg-background">
      <PharmacyHeroSection />
      <PharmacyCategoriesSection />
      <PharmacyPrescriptionUpload />
      <PharmacyListingSection onAddToCart={handleAddToCart} onOpenCart={() => setIsCartOpen(true)} cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <PharmacyCartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToCheckout={handleProceedToCheckout}
        />
        
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPlaceOrder={handlePlaceOrder}
        totalAmount={cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2)}
      />

      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      />
    </div>
  );
}
