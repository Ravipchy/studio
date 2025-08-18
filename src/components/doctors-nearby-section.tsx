
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, Stethoscope, Search, Calendar, Video } from "lucide-react";
import Image from "next/image";
import { DoctorProfileModal } from "./doctor-profile-modal";

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    qualification: "MD, FACC",
    experience: "15+ years",
    rating: 5,
    reviews: 150,
    avatar: "https://placehold.co/100x100.png",
    distance: "1.2 km away",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Dermatologist",
    qualification: "MBBS, DDVL",
    experience: "8+ years",
    rating: 4,
    reviews: 98,
    avatar: "https://placehold.co/100x100.png",
    distance: "2.5 km away",
  },
  {
    id: 3,
    name: "Dr. Peter Jones",
    specialty: "Orthopedist",
    qualification: "MS (Ortho)",
    experience: "12+ years",
    rating: 5,
    reviews: 210,
    avatar: "https://placehold.co/100x100.png",
    distance: "3.1 km away",
  },
  {
    id: 4,
    name: "Dr. Emily Carter",
    specialty: "Neurologist",
    qualification: "DM (Neurology)",
    experience: "10+ years",
    rating: 5,
    reviews: 180,
    avatar: "https://placehold.co/100x100.png",
    distance: "4.0 km away",
  },
  {
    id: 5,
    name: "Dr. Alex Chen",
    specialty: "Pediatrician",
    qualification: "MD (Pediatrics)",
    experience: "7+ years",
    rating: 4,
    reviews: 120,
    avatar: "https://placehold.co/100x100.png",
    distance: "5.2 km away",
  },
  {
    id: 6,
    name: "Dr. Sarah Lee",
    specialty: "Dentist",
    qualification: "BDS, MDS",
    experience: "9+ years",
    rating: 5,
    reviews: 250,
    avatar: "https://placehold.co/100x100.png",
    distance: "1.8 km away",
  },
];

export type Doctor = typeof doctors[0];


export function DoctorsNearbySection() {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    const handleViewProfile = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleCloseModal = () => {
        setSelectedDoctor(null);
    };

  return (
    <>
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
            <Card className="overflow-hidden sticky top-24">
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
            <Card className="p-6 mb-8 sticky top-24 z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <div className="relative w-full md:w-auto flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for Doctor's or Clinics..." className="pl-10" />
                    </div>
                    <Button variant="ghost" className="text-primary hover:text-primary">Clear All</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
                    <Select>
                        <SelectTrigger className="w-full">
                            <Stethoscope className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Specialty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="dermatology">Dermatology</SelectItem>
                            <SelectItem value="orthopedics">Orthopedics</SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="pediatrics">Pediatrics</SelectItem>
                            <SelectItem value="dentist">Dentist</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full">
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
                        <SelectTrigger className="w-full">
                            <Calendar className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="tomorrow">Tomorrow</SelectItem>
                            <SelectItem value="this-week">This Week</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full">
                            <Video className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Consultation Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="in-person">In-Person</SelectItem>
                            <SelectItem value="telemedicine">Telemedicine</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {doctors.map((doctor, index) => (
                        <motion.div 
                            key={doctor.id}
                            initial={{ opacity: 0, y:20 }}
                            animate={{ opacity: 1, y:0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                           <CardContent className="p-4 flex flex-col items-center text-center">
                            <Image src={doctor.avatar} alt={doctor.name} width={100} height={100} className="rounded-full mb-4 border-2 border-primary/20" data-ai-hint="doctor avatar" />
                            <h3 className="font-bold text-lg">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.qualification}</p>
                            <p className="text-sm font-medium text-primary">{doctor.specialty}</p>
                            <p className="text-xs text-muted-foreground mt-1">{doctor.experience} experience</p>

                            <div className="flex items-center my-3">
                                {[...Array(doctor.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                                <span className="text-xs text-muted-foreground ml-2">({doctor.reviews} reviews)</span>
                            </div>
                            <Badge variant="secondary" className="mb-4">
                                <MapPin className="w-3 h-3 mr-1" />
                                {doctor.distance}
                            </Badge>
                             <div className="w-full flex flex-col gap-2 mt-auto">
                                <Button variant="outline" className="w-full" onClick={() => handleViewProfile(doctor)}>View Profile</Button>
                                <Button className="w-full" onClick={() => handleViewProfile(doctor)}>Book Appointment</Button>
                            </div>
                            </CardContent>
                        </Card>
                        </motion.div>
                    ))}
                </div>
          </div>
        </div>
      </div>
    </motion.section>
    {selectedDoctor && (
        <DoctorProfileModal 
            doctor={selectedDoctor}
            isOpen={!!selectedDoctor}
            onClose={handleCloseModal}
        />
    )}
    </>
  );
}
