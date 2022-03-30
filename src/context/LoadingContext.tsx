import { createContext, useEffect, useState } from 'react';

export const LoadingContext = createContext(null);

export function LoadingProvider ({children}) {
    const [loading,setLoading] = useState(true);

	return (
		<LoadingContext.Provider value={{loading,setLoading}}>
			{children}
		</LoadingContext.Provider>
	);
}