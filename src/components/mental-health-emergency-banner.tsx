
"use client";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function MentalHealthEmergencyBanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12"
    >
      <div className="container">
        <div className="rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-500 p-6 text-center">
          <div className="flex flex-col items-center gap-4 text-red-800 dark:text-red-200">
            <AlertCircle className="h-10 w-10" />
            <h2 className="font-bold font-headline text-2xl">In Crisis?</h2>
            <p className="text-lg">
              If you are in a crisis or any other person may be in danger, please call the national helpline at <strong className="font-bold tracking-wider">+91-9152987821</strong> immediately.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
