
"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin, TestTube } from "lucide-react";
import { motion } from "framer-motion";

export function LabTestsSearch() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-12 bg-muted/40"
    >
      <div className="container">
        <div className="p-6 bg-background rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="lg:col-span-2 space-y-2">
              <label htmlFor="search-tests" className="font-medium">Search Tests</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="search-tests" placeholder="Search for tests, profiles, or packages..." className="pl-10 h-12" />
              </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="package-filter" className="font-medium">Package</label>
                <Select>
                    <SelectTrigger id="package-filter" className="h-12">
                        <div className="flex items-center gap-2">
                            <TestTube className="h-5 w-5 text-muted-foreground" />
                            <SelectValue placeholder="All Packages" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="full-body">Full Body Checkup</SelectItem>
                    <SelectItem value="diabetes">Diabetes Profile</SelectItem>
                    <SelectItem value="thyroid">Thyroid Profile</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                 <label htmlFor="location-filter" className="font-medium">Location</label>
              <Select>
                <SelectTrigger id="location-filter" className="h-12">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <SelectValue placeholder="Select Location" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
