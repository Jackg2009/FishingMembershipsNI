const mongoose = require('mongoose');

// Define the Event Schema
const eventSchema = new mongoose.Schema(
    {
        club: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Club',
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        date: {
            type: Date,
            required: true
        },

        visibility: {
            type: String,
            enum: ['private', 'public'],
            default: 'private'
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
