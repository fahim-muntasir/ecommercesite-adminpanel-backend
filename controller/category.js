const Category = require("../schema/category");

// GET CATEGORY CONTROLLER
const categoryGet = async (req, res) => {
    try {
        // Get categories with null parentId
        const parentCategories = await Category.find();

        // send response
        res.status(200).json(parentCategories);
    } catch (error) {
        res.status(500).json({
            msg: "An error occurred while retrieving categories",
        });
    }

    // const { parentId } = req.query;

    // if (parentId) {
    //     try {
    //         // Get categories that match the parentId
    //         const matchedCategories = await Category.find({ parentId });

    //         // send response
    //         res.status(200).json(matchedCategories);
    //     } catch (error) {
    //         res.status(500).json({
    //             msg: "An error occurred while retrieving categories",
    //         });
    //     }
    // } else {
    //     try {
    //         // Get categories with null parentId
    //         const parentCategories = await Category.find({ parentId: null });

    //         // send response
    //         res.status(200).json(parentCategories);
    //     } catch (error) {
    //         res.status(500).json({
    //             msg: "An error occurred while retrieving categories",
    //         });
    //     }
    // }
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
    categoryGetController: categoryGet,
    categoryPostController: categoryPost,
};
