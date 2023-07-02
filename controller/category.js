const Category = require("../schema/category");

// GET CATEGORY CONTROLLER
const categoryGet = (req, res) => {
    res.send("getUser");
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
