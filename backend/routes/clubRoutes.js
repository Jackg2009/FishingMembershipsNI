const express = require('express')
const router = express.Router();
const Club = require("../models/Club");
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
	try {
		const clubs = await Club.find();
		console.log(clubs)
		res.json(clubs);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.post('/', async (req, res) => {
	
	const club = new Club({ ...req.body });
	
	try {
		const newClub = await club.save();
		res.status(201).json(newClub);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: error.message });
	}
	//
	// const { name, email } = req.body;
	// res.json({ message: 'User created', data: { name, email } });
});

// Apply to a club
router.post("/apply", authMiddleware, async (req, res) => {
	const { clubId } = req.body;
	const userId = req.user.id; // Assumes authMiddleware adds user info

	try {
		// Check if the club exists
		const club = await Club.findById(clubId);
		if (!club) {
			return res.status(404).json({ message: "Club not found" });
		}

		// Check if the user has already applied
		if (club.applicants.includes(userId)) {
			return res.status(400).json({ message: "You have already applied to this club." });
		}

		// Add the user to the club's applicants list
		club.applicants.push(userId);
		await club.save();

		// Optionally, update the user's applications
		await User.findByIdAndUpdate(userId, { $push: { applications: clubId } });

		res.json({ message: "Application submitted successfully!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
});


module.exports = router;
