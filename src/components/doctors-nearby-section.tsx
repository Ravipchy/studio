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
import { Star, MapPin, Stethoscope, Search } from "lucide-react";
import Image from "next/image";

const doctors = [
  {
    name: "Jhon Doe",
    specialty: "Cardiologist",
    rating: 5,
    reviews: 150,
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Jhon Doe",
    specialty: "Cardiologist",
    rating: 5,
    reviews: 150,
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Jhon Doe",
    specialty: "Cardiologist",
    rating: 5,
    reviews: 150,
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Jhon Doe",
    specialty: "Cardiologist",
    rating: 5,
    reviews: 150,
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Jhon Doe",
    specialty: "Cardiologist",
    rating: 5,
    reviews: 150,
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Jhon Doe",
    specialty: "Cardiologist",
    rating: 5,
    reviews: 150,
    avatar: "https://placehold.co/100x100.png",
  },
];

export function DoctorsNearbySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:py-24"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-xl">Find Nearby Doctor</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative h-[500px] bg-gray-200 rounded-md">
                        <Image src="https://placehold.co/600x500.png" layout="fill" objectFit="cover" alt="Map of doctors" data-ai-hint="map clinics" />
                    </div>
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <div className="relative w-full md:w-auto flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for Doctor's or Clinics..." className="pl-10" />
                    </div>
                    <Button variant="ghost" className="text-green-600 hover:text-green-700">Clear All</Button>
                </div>
                <div className="flex flex-wrap gap-4 mb-6">
                    <Select>
                        <SelectTrigger className="w-full md:w-auto">
                            <Stethoscope className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Specialty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full md:w-auto">
                            <MapPin className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hyderabad">Hyderabad</SelectItem>
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full md:w-auto">
                            <Star className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">★★★★★</SelectItem>
                            <SelectItem value="4">★★★★☆</SelectItem>
                            <SelectItem value="3">★★★☆☆</SelectItem>
                            <SelectItem value="2">★★☆☆☆</SelectItem>
                            <SelectItem value="1">★☆☆☆☆</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {doctors.map((doctor, index) => (
                        <Card key={index} className="p-4 flex flex-col items-center text-center">
                            <Image src={doctor.avatar} alt={doctor.name} width={80} height={80} className="rounded-full mb-4" data-ai-hint="doctor avatar" />
                            <h3 className="font-bold">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            <div className="flex items-center my-2">
                                {[...Array(doctor.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                                <span className="text-xs text-muted-foreground ml-2">({doctor.reviews})</span>
                            </div>
                            <Button className="w-full mt-auto">Book Now</Button>
                        </Card>
                    ))}
                </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

import { CardHeader, CardTitle } from "@/components/ui/card";
