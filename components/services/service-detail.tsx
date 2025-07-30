"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface ServiceDetailProps {
  id: string
  title: string
  imgUrl: string
  description: string
  services: {
    title: string
    description: string
  }[]
  ctaText: string
  ctaLink: string
  imagePosition: "left" | "right"
}

export default function ServiceDetail({
  id,
  title,
  imgUrl,
  description,
  services,
  ctaText,
  ctaLink,
  imagePosition,
}: ServiceDetailProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      id={id}
      className={`w-full py-24 md:py-32 ${imagePosition === "right" ? "bg-background" : "bg-muted/30 dark:animated-gradient"}`}
    >
      <div className="container px-6 mx-auto">
        <div
          className={`grid gap-12 lg:grid-cols-2 items-center ${
            imagePosition === "right" ? "" : "lg:flex-row-reverse"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "right" ? -20 : 20 }}
            // animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imagePosition ? -20 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imagePosition === "right" ? -20 : 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              {title.split(" ")[0]}
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter">{title}</h2>
            <p className="text-muted-foreground text-lg font-light">{description}</p>
            <div className="space-y-4 mt-6">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="rounded-full bg-primary/20 p-1 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{service.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "right" ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imagePosition === "right" ? 20 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={imgUrl}
                alt={title}
                width={600}
                height={400}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                                      <h3 className="text-xl font-medium text-white dark:text-white">{title}</h3>
                  <p className="text-sm text-gray-300 dark:text-gray-300">Innovative solutions for your business</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
