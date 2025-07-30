import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Breadcrumb from "../../components/Common/Breadcrumb";

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Data Management & Analytics",
      description: "Extract actionable insights for strategic decision-making with our advanced analytics and business intelligence solutions.",
      icon: "📊",
      path: "/services/data-analytics",
    },
    {
      id: 2,
      title: "Software Engineering",
      description: "Custom software development, web and mobile applications, and system integration services tailored to your needs.",
      icon: "💻",
      path: "/services/software-engineering",
    },
    {
      id: 3,
      title: "Training & Capacity Building",
      description: "Empower your team with our corporate training programs and customized learning solutions.",
      icon: "🎓",
      path: "/services/training",
    },
    {
      id: 4,
      title: "Talent Outsourcing",
      description: "Access skilled professionals and optimize your workforce with our talent outsourcing solutions.",
      icon: "👥",
      path: "/services/talent-outsourcing",
    },
  ];

  return (
    <>
      <Breadcrumb
        pageName="Our Services"
        description="Discover our comprehensive range of services designed to transform your business operations and drive sustainable growth."
      />
      <section className="relative z-10 py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Fade key={service.id} direction="up" delay={service.id * 100}>
                <div className="group relative rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark">
                  <div className="mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary/10 text-3xl">
                    {service.icon}
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mb-8 text-base text-body-color dark:text-body-color-dark">
                    {service.description}
                  </p>
                  <Link
                    href={service.path}
                    className="text-base font-medium text-primary hover:underline"
                  >
                    Learn More →
                  </Link>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage; 