const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const Product = require("../Models/productModel");
const createProduct = async (req, res) => {
    try {
        // console.log(req.body.name)
        // console.log(Product,"product")
        const product = await Product.create({
            // name:"Robin"
            // Category: req.body.Category,
            name: req.body.name,
            seller_id: req.user._id,
            brand: req.body.brand,
            price: req.body.price,
            rating: req.body.rating,
            quantity: req.body.quantity,
            img_url: req.body.img_url,
            description: req.body.description,
            review: req.body.review,
        }).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
        // console.log(product, "Product")
        // console.log("Hello Create Product")
        res.status(200).json({
            success: true,
            message: "Added"
        });
    } catch (e) {

    }
}
const findAllProducts = async (req, res) => {
    try {
        const resultsPerPage = 2;
        const { price, brand, page } = req.query;
        const product = await Product.aggregate([
            {
                $match: {//only those attributes that comes under parent(Product) model will come under match
                    $and: [
                        brand ? { "brand": brand } : {},
                        price ? {
                            $and: [
                                price.gte ? { "price": { $gte: Number(price.gte) } } : {},
                                price.lte ? { "price": { $lte: Number(price.lte) } } : {},
                            ]
                        } : {}
                    ]
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "seller_id",
                    foreignField: "_id",
                    as: "seller"
                }
            },
            {
                $facet: {
                    data: [{ $skip: (resultsPerPage) * (page - 1) }, { $limit: resultsPerPage }],
                    metaData: [{ $count: "total" }],
                }
            }
        ])
        res.json({ message: "success", product })
    }
    catch (e) {
        console.log(e)
    }
}
// const findAllProducts = async (req, res) => {
//     try {
//         const resultsPerPage = 2;
//         const { keyword, price } = req.query;
//         let page = req.query.page ? req.query.page : 1;
//         let filter = [];
//         keyword && filter.push(
//             {
//                 $or: [
//                     { "name": { $regex: keyword, $options: "i" } },
//                     { "brand": { $regex: keyword, $options: "i" } }
//                 ]
//             });
//         price && filter.push(
//             {
//                 $and: [
//                     price.gte ? { "price": { $gte: price.gte } } : {},
//                     price.lte ? { "price": { $lte: price.lte } } : {},
//                     price.gt ? { "price": { $gt: price.gt } } : {},
//                     price.lt ? { "price": { $lt: price.lt } } : {}
//                 ]
//             }
//         );
//         let products = await Product.find(
//             filter.length ?
//                 {
//                     $and: filter
//                 } : {}
//         ).limit(resultsPerPage).skip(resultsPerPage * (page - 1));
//         if (!products.length) {
//             return res.json({ message: "Product not found" })
//         }
//         res.json(products);
//     }
//     catch (e) {
//         console.log(e)
//     }
// }
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params._id).populate("seller_id");
    if (!product) {
        return next(new ErrorHandler("Product not Found", 404))
    }
    res.json(product);
})
const updateProductDetails = async (req, res) => {
    try {
        let product = await Product.findById(req.params._id);

        // console.log(product);
        // console.log(req.user._id.valueOf());
        // console.log(product.seller_id.valueOf());

        if (req.user._id.valueOf() != product.seller_id.valueOf()) {
            res.json({ message: "Only seller can update this product" });
            return;
        }
        product = await Product.findByIdAndUpdate(req.params._id, {
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            rating: req.body.rating,
            quantity: req.body.quantity,
            img_url: req.body.img_url,
            description: req.body.description,
        },
            res.json({ message: product.name + "'s details are updated" })
        );

    } catch (e) {
        console.log(e);
    }
}
const deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params._id);

        // console.log(req.user._id.valueOf());
        // console.log(product.seller_id.valueOf());

        if (req.user._id.valueOf() != product.seller_id.valueOf()) {
            res.json({ message: "Only seller can delete this product" });
            return;
        }
        await Product.deleteOne({ _id: req.params._id });
        res.json({ message: product.name + " is Deleted" })

    } catch (e) {
        console.log(e);
    }
}
const addReview = async (req, res) => {
    try {
        await Product.updateOne(
            { _id: req.params._id },
            {
                $push: {
                    "review": {
                        name: req.user.name,
                        review: req.body.review
                    }
                }
            }
        )
        res.json({ message: "Review Added" })
    } catch (e) {
        console.log(e);
    }
}
module.exports = { createProduct, findAllProducts, getProductDetails, updateProductDetails, deleteProduct, addReview };