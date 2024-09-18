"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import CustomSelect from "@/components/select";
import Button from "@/components/button";
import CustomInput from "@/components/input";
import AddIcon from "@/assets/icons/addPersonWhiteIcon.png";
import { countries, states } from "@/utils/placeObjects";
import {
  validationSchema,
  handleCpfCnpjChange,
  handleCellphoneChange,
  handleCepChange,
} from "@/utils/validations";

const ClientPage: React.FC = () => {
  return (
    <div className="flex w-full pt-16 pb-[5rem] ">

      <div className="w-full flex flex-col items-center justify-center p-3 gap-6 lg:pt-0 ">
        <Formik
          initialValues={{
            name: "",
            cpfOrCnpj: "",
            email: "",
            cellphone: "",
            cep: "",
            countries: "",
            states: "",
            city: "",
            neighborhood: "",
            street: "",
            number: "",
            complement: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ setFieldValue, setFieldError }) => (
            <Form>
              <div className="w-full">
                <div className="flex flex-wrap text-xs md:flex-nowrap w-full gap-x-6 justify-between">
                  <CustomInput
                    name="name"
                    label="Nome"
                    placeholder="Agiliza"
                    aria-label="Nome"
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
                </div>
                <div className="flex flex-wrap text-xs md:flex-nowrap w-full gap-x-6 justify-between">
                  <CustomInput
                    name="email"
                    label="E-mail"
                    type="email"
                    placeholder="agiliza.app@gmail.com"
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
                <div className="flex flex-col w-full justify-between gap-y-6 mb-5">
                  <p className="text-[#DDD] text-xs">Pessoa</p>
                  <div className="flex text-xs items-start">
                    <CustomInput
                      name="person"
                      label="Física"
                      type="radio"
                      value="fisic"
                      required
                    />
                    <CustomInput
                      name="person"
                      label="Jurídica"
                      type="radio"
                      value="juridica"
                      required
                    />
                  </div>
                </div>

                <div className="flex w-full justify-between gap-x-6 ">
                  <div className="flex text-xs flex-col w-full md:w-1/2 gap-x-6 md:flex-row justify-">
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
                      required={true}
                    />
                  </div>

                  <div className="flex text-xs flex-col w-full md:w-1/2 gap-x-6 md:flex-row">
                    <CustomSelect
                      label="Estado"
                      name="states"
                      options={states}
                      required={true}
                    />

                    <CustomInput
                      name="city"
                      label="Cidade"
                      placeholder="Petrópolis"
                      aria-label="cidade"
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
                      aria-label="rua"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2 gap-x-6 md:flex-row">
                    <CustomInput
                      name="number"
                      label="Número"
                      placeholder="123"
                      aria-label="número"
                      required
                    />

                    <CustomInput
                      name="complement"
                      label="Complemento"
                      placeholder="apt 123"
                      aria-label="complemento"
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center pb-[5rem]">
                  <div className="w-full max-w-md">
                    <Button
                      type="submit"
                      text="Adcionar"
                      color="bg-[#A644CB]"
                      hoverColor="hover:bg-[#8E38A6]"
                      imageSrc={AddIcon}
                      imageAlt="Adicionar"
                      disabled={false}
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ClientPage;
