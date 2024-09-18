"use client";
import { useState } from "react";
import Button from "@/components/button";
import { tree } from "next/dist/build/templates/app-page";

const CopyEndGlu: React.FC = () => {

  return (
    <div className="flex flex-col w-full h-full p-6">
      <div className="mt-16 flex items-center">
        <span className="lg:h-10 h-8 text-transparent flex items-center bg-[#A644CB]">
          |
        </span>
        <p className="text-white lg:text-[1.5rem] text-[1.2rem] flex justify-center mt-2 ml-2">
          Pagamento via Pix Copia e Cola
        </p>
      </div>
      <span className=" text-gray-500 text-[12px] ml-3 mt-2">
        Insira o código gerado para realizar o pagamento.
      </span>
      <div>
        <input
          type="text"
          name="cpf"
          placeholder="Insira o código copia e cola gerado"
          className="w-[40rem] text-[12px] py-2 pl-2 ml-3 mt-4 rounded-md bg-slate-600 text-[#dddd] "
        />
      </div>
      <div className="flex gap-6 ml-3 mt-4">
        <div>
          <Button
            type="submit"
            text="Cancela"
            color="bg-[#A644CB]"
            hoverColor="bg-[#8E38A6]"
            disabled={false}
          />
        </div>
        <div>
          <Button
            type="submit"
            text="Avançar"
            color="bg-[#A644CB]"
            hoverColor="bg-[#8E38A6]"
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CopyEndGlu;
