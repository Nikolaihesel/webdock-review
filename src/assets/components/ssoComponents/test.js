import './App.css';
import { useEffect } from 'react';

const App = () => {
  const redirectToWebDock = () => {
    const encodedURL = encodeURIComponent('http://localhost:5173');
    const redirectURL = https://webdock.io/en/login?companyID=ucl_feedback_tool&redirect=${encodedURL};
    window.location.href = redirectURL;
  };

  const fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const ssoToken = urlParams.get('ssoToken');

      const response = await fetch("http://localhost:3000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ ssoToken }),
      });

      const userData = await response.json();
      console.log(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <button onClick={redirectToWebDock}>Login</button>
  );
};

export default App;





// Backend:
// // index.js
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const app = express();
// const port = 3000;
// const cors = require('cors');

// app.use(cors({
//     origin: "*"
// }));

// // Middleware to parse JSON request body
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.post('/verify', async (req, res) => {
//     const { ssoToken } = req.body;

//     const user = jwt.verify(ssoToken, 'e389bb7b-dc58-4b0b-8f54-dac159d5a609')

//     console.log(user);
//     res.json(user)
// });

// app.listen(port, () => {
//     console.log(Server is running at http://localhost:${port});
// });