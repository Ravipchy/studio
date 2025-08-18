
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound, Mail, Chrome } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userRole = userDoc.exists() ? userDoc.data().role : 'patient';

      toast({
        title: "Login Successful",
        description: "Redirecting...",
      });

      if (userRole === 'doctor') {
        router.push("/doctor-dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        let userRole = 'patient'; // default role

        if (!userDoc.exists()) {
            // New user, prompt for role
            // For simplicity, we'll default to patient. A real app would have a role selection modal.
            await setDoc(userDocRef, {
                name: user.displayName,
                email: user.email,
                role: 'patient',
                authProvider: 'google',
                createdAt: new Date().toISOString()
            });
             toast({ title: "Account Created", description: "You've been registered as a patient." });
        } else {
            userRole = userDoc.data().role;
        }

        toast({ title: "Logged in with Google", description: "Redirecting..." });
        
        if (userRole === 'doctor') {
            router.push('/doctor-dashboard');
        } else {
            router.push('/');
        }
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Google Login Failed",
            description: error.message,
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Welcome Back!</CardTitle>
          <CardDescription>Log in to your Arogya Sathi account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="john.doe@example.com" className="pl-10" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">OR</span>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
            <Chrome className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline font-semibold">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
