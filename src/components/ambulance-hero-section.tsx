"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function AmbulanceHeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-sky-50 dark:bg-sky-900/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-gray-900 dark:text-white">
                Your emergency, our <span className="text-blue-600 underline">priority</span>
              </h1>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-64 md:h-80 lg:h-96"
          >
            <Image
              src="https://placehold.co/600x400.png"
              fill
              alt="Ambulance with paramedic and patient"
              data-ai-hint="ambulance paramedic patient"
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
