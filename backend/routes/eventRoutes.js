const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware'); // Optional: only for user-specific routes

// 📌 Get latest public events (for homepage display)
router.get('/latest', async (req, res) => {
    try {
        const events = await Event.find({ visibility: 'public' })
            .sort({ date: -1 }) // Sort by date descending (latest first)
            .limit(5); // Limit to 5 events
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// 📌 Get events for a specific club (private or public)
router.get('/club/:clubId', async (req, res) => {
    const { clubId } = req.params;
    try {
        const events = await Event.find({ club: clubId }).sort({ date: -1 }); // Sort by latest first
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching club events' });
    }
});

// 📌 Create a new event (only for authenticated users and club admins)
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, location, date, visibility, clubId, image } = req.body;

    // Ensure the user is an admin of the club
    // (This can be expanded by adding admin logic or user verification)
    try {
        const newEvent = new Event({
            club: clubId,
            title,
            description,
            location,
            date,
            visibility,
            image,
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event' });
    }
});

// 📌 Delete an event (only for club admins)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event' });
    }
});

module.exports = router;
