import React, { useState } from "react";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/select";
import { frequencyOptions, endOptions } from "@/utils/createPaymentObjects";

export const AssinaturaFields = ({ setFieldValue }: any) => {
  const [endType, setEndType] = useState<
    "escolher_data" | "escolher_numero_de_cobrancas" | null
  >(null);

  return (
    <div className="mt-5">
      <CustomSelect
        name="frequency"
        label="Frequência de cobrança"
        ariaLabel="Frequência de cobrança"
        options={frequencyOptions.reduce(
          (acc, freq) => ({
            ...acc,
            [freq.toLowerCase()]: freq,
          }),
          {}
        )}
        required
      />
      <CustomInput
        name="firstPaymentDate"
        label="Vencimento da primeira cobrança"
        type="date"
        aria-label="Vencimento da primeira cobrança"
        required
      />
      <CustomSelect
        name="endType"
        label="Fim da assinatura"
        ariaLabel="Fim da assinatura"
        options={endOptions}
        onChange={(e) => {
          const value = e.target.value as
            | "escolher_data"
            | "escolher_numero_de_cobrancas"
            | null;
          setFieldValue("endType", value);
          setEndType(value);
        }}
        required
      />

      {endType === "escolher_data" && (
        <CustomInput
          name="endDate"
          label="Data de fim da assinatura"
          type="date"
          aria-label="Data de fim da assinatura"
          required
        />
      )}

      {endType === "escolher_numero_de_cobrancas" && (
        <CustomInput
          name="endInstallments"
          label="Número de cobranças"
          type="number"
          aria-label="Número de cobranças"
          required
        />
      )}
    </div>
  );
};
