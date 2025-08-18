
"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BarChart2, Truck, BadgeDollarSign, Headset, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: Award, title: "Certified Labs" },
  { icon: BarChart2, title: "Accurate Reports" },
  { icon: Truck, title: "Home Collection" },
  { icon: BadgeDollarSign, title: "Affordable Pricing" },
  { icon: Headset, title: "24/7 Support" },
  { icon: FlaskConical, title: "Wide Range of Tests" },
];

export function LabTestsBenefits() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Why Choose Arogya Sathi?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full flex flex-col items-center justify-center p-4 hover:shadow-lg hover:border-primary transition-all duration-300">
                <CardHeader className="p-0 flex flex-col items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full w-fit">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold font-headline">{benefit.title}</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
