const AddUser = require("../../schema/users/add_user");
const bcrypt = require("bcrypt");

const userGet = (req, res) => {
  res.send("getUser");
};

const userPost = async (req, res) => {
  const userInfo = req.body;
  try {
    const hashPassword = await bcrypt.hash(userInfo.password, 10);
    const newUser = await AddUser({
      ...userInfo,
      avatar: req.files,
      password: hashPassword,
    });
    newUser.save();
    res.status("200").json({ msg: "User create successfull.", data: req.otp });
  } catch (err) {
    console.log(err);
  }
};

const userUpdate = (req, res) => {
  res.send("updateUser");
};

const userDelete = (req, res) => {
  res.send("deleteUser");
};

module.exports = {
  userGetController: userGet,
  userPostController: userPost,
  userUpdateController: userUpdate,
  userDeleteController: userDelete,
};
