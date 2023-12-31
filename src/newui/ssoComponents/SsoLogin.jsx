import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SsoLogin() {
	const navigate = useNavigate();

	useEffect(() => {
		// Redirect to the Identity Provider's login page.
		window.location.href =
			'http://webdock.io/en/login?companyID=ucl_feedback_tool&redirect=http://wpc.vps.webdock.cloud:5173/SsoCallback';
	}, []);

	return <div>Redirecting to SSO login...</div>;
}

export default SsoLogin;
