const express = require( 'express');
const User = require( '../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

// Get the currently authenticated user's profile (using the token)
router.get('/me', authMiddleware, async (req, res) => {
	try {
		// Use the id from the authenticated user (from the token)
		const user = await User.findById(req.user.id).select('-password'); // Exclude the password from the response

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Return the user data
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch user data' });
	}
});

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

// Update a specific user's profile
router.put('/:id', authMiddleware, async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;

		// Ensure the ID from the request params matches the ID from the token (if you're doing profile updates for logged-in users)
		if (req.user.id !== id) {
			return res.status(403).json({ message: 'You are not authorized to update this profile' });
		}

		// Optional: validate/update date format for dob
		if (updatedData.dob && typeof updatedData.dob === 'string') {
			updatedData.dob = new Date(updatedData.dob);
		}

		// Find the user by ID and update their profile
		const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'An error occurred while updating the profile' });
	}
});


module.exports = router;
