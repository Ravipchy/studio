
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PatientDashboard() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 font-headline">Patient Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Patient!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is your personal dashboard. From here you can manage your appointments, view your health records, and more.</p>
          <div className="mt-4">
            <Link href="/appointments" className="text-primary hover:underline">View my appointments</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
