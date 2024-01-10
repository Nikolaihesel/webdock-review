// Importing necessary dependencies from React and jwt-decode library
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Creating a context for token management
export const TokenContext = createContext(null);

// TokenProvider component definition
export const TokenProvider = ({ children }) => {
	// State to store the user token
	const [token, setToken] = useState(null);

	// Effect hook to run once when the component mounts
	useEffect(() => {
		// Fetch token from localStorage when the component mounts
		const storedToken = localStorage.getItem('token');

		// If a token is found in localStorage, decode it using jwt-decode library
		if (storedToken) {
			const userToken = jwtDecode(storedToken);

			// Set the decoded token in the state
			setToken(userToken);
		}
	}, []);

	// Providing the token and setToken function to the components through context
	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
};
