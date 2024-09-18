import React from 'react';
import CustomInput from '@/components/input';
import CustomSelect from '@/components/select';
import { paymentOptions } from '@/utils/createPaymentObjects';


export const ParceladoFields = ({ setFieldValue }: any) => {
    return (
      <div className="mt-5">
        <CustomSelect
          name="installments"
          label="Parcelamento"
          ariaLabel="Parcelamento"
          options={paymentOptions.reduce(
            (acc, num) => ({
              ...acc,
              [num]: `${num} parcela${num > 1 ? "s" : ""}`,
            }),
            {}
          )}
          required
        />
        <CustomInput
          name="firstPaymentDate"
          label="Vencimento da 1ª parcela"
          type="date"
          aria-label="Vencimento da 1ª parcela"
          required
        />
      </div>
    );
  };