"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, User, Siren, Ambulance as AmbulanceIcon } from "lucide-react";
import Image from "next/image";

export function AmbulanceBookingSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:py-24"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card className="p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 font-headline">Book Ambulance</h2>
            <form className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Pickup Location" className="pl-10 rounded-full h-12" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Drop Location" className="pl-10 rounded-full h-12" />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Patient Name" className="pl-10 rounded-full h-12" />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Contact Number" type="tel" className="pl-10 rounded-full h-12" />
              </div>
              <Select>
                <SelectTrigger className="rounded-full h-12">
                   <div className="flex items-center gap-2">
                     <Siren className="h-5 w-5 text-muted-foreground" />
                     <SelectValue placeholder="Select Service" />
                   </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Life Support</SelectItem>
                  <SelectItem value="advanced">Advanced Life Support</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="rounded-full h-12">
                    <div className="flex items-center gap-2">
                     <AmbulanceIcon className="h-5 w-5 text-muted-foreground" />
                    <SelectValue placeholder="Select Ambulance Type" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Ambulance</SelectItem>
                  <SelectItem value="icu">ICU Ambulance</SelectItem>
                  <SelectItem value="air">Air Ambulance</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg" className="w-full rounded-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">Confirm Booking</Button>
            </form>
          </Card>
          <Card className="p-4 rounded-2xl shadow-lg">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold text-center mb-4 font-headline">Live Tracking</h2>
              <div className="relative h-[400px] bg-gray-200 rounded-md overflow-hidden">
                <Image src="https://placehold.co/600x400.png" layout="fill" objectFit="cover" alt="Map of available ambulances" data-ai-hint="map ambulance" />
              </div>
              <div className="text-center space-y-3 mt-4">
                 <div className="inline-block bg-white rounded-full px-6 py-3 shadow-md">
                    <p className="font-medium">Ambulance on its way - ETA 8 mins</p>
                 </div>
                 <div className="inline-block bg-white rounded-full px-6 py-3 shadow-md">
                     <p>Driver's Name :- Jhon Doe</p>
                     <p>Vehicle No :- TG12AB1234</p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
