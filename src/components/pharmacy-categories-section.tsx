"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Syringe, HeartPulse, Shield, Baby, Pill, Bone } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { icon: Syringe, title: "General Medicine", href: "#" },
  { icon: HeartPulse, title: "Diabetes Care", href: "#" },
  { icon: Shield, title: "Heart Care", href: "#" },
  { icon: Baby, title: "Covid Essentials", href: "#" },
  { icon: Pill, title: "Vitamins & Supplements", href: "#" },
  { icon: Bone, title: "Bone & Joint Care", href: "#"},
];

export function PharmacyCategoriesSection() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">Browse our wide range of health products.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href}>
                <Card className="text-center h-full flex flex-col items-center justify-center p-4 hover:shadow-lg hover:border-primary transition-all duration-300">
                  <CardContent className="p-0 flex flex-col items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-full w-fit">
                      <category.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-base font-semibold font-headline">{category.title}</CardTitle>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
