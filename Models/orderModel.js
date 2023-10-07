const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    state: {
        type: Number,  // placed preparing dispatched delivered
        default: 0
    }
}, { timestamps: true })
const Order = new mongoose.model('Order', orderSchema);
module.exports = Order;