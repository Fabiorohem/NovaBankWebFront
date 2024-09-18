"use client";

import React, { useState } from "react";
import CreateCharges from "./components/createPayment";
import Popup from "@/components/popup";
import Table from "@/components/table";
import { columns, data } from "@/utils/tableData";

const ChargesPage: React.FC = () => {
  const [isCreatePaymentOpenPopup, setIsCreatePaymentOpenPopup] = useState<boolean>(false);

  const columns = ["Nome", "Valor", "Descrição", "Forma de pagamento", "Data de vencimento", "Ações"];

  return (
    <div className="items-center w-full h-auto">

      <div className="flex justify-end m-5">
        <button
          className="bg-[#A644CB] text-[#ddd] font-roboto text-[12px] font-bold py-2 px-4 rounded hover:bg-purple-500"
          onClick={() => setIsCreatePaymentOpenPopup(true)}
        >
          Criar Novo Pagamento
        </button>
      </div>
      <div>
        <Table columns={columns} data={data} />
      </div>
      {isCreatePaymentOpenPopup && (
        <Popup
          isOpen={isCreatePaymentOpenPopup}
          onClose={() => setIsCreatePaymentOpenPopup(false)} 
        >
          <CreateCharges />
        </Popup>
      )}
    </div>
  );
};

export default ChargesPage;
