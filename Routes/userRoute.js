const express = require('express');
const router = express.Router();
const { Register, Login, findAllUser, Delete, Update,ResetPassword,  test, LogOut, makeAdmin } = require("../Controllers/userController.js");
const { isUserAuthenticated, isAdmin } = require("../Middleware/auth");
router.route("/Register").post(Register);
router.route("/Login").post(Login);
router.route("/LogOut").get(LogOut);
router.route("/findAllUser").get(isUserAuthenticated, isAdmin, findAllUser);
router.route("/Delete/:__id").delete(isUserAuthenticated, Delete);
router.route("/Update").post(isUserAuthenticated, Update);
router.route("/ResetPassword/:__id").post(isUserAuthenticated, ResetPassword);
router.route("/makeAdmin/:__id").post(isUserAuthenticated, makeAdmin);
router.route("/test").post(test );

module.exports = router;