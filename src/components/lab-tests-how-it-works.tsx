
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TestTube, CalendarDays, Home, FileText } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: TestTube, title: "Select Test or Package", description: "Choose the test you need and add it to your cart." },
  { icon: CalendarDays, title: "Schedule Home Collection", description: "Pick a convenient date and time for sample collection." },
  { icon: Home, title: "Technician Collects Sample", description: "Our expert technician will visit your home for the sample." },
  { icon: FileText, title: "Get Reports Online", description: "Access your accurate reports securely on our platform." }
];

export function LabTestsHowItWorks() {
  return (
    <section className="py-12 md:py-24 bg-muted/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">How It Works</h2>
          <p className="text-muted-foreground mt-2">A simple four-step process for your convenience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
              <svg width="100%" height="2" className="overflow-visible">
                <line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" strokeDasharray="8 8" className="stroke-border" />
              </svg>
          </div>
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto bg-background border p-4 rounded-full mb-4 w-fit">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
