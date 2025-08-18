
"use client";

import { Menu } from "lucide-react";
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
  {label:"Find Nearby Doctor", href:"/doctors"},
  {label:"Book Ambulance", href:"/ambulance"}, 
  {label:"Telemedicine", href:"/telemedicine"},
  {label:"View Medical Report", href:"/health-record"}, 
  {label:"Pharmacy", href:"/pharmacy"}, 
  {label:"Home Care", href:"/home-care"}, 
  {label:"Lab Tests", href:"/lab-tests"}, 
  {label:"Mental Health", href:"/mental-health"}
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "#", label: "Services", isDropdown: true },
  { href: "/health-record", label: "Health Record" },
  { href: "/contact", label: "Contact Us" },
];

function RedCrossIcon() {
  return (
    <svg
      className="h-8 w-8 text-red-500"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.5 3H10.5V10.5H3V13.5H10.5V21H13.5V13.5H21V10.5H13.5V3Z" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 md:mr-6 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <RedCrossIcon />
            <span className="font-bold font-headline inline-block text-lg">AROGYA SATHI</span>
          </Link>
        </div>
        <div className="flex w-full items-center justify-end md:justify-between">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(link => (
              link.isDropdown ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center outline-none">
                    {link.label}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {services.map(service => <DropdownMenuItem key={service.label} asChild><Link href={service.href}>{service.label}</Link></DropdownMenuItem>)}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">{link.label}</Link>
              )
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
                            <RedCrossIcon />
                            <span className="font-bold font-headline">AROGYA SATHI</span>
                        </Link>
                    </div>
                  <nav className="flex flex-col gap-4 py-4">
                     {navLinks.filter(l => !l.isDropdown).map(link => (
                       <Link key={link.label} href={link.href} className="text-lg font-medium">{link.label}</Link>
                    ))}
                    <div className="space-y-2 pt-2 border-t">
                      <p className="text-lg font-medium text-muted-foreground">Services</p>
                      <div className="flex flex-col gap-2 pl-4">
                        {services.map(service => <Link href={service.href} className="text-muted-foreground" key={service.label}>{service.label}</Link>)}
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
