"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Briefcase, Heart, GraduationCap, Calendar, Network } from "lucide-react"

const benefits = [
  {
    icon: Briefcase,
    title: "Job Opportunities",
    description: "Access exclusive job openings and career advancement opportunities tailored to tech professionals",
  },
  {
    icon: Network,
    title: "Networking",
    description: "Connect with industry leaders, professionals, and peers to expand your professional network",
  },
  {
    icon: Heart,
    title: "Wellness Support",
    description: "Access mental wellness programs and lifestyle support designed for tech professionals",
  },
  {
    icon: GraduationCap,
    title: "Mentorship & Learning",
    description: "Gain access to mentorship programs, workshops, and continuous learning opportunities",
  },
  {
    icon: Calendar,
    title: "Exclusive Events",
    description: "Participate in community events, tech talks, and collaborative projects",
  },
  {
    icon: Users,
    title: "Supportive Community",
    description: "Join a vibrant network that supports your growth at every stage of your tech journey",
  },
]

export default function CommunityHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="w-full py-20 md:py-32 bg-background">
      <div className="container px-6 mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            Join Our Community
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Welcome to Hyperscript Community
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A vibrant network built to support tech enthusiasts and professionals through collaboration,
            growth, and shared experiences. Join us to unlock opportunities and thrive in your tech journey.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            To create an enabling environment where tech professionals can grow, thrive, and receive
            the support they need at every stage of their journey. Together, we build a stronger,
            more connected tech community.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
