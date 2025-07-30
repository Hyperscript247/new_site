"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

// Dynamically import SplineViewer to avoid SSR issues and chunk loading problems
const SplineViewer = dynamic(() => import("@/components/ui/spline-viewer"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 animated-gradient">
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <div className="animate-pulse">Loading 3D Experience...</div>
        </div>
      </div>
    </div>
  ),
})

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-background text-foreground">
      {/* Spline Background with Theme Overlay */}
      <div className="spline-container">
        <SplineViewer 
          url="https://my.spline.design/claritystream-a72K0KUwFoZV82QBzvu52Kai/"
          className="absolute inset-0"
          fallback={<div className="absolute inset-0 animated-gradient" />}
        />
        {/* Theme-aware overlay */}
        <div className="absolute inset-0 bg-background/90 dark:bg-background/60"></div>
      </div>

      {/* Content Overlay */}
      <div className="content-container min-h-screen flex flex-col">
        {/* Hero content */}
        <div className="container mx-auto px-6 pt-32 md:pt-40 flex-grow flex flex-col justify-center">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Transform
              </span>{" "}
              Your Business with Data-Driven Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground text-xl md:text-2xl mb-8 max-w-2xl font-light tracking-wide"
            >
              Empowering organizations with advanced analytics, custom software solutions, and expert training.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground font-light hover:bg-primary/90 transition-all">
                <Link href="/services">Get Started</Link>
              </Button>
              <Button asChild variant="link" className="text-muted-foreground hover:text-foreground transition-colors group">
                <Link href="/about" className="flex items-center">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
          >
            <div>
              <p className="text-4xl font-light mb-1 tracking-tight">95%</p>
              <p className="text-muted-foreground font-extralight">Client satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-light mb-1 tracking-tight">200+</p>
              <p className="text-muted-foreground font-extralight">Clients served</p>
            </div>
            <div>
              <p className="text-4xl font-light mb-1 tracking-tight">500+</p>
              <p className="text-muted-foreground font-extralight">Projects completed</p>
            </div>
            <div>
              <p className="text-4xl font-light mb-1 tracking-tight">24/7</p>
              <p className="text-muted-foreground font-extralight">Support available</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
