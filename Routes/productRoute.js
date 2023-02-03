const express = require('express');
const router = express.Router();
const { createProduct, findAllProducts, getProductDetails, updateProductDetails, deleteProduct,addReview } = require("../Controllers/productController.js");
const { isUserAuthenticated } = require("../Middleware/auth");
router.route("/createProduct").post(isUserAuthenticated, createProduct);
router.route("/updateProductDetails/:_id").post(isUserAuthenticated, updateProductDetails);
router.route("/deleteProduct/:_id").delete(isUserAuthenticated, deleteProduct);
router.route("/addReview/:_id").post(isUserAuthenticated, addReview);
router.route("/findAllProducts").get(findAllProducts);
router.route("/getProductDetails/:_id").get(getProductDetails);

module.exports = router;