const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../Middleware/auth');
const { AddToCart, RemoveFromCart, UpdateCart, GetCartItem } = require('../Controllers/cartController');

router.route('/addToCart').post(isUserAuthenticated, AddToCart)
router.route('/removeFromCart').delete(isUserAuthenticated, RemoveFromCart)
router.route('/updateCart').put(isUserAuthenticated, UpdateCart)
router.route('/getCartItem').get(isUserAuthenticated, GetCartItem)

module.exports = router;