"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const termsContent = [
  {
    title: "Purpose of the Community",
    content: `Hyperscript is a vibrant network built to support tech enthusiasts and professionals through:

• Job opportunities and career growth
• Networking and industry connections
• Lifestyle and mental wellness support
• Capacity building, mentorship, and learning
• Events, projects, and collaborative experiences

Our goal is simple: to create an enabling environment where tech professionals can grow, thrive, and receive the support they need at every stage of their journey.`
  },
  {
    title: "Member Expectations",
    content: `To maintain a safe and productive environment, members agree to:

• Respect others in communication and collaboration
• Engage honestly and provide accurate information
• Use community resources responsibly
• Promote positive interactions and avoid harassment, intimidation, or discrimination
• Keep confidential information private if shared within the community
• Contribute where possible to learning, support, and knowledge-sharing`
  },
  {
    title: "Community Responsibilities",
    content: `Hyperscript will:

• Provide opportunities for learning, networking, and professional development
• Share verified job opportunities and relevant industry updates
• Organize programs that support mental wellness and productivity
• Facilitate events and platforms for collaboration
• Maintain a respectful and inclusive space for all members`
  },
  {
    title: "Data Use & Privacy",
    content: `We collect certain information to:

• Verify membership
• Improve community programs
• Tailor opportunities to your interests and skills

Your information will never be sold or used outside Hyperscript's community initiatives.`
  },
  {
    title: "Participation & Conduct",
    content: `Hyperscript reserves the right to pause or revoke membership of individuals who:

• Consistently violate community rules
• Engage in harmful or fraudulent activities
• Misuse the platform or harass other members

This is to ensure a safe and supportive environment for everyone.`
  },
  {
    title: "Flexibility & Growth",
    content: `These terms may evolve as the community grows. Members will be notified of major updates, and continued participation implies acceptance of revised terms.

By registering, you agree to uphold the spirit of cooperation, respect, and growth that defines the Hyperscript community.`
  }
]

export default function CommunityTerms() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="w-full py-20 md:py-32 bg-muted/30">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Terms of Engagement</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to Hyperscript. By joining our community of tech professionals, you agree to engage
            responsibly, contribute positively, and support the shared mission that brings us together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {termsContent.map((term, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {index + 1}. {term.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground whitespace-pre-line">
                  {term.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
