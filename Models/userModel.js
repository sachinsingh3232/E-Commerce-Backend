const mongoose = require("mongoose");
const JWT = require('jsonwebtoken');
const Validator = require('validator')
const Bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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
        select: false
        // unique: true,
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
        default: "user"
    }
})
userSchema.methods.get_JWT_Token = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET)
}
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { // this is used to prevent the password from again hashing itself while we update the user data.
        next();
    }
    this.password = await Bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function (EnteredPassword) {
    return await Bcrypt.compare(EnteredPassword, this.password)
}
const User = new mongoose.model('User', userSchema);
module.exports = User;

