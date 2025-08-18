
"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function LabTestsCtaBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:pb-24"
    >
      <div className="container">
        <div className="rounded-lg bg-accent/80 p-8 md:p-12 text-center">
          <div className="text-accent-foreground">
            <h2 className="font-bold font-headline text-3xl md:text-4xl">Stay Healthy with Regular Health Checkups.</h2>
            <p className="mt-2 text-lg">Book Your Lab Test Today!</p>
            <Button variant="secondary" className="mt-6" size="lg">Book Now</Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
