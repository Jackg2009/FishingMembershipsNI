// const express = require('express')
// const User = require("../models/User");
// const Club = require("../models/Club");
// const router = express.Router()
//
// const jwt = require('jsonwebtoken'); // to create a JWT token for authenticated users
//
//
// //User Routes
// router.get("/api/users", async (req, res) => {
//     try {
//         const users = await User.find();
//         console.log(users)
//         res.json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server Error");
//     }
// });
//
// router.post('/api/users', async (req,res) => {
//
//     const user = new User({ ...req.body });
//
//     try {
//         const newUser = await user.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: error.message });
//     }
// })
//
// // POST /api/login
// router.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;
//
//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }
//
//         // Compare the password
//         const isMatch = await user.comparePassword(password); // Assuming comparePassword is a method on your User model
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }
//
//         // Generate JWT token
//         const token = jwt.sign(
//             { id: user._id, email: user.email }, // Payload
//             process.env.JWT_SECRET, // Secret key
//             { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' } // Expiration time
//         );
//
//         // Send token in response
//         res.status(200).json({ token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
//
//
//
// //Club Routes
// router.get("/api/clubs", async (req, res) => {
//     try {
//         const clubs = await Club.find();
//         console.log(clubs)
//         res.json(clubs);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server Error");
//     }
// });
//
// router.post('/api/clubs', async (req, res) => {
//
//     const club = new Club({ ...req.body });
//
//     try {
//         const newClub = await club.save();
//         res.status(201).json(newClub);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: error.message });
//     }
// })
//
// module.exports = router