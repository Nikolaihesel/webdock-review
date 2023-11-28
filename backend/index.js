const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(
	cors({
		origin: '*',
	})
);

const privateKey = '..';

//Middleware to parse JSON request body
app.use(express.json());

app.post('/verify', async (req, res) => {
	const { ssoToken } = req.body;
	const user = jwt.verify(ssoToken, privateKey);
	console.log(user);
	res.json(user);
});

app.listen(port, () => {
	console.log(`Server is runing at http://localhost:${port}`);
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke');
});
