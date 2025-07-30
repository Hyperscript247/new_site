"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BarChart3, Code, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Data Management & Analytics",
    description: "Extract actionable insights for strategic decision-making with our advanced analytics solutions.",
    icon: BarChart3,
    href: "/services#data-analytics",
  },
  {
    title: "Software Engineering",
    description: "Custom software development tailored to your unique operations and business needs.",
    icon: Code,
    href: "/services#software-engineering",
  },
  {
    title: "Training & Capacity Building",
    description: "Empower your teams with advanced tech skills through interactive workshops and programs.",
    icon: BookOpen,
    href: "/services#training",
  },
  {
    title: "Talent Outsourcing",
    description: "Access skilled professionals when you need them with our workforce solutions.",
    icon: Users,
    href: "/services#talent",
  },
]

export default function ServicesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-muted/30 dark:animated-gradient">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Our Services</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter">
              Comprehensive Solutions for Your Business
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg font-light">
              Our tailored solutions meet your business challenges head-on – from advanced data management to bespoke
              software engineering.
            </p>
          </motion.div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 mt-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <div className="glass-card h-full p-6 transition-all hover:bg-primary/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <service.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                <ul className="grid gap-2 text-sm mb-6">
                  {service.title === "Data Management & Analytics" &&
                    [
                      "Real-time data visualization dashboards",
                      "Predictive analytics and forecasting",
                      "Custom reporting solutions",
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}

                  {service.title === "Software Engineering" &&
                    [
                      "Custom web and mobile applications",
                      "API development and integration",
                      "Legacy system modernization",
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}

                  {service.title === "Training & Capacity Building" &&
                    ["Customized learning programs", "Hands-on technical workshops", "Certification preparation"].map(
                      (feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ),
                    )}

                  {service.title === "Talent Outsourcing" &&
                    [
                      "Skilled technical resource placement",
                      "Project-based team augmentation",
                      "Talent acquisition consulting",
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                </ul>
                <Button asChild variant="link" className="p-0 h-auto text-primary group">
                  <Link href={service.href} className="flex items-center gap-1">
                    Explore Service <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
