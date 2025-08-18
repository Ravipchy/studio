import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Briefcase, Target, Users } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    { name: "Dr. Emily Carter", role: "Founder & CEO", avatar: "https://placehold.co/100x100.png" },
    { name: "John Doe", role: "Chief Technology Officer", avatar: "https://placehold.co/100x100.png" },
    { name: "Jane Smith", role: "Head of Medical Services", avatar: "https://placehold.co/100x100.png" },
    { name: "Peter Jones", role: "Lead Developer", avatar: "https://placehold.co/100x100.png" },
  ];

  return (
    <div className="bg-background">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                About Arogya Sathi
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We are dedicated to revolutionizing healthcare by making it more accessible, affordable, and efficient for everyone. Our platform connects patients with trusted medical professionals, ensuring quality care is just a click away.
              </p>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="About us illustration"
              data-ai-hint="team working healthcare"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="w-8 h-8 text-primary" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p>To bridge the gap between patients and healthcare providers through innovative technology, ensuring timely and quality medical services for all.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Target className="w-8 h-8 text-primary" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p>To be the leading digital healthcare platform, trusted by millions for our commitment to excellence, compassion, and integrity.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="w-8 h-8 text-primary" />
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  <li>Patient-Centricity</li>
                  <li>Integrity and Trust</li>
                  <li>Innovation</li>
                  <li>Excellence</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Meet Our Team</h2>
            <p className="text-muted-foreground mt-2">The passionate people behind Arogya Sathi</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="flex flex-col items-center p-6">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person professional photo"/>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
