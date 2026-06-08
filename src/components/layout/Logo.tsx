"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "light"
}

export function Logo({ className, variant = "default" }: LogoProps) {
  // Use HSL values from globals.css
  const teal = variant === "light" ? "white" : "hsl(180 100% 23.7%)"
  const darkBlue = variant === "light" ? "hsl(171 43% 60%)" : "hsl(241 80% 21%)"

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
          width="16" 
          height="16" 
          rx="2" 
          fill={darkBlue} 
        />
        
        {/* Teal Frame Shape */}
        <path
          d="M38 16H16V84H84V38"
          stroke={teal}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
