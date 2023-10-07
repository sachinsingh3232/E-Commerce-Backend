const express = require('express');
const { RegisterProduct, GetProductDetail, findAllProducts } = require('../Controllers/productController');
const isUserAuthenticated = require('../Middleware/auth');
const router = express.Router();

router.route('/registerProduct').post(isUserAuthenticated, RegisterProduct);
router.route('/getProductDetail/:id').get(isUserAuthenticated, GetProductDetail);
router.route('/findAllProducts').get(isUserAuthenticated, findAllProducts);

module.exports = router;