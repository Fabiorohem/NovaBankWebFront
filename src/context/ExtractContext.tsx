import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { api } from '../services/api';

export const ExtractContext = createContext(null);

export function ExtractProvider({ children }) {
	const [ extractOffset, setExtractOffset ] = useState(0);
	const [ extractResponse, setExtractResponse ] = useState({});
	const [ extract, setExtract ] = useState({});
	const { setLoading } = useLoading();

	useEffect(
		() => {
			api.get(`/extrato?offset=${extractOffset}`).then((response) => {
				setExtract(response.data.data);
				setExtractResponse({
					offsetState: response.data.offset,
					hasMore: response.data.hasMore,
					totalCount: response.data.totalCount,
					limit: response.data.limit
				});
			});
		},
		[ setExtract, extractOffset, setLoading ]
	);

	return (
		<ExtractContext.Provider value={{ extract, extractResponse, setExtractOffset }}>
			{children}
		</ExtractContext.Provider>
	);
}
