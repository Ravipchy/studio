"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function DoctorsHeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-sky-100">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-sky-900">
                Care is Closer Than <span className="text-sky-500 underline">You Think</span>
              </h1>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <Image
              src="https://placehold.co/500x400.png"
              width={500}
              height={400}
              alt="Hero Illustration"
              data-ai-hint="person magnifying glass map"
              className="mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
