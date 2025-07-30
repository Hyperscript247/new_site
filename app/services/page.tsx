import ServicesIntro from "@/components/services/services-intro"
import ServiceDetail from "@/components/services/service-detail"
import ContactBanner from "@/components/services/contact-banner"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <ServicesIntro />
      <ServiceDetail
        id="data-analytics"
        title="Data Management and Analytics"
        imgUrl="/data-analytics.jpg"
        description="Extract actionable insights for strategic decision-making with our advanced analytics solutions."
        services={[
          {
            title: "Advanced Analytics",
            description: "Extract actionable insights for strategic decision-making.",
          },
          {
            title: "Business Intelligence Tools",
            description: "Custom dashboards and reporting platforms tailored to your needs.",
          },
          {
            title: "Data Cleaning and Transformation",
            description: "Ensure accurate, reliable data for your business.",
          },
          {
            title: "Predictive Analytics",
            description: "Forecast trends for confident decision-making.",
          },
        ]}
        ctaText="Request a Data Consultation"
        ctaLink="/contact"
        imagePosition="right"
      />
      <ServiceDetail
        id="software-engineering"
        title="Software Engineering Services"
        imgUrl="/software.jpg"
        description="Custom software development tailored to your unique operations and business needs."
        services={[
          {
            title: "Custom Software Development",
            description: "Tailored solutions for your unique operations.",
          },
          {
            title: "Web and Mobile Applications",
            description: "Modern applications to enhance customer engagement.",
          },
          {
            title: "API Development and System Integration",
            description: "Seamless connection between systems.",
          },
          {
            title: "Software Maintenance and Upgrades",
            description: "Keep your technology optimized.",
          },
        ]}
        ctaText="Start Your Project"
        ctaLink="/contact"
        imagePosition="left"
      />
      <ServiceDetail
        id="training"
        title="Training and Capacity Building"
        imgUrl="/training.jpg"
        description="Empower your teams with advanced tech skills through interactive workshops and programs."
        services={[
          {
            title: "Corporate Training",
            description: "Empowering teams with advanced tech skills.",
          },
          {
            title: "Skill Development Workshops",
            description: "Interactive sessions for upskilling.",
          },
          {
            title: "Customized Learning Programs",
            description: "Training tailored to your organization's needs.",
          },
          {
            title: "Emerging Trends Training",
            description: "Stay ahead with the latest industry insights.",
          },
        ]}
        ctaText="Schedule a Workshop"
        ctaLink="/contact"
        imagePosition="right"
      />
      <ServiceDetail
        id="talent"
        title="Talent Outsourcing and Workforce Solutions"
        imgUrl="/hr.jpg"
        description="Access skilled professionals when you need them with our workforce solutions."
        services={[
          {
            title: "Hirable Talent Pool",
            description: "Access skilled professionals when you need them.",
          },
          {
            title: "Workforce Development",
            description: "Guidance on building and optimizing your teams.",
          },
          {
            title: "Project-Based Outsourcing",
            description: "Right talent for the right projects.",
          },
          {
            title: "Talent Acquisition Strategy",
            description: "Develop effective hiring strategies for your organization.",
          },
        ]}
        ctaText="Find the Right Talent"
        ctaLink="/contact"
        imagePosition="left"
      />
      <ContactBanner />
    </div>
  )
}
