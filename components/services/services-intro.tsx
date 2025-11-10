"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Megaphone, Camera, GraduationCap } from "lucide-react"

export default function ServicesIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-background text-foreground">
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
              From software development to data analytics, digital marketing to media production, and training to outsourcing –
              we deliver end-to-end solutions that drive your business forward.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Code,
                title: "Software Development",
                description: "Full-stack development, DevOps, and cloud solutions",
                link: "#software-development",
              },
              {
                icon: Database,
                title: "Data & AI Solutions",
                description: "Analytics, BI, data engineering, and AI integration",
                link: "#data-ai-solutions",
              },
              {
                icon: Megaphone,
                title: "Digital Marketing",
                description: "Social media, SEO, content strategy, and analytics",
                link: "#digital-marketing",
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {[
              {
                icon: Camera,
                title: "Graphics & Media",
                description: "Design, videography, photography, and animation",
                link: "#graphics-media",
              },
              {
                icon: GraduationCap,
                title: "Training & Outsourcing",
                description: "Tech training programs and talent outsourcing",
                link: "#training-outsourcing",
              },
            ].map((service, i) => (
              <motion.a
                key={service.title}
                href={service.link}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 3) }}
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
      </div>
    </section>
  )
}
