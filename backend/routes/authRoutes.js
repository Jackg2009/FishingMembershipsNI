const express = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
	const {email, password} = req.body;
	try {
		const user = await User.findOne({email});

		if (!user) {
			return res.status(400).json({message: 'Invalid email or password'});
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({message: 'Invalid email or password'});
		}

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email,
				forename: user.forename,
				surname: user.surname,
				dob: user.dob,
				contactNumber: user.contactNumber,
				fishingLicense: user.fishingLicense,
				isAdmin: user.isAdmin

			},
			process.env.JWT_SECRET,
			{expiresIn: process.env.JWT_EXPIRATION_TIME || '15m'}
		);

		// Generate Refresh Token (valid for 7 days)
		const refreshToken = jwt.sign(
			{ id: user._id },
			process.env.JWT_REFRESH_SECRET,
			{ expiresIn: '7d' }
		);

		res.status(200).json({
			token,
			refreshToken
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({message: 'Server error'});
	}
});

// Refresh Token Endpoint (Silently Renew Token)
router.post('/refresh-token', async (req, res) => {
	const { refreshToken } = req.body;
	if (!refreshToken) {
		return res.status(401).json({ message: 'Unauthorized: No refresh token provided' });
	}

	try {
		// Verify the refresh token
		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized: User not found' });
		}

		// Generate a new Access Token (valid for 15 minutes)
		const newAccessToken = jwt.sign(
			{
				id: user._id,
				email: user.email,
				forename: user.forename,
				surname: user.surname,
				dob: user.dob,
				contactNumber: user.contactNumber,
				fishingLicense: user.fishingLicense,
				isAdmin: user.isAdmin
			},
			process.env.JWT_SECRET,
			{ expiresIn: '15m' }
		);

		// Send back the new access token (but keep the old refresh token)
		res.status(200).json({
			token: newAccessToken
		});
	} catch (error) {
		console.error(error);
		res.status(403).json({ message: 'Unauthorized: Invalid refresh token' });
	}
});

router.post('/', async (req, res) => {
	// register
});

module.exports = router;