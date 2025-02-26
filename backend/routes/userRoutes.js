const express = require( 'express');

const User = require( '../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		console.log(users)
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

// GET /users/:id - Get a specific user (example)
router.get('/:id', (req, res) => {
	const {id} = req.params;
	res.json({message: `Get user with ID ${id}`});
});


module.exports = router;
