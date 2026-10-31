const mongoose = require("mongoose")

// Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already taken"],
        required: true,
    },
    email: {
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

// Create user model
const userModel = mongoose.model("users", userSchema)

module.exports = userModel