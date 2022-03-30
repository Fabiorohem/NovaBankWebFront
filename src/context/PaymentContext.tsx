import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { api } from '../services/api';

export const PaymentContext = createContext(null);

interface Payment {
	identificationField: string;
	scheduleDate: string;
	description: string;
	discount: number;
	dueDate: string;
	value: number;
}

export function PaymentProvider({ children }) {
	const [ payments, setPayments ] = useState<Payment[]>([]);
	const [ payment, setPayment ] = useState({});
	const [ paymentOffset, setPaymentOffset ] = useState(0);
	const [ paymentId, setPaymentId ] = useState('');
	const [ paymentResponse, setPaymentResponse ] = useState({});
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ successMessage, setSuccessMessage ] = useState('');
	const { setLoading } = useLoading();
	const [ simulatePayment, setSimulatePayment ] = useState([]);
	const [ openSimulateTable, setOpenSimulateTable ] = useState(false);

	useEffect(
		() => {
			if (paymentOffset < 0) setPaymentOffset(0);
			setLoading(true);
			api.get(`/pagamentos${paymentOffset > 0 ? `?offset=${paymentOffset}` : ''}`).then((response) => {
				setPayments(response.data.data),
					setPaymentResponse({
						offsetState: response.data.offset,
						hasMore: response.data.hasMore,
						totalCount: response.data.totalCount,
						limit: response.data.limit
					}),
					setLoading(false);
			});
		},
		[ setPayments, paymentOffset, paymentId, setLoading ]
	);

	async function createNewPayment(data: object) {
		setLoading(true);
		await api
			.post('/pagamentos', data)
			.then(() => setSuccessMessage('Pagamento criado com sucesso'))
			.catch((error) => setErrorMessage(error.response.data.errors));
		setPaymentOffset(paymentOffset - 1);
		setLoading(false);
	}

	async function cancelPayment(id: string) {
		setLoading(true);
		await api.put(`/pagamentos/${id}/cancelar`);
		setPaymentOffset(paymentOffset - 1);
		setLoading(false);
	}

	async function getAPayment(paymentId: string) {
		await api.get(`/pagamentos/${paymentId}`).then((response) => setPayment(response.data));
	}

	async function createSimulateAPayment(value: string) {
		await api
			.post('/pagamentos/simular', value)
			.then((response) => {
				setSimulatePayment([ response.data ]);
				setOpenSimulateTable(true);
			})
			.catch((error) => setErrorMessage(error.response.data.errors[0].description));
	}

	return (
		<PaymentContext.Provider
			value={{
				payments,
				createNewPayment,
				errorMessage,
				setErrorMessage,
				successMessage,
				setSuccessMessage,
				cancelPayment,
				setPaymentId,
				paymentResponse,
				createSimulateAPayment,
				simulatePayment,
				setSimulatePayment,
				setOpenSimulateTable,
				openSimulateTable,
				getAPayment,
				payment
			}}
		>
			{children}
		</PaymentContext.Provider>
	);
}
