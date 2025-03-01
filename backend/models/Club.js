const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    name: String,
    description: String,
    houseNumber: Number,
    streetName: String,
    locality: String,
    postcode: String,
    created_at: Date,
    created_by: Number,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of members
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of users who applied
    committee: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, required: true }
    }],
});

module.exports = mongoose.model("Club", clubSchema);