const Product = require("../schema/product");
const Category = require("../schema/category");

// GET PRODUCT CONTROLLER
const productGet = async (req, res) => {
  const { category } = req.params;

  if (category) {
    try {
      //get category id
      const getCategory = await Category.findOne({ name: category });

      if (getCategory) {
        const categoryId = getCategory._id;
        const products = await Product.aggregate([
          {
            $match: {
              category: categoryId,
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              slag: 1,
              price: 1,
              // Add other fields you want to include in the result.
            },
          },
        ]);

        // send response
        res
          .status(200)
          .json({ msg: "Products get succesfull.", data: products });
      } else {
        res.status(404).json({ msg: "Product not found!" });
      }
    } catch (err) {
      res.status(500).json({ msg: "Somthing went wrong!" });
    }
  } else {
    try {
      const products = await Product.find({});

      res.status(200).json({ msg: "Products get succesfull.", data: products });
    } catch (error) {
      res.status(500).json({ msg: "Somthing went wrong!" });
    }
  }
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
