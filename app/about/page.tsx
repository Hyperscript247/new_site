import CompanyOverview from "@/components/about/company-overview"
import VisionMission from "@/components/about/vision-mission"
import CoreValues from "@/components/about/core-values"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <CompanyOverview />
      <VisionMission />
      <CoreValues />
    </div>
  )
}
