
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, User, Video, Calendar, ArrowRight, Settings } from "lucide-react";

const upcomingAppointments = [
    { name: "John Doe", time: "10:00 AM", type: "Clinic" },
    { name: "Jane Smith", time: "11:30 AM", type: "Telemedicine" },
    { name: "Peter Jones", time: "02:00 PM", type: "Clinic" },
];

const recentPatients = [
    { name: "Emily Carter", avatar: "https://placehold.co/100x100.png" },
    { name: "Alex Chen", avatar: "https://placehold.co/100x100.png" },
    { name: "Sarah Lee", avatar: "https://placehold.co/100x100.png" },
]

export default function DoctorDashboard() {
  return (
    <div className="bg-muted/40 min-h-screen">
        <div className="container py-12">
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">Doctor Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Dr. Smith!</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Appointments Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Calendar className="h-6 w-6 text-primary"/> Today's Appointments</CardTitle>
                            <CardDescription>You have {upcomingAppointments.length} appointments today.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingAppointments.map((appt, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback>{appt.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{appt.name}</p>
                                                <p className="text-sm text-muted-foreground">{appt.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {appt.type === 'Telemedicine' ? 
                                                <Button size="sm" variant="outline"><Video className="h-4 w-4 mr-2"/>Start Call</Button> :
                                                <Button size="sm" variant="ghost">View Details</Button>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                           <div className="space-y-3">
                             {recentPatients.map(patient => (
                                 <div key={patient.name} className="flex items-center justify-between">
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
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Doctor Profile */}
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Avatar className="h-24 w-24 mb-2">
                                <AvatarImage src="https://placehold.co/150x150.png" alt="Dr. Smith" data-ai-hint="doctor professional photo"/>
                                <AvatarFallback>DS</AvatarFallback>
                            </Avatar>
                            <CardTitle>Dr. Jane Smith</CardTitle>
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
