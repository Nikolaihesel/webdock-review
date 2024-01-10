// Importing necessary React components and styles from the React Router DOM library
import { NavLink, Routes, Route, Outlet } from 'react-router-dom';

// Importing components for the application
import SideNav from '../newui/sideNav/SideNav';
import Dashboard from './dashboard/Dashboard';

// Importing global styles
import '../newui/main.css';
import '../newui/variables.scss';

// App component definition
function App() {
	// Render the main structure of the application
	return (
		<div className='header-wrapper'>
			<SideNav />

			<Outlet />
		</div>
	);
}

// Exporting the App component as the default export
export default App;
