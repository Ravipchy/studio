
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, userData, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Handle role-based access
  useEffect(() => {
      if (!isLoading && user && userData) {
          if (pathname.startsWith('/doctor-') && userData.role !== 'doctor') {
              router.push('/');
          }
          if (pathname.startsWith('/patient-') && userData.role !== 'patient') {
              router.push('/');
          }
          if (pathname.startsWith('/ambulance-driver') && userData.role !== 'driver') {
              router.push('/');
          }
          
          // Redirect logged in users to their respective dashboards from generic protected pages
          const patientOnlyRoutes = ['/appointments', '/health-record', '/home-care/history', '/lab-tests/history', '/pharmacy', '/pharmacy/orders'];
          if (patientOnlyRoutes.some(route => pathname.startsWith(route)) && userData.role !== 'patient') {
              router.push(`/${userData.role}-dashboard`);
          }
      }
  }, [user, userData, isLoading, pathname, router]);

  if (isLoading) {
    return (
        <div className="container py-12">
            <div className="space-y-4">
                <Skeleton className="h-12 w-1/2"/>
                <Skeleton className="h-64 w-full"/>
                 <Skeleton className="h-32 w-full"/>
            </div>
        </div>
    );
  }
  
  // Render children only if user is authenticated and authorized
  if (user && userData) {
      if (pathname.startsWith('/doctor-') && userData.role === 'doctor') return <>{children}</>;
      if (pathname.startsWith('/patient-') && userData.role === 'patient') return <>{children}</>;
      if (pathname.startsWith('/ambulance-driver') && userData.role === 'driver') return <>{children}</>;
      if (!pathname.startsWith('/doctor-') && !pathname.startsWith('/patient-') && !pathname.startsWith('/ambulance-driver')) return <>{children}</>;
  }

  // Fallback to null or a loader while redirecting
  return null;
}
