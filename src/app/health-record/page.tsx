import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Upload, PlusCircle } from "lucide-react";

export default function HealthRecordPage() {
    const records = [
        { document: "Annual Check-up Report", date: "2023-10-15", type: "Lab Report" },
        { document: "Cardiology Consultation Notes", date: "2023-09-22", type: "Consultation Note" },
        { document: "X-Ray: Left Arm", date: "2023-08-05", type: "Imaging" },
        { document: "Prescription - Dr. Smith", date: "2023-10-15", type: "Prescription" },
    ]
  return (
    <div className="bg-background">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                Health Records
                </h1>
                <p className="mt-2 text-muted-foreground">
                Manage and view your medical records securely.
                </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
                 <Button><Upload className="mr-2 h-4 w-4" /> Upload Record</Button>
                 <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Record</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Documents</CardTitle>
              <CardDescription>A list of your uploaded health documents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary"/>
                        {record.document}
                      </TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell className="text-right">
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
            <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">Showing 1-4 of 4 records</p>
                <div className="flex gap-2">
                    <Button variant="outline" disabled>Previous</Button>
                    <Button variant="outline">Next</Button>
                </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
