import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Definition of the 'SsoLogin' component
function SsoLogin() {
	// Access the navigation function from the React Router
	const navigate = useNavigate();

	// Effect hook to execute code on component mount
	useEffect(() => {
		// Redirect the user to the Identity Provider's login page
		window.location.href =
			'http://webdock.io/en/login?companyID=ucl_feedback_tool&redirect=http://localhost:5173/SsoCallback';
	}, []); // Dependency array is empty, so the effect runs only on mount

	// Display a message while redirecting to SSO login
	return <div>Redirecting to SSO login...</div>;
}

// Exporting the 'SsoLogin' component as the default export
export default SsoLogin;
