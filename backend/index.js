// Load environment variables from a .env file
require('dotenv').config();

// Import necessary libraries and modules
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors'); // Middleware for handling Cross-Origin Resource Sharing (CORS)
const mongoose = require('mongoose'); // MongoDB object modeling tool
const path = require('path');

// Enable CORS for all routes
app.use(
	cors({
		origin: '*',
	})
);

// Load private key for JWT verification from environment variables
const privateKey = process.env.PRIVATE_KEY;

// Middleware to parse JSON request body
app.use(express.json());

// Route for verifying a JWT token
app.post('/verify', async (req, res) => {
	const { ssoToken } = req.body;

	// Verify the JWT token using the private key
	const user = jwt.verify(ssoToken, privateKey);

	// Log the verified user information
	console.log(user);

	// Respond with the verified user information
	res.json(user);
});

// Start the server on the specified port
app.listen(port, () => {
	console.log(`Server is runing at http://45.136.70.229/${port}`);
});

// Import routes for handling posts
const postRoutes = require('./routes/posts');

// Middleware to log the path and method of incoming requests
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Use the postRoutes for handling routes starting with /api/posts
app.use('/api/posts', postRoutes);

// Connect to MongoDB database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// Start the server after successfully connecting to the database
		app.listen(process.env.PORT, () => {
			console.log(
				`connected to db & server running on port ${process.env.PORT}`
			);
		});
	})
	.catch((error) => {
		// Log any errors that occur during database connection
		console.log(error);
	});

// Error handling middleware for unhandled errors
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke');
});
