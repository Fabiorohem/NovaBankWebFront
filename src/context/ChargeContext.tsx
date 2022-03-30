import Router from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { api } from '../services/api';

export const ChargeContext = createContext(null);

export function ChargeProvider({ children }) {
	const { setLoading } = useLoading();
	// const { isAuthenticate } = useAuth();

	const [ charges, setCharges ] = useState({});
	const [ successMessage, setSuccessMessage ] = useState('');
	const [ clientId, setClientId ] = useState('');
	const [ chargeResponse, setChargeResponse ] = useState({});
	const [ chargeOffset, setChargeOffset ] = useState(0);
	const [ errorMessage, setErrorMessage ] = useState('');

	useEffect(
		() => {
			if (chargeOffset < 0) setChargeOffset(0);
			setLoading(true);
			api.get(`/cobranca?offset=${chargeOffset}${clientId ? `&customer=${clientId}` : ''}`).then((response) => {
				setCharges(response.data.data);
				setChargeResponse({
					offsetState: response.data.offset,
					hasMore: response.data.hasMore,
					totalCount: response.data.totalCount,
					limit: response.data.limit
				});
				setLoading(false);
			});
		},
		[ chargeOffset, clientId, setLoading ]
	);

	function getCharges() {
		setLoading(true);
		api.get('/cobranca').then((response) => {
			setCharges(response.data.data);
			setLoading(false);
		});
	}

	async function createCashCharge(data) {
		setLoading(true);
		await api
			.post('/cobranca/avista', data)
			.then(() => setSuccessMessage('Cobrança criada com sucesso'))
			.catch((error) => setErrorMessage(error.response.data.errors[0].description));
		setChargeOffset(chargeOffset - 1);
		setLoading(false);
	}

	async function createParcelCharge(data) {
		setLoading(true);
		await api
			.post('/cobranca/parcelada', data)
			.then(() => setSuccessMessage('Cobrança criada com sucesso'))
			.catch((error) => setErrorMessage(error.response.data.errors[0].description));
		setChargeOffset(chargeOffset - 1);
		setLoading(false);
	}

	async function receiveInCash(id, data) {
		await api.put(`/cobranca/${id}/confimarrecebimento`, data).catch((error) => console.log(error.response));
	}

	async function revertReceiveInCash(id) {
		await api.put(`/cobranca/${id}/desfazerconfirmacaorecebimento`).catch((error) => console.log(error.response));
	}

	async function updateCharge(id: string, data: object) {
		setLoading(true);
		await api
			.put(`/cobranca/${id}`, data)
			.then(() => setSuccessMessage('Cobrança atualizada com sucesso!'))
			.catch((error) => console.log(error));
		setChargeOffset(chargeOffset - 1);
		setLoading(false);
	}

	async function deleteCharge(id) {
		setLoading(true);
		await api.delete(`/cobranca/${id}`).then(() => setSuccessMessage('Cobrança deletada com sucesso'));
		setChargeOffset(chargeOffset - 1);
		setLoading(false);
	}

	async function reverseACharge(id: string) {
		await api
			.put(`cobranca/${id}/estornar`)
			.catch((error) => setErrorMessage(error.response.data.errors[0].description));
	}

	return (
		<ChargeContext.Provider
			value={{
				charges,
				setCharges,
				deleteCharge,
				reverseACharge,
				updateCharge,
				errorMessage,
				setErrorMessage,
				successMessage,
				setSuccessMessage,
				createParcelCharge,
				createCashCharge,
				receiveInCash,
				setChargeOffset,
				chargeOffset,
				chargeResponse,
				revertReceiveInCash,
				setClientId,
				getCharges
			}}
		>
			{children}
		</ChargeContext.Provider>
	);
}
