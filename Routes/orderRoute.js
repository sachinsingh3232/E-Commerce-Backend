const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../Middleware/auth');
const { PlaceOrder, CancelOrder, UpdateStatus } = require('../Controllers/orderController');

router.route('/placeOrder').post(isUserAuthenticated, PlaceOrder)
router.route('/cancelOrder').delete(isUserAuthenticated, CancelOrder)
router.route('/updateStatus').put(isUserAuthenticated, UpdateStatus)

module.exports = router;