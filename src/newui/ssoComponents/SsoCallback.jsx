import React, { createContext, useState, useContext, useEffect } from "react";

// SsoCallback component definition
function SsoCallback() {
  // State to store user data and error
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch user data from the server
  const fetchData = async () => {
    try {
      // Extracting SSO token from URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const ssoToken = urlParams.get("ssoToken");

      // Sending a POST request to the server for token verification
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ssoToken }),
      });

      // Handling non-successful response from the server
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      // Parsing the response as JSON and updating user data
      const fetchedUserData = await response.json();
      setUserData(fetchedUserData);

      // Saving the SSO token in localStorage
      localStorage.setItem("token", ssoToken);
    } catch (error) {
      // Handling errors during the data fetching process
      console.error("Error fetching data:", error);
      setError(error.message || "Failed to fetch data");
    }
  };

  // Effect hook to initiate data fetching on component mount
  useEffect(() => {
    // Checking if there is a token stored in localStorage
    const token = localStorage.getItem("token");

    // If no user data and no token are present, initiate data fetching
    if (!userData && !token) {
      fetchData();
    } else if (token) {
      // If a token is present, redirect to the home page and log user data
      window.location.href = "/";
      console.log(userData);
    }
  }, [userData]);

  // Rendering based on the presence of error or user data
  if (error) {
    // Displaying an error message if there is an error
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    // Displaying a loading message if user data is not yet available
    return <div>Loading...</div>;
  }

  // Placeholder return when user data is present
  return <div></div>;
}

// Exporting the SsoCallback component
export default SsoCallback;
