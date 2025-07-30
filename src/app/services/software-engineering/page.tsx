import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Breadcrumb from "../../../components/Common/Breadcrumb";

const SoftwareEngineeringPage = () => {
  const services = [
    {
      id: 1,
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet your specific business needs and challenges.",
      icon: "💻",
    },
    {
      id: 2,
      title: "Web Application Development",
      description: "Modern, responsive web applications built with the latest technologies and best practices.",
      icon: "🌐",
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android platforms.",
      icon: "📱",
    },
    {
      id: 4,
      title: "API Development & Integration",
      description: "Robust APIs and seamless integration services to connect your systems and data.",
      icon: "🔌",
    },
  ];

  return (
    <>
      <Breadcrumb
        pageName="Software Engineering"
        description="Build robust, scalable, and innovative software solutions with our expert engineering team. From custom applications to system integrations, we deliver high-quality software that drives business growth."
      />
      <section className="relative z-10 py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-16 text-center">
            <Fade>
              <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                Software Engineering Services
              </h2>
              <p className="text-base !leading-relaxed text-body-color md:text-lg">
                Build robust, scalable, and innovative software solutions that drive your business forward.
              </p>
            </Fade>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {services.map((service) => (
              <Fade key={service.id} direction="up" delay={service.id * 100}>
                <div className="group relative rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark">
                  <div className="mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary/10 text-3xl">
                    {service.icon}
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    {service.description}
                  </p>
                </div>
              </Fade>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Fade>
              <Link
                href="/contact"
                className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
              >
                Start Your Software Project →
              </Link>
            </Fade>
          </div>
        </div>
      </section>
    </>
  );
};

export default SoftwareEngineeringPage; 