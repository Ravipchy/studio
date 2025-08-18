
"use client";

import React, { useState, useEffect } from "react";
import { Menu, User, LogOut } from "lucide-react";
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
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const patientServices = [
  {label:"Find Nearby Doctor", href:"/doctors"},
  {label:"Book Ambulance", href:"/ambulance"}, 
  {label:"Telemedicine", href:"/telemedicine"},
  {label:"View Medical Report", href:"/health-record"},
  {label:"My Appointments", href:"/appointments"},
  {label:"Pharmacy", href:"/pharmacy", subItems: [{label: "Order History", href: "/pharmacy/orders"}]},
  {label:"Home Care", href:"/home-care", subItems: [{label: "Booking History", href: "/home-care/history"}]}, 
  {label:"Lab Tests", href:"/lab-tests", subItems: [{label: "Booking History", href: "/lab-tests/history"}]}, 
  {label:"Mental Health", href:"/mental-health"}
];

const doctorNavLinks = [
    { href: "/doctor-dashboard", label: "Dashboard" },
    { href: "/doctor-appointments", label: "Appointments" },
    { href: "/telemedicine", label: "Telemedicine" },
    { href: "/health-record", label: "Reports" },
];

const patientNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "#", label: "Services", isDropdown: true },
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

function AuthNav() {
  const { user, userRole } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
      await signOut(auth);
      router.push('/login');
  };

  if (!user) {
    return (
      <>
          <Button variant="ghost" asChild><Link href="/login">Log in</Link></Button>
          <Button asChild><Link href="/signup">Sign up</Link></Button>
      </>
    )
  }
  
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary">
                <User className="mr-2"/>
                {user.displayName || "User"}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.push(userRole === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard')}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2"/> Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

function HeaderContent() {
    const { userRole } = useAuth();

    const currentNavLinks = userRole === 'doctor' ? doctorNavLinks : patientNavLinks;

    return (
        <div className="flex w-full items-center justify-end md:justify-between">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {currentNavLinks.map(link => (
                link.isDropdown ? (
                <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center outline-none">
                    {link.label}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    {patientServices.map(service => (
                        <React.Fragment key={service.label}>
                        <DropdownMenuItem asChild><Link href={service.href}>{service.label}</Link></DropdownMenuItem>
                        {service.subItems && (
                            <>
                            {service.subItems.map(subItem => (
                                <DropdownMenuItem key={subItem.label} asChild className="pl-6">
                                <Link href={subItem.href}>{subItem.label}</Link>
                                </DropdownMenuItem>
                            ))}
                            </>
                        )}
                        </React.Fragment>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                ) : (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">{link.label}</Link>
                )
            ))}
            </nav>
            <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2">
                   <AuthNav />
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
                            {currentNavLinks.filter(l => !l.isDropdown).map(link => (
                            <Link key={link.label} href={link.href} className="text-lg font-medium">{link.label}</Link>
                            ))}
                            {userRole !== 'doctor' && (
                                <div className="space-y-2 pt-2 border-t">
                                    <p className="text-lg font-medium text-muted-foreground">Services</p>
                                    <div className="flex flex-col gap-2 pl-4">
                                        {patientServices.map(service => (
                                        <div key={service.label}>
                                            <Link href={service.href} className="text-muted-foreground font-semibold">{service.label}</Link>
                                            {service.subItems && (
                                            <div className="flex flex-col gap-1 pl-4 pt-1">
                                                {service.subItems.map(subItem => (
                                                <Link href={subItem.href} className="text-muted-foreground" key={subItem.label}>{subItem.label}</Link>
                                                ))}
                                            </div>
                                            )}
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </nav>
                        <div className="mt-auto flex flex-col gap-2">
                           <AuthNav />
                        </div>
                    </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}


export function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 md:mr-6 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <RedCrossIcon />
            <span className="font-bold font-headline inline-block text-lg">AROGYA SATHI</span>
          </Link>
        </div>
        {isMounted ? <HeaderContent /> : null}
      </div>
    </header>
  );
}
