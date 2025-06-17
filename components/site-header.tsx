"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/courses",
      label: "Courses",
      active: pathname === "/courses",
    },
    {
      href: "/instructors",
      label: "Instructors",
      active: pathname === "/instructors",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
    {
      href: "/dashboard",
      label: "Student",
      active: pathname === "/dashboard",
    },
    {
      href: "/admin/dashboard",
      label: "Admin",
      active: pathname.startsWith("/admin"),
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-12 w-12">
              <Image
                src="/logo.png"
                alt="Brushed by Betty Makeup Institute Logo"
                width={48}
                height={48}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gradient-gold">Brushed by Betty</span>
              <span className="text-sm text-deep-purple font-medium">Makeup Institute</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`transition-colors hover:text-mustard ${
                route.active ? "text-mustard font-bold" : "text-charcoal/80"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="text-charcoal" /> : <Menu className="text-charcoal" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/60">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-lg ${route.active ? "text-mustard font-bold" : "text-charcoal/80"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
