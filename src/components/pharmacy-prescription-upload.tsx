"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";

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
              <CardTitle className="text-3xl font-bold font-headline">Have a Prescription?</CardTitle>
              <CardDescription className="text-lg mt-2">
                Upload your prescription and we will handle the rest. Get your medicines delivered to your doorstep.
              </CardDescription>
              <Button size="lg" className="mt-6 w-fit">
                <Upload className="mr-2 h-5 w-5" />
                Upload Now
              </Button>
            </CardHeader>
            <div className="relative h-64 md:h-full bg-primary/10">
              <Image 
                src="https://placehold.co/600x400.png"
                alt="Doctor writing prescription"
                layout="fill"
                objectFit="cover"
                data-ai-hint="doctor writing prescription"
              />
            </div>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
