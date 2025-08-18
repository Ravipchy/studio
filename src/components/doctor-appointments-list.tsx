
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Stethoscope, MapPin, Clock, FileDown, Video, User, CheckCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorAppointmentDetailsModal } from "./doctor-appointment-details-modal";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export type AppointmentStatus = "Upcoming" | "Completed" | "Cancelled";

export type DoctorAppointment = {
  id: string;
  patient: {
    name: string;
    avatar: string;
    age: number;
  };
  date: string;
  time: string;
  type: "Clinic" | "Telemedicine";
  location: string;
  symptoms: string;
  status: AppointmentStatus;
};

const allAppointments: DoctorAppointment[] = [
  { id: "#AS-APT-301", patient: { name: "John Doe", avatar: "https://placehold.co/100x100.png", age: 34 }, date: "25 Aug 2025", time: "10:00 AM", type: "Clinic", location: "Arogya Sathi Clinic, Hyderabad", symptoms: "Fever and cough for 3 days.", status: "Upcoming" },
  { id: "#AS-APT-302", patient: { name: "Jane Smith", avatar: "https://placehold.co/100x100.png", age: 28 }, date: "28 Aug 2025", time: "02:30 PM", type: "Telemedicine", location: "Online Consultation", symptoms: "Follow-up for skin rash.", status: "Upcoming" },
  { id: "#AS-APT-201", patient: { name: "Peter Jones", avatar: "https://placehold.co/100x100.png", age: 52 }, date: "15 Jul 2025", time: "11:00 AM", type: "Clinic", location: "Arogya Sathi Clinic, Hyderabad", symptoms: "Routine checkup.", status: "Completed" },
  { id: "#AS-APT-202", patient: { name: "Emily Carter", avatar: "https://placehold.co/100x100.png", age: 45 }, date: "10 Jun 2025", time: "04:00 PM", type: "Clinic", location: "Arogya Sathi Clinic, Hyderabad", symptoms: "Knee pain.", status: "Completed" },
  { id: "#AS-APT-101", patient: { name: "Alex Chen", avatar: "https://placehold.co/100x100.png", age: 19 }, date: "01 May 2025", time: "09:00 AM", type: "Telemedicine", location: "Online Consultation", symptoms: "Patient did not show up.", status: "Cancelled" },
];

const EmptyState = ({ tab }: { tab: string }) => {
    const messages: { [key: string]: string } = {
        upcoming: "You don’t have any upcoming appointments.",
        past: "No past appointments found.",
        cancelled: "No cancelled appointments found.",
    };
    return (
        <div className="text-center py-16">
            <Calendar className="h-24 w-24 mx-auto text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-bold">No {tab} appointments</h2>
            <p className="mt-2 text-muted-foreground">{messages[tab]}</p>
        </div>
    );
};

export function DoctorAppointmentsList() {
  const [selectedAppointment, setSelectedAppointment] = useState<DoctorAppointment | null>(null);
  
  const getStatusClass = (status: AppointmentStatus) => {
    switch (status) {
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCloseModal = () => setSelectedAppointment(null);

  const renderAppointments = (status: AppointmentStatus) => {
    const filteredAppointments = allAppointments.filter(app => app.status === status);
    if (filteredAppointments.length === 0) {
        return <EmptyState tab={status.toLowerCase()} />;
    }
    return (
        <div className="space-y-6">
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex items-center gap-4">
                       <Image src={appointment.patient.avatar} alt={appointment.patient.name} width={60} height={60} className="rounded-full border" data-ai-hint="patient avatar" />
                       <div>
                           <CardTitle className="text-lg">{appointment.patient.name}</CardTitle>
                           <CardDescription>Age: {appointment.patient.age}</CardDescription>
                       </div>
                    </div>
                    <Badge variant="outline" className={`mt-2 sm:mt-0 font-semibold ${getStatusClass(appointment.status)}`}>{appointment.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                   <div className="flex items-center gap-2">
                       <Calendar className="h-5 w-5 text-primary" />
                       <span>{appointment.date} at {appointment.time}</span>
                   </div>
                   <div className="flex items-center gap-2">
                        {appointment.type === "Clinic" ? <MapPin className="h-5 w-5 text-primary" /> : <Video className="h-5 w-5 text-primary" />}
                       <span>{appointment.location}</span>
                   </div>
                   <div className="flex items-start gap-2">
                       <FileDown className="h-5 w-5 text-primary mt-0.5"/>
                       <p className="line-clamp-2">{appointment.symptoms}</p>
                   </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-end items-center gap-2">
                   {appointment.status === 'Upcoming' && <>
                      {appointment.type === "Telemedicine" && (
                        <Button size="sm" asChild>
                            <Link href="/telemedicine/session"><Video className="mr-2 h-4 w-4"/> Start Call</Link>
                        </Button>
                      )}
                      <Button variant="outline" size="sm"><CheckCircle className="mr-2 h-4 w-4"/> Mark as Completed</Button>
                      <Button variant="destructive" size="sm">Cancel Appointment</Button>
                   </>}
                   {appointment.status === 'Completed' && <>
                      <Button variant="outline" size="sm"><FileDown className="mr-2 h-4 w-4"/> View Prescription</Button>
                   </>}
                   <Button variant="secondary" size="sm" onClick={() => setSelectedAppointment(appointment)}>View Details</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
    );
  }

  return (
    <section className="py-12 md:py-24">
      <div className="container">
        <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Past</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                <div className="relative w-full md:w-auto md:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search by patient name..." className="pl-10" />
                </div>
            </div>
            <TabsContent value="upcoming">
                {renderAppointments("Upcoming")}
            </TabsContent>
            <TabsContent value="completed">
                {renderAppointments("Completed")}
            </TabsContent>
            <TabsContent value="cancelled">
                {renderAppointments("Cancelled")}
            </TabsContent>
        </Tabs>
      </div>
      {selectedAppointment && (
        <DoctorAppointmentDetailsModal
            isOpen={!!selectedAppointment}
            onClose={handleCloseModal}
            appointment={selectedAppointment}
        />
      )}
    </section>
  );
}
