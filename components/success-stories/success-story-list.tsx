"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const successStories = [
	{
		title: "Financial Services Transformation",
		client: "Major Bank",
		challenge: "Legacy systems hindering growth and customer experience",
		solution: "Implemented modern data analytics platform and custom software solutions",
		results: "30% increase in operational efficiency and improved customer satisfaction",
		industry: "Financial Services",
	},
	{
		title: "Healthcare Data Management",
		client: "Regional Hospital",
		challenge: "Inefficient data management affecting patient care",
		solution: "Deployed comprehensive data management system with analytics capabilities",
		results: "Reduced administrative time by 40% and improved patient outcomes",
		industry: "Healthcare",
	},
	{
		title: "Retail Analytics Platform",
		client: "E-commerce Company",
		challenge: "Inability to leverage customer data for personalized marketing",
		solution: "Built custom analytics platform with AI-powered recommendations",
		results: "25% increase in conversion rates and 35% higher customer retention",
		industry: "Retail",
	},
]

export default function SuccessStoryList() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.1 })

	return (
		<section
			ref={ref}
			className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden"
		>
			{/* Decorative shapes */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-20 right-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl transform translate-x-1/2"></div>
				<div className="absolute bottom-20 left-0 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl transform -translate-x-1/2"></div>
			</div>

			<div className="container px-4 md:px-6 relative z-10">
				<div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.5 }}
						className="space-y-2"
					>
						<div className="inline-block rounded-lg bg-primary/20 dark:bg-primary/30 px-3 py-1 text-sm font-medium text-primary dark:text-primary-foreground shadow-sm">
							Case Studies
						</div>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-primary/90 to-purple-700 bg-clip-text text-transparent dark:from-primary-foreground dark:to-purple-300">
							Our Client Success Stories
						</h2>
						<p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Explore how we've helped organizations across industries overcome
							challenges and achieve their goals.
						</p>
					</motion.div>
				</div>

				<div className="grid gap-8 md:gap-12">
					{successStories.map((story, i) => (
						<motion.div
							key={story.title}
							initial={{ opacity: 0, y: 20 }}
							animate={
								isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.1 * i }}
							className={`grid gap-6 lg:grid-cols-2 lg:gap-12 items-center ${
								i % 2 === 0 ? "" : "lg:flex-row-reverse"
							}`}
						>
							<div className="space-y-4 p-6 rounded-xl bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shadow-lg dark:shadow-gray-900/30 border border-purple-100/50 dark:border-purple-900/20">
								<div className="inline-block rounded-lg bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary dark:text-primary-foreground">
									{story.industry}
								</div>
								<h3 className="text-2xl font-bold text-gray-800 dark:text-white">
									{story.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300 font-medium">
									Client: {story.client}
								</p>
								<div className="space-y-4">
									<div className="bg-purple-50 dark:bg-gray-800/50 p-4 rounded-lg">
										<h4 className="font-semibold text-primary dark:text-primary-foreground">
											Challenge:
										</h4>
										<p className="text-gray-600 dark:text-gray-300">
											{story.challenge}
										</p>
									</div>
									<div className="bg-purple-50 dark:bg-gray-800/50 p-4 rounded-lg">
										<h4 className="font-semibold text-primary dark:text-primary-foreground">
											Solution:
										</h4>
										<p className="text-gray-600 dark:text-gray-300">
											{story.solution}
										</p>
									</div>
									<div className="bg-purple-50 dark:bg-gray-800/50 p-4 rounded-lg">
										<h4 className="font-semibold text-primary dark:text-primary-foreground">
											Results:
										</h4>
										<p className="text-gray-600 dark:text-gray-300">
											{story.results}
										</p>
									</div>
								</div>
								<Button asChild variant="ghost" className="p-0 h-auto group">
									<Link
										href="/contact"
										className="flex items-center gap-1 text-primary dark:text-primary-foreground hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
									>
										Read Full Case Study{" "}
										<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
									</Link>
								</Button>
							</div>
							<div className="flex justify-center">
								<div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl dark:shadow-gray-900/50 ring-1 ring-purple-200 dark:ring-purple-900/30 transform hover:scale-[1.02] transition-transform">
									<Image
										src="/placeholder.svg?height=400&width=600"
										alt={story.title}
										width={600}
										height={400}
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
										<div className="p-4">
											<h3 className="text-lg font-bold text-white dark:text-white">
												{story.title}
											</h3>
											<p className="text-sm text-gray-300 dark:text-gray-300">
												{story.client}
											</p>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
