"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Code, BookOpen, Users } from "lucide-react"

export default function CompanyIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-background">
      <div className="container px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              About Hyperscript
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter">
              Turning Data into Insights, Ideas into Innovation
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              At Hyperscript Technologies, we convert data into insights and ideas into innovation. Our tailored
              solutions in analytics, software engineering, and training empower your business for sustainable growth.
            </p>
            <Button asChild variant="outline" className="group mt-4">
              <Link href="/services" className="flex items-center">
                Our Services
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { icon: BarChart3, title: "Data Analytics", description: "Transform raw data into actionable insights" },
              { icon: Code, title: "Software Engineering", description: "Custom solutions for your unique needs" },
              { icon: BookOpen, title: "Training", description: "Empower your team with new skills" },
              { icon: Users, title: "Talent Solutions", description: "Access skilled professionals on demand" },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                className="glass-card p-6 flex flex-col items-center text-center"
              >
                <div className="rounded-full bg-primary/20 p-3 text-primary mb-4">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
