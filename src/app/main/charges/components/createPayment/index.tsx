import React, { useState, useEffect } from "react";
import { Formik, Form, validateYupSchema, yupToFormErrors } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/select";
import CustomTextarea from "@/components/textArea";
import Button from "@/components/button";
import { CreatePaymentFormValues } from "./types";
import {
  formatToPercentage,
  formatCurrency,
  generateInstallmentOptions,
} from "@/utils/utils";
import { validationSchemaCreateCharge } from "@/utils/createPaymentObjects";

const CreateCharges: React.FC = () => {
  const [fineType, setFineType] = useState<"fixed" | "percent">("percent");
  const [discountType, setDiscountType] = useState<"fixed" | "percent">(
    "percent"
  );
  const [installmentOptions, setInstallmentOptions] = useState<
    Record<string, string>
  >({});
  const [isInstallmentEnabled, setIsInstallmentEnabled] = useState(false);

  const billingTypeOptions = {
    PIX: "Pix",
    BOLETO: "Boleto",
    CREDIT_CARD: "Cartão de Crédito",
  };

  const discountDeadlineOptions = {
    0: "Até o dia do vencimento",
    1: "Até 1 dia antes do vencimento",
    2: "Até 2 dias antes do vencimento",
    3: "Até 3 dias antes do vencimento",
    4: "Até 4 dias antes do vencimento",
  };

  const handleFineTypeChange = (type: "fixed" | "percent") => {
    setFineType(type);
  };

  const handleDiscountTypeChange = (type: "fixed" | "percent") => {
    setDiscountType(type);
  };

  return (
    <Formik<CreatePaymentFormValues>
      initialValues={{
        customer: "",
        billingType: "",
        value: "",
        dueDate: "",
        description: "",
        installmentCount: 1,
        fine: {
          value: "",
          type: "percent",
        },
        discount: {
          value: "",
          dueDateLimitDays: 0,
          type: "percent",
        },
        postalService: false,
        printInvoice: false,
      }}
      validationSchema={validationSchemaCreateCharge}
      validate={(values) => {
        try {
          validateYupSchema(values, validationSchemaCreateCharge, true, {
            totalValue: values.value,
          });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            return yupToFormErrors(err);
          }
          console.error("Unexpected error:", err);
        }
        return {};
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ setFieldValue, values }) => {
        const installmentCount = values.installmentCount || 1;

        const interestValue =
          values.value && values.interest?.value
            ? (
              (parseFloat(values.value.replace(/\D/g, "")) *
                parseFloat(values.interest.value.replace(",", "."))) /
              10000 /
              installmentCount
            ).toFixed(2)
            : "0,00";

        const fineValue =
          values.value && values.fine?.value
            ? values.fine.type === "percent"
              ? (
                (parseFloat(values.value.replace(/\D/g, "")) *
                  parseFloat(values.fine.value.replace(",", "."))) /
                10000 /
                installmentCount
              ).toFixed(2)
              : (
                parseFloat(values.fine.value.replace(/\D/g, "")) /
                installmentCount
              ).toFixed(2)
            : "0,00";

        const discountValue =
          values.value && values.discount?.value
            ? values.discount.type === "percent"
              ? (
                (parseFloat(values.value.replace(/\D/g, "")) *
                  parseFloat(values.discount.value.replace(",", "."))) /
                10000 /
                installmentCount
              ).toFixed(2)
              : (
                parseFloat(values.discount.value.replace(/\D/g, "")) /
                installmentCount
              ).toFixed(2)
            : "0,00";

        useEffect(() => {
          if (values.value) {
            setIsInstallmentEnabled(true);
            const options = generateInstallmentOptions(values.value);
            setInstallmentOptions(options);
          } else {
            setIsInstallmentEnabled(false);
          }
        }, [values.value]);

        return (
          <Form className="p-10">
              <div className="border-l-4 pl-2   lg:text-[30px] border-solid text-[#ddd] border-[#A644CB] ml-2 mb-5 ">
                Criar um novo pagamento
              </div>
            <div className="flex flex-wrap text-xs md:flex-nowrap w-full gap-x-6 justify-between">
              <CustomInput
                name="customer"
                label="Cliente"
                placeholder="Digite o identificador do cliente"
                required
              />

              <CustomSelect
                name="billingType"
                label="Forma de pagamento"
                options={billingTypeOptions}
                required
              />
            </div>
            <div className="flex flex-wrap text-xs md:flex-nowrap w-full gap-x-6 justify-between">
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
                  setIsInstallmentEnabled(formattedValue.length > 0);
                  if (formattedValue.length > 0) {
                    const options = generateInstallmentOptions(formattedValue);
                    setInstallmentOptions(options);
                  }
                }}
              />

              <CustomInput
                name="dueDate"
                label="Data de vencimento"
                type="date"
                required
              />
            </div>

            {isInstallmentEnabled && (
              <CustomSelect
                name="installmentCount"
                label="Número de Parcelas"
                options={installmentOptions}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setFieldValue("installmentCount", e.target.value);
                }}
                value={values.installmentCount?.toString() || "1"}
              />
            )}
            <div className="w-full max-w-md">
              <CustomTextarea
                name="description"
                label="Descrição da cobrança (Opcional)"
                placeholder="A descrição informada será impressa na fatura."
                ariaLabel="Descrição da cobrança (Opcional)"
              />
            </div>

            <div className="flex flex-col flex-wrap text-xs md:flex-nowrap w-full gap-x-6 justify-between">
              <div className="w-full text-red-300">
                <CustomInput
                  name="interest.value"
                  type="text"
                  label="Juros ao mês (%)"
                  placeholder="0,00"
                  aria-label="Juros"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue(
                      "interest.value",
                      formatToPercentage(e.target.value)
                    )
                  }
                  value={values.interest?.value || ""}
                />
              </div>
              <span className="text-[#dddd] -mt-4 mb-3 text-[12px] font-roboto">{`R$ ${interestValue}`}</span>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap text-xs md:flex-nowrap w-full gap-x-6 justify-between">
                <CustomSelect
                  name="fine.type"
                  label="Tipo de Multa"
                  ariaLabel="Tipo de Multa"
                  options={{ fixed: "Fixo", percent: "Percentual" }}
                  required
                  value={values.fine?.type}
                  onChange={(e) => {
                    handleFineTypeChange(e.target.value as "fixed" | "percent");
                    setFieldValue("fine.type", e.target.value);
                  }}
                />
                {values.fine?.type === "fixed" && (
                  <CustomInput
                    name="fine.value"
                    type="text"
                    label="Multa (Valor Fixo)"
                    placeholder="0,00"
                    aria-label="Multa Fixa"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue(
                        "fine.value",
                        formatCurrency(e.target.value)
                      )
                    }
                    value={values.fine?.value || ""}
                    prefix="R$"
                  />
                )}
                {values.fine?.type === "percent" && (
                  <>
                    <CustomInput
                      name="fine.value"
                      type="text"
                      label="Multa (%)"
                      placeholder="0,00"
                      aria-label="Multa Percentual"
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue(
                          "fine.value",
                          formatToPercentage(e.target.value)
                        )
                      }
                      value={values.fine?.value || ""}
                      suffix="%"
                    />
                  </>
                )}
              </div>
              <span className="text-[#dddd]  text-[12px] font-roboto">{`R$ ${fineValue}`}</span>
            </div>

            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap text-xs md:flex-nowrap w-full gap-x-6 justify-between">
                <CustomSelect
                  name="discount.type"
                  label="Tipo de Desconto"
                  ariaLabel="Tipo de Desconto"
                  options={{ fixed: "Fixo", percent: "Percentual" }}
                  required
                  value={values.discount?.type}
                  onChange={(e) => {
                    handleDiscountTypeChange(
                      e.target.value as "fixed" | "percent"
                    );
                    setFieldValue("discount.type", e.target.value);
                  }}
                />
                {values.discount?.type === "fixed" && (
                  <CustomInput
                    name="discount.value"
                    type="text"
                    label="Desconto (Valor Fixo)"
                    placeholder="0,00"
                    aria-label="Desconto Fixo"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue(
                        "discount.value",
                        formatCurrency(e.target.value)
                      )
                    }
                    value={values.discount?.value || ""}
                    prefix="R$"
                  />
                )}
                {values.discount?.type === "percent" && (
                  <>
                    <CustomInput
                      name="discount.value"
                      type="text"
                      label="Desconto (%)"
                      placeholder="0,00"
                      aria-label="Desconto Percentual"
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue(
                          "discount.value",
                          formatToPercentage(e.target.value)
                        )
                      }
                      value={values.discount?.value || ""}
                      suffix="%"
                    />
                  </>
                )}
              </div>
              <h2 className="text-[#a644cb] -mt-4 mb-3 text-[12px] font-roboto ">
                {" "}
                Valor do Desconto
              </h2>
              {/* <span className="text-[#a644cb] pb-5 font-roboto text-[12px]">{`R$ ${discountValue}`}</span> */}
            </div>

            <CustomSelect
              name="discount.dueDateLimitDays"
              label="Prazo Máximo"
              ariaLabel="Prazo Máximo do Desconto"
              options={discountDeadlineOptions}
              required
            />

            <CustomInput
              name="printInvoice"
              type="checkbox"
              label="Quero imprimir esta cobrança"
            />

            <CustomInput
              name="postalService"
              type="checkbox"
              label="Quero enviar esta cobrança via Correios"
            />
            <Button
              type="submit"
              color="bg-[#A644CB]"
              hoverColor="hover:bg-[#8E38A6]"
              text="Criar Pagamento"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateCharges;
