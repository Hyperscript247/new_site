import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Breadcrumb from "../../../components/Common/Breadcrumb";

const TalentOutsourcingPage = () => {
  const services = [
    {
      id: 1,
      title: "IT Staff Augmentation",
      description: "Access skilled IT professionals to complement your existing team and accelerate project delivery.",
      icon: "👨‍💻",
    },
    {
      id: 2,
      title: "Project-Based Teams",
      description: "Complete project teams ready to execute your specific requirements with expertise and efficiency.",
      icon: "👥",
    },
    {
      id: 3,
      title: "Managed Services",
      description: "End-to-end management of your IT operations and support services by our expert teams.",
      icon: "⚙️",
    },
    {
      id: 4,
      title: "Specialized Talent",
      description: "Highly skilled professionals in niche technologies and specialized domains.",
      icon: "🎯",
    },
  ];

  return (
    <>
      <Breadcrumb
        pageName="Talent Outsourcing"
        description="Access top-tier IT talent and build high-performing teams with our flexible outsourcing solutions. From staff augmentation to complete project teams, we provide the expertise you need to succeed."
      />
      <section className="relative z-10 py-16 md:py-20 lg:py-28">
        <div className="container">
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
                Find Your Talent →
              </Link>
            </Fade>
          </div>
        </div>
      </section>
    </>
  );
};

export default TalentOutsourcingPage; 