// Importing necessary dependencies and components from React and React Router
import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

// Importing custom hook for managing posts and TokenContext for authentication
import { usePostManagement } from '../../services/PostManagement';
import { TokenContext } from '../../assets/contexts/TokenContext';

// Importing an icon component from react-icons
import { FaSearch } from 'react-icons/fa';

// Importing styles for the header component
import './header.scss';

// Header component definition
function Header() {
	// Destructuring values from the custom hook
	const { searchPosts, fetchedPosts, user } = usePostManagement();

	// Destructuring values from TokenContext for authentication
	const { token, setToken } = useContext(TokenContext);

	// Checking if the user is logged in based on the presence of a token
	const isLoggedIn = !!token;

	// Function to handle user logout
	function logOut() {
		localStorage.removeItem('token'); // Remove token from local storage
		setToken(null); // Update the token context
	}

	// Placeholder function, unclear where `searchInput` and `setInputToSend` are defined
	const handleClick = () => {
		setInputToSend(searchInput);
	};

	// Render the header component
	return (
		<div className='header'>
			<div className='logo'></div>
			<h1>Feature Requests</h1>
			<div className='header-wrap'>
				{isLoggedIn ? ( // Render log out button if the user is logged in, else render log in button
					<button onClick={logOut}>Log out</button>
				) : (
					<NavLink to='ssologin'>
						<button>Log in</button>
					</NavLink>
				)}
				{/* <input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search posts...'
				/>
				<button onClick={handleSearch}>Search</button>
				<FaSearch className='icon' /> */}
			</div>
		</div>
	);
}

// Exporting the Header component as the default export
export default Header;
