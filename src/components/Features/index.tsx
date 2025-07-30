import { Fade } from "react-awesome-reveal";
import { FaRocket, FaChartBar, FaUsers, FaLightbulb } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaRocket className="h-12 w-12 text-primary" />,
      title: "Accelerated Growth",
      description: "Leverage our expertise to drive rapid business growth through data-driven strategies and innovative solutions.",
    },
    {
      id: 2,
      icon: <FaChartBar className="h-12 w-12 text-primary" />,
      title: "Data-Driven Decisions",
      description: "Make informed decisions backed by comprehensive analytics and actionable insights.",
    },
    {
      id: 3,
      icon: <FaUsers className="h-12 w-12 text-primary" />,
      title: "Expert Team",
      description: "Access a pool of highly skilled professionals with diverse expertise in technology and business transformation.",
    },
    {
      id: 4,
      icon: <FaLightbulb className="h-12 w-12 text-primary" />,
      title: "Innovation Focus",
      description: "Stay ahead of the competition with cutting-edge solutions and forward-thinking approaches.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mb-16 text-center">
          <Fade direction="up">
            <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
              Why Partner With Us
            </h2>
            <p className="text-base !leading-relaxed text-body-color md:text-lg">
              Experience the difference with our proven approach to business transformation
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Fade key={feature.id} direction="up" delay={feature.id * 100}>
              <div className="rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark-2">
                <div className="mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-base text-body-color dark:text-body-color-dark">
                  {feature.description}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
