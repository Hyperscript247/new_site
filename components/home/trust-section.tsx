"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function TrustSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-background">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter">
              Trusted by Leading Organizations
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg font-light">
              Our client success stories demonstrate our commitment to excellence, innovation, and tailored solutions
              that deliver measurable results.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card p-6"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted p-2">
                    <Image
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={`Client ${i}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Client {i}</h3>
                    <p className="text-sm text-muted-foreground">Industry Leader</p>
                  </div>
                </div>
                <blockquote className="text-sm text-muted-foreground font-light">
                  "Hyperscript Technologies transformed our business operations with their innovative solutions. Their
                  team's expertise and dedication exceeded our expectations."
                </blockquote>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 fill-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 glass-card p-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-light">Ready to transform your business?</h3>
              <p className="text-muted-foreground font-light">
                Contact us today to learn how our solutions can help your organization thrive in the digital age.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline" >
                  <Link href="/success-stories">Read Success Stories</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-[300px] aspect-square">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-5xl font-light text-primary">98%</div>
                    <div className="text-sm text-muted-foreground mt-2">Client Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
