import { NavLink, Routes, Route, Outlet } from 'react-router-dom';
//components
import SideNav from '../newui/sideNav/SideNav';
import Dashboard from './dashboard/Dashboard';

import '../newui/main.css';
import '../newui/variables.scss';

function App() {
	return (
		<div className='header-wrapper'>
			<SideNav />

			<Outlet />
		</div>
	);
}

export default App;
