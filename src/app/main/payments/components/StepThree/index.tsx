import React, { useState } from "react";
import FileUpload from "@/components/fileUpload";
import Table from "@/components/table";
import CustomSelect from "@/components/select";
import Image from "next/image";
import TrashIcon from "@/assets/icons/trashIcon.png";
import { CustomFile, StepThreeProps } from "./types";
import {
  fileTypeOptions,
  visibilityOptions,
  columns,
} from "@/utils/StepThreeObjects";

const StepThree: React.FC<StepThreeProps> = ({ setFieldValue, values }) => {
  const [files, setFiles] = useState<CustomFile[]>([]);

  const handleFileUpload = (uploadedFiles: File[]) => {
    const newFiles = uploadedFiles.map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      type: file.type,
      fileType: "",
      visibility: "",
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileTypeChange = (id: number, value: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, fileType: value } : file
      )
    );
  };

  const handleVisibilityChange = (id: number, value: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, visibility: value } : file
      )
    );
  };

  const handleDeleteFile = (id: number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const tableData = files.map((file) => ({
    "Nome do arquivo": file.name,
    "Tipo de arquivo": file.type,
    Categoria: (
      <CustomSelect
        name={`fileType-${file.id}`}
        options={fileTypeOptions}
        value={file.fileType}
        onChange={(e) => handleFileTypeChange(file.id, e.target.value)}
      />
    ),
    "Mostrar apenas após o pagamento?": (
      <CustomSelect
        name={`visibility-${file.id}`}
        options={visibilityOptions}
        value={file.visibility}
        onChange={(e) => handleVisibilityChange(file.id, e.target.value)}
      />
    ),
    Ações: (
      <div className="w-full flex flex-col items-end">
        <button onClick={() => handleDeleteFile(file.id)}>
          <div className="w-[1.5rem] invert">
            <Image src={TrashIcon} alt="excluir" />
          </div>
        </button>
      </div>
    ),
  }));

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-y-5">
      <h2>Documentos e arquivos da cobrança (Opcional)</h2>
      <FileUpload
        onFileUpload={(fileList) => handleFileUpload(Array.from(fileList))}
      />
      <Table
        title="Uploaded Files"
        linkText="View All"
        viewAllHref="#"
        columns={columns}
        data={tableData}
        filters={{}}
      />
      </div>
    </div>
  );
};

export default StepThree;
