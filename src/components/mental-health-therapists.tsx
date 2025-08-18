
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";

const therapists = [
  { name: "Dr. Anya Sharma", specialty: "Psychologist", rating: 5, reviews: 112, price: "499", avatar: "https://placehold.co/150x150.png" },
  { name: "Rahul Verma", specialty: "Counselor", rating: 4, reviews: 98, price: "399", avatar: "https://placehold.co/150x150.png" },
  { name: "Priya Singh", specialty: "Therapist", rating: 5, reviews: 150, price: "449", avatar: "https://placehold.co/150x150.png" },
  { name: "Dr. Kabir Gupta", specialty: "Psychiatrist", rating: 5, reviews: 204, price: "599", avatar: "https://placehold.co/150x150.png" },
];

export function MentalHealthTherapists() {
  return (
    <section className="py-12 md:py-24 bg-muted/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Our Available Therapists</h2>
          <p className="text-muted-foreground mt-2">Find the right professional to support your journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {therapists.map((therapist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                <Image src={therapist.avatar} alt={therapist.name} width={100} height={100} className="rounded-full mb-4 border-2 border-primary/50" data-ai-hint="therapist photo" />
                <h3 className="font-bold text-lg">{therapist.name}</h3>
                <p className="text-sm text-muted-foreground">{therapist.specialty}</p>
                <div className="flex items-center my-2">
                  {[...Array(therapist.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">({therapist.reviews} reviews)</span>
                </div>
                <p className="text-xl font-bold my-2">₹{therapist.price}<span className="text-sm font-normal text-muted-foreground">/session</span></p>
                <Button className="w-full mt-auto">Book Now</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
