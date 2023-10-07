const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category: {
        type: String,
        // required: true
    },
    modelNumber: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        // required: true
    },
    seller_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    brand: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    discount: {
        type: Number,
        // required: true
    },
    quantity: {
        type: Number,
        // required: true
    },
    img: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
}, { timestamps: true })
const Product = new mongoose.model('Product', ProductSchema);
module.exports = Product;