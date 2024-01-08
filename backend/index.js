require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());

const postRoutes = require('./routes/posts');
const authRoute = require('./routes/auth');

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use('/api/posts', postRoutes);
app.use('/verify', authRoute);

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
