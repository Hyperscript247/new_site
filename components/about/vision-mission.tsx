"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Target, Rocket } from "lucide-react"

export default function VisionMission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-background dark:bg-animated-gradient">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Our Purpose</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter">Vision & Mission</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg font-light">
              Guiding principles that drive our work and shape our future.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="relative space-y-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/20 p-3 text-primary">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-light">Our Vision</h3>
              </div>
              <p className="text-muted-foreground font-light">
                To empower organizations with data-driven insights and innovative solutions, transforming businesses
                into dynamic and efficient enterprises.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground font-light">Leading technological innovation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground font-light">Creating sustainable business growth</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground font-light">Building a data-driven future</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8"
          >
            <div className="relative space-y-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/20 p-3 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-light">Our Mission</h3>
              </div>
              <p className="text-muted-foreground font-light">
                To deliver cutting-edge data analytics, business intelligence, and corporate training solutions that
                overcome complex challenges and nurture industry leaders.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground font-light">Providing exceptional client service</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground font-light">Developing innovative solutions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground font-light">Fostering continuous learning</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 glass-card p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/20 p-3 text-primary">
                <Rocket className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Our Approach</h3>
                <p className="text-muted-foreground font-light">Innovative, client-focused, and results-driven</p>
              </div>
            </div>
            <div className="h-px w-full md:h-16 md:w-px bg-border" />
            <p className="text-center md:text-left text-muted-foreground font-light">
              We combine deep industry expertise with cutting-edge technology to deliver solutions that drive real
              business value. Our collaborative approach ensures that we understand your unique challenges and develop
              tailored strategies to address them.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
