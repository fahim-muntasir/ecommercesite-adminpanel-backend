const Product = require("../schema/product");

// GET PRODUCT CONTROLLER
const productGet = async (req, res) => {
    res.send("get product");
};

// CREATE PRODUCT CONTROLLER
const productPost = async (req, res) => {
    const { title, description, price, slag, category } = req.body;

    try {
        if (title && description && price && slag && category) {
            const newProduct = new Product({
                title,
                description,
                price,
                slag,
                category,
            });

            // product save
            const createdProduct = await newProduct.save();

            // send response
            res.status(201).json({
                msg: "Product create successfull.",
                data: createdProduct,
            });
        } else {
            res.status(400).json({ msg: "Every field id required!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Somthing went wrong!" });
    }
};

module.exports = {
    productGetController: productGet,
    productPostController: productPost,
};
