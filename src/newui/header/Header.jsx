import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../../assets/hooks/useAuthContext';

import './header.scss';

function Header() {
	const { user } = useAuthContext();
	const isLoggedIn = !!user;

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
