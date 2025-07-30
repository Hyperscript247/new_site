"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Learning", href: "/learning" },
  { name: "Contact Us", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
      <header
          className={cn(
              "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
              isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
          )}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="logo-container">
                <Image
                    src="/logo-2.svg"
                    alt="Hyperscript Technologies Logo"
                    width={80}
                    height={80}
                    className="h-8 w-auto"
                />
              </div>
              <span className="font-light text-xl tracking-tight">Hyperscript</span>
            </Link>
            <nav className="hidden md:flex space-x-10 text-sm text-muted-foreground">
              {navigation.map((item) => (
                                      <Link key={item.name} href={item.href} className="hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Button asChild variant="outline" className="border-border hover:bg-accent transition-all">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-md border-border">
                <div className="grid gap-6 py-6">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="logo-container">
                      <Image
                          src="/logo-2.svg"
                          alt="Hyperscript Technologies Logo"
                          width={40}
                          height={40}
                          className="h-8 w-auto"
                      />
                    </div>
                    <span className="font-light text-xl">Hyperscript</span>
                  </Link>
                  <div className="grid gap-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                    ))}
                    <div className="flex items-center justify-between mt-4">
                      <ThemeToggle />
                      <Button asChild className="flex-1 ml-4">
                        <Link href="/contact">Get Started</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
  )
}
