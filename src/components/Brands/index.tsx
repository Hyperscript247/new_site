"use client"; // Make this a Client Component

import AliceCarousel from "react-alice-carousel";
import { Fade } from "react-awesome-reveal";
import SectionTitle from "../Common/SectionTitle"; 
import brandsData from "./brandsData";
import Image from "next/image";

// Define the drag handler
const handledrag = (e: React.DragEvent) => {
  e.preventDefault();
  console.log("Dragging brand:", e.target);
};

const Brands = () => {
  const items = brandsData.map((brand) => (
    <div
      key={brand.id}
      draggable
      onDragStart={handledrag}
      className="flex items-center justify-center p-4"
    >
      <Image
        src={brand.image || "/default-image.jpg"} // Ensure there's always an image
        alt={brand.name}
        width={200} // Adjust as needed
        height={200} // Adjust as needed
        style={{ objectFit: "contain" }}
      />
    </div>
  ));

  return (
    <section className="pt-20">
      <div className="container mx-auto my-20">
        <Fade direction="up">
          <SectionTitle
            title="Brands We've Serviced"
            paragraph="The minds behind our success. Explore the driving forces propelling our vision forward."
            center
          />
        </Fade>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center rounded-sm px-1 py-1 sm:px-2 md:px-[20px] md:py-[20px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              <AliceCarousel
                mouseTracking
                items={items}
                autoPlay={true}
                infinite={true}
                disableDotsControls={true}
                autoPlayInterval={2000}
                autoPlayDirection="rtl"
                responsive={{
                  0: { items: 1 },
                  768: { items: 3 },
                  1024: { items: 4 },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Direct export without `next/dynamic` since it's now a client component
export default Brands;
