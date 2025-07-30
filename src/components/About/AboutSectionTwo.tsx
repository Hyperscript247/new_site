import Image from "next/image";
import { Fade, Zoom, Slide } from "react-awesome-reveal";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <Slide direction="left" cascade damping={0.2}>
              <div
                className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
                data-wow-delay=".15s"
              >
                <Image
                  src="/images/About3.png"
                  alt="about image"
                  fill
                  className="rounded-lg object-cover drop-shadow-three dark:hidden dark:drop-shadow-none"
                />
                <Image
                  src="/images/About3.png"
                  alt="about image"
                  fill
                  className="hidden rounded-lg object-cover drop-shadow-three dark:block dark:drop-shadow-none"
                />
              </div>
            </Slide>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <Fade direction="up" cascade damping={0.5}>
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Skilled Team with Data and Software Solutions
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    Our team of experienced tech professionals specializes in
                    developing innovative software solutions and high-performing
                    websites. We provide tailored digital solutions to help
                    businesses streamline operations, enhance user experiences,
                    and achieve their strategic goals.
                  </p>
                </div>
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Structured Data System Enhance Insight
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    A well-organized data system allows businesses to extract
                    valuable insights with precision. By structuring data
                    effectively, companies can identify patterns, track
                    performance, and optimize strategies. This leads to improved
                    decision-making, better customer targeting, and enhanced
                    operational efficiency.
                  </p>
                </div>
                <div className="mb-1">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Empowering Growth & Building Capacity Analysis
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    We believe in equipping individuals and businesses with the
                    right tools, knowledge, and technology to foster growth.
                    Through training, mentorship, and strategic solutions, we
                    help organizations develop in-house expertise, enhance
                    productivity, and build sustainable success in a rapidly
                    evolving digital landscape.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
