import { NavLink, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import './sideNav.scss';
import { IoIosHome } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';
import Logo from '../../assets/img/wdwhite.png';

function SideNav() {
	const location = useLocation();
	const isDashboardActive = location.pathname.startsWith('/dashboard');

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

export default SideNav;
