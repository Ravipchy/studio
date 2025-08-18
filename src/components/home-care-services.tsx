"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Syringe, User, FlaskConical, ShieldCheck, HeartPulse, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Stethoscope,
    title: "Nursing Care",
    description: "Professional care including injections, dressing, and health monitoring."
  },
  {
    icon: HeartPulse,
    title: "Physiotherapy at Home",
    description: "Personalized rehabilitation and mobility support to help you recover."
  },
  {
    icon: User,
    title: "Elderly Care",
    description: "Compassionate support and daily assistance for senior members."
  },
  {
    icon: FlaskConical,
    title: "Medical Tests at Home",
    description: "Convenient blood tests and diagnostic sample collection from your home."
  },
  {
    icon: ShieldCheck,
    title: "Post-Surgery Care",
    description: "Dedicated recovery monitoring and professional wound care after surgery."
  },
  {
    icon: Syringe,
    title: "Vaccination at Home",
    description: "Get important vaccinations safely and conveniently at your doorstep."
  }
];

export function HomeCareServices() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Our Home Care Services</h2>
          <p className="text-muted-foreground mt-2">Comprehensive medical services at your doorstep.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="text-center h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                   <CardTitle className="text-xl font-semibold font-headline">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <Button variant="outline">Book Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
