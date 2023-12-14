import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { usePostManagement } from '../../services/PostManagement';
import { TokenContext } from '../../assets/contexts/TokenContext';
//icons
import { FaSearch } from 'react-icons/fa';

import '../header/header.scss';

function Header() {
	const { searchPosts, fetchedPosts, user } = usePostManagement();
	const { token, setToken } = useContext(TokenContext);
	const isLoggedIn = !!token;

	function logOut() {
		localStorage.removeItem('token');
		setToken(null); // Update the token context
	}

	const handleClick = () => {
		setInputToSend(searchInput);
	};

	return (
		<div className='header'>
			<div className='logo'></div>
			<h1>Feature Requests</h1>
			<div className='header-wrap'>
				{isLoggedIn ? (
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

export default Header;
