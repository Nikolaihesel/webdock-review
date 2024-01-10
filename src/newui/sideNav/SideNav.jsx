// Importing necessary dependencies and components
import { NavLink, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import './sideNav.scss';
import { IoIosHome } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';
import Logo from '../../assets/img/wdwhite.png';

// Definition of the 'SideNav' component
function SideNav() {
	// Retrieving the current location using the 'useLocation' hook from 'react-router-dom'
	const location = useLocation();

	// Checking if the current path starts with '/dashboard' to determine if the dashboard is active
	const isDashboardActive = location.pathname.startsWith('/dashboard');

	// The main structure of the 'SideNav' component
	return (
		<div className='side-nav'>
			<div className='logo'>
				<NavLink to='https://webdock.io/en'>
					<img
						src={Logo}
						alt='Webdock Logo'
					/>
				</NavLink>
			</div>
			<IconContext.Provider
				value={{
					style: { color: '#f2f3f7', verticalAlign: 'middle' },
					className: 'icons',
				}}>
				<div className='icon-wrapper'>
					<NavLink
						to='/dashboard/mostliked'
						className={isDashboardActive ? 'active' : ''}>
						<IoIosHome />
					</NavLink>
					<NavLink
						to='/newpost'
						className={({ isActive }) => (isActive ? 'active' : '')}>
						<MdAddCircle />
					</NavLink>
				</div>
			</IconContext.Provider>
		</div>
	);
}

// Export 'SideNav' component as the default export
export default SideNav;
