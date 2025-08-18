
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, ShieldCheck } from "lucide-react";
import Image from "next/image";

const steps = [
    { icon: CheckCircle2, text: "Choose Your Specialist" },
    { icon: Calendar, text: "Select Date & Time" },
    { icon: ShieldCheck, text: "Securely Consult Online" },
]

export function TelemedicineGuideSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:py-24"
    >
      <div className="container">
        <Card className="p-6 md:p-10 rounded-2xl shadow-lg grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
                <h2 className="text-2xl font-bold mb-6 font-headline text-center md:text-left">A Simple Step-by-Step Guide</h2>
                <ul className="space-y-4 mb-6">
                    {steps.map((step, index) => (
                        <li key={index} className="flex items-center gap-4 text-lg">
                           <div className="bg-primary/10 p-2 rounded-full">
                             <step.icon className="h-6 w-6 text-primary" />
                           </div>
                           <span className="font-medium">{step.text}</span>
                        </li>
                    ))}
                </ul>
                <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-lg">Book an Appointment</Button>
            </div>
            <div className="relative h-80 w-full order-1 md:order-2">
                <Image 
                    src="https://placehold.co/400x400.png"
                    alt="Telemedicine consultation illustration"
                    fill
                    className="object-contain"
                    data-ai-hint="doctor online consultation"
                />
            </div>
        </Card>
      </div>
    </motion.section>
  );
}
