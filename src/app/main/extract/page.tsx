"use client";
import React, { useState, useEffect } from "react";
import Table from "@/components/table";
import { columns, data } from "@/utils/tableData";



const TransactionPage: React.FC = () => {

  const columns = ["Data","Forma de pagamento","CNPJ/CPF","Valor","Status"];
  return (
    <div className="flex items-center w-full overflow-y-auto overflow-x-auto ">
      <div className="flex flex-col gap-5  justify-center items-center w-full ">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default TransactionPage;
