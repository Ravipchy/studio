
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Droplets, Shield, Bone, Activity, PersonStanding, TestTube } from "lucide-react";
import { motion } from "framer-motion";
import { LabTestBookingModal } from "./lab-test-booking-modal";

const packages = [
  { icon: PersonStanding, title: "Full Body Checkup", description: "50+ tests included", price: "999" },
  { icon: Droplets, title: "Diabetes Profile", description: "Key diabetes indicators", price: "499" },
  { icon: Shield, title: "Thyroid Profile", description: "TSH, T3, T4 tests", price: "399" },
  { icon: Heart, title: "Lipid Profile", description: "Cholesterol & heart health", price: "599" },
  { icon: Activity, title: "Kidney Function Test", description: "Assess kidney health", price: "699" },
  { icon: TestTube, title: "Liver Function Test", description: "Check liver enzymes", price: "699" },
];

export function LabTestsPackages() {
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState("");

  const handleBookNow = (title: string) => {
    setSelectedTest(title);
    setBookingModalOpen(true);
  };

  return (
    <>
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Popular Health Packages</h2>
          <p className="text-muted-foreground mt-2">Choose from our curated health packages for a comprehensive checkup.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="text-center h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <pkg.icon className="h-8 w-8 text-primary" />
                  </div>
                   <CardTitle className="text-xl font-semibold font-headline">{pkg.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription className="mb-4">{pkg.description}</CardDescription>
                  <div className="flex-grow"></div>
                  <p className="text-2xl font-bold mb-4">₹{pkg.price}</p>
                  <Button variant="outline" onClick={() => handleBookNow(pkg.title)}>Book Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <LabTestBookingModal
      isOpen={isBookingModalOpen}
      onClose={() => setBookingModalOpen(false)}
      testTitle={selectedTest}
    />
    </>
  );
}
