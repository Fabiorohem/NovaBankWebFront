import React from "react";
import { UserInfoProps } from "./types";

const UserDetails: React.FC<UserInfoProps> = ({ data }) => {
  return (
    <article className="border-[#A644CB] border-solid border-t-2 border-b-2 flex flex-col gap-3 py-5 px-3 mt-5">
      <h2 className="font-robotoMono font-semibold text-[#A644CB]">
        Olá, {data.username} {data.sobrename}!
      </h2>
      <ul className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <li className="font-robotoMono text-[#757575] text-[12px] break-keep">
             <span className="text-[13px] font-roboto font-semibold">Banco :</span> {data.bank}
          </li>
          <li className="font-robotoMono text-[#757575] text-[12px] break-keep">
          <span className="text-[13px] font-roboto font-semibold">Agência :</span> {data.agency}
          </li>
        </div>
        <div className="flex flex-col gap-y-2">
          <li className="font-robotoMono text-[#757575] text-[12px] break-keep">
            <span className="text-[13px] font-roboto font-semibold">Conta :</span> {data.account}
          </li>
          <li className="font-robotoMono text-[#757575] text-[12px] break-keep">
            <span className="text-[13px] font-roboto font-semibold">PIX :</span> {data.pix}
          </li>
        </div>
      </ul>
    </article>
  );
};

export default UserDetails;
