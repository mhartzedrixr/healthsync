
"use client"

import * as React from "react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Logo({ className }: { className?: string; variant?: "default" | "light" }) {
  const logoData = PlaceHolderImages.find(img => img.id === "app-logo")

  return (
    <div className={className}>
      <Image 
        src={logoData?.imageUrl || "https://picsum.photos/seed/healthsync-logo/200/200"} 
        alt="HealthSync Logo"
        width={100}
        height={100}
        className="object-contain"
        data-ai-hint="medical logo"
      />
    </div>
  )
}
