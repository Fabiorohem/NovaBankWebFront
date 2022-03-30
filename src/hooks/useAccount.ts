import { useContext } from 'react';
import { AccountContext } from '../context/AccountContext';

export function useAccount() {
	const account = useContext(AccountContext);
	return account;
}
