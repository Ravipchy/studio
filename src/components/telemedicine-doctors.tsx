
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Video, Search } from "lucide-react";
import Image from "next/image";
import { DoctorProfileModal } from "./doctor-profile-modal";
import { type Doctor } from "./doctors-nearby-section";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Skeleton } from "./ui/skeleton";


export function TelemedicineDoctors() {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            setIsLoading(true);
            try {
                const doctorsRef = collection(db, "doctors");
                const q = query(doctorsRef, where("telemedicineEnabled", "==", true));
                const querySnapshot = await getDocs(q);
                const doctorsList: Doctor[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), distance: "Online" } as Doctor));
                setDoctors(doctorsList);
            } catch (error) {
                console.error("Error fetching telemedicine doctors:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDoctors();
    }, []);


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
      className="py-12 md:py-24 bg-muted/40"
    >
      <div className="container">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Find Your Doctor</h2>
            <p className="text-muted-foreground mt-2">Search and book a virtual consultation with our top specialists.</p>
        </div>

        <Card className="p-4 md:p-6 mb-8 sticky top-24 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                <div className="relative md:col-span-2 lg:col-span-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search doctor by name..." className="pl-10" />
                </div>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                    </SelectContent>
                </Select>
                <Button>Search</Button>
            </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                     <Card key={index} className="h-full flex flex-col">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <Skeleton className="w-24 h-24 rounded-full mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-3" />
                            <Skeleton className="h-4 w-2/3 mb-4" />
                            <div className="w-full flex flex-col gap-2 mt-auto">
                                <Skeleton className="h-9 w-full" />
                                <Skeleton className="h-9 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : doctors.map((doctor, index) => (
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
                    <p className="text-sm text-primary font-medium">{doctor.specialty}</p>

                    <div className="flex items-center my-3">
                        {[...Array(doctor.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">({doctor.reviews} reviews)</span>
                    </div>

                     <div className="w-full flex flex-col gap-2 mt-auto">
                        <Button variant="outline" className="w-full" onClick={() => handleViewProfile(doctor)}>View Profile</Button>
                        <Button className="w-full" onClick={() => handleViewProfile(doctor)}>
                           <Video className="mr-2 h-4 w-4"/> Book Video Consult
                        </Button>
                    </div>
                    </CardContent>
                </Card>
                </motion.div>
            ))}
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
