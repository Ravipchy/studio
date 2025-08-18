
"use client";

import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('patient' | 'doctor')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        // If user's role is not allowed, redirect them
        router.push(userRole === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
      }
    }
  }, [user, userRole, loading, router, allowedRoles]);

  if (loading || !user || (allowedRoles && userRole && !allowedRoles.includes(userRole))) {
    // You can return a loader here
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
