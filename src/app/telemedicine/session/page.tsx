
"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mic, MicOff, Video, VideoOff, MessageSquare, Send, Paperclip, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";


export default function VideoConsultationPage() {
  const [isMicMuted, setMicMuted] = useState(false);
  const [isCameraOff, setCameraOff] = useState(false);
  const [isChatOpen, setChatOpen] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const { toast } = useToast();
  
    useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
           toast({
              variant: "destructive",
              title: "Media Devices not supported",
              description: "Your browser does not support camera access.",
            });
           setHasCameraPermission(false);
           return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera and microphone permissions in your browser settings.",
        });
      }
    };

    getCameraPermission();
  }, [toast]);


  return (
    <div className="bg-background min-h-screen flex flex-col p-4">
       <header className="flex justify-between items-center mb-4">
         <h1 className="text-xl font-bold font-headline">Video Consultation</h1>
         <Button variant="destructive" asChild>
            <Link href="/telemedicine">
                <X className="mr-2 h-4 w-4" /> End Call
            </Link>
         </Button>
       </header>

       <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
         
         {/* Video Section */}
         <div className="lg:col-span-2 flex flex-col gap-4">
           {/* Doctor's Video */}
           <Card className="flex-1 relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                    <p className="font-bold text-white bg-black/50 px-3 py-1 rounded-lg">Dr. Jane Smith</p>
                </div>
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {!hasCameraPermission &&
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white">
                        <Alert variant="destructive" className="max-w-sm">
                          <AlertTitle>Camera Access Required</AlertTitle>
                          <AlertDescription>
                            Please allow camera and microphone access to use this feature.
                          </AlertDescription>
                        </Alert>
                    </div>
                }
           </Card>

           {/* Patient's Video (Self View) & Controls */}
            <Card className="bg-muted/40 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-40 h-32 rounded-md overflow-hidden bg-black">
                     <video className="w-full h-full object-cover" autoPlay muted playsInline />
                     <div className="absolute bottom-2 left-2">
                        <p className="font-bold text-white bg-black/50 px-2 py-0.5 rounded-md text-sm">You</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant={isMicMuted ? "destructive" : "secondary"} size="icon" onClick={() => setMicMuted(!isMicMuted)}>
                        {isMicMuted ? <MicOff /> : <Mic />}
                    </Button>
                    <Button variant={isCameraOff ? "destructive" : "secondary"} size="icon" onClick={() => setCameraOff(!isCameraOff)}>
                        {isCameraOff ? <VideoOff /> : <Video />}
                    </Button>
                     <Button variant="secondary" size="icon" onClick={() => setChatOpen(!isChatOpen)}>
                        <MessageSquare />
                    </Button>
                </div>
                
                 <Button variant="destructive" size="lg" className="rounded-full" asChild>
                    <Link href="/telemedicine">
                        <Phone className="mr-2"/> Leave
                    </Link>
                </Button>
            </Card>

         </div>

         {/* Chat Section */}
         {isChatOpen && (
             <Card className="lg:col-span-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Live Chat</CardTitle>
                    <CardDescription>With Dr. Jane Smith</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                    <ScrollArea className="flex-1 pr-4">
                        <div className="space-y-4">
                            {/* Example Messages */}
                             <div className="flex items-end gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="doctor photo"/>
                                    <AvatarFallback>DS</AvatarFallback>
                                </Avatar>
                                <div className="p-3 rounded-lg bg-muted max-w-xs">
                                    <p className="text-sm">Hello John, how are you feeling today?</p>
                                </div>
                            </div>
                            <div className="flex items-end gap-2 justify-end">
                                <div className="p-3 rounded-lg bg-primary text-primary-foreground max-w-xs">
                                    <p className="text-sm">Hi Dr. Smith. I have a headache and a slight fever.</p>
                                </div>
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <Paperclip/>
                    </Button>
                    <Input placeholder="Type your message..."/>
                    <Button>
                        <Send />
                    </Button>
                </CardFooter>
            </Card>
         )}

       </div>
    </div>
  );
}
