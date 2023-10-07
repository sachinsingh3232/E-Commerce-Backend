const Cart = require('../Models/cartModel')
const Product = require('../Models/productModel')
const mongoose = require('mongoose');

const AddToCart = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.body.productId });
        if (!product) {
            res.status(404).json({ message: "product not Found!" })
            return;
        }
        let cart = await Cart.aggregate([{
            $match: {
                $and: [
                    { userId: new mongoose.Types.ObjectId(req.user._id) },
                    { productId: new mongoose.Types.ObjectId(req.body.productId) }
                ]
            }
        }]);
        if (cart.length > 0) {
            res.status(409).json({ message: "Product Already Exist in Cart !" })
            return;
        }
        cart = await Cart.create({
            userId: req.user._id,
            productId: req.body.productId,
            quantity: req.body.quantity
        })
        res.status(200).json({
            message: "Added to Cart"
        })
    } catch (e) {
        console.log(e)
    }
}
const RemoveFromCart = async (req, res) => {
    try {
        let cart = await Cart.aggregate([{
            $match: {
                $and: [
                    { userId: new mongoose.Types.ObjectId(req.user._id) },
                    { productId: new mongoose.Types.ObjectId(req.body.productId) }
                ]
            }
        }]);
        if (cart.length < 1) {
            res.status(404).json({ message: "there is no product !" })
            return;
        }
        await Cart.findByIdAndDelete(cart[0]._id);
        res.status(200).json({ message: "Removed!" })
    } catch (e) {
        console.log(e)
    }
}
const UpdateCart = async (req, res) => {
    try {
        let cart = await Cart.aggregate([{
            $match: {
                $and: [
                    { userId: new mongoose.Types.ObjectId(req.user._id) },
                    { productId: new mongoose.Types.ObjectId(req.body.productId) }
                ]
            }
        }]);
        if (cart.length < 1) {
            res.status(404).json({ message: "there is no product !" })
            return;
        }
        await Cart.findByIdAndUpdate(cart[0]._id, {
            userId: req.user._id,
            productId: req.body.productId,
            quantity: req.body.quantity
        });
        res.status(200).json({ message: "Updated!" })
    } catch (e) {
        console.log(e)
    }
}
const GetCartItem = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user._id }).populate('productId');
        if (cart.length > 0) {
            res.status(200).json({ message: "success", cart });
            return;
        }
        res.status(200).json({ message: "no Item!" })
    } catch (e) {
        console.log(e)
    }
}
module.exports = { AddToCart, RemoveFromCart, UpdateCart,GetCartItem }