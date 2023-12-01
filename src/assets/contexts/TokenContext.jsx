import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
	const [token, setToken] = useState(null);

	useEffect(() => {
		// Fetch token from localStorage
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			const userToken = jwtDecode(storedToken);
			setToken(userToken);
		}
	}, []);

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
};
