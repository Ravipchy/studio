"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AmbulancePromoBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="pb-12 md:pb-24"
    >
      <div className="container">
        <div className="rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden relative">
          <div className="text-gray-800 dark:text-gray-200">
            <h2 className="font-bold font-headline text-3xl md:text-4xl">
              Up to 40% off on Monsoon Essentials
            </h2>
            <p className="mt-2 text-lg">
             Don't let the weather dampen your health!
            </p>
            <Button className="mt-6 bg-black text-white hover:bg-gray-800">
              Order Now
            </Button>
          </div>
          <div className="relative h-64 w-full flex justify-center items-center">
            <Image
              src="https://placehold.co/500x300.png"
              alt="Monsoon healthcare products"
              width={500}
              height={300}
              className="object-contain"
              data-ai-hint="supplements healthcare products"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
