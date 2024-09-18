import React from "react";
import { useFormikContext } from "formik";

export interface StepSixProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    setFieldError: (field: string, message: string | undefined) => void;
    values: any;
  }
  

const StepSix: React.FC<StepSixProps> = ({
    setFieldValue,
    setFieldError,
    // values,
  }) => {
  const { values } = useFormikContext<any>();

  const calculateBoletoPixNetValue = () => {
    const grossValue = parseFloat(values.value.replace(/\D/g, "")) / 100;
    const netValue = grossValue - 0.99;
    return netValue.toFixed(2).replace(".", ",");
  };

  const calculateCreditCardNetValue = () => {
    const grossValue = parseFloat(values.value.replace(/\D/g, "")) / 100;
    const netValue = grossValue - (grossValue * 0.0199 + 0.49);
    return netValue.toFixed(2).replace(".", ",");
  };

  return (
    <div className="step-six">
      <h2 className="text-xl font-bold mb-4">Resumo</h2>
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Informações da cobrança</h3>
        <p>
          <strong>Tipo da cobrança:</strong> {values.paymentType === "parcelado" ? "Parcelado" : "Avulsa"}
        </p>
        <p>
          <strong>Valor da cobrança:</strong> R$ {values.value}
        </p>
        <p>
          <strong>Data de vencimento:</strong> {values.firstPaymentDate}
        </p>
        <p>
          <strong>Método de pagamento:</strong> Pergunte ao cliente
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold">Valor líquido a receber no Boleto Bancário / Pix</h3>
        <p>
          Taxa de R$ 0,99 por cobrança recebida. Receba em 1 dia útil após o pagamento.
        </p>
        <p>
          Taxa de R$ 0,99 por Pix recebido. Receba em poucos segundos após o pagamento.
        </p>
        <p>
          <strong>R$ {calculateBoletoPixNetValue()}</strong>
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Valor líquido a receber no Cartão de Crédito</h3>
        <p>
          Taxa de 1,99% sobre o valor da cobrança + R$ 0,49. Receba em 32 dias após o pagamento de cada parcela.
        </p>
        <p>
          <strong>R$ {calculateCreditCardNetValue()}</strong>
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Informações do cliente</h3>
        <p>
          <strong>Nome do cliente:</strong> {values.name}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Opções adicionais</h3>
        <p>
          <strong>Juros, multas e descontos:</strong> Ativado
        </p>
        <p>
          <strong>Documentos e arquivos:</strong> Desativado
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold">Juros, multas e desconto</h3>
        <p>
          <strong>Juros ao mês:</strong> {values.interestRate || "0,00% (R$ 0,00)"}
        </p>
        <p>
          <strong>Multa por atraso:</strong> {values.fineRate || "0,00% (R$ 0,00)"}
        </p>
        <p>
          <strong>Desconto:</strong> {values.discountFixed || values.discountPercent || "0,00% (R$ 0,00)"}
        </p>
        <p>
          <strong>Prazo máximo do desconto:</strong> Até o dia do vencimento
        </p>
      </div>
    </div>
  );
};

export default StepSix;
