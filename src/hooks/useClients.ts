import { useContext } from 'react';
import { ClientContext } from '../context/ClientContext';

export function useClient() {
	const client = useContext(ClientContext);
	return client;
}
