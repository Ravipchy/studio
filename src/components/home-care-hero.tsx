
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";

export function HomeCareHero() {
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
                Quality Healthcare at Your Home
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Professional medical services delivered at the comfort of your home.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg">Book Home Visit</Button>
               <Button asChild variant="outline" size="lg">
                    <Link href="/home-care/history">View Booking History</Link>
                </Button>
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
              alt="Nurse visiting patient at home"
              data-ai-hint="nurse patient home"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
