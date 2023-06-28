const { check, validationResult } = require("express-validator");
const User = require("../../schema/users/add_user");

const userValidation = [
  check("firstName")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("First name is required!"),
  check("lastName")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Last name is Required!"),
  check("userName")
    .not()
    .isEmpty()
    .isLowercase()
    .trim()
    .escape()
    .withMessage("User name will be lowercase and without space!")
    .custom(async (value) => {
      const user = await User.findOne({ userName: value });
      if (user) return Promise.reject("This user name already use.");
    }),
  check("userEmail")
    .isEmail()
    .isLowercase()
    .trim()
    .withMessage("This Emaill address will be lowercase and without space!")
    .custom(async (value) => {
      const user = await User.findOne({ userEmail: value });
      if (user) return Promise.reject("This Email already use.");
    }),
  check("userRole")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isIn(["Admin", "User"])
    .withMessage("User role is not valide!"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password will be strong and at list 8 characters!"),
];

// user validation check
const userValidationCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = { userValidation, userValidationCheck };
