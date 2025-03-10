const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    name: String,
    description: String,
    houseNumber: Number,
    streetName: String,
    locality: String,
    postcode: String,
    createdDate: Date,
    createdBy: Number,
    clubLogo: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of members
    committee: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, required: true }
    }],
    events: [{type: mongoose.Schema.Types.ObjectId, ref: "FishingEvent" }],
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of users who applied
});

module.exports = mongoose.model("Club", clubSchema);