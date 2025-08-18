
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
          if(pathname.startsWith('/doctor-') && userData.role !== 'doctor') {
              router.push('/patient-dashboard'); // Or a generic unauthorized page
          }
          if(pathname.startsWith('/patient-') && userData.role !== 'patient') {
              router.push('/doctor-dashboard');
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
  
  // Render children only if user is authenticated and has correct role
  if (user) {
    return <>{children}</>;
  }

  // Fallback to null or a loader while redirecting
  return null;
}
