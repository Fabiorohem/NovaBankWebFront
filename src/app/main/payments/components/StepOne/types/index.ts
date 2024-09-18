export interface StepOneProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  values: {
    value: string;
    description?: string;
    paymentType: "parcelado" | "assinatura" | "";
    installments?: string;
    firstPaymentDate?: string;
    frequency?: string;
    endType?: string;
    endDate?: string;
    endInstallments?: string;
    boletoOrPix: string[];
    creditCard: string[];
    interestRate: string;
    fineRate: string;
    discountFixed: string;
    discountPercent: string;
    fineDiscountFixed: string;
    fineDiscountPercent: string;
    discountDeadline: string;
  };
}
