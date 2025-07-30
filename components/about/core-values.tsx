"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Shield, Award, Users, Zap, BarChart } from "lucide-react"

const values = [
  {
    title: "Innovation",
    description: "We constantly seek new and better ways to solve problems and create value.",
    icon: Lightbulb,
  },
  {
    title: "Integrity",
    description: "We uphold the highest standards of honesty, transparency, and ethical behavior.",
    icon: Shield,
  },
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do, delivering quality solutions.",
    icon: Award,
  },
  {
    title: "Collaboration",
    description: "We work together as a team, valuing diverse perspectives and ideas.",
    icon: Users,
  },
  {
    title: "Agility",
    description: "We adapt quickly to changing circumstances and embrace new challenges.",
    icon: Zap,
  },
  {
    title: "Results-Driven",
    description: "We focus on delivering measurable outcomes that drive business success.",
    icon: BarChart,
  },
]

export default function CoreValues() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-muted/30">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Our Foundation</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter">Core Values</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg font-light">
              The principles that guide our actions and define our culture.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card p-6"
            >
              <div className="space-y-4">
                <div className="rounded-full bg-primary/20 p-3 w-fit text-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium">{value.title}</h3>
                <p className="text-muted-foreground font-light">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-medium mb-4">Join Our Team</h3>
          <p className="mx-auto max-w-[700px] text-muted-foreground font-light">
            We're always looking for talented individuals who share our values and passion for innovation. If you're
            interested in joining our team, we'd love to hear from you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
