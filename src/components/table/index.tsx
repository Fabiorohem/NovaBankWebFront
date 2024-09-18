import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import download from "@/assets/icons/download.svg";
import trash from "@/assets/icons/trash.svg";
import refresh from "@/assets/icons/Refresh_2.svg";
import clear from "@/assets/icons/varrer.png";

interface TableProps {
  columns: string[];
  data: Array<Record<string, any>>;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    const filterData = () => {
      let newData = data;

      if (searchTerm) {
        newData = newData.filter(
          (row) =>
            row.Id.includes(searchTerm) ||
            row.CNPJorCPF.includes(searchTerm)
        );
      }

      if (statusFilter) {
        newData = newData.filter((row) => row.Status === statusFilter);
      }

      if (typeFilter) {
        newData = newData.filter((row) => row.Tipo.includes(typeFilter));
      }

      if (dateRange.start && dateRange.end) {
        newData = newData.filter(
          (row) =>
            new Date(row.DATA) >= new Date(dateRange.start) &&
            new Date(row.DATA) <= new Date(dateRange.end)
        );
      }

      setFilteredData(newData);
      setCurrentPage(1);
    };

    filterData();
  }, [searchTerm, statusFilter, typeFilter, dateRange, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transações");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "transacoes.xlsx");
  };

  const handleRemoveRow = (index: number) => {
    const updatedData = filteredData.filter((_, i) => i !== index);
    setFilteredData(updatedData);
    if ((currentPage - 1) * itemsPerPage >= updatedData.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRefreshTable = () => {
    setFilteredData(data);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setTypeFilter("");
    setDateRange({ start: "", end: "" });
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-[10px] py-[10px] ${i === currentPage
            ? "bg-[#A644CB] text-white text-[10px]"
            : "bg-gray-600 text-white text-[10px]"
            } rounded-md mx-1`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const getStatusClass = (Status: string) => {
    switch (Status) {
      case "Concluído":
        return "text-green-500";
      case "Pendente":
        return "text-yellow-500";
      case "Cancelado":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-[#181B21] text-white rounded-lg w-full p-6">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="border-l-4 pl-2 text-[30px] border-solid border-[#A644CB] ml-2">
          Extratos
        </div>
        <div>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center text-[#ddd] text-[12px] font-roboto font-bold bg-[#A644CB] p-2 w-44 h-8 rounded-md"
          >
            <Image src={download} alt="download" className="mr-2 w-5 h-5" />
            Exportar tabela
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 justify-between w-full mb-4">
  <input
    type="text"
    className="text-[#ddd] w-full h-8 text-[12px] bg-[#3A3A3A] rounded-md px-3 focus:border-transparent"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Buscar por ID ou CNPJ"
  />
  <select
    className="text-[#ddd] w-full h-8 text-[12px] bg-[#3A3A3A] rounded-md px-3 focus:border-transparent"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">Todos</option>
    <option value="Concluído">Concluído</option>
    <option value="Pendente">Pendente</option>
    <option value="Cancelado">Cancelado</option>
  </select>
  <select
    className="text-[#ddd] w-full h-8 text-[12px] bg-[#3A3A3A] rounded-md px-3 py-2 focus:border-transparent"
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
  >
    <option value="">Todos</option>
    <option value="Débito">Débito</option>
    <option value="Crédito">Crédito</option>
    <option value="Boleto">Boleto</option>
    <option value="Pix">Pix</option>
  </select>
  <div className="flex flex-col lg:flex-row w-full gap-2">
    <input
      type="date"
      className="text-[#ddd] w-full text-[12px] bg-[#3A3A3A] rounded-md px-3 py-2 focus:border-transparent"
      value={dateRange.start}
      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
    />
    <span className="text-[#ddd] font-roboto text-xs items-center flex">
      até
    </span>
    <input
      type="date"
      className="text-[#ddd] w-full h-8 text-[12px] bg-[#3A3A3A] rounded-md px-3 focus:border-transparent"
      value={dateRange.end}
      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
    />
  </div>
  <div className="flex flex-col lg:flex-row gap-3 w-full">
    <button
      onClick={handleRefreshTable}
      className="flex items-center justify-center text-[#ddd] text-[13px] font-roboto font-bold bg-[#A644CB] p-2 w-full h-8 rounded-md"
    >
      <Image src={refresh} alt="atualizar" className="mr-2 w-5 h-5" />
      Atualizar
    </button>
    <button
      onClick={handleResetFilters}
      className="flex items-center justify-center text-[#ddd] text-[13px] font-roboto font-bold bg-[#A644CB] p-2 w-full h-8 rounded-md"
    >
      <Image src={clear} alt="limpar filtros" className="mr-2 w-5 h-5" />
      Limpar filtros
    </button>
  </div>
</div>



      <div
        className={`overflow-x-auto px-10 py-4 ${filteredData.length > 10 ? "overflow-y-auto h-[25rem]" : "h-[25rem]"
          }`}
      >
        <table className="min-w-full table-auto border-collapse">
          <thead className="sticky top-0 bg-[#181B21]  border-solid border-[#c5f631] z-20">
            <tr className="h-10 items-center flex-wrap justify-center">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-[13px] font-roboto font-semibold py-3 md:text-md text-start text-[#ddd] bg-[#181B21] border-b-2 border-[#a744cb93] px-6"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="border border-gray-200">
                {columns.map((column) => (
                  <td
                    key={column}
                    className="text-xs py-1 whitespace-nowrap pt-3 items-start md:text-md pb-5 border-b border-solid border-[#8c8c8d44] text-[#8C8C8D] text-start sm:px-4"
                  >
                    {column === "Status" ? (
                      <>
                        <span className={getStatusClass(row[column])}>
                          {row[column]}
                        </span>
                        <div className="mt-2 text-[10px] md:text-md text-left text-[#8C8C8D]">
                          <p>Nome: {row.nome}</p>
                          {row.Tipo === "Pix" ? (
                            <p className="truncate">Pix: {row.Pix}</p>
                          ) : row.Tipo === "Crédito" || row.Tipo === "Boleto" ? (
                            <>
                              <p className="truncate">Banco: {row.Banco}</p>
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : column === "CNPJorCPF" ? (
                      <p className="truncate">
                        {row[column].length === 11 ? `CPF: ${row[column]}` : `CNPJ: ${row[column]}`}
                      </p>
                    ) : column === "Parcelas" ? (
                      <p className="truncate">
                        {row[column] > 1 ? `${row[column]} parcelas` : "À vista"}
                      </p>
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}

                <td className="text-xs py-1 whitespace-nowrap pt-3 items-start md:text-md pb-5 border-b border-solid border-[#8c8c8d44] text-[#8C8C8D] text-start sm:px-4">
                  <button
                    onClick={() => handleRemoveRow(index)}
                    className="bg-red-600 text-white rounded-md w-8 h-8 flex justify-center items-center"
                  >
                    <Image src={trash} alt="Remover" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center my-4">{renderPagination()}</div>
    </div>
  );
};

export default Table;