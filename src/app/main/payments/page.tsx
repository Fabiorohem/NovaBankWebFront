"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import Title from "@/components/title";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import StepSix from "./components/StepSix/page";
import { NavigationButtons } from "./components/NavigationButtons";
import {
  validationSchemaStepOne,
  validationSchemaStepTwo,
  validationSchemaStepThree,
  validationSchemaStepFour,
  validationSchemaStepFive,
} from "@/utils/createPaymentObjects";

const CreatePayments: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const getValidationSchema = () => {
    switch (currentStep) {
      case 1:
        return null
      case 2:
        return null
      case 3:
        return null
      case 4:
        return null
      case 5:
        return null;
      case 6:
        return null;
      default:
        return null
    }
  };

  const handleNextStep = (isValid: boolean) => {
    if (isValid && currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <Title text="Criar Cobrança" />
      <div className="steps-indicator flex justify-center my-4">
        <div className="steps-indicator flex justify-center my-4">
          <div
            className={`step ${
              currentStep >= 1 ? "completed text-red-400" : ""
            }`}
          >
            <span>1</span> Dados da Cobrança
          </div>
          <div
            className={`step ${
              currentStep >= 2 ? "completed text-red-400" : ""
            }`}
          >
            <span>2</span> Juros e Multa
          </div>
          <div
            className={`step ${
              currentStep >= 3 ? "completed text-red-400" : ""
            }`}
          >
            <span>3</span> Documentos
          </div>
          <div
            className={`step ${
              currentStep >= 4 ? "completed text-red-400" : ""
            }`}
          >
            <span>4</span> Dados do cliente
          </div>
          <div
            className={`step ${
              currentStep >= 5 ? "completed text-red-400" : ""
            }`}
          >
            <span>5</span> Notificações
          </div>
          <div
            className={`step ${
              currentStep >= 6 ? "completed text-red-400" : ""
            }`}
          >
            <span>6</span> Resumo
          </div>
        </div>
      </div>

      <Formik
        initialValues={{
          value: "",
          description: "",
          paymentType: "" as "" | "parcelado" | "assinatura",
          installments: "",
          firstPaymentDate: "",
          frequency: "",
          endType: "",
          endDate: "",
          endInstallments: "",
          boletoOrPix: [],
          creditCard: [],
          interestRate: "",
          fineRate: "",
          discountFixed: "",
          discountPercent: "",
          fineDiscountFixed: "",
          fineDiscountPercent: "",
          discountDeadline: "",
        }}
        validationSchema={getValidationSchema()}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ setFieldValue, setFieldError, values, isValid }) => (
          <Form>
            <div className="w-full m-auto lg:w-10/12 flex flex-col items-center justify-center gap-y-3">
              {currentStep === 1 && (
                <StepOne setFieldValue={setFieldValue} values={values} />
              )}
              {currentStep === 2 && (
                <StepTwo setFieldValue={setFieldValue} values={values} />
              )}
              {currentStep === 3 && (
                <StepThree setFieldValue={setFieldValue} values={values} />
              )}
              {currentStep === 4 && (
                <StepFour
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  values={values}
                />
              )}
              {currentStep === 5 && (
                <StepFive
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  values={values}
                />
              )}
              {currentStep === 6 && (
                <StepSix
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  values={values}
                />
              )}
              <NavigationButtons
                currentStep={currentStep}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                isValid={isValid}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePayments;
