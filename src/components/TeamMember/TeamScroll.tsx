"use client";

import React, { useRef, useEffect } from "react";
import "./TeamMember.css";
import TeamMember from "./TeamMember";
import SectionTitle from "../Common/SectionTitle";
import { Fade } from "react-awesome-reveal";

interface TeamMemberType {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface TeamScrollProps {
  members: TeamMemberType[];
  theme?: string;
}

const TeamScroll: React.FC<TeamScrollProps> = ({ members, theme }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isUserInteracting = useRef(false); // Tracks if the user is interacting
  const interactionTimeout = useRef<NodeJS.Timeout | null>(null); // Timeout for resuming auto-scroll

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Duplicate items for smooth infinite scrolling (without modifying innerHTML)
    const duplicateMembers = () => {
      if (carousel.children.length < members.length * 2) {
        members.forEach((member) => {
          const clone = document.createElement("div");
          clone.innerHTML = carousel.children[0]?.innerHTML || "";
          carousel.appendChild(clone);
        });
      }
    };

    duplicateMembers();

    const scrollInterval = setInterval(() => {
      if (!carouselRef.current || isUserInteracting.current) return;

      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

      if (carouselRef.current.scrollLeft >= maxScrollLeft) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: 1, behavior: "smooth" });
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, [members]);

  const handleUserInteraction = () => {
    isUserInteracting.current = true;

    // Clear any existing timeout
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);

    // Resume auto-scroll after a delay
    interactionTimeout.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 2000);
  };

  return (
    <div
      className="team-section relative mt-20 overflow-hidden"
      data-theme={theme}
      onMouseDown={handleUserInteraction}
      onMouseMove={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {/* Top Background */}
      <div className="absolute right-0 top-5 z-[-1]">
        <svg
          width="238"
          height="531"
          viewBox="0 0 238 531"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#paint0_linear_83:2)"
          />
          <rect
            opacity="0.3"
            x="426.568"
            y="144.886"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 426.568 144.886)"
            fill="url(#paint1_linear_83:2)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_83:2"
              x1="517.152"
              y1="-251.373"
              x2="517.152"
              y2="459.865"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_83:2"
              x1="455.327"
              y1="-35.673"
              x2="455.327"
              y2="675.565"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Section Title */}
      <Fade direction="up">
        <SectionTitle
          title="Meet Some Of Our Team Members"
          paragraph="The minds behind our success. Explore the driving forces propelling our vision forward."
          center
        />
      </Fade>

      {/* Carousel */}
      <div className="carousel-container m-5">
        <div className="carousel flex" ref={carouselRef}>
          {members.concat(members).map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              avatar={member.avatar}
            />
          ))}
        </div>
      </div>

      {/* Bottom Background */}
      <div className="absolute bottom-5 left-0 z-[-1]">
        <svg
          width="279"
          height="106"
          viewBox="0 0 279 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"
              stroke="url(#paint0_linear_72:302)"
            />
            <path
              d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
              stroke="url(#paint1_linear_72:302)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_72:302"
              x1="256.267"
              y1="53.6717"
              x2="-40.8688"
              y2="8.15715"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_72:302"
              x1="256.267"
              y1="42.6717"
              x2="-40.8688"
              y2="-2.84285"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default TeamScroll;
