"use client";

import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "What services does Hyperscript offer?",
      answer: "Hyperscript offers a comprehensive suite of services including data analytics and business intelligence, software engineering, professional training and development, and talent outsourcing solutions. We specialize in helping businesses leverage technology and data to drive growth and innovation."
    },
    {
      id: 2,
      question: "How can Hyperscript help my business?",
      answer: "We help businesses by providing data-driven insights, developing custom software solutions, training teams in new technologies, and providing access to skilled tech talent. Our solutions are tailored to meet your specific business needs and objectives."
    },
    {
      id: 3,
      question: "What industries do you work with?",
      answer: "We work across various industries including finance, healthcare, retail, technology, and manufacturing. Our solutions are adaptable to any industry that seeks to leverage data and technology for business growth."
    },
    {
      id: 4,
      question: "How do I get started with Hyperscript?",
      answer: "Getting started is easy! Simply contact us through our website or give us a call. Our team will schedule a consultation to understand your needs and propose the best solutions for your business."
    },
    {
      id: 5,
      question: "Do you offer remote services?",
      answer: "Yes, we offer both remote and on-site services depending on your needs. Our team can work flexibly to accommodate your preferences and requirements."
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-50 dark:bg-dark">
      <div className="container">
        <div className="text-center mb-16">
          <Fade direction="up">
            <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
              Frequently Asked Questions
            </h2>
            <p className="text-base !leading-relaxed text-body-color md:text-lg">
              Find answers to common questions about our services
            </p>
          </Fade>
        </div>

        <div className="max-w-[768px] mx-auto">
          {faqs.map((faq, index) => (
            <Fade key={faq.id} direction="up" delay={index * 100}>
              <div className="mb-4">
                <button
                  className="flex w-full items-center justify-between rounded-lg bg-white p-4 text-left text-black dark:bg-dark-2 dark:text-white"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-base font-semibold">{faq.question}</span>
                  <FaChevronDown
                    className={`transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="mt-2 p-4 bg-white dark:bg-dark-2 rounded-lg">
                    <p className="text-base text-body-color dark:text-body-color-dark">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 