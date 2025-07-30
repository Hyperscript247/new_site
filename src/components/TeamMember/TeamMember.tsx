"use client";

import React from "react";
import "./TeamMember.css";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, avatar }) => {
  return (
    <div className="team-card mb-20 mr-5 mt-10">
      <div className="team-avatar-container m-2">
        <Image src={avatar} alt={name} width={300} height={300} className="team-avatar" />
      </div>
      <h3 className="team-name">{name}</h3>
      <p className="team-role">{role}</p>
      <p className="team-bio">{bio}</p>
    </div>
  );
};

export default TeamMember;