const Category = require("../schema/category");

// GET ALL CATEGORIES CONTROLLER
const allCategoriesGet = async (req, res) => {
  try {
    // Get categories with null parentId
    const categories = await Category.find();

    // send response
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred while retrieving categories",
    });
  }
};

// GET ROOT CATEGORY CONTROLLER
const parentCategoryGet = async (req, res) => {
  try {
    // Get categories with null parentId
    const categories = await Category.find({ parentId: null });

    // send response
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred while retrieving categories",
    });
  }
};

// GET CATEGORY BY CATEGORY NAME CONTROLLER
const categoryGetByName = async (req, res) => {
  const { category } = req.params;

  try {
    // get category
    const {_id} = await Category.findOne({name:category});

    // Get categories with null parentId
    const parentCategories = await Category.find({ parentId: _id });

    // send response
    res.status(200).json({msg: "get category successfull", data: parentCategories});
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred while retrieving categories",
    });
  }
};

// GET CATEGORY BY CATEGORY ID CONTROLLER
const categoryGetById = async (req, res) => {
  const { categoryId } = req.params;

  try {

    // Get categories with null parentId
    const parentCategories = await Category.find({ parentId: categoryId });

    // send response
    res.status(200).json({msg: "get category successfull", data: parentCategories});
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred while retrieving categories",
    });
  }
};

// CREATE CATEGORY CONTROLLER
const categoryPost = async (req, res) => {
  const { parentId, category } = req.body;

  try {
    if (parentId) {
      const newCategory = new Category({
        parentId,
        name: category,
      });

      //save
      const createdCategory = await newCategory.save();

      // send response
      res.status(201).json({
        msg: "category create successfull.",
        data: createdCategory,
      });
    } else {
      const newCategory = new Category({
        name: category,
      });

      //save
      const createdCategory = await newCategory.save();

      // send response
      res.status(201).json({
        msg: "category create successfull.",
        data: createdCategory,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Somthing went wrong!" });
  }
};

module.exports = {
  allCategoryGetController: allCategoriesGet,
  parentCategoryGetController: parentCategoryGet,
  categoryPostController: categoryPost,
  categoryGetByIdController: categoryGetById,
  categoryGetByNameController: categoryGetByName
};
