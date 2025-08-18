
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, User, Video, Calendar, ArrowRight, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, getDoc, doc, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

type Appointment = {
  id: string;
  patientId: string;
  patientName?: string; // Will be fetched separately
  time: string;
  date: string;
  type: "Clinic" | "Telemedicine";
};

type Patient = {
    id: string;
    name: string;
    avatar: string;
}

export default function DoctorDashboard() {
  const { user, userData } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointmentsRef = collection(db, "appointments");
    const q = query(
      appointmentsRef,
      where("doctorId", "==", user.uid),
      where("date", ">=", Timestamp.fromDate(today)),
      where("date", "<", Timestamp.fromDate(tomorrow))
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const upcomingAppointments: Appointment[] = [];
      const patientPromises: Promise<any>[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const appointment: Appointment = {
          id: doc.id,
          patientId: data.patientId,
          // The date from Firestore is a Timestamp, convert it to a string
          date: (data.date.toDate() as Date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          time: data.time,
          type: data.type,
        };
        upcomingAppointments.push(appointment);

        // Fetch patient details
        const patientDocRef = doc(db, "users", data.patientId);
        patientPromises.push(getDoc(patientDocRef));
      });

      const patientDocs = await Promise.all(patientPromises);
      const patientsMap = new Map<string, Patient>();

      patientDocs.forEach(patientDoc => {
          if (patientDoc.exists()) {
              const patientData = patientDoc.data();
              patientsMap.set(patientDoc.id, {
                  id: patientDoc.id,
                  name: patientData.name,
                  avatar: patientData.profileImage || `https://placehold.co/100x100.png?text=${patientData.name.charAt(0)}`
              });
          }
      });
      
      // Add patient names to appointments
      const appointmentsWithNames = upcomingAppointments.map(appt => ({
          ...appt,
          patientName: patientsMap.get(appt.patientId)?.name || "Unknown Patient"
      }));

      setAppointments(appointmentsWithNames);
      
      // For "Recent Patients", we'll just use the unique patients from today's appointments
      const uniquePatients = Array.from(patientsMap.values());
      setRecentPatients(uniquePatients.slice(0, 3)); // Limit to 3 for the UI

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (isLoading) {
    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container py-12">
                 <header className="mb-8">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                </header>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-8 w-3/4"/>
                                <Skeleton className="h-4 w-1/2 mt-2"/>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-16 w-full"/>
                                <Skeleton className="h-16 w-full"/>
                                <Skeleton className="h-16 w-full"/>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-8">
                        <Card>
                             <CardHeader className="items-center text-center">
                                <Skeleton className="h-24 w-24 rounded-full mb-2"/>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2 mt-2" />
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  return (
    <div className="bg-muted/40 min-h-screen">
        <div className="container py-12">
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">Doctor Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userData?.name || 'Doctor'}!</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Appointments Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Calendar className="h-6 w-6 text-primary"/> Today's Appointments</CardTitle>
                            <CardDescription>You have {appointments.length} appointments today.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {appointments.length > 0 ? (
                                <div className="space-y-4">
                                    {appointments.map((appt) => (
                                        <div key={appt.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback>{appt.patientName?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{appt.patientName}</p>
                                                    <p className="text-sm text-muted-foreground">{appt.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {appt.type === 'Telemedicine' ? 
                                                    <Button size="sm" variant="outline" asChild><Link href="/telemedicine/session"><Video className="h-4 w-4 mr-2"/>Start Call</Link></Button> :
                                                    <Button size="sm" variant="ghost">View Details</Button>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">No appointments scheduled for today.</div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/doctor-appointments">View All Appointments <ArrowRight className="ml-2 h-4 w-4"/></Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Patient Reports */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FileText className="h-6 w-6 text-primary"/> Patient Reports</CardTitle>
                            <CardDescription>Manage and view reports for your patients.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {recentPatients.length > 0 ? (
                            <div className="space-y-3">
                             {recentPatients.map(patient => (
                                 <div key={patient.id} className="flex items-center justify-between">
                                     <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={patient.avatar} alt={patient.name} data-ai-hint="patient photo"/>
                                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-semibold">{patient.name}</p>
                                     </div>
                                     <Button variant="ghost" size="sm">View Reports</Button>
                                 </div>
                             ))}
                           </div>
                           ) : (
                               <div className="text-center py-8 text-muted-foreground">No recent patients.</div>
                           )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Doctor Profile */}
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Avatar className="h-24 w-24 mb-2">
                                <AvatarImage src={user?.photoURL || 'https://placehold.co/150x150.png'} alt={userData?.name || 'Doctor'} data-ai-hint="doctor professional photo"/>
                                <AvatarFallback>{userData?.name?.charAt(0) || 'D'}</AvatarFallback>
                            </Avatar>
                            <CardTitle>{userData?.name || 'Dr. Doctor'}</CardTitle>
                            <CardDescription>Cardiologist</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-center">
                            <p>12+ years of experience</p>
                            <p className="text-muted-foreground">Arogya Sathi Clinic, Hyderabad</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" className="w-full">
                                <Settings className="h-4 w-4 mr-2"/> Edit Profile
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}


    