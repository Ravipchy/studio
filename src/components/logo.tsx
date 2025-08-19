"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, textClassName }: { className?: string; textClassName?: string }) {
  return (
    <Link href="/" className={cn("flex items-center space-x-2", className)}>
      <div className="relative h-8 w-8">
        <svg
          className="h-full w-full text-red-500"
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Red Cross */}
          <path d="M60 10H40V40H10V60H40V90H60V60H90V40H60V10Z" />

          {/* Hands */}
          <g transform="translate(0, 5)" fill="black">
             {/* Left Hand */}
            <path d="M42,65 C40,63 38,62 36,62 C32,62 30,64 30,68 C30,72 32,75 35,78 C38,81 40,85 40,90 L44,90 C44,83 42,79 39,76 C42,73 44,70 44,66 C44,64 43,63 42,62" />
            <path d="M42,62 C41.5,61.5 41,61 40.5,61 C38,61 36,62.5 36,65 C36,68 38,70 40,72 C41,73 42,75 42,77 L46,77 C46,74 45,72 44,71 C45,70 46,68 46,65 C46,63 45,62 44,61.5" transform="translate(-12, 5) rotate(-10 41 69)" />
             {/* Right Hand */}
            <path d="M58,65 C60,63 62,62 64,62 C68,62 70,64 70,68 C70,72 68,75 65,78 C62,81 60,85 60,90 L56,90 C56,83 58,79 61,76 C58,73 56,70 56,66 C56,64 57,63 58,62" />
            <path d="M58,62 C58.5,61.5 59,61 59.5,61 C62,61 64,62.5 64,65 C64,68 62,70 60,72 C59,73 58,75 58,77 L54,77 C54,74 55,72 56,71 C55,70 54,68 54,65 C54,63 55,62 56,61.5" transform="translate(12, 5) rotate(10 59 69)" />
          </g>
        </svg>
      </div>
      <span className={cn("font-bold font-headline inline-block text-lg", textClassName)}>AROGYA SATHI</span>
    </Link>
  );
}