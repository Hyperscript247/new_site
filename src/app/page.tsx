import Hero from "../components/Hero";
import Features from "../components/Features";
import ServiceShowcase from "../components/ServiceShowcase";
import WhyChooseUs from "../components/WhyChooseUs";
import SuccessStories from "../components/SuccessStories";
import CallToAction from "../components/CallToAction";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import ScrollUp from "../components/Common/ScrollUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyperscript - Data-Driven Solutions & Tech Innovation",
  description: "Transform your business with our comprehensive suite of services including data analytics, software engineering, training, and talent outsourcing solutions.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <ServiceShowcase />
      <WhyChooseUs />
      <SuccessStories />
      <CallToAction />
      <FAQ />
      <Contact />
    </>
  );
}
