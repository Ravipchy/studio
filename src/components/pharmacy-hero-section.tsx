"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export function PharmacyHeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Book Medicines
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Order medicines online with prescription upload & doorstep delivery.
              </p>
            </div>
            <div className="relative w-full max-w-lg pt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search-medicines"
                placeholder="Search medicines by name..."
                className="pl-10 h-12 rounded-full"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <Image
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="Person holding medicines"
              data-ai-hint="person holding medicines"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
