"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "Hyperscript Technologies transformed our business operations with their innovative solutions. Their team's expertise and dedication exceeded our expectations.",
    author: "Oladele David",
    position: "CTO, VeldtsDigital Limited",
  },
  {
    quote:
      "Working with Hyperscript has been a game-changer for our organization. Their data analytics solutions have provided us with valuable insights that drive our decision-making.",
    author: "Michael Ebuka",
    position: "Director of Operations, Healthcare Provider",
  },
  {
    quote:
      "The training programs developed by Hyperscript have significantly improved our team's technical capabilities. Highly recommended for any organization looking to upskill their workforce.",
    author: "Emily Adebola",
    position: "HR Director, Retail Corporation",
  }
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear directly from our clients about their experiences working with Hyperscript Technologies.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="relative overflow-hidden rounded-lg border bg-background p-6"
            >
              <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-primary/20 blur-2xl" />
              <div className="relative space-y-4">
                <svg
                  className="h-8 w-8 text-primary/40"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <blockquote className="text-muted-foreground">{testimonial.quote}</blockquote>
                <div className="flex items-center space-x-4">
                  {/*<div className="rounded-full bg-muted p-1">*/}
                  {/*  <Image*/}
                  {/*    src={`/placeholder.svg?height=40&width=40`}*/}
                  {/*    alt={testimonial.author}*/}
                  {/*    width={40}*/}
                  {/*    height={40}*/}
                  {/*    className="rounded-full"*/}
                  {/*  />*/}
                  {/*</div>*/}
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <h3 className="text-xl font-bold">Ready to become our next success story?</h3>
          <p className="mx-auto max-w-[600px] text-muted-foreground">
            Contact us today to discuss how we can help your organization achieve its goals.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
