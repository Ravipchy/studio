
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { Chrome } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const { toast } = useToast();
  const router = useRouter();
  const { signup, googleLogin, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(email, password, name, role);
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
        await googleLogin();
        router.push('/');
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Google Login Failed",
            description: error.message,
        });
    } finally {
        setIsLoading(false);
    }
  }

  if (user) {
    router.push('/');
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Join Arogya Sathi to manage your healthcare.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>I am a...</Label>
              <RadioGroup
                defaultValue="patient"
                className="flex gap-4"
                onValueChange={(value: "patient" | "doctor") => setRole(value)}
                disabled={isLoading}
              >
                <Label
                  htmlFor="patient"
                  className="flex items-center gap-2 border rounded-md p-3 flex-1 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary"
                >
                  <RadioGroupItem value="patient" id="patient" />
                  Patient
                </Label>
                <Label
                  htmlFor="doctor"
                  className="flex items-center gap-2 border rounded-md p-3 flex-1 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary"
                >
                  <RadioGroupItem value="doctor" id="doctor" />
                  Doctor
                </Label>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
           <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
              <Chrome className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
