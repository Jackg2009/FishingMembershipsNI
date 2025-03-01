const express = require( 'express');
const User = require( '../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.post('/', async (req, res) => {
	const user = new User({...req.body});

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(400).json({message: error.message});
	}

	//
	// const { name, email } = req.body;
	// res.json({ message: 'User created', data: { name, email } });
});

// Endpoint to get user applications
router.get('/applications', authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).populate('applications');
		console.log('User applications:', user.applications);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json({ applications: user.applications });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});


// GET /users/:id - Get a specific user (example)
router.get('/:id', (req, res) => {
	const {id} = req.params;
	res.json({message: `Get user with ID ${id}`});
});




module.exports = router;
