import { useContext } from 'react';
import { ChargeContext } from '../context/ChargeContext';

export function useCharge() {
	const charges = useContext(ChargeContext);
	return charges;
}
