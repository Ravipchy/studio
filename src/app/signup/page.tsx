
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, KeyRound, Stethoscope, UserCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please check your passwords and try again.",
      });
      return;
    }
    if (password.length < 6) {
       toast({
        variant: "destructive",
        title: "Password is too weak",
        description: "Password should be at least 6 characters long.",
      });
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: fullName,
            email: user.email,
            phone: phone,
            role: role,
            createdAt: new Date().toISOString(),
            authProvider: 'email'
        });
        
        toast({
            title: "Signup Successful",
            description: "Your account has been created. Redirecting...",
        });
        
        if (role === 'doctor') {
            router.push("/doctor-dashboard");
        } else {
            router.push("/");
        }
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Signup Failed",
            description: error.message,
        });
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Create an Account</CardTitle>
          <CardDescription>Join Arogya Sathi to manage your health.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
                <Label>I am a</Label>
                <RadioGroup defaultValue="patient" onValueChange={(value: "patient" | "doctor") => setRole(value)} className="grid grid-cols-2 gap-4">
                    <div>
                        <RadioGroupItem value="patient" id="patient" className="peer sr-only" />
                        <Label
                        htmlFor="patient"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                        <UserCircle className="mb-3 h-6 w-6" />
                        Patient
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem value="doctor" id="doctor" className="peer sr-only" />
                        <Label
                        htmlFor="doctor"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                        <Stethoscope className="mb-3 h-6 w-6" />
                        Doctor
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="fullname" placeholder="John Doe" className="pl-10" required value={fullName} onChange={(e) => setFullName(e.target.value)}/>
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
               <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="john.doe@example.com" className="pl-10" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="phone" type="tel" placeholder="+91 1234567890" className="pl-10" required value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="confirm-password" type="password" placeholder="••••••••" className="pl-10" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline font-semibold">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
