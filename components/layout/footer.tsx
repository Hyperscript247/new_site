import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Contact Us", href: "/contact" },
  ],
  social: [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ],
}

export default function Footer() {
  return (
      <footer className="bg-background/80 backdrop-blur-md border-t border-border">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="logo-container">
                  <Image
                      src="/logo-2.svg"
                      alt="Hyperscript Technologies Logo"
                      width={50}
                      height={50}
                      className="h-10 w-auto"
                  />
                </div>
                {/*<span className="font-light text-xl">Hyperscript</span>*/}
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs font-light">
                Empowering organizations with advanced analytics, custom software solutions, and expert training.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium">Navigation</h3>
                <ul className="mt-4 space-y-2">
                  {navigation.main.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {item.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium">Contact</h3>
                <ul className="mt-4 space-y-2">
                  <li className="text-sm text-muted-foreground font-light">No 9C Afolabi Lesi Street, Town Planning, Lagos.</li>
                  <li>
                    <a
                        href="mailto:soetanbolaji@gmail.com"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      soetanbolaji@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+2348164629033" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      +2348164629033
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium">Follow Us</h3>
                <div className="mt-4 flex space-x-3">
                  {navigation.social.map((item) => (
                      <a
                          key={item.name}
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={item.name}
                      >
                        <item.icon className="h-5 w-5" />
                      </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
                      <div className="mt-12 border-t border-border pt-8">
            <p className="text-xs text-muted-foreground font-light">
              &copy; {new Date().getFullYear()} Hyperscript Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}
