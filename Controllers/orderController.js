const Order = require('../Models/orderModel')
const Product = require('../Models/productModel')


const PlaceOrder = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.body.productId });
        if (!product) {
            res.status(404).json({ message: "product not Found!" })
            return;
        }
        await Order.create({
            userId: req.user._id,
            productId: req.body.productId,
            quantity: req.body.quantity
        })
        res.status(200).json({
            message: "Order Placed"
        })
    } catch (e) {
        console.log(e)
    }
}
const CancelOrder = async (req, res) => {
    try {
        let order = await Order.findOne({ _id: req.body.orderId });
        if (!order) {
            res.status(404).json({ message: "there is no Order !" })
            return;
        }
        if (!order.userId.equals(req.user._id)) {
            console.log(order.userId + " " + req.user._id)
            res.status(401).json({ message: "You are not the related user !" })
            return;
        }
        await Order.findByIdAndDelete(order._id);
        res.status(200).json({ message: "Order Canceled!" })
    } catch (e) {
        console.log(e)
    }
}
const UpdateStatus = async (req, res) => {
    try {
        if (req.user.role != "Admin") {
            res.status(401).json({ message: "You are not Admin !" })
            return
        }
        let order = await Order.findOne({ _id: req.body.orderId });
        if (!order) {
            res.status(404).json({ message: "there is no Order !" })
            return;
        }
        await Order.findByIdAndUpdate(order._id, {
            userId: order.userId,
            productId: order.productId,
            quantity: order.quantity,
            state: order.state + 1
        });
        res.status(200).json({ message: "State Updated !" })
    } catch (e) {
        console.log(e)
    }
}
module.exports = { PlaceOrder, CancelOrder, UpdateStatus }