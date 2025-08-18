"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HomeCareBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:py-24"
    >
      <div className="container">
        <div className="rounded-lg bg-accent/80 p-8 md:p-12 text-center">
          <div className="text-accent-foreground">
            <h2 className="font-bold font-headline text-3xl md:text-4xl">Need a healthcare professional at home?</h2>
            <p className="mt-2 text-lg">We are just a click away!</p>
            <Button variant="secondary" className="mt-6" size="lg">Book Appointment Now</Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
