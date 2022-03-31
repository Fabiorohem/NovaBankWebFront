import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { api } from '../services/api';

type AccountType = {
	id: string;
	name: string;
	walletId: string;
	percentualValue: number,
	splitFixedValue: number,
	agencia: string,
	conta: string
};

interface AccountContextType {
	accounts: AccountType[],
	errorMessage: string,
	successMessage: string,
	setAccounts: (obj: any) => any,
	createNewAccount: (object: Object) => Promise<void>,
	setErrorMessage: (str: string) => void,
	setSuccessMessage: (str: string) => void
}
export const AccountContext = createContext({} as AccountContextType);

export function AccountProvider({ children }) {
	const [accounts, setAccounts] = useState<AccountType[]>([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const { setLoading } = useLoading();
	const {isAdmin} = useAuth();

	useEffect(() => {
		if(!accounts.length && isAdmin)
		{
		
			api.get('/account').then((response) => setAccounts(response.data));
		}
	}, [accounts,isAdmin]);

	async function createNewAccount(data: object) {
		setLoading(true);
		await api
			.post('/account', data)
			.then(() => setSuccessMessage('Conta criada com sucesso!'))
			.catch((error) => { 
				let errorMessage = "";
				error.response?.data?.errors?.forEach(x =>{ errorMessage += "" + x.description + " "});
				
				setErrorMessage(!errorMessage ? "Opps Algo deu errado!" : errorMessage)
			});

		setLoading(false);
	}
	return <AccountContext.Provider value={{ accounts, errorMessage, successMessage, createNewAccount,setErrorMessage,setSuccessMessage,setAccounts }}>{children}</AccountContext.Provider>;
}
