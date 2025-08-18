
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Users, Bed, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const points = [
  { icon: Leaf, title: "Stress Management" },
  { icon: Heart, title: "Emotional Support" },
  { icon: Brain, title: "Therapy & Counseling" },
  { icon: Users, title: "Family & Relationship" },
  { icon: Bed, title: "Better Sleep & Focus" },
];

export function MentalHealthWhyMatters() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Prioritize Your Well-being</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Taking care of your mental health is a vital step towards a happier and more fulfilling life. We provide a safe space to explore your thoughts and feelings with professional guidance.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="text-center h-full flex flex-col items-center justify-center p-4 hover:shadow-lg hover:border-primary transition-all duration-300">
                <CardHeader className="p-0 flex flex-col items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full w-fit">
                    <point.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold font-headline">{point.title}</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
