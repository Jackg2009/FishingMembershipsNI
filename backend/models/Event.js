const mongoose = require('mongoose');

// Define the Event Schema
const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        telephone: {
            type: String,
            trim: true
        },

        club: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Club',
            required: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        date: {
            type: Date,
            required: true
        },

        isPrivate: {
            type: Boolean,
            default: 'true'
        },

        image: {
            type: String,
            trim: true
        },

        attendees: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Event', eventSchema);
