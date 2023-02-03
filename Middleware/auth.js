const jwt = require('jsonwebtoken')
const User = require("../Models/userModel");

const isUserAuthenticated = async (req, res, next) => {
    try {
        // console.log("Hello");
        const { token } = req.cookies;
        // console.log(token);
        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const existingUser = await User.findById(decodedToken.id);
            req.user = existingUser;
            req.decodedToken=decodedToken;
            next();
        }
        else {
            res.status(401).json({ message: "Please Login" })
        }
    } catch (e) {
        console.log(e);
    }
}
const isAdmin = async (req, res, next) => {
    if (req.user.role === "Admin" ||req.user.role === "Super-Admin" ) {
        next();
    }
    else {
        res.json({ message: "You are not Admin" })
    }
}
module.exports = { isUserAuthenticated ,isAdmin};