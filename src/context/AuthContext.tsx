import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Router from 'next/router';
import Login from '../pages/login';
interface AuthContextType {
	isAuthenticated: boolean;
	signIn: (SignInRequest) => Promise<void>;
	verifiAuth: () => void;
	logout: () => void;
	isAdmin: boolean;
}

interface SignInRequest {
	password: string;
	username: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false)

	useEffect(
		() => {
			const { 'nextauth.token': token } = parseCookies();

			if (token) {
				setIsAuthenticated(true);
				Router.push('/clients');
			}
		},
		[isAuthenticated]
	);

	async function signIn({ username, password }: SignInRequest) {
		try {
			const res = await api.post('/login', {
				username,
				password
			});

			const { accessToken } = res.data;

			const bodyStr = atob(accessToken.split('.')[1])

			const bodyObj = JSON.parse(bodyStr)
			console.log(bodyObj)
			
			if(bodyObj["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Admin")
				setIsAdmin(true)
			else
				setIsAdmin(false)

			console.log(isAdmin)


			setCookie(undefined, 'nextauth.token', accessToken, {
				maxAge: 60 * 60 * 24
			});

			api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

			setIsAuthenticated(true);

			Router.push('/clients');

		}
		catch {
			alert('Usuário ou Senha incorretos')
		}



	}

	async function verifiAuth() {
		const { 'nextauth.token': token } = parseCookies();

		if (token) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}
	function logout() {
		setIsAuthenticated(false);

		destroyCookie({}, 'nextauth.token');
		delete api.defaults.headers['Authorization'];
		Router.push('/login');
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, verifiAuth, signIn, logout,isAdmin }}>
			{isAuthenticated ? children : <Login />}
		</AuthContext.Provider>
	);
}
