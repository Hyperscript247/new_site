import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <Fade direction="left">
            <div className="p-8">
              <h2 className="mb-6 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                Ready to Transform Your Career?
              </h2>
              <p className="mb-8 text-base !leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                Join our team of experts and work on cutting-edge projects. Whether you're looking for an internship or full-time role, we have opportunities for you to grow and make an impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/careers"
                  className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                >
                  View Opportunities
                </Link>
                <Link
                  href="/contact"
                  className="rounded-sm bg-black/20 px-8 py-4 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Fade>

          <Fade direction="right">
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/career-opp.jpg"
                alt="Career opportunities"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 