"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Ambulance, FileText, Video, Pill, Home, FlaskConical, BrainCircuit } from "lucide-react";
import { motion } from 'framer-motion';

const services = [
  { icon: MapPin, title: "Find Nearby Doctor", button: "Find Now" },
  { icon: Ambulance, title: "Book Ambulance", button: "Book Now" },
  { icon: FileText, title: "View Medical Report", button: "View Reports" },
  { icon: Video, title: "Telemedicine", button: "Consult Now" },
  { icon: Pill, title: "Pharmacy", button: "Order Now" },
  { icon: Home, title: "Home Care", button: "Request Care" },
  { icon: FlaskConical, title: "Lab Tests", button: "Book Test" },
  { icon: BrainCircuit, title: "Mental Health", button: "Get Help" },
];

export function ServicesSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Our Services</h2>
          <p className="text-muted-foreground mt-2">Comprehensive healthcare services at your fingertips.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardTitle className="text-lg font-semibold font-headline mb-4">{service.title}</CardTitle>
                  <Button variant="outline">{service.button}</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
