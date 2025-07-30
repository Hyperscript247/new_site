"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function SuccessStoriesIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 via-white to-purple-50 dark:bg-gradient-to-b dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 text-foreground relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-70 dark:opacity-30 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-primary/15 dark:bg-primary/25 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-purple-200/30 dark:bg-purple-700/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-primary/20 dark:bg-primary/30 px-3 py-1 text-sm font-medium text-primary dark:text-primary-foreground shadow-sm">Success Stories</div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary/90 via-primary to-purple-700 bg-clip-text text-transparent dark:from-primary-foreground dark:to-purple-300">
              Transforming Businesses, One Success at a Time
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our client success stories demonstrate our commitment to excellence, innovation, and tailored solutions
              that deliver measurable results.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { label: "Clients Served", value: "200+" },
            { label: "Projects Completed", value: "500+" },
            { label: "Success Rate", value: "98%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800/50 shadow-md dark:shadow-gray-900/30 border border-purple-100 dark:border-purple-900/50 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent dark:from-primary-foreground dark:to-purple-300 mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
