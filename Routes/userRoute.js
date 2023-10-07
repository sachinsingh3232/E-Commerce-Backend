const express = require('express');
const router = express.Router();
const { Register, Login, LogOut } = require('../Controllers/userController');
const isUserAuthenticated = require('../Middleware/auth');

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/logout').post(isUserAuthenticated,LogOut)

module.exports = router;