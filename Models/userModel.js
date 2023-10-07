const mongoose = require('mongoose')
const Validator = require('validator')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: [Validator.isEmail, "Invalid Email"],
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: [8, "Minimum length should be 8"],
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    }
}, { timestamps: true })

const User = new mongoose.model('User', userSchema);
module.exports = User;