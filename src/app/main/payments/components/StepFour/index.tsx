import React from "react";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/select";
import { StepFourProps } from "./types";
import { scheduleOffsetOptions } from "@/utils/stepFourObjects";
import { countries, states } from "@/utils/placeObjects";
import {
  handleCpfCnpjChange,
  handleCellphoneChange,
  handleCepChange,
} from "@/utils/validations";

const notificationOptions: Record<
  "whatsapp" | "email" | "sms" | "impresso" | "ligacao" | "correios",
  string
> = {
  whatsapp: "Whatsapp",
  email: "Email",
  sms: "SMS",
  impresso: "Impresso",
  ligacao: "Ligação",
  correios: "Correios",
};

const StepFour: React.FC<StepFourProps> = ({
  setFieldValue,
  setFieldError,
  values,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2>Como essa cobrança será enviada?</h2>
      <p>Selecione como essa cobrança será enviada ao seu cliente.</p>

      <article className="flex flex-col gap-3">
        <label className="font-roboto text-md text-[#DDD]">
          Métodos de Envio:
        </label>
        <div className="flex gap-2">
          {Object.keys(notificationOptions).map((key) => (
            <CustomInput
              key={key}
              name="notificationMethods"
              type="checkbox"
              value={key}
              label={
                notificationOptions[key as keyof typeof notificationOptions]
              }
            />
          ))}
        </div>
      </article>

      <CustomSelect
        name="scheduleOffset"
        label="Dias antes do vencimento:"
        ariaLabel="Dias antes do vencimento"
        options={scheduleOffsetOptions}
        required
      />

      <div className="mt-6">
        <h2>Quem você vai cobrar?</h2>
        <div className="flex flex-col gap-3">
        <CustomInput
            name="clientId"
            label="ID do Cliente"
            placeholder="cus_12345678"
            aria-label="Id do Cliente"
            required
          />
          <CustomInput
            name="name"
            label="Nome do Cliente"
            placeholder="Nome do cliente"
            aria-label="Nome do Cliente"
            required
          />
          <CustomInput
            name="cpfOrCnpj"
            label="CPF / CNPJ"
            placeholder="Digite o CPF ou CNPJ"
            aria-label="CPF / CNPJ"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleCpfCnpjChange(e, setFieldValue)
            }
            required
          />
          <CustomInput
            name="email"
            label="E-mail"
            type="email"
            placeholder="cliente@email.com"
            aria-label="E-mail"
            required
          />
          <CustomInput
            name="cellphone"
            label="Celular"
            placeholder="(21) 12345-6789"
            aria-label="Celular"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleCellphoneChange(e, setFieldValue)
            }
            required
          />
        </div>

        <div className="flex w-full justify-between gap-x-6 mt-6">
          <div className="flex text-xs flex-col w-full md:w-1/2 gap-x-6 md:flex-row">
            <CustomInput
              name="cep"
              label="CEP"
              placeholder="12345-678"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCepChange(e, setFieldValue, setFieldError)
              }
              aria-label="CEP"
              required
            />

            <CustomSelect
              label="País"
              name="countries"
              options={countries}
              required
            />
          </div>

          <div className="flex text-xs flex-col w-full md:w-1/2 gap-x-6 md:flex-row">
            <CustomSelect
              label="Estado"
              name="states"
              options={states}
              required
            />

            <CustomInput
              name="city"
              label="Cidade"
              placeholder="Petrópolis"
              aria-label="Cidade"
              required
            />
          </div>
        </div>

        <div className="flex w-full justify-between gap-x-6">
          <div className="flex flex-col w-full md:w-1/2 gap-x-6 md:flex-row">
            <CustomInput
              name="neighborhood"
              label="Bairro"
              placeholder="Centro"
              aria-label="Bairro"
              required
            />

            <CustomInput
              name="street"
              label="Rua"
              placeholder="Avenida 123"
              aria-label="Rua"
              required
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 gap-x-6 md:flex-row">
            <CustomInput
              name="number"
              label="Número"
              placeholder="123"
              aria-label="Número"
              required
            />

            <CustomInput
              name="complement"
              label="Complemento"
              placeholder="apt 123"
              aria-label="Complemento"
            />
          </div>
        </div>

        {/* <div className="flex w-full mt-6">
          <CustomInput
            name="clientGroup"
            label="Grupo do Cliente"
            placeholder="Digite o grupo do cliente"
            aria-label="Grupo do Cliente"
          />
        </div> */}
      </div>
    </div>
  );
};

export default StepFour;
