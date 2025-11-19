import ServicesIntro from "@/components/services/services-intro"
import ServiceDetail from "@/components/services/service-detail"
import ContactBanner from "@/components/services/contact-banner"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <ServicesIntro />
      <ServiceDetail
        id="software-development"
        title="Software Development"
        imgUrl="/software.jpg"
        description="Build robust, scalable software solutions tailored to your business needs with our expert development team."
        services={[
          {
            title: "Frontend & Backend Development",
            description: "Full-stack development using modern frameworks and technologies.",
          },
          {
            title: "DevOps & Cloud Computing",
            description: "Streamline deployment and infrastructure management in the cloud.",
          },
          {
            title: "Database Administration",
            description: "Efficient database design, optimization, and management.",
          },
          {
            title: "API & System Integration",
            description: "Seamless integration between your existing systems and new solutions.",
          },
        ]}
        ctaText="Start Your Project"
        ctaLink="/contact"
        imagePosition="right"
      />
      <ServiceDetail
        id="data-ai-solutions"
        title="Data & AI Solutions"
        imgUrl="/data-analytics.jpg"
        description="Transform your data into actionable insights with our comprehensive data analytics and AI solutions."
        services={[
          {
            title: "Data Analytics & Business Intelligence",
            description: "Powerful insights using Power BI, Tableau, and Python.",
          },
          {
            title: "Data Engineering & Cloud Data Architecture",
            description: "Build scalable data pipelines and cloud-based data solutions.",
          },
          {
            title: "AI Integration & Data Science",
            description: "Leverage AI and machine learning to drive innovation.",
          },
          {
            title: "Business Intelligence Consulting",
            description: "Strategic guidance for data-driven decision making.",
          },
        ]}
        ctaText="Request a Data Consultation"
        ctaLink="/contact"
        imagePosition="left"
      />
      <ServiceDetail
        id="digital-marketing"
        title="Digital Marketing"
        imgUrl="/hr.jpg"
        description="Amplify your brand's online presence with strategic digital marketing solutions that drive engagement and growth."
        services={[
          {
            title: "Social Media Marketing & Brand Management",
            description: "Build and grow your brand across all social platforms.",
          },
          {
            title: "SEO & SEM Optimization",
            description: "Improve search rankings and drive targeted traffic.",
          },
          {
            title: "Content Strategy & Email Marketing",
            description: "Engaging content that converts and nurtures leads.",
          },
          {
            title: "Web & App Marketing Analytics",
            description: "Data-driven insights to optimize your marketing campaigns.",
          },
        ]}
        ctaText="Boost Your Brand"
        ctaLink="/contact"
        imagePosition="right"
      />
      <ServiceDetail
        id="graphics-media"
        title="Graphics Design & Media Production"
        imgUrl="/graphics.jpg"
        description="Create stunning visual content that captures attention and communicates your brand story effectively."
        services={[
          {
            title: "Graphics Design & Branding",
            description: "Professional design solutions that elevate your brand identity.",
          },
          {
            title: "Videography & Photography",
            description: "High-quality visual content for all your business needs.",
          },
          {
            title: "Video Editing & Animation",
            description: "Professional post-production and motion graphics.",
          },
          {
            title: "Corporate and Product Media Campaigns",
            description: "Comprehensive media campaigns that drive results.",
          },
        ]}
        ctaText="Create With Us"
        ctaLink="/contact"
        imagePosition="left"
      />
      <ServiceDetail
        id="training-outsourcing"
        title="Training & Outsourcing"
        imgUrl="/training.jpg"
        description="Empower your workforce with cutting-edge tech training and access to skilled professionals when you need them."
        services={[
          {
            title: "Tech & Data Training Programs",
            description: "Comprehensive training in software engineering, analytics, AI, and digital marketing.",
          },
          {
            title: "Corporate Training",
            description: "Customized training programs tailored to your organization's needs.",
          },
          {
            title: "Employee Outsourcing",
            description: "Access skilled professionals for your projects and operations.",
          },
          {
            title: "Capacity Building Workshops",
            description: "Interactive sessions to upskill your teams in emerging technologies.",
          },
        ]}
        ctaText="Schedule a Workshop"
        ctaLink="/contact"
        imagePosition="right"
      />
      <ContactBanner />
    </div>
  )
}
