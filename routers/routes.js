const express = require("express");
const router = express.Router();

// IMPORT CONTROLLER

// USER CONTROLLER
const {
    userGetController,
    userPostController,
    userUpdateController,
    userDeleteController,
    userLoginController,
} = require("../controller/user/userController");

// CATEGORY CONTROLLER
const {
    categoryPostController,
    categoryGetController,
} = require("../controller/category");

// IMPORT PRODUCT CONTROLLER
const { productPostController } = require("../controller/product");

// IMPORT VALIDATOR
const {
    userValidation,
    userValidationCheck,
} = require("../utils/users/userAddValidation");
// const sendMail = require("../middleware/sendMail");
const avatarUpload = require("../middleware/avaterupload");

// ALL ROUTE

// USER GET ROUTE
router.get("/user", userGetController);
// USER CREATE ROUTE
router.post(
    "/user",
    avatarUpload,
    userValidation,
    userValidationCheck,
    userPostController
);
// USER UPDATE ROUTE
router.put("/user", userUpdateController);
// USER DELETE ROUTE
router.delete("/user", userDeleteController);

// GET CATEGORY ROUTE
router.get("/category", categoryGetController);

// CATEGORY CREATE ROUTE
router.post("/category", categoryPostController);

// CREATE PRODUCT
router.post("/products", productPostController);

// LOGIN
router.post("/login", userLoginController);

// exports module
module.exports = router;
