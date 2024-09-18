"use client";

import React, { useState } from "react";
import pix from "@/assets/icons/pix.svg";
import copia from "@/assets/icons/copiar.png";
import Image from "next/image";
import Button from "@/components/button";
import Table from "@/components/table";
import { columns, data } from "@/utils/tableData";
import Popup from "@/components/popup";
import PixEndTed from "../pix/page";
import CopyEndGlu from "../charges/components/createPayment/copyendglu/page";

const Transaction: React.FC = () => {
    const [isCreatePaymentOpenPopup, setIsCreatePaymentOpenPopup] = useState<boolean>(false);
    const [copyOpenPopup, setCopyOpenPopup] = useState<boolean>(false);

    return (
        <div className="flex flex-col w-full h-full p-6">
            <div className="mt-16 flex items-center">
                <span className="lg:h-10 h-8 text-transparent flex items-center bg-[#A644CB]">|</span>
                <p className="text-white lg:text-[1.5rem] text-[1.2rem] flex justify-center mt-2 ml-2">Transferências</p>
            </div>

            <div className="mt-8 flex flex-col lg:flex-row gap-4 w-full mb-12">
                <div className="flex flex-col items-center bg-[#1F1F1F] p-4 rounded-lg w-full lg:w-1/2 border border-white">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-between items-center">
                            <Image src={pix} alt="pix" className="lg:w-36 w-20" />
                            <div className="pl-6">
                                <p className="text-[#dddd] font-roboto font-semibold mb-1 lg:text-[20px] text-[14px]">Transferir valores</p>
                                <p className="text-[#dddd] font-roboto text-[10px]">Transferência por Pix ou TED.</p>
                            </div>
                        </div>
                        <div className="text-[10px]">
                            <Button
                                type="submit"
                                text="Transferir"
                                color="bg-[#A644CB]"
                                hoverColor="bg-[#8E38A6]"
                                disabled={false}
                                onClick={() => setIsCreatePaymentOpenPopup(true)}
                            />
                        </div>
                        {isCreatePaymentOpenPopup && (
                            <Popup
                                isOpen={isCreatePaymentOpenPopup}
                                onClose={() => setIsCreatePaymentOpenPopup(false)}
                            >
                                <PixEndTed />
                            </Popup>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center bg-[#1F1F1F] p-4 rounded-lg w-full lg:w-1/2 border border-white">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-between items-center">
                            <Image src={copia} alt="Copiar e cola" className="lg:w-16 w-10" />
                            <div className="pl-6">
                                <p className="text-[#dddd] lg:text-[20px] text-[14px] font-roboto font-semibold mb-1">PIX copia e cola</p>
                                <p className="text-[#dddd] text-[10px] font-roboto">Colo ou digite um código para realizar pagamentos.</p>
                            </div>
                        </div>
                        <div className="text-[10px]">
                            <Button
                                type="submit"
                                text="Pagar"
                                color="bg-[#A644CB]"
                                hoverColor="bg-[#8E38A6]"
                                disabled={false}
                                onClick={() => setCopyOpenPopup(true)}
                            />
                        </div>
                        <div className="w-[%]">
                        {copyOpenPopup && (
                                <Popup
                                    isOpen={copyOpenPopup}
                                    onClose={() => setCopyOpenPopup(false)}
                                >
                                    <CopyEndGlu />
                                </Popup>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            <Table columns={columns} data={data} />
        </div>
    );
};

export default Transaction;
