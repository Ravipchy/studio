
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { Video } from "lucide-react";

export function TelemedicineHeroSection() {
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
                Expert Online Medical <span className="text-primary">Consultations</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Connect with certified doctors from the comfort of your home.
              </p>
               <Button size="lg" className="mt-4">
                    <Video className="mr-2 h-5 w-5"/>
                    Book a Video Consultation
                </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-80"
          >
            <Image
              src="https://placehold.co/600x400.png"
              fill
              alt="Group of doctors in an online meeting"
              data-ai-hint="doctors online meeting"
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
