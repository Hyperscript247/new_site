import Hero from "@/components/home/hero"
import CompanyIntro from "@/components/home/company-intro"
import ServicesPreview from "@/components/home/services-preview"
import TrustSection from "@/components/home/trust-section"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CompanyIntro />
      <ServicesPreview />
      <TrustSection />
    </div>
  )
}
