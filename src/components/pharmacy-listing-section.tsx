"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Filter } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { CartItem } from "@/app/pharmacy/page";

const medicines: (Omit<CartItem, 'quantity'> & {oldPrice: string | null, stock: boolean, category: string})[] = [
  { id: 1, name: "Paracetamol 500mg", brand: "Cipla", price: "25.00", oldPrice: "30.00", stock: true, image: "https://placehold.co/200x200.png", category: "general" },
  { id: 2, name: "Metformin 500mg", brand: "Sun Pharma", price: "55.00", oldPrice: null, stock: true, image: "https://placehold.co/200x200.png", category: "diabetes" },
  { id: 3, name: "Aspirin 75mg", brand: "Dr. Reddy's", price: "15.00", oldPrice: "20.00", stock: false, image: "https://placehold.co/200x200.png", category: "heart" },
  { id: 4, name: "Vitamin C 1000mg", brand: "Himalaya", price: "150.00", oldPrice: null, stock: true, image: "https://placehold.co/200x200.png", category: "vitamins" },
  { id: 5, name: "Dolo 650", brand: "Micro Labs", price: "30.00", oldPrice: null, stock: true, image: "https://placehold.co/200x200.png", category: "general" },
  { id: 6, name: "N95 Mask", brand: "Generic", price: "99.00", oldPrice: "150.00", stock: true, image: "https://placehold.co/200x200.png", category: "covid" },
  { id: 7, name: "Telma 40", brand: "Glenmark", price: "120.00", oldPrice: null, stock: true, image: "https://placehold.co/200x200.png", category: "heart" },
  { id: 8, name: "Calcium + Vit D3", brand: "Shelcal", price: "200.00", oldPrice: "250.00", stock: false, image: "https://placehold.co/200x200.png", category: "vitamins" },
];

interface PharmacyListingSectionProps {
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export function PharmacyListingSection({ onAddToCart, onOpenCart, cartCount }: PharmacyListingSectionProps) {
  return (
    <section className="py-12 md:py-24 bg-muted/40">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold font-headline">All Products</h2>
          <div className="flex items-center gap-4">
             <Button variant="outline" onClick={onOpenCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Cart ({cartCount})
            </Button>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by: Popularity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Filter className="w-5 h-5"/> Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Medicine</SelectItem>
                      <SelectItem value="diabetes">Diabetes Care</SelectItem>
                      <SelectItem value="heart">Heart Care</SelectItem>
                      <SelectItem value="covid">Covid Essentials</SelectItem>
                      <SelectItem value="vitamins">Vitamins & Supplements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Availability</label>
                   <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Apply Filters</Button>
                <Button variant="ghost" className="w-full">Clear Filters</Button>
              </div>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {medicines.map((med, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <div className="relative w-full aspect-square mb-4">
                       <Image src={med.image} alt={med.name} fill className="object-cover rounded-md" data-ai-hint="medicine product photo"/>
                       {med.oldPrice && <Badge className="absolute top-2 left-2 bg-red-500 text-white">SALE</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{med.brand}</p>
                    <h3 className="font-bold flex-grow">{med.name}</h3>
                    <div className="flex items-baseline gap-2 my-2">
                        <p className="text-lg font-bold text-primary">₹{med.price}</p>
                        {med.oldPrice && <p className="text-sm text-muted-foreground line-through">₹{med.oldPrice}</p>}
                    </div>
                    <Badge variant={med.stock ? "default" : "destructive"} className={`mb-4 w-fit ${med.stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {med.stock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    <Button className="w-full mt-auto" disabled={!med.stock} onClick={() => onAddToCart(med)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
