const jwt = require('jsonwebtoken')
const User = require("../Models/userModel");

const isUserAuthenticated = async (req, res, next) => {
    try {
        // console.log("Hello");
        const token = req.cookies.access_token;
        // console.log(token);
        if (token) {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const existingUser = await User.findById(decodedToken.id);
            req.user = existingUser;
            req.decodedToken = decodedToken;
            next();
        }
        else {
            res.status(401).json({ message: "Please Login" })
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = isUserAuthenticated;