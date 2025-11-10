"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle } from "lucide-react"

export default function CommunitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-gradient-to-b from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-background to-primary/10" />

      <div className="container px-6 mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 lg:p-16 rounded-2xl border border-primary/20 backdrop-blur-xl bg-gradient-to-br from-purple-900/10 to-primary/5"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Side - Content */}
            <div className="flex-1 flex items-center gap-6 text-center lg:text-left">
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden sm:block"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                  <div className="relative bg-gradient-to-br from-primary to-purple-500 p-4 rounded-full">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Text Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="sm:hidden mb-4 flex justify-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                    <div className="relative bg-gradient-to-br from-primary to-purple-500 p-4 rounded-full">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter mb-4"
                >
                  Join Our Growing{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    Community!
                  </span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-muted-foreground text-base md:text-lg font-light max-w-2xl"
                >
                  Connect, Learn, Access Resources & Job Opportunities, Volunteer, Brainstorm, and Be Part of Something Big in a Community That Listens.
                </motion.p>
              </div>
            </div>

            {/* Right Side - CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex-shrink-0"
            >
              <Button
                asChild
                size="lg"
                className="group relative bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-400 text-white font-light text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
              >
                <Link href="/community" className="flex items-center gap-3">
                  Get Started - It&apos;s Free!
                  <MessageCircle className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                </Link>
              </Button>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-lg opacity-20 -z-10 group-hover:opacity-30 transition-opacity duration-300" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}