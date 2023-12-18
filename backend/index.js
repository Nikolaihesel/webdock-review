require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

app.use(
	cors({
		origin: '*',
	})
);

const privateKey = process.env.PRIVATE_KEY;

//Middleware to parse JSON request body
app.use(express.json());

app.post('/verify', async (req, res) => {
	const { ssoToken } = req.body;
	const user = jwt.verify(ssoToken, privateKey);
	console.log(user);
	res.json(user);
});

app.listen(port, () => {
	console.log(`Server is runing at http://45.136.70.229/${port}`);
});

//Mongoose

const postRoutes = require('./routes/posts');

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use('/api/posts', postRoutes);

//connect to DB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(
				`connected to db & server running on port ${process.env.PORT}`
			);
		});
	})
	.catch((error) => {
		console.log(error);
	});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke');
});
