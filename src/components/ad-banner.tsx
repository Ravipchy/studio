"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export function AdBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12"
    >
      <div className="container">
        <div className="rounded-lg bg-accent/80 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden">
          <div className="text-accent-foreground">
            <h2 className="font-bold font-headline text-3xl md:text-4xl">Up to 50% OFF</h2>
            <p className="mt-2 text-lg">on a wide range of health supplements!</p>
            <Button variant="secondary" className="mt-6">Order Now</Button>
          </div>
          <div className="relative h-64 w-full">
            <Image 
              src="https://placehold.co/500x300.png"
              alt="Supplements"
              fill
              className="object-contain"
              data-ai-hint="supplements vitamins"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
