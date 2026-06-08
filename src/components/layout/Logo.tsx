"use client"

import * as React from "react"

export function Logo({ className, variant = "default" }: { className?: string; variant?: "default" | "light" }) {
  // Use theme colors for the default variant, and white/accent for the light variant (footer)
  const primaryColor = variant === "light" ? "hsl(var(--accent))" : "hsl(var(--primary))"
  const secondaryColor = variant === "light" ? "white" : "hsl(var(--secondary))"

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top left dark blue square */}
      <rect x="8" y="8" width="18" height="18" fill={secondaryColor} />
      
      {/* Top right frame piece */}
      <path 
        d="M40 8H84C88.4183 8 92 11.5817 92 16V46" 
        stroke={primaryColor} 
        strokeWidth="16" 
        strokeLinecap="square" 
      />
      
      {/* Bottom and left main piece */}
      <path 
        d="M92 64V84C92 88.4183 88.4183 92 84 92H16C11.5817 92 8 88.4183 8 84V40" 
        stroke={primaryColor} 
        strokeWidth="16" 
        strokeLinecap="square" 
      />
    </svg>
  )
}
