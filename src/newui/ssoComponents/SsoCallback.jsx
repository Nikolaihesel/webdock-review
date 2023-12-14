import React, { createContext, useState, useContext, useEffect } from 'react';

function SsoCallback() {
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const ssoToken = urlParams.get('ssoToken');
			const response = await fetch('http://localhost:3000/verify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({ ssoToken }),
			});

			if (!response.ok) {
				throw new Error('Failed to fetch');
			}

			const fetchedUserData = await response.json();
			setUserData(fetchedUserData);
			localStorage.setItem('token', ssoToken);
		} catch (error) {
			console.error('Error fetching data:', error);
			setError(error.message || 'Failed to fetch data');
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!userData && !token) {
			fetchData();
		} else if (token) {
			window.location.href = '/';
			console.log(userData);
		}
	}, [userData]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!userData) {
		return <div>Loading...</div>;
	}

	return <div></div>;
}
export default SsoCallback;
