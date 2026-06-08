"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./Logo"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Offers", href: "/offers" },
  { name: "Careers", href: "/careers" },
  { name: "Clients", href: "/clients" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 lg:px-8" aria-label="Global">
        <div className="flex flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <Logo className="h-9 w-9 md:h-11 md:w-11 shrink-0 transition-transform group-hover:scale-105" />
            <span className="font-headline text-base md:text-lg font-bold tracking-tight text-secondary leading-tight max-w-[200px] sm:max-w-none">
              Healthsync Medical <span className="hidden sm:inline">Solutions Corporation</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-1 lg:items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                pathname === item.href 
                  ? "bg-primary/5 text-primary" 
                  : "text-secondary/80 hover:bg-muted hover:text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-secondary hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-all duration-300",
          mobileMenuOpen ? "visible bg-black/50" : "invisible bg-black/0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-sm lg:hidden transition-transform duration-300 ease-in-out bg-background shadow-2xl",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <Logo className="h-8 w-8" />
            <span className="font-headline text-base font-bold text-secondary">
              Healthsync Medical
            </span>
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-secondary hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-64px)] px-4 py-6">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-lg px-4 py-3 text-base font-semibold transition-colors",
                  pathname === item.href 
                    ? "bg-primary text-white" 
                    : "text-secondary hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
