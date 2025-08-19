
"use client";

import React, { useState, useEffect } from "react";
import { Menu, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Logo } from "./logo";


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

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "#", label: "Services", isDropdown: true },
  { href: "/contact", label: "Contact Us" },
];

function getDashboardLink(role?: 'patient' | 'doctor' | 'driver') {
    switch (role) {
        case 'doctor':
            return '/doctor-dashboard';
        case 'driver':
            return '/ambulance-driver';
        case 'patient':
        default:
            return '/patient-dashboard';
    }
}

function HeaderContent() {
    const { user, logout, userData } = useAuth();

    return (
        <div className="flex w-full items-center justify-end md:justify-between">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(link => (
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
                <ThemeToggle />
                {user ? (
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                           <Avatar>
                                <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? 'User'} />
                                <AvatarFallback>{user.displayName?.charAt(0) ?? user.email?.charAt(0)}</AvatarFallback>
                           </Avatar>
                       </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={getDashboardLink(userData?.role)}>
                                <UserCircle className="mr-2 h-4 w-4" />
                                My Dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4"/>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                   </DropdownMenu>
                ) : (
                    <div className="hidden md:flex items-center gap-2">
                         <Button asChild variant="ghost">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                )}
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
                           <Logo />
                        </div>
                        <nav className="flex flex-col gap-4 py-4">
                            {navLinks.filter(l => !l.isDropdown).map(link => (
                            <Link key={link.label} href={link.href} className="text-lg font-medium">{link.label}</Link>
                            ))}
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
                        </nav>
                         {!user && (
                            <div className="mt-auto flex flex-col gap-2 border-t pt-4">
                                <Button asChild size="lg"><Link href="/login">Login</Link></Button>
                                <Button asChild variant="outline" size="lg"><Link href="/signup">Sign Up</Link></Button>
                            </div>
                        )}
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
         <Logo />
        </div>
        {isMounted ? <HeaderContent /> : null}
      </div>
    </header>
  );
}
