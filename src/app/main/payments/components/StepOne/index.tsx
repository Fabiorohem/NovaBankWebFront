import React from "react";
import CustomInput from "@/components/input";
import CustomTextarea from "@/components/textArea";
import Button from "@/components/button";
import { formatCurrency } from "@/utils/createPaymentObjects";
import { ParceladoFields } from "../ParceladoFields";
import { AssinaturaFields } from "../AssinaturaField";
import { StepOneProps } from "./types";

const StepOne: React.FC<StepOneProps> = ({ setFieldValue, values }) => {
  
  const resetAssinaturaFields = () => {
    setFieldValue("frequency", "");
    setFieldValue("endType", "");
    setFieldValue("endDate", "");
    setFieldValue("endInstallments", "");
  };

  const resetParceladoFields = () => {
    setFieldValue("installments", "");
    setFieldValue("firstPaymentDate", "");
  };

  const handleParceladoClick = () => {
    resetAssinaturaFields();
    setFieldValue("paymentType", "parcelado");
  };

  const handleAssinaturaClick = () => {
    resetParceladoFields();
    setFieldValue("paymentType", "assinatura");
  };

  return (
    <>

      <article>
      <div className="flex flex-col items-center gap-5">
        <CustomInput
          name="value"
          type="text"
          label="Valor da Cobrança"
          placeholder="100,00"
          aria-label="Valor da Cobrança"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const formattedValue = formatCurrency(e.target.value);
            setFieldValue("value", formattedValue);
          }}
        />

        <CustomTextarea
          name="description"
          label="Descrição da cobrança (Opcional)"
          placeholder="A descrição informada será impressa na fatura."
          ariaLabel="Descrição da cobrança (Opcional)"
        />
      </div>

        <div className="flex gap-5">
          <Button
            type="button"
            text="À vista ou parcelado"
            color="bg-[#A644CB]"
            hoverColor="hover:bg-[#8E38A6]"
            onClick={handleParceladoClick}
          />
          <Button
            type="button"
            text="Assinatura"
            color="bg-[#8E38A6]"
            hoverColor="hover:bg-[#A644CB]"
            onClick={handleAssinaturaClick}
          />
        </div>

        {values.paymentType === "parcelado" && (
          <ParceladoFields setFieldValue={setFieldValue} />
        )}

        {values.paymentType === "assinatura" && (
          <AssinaturaFields setFieldValue={setFieldValue} />
        )}
      </article>
    </>
  );
};

export default StepOne;
