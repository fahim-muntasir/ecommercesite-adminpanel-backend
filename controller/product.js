const Product = require("../schema/product");
const Category = require("../schema/category");
const fs = require('fs');
const path = require('path');

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
  const { title, description, price, slag, category, thumbnail, images } = req.body;
  console.log(req?.user);
  console.log(req.body)
  try {
    if (title && description && price && slag && category) {
      const newProduct = new Product({
        title,
        user: req?.user?.userId,
        description,
        price,
        slag,
        category,
        thumbnail,
        images
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

const avatarController = (req, res) => {
  if (req.files.length > 0) {
    console.log(req.files);
    res
      .status(201)
      .json({ msg: "Avatar upload successfull.", data: req.files });
  } else {
    res.status(400).json({ msg: "Please select images then try to upload!" });
  }
};

const filesDirectory = path.join(__dirname, '../public/uploads/products');
const getAvatars = (req, res) =>{
  fs.readdir(filesDirectory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).json({ msg: 'Internal Server Error' });
    } else {
      res.status(200).json({msg: "Avater get successfull", data: files });
    }
  });
}

module.exports = {
  productGetController: productGet,
  productPostController: productPost,
  productAvatarController: avatarController,
  getProductsAvatarController: getAvatars
};
