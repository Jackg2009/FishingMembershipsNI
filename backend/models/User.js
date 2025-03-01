const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    forename: String,
    surname: String,
    dob: Date,
    street: String,
    city: String,
    county: String,
    postcode: String,
    contactNumber: Number,
    fishingLicense: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    isAdmin: Boolean,
    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    }],
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }]
});

// Compare password for authentication
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving it to the database
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});



module.exports = mongoose.model("User", userSchema);