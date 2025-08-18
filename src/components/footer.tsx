import { HeartPulse } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Arogya Sathi</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            Arogya Sathi is a smart healthcare platform designed to tackle long wait times, overcrowding, and limited emergency access.
          </p>
        </div>
        <div>
          <h3 className="font-semibold font-headline mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold font-headline mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Doctor Appointment</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Book Ambulance</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Telemedicine</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Medical Report</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Pharmacy</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Home Care</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold font-headline mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Phone: +91 12345 67890</li>
            <li>Email: contact@arogyasathi.com</li>
            <li>Address: Hyderabad, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          ©2025 Arogya Sathi All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
