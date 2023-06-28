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
const sendMail = require("../middleware/sendMail");
const avatarUpload = require("../middleware/avaterupload");

// user create route
router.get("/api/user", userGetController);
router.post(
  "/api/user",
  userValidation,
  userValidationCheck,
  avatarUpload,
  sendMail,
  userPostController
);
router.put("/api/user", userUpdateController);
router.delete("/api/user", userDeleteController);

// exports module
module.exports = router;
