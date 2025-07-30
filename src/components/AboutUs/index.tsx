import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import { FaChartLine, FaCode, FaGraduationCap, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  const stats = [
    {
      id: 1,
      value: "100+",
      label: "Projects Completed",
      icon: <FaChartLine className="h-8 w-8 text-primary" />,
    },
    {
      id: 2,
      value: "50+",
      label: "Expert Team Members",
      icon: <FaUsers className="h-8 w-8 text-primary" />,
    },
    {
      id: 3,
      value: "30+",
      label: "Client Companies",
      icon: <FaCode className="h-8 w-8 text-primary" />,
    },
    {
      id: 4,
      value: "5+",
      label: "Years of Experience",
      icon: <FaGraduationCap className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mb-16 text-center">
          <Fade direction="up">
            <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
              About Hyperscript
            </h2>
            <p className="text-base !leading-relaxed text-body-color md:text-lg">
              Empowering businesses through technology and innovation
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center mb-16">
          <Fade direction="left">
            <div className="relative h-[400px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Our Team"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </Fade>

          <Fade direction="right">
            <div className="p-8">
              <p className="mb-6 text-base !leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                Hyperscript is a leading technology solutions provider specializing in data analytics, software engineering, and professional training. Founded in 2018, we've been helping businesses transform their operations through innovative technology solutions.
              </p>
              <p className="mb-6 text-base !leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                Our mission is to empower organizations with cutting-edge technology solutions that drive growth and innovation. We combine deep industry expertise with advanced technical capabilities to deliver measurable results for our clients.
              </p>
            </div>
          </Fade>
        </div>

        <div className="mb-16">
          <Fade direction="up">
            <div className="relative h-[400px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Our Work Environment"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </Fade>
        </div>

        <div className="mb-16 text-center">
          <Fade direction="up">
            <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
              Our Impact
            </h2>
            <p className="text-base !leading-relaxed text-body-color md:text-lg">
              Numbers that speak for themselves
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Fade key={stat.id} direction="up" delay={stat.id * 100}>
              <div className="rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark-2">
                <div className="mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="mb-2 text-3xl font-bold text-black dark:text-white text-center">
                  {stat.value}
                </h3>
                <p className="text-base text-body-color dark:text-body-color-dark text-center">
                  {stat.label}
                </p>
              </div>
            </Fade>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Fade direction="left">
            <div className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Our Vision
              </h3>
              <p className="text-base !leading-relaxed text-body-color dark:text-body-color-dark">
                To be the leading technology partner for businesses seeking to leverage data and innovation for sustainable growth. We envision a future where every organization can harness the power of technology to achieve their full potential.
              </p>
            </div>
          </Fade>

          <Fade direction="right">
            <div className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Our Values
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-base text-body-color dark:text-body-color-dark">
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
                  Innovation and Excellence
                </li>
                <li className="flex items-center text-base text-body-color dark:text-body-color-dark">
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
                  Client-Centric Approach
                </li>
                <li className="flex items-center text-base text-body-color dark:text-body-color-dark">
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
                  Integrity and Transparency
                </li>
                <li className="flex items-center text-base text-body-color dark:text-body-color-dark">
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
                  Continuous Learning
                </li>
              </ul>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 