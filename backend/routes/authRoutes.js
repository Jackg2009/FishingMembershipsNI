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
			{expiresIn: process.env.JWT_EXPIRATION_TIME || '1h'}
		);

		res.status(200).json({token});
	} catch (error) {
		console.error(error);
		res.status(500).json({message: 'Server error'});
	}
});

router.post('/', async (req, res) => {
	// register
});

module.exports = router;