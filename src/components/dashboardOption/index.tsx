import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Section } from "./types";

const DashboardOption: React.FC<{ section: Section }> = ({ section }) => {
  return (
    <div className="flex items-center justify-between cursor-pointer">
      <Link href={section.route}>
        <div className="flex items-center gap-3">
          <div className="w-6 invert">
            <Image src={section.iconSrc} alt={section.alt} />
          </div>
          <h2 className="font-roboto tracking-wide text-[#A644CB] font-bold text-lg hover:text-[#A644CB] transition-all duration-300 ease-in-out mb-[-5px]">
            {section.title}
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default DashboardOption;
