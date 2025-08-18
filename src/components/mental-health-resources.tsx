
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const resources = [
  { title: "Dealing with Stress", image: "https://placehold.co/400x250.png", hint: "person meditating peacefully" },
  { title: "Improving Sleep Quality", image: "https://placehold.co/400x250.png", hint: "person sleeping calm" },
  { title: "Mindfulness Meditation", image: "https://placehold.co/400x250.png", hint: "zen garden rocks" },
  { title: "Overcoming Anxiety", image: "https://placehold.co/400x250.png", hint: "person overcoming challenge" },
];

export function MentalHealthResources() {
  return (
    <section className="py-12 md:py-24 bg-muted/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Self-Help Resources</h2>
          <p className="text-muted-foreground mt-2">Explore articles and guides to support your mental well-being.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <Image src={resource.image} alt={resource.title} width={400} height={250} className="object-cover" data-ai-hint={resource.hint} />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg font-semibold font-headline">{resource.title}</CardTitle>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                   <Button variant="link" className="p-0">Read More</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
