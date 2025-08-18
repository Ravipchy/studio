
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, X } from "lucide-react";
import Image from "next/image";

type Report = {
  name: string;
  date: string;
  location: string;
  doctor: string;
  status: "Completed" | "Pending";
};

interface ReportPreviewModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportPreviewModal({ report, isOpen, onClose }: ReportPreviewModalProps) {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {report.name}
            <div className="flex items-center text-sm font-normal text-muted-foreground">
              <Image src="https://placehold.co/100x40.png" width={100} height={40} alt="Hospital Logo" data-ai-hint="hospital logo" />
            </div>
          </DialogTitle>
          <DialogDescription>
            Date: {report.date} | Doctor: {report.doctor} | Location: {report.location}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="aspect-[1/1.41] w-full bg-muted rounded-md overflow-y-auto p-4 border">
            <h3 className="font-bold mb-2">Test Results:</h3>
            <p className="text-sm text-muted-foreground mb-4">This is a placeholder for the actual report content. For a real implementation, the content (e.g., a PDF or rich text) would be rendered here.</p>
            <Image src="https://placehold.co/700x990.png" width={700} height={990} alt="Medical Report Preview" data-ai-hint="medical report document" />
          </div>
        </div>
        <DialogFooter className="justify-between w-full">
            <Button variant="outline" onClick={onClose}>
                <X className="mr-2 h-4 w-4" /> Close
            </Button>
            <div className="flex gap-2">
                <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button>
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

