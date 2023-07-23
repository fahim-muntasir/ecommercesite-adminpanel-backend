const User = require("../../schema/users/add_user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            const newUser = new User({
                ...userInfo,
                avatar: req.files[0].filename,
                password: hashPassword,
            });
            // save user
            await newUser.save();
        } else {
            // create user
            const newUser = new User({
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

// LOGIN CONGROLER
const userLoign = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // find user by email or password
        const user = await User.findOne({
            $or: [{ userName: userName }, { userEmail: userName }],
        });

        if (user?._id) {
            // check password
            const checkPassword = await bcrypt.compare(password, user.password);

            if (checkPassword) {
                const payload = {
                    userId: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    userEmail: user.userEmail,
                    userRole: user.userRole,
                    avatar: user.avatar,
                    createDate: user.createDate,
                };

                // create token
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE,
                });

                // send response
                res.status(200).json({ msg: "Login successfull.", token });
            } else {
                res.status(400).json({ msg: "Authentication Failed!" });
            }
        } else {
            res.status(400).json({ msg: "Authentication Failed!" });
        }
    } catch (error) {
        res.status("500").json({ msg: "Somthing went wrong!" });
    }
};

module.exports = {
    userGetController: userGet,
    userPostController: userPost,
    userUpdateController: userUpdate,
    userDeleteController: userDelete,
    userLoginController: userLoign,
};
