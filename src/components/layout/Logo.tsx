"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "light"
}

export function Logo({ className, variant = "default" }: LogoProps) {
  // Use HSL values from globals.css
  const teal = variant === "light" ? "white" : "hsl(180 58% 27%)"
  const darkBlue = variant === "light" ? "hsl(171 43% 60%)" : "hsl(240 67% 12%)"

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Dark Blue Accent Square (Top Left) */}
        <rect 
          x="8" 
          y="8" 
          width="18" 
          height="18" 
          rx="4" 
          fill={darkBlue} 
        />
        
        {/* Top-Right Teal Segment */}
        <path
          d="M36 17H83V45"
          stroke={teal}
          strokeWidth="18"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        
        {/* Bottom-Left Teal Segment */}
        <path
          d="M17 36V83H83V55"
          stroke={teal}
          strokeWidth="18"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
