"use client"

import {useState, useEffect} from "react"
import Link from "next/link"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {ThemeToggle} from "@/components/ui/theme-toggle"
import {Menu, ChevronDown} from "lucide-react"
import {cn} from "@/lib/utils"

type NavigationItem = {
    name: string
    href?: string
    submenu?: Array<{name: string; href: string}>
}

const navigation: NavigationItem[] = [
    {name: "Home", href: "/"},
    {name: "About Us", href: "/about"},
    {name: "Services", href: "/services"},
    {
        name: "Community",
        submenu: [
            {name: "Join Community", href: "/community"},
            {name: "Gallery", href: "/gallery"},
        ]
    },
    // {name: "Success Stories", href: "/success-stories"},
    {name: "Learning", href: "/learning"},
    {name: "Contact Us", href: "/contact"},
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Reset dropdown when mobile menu closes
    useEffect(() => {
        if (!isMobileMenuOpen) {
            setOpenDropdown(null)
        }
    }, [isMobileMenuOpen])

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
                                width={100}
                                height={100}
                                className="h-8 w-auto"
                            />
                        </div>
                        <span className="font-light text-xl tracking-tight">Hyperscript</span>
                    </Link>
                    {/* Navigation - hidden at lg breakpoint (1024px) */}
                    <nav className="hidden lg:flex space-x-10 text-sm text-muted-foreground">
                        {navigation.map((item) => (
                            item.submenu ? (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => setOpenDropdown(item.name)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                                        {item.name}
                                        <ChevronDown className="h-3 w-3" />
                                    </button>
                                    {openDropdown === item.name && (
                                        <div className="absolute top-full left-0 pt-2">
                                            <div className="w-48 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-lg py-2">
                                                {item.submenu.map((subitem) => (
                                                    <Link
                                                        key={subitem.name}
                                                        href={subitem.href}
                                                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                                    >
                                                        {subitem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link key={item.name} href={item.href!} className="hover:text-foreground transition-colors">
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </nav>
                    {/* Theme toggle and Get Started - visible until sm breakpoint */}
                    <div className="hidden lg:flex items-end space-x-4">
                        <ThemeToggle/>
                        <Button asChild variant="outline" className="border-border hover:bg-accent transition-all">
                            <Link href="/contact">Get Started</Link>
                        </Button>
                    </div>
                    {/* Sheet trigger - shows at lg breakpoint when nav is hidden */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon" aria-label="Menu">
                                <Menu className="h-6 w-6"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-background/95 backdrop-blur-md border-border">
                            <div className="grid gap-6 py-6">
                                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
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
                                        item.submenu ? (
                                            <div key={item.name}>
                                                <button
                                                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                                                    className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    {item.name}
                                                    <ChevronDown className={cn(
                                                        "h-4 w-4 transition-transform",
                                                        openDropdown === item.name && "rotate-180"
                                                    )} />
                                                </button>
                                                {openDropdown === item.name && (
                                                    <div className="ml-4 mt-2 space-y-2">
                                                        {item.submenu.map((subitem) => (
                                                            <Link
                                                                key={subitem.name}
                                                                href={subitem.href}
                                                                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                                onClick={() => {
                                                                    setIsMobileMenuOpen(false)
                                                                    setOpenDropdown(null)
                                                                }}
                                                            >
                                                                {subitem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                key={item.name}
                                                href={item.href!}
                                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    ))}
                                    <div className="flex items-center justify-between mt-4">
                                        <ThemeToggle/>
                                        <Button asChild className="flex-1 ml-4">
                                            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
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
