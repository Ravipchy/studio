
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Share2, Download, Search, FileText } from "lucide-react";
import Image from "next/image";
import { ReportPreviewModal } from "@/components/report-preview-modal";
import { useState } from "react";

type Report = {
  name: string;
  date: string;
  location: string;
  doctor: string;
  status: "Completed" | "Pending";
};

export default function HealthRecordPage() {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const reports: Report[] = [
        { name: "Blood Test Report", date: "15 Aug 2025", location: "Hyderabad", doctor: "Dr. Jane Smith", status: "Completed" },
        { name: "ECG Report", date: "12 Aug 2025", location: "Hyderabad", doctor: "Dr. John Doe", status: "Completed" },
        { name: "X-Ray Report - Right Arm", date: "05 Aug 2025", location: "Hyderabad", doctor: "Dr. Emily Carter", status: "Completed" },
        { name: "MRI Scan - Brain", date: "20 Jul 2025", location: "Hyderabad", doctor: "Dr. Peter Jones", status: "Pending" },
    ];

    const handleViewReport = (report: Report) => {
        setSelectedReport(report);
    };

    const handleCloseModal = () => {
        setSelectedReport(null);
    };

  return (
    <div className="bg-background">
      <section className="py-12 md:py-24 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Access Your Medical Reports Anytime
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Securely view, share, and download your reports from one place.
              </p>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="Doctor reviewing health records"
              data-ai-hint="doctor health records"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-contain"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Medical Reports</CardTitle>
              <CardDescription>Search, view, and manage your health records.</CardDescription>
               <div className="relative pt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="search-reports" placeholder="Search Reports by Date, Type, or Doctor..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Date & Location</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary"/>
                        {report.name}
                      </TableCell>
                      <TableCell>{report.date} – {report.location}</TableCell>
                      <TableCell>{report.doctor}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === 'Completed' ? 'default' : 'secondary'} 
                               className={report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewReport(report)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                          <span className="sr-only">Share</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
      {selectedReport && (
        <ReportPreviewModal
          report={selectedReport}
          isOpen={!!selectedReport}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
