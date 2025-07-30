import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const SuccessStories = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Data Scientist",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      content: "The data analytics solutions provided by Hyperscript transformed our decision-making process. Their expertise in machine learning and predictive modeling helped us achieve remarkable results.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "CTO",
      company: "InnovateTech",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      content: "Working with Hyperscript's software engineering team was a game-changer for our business. Their attention to detail and innovative solutions helped us launch our product ahead of schedule.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-white dark:bg-gray-dark">
      <div className="container">
        <div className="text-center mb-16">
          <Fade direction="up">
            <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
              Success Stories
            </h2>
            <p className="text-base !leading-relaxed text-body-color md:text-lg">
              See how we helped businesses achieve their goals
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Fade key={testimonial.id} direction="up" delay={testimonial.id * 100}>
              <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-dark-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-body-color dark:text-body-color-dark">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-base text-body-color dark:text-body-color-dark">
                  "{testimonial.content}"
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories; 