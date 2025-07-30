"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react"

export default function ContactInfo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="w-full py-12 md:py-24 lg:py-32 bg-background dark:bg-gradient-to-b dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 text-foreground"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Contact Us</div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We're here to help you harness the power of technology – reach out today!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center p-6 rounded-lg bg-primary/5 dark:bg-white/5 text-center"
          >
            <div className="rounded-full bg-primary/20 p-3 text-primary-foreground mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <p className="text-muted-foreground">
              No 9C Afolabi Lesi Street,
              <br />
              Town Planning, Lagos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center p-6 rounded-lg bg-primary/5 dark:bg-white/5 text-center"
          >
            <div className="rounded-full bg-primary/20 p-3 text-primary-foreground mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <a href="mailto:soetanbolaji@gmail.com" className="text-muted-foreground hover:text-primary">
              soetanbolaji@gmail.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center p-6 rounded-lg bg-primary/5 dark:bg-white/5 text-center"
          >
            <div className="rounded-full bg-primary/20 p-3 text-primary-foreground mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <a href="tel:+2348164629033" className="text-muted-foreground hover:text-primary">
              +2348164629033
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            {[
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Youtube, label: "YouTube" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="rounded-full bg-primary/10 p-3 text-muted-foreground hover:bg-primary/20 hover:text-primary-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
