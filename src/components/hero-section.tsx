"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Headset, Users, Activity } from 'lucide-react';

export function HeroSection() {
  const stats = [
    { icon: Headset, label: "24/7 Online Support" },
    { icon: Users, label: "100+ Doctors" },
    { icon: Activity, label: "1M+ Active Patients" },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Find & Search Your Favourite Doctor
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Designing a smart, affordable, accessible, and secure web platform for medical services across Hyderabad.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center space-y-2 h-full">
                    <stat.icon className="w-8 h-8 text-primary" />
                    <p className="text-sm font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <Image
              src="https://placehold.co/600x600.png"
              width={600}
              height={600}
              alt="Hero Illustration"
              data-ai-hint="doctors illustration"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
