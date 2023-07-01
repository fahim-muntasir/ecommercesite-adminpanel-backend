const AddUser = require("../../schema/users/add_user");
const bcrypt = require("bcrypt");

const userGet = (req, res) => {
    res.send("getUser");
};

// POST USER
const userPost = async (req, res) => {
    const userInfo = { ...req.body };
    try {
        // hash password
        const hashPassword = await bcrypt.hash(userInfo.password, 10);

        if (req.files?.length > 0) {
            // create user
            const newUser = new AddUser({
                ...userInfo,
                avatar: req.files[0].filename,
                password: hashPassword,
            });
            // save user
            await newUser.save();
        } else {
            // create user
            const newUser = new AddUser({
                ...userInfo,
                avatar: null,
                password: hashPassword,
            });
            // save user
            await newUser.save();
        }

        // send response
        res.status("200").json({ msg: "User create successfull." });
    } catch (err) {
        console.log(err);
        res.status("500").json({ msg: "Somthing went wrong!" });
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
