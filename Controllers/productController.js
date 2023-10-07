const Product = require('../Models/productModel')

const RegisterProduct = async (req, res) => {
    try {
        if (req.user.role !== "Seller") {
            res.status(401).json({ message: "You are not Seller!" })
            return;
        }
        let product = await Product.aggregate([{
            $match: {
                $and: [
                    { modelNumber: req.body.modelNumber },
                    { seller_id: req.user._id }
                ]
            }
        }]);
        if (product.length) {
            res.status(409).json({ message: "Product Already Exist !" })
            return;
        }
        product = await Product.create({
            category: req.body.category,
            name: req.body.name,
            modelNumber: req.body.modelNumber,
            seller_id: req.user._id,
            brand: req.body.brand,
            price: req.body.price,
            discount: req.body.discount,
            quantity: req.body.quantity,
            img: req.body.img,
            description: req.body.description,
        });
        res.status(200).json({
            success: true,
            message: "Added"
        });
    } catch (e) {
        console.log(e)
    }
}

const GetProductDetail = async (req, res) => {
    try {
        const productDetail = await Product.find({ _id: req.params.id }).populate("seller_id");
        res.json({ productDetail })
    } catch (e) {
        console.log(e)
    }
}
const findAllProducts = async (req, res) => {
    try {
        const resultsPerPage = 3;
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
module.exports = { RegisterProduct, GetProductDetail,findAllProducts }