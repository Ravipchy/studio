
"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

export function DoctorAppointmentsHero() {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 md:px-6 text-center"
      >
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
            <CalendarDays className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          My Appointments
        </h1>
        <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
          View all your upcoming and past patient appointments.
        </p>
      </motion.div>
    </section>
  );
}
