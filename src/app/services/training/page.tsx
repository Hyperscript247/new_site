import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Breadcrumb from "../../../components/Common/Breadcrumb";

const TrainingPage = () => {
  const services = [
    {
      id: 1,
      title: "Technical Training",
      description: "Comprehensive training programs covering the latest technologies, tools, and development practices.",
      icon: "💻",
    },
    {
      id: 2,
      title: "Corporate Workshops",
      description: "Customized workshops designed to enhance your team's skills and knowledge in specific areas.",
      icon: "👥",
    },
    {
      id: 3,
      title: "Certification Programs",
      description: "Structured programs to help your team achieve industry-recognized certifications.",
      icon: "🏆",
    },
    {
      id: 4,
      title: "Mentorship & Coaching",
      description: "One-on-one guidance and support to accelerate learning and professional growth.",
      icon: "🎓",
    },
  ];

  return (
    <>
      <Breadcrumb
        pageName="Training & Development"
        description="Empower your team with our comprehensive training programs and professional development solutions. From technical skills to leadership development, we help build capabilities that drive business success."
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
                Start Your Training →
              </Link>
            </Fade>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrainingPage; 