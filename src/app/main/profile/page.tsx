"use client";
import React, { useState } from "react";
import UserDetails from "@/components/userInfo";

const PerfilUser: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "John Doe",
    sobrename:"uabaladu",
    bank: "462-asaas I.P.S.A",
    agency: "0001",
    account: "3941043-3",
    pix: "1234567891011",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Informações salvas com sucesso!");
  };

  return (
    <div className="flex flex-col items-center w-full overflow-y-auto py-5">
      <div className="flex flex-col gap-5 justify-center items-center w-full px-5">
        <h2 className="font-robotoMono font-semibold text-[#A644CB]">
          Editar Perfil
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
          <div>
            <p className="text-white mb-2 font-roboto">Nome</p>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Nome"
              className="border border-[#A644CB] px-3 py-2 rounded"
            />
          </div>
          <div>
            <p className="text-white mb-2 font-roboto">Sobrenome</p>
            <input
              type="text"
              name="bank"
              value={userData.sobrename}
              onChange={handleChange}
              placeholder="Banco"
              className="border border-[#A644CB] px-3 py-2 rounded"
            />
          </div>
          <div>
            <p className="text-white mb-2 font-roboto">Banco </p>
            <input
              type="text"
              name="agency"
              value={userData.agency}
              onChange={handleChange}
              placeholder="Agência"
              className="border border-[#A644CB] px-3 py-2 rounded"
            />
          </div>
          <div>
            <p className="text-white mb-2 font-roboto">Sobrenome</p>
            <input
              type="text"
              name="account"
              value={userData.account}
              onChange={handleChange}
              placeholder="Conta"
              className="border border-[#A644CB] px-3 py-2 rounded"
            />
          </div>
          <div>
            <p className="text-white mb-2 font-roboto">Sobrenome</p>
            <input
              type="text"
              name="pix"
              value={userData.pix}
              onChange={handleChange}
              placeholder="PIX"
              className="border  border-[#A644CB] px-3 py-2 rounded"
            />
          </div>
          <div>
            <p className="text-white mb-2 font-roboto">Sobrenome</p>
            <input
              type="text"
              name="pix"
              value={userData.pix}
              onChange={handleChange}
              placeholder="PIX"
              className="border  border-[#A644CB] px-3 py-2 rounded"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="bg-[#A644CB] text-white px-4 py-2 rounded w-full"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerfilUser;
