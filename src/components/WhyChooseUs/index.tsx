import { Fade } from "react-awesome-reveal";
import { FaChartLine, FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaChartLine className="h-12 w-12 text-primary" />,
      title: "Data-Driven Excellence",
      description: "Our solutions are built on a foundation of data-driven insights, ensuring measurable results and continuous improvement.",
    },
    {
      id: 2,
      icon: <FaUsers className="h-12 w-12 text-primary" />,
      title: "Expert Team",
      description: "Access to a pool of highly skilled professionals with diverse expertise in data analytics, software engineering, and business transformation.",
    },
    {
      id: 3,
      icon: <FaLightbulb className="h-12 w-12 text-primary" />,
      title: "Innovative Solutions",
      description: "We stay ahead of the curve with cutting-edge technologies and innovative approaches to solve complex business challenges.",
    },
    {
      id: 4,
      icon: <FaHandshake className="h-12 w-12 text-primary" />,
      title: "Partnership Approach",
      description: "We work closely with our clients as strategic partners, understanding their unique needs and delivering tailored solutions.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-50 dark:bg-dark">
      <div className="container">
        <div className="mb-16 text-center">
          <Fade direction="up">
            <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
              Why Choose Us
            </h2>
            <p className="text-base !leading-relaxed text-body-color md:text-lg">
              Discover what sets us apart in delivering exceptional results
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Fade key={feature.id} direction="up" delay={feature.id * 100}>
              <div className="rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark">
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

export default WhyChooseUs; 