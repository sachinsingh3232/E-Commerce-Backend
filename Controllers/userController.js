const User = require("../Models/userModel");
const JWT = require('jsonwebtoken');
const test = async (req, res) => {
    try {
        // console.log(JWT);
        const name = "Sachin";
        const object = { name: "Sachin" };
        // const token = JWT.sign(name,process.env.JWT_SECRET);
        const token = JWT.sign(object, process.env.JWT_SECRET);
        console.log(token);
        const data = JWT.verify(token, process.env.JWT_SECRET);
        // res.json(token);
        res.json({
            Token: token,
            Data: data
        });
    } catch (e) {
    }
}
const Register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        // console.log(existingUser);
        if (existingUser) {
            res.json("User Already Exist");
            return;
        }
        else if (req.body.password != req.body.conf_password) {
            res.send("Confirm Password again");
            return;
        }
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            sex: req.body.sex,
            role: req.body.role,
        });
        res.json({ message: "Registered as " + user.name });
    }
    catch (e) {
        console.log(e);
    }
}
const Login = async (req, res) => {
    try {

        const existingUser = await User.findOne({ email: req.body.email }).select("+password");
        if (!existingUser) {
            res.json("User Doesn't Exist");
            return;
        }
        const isPasswordMatched = await existingUser.comparePassword(req.body.password);
        if (!isPasswordMatched) {
            res.json("incorrect Password");
            return;
        }
        else {
            // generating JWT token
            const token = existingUser.get_JWT_Token();
            // console.log(token);
            res.cookie("token", token).json({ message: "Logged In Successfully ", data: existingUser });
        }
    }
    catch (e) {

    }
}
const LogOut = async (req, res) => {
    try {
        res.clearCookie("token").json({ message: "Logged Out" });
    }
    catch (e) {

    }
}
const findAllUser = async (req, res) => {
    try {
        const user = await User.find();
        if (user.length < 1) {
            return res.json({ message: "There is no user" });
        }
        res.json(user);

    }
    catch (e) {
    }
}
const Delete = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.__id });
        res.send("Deleted")
    }
    catch (e) {
        res.send(e);
    }
}
const Update = async (req, res) => {
    try {
        console.log(req.decodedToken.id);
        const user = await User.findByIdAndUpdate(req.decodedToken.id, { age: req.body.age, name: req.body.name, email: req.body.email, sex: req.body.sex })
        console.log(user)
        res.json({ message: user.name + "'s details are updated" })
    }
    catch (e) {
        res.send(e);
    }
}
const ResetPassword = async (req, res) => {
    try {
        let user = await User.findById(req.params.__id).select("+password");
        if (user.password != req.body.oldPassword) {
            return res.json({ message: "Please Enter valid Old Password" });
        }
        if (req.body.oldPassword === req.body.newPassword) {
            return res.json({ message: "Please Enter a new Passowrd" });
        }
        await User.findByIdAndUpdate(req.params.__id, { password: req.body.newPassword })
        res.send({ message: "Password Updated" });
    }
    catch (e) {
        res.send(e)
    }
}
const makeAdmin = async (req, res, next) => {
    try {
        if (req.user.role != "Super-Admin") {
            return res.json({ message: "You are not Super-Admin " })
        }
        let user = await User.findById(req.params.__id);
        if (user.role === "Admin") {
            return res.json({ message: user.name + " is Already an Admin" })
        }
        await User.findByIdAndUpdate(req.params.__id, { role: 'Admin' });
        res.json({ message: user.name + " is updated as Admin" })
        // res.json(user);
    }
    catch (e) {
        console.log(e);
    }
}
module.exports = { Register, Login, findAllUser, Delete, Update, test, ResetPassword, LogOut, makeAdmin }