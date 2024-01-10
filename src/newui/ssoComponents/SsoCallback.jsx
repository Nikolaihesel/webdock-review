import React, { createContext, useState, useContext, useEffect } from 'react';

// Definition of the 'SsoCallback' component
function SsoCallback() {
	// State to store user data received from the server
	const [userData, setUserData] = useState(null);

	// State to handle errors during data fetching
	const [error, setError] = useState(null);

	// Function to fetch user data from the server using the provided SSO token
	const fetchData = async () => {
		try {
			// Extracting SSO token from the URL query parameters
			const urlParams = new URLSearchParams(window.location.search);
			const ssoToken = urlParams.get('ssoToken');

			// Sending a POST request to the server to verify the SSO token
			const response = await fetch('http://localhost:3000/verify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({ ssoToken }),
			});

			// Handling errors if the response is not OK
			if (!response.ok) {
				throw new Error('Failed to fetch');
			}

			// Parsing the response JSON and updating the user data state
			const fetchedUserData = await response.json();
			setUserData(fetchedUserData);

			// Storing the SSO token in localStorage for future use
			localStorage.setItem('token', ssoToken);
		} catch (error) {
			// Handling and logging errors during data fetching
			console.error('Error fetching data:', error);
			setError(error.message || 'Failed to fetch data');
		}
	};

	// Effect hook to run the fetchData function on component mount
	useEffect(() => {
		// Checking if the user data is not available and there is no stored token
		const token = localStorage.getItem('token');
		if (!userData && !token) {
			// Fetch user data if not available
			fetchData();
		} else if (token) {
			// Redirecting to the home page if the token is present
			window.location.href = '/';
			console.log(userData);
		}
	}, [userData]); // Dependency array ensures the effect runs once on mount

	// Rendering content based on the presence of errors and user data
	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!userData) {
		return <div>Loading...</div>;
	}

	// Returning an empty div if the component successfully handled the SSO callback
	return <div></div>;
}

// Exporting the 'SsoCallback' component as the default export
export default SsoCallback;
