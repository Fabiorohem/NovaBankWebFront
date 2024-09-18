import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import notify from "@/assets/icons/notification.svg";
import foto from "@/assets/icons/user.svg";
import olhoAberto from "@/assets/icons/eye.svg";
import olhoFechado from "@/assets/icons/eye-closed.svg";
import { data } from "@/utils/tableData"; 

const Navbar: React.FC = () => {
    const [mostrarValor, setMostrarValor] = useState(true);

    const toggleMostrarValor = () => {
        setMostrarValor(!mostrarValor);
    };

    return (
        <div className="w-full h-[7rem] lg:h-[7rem] bg-[#1A202C] flex items-center justify-between px-4 mt-[5rem] lg:mt-0">
            <div className="flex flex-col items-start">
                <div className="flex items-center justify-start">
                    <p className="mr-2 text-[#DDD] font-roboto font-semibold lg:text-[12px] text-[15px] mt-2">
                        <p className="lg:text-[10px] text-[9px] flex items-center mb-1 lg:mb-2">Saldo em conta</p>
                        R$ {" "}
                        {mostrarValor ? " 3500,00" : "*****"}
                    </p>
                    <span onClick={toggleMostrarValor} className=" ">
                        <Image src={mostrarValor ? olhoAberto : olhoFechado} className="lg:w-5 lg:h-5 w-4 h-4 mt-5 " alt="Mostrar/Ocultar" />
                    </span>
                </div>

                <div className="flex items-center bg-[#9D54BD] lg:w-[15rem] lg:h-[3rem] w-[12rem] flex-col justify-center rounded-md mt-2">
                    <p className="text-white text-[10px] pt-2">Estabelecimento:</p>
                    <select className="bg-transparent border-0 outline-none text-center p-2 w-full lg:text-[11px] text-[11px] font-roboto font-semibold text-[#ffff] ">
                        {data.map((item, index) => (
                            <option key={index} className="bg-[#9D54BD]" value={item.Nome}>
                                {item.Nome}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <article>

            </article>
            <div className="flex items-center space-x-4">
                <Image src={notify} alt="Notificação" className="w-6 h-6 lg:w-9 lg:h-9" />

                <Link href="/main/profile" >
                    <Image src={foto} alt="Usuário" className="w-6 h-6 lg:w-9 lg:h-9 cursor-pointer" />
                </Link>
                
            </div>
        </div>
    );
};

export default Navbar;
