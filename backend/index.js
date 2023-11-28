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

const privateKey = 'e389bb7b-dc58-4b0b-8f54-dac159d5a609';

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