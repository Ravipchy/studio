"use client";

import { HeartPulse, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

const services = [
  "Find Nearby Doctor", "Book Ambulance", "View Medical Report", "Telemedicine", 
  "Pharmacy", "Home Care", "Lab Tests", "Mental Health"
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#", label: "About" },
  { href: "#", label: "Health Record" },
  { href: "#", label: "Contact Us" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 md:mr-6 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline inline-block">Arogya Sathi</span>
          </Link>
        </div>
        <div className="flex w-full items-center justify-end md:justify-between">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.slice(0, 2).map(link => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">{link.label}</Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center outline-none">Services</DropdownMenuTrigger>
              <DropdownMenuContent>
                {services.map(service => <DropdownMenuItem key={service}>{service}</DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
            {navLinks.slice(2).map(link => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">{link.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
             <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost">Log in</Button>
              <Button>Sign up</Button>
            </div>
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm">
                <div className="flex flex-col h-full">
                    <div className="border-b pb-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <HeartPulse className="h-6 w-6 text-primary" />
                            <span className="font-bold font-headline">Arogya Sathi</span>
                        </Link>
                    </div>
                  <nav className="flex flex-col gap-4 py-4">
                    {navLinks.map(link => (
                      <Link key={link.label} href={link.href} className="text-lg font-medium">{link.label}</Link>
                    ))}
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Services</p>
                      <div className="flex flex-col gap-2 pl-4">
                        {services.map(service => <Link href="#" className="text-muted-foreground" key={service}>{service}</Link>)}
                      </div>
                    </div>
                  </nav>
                  <div className="mt-auto flex flex-col gap-2">
                    <Button variant="ghost" size="lg">Log in</Button>
                    <Button size="lg">Sign up</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
