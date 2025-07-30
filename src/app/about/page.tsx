import Breadcrumb from "../../components/Common/Breadcrumb";
import AboutSectionOne from "../../components/About/AboutSectionOne";
import AboutSectionTwo from "../../components/About/AboutSectionTwo";
import AboutUs from "../../components/AboutUs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Hyperscript | Data Analytics & Technology Solutions",
  description: "Learn about Hyperscript's mission, values, and expertise in data analytics, software engineering, and technology training. Discover how we help businesses transform through innovation.",
  keywords: [
    "data analytics",
    "software engineering",
    "technology training",
    "business transformation",
    "data management",
    "technology solutions",
    "digital innovation",
    "business intelligence"
  ],
  authors: [{ name: "Hyperscript Team" }],
  openGraph: {
    title: "About Hyperscript | Data Analytics & Technology Solutions",
    description: "Learn about Hyperscript's mission, values, and expertise in data analytics, software engineering, and technology training.",
    type: "website",
    locale: "en_US",
    siteName: "Hyperscript",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hyperscript | Data Analytics & Technology Solutions",
    description: "Learn about Hyperscript's mission, values, and expertise in data analytics, software engineering, and technology training.",
  },
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Us"
        description="Discover how Hyperscript is transforming businesses through innovative technology solutions, expert training, and data-driven insights."
      />
      <AboutUs />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
