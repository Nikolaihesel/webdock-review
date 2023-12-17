import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { usePostManagement } from '../../services/PostManagement';
import { TokenContext } from '../../assets/contexts/TokenContext';

import './header.scss';

function Header() {
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

export default Header;
