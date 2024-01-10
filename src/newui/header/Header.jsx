// React library imports
import { useState, useEffect, useContext } from 'react';

// React Router imports
import { NavLink } from 'react-router-dom';

// Service and context imports
import { usePostManagement } from '../../services/PostManagement';
import { TokenContext } from '../../assets/contexts/TokenContext';

// Styling import
import './header.scss';

// Header component definition
function Header() {
	// Context hook to get the token and setToken function
	const { token, setToken } = useContext(TokenContext);

	// Check if a user is logged in based on the presence of the token
	const isLoggedIn = !!token;

	// Function to log out the user
	function logOut() {
		localStorage.removeItem('token'); // Remove the token from local storage
		setToken(null); // Update the token context to null, effectively logging out the user
	}

	const handleClick = () => {
		setInputToSend(searchInput);
	};

	// Return JSX for rendering the Header component
	return (
		<div className='header'>
			<div className='logo'></div>
			<h1>Feature Requests</h1>
			<div className='header-wrap'>
				{isLoggedIn ? (
					<button
						className='log-btn'
						onClick={logOut}>
						Log out
					</button>
				) : (
					<NavLink to='/ssologin'>
						<button>Log in</button>
					</NavLink>
				)}
			</div>
		</div>
	);
}

// Export Header component as the default export
export default Header;
