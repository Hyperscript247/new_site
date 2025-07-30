"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function CompanyOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="w-full py-32 md:py-40 bg-background text-foreground">
      <div className="container px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">About Us</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter">Our Story</h1>
            <p className="text-muted-foreground text-lg font-light">
              Founded by a team of technology enthusiasts, Hyperscript Technologies is at the forefront of transforming
              data into strategic assets. We believe in the power of technology to solve complex business challenges and
              drive growth.
            </p>
            <p className="text-muted-foreground/80 font-light">
              Since our inception, we've been dedicated to helping organizations harness the full potential of their
              data and technology investments. Our team of experts brings together diverse skills and experiences to
              deliver innovative solutions that make a real difference.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/89041.jpg"
                alt="Hyperscript Team"
                width={600}
                height={400}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-medium">Our Journey</h3>
                  <p className="text-sm text-gray-300 dark:text-gray-300">Building innovative solutions since inception</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-light tracking-tighter text-center mb-16"
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-primary to-transparent" />

            {/* Timeline items */}
            {[
              {
                year: "2018",
                title: "Foundation",
                description:
                  "Hyperscript Technologies was founded with a vision to transform businesses through technology.",
              },
              {
                year: "2020",
                title: "Expansion",
                description:
                  "Expanded our service offerings to include comprehensive data analytics and software engineering solutions.",
              },
              {
                year: "2022",
                title: "Growth",
                description:
                  "Established training programs and talent outsourcing services to meet growing client demands.",
              },
              {
                year: "2023",
                title: "Innovation",
                description:
                  "Launched innovative AI-powered solutions to help businesses leverage advanced technologies.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className={`relative flex items-center justify-between mb-16 ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="text-muted-foreground font-light">{item.description}</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-medium text-xs">{item.year}</span>
                </div>
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
