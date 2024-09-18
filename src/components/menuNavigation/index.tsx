"use client";

import React, { useState } from "react";
import AgilizaLogo from "@/components/agilizaLogo";
import ListItems from "@/components/list";
import DashboardOption from "@/components/dashboardOption";
import UserDetails from "@/components/userInfo";
import Navbar from "../navbar";
import Button from "../button";
import power from "@/assets/images/power.svg";
import Image from "next/image";
import {
  dashboardOption,
  userData,
  clientMainSection,
  chargerMainSection,
  billMainSection,
  transferenceMainSection,
} from "@/utils/mainObjects";
import Link from "next/link"; 

const MenuNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); 
  };

  return (
    <div>
      <div className="lg:hidden fixed flex items-center justify-between p-3 w-full bg-[#fff] top-0 left-0 z-50">
        <div className="py-2 flex items-center">
          <AgilizaLogo />
        </div>
        <button onClick={toggleMenu} >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>
      <section
        className={`fixed left-0 top-0 h-full w-full bg-[#ffff] p-3 z-auto transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:w-[19.9rem] lg:flex lg:flex-col overflow-auto`}
      >
        
        <div className="mb-5 mt-4">
          <AgilizaLogo />
        </div>
        <UserDetails data={userData} />
        <article className="flex flex-col gap-y-8 mt-10 p-10 w-full overflow-y-auto">

          <DashboardOption section={dashboardOption} />
          <ListItems section={clientMainSection} />
          <ListItems section={chargerMainSection} />
          <ListItems section={billMainSection} />
          <ListItems section={transferenceMainSection} />
          <Button
            type="submit"
            text="Logout"
            color=""
            hoverColor="#8E38A6"
            disabled={false}
            imageSrc={power}
          />
        </article>
      </section>
    </div>
  );
};

export default MenuNavigation;
