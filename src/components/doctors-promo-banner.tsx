"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DoctorsPromoBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="pb-12 md:pb-24"
    >
      <div className="container">
        <div className="rounded-lg bg-red-100 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden relative">
          <div className="text-red-900">
            <h2 className="font-bold font-headline text-3xl md:text-4xl">
              Spot the signs before they surprise you!
            </h2>
            <p className="mt-2 text-lg">
              Up to 50% off on Full Body Checkups*
            </p>
            <Button className="mt-6 bg-black text-white hover:bg-gray-800">
              Book Now
            </Button>
          </div>
          <div className="relative h-64 w-full flex justify-center items-center">
            <Image
              src="https://placehold.co/400x300.png"
              alt="Doctor with test tube"
              width={400}
              height={300}
              className="object-contain"
              data-ai-hint="doctor test tube"
            />
          </div>
          <div className="absolute top-4 right-4 bg-red-500 text-white text-center rounded-lg p-4 -rotate-12">
            <p className="font-bold text-lg">GREAT</p>
            <p className="font-bold text-lg">WELLNESS</p>
            <p className="font-bold text-lg">SALE</p>
            <p className="text-sm">17TH-21ST AUG</p>
          </div>
          <p className="absolute bottom-2 right-2 text-xs text-gray-500">*T&C apply</p>
        </div>
      </div>
    </motion.section>
  );
}
