const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Category: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    seller_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true
    },
    brand: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    rating: {
        type: Number,
        // required: true
    },
    quantity: {
        type: Number,
        // required: true
    },
    img_url: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    review: [{
        type: Object,
        // required: true
    }],
})
const Product = new mongoose.model('Product', ProductSchema);
module.exports = Product;