
"use client";

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChatbotWidget } from '@/components/chatbot-widget';
import { AuthProvider } from '@/contexts/auth-context';
import { ProtectedRoute } from '@/components/protected-route';
import { usePathname } from 'next/navigation';

const protectedRoutes = [
    '/appointments',
    '/doctor-dashboard',
    '/doctor-appointments',
    '/health-record',
    '/home-care/history',
    '/lab-tests/history',
    '/patient-dashboard',
    '/pharmacy',
    '/pharmacy/orders',
    '/telemedicine/session',
    '/ambulance-driver',
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <title>Arogya Sathi - Your Smart Healthcare Partner</title>
        <meta name="description" content="Designing a smart, affordable, accessible, and secure web platform for medical services across Hyderabad." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {isProtectedRoute ? (
                    <ProtectedRoute>{children}</ProtectedRoute>
                ) : (
                    children
                )}
              </main>
              <Footer />
              <ChatbotWidget />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
