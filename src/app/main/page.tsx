"use client"
import React, { useState } from "react";
import CustomChart from "@/components/chart";
import Table from "@/components/table";
import TierList from "@/components/tierList";
import TransactionPage from "./extract/page";

import {
  lineChartData,
  barChartData,
  doughnutChartData,
  pieChartData,
  chartOptions,
} from "@/utils/chartObjects";
import { columns, data } from "@/utils/tableData";
import { companies, companiesWithImages } from "@/utils/tierListObjects";
import Popup from "@/components/popup";

const MainPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  return (
    <main className="flex w-full ">
      <div className="flex flex-col items-center w-full  justify-center">
        <div className="flex items-center justify-center w-full mb-20">
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols- xl:grid-cols-4 w-full p-5">
          <div className="bg-[#181B21] rounded-lg p-3 col-span-1">
            <p className="text-[#ddd] font-roboto text-[12px] mt-5">
              <span className="h-6 mr-2 w-[0.5] rounded-sm text-transparent bg-[#D069F8]">|</span>PROGRESSÃO DE MARKUPS
            </p>
            <CustomChart
              type="bar"
              data={barChartData}
              options={chartOptions}
            />
          </div>
          <div className="bg-[#181B21] rounded-lg p-3 col-span-1">
            <p className="text-[#ddd] font-roboto text-[12px] mt-5">
              <span className="h-6 mr-2 w-[0.5] rounded-sm text-transparent bg-[#D069F8]">|</span>PROGRESSÃO GERAL DE VENDAS
            </p>
            <CustomChart
              type="bar"
              data={barChartData}
              options={chartOptions}
            />
          </div>
          <div className="bg-[#181B21] rounded-lg p-3 col-span-1">
            <p className="text-[#ddd] font-roboto text-[12px] mt-5">
              <span className="h-6 mr-2 w-[0.5] rounded-sm text-transparent bg-[#D069F8]">|</span>HISTÓRICO POR TIPO DE PAGAMENTO
            </p>
            <CustomChart
              type="pie"
              data={barChartData}
              options={chartOptions}
            />
          </div>
          <div className="bg-[#181B21] rounded-lg p-3 col-span-1">
            <p className="text-[#ddd] font-roboto text-[12px] mt-5">
              <span className="h-6 mr-2 w-[0.5] rounded-sm text-transparent bg-[#D069F8]">|</span>VENDAS FALHADAS
            </p>
            <CustomChart
              type="pie"
              data={doughnutChartData}
              options={chartOptions}
            />
          </div>
        </div>
        {/* <button
        onClick={togglePopup}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Popup
      </button>
      <Popup isOpen={isPopupOpen} onClose={togglePopup}>
        <div>
          <h2 className="text-xl font-bold">This is a Popup!</h2>
          <p>Content goes here.</p>
        </div> */}
        {/* </Popup> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full p-5">
          <div className="bg-[#181B21] rounded-lg p-3 col-span-2 lg:col-span-2">
            <TransactionPage />
          </div>
          <div className="bg-[#181B21] rounded-lg p-3 col-span-2 lg:col-span-1">
            <TierList
              title="EMPRESAS COM MAIOR"
              highlight="VOLUME DE VENDAS"
              companies={companies}
            />
          </div>
          <div className="bg-[#181B21] rounded-lg p-3 col-span-2 lg:col-span-1">
            <TierList
              title="EMPRESAS COM MAIOR"
              highlight="VOLUMES DE VENDA"
              companies={companiesWithImages}
              showIndexAndImage={true}
            />
          </div>
        </div>

      </div>
    </main>
  );
};

export default MainPage;
