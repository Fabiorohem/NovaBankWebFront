"use client";
import { useState } from "react";
import { data } from "@/utils/tableData";
import Button from "@/components/button";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import pagamento from "@/assets/images/Group 17.svg";

const PixEndTed: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("pix");
    const [selectedKeyType, setSelectedKeyType] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [showLogo, setShowLogo] = useState(false);
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [titularidade, setTitularidade] = useState<string>("sim");  
    const [instituicao, setInstituicao] = useState<string>(""); 
    const [newClienteAgencia, setNewClienteAgencia] = useState<string>("");
    const [newClienteBanco, setNewClienteBanco] = useState<string>("");
    const [newClienteCnpjPix, setNewClienteCnpjPix] = useState<string>("");
    const [newClienteContaCorrente, setNewClienteContaCorrente] = useState<string>("");


    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleKeyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedKeyType(event.target.value);
        if (event.target.value !== "usuario") {
            setSelectedUser(null);
            setSearchTerm("");
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term !== "") {
            const filtered = data.filter((user) =>
                user.Nome.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    };

    const handleUserSelect = (user: any) => {
        setSelectedUser(user);
        setFilteredUsers([]);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleButtonClick = () => {
        setIsPopupOpen(true); 
        setShowLogo(true);   

        setTimeout(() => {
            setShowLogo(false);
            setShowPaymentInfo(true);

            if (selectedOption === "ted") {
                console.log({
                    tipo: "TED",
                    instituicao,
                    titularidade,
                    contaCorrente: selectedUser ? selectedUser.ContaCorrente : "Nova Conta",
                    agencia: selectedUser ? selectedUser.Agencia : newClienteAgencia,
                    banco: selectedUser ? selectedUser.Banco : newClienteBanco,
                    cnpjPix: selectedUser ? selectedUser["CNPJ/CPF"] : newClienteCnpjPix,
                    valor: value,
                    descricao: description,
                    data: selectedDate,
                });
            }
        }, 3000);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedOption("pix");
        setSelectedKeyType("");
        setSearchTerm("");
        setSelectedUser(null);
        setSelectedDate("");
        setValue("");
        setDescription("");
        setShowPaymentInfo(false);
    };
    return (
        <div className="flex flex-col w-full h-full p-6">
            <div className="mt-16 flex items-center w-[40rem]">
                <span className="lg:h-8 h-8 text-transparent flex items-center bg-[#A644CB]">
                    |
                </span>
                <p className="text-white lg:text-[1.5rem] text-[1.2rem] flex justify-center mt-2 ml-2">
                    PIX ou TED
                </p>
            </div>
            <div className="flex p-5 gap-5 my-10 bg-gray-800 rounded-md w-[41rem]">
                <p className="text-[#ddd] text-md">Tipo de transação :</p>
                <div className="flex gap-4">
                    <p className="text-[#ddd] font-roboto">PIX</p>
                    <input
                        type="radio"
                        name="transactionType"
                        value="pix"
                        onChange={handleOptionChange}
                    />
                </div>
                <div className="flex gap-4">
                    <p className="text-[#ddd] font-roboto">TED</p>
                    <input
                        type="radio"
                        name="transactionType"
                        value="ted"
                        onChange={handleOptionChange}
                    />
                </div>
            </div>

            {selectedOption === "pix" && (
                <div className="p-4 bg-gray-800 rounded-md">
                    <div className="mb-3">
                        <p className=" text-[#dddd] mb-5">Selecione a chave Pix :</p>
                        <select
                            className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                            value={selectedKeyType}
                            onChange={handleKeyTypeChange}
                        >
                            <option value="">Selecione uma chave</option>
                            <option value="cpf">CPF</option>
                            <option value="cnpj">CNPJ</option>
                            <option value="email">E-mail</option>
                            <option value="telefone">Telefone</option>
                            <option value="usuario">Usuário Cadastrado</option>
                        </select>
                    </div>

                    {selectedKeyType === "cpf" && (
                        <div>
                            <p className="text-sm text-[#d790f1] mb-1">Chave CPF:</p>
                            <input
                                type="text"
                                name="cpf"
                                placeholder="Digite o CPF"
                                className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                            />
                        </div>
                    )}

                    {selectedKeyType === "cnpj" && (
                        <div>
                            <p className="text-sm text-[#d790f1] mb-1">Chave CNPJ:</p>
                            <input
                                type="text"
                                name="cnpj"
                                placeholder="Digite o CNPJ"
                                className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                            />
                        </div>
                    )}

                    {selectedKeyType === "email" && (
                        <div>
                            <p className="text-sm text-[#d790f1] mb-1">Chave E-mail:</p>
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite o e-mail"
                                className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                            />
                        </div>
                    )}

                    {selectedKeyType === "telefone" && (
                        <div>
                            <p className="text-sm text-[#d790f1] mb-1">Chave Telefone:</p>
                            <input
                                type="tel"
                                name="telefone"
                                placeholder="Digite o telefone"
                                className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                            />
                        </div>
                    )}

                    {selectedKeyType === "usuario" && (
                        <div>
                            <p className="text-sm text-[#d790f1] mb-1">
                                Pesquisar Usuário Cadastrado:
                            </p>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Digite o nome de usuário"
                                className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                            />
                            {filteredUsers.length > 0 && (
                                <ul className=" mt-2 rounded-mdw-[40rem] text-[#dddd]">
                                    {filteredUsers.map((user) => (
                                        <li
                                            key={user.Id}
                                            className="p-2 cursor-pointer hover:bg-gray-600"
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            {user.Nome}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {selectedUser && (
                                <div className="mt-4 p-2 a rounded-md text-[#dddd]">
                                    <p className="text-sm text-[#d790f1] my-5">
                                        Usuário selecionado:{" "}
                                        <span className="text-[#dddd]">{selectedUser.Nome}</span>
                                    </p>
                                    <p className="text-sm text-[#d790f1] my-5">
                                        CNPJ/CPF: {""}
                                        <span className="text-[#dddd]">{selectedUser["CNPJ/CPF"]}</span>
                                    </p>

                                    <div className="mt-3">
                                        <p className="text-sm text-[#d790f1] mb-1">Selecionar Data:</p>
                                        <input
                                    type="date"
                                    value={selectedDate || new Date().toISOString().split("T")[0]}
                                    onChange={handleDateChange}
                                    className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                                />
                                    
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {selectedOption === "ted" && (
                <div className="p-4 bg-gray-800 rounded-md">
                    <div className="mb-3">
                        <p className=" text-[#dddd] mb-5">Selecione o tipo de cliente:</p>
                        <select
                            className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                            value={selectedKeyType}
                            onChange={handleKeyTypeChange}
                        >
                            <option value="">Selecione uma opção</option>
                            <option value="clienteExistente">Selecionar Cliente Cadastrado</option>
                            <option value="clienteNovo">Criar Novo Cliente</option>
                        </select>
                    </div>

                    {selectedKeyType === "clienteExistente" && (
                        <div className="mt-4">
                            <p className=" text-[#dddd] mb-5">Pesquisar Cliente Cadastrado:</p>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Digite o nome do cliente"
                                className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                            />
                            {filteredUsers.length > 0 && (
                                <ul className="mt-2 rounded-md w-[40rem] text-[#dddd]">
                                    {filteredUsers.map((user) => (
                                        <li
                                            key={user.Id}
                                            className="p-2 cursor-pointer hover:bg-gray-600"
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            {user.Nome}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {selectedUser && (
                                <div className="mt-4 p-2 rounded-md text-[#dddd]">
                                    <p className="text-sm text-[#d790f1] my-5">
                                        Cliente selecionado: <span className="text-[#dddd]">{selectedUser.Nome}</span>
                                    </p>
                                    <p className="text-sm text-[#d790f1] my-5">
                                        Conta Corrente: <span className="text-[#dddd]">{selectedUser.ContaCorrente}</span>
                                    </p>
                                    <p className="text-sm text-[#d790f1] my-5">
                                        Agência: <span className="text-[#dddd]">{selectedUser.Agencia}</span>
                                    </p>
                                    <p className="text-sm text-[#d790f1] my-5">
                                        Banco: <span className="text-[#dddd]">{selectedUser.Banco}</span>
                                    </p>
                                    <div className="mt-4">
                                        <p className="text-sm text-[#d790f1] mb-1">Instituição:</p>
                                        <input
                                            type="text"
                                            name="instituicao"
                                            placeholder="Digite a instituição bancária"
                                            className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-[#d790f1] mb-1">Mesma titularidade:</p>
                                        <select
                                            className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                                            value={titularidade}
                                            onChange={(e) => setTitularidade(e.target.value)}
                                        >
                                            <option value="sim">Sim</option>
                                            <option value="nao">Não</option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-[#d790f1] mb-1">Data da transação:</p>
                                        <input
                                            type="date"
                                            value={selectedDate || new Date().toISOString().split("T")[0]} 
                                            onChange={handleDateChange}
                                            className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {selectedKeyType === "clienteNovo" && (
                        <div className="mt-4">
                            <div className="mb-4">
                                <p className="text-sm text-[#d790f1] mb-1">Conta Corrente:</p>
                                <input
                                    type="text"
                                    name="contaCorrente"
                                    placeholder="Digite a conta corrente"
                                    className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                                    value={newClienteContaCorrente}
                                    onChange={(e) => setNewClienteContaCorrente(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-[#d790f1] mb-1">Agência:</p>
                                <input
                                    type="text"
                                    name="agencia"
                                    placeholder="Digite a agência"
                                    className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                                    value={newClienteAgencia}
                                    onChange={(e) => setNewClienteAgencia(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-[#d790f1] mb-1">Banco:</p>
                                <input
                                    type="text"
                                    name="banco"
                                    placeholder="Digite o banco"
                                    className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                                    value={newClienteBanco}
                                    onChange={(e) => setNewClienteBanco(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-[#d790f1] mb-1">CNPJ/Chave Pix:</p>
                                <input
                                    type="text"
                                    name="cnpjPix"
                                    placeholder="Digite o CNPJ ou chave Pix"
                                    className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                                    value={newClienteCnpjPix}
                                    onChange={(e) => setNewClienteCnpjPix(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="flex items-center text-[#ddd]">
                                    <input
                                        type="checkbox"
                                        name="salvarDestinatario"
                                        className="mr-2"
                                    />
                                    Salvar Cliente
                                </label>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-[#d790f1] mb-1">Data da transação:</p>
                                <input
                                    type="date"
                                    value={selectedDate || new Date().toISOString().split("T")[0]}
                                    onChange={handleDateChange}
                                    className="w-[40rem] text-[12px] py-2 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="my-10 p-4 bg-gray-800 rounded-md">
                <div className=" py-5 gap-x-5 ">
                    <div className="w-[40rem]">
                        <p className="text-base font-roboto text-[#dddd]">Valor:</p>
                        <input
                            type="text"
                            name="valor"
                            value={value}
                            onChange={handleValueChange}
                            placeholder="10,99 R$"
                            className="w-[40rem] text-[12px] py-[9px] pl-3 rounded-md bg-slate-600 text-[#dddd]"
                        />
                    </div>
                    <div className="w-[40rem] mt-9">
                        <p className="text-base font-roboto text-[#dddd]">Descrição:</p>
                        <textarea
                            name="Descrição"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="w-[40rem] text-[12px] py-3 pl-3 rounded-md bg-slate-600 text-[#dddd]"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        text="Gerar pagamento"
                        color="bg-gray-600"
                        hoverColor="hover:bg-gray-500"
                        type="button"
                        onClick={handleButtonClick}
                    />
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-[#151515] bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-[#151515] p-6 rounded-lg w-1/2 relative">
                        <div className="absolute top-4 right-4 cursor-pointer text-white text-2xl" onClick={handleClosePopup}>
                            &#10006;
                        </div>
                        {showLogo ? (
                            <Image src={Logo} alt="Logo" className="w-36 h-36 animate-spin" />
                        ) : (
                            <div className="flex flex-col items-center">
                                <Image src={pagamento} alt="Payment" className="w-" />
                                {selectedUser && (
                                    <div className="text-center mt-4 w-full justify-center">
                                        <p className="text-[#dddd] font-roboto font-bold text-[23px] mb-6">{selectedUser.Nome}</p>
                                        <div className="flex gap-28 justify-center">
                                            <p className="text-[#dddd] font-roboto font-semibold ">
                                                CNPJ/CPF {" "}
                                            </p>
                                            <span className="text-[#d790f1]">{selectedUser["CNPJ/CPF"]}</span>
                                        </div>
                                        {selectedOption === "ted" && (
                                            <>
                                                <div className="flex gap-[11rem] mt-4 justify-center">
                                                    <p className="text-[#dddd] font-roboto font-semibold ">
                                                        Conta Corrente
                                                    </p>
                                                    <span className="text-[#d790f1]">{selectedUser.ContaCorrente}</span>
                                                </div>
                                                <div className="flex gap-[11rem] mt-4 justify-center">
                                                    <p className="text-[#dddd] font-roboto font-semibold ">
                                                        Agência
                                                    </p>
                                                    <span className="text-[#d790f1]">{selectedUser.Agencia}</span>
                                                </div>
                                                <div className="flex gap-[11rem] mt-4 justify-center">
                                                    <p className="text-[#dddd] font-roboto font-semibold ">
                                                        Banco
                                                    </p>
                                                    <span className="text-[#d790f1]">{selectedUser.Banco}</span>
                                                </div>
                                                <div className="flex gap-[11rem] mt-4 justify-center">
                                                    <p className="text-[#dddd] font-roboto font-semibold ">
                                                        Instituição
                                                    </p>
                                                    <span className="text-[#d790f1]">{/* Adicione o valor da instituição aqui */}</span>
                                                </div>
                                                <div className="flex gap-[11rem] mt-4 justify-center">
                                                    <p className="text-[#dddd] font-roboto font-semibold ">
                                                        Mesma Titularidade
                                                    </p>
                                                    <span className="text-[#d790f1]">{/* Valor de titularidade (Sim/Não) */}</span>
                                                </div>
                                                <div className="flex gap-[11rem] mt-4 justify-center">
                                                    <p className="text-[#dddd] font-roboto font-semibold ">Instituição</p>
                                                    <span className="text-[#d790f1]">{instituicao}</span>
                                                </div>
                                                <div className="flex gap-[11rem] mt-4 justify-center">
                                                    <p className="text-[#dddd] font-roboto font-semibold ">Mesma Titularidade</p>
                                                    <span className="text-[#d790f1]">{titularidade === "sim" ? "Sim" : "Não"}</span>
                                                </div>
                                            </>
                                        )}

                                        <div className="flex gap-[11rem] mt-4 justify-center">
                                            <p className="text-[#dddd] font-roboto font-semibold ">
                                                Na data de
                                            </p>
                                            <span className="text-[#d790f1]">{selectedDate}</span>
                                        </div>
                                        <div className="flex gap-[13rem] mt-4 justify-center">
                                            <p className="text-[#dddd] font-roboto font-semibold ">
                                                No valor de{" "}
                                            </p>
                                            <span className="text-[#d790f1]">{value || "R$ 0,00"}</span>
                                        </div>

                                        <div className="bg-[rgba(217,217,217,0.24)] p-3 mt-4 rounded-md max-h-32 w-full overflow-y-auto break-words">
                                            <p className="text-[#d790f1]">Descrição:</p>
                                            <p className="text-[#dddd] break-words">
                                                {description || "Sem descrição"}
                                            </p>
                                        </div>
                                        <div className="mt-6">
                                            <Button
                                                text="Compartilhar comprovante!"
                                                color="bg-gray-600"
                                                hoverColor="hover:bg-gray-500"
                                                type="button"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PixEndTed;
