import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { api } from '../services/api';

export const TransferContext = createContext(null);

export function TransferProvider({ children }) {
	const [ transferOffest, setTransferOffset ] = useState(0);
	const [ transferResponse, seTransferResponse ] = useState({});
	const [ transfers, setTransfers ] = useState([]);
	const [ transfer, setTransfer ] = useState({});
	const [ successMessage, setSuccessMessage ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');
	const { setLoading } = useLoading();

	useEffect(
		() => {
			if (transferOffest < 0) setTransferOffset(0);
			setLoading(true);
			api.get(`/transferencias?offset=${transferOffest}`).then((response) => {
				setTransfers(response.data.data);
				seTransferResponse({
					offsetState: response.data.offset,
					hasMore: response.data.hasMore,
					totalCount: response.data.totalCount,
					limit: response.data.limit
				});
				setLoading(false);
			});
		},
		[ setTransfers, transferOffest, setLoading ]
	);

	async function createBankTransfer(data: object) {
		await api
			.post('/transferencias/bancaria', data)
			.then(() => setSuccessMessage('Solicitação de transferência realizada com sucesso'))
			.catch((error) => setErrorMessage(error.response.data.errors[0].description));
	}

	async function createAsaasTransfer(data: object) {
		await api
			.post('/transferencias/asaas', data)
			.then(() => setSuccessMessage('Solicitação de transferência realizada com sucesso'))
			.catch((error) => setErrorMessage(error.response.data.errors[0].description));
	}

	async function getATransfer(id: string) {
		await api.get(`/transferencias/${id}`).then((response) => setTransfer(response.data));
	}

	return (
		<TransferContext.Provider
			value={{
				transfers,
				transferResponse,
				setTransferOffset,
				successMessage,
				errorMessage,
				setSuccessMessage,
				setErrorMessage,
				createBankTransfer,
				createAsaasTransfer,
				setTransfer,
				transfer,
				getATransfer
			}}
		>
			{children}
		</TransferContext.Provider>
	);
}
