import React, { useState } from "react";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/select";
import Button from "@/components/button";
import { discountDeadlineOptions } from "@/utils/createPaymentObjects";

const StepTwo = ({ setFieldValue, values }: any) => {
  const [fineType, setFineType] = useState<"fixed" | "percent" | null>(null);
  const [discountType, setDiscountType] = useState<"fixed" | "percent" | null>(
    null
  );

  const handleFineFixedClick = () => {
    setFineType("fixed");
    setFieldValue("fineRate", "");
  };

  const handleFinePercentClick = () => {
    setFineType("percent");
    setFieldValue("fineRate", "");
  };

  const handleFixedClick = () => {
    setDiscountType("fixed");
    setFieldValue("discountPercent", "");
  };

  const handlePercentClick = () => {
    setDiscountType("percent");
    setFieldValue("discountFixed", "");
  };

  const formatToCurrency = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    const formattedValue = (parseFloat(value) / 100)
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setFieldValue(field, formattedValue);
  };

  const formatToPercentage = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    const formattedValue = (parseFloat(value) / 100)
      .toFixed(2)
      .replace(".", ",");
    setFieldValue(field, formattedValue);
  };

  return (
    <>
      <article className="flex flex-col items-center gap-5">
        <h2>Juros</h2>
        <div className="flex gap-2 items-center">
          <CustomInput
            name="interestRate"
            type="text"
            label="Juros (%)"
            placeholder="0,00"
            aria-label="Juros"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formatToPercentage(e, "interestRate")
            }
            value={values.interestRate}
          />
          <span className="text-gray-700">
            {values.value && values.interestRate
              ? `R$ ${(
                  (parseFloat(values.value.replace(/\D/g, "")) *
                    parseFloat(values.interestRate.replace(",", "."))) /
                  10000
                ).toFixed(2)}`
              : "R$ 0,00"}
          </span>
        </div>
      </article>

      <article className="flex flex-col items-center gap-5">
        <h2>Multa</h2>
        <div className="flex gap-5">
          <Button
            type="button"
            text="Multa Fixa"
            color={fineType === "fixed" ? "bg-blue-500" : "bg-gray-500"}
            hoverColor="hover:bg-blue-700"
            onClick={handleFineFixedClick}
          />
          <Button
            type="button"
            text="Multa Percentual"
            color={fineType === "percent" ? "bg-blue-500" : "bg-gray-500"}
            hoverColor="hover:bg-blue-700"
            onClick={handleFinePercentClick}
          />
        </div>

        {fineType === "fixed" && (
          <CustomInput
            name="fineRate"
            type="text"
            label="Multa (Valor Fixo)"
            placeholder="0,00"
            aria-label="Multa Fixa"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formatToCurrency(e, "fineRate")
            }
            value={values.fineRate}
            prefix="R$"
          />
        )}

        {fineType === "percent" && (
          <CustomInput
            name="fineRate"
            type="text"
            label="Multa (%)"
            placeholder="0,00"
            aria-label="Multa Percentual"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formatToPercentage(e, "fineRate")
            }
            value={values.fineRate}
            suffix="%"
          />
        )}
      </article>

      <article className="flex flex-col items-center gap-5">
        <h2>Descontos</h2>
        <div className="flex gap-5">
          <Button
            type="button"
            text="Desconto Fixo"
            color={discountType === "fixed" ? "bg-blue-500" : "bg-gray-500"}
            hoverColor="hover:bg-blue-700"
            onClick={handleFixedClick}
          />
          <Button
            type="button"
            text="Desconto Percentual"
            color={discountType === "percent" ? "bg-blue-500" : "bg-gray-500"}
            hoverColor="hover:bg-blue-700"
            onClick={handlePercentClick}
          />
        </div>

        {discountType === "fixed" && (
          <CustomInput
            name="discountFixed"
            type="text"
            label="Desconto (Valor Fixo)"
            placeholder="0,00"
            aria-label="Desconto Fixo"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formatToCurrency(e, "discountFixed")
            }
            value={values.discountFixed}
            prefix="R$"
          />
        )}

        {discountType === "percent" && (
          <CustomInput
            name="discountPercent"
            type="text"
            label="Desconto (%)"
            placeholder="0,00"
            aria-label="Desconto Percentual"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formatToPercentage(e, "discountPercent")
            }
            value={values.discountPercent}
            suffix="%"
          />
        )}
      </article>

      <article className="flex flex-col items-center gap-5">
        <h2>Prazo Máximo do Desconto</h2>
        <CustomSelect
          name="discountDeadline"
          label="Prazo Máximo"
          ariaLabel="Prazo Máximo do Desconto"
          options={discountDeadlineOptions}
          required
        />
      </article>
    </>
  );
};

export default StepTwo;
