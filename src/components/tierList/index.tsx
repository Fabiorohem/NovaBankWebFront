import React from "react";
import { VolumeSalesProps } from "./types";
import Image from "next/image";

interface TierListProps extends VolumeSalesProps {
  showIndexAndImage?: boolean;
}

const TierList: React.FC<TierListProps> = ({
  title,
  highlight,
  companies,
  showIndexAndImage = false,
}) => {
  return (
    <div className="flex flex-col t gap-6 text-white bg-[#181B21] rounded-lg p-3">
      <h2 className="text-[#8C8C8D] text-sm">
        {title} <span className="text-[#D069F8]">{highlight}</span>
      </h2>
      <ul>
        {companies.map((company, index) => (
          <li key={index}>
            <div className="flex items-center p-2 border-b border-solid border-[#8c8c8d44]">
              {showIndexAndImage && (
                <>
                  <p className="mr-2 flex mb-5 ">{index + 1} °</p>

                </>

              )}
              <div>
                <h3 className="text-[#a147c4] font-semibold text-[12px]">{company.name}</h3>
                <p className="text-[#ddd] mt-1 text-sm">{company.volume}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TierList;
