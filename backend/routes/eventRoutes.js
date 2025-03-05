const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware'); // Optional: only for user-specific routes

// 📌 Get latest public events (for homepage display)
router.get('/latest', async (req, res) => {
    try {
        const events = await Event.find({ isPrivate: 'false' }) //only show events which haven't been set as Private
            .sort({ date: -1 })
            .limit(6); // Limit to 6 events
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

// Create Event for a ClubDetails
router.post('/:clubId/events', async (req, res) => {
    const { clubId } = req.params;
    const { name, date, isPrivate } = req.body;

    try {
        // Check if the club exists
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ message: 'ClubDetails not found' });
        }

        // Check if the user is in the committee (optional, depends on your authentication logic)
        // You should add the logic here to check if the user is part of the committee
        // For now, let's assume all users can create events if they belong to the club

        // Create new event
        const newEvent = new Event({
            name,
            date,
            isPrivate,
            club: clubId
        });

        // Save event to the database
        await newEvent.save();

        // Add event to the club's events list (optional, depends on your schema)
        club.events.push(newEvent._id);
        await club.save();

        res.status(201).json(newEvent); // Return the created event
    } catch (error) {
        console.error(error);
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
