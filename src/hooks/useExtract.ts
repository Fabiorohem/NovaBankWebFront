import { useContext } from 'react';
import { ExtractContext } from '../context/ExtractContext';

export function useExtract() {
	const extract = useContext(ExtractContext);
	return extract;
}
