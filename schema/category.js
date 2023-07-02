const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    name: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
