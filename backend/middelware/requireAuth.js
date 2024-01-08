require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const privateKey = process.env.PRIVATE_KEY;
app.use(express.json());

const ssoVerify = async (req, res) => {
	try {
		const { ssoToken } = req.body;
		if (!ssoToken) {
			return res.status(400).json({ error: 'SSO token is required' });
		}

		const decoded = jwt.verify(ssoToken, privateKey);
		console.log(decoded);

		let user = await User.findOneAndUpdate(
			{ id: decoded.id },
			{
				$setOnInsert: {
					email: decoded.email,
					name: decoded.name,
					id: decoded.id,
				},
			},
			{ new: true, upsert: true, setDefaultsOnInsert: true }
		);

		// Return user data
		res.status(200).json({ email: user.email, name: user.name, id: user.id });
	} catch (error) {
		console.error('Error in SSO verification:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = {
	ssoVerify,
};
