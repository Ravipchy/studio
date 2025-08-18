"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { Input } from "./ui/input";

export function PharmacyPrescriptionUpload() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:py-24"
    >
      <div className="container">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <CardHeader className="p-8 md:p-12">
              <CardTitle className="text-3xl font-bold font-headline">Upload Your Prescription</CardTitle>
              <CardDescription className="text-lg mt-2">
                Upload your prescription and we will handle the rest. Get your medicines delivered to your doorstep.
              </CardDescription>
              <div className="mt-6">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="file" className="file:text-primary file:font-semibold"/>
                    <Button>
                        <Upload className="mr-2 h-5 w-5" />
                        Upload
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Accepted formats: PDF, JPG, PNG.</p>
              </div>
            </CardHeader>
            <div className="relative h-64 md:h-full bg-primary/10 flex items-center justify-center">
                <p className="text-muted-foreground p-4 text-center">Or drag and drop your file here</p>
            </div>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
