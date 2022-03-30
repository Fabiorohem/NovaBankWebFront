import { useContext } from 'react';
import { PaymentContext } from '../context/PaymentContext';

export function usePayment() {
	const payments = useContext(PaymentContext);
	return payments;
}
