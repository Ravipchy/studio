"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Emeita Darogn",
    specialization: "Specialization",
    rating: 5,
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Preney Odeine",
    specialization: "Specialization",
    rating: 5,
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Prooern Migle",
    specialization: "Specialization",
    rating: 5,
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Vieet Pany",
    specialization: "Vernren D tties",
    rating: 5,
    avatar: "https://placehold.co/100x100.png",
  },
    {
    name: "Hentru Sthow",
    specialization: "Cashbine",
    rating: 5,
    avatar: "https://placehold.co/100x100.png",
  },
];

export function PatientTestimonialsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 md:py-24 bg-muted/40"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Patient Testimonial</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 rounded-2xl shadow-lg relative h-full flex flex-col items-center">
                 <Quote className="absolute top-4 left-4 h-8 w-8 text-gray-200 dark:text-gray-700 transform -scale-x-100" />
                 <Quote className="absolute bottom-4 right-4 h-8 w-8 text-gray-200 dark:text-gray-700" />
                 <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full mb-4"
                    data-ai-hint="patient avatar"
                  />
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{testimonial.specialization}</p>
                  <div className="flex items-center my-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">/5</span>
                  </div>
                 <Button variant="outline" size="sm" className="mt-auto text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700">View Profile</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
