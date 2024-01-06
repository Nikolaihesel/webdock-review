import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SsoLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Identity Provider's login page.

    const returnBaseUrl = import.meta.env.DEV
      ? "http://localhost:5173"
      : "http://wpc.vps.webdock.cloud:5173";

    console.log(returnBaseUrl);

    window.location.href = `http://webdock.io/en/login?companyID=ucl_feedback_tool&redirect=${returnBaseUrl}/SsoCallback`;
  }, []);

  return <div>Redirecting to SSO login...</div>;
}

export default SsoLogin;
