const express = require("express");
const router = express.Router();

const {
    userGetController,
    userPostController,
    userUpdateController,
    userDeleteController,
} = require("../controller/user/userController");
const {
    userValidation,
    userValidationCheck,
} = require("../utils/users/userAddValidation");
// const sendMail = require("../middleware/sendMail");
const avatarUpload = require("../middleware/avaterupload");

// user create route
router.get("/user", userGetController);

router.post(
    "/user",
    avatarUpload,
    userValidation,
    userValidationCheck,
    userPostController
);

router.put("/user", userUpdateController);
router.delete("/user", userDeleteController);

// exports module
module.exports = router;
