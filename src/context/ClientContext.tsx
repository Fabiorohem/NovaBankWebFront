import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { api } from '../services/api';

type Clients = {
	id: string;
	name: string;
	email: string;
	charges: string;
	mobilePhone: string;
	observations: string;
};

export const ClientContext = createContext(null);

export function ClientProvider({ children }) {
	const [ clients, setClients ] = useState<Clients[]>([]);
	const [ clientId, setClientId ] = useState('');
	const [ clientOffset, setClientOffset ] = useState(0);
	const [ filters, setFilters ] = useState({} as any);
	const [ clientReponse, setClientResponse ] = useState({});
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ successMessage, setSuccessMessage ] = useState('');

	useEffect(
		() => {
			if (clientOffset < 0) setClientOffset(0);

			api
				.get(
					`/cliente?offset=${clientOffset}
				${filters.name ? `&name=${filters.name}` : ''}
				${filters.cpfCnpj ? `&cpfCnpj=${filters.cpfCnpj}` : ''}`
				)
				.then((response) => {
					setClients(response.data.data);
					setClientResponse({
						offsetState: response.data.offset,
						hasMore: response.data.hasMore,
						totalCount: response.data.totalCount,
						limit: response.data.limit
					});
				
				});
		},
		[ clientOffset, filters ]
	);

	async function createClient(data) {
		
		await api
			.post('/cliente', data)
			.then(() => setSuccessMessage('Cliente criado com sucesso!'))
			.catch((error) => setErrorMessage(error.response.data.errors[0].description));

		setClientOffset(clientOffset - 1);
	}

	async function deleteClient(id) {
	
		await api.delete(`/cliente/${id}`).then(() => setSuccessMessage('Cliente deletado com sucesso!'));
		setClientOffset(clientOffset - 1);
	}

	async function updateClient(id: string, data: object) {
		
		await api
			.put(`/cliente/${id}`, data)
			.then(() => setSuccessMessage('Cliente editado com sucesso!'))
			.catch((err) => console.log(err));
		setClientOffset(clientOffset);
	
	}

	return (
		<ClientContext.Provider
			value={{
				clients,
				deleteClient,
				updateClient,
				setClientOffset,
				clientReponse,
				createClient,
				setFilters,
				errorMessage,
				setErrorMessage,
				successMessage,
				setSuccessMessage,
				setClientId
			}}
		>
			{children}
		</ClientContext.Provider>
	);
}
