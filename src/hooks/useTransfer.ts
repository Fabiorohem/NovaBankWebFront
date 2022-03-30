import { useContext } from 'react';
import { TransferContext } from '../context/TransferContext';

export function useTransfer() {
	const transfers = useContext(TransferContext);
	return transfers;
}
