

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DoctorDashboard() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 font-headline">Doctor Dashboard</h1>
       <Card>
        <CardHeader>
          <CardTitle>Welcome, Doctor!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is your professional dashboard. Manage your schedule, view patient appointments, and handle consultations.</p>
           <div className="mt-4">
            <Link href="/doctor-appointments" className="text-primary hover:underline">View your appointments</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
