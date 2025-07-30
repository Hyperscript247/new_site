"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart3, Code, BookOpen, Users } from "lucide-react"

export default function ServicesIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="w-full py-32 md:py-40 bg-background text-foreground">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Our Services</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter">
              Comprehensive Solutions for Your Business
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg font-light">
              Our tailored solutions meet your business challenges head-on – from advanced data management to bespoke
              software engineering.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            {
              icon: BarChart3,
              title: "Data Analytics",
              description: "Transform raw data into actionable insights",
              link: "#data-analytics",
            },
            {
              icon: Code,
              title: "Software Engineering",
              description: "Custom solutions for your unique needs",
              link: "#software-engineering",
            },
            {
              icon: BookOpen,
              title: "Training",
              description: "Empower your team with new skills",
              link: "#training",
            },
            {
              icon: Users,
              title: "Talent Solutions",
              description: "Access skilled professionals on demand",
              link: "#talent",
            },
          ].map((service, i) => (
            <motion.a
              key={service.title}
              href={service.link}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card p-6 flex flex-col items-center text-center hover:bg-primary/5 transition-colors"
            >
              <div className="rounded-full bg-primary/20 p-3 text-primary mb-4">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                              <p className="text-muted-foreground font-light">{service.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
