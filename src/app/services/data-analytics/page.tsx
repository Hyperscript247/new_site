import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Breadcrumb from "../../../components/Common/Breadcrumb";

const DataAnalyticsPage = () => {
  const services = [
    {
      id: 1,
      title: "Advanced Analytics",
      description: "Leverage cutting-edge analytics tools to extract meaningful insights from your data and drive informed decision-making.",
      icon: "📈",
    },
    {
      id: 2,
      title: "Business Intelligence Tools",
      description: "Custom dashboards and reporting platforms that provide real-time visibility into your business performance.",
      icon: "📊",
    },
    {
      id: 3,
      title: "Data Cleaning & Transformation",
      description: "Ensure data accuracy and reliability with our comprehensive data cleaning and transformation services.",
      icon: "🧹",
    },
    {
      id: 4,
      title: "Predictive Analytics",
      description: "Forecast future trends and make proactive business decisions with our predictive analytics solutions.",
      icon: "🔮",
    },
  ];

  return (
    <>
      <Breadcrumb
        pageName="Data Management & Analytics"
        description="Transform your data into actionable insights with our comprehensive analytics solutions. From data cleaning to predictive analytics, we help you make data-driven decisions."
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
                Request a Data Consultation →
              </Link>
            </Fade>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataAnalyticsPage; 