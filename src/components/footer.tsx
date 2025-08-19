
import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-sky-800 text-white">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <Logo textClassName="text-2xl" />
          <p className="text-sm">
            Arogya Sathi is a smart healthcare platform designed to tackle long wait times, overcrowding, and limited emergency access.
          </p>
        </div>
        <div>
          <h3 className="font-semibold font-headline mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/doctors" className="hover:underline">Find a Doctor</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="#" className="hover:underline">FAQs</Link></li>
            <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold font-headline mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/doctors" className="hover:underline">Doctor Appointment</Link></li>
            <li><Link href="/ambulance" className="hover:underline">Book Ambulance</Link></li>
            <li><Link href="/telemedicine" className="hover:underline">Telemedicine</Link></li>
            <li><Link href="/health-record" className="hover:underline">Medical Report</Link></li>
            <li><Link href="/pharmacy" className="hover:underline">Pharmacy</Link></li>
            <li><Link href="/home-care" className="hover:underline">Home Care</Link></li>
            <li><Link href="/lab-tests" className="hover:underline">Lab Tests</Link></li>
            <li><Link href="/mental-health" className="hover:underline">Mental Health</Link></li>
          </ul>
        </div>
        <div className="bg-white text-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold font-headline mb-4 text-black">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Phone: +1234567890</li>
            <li>Email: abc@arogyasathi.com</li>
            <li>Address: 123, Abc Building, Hyderabad, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-400">
        <div className="container py-4 text-center text-sm">
          ©2025 Arogya Sathi All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
