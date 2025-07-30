import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import { FaChartLine, FaCode, FaGraduationCap, FaUsers } from "react-icons/fa";

const ServiceShowcase = () => {
  const services = [
    {
      id: 1,
      title: "Data Analytics & Business Intelligence",
      description: "Transform your data into actionable insights with our advanced analytics solutions. From data cleaning to predictive modeling, we help you make data-driven decisions.",
      icon: <FaChartLine className="h-12 w-12 text-primary" />,
      link: "/services/data-analytics",
      features: [
        "Predictive Analytics",
        "Data Visualization",
        "Business Intelligence",
        "Machine Learning"
      ]
    },
    {
      id: 2,
      title: "Software Engineering",
      description: "Build robust, scalable, and innovative software solutions with our expert engineering team. From custom applications to system integrations, we deliver high-quality software that drives business growth.",
      icon: <FaCode className="h-12 w-12 text-primary" />,
      link: "/services/software-engineering",
      features: [
        "Custom Software Development",
        "System Integration",
        "Cloud Solutions",
        "DevOps Services"
      ]
    },
    {
      id: 3,
      title: "Training & Development",
      description: "Empower your team with our comprehensive training programs and professional development solutions. From technical skills to leadership development, we help build capabilities that drive business success.",
      icon: <FaGraduationCap className="h-12 w-12 text-primary" />,
      link: "/services/training",
      features: [
        "Technical Training",
        "Leadership Development",
        "Certification Programs",
        "Workshops & Seminars"
      ]
    },
    {
      id: 4,
      title: "Talent Outsourcing",
      description: "Access top-tier IT talent and build high-performing teams with our flexible outsourcing solutions. From staff augmentation to complete project teams, we provide the expertise you need to succeed.",
      icon: <FaUsers className="h-12 w-12 text-primary" />,
      link: "/services/talent-outsourcing",
      features: [
        "Staff Augmentation",
        "Project Teams",
        "Managed Services",
        "Technical Consulting"
      ]
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-50 dark:bg-dark">
      <div className="container">
        <div className="mb-16 text-center">
          <Fade direction="up">
            <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
              Our Solutions
            </h2>
            <p className="text-base !leading-relaxed text-body-color md:text-lg">
              Comprehensive services designed to meet your business needs
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => (
            <Fade key={service.id} direction="up" delay={service.id * 100}>
              <div className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark-2">
                <div className="mb-6 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                  {service.title}
                </h3>
                <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
                  {service.description}
                </p>
                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-base text-body-color dark:text-body-color-dark">
                        <svg
                          className="mr-2 h-4 w-4 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={service.link}
                  className="inline-flex items-center text-base font-medium text-primary hover:underline"
                >
                  Learn More
                  <svg
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase; 